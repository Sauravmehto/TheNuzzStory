-- Hardening 2 — run after hardening-1.sql.
-- One transaction for priced orders. The browser sends product slugs, not prices.

create sequence if not exists public.order_number_seq;

create or replace function public.place_order(
  p_items jsonb,
  p_payment_method text,
  p_address_id uuid,
  p_coupon_code text default null,
  p_redeem_loyalty boolean default false
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  addr public.addresses%rowtype;
  item jsonb;
  prod public.products%rowtype;
  resolved jsonb := '[]'::jsonb;
  v_qty integer;
  v_variant text;
  v_subscribe boolean;
  v_delta numeric;
  v_unit numeric;
  v_line numeric;
  v_subtotal numeric := 0;
  v_sub_discount numeric := 0;
  v_coupon_discount numeric := 0;
  v_discount numeric := 0;
  v_delivery numeric := 0;
  v_cod numeric := 0;
  v_payable numeric;
  v_points integer;
  v_loyalty_rupees numeric := 0;
  v_points_redeemed integer := 0;
  v_points_earned integer := 50;
  v_total numeric;
  v_order_id text;
  v_coupon public.coupons%rowtype;
  v_code text;
  v_shipping text;
  v_attempt integer;
  v_line_row jsonb;
begin
  if uid is null then
    raise exception 'Please login before placing an order';
  end if;

  if p_payment_method not in ('upi', 'card', 'netbanking', 'cod') then
    raise exception 'Invalid payment method';
  end if;

  if p_items is null
     or jsonb_typeof(p_items) <> 'array'
     or jsonb_array_length(p_items) < 1
     or jsonb_array_length(p_items) > 50 then
    raise exception 'Your cart is empty or too large';
  end if;

  select * into addr
  from public.addresses
  where id = p_address_id and user_id = uid;
  if not found then
    raise exception 'Select a delivery address';
  end if;

  for item in select value from jsonb_array_elements(p_items)
  loop
    if coalesce(item->>'slug', '') = '' then
      raise exception 'Invalid cart item';
    end if;

    begin
      v_qty := (item->>'qty')::integer;
    exception
      when others then
        raise exception 'Invalid quantity';
    end;

    if v_qty is null or v_qty < 1 or v_qty > 99 then
      raise exception 'Invalid quantity';
    end if;

    v_variant := coalesce(item->>'variant', '');
    v_subscribe := coalesce((item->>'subscription')::boolean, false);

    select * into prod
    from public.products
    where slug = item->>'slug' and active = true;
    if not found then
      raise exception 'A product in your cart is no longer available';
    end if;
    if prod.in_stock is not true or prod.price <= 0 then
      raise exception '% is out of stock', prod.name;
    end if;

    if jsonb_array_length(coalesce(prod.variants, '[]'::jsonb)) = 0 then
      v_delta := 0;
    else
      select (elem->>'priceDelta')::numeric into v_delta
      from jsonb_array_elements(prod.variants) elem
      where elem->>'label' = v_variant
      limit 1;
      if v_delta is null then
        raise exception 'Unknown option for %', prod.name;
      end if;
    end if;

    v_unit := prod.price + coalesce(v_delta, 0);
    if v_unit < 0 then
      raise exception 'Invalid price for %', prod.name;
    end if;

    v_line := v_unit * v_qty;
    v_subtotal := v_subtotal + v_line;
    if v_subscribe and prod.subscribable then
      v_sub_discount := v_sub_discount + round(v_line * 0.1);
    end if;

    resolved := resolved || jsonb_build_array(jsonb_build_object(
      'product_slug', prod.slug,
      'product_name', prod.name,
      'variant', v_variant,
      'qty', v_qty,
      'unit_price', v_unit,
      'image_url', coalesce(prod.image_url, '')
    ));
  end loop;

  v_code := nullif(upper(btrim(coalesce(p_coupon_code, ''))), '');
  if v_code is not null then
    select * into v_coupon
    from public.coupons
    where code = v_code and active = true;
    if not found then
      raise exception 'Invalid coupon code';
    end if;
    if v_subtotal < v_coupon.min_cart then
      raise exception 'This coupon needs a larger cart';
    end if;
    if v_coupon.type = 'percent' then
      v_coupon_discount := round(v_subtotal * v_coupon.value / 100);
    elsif v_coupon.type = 'flat' then
      v_coupon_discount := v_coupon.value;
    else
      raise exception 'Invalid coupon';
    end if;
  end if;

  if v_subtotal >= 499 then
    v_delivery := 0;
  else
    v_delivery := 49;
  end if;

  v_payable := greatest(0, v_subtotal - v_sub_discount - v_coupon_discount + v_delivery);

  select loyalty_points into v_points
  from public.profiles
  where id = uid
  for update;
  if not found then
    raise exception 'Profile not found';
  end if;
  v_points := greatest(0, coalesce(v_points, 0));

  if coalesce(p_redeem_loyalty, false) then
    v_loyalty_rupees := least(
      (v_points / 100) * 10,
      (floor(v_payable / 10)::integer) * 10
    );
    v_points_redeemed := ((v_loyalty_rupees / 10)::integer) * 100;
  end if;

  v_payable := greatest(0, v_payable - v_loyalty_rupees);

  if p_payment_method = 'cod' then
    if v_payable > 5000 then
      raise exception 'Cash on delivery is available on orders up to ₹5000';
    end if;
    v_cod := 29;
  end if;

  v_total := v_payable + v_cod;
  v_discount := v_sub_discount + v_coupon_discount + v_loyalty_rupees;

  v_shipping := addr.address
    || case when coalesce(addr.landmark, '') = '' then '' else ', ' || addr.landmark end
    || ', ' || addr.city || ', ' || addr.state || ' — ' || addr.pincode;

  for v_attempt in 1..5 loop
    v_order_id := 'NZ-' || lpad(nextval('public.order_number_seq')::text, 5, '0');
    begin
      insert into public.orders (
        id, user_id, status, subtotal, discount, delivery_fee, total,
        payment_method, shipping_name, shipping_phone, shipping_address
      ) values (
        v_order_id, uid, 'Order placed', v_subtotal, v_discount, v_delivery, v_total,
        p_payment_method, addr.name, addr.phone, v_shipping
      );
      exit;
    exception
      when unique_violation then
        if v_attempt = 5 then
          raise exception 'Could not allocate an order number';
        end if;
    end;
  end loop;

  for v_line_row in select value from jsonb_array_elements(resolved)
  loop
    insert into public.order_items (
      order_id, product_slug, product_name, variant, qty, unit_price, image_url
    ) values (
      v_order_id,
      v_line_row->>'product_slug',
      v_line_row->>'product_name',
      coalesce(v_line_row->>'variant', ''),
      (v_line_row->>'qty')::integer,
      (v_line_row->>'unit_price')::numeric,
      coalesce(v_line_row->>'image_url', '')
    );
  end loop;

  update public.profiles
  set loyalty_points = v_points - v_points_redeemed + v_points_earned,
      updated_at = now()
  where id = uid;

  return jsonb_build_object(
    'order_id', v_order_id,
    'subtotal', v_subtotal,
    'discount', v_sub_discount + v_coupon_discount,
    'delivery_fee', v_delivery,
    'cod_fee', v_cod,
    'loyalty_discount', v_loyalty_rupees,
    'total', v_total,
    'points_earned', v_points_earned,
    'points_redeemed', v_points_redeemed,
    'loyalty_balance', v_points - v_points_redeemed + v_points_earned
  );
end;
$$;

revoke all on function public.place_order(jsonb, text, uuid, text, boolean) from public;
grant execute on function public.place_order(jsonb, text, uuid, text, boolean) to authenticated;
