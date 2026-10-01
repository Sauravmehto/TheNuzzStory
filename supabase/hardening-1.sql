-- Hardening 1 — run after the earlier supabase/*.sql scripts.
-- Drops OTP tables, enforces unique phones, and locks privileged profile columns.

drop table if exists public.otp_requests;
drop table if exists public.phone_otps;

-- One phone per customer. Empty phones are allowed (staff accounts may have none).
create unique index if not exists profiles_phone_unique_idx
  on public.profiles (phone)
  where phone is not null and phone <> '';

-- Copies signup metadata onto the profile. A duplicate phone fails signup
-- with a message the app can show directly.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name, email, phone, loyalty_points)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data->>'full_name', ''), split_part(coalesce(new.email, ''), '@', 1), ''),
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'phone', ''),
    100
  )
  on conflict (id) do update set
    name = excluded.name,
    email = excluded.email,
    phone = excluded.phone,
    updated_at = now();
  return new;
exception
  when unique_violation then
    raise exception 'This phone number is already registered';
end;
$$;

-- Customers may update their own name and phone. role, is_active, and
-- loyalty_points stay with the service role and security-definer functions
-- (place_order runs as the function owner, so it can still change points).
create or replace function public.protect_profile_privileged_columns()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if coalesce(auth.role(), '') = 'service_role'
     or current_user in ('postgres', 'supabase_admin', 'service_role') then
    return new;
  end if;

  if new.role is distinct from old.role
     or new.is_active is distinct from old.is_active
     or new.loyalty_points is distinct from old.loyalty_points then
    raise exception 'Not allowed to change role, is_active, or loyalty_points'
      using errcode = '42501';
  end if;

  return new;
end;
$$;

drop trigger if exists protect_profile_privileged_columns on public.profiles;
create trigger protect_profile_privileged_columns
  before update on public.profiles
  for each row
  execute function public.protect_profile_privileged_columns();
