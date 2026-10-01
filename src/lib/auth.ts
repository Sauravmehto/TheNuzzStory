import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { WELCOME_LOYALTY_POINTS, loyaltyPointsForOrder, profileLoyaltyPoints } from "@/lib/loyalty";
import type { AddressRow, AppUser, OrderItemRow, OrderRow, Profile } from "@/types/database";

export { isSupabaseConfigured, loyaltyPointsForOrder };

const notConfigured = () =>
  new Error("Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env");

export async function signUpWithEmail(params: {
  email: string;
  password: string;
  name: string;
  phone: string;
}) {
  if (!isSupabaseConfigured) {
    return { data: null, error: notConfigured() };
  }

  const { data, error } = await supabase.auth.signUp({
    email: params.email.trim().toLowerCase(),
    password: params.password,
    options: {
      data: {
        full_name: params.name.trim(),
        phone: params.phone.trim(),
      },
    },
  });

  if (!error && data.user && (data.user.identities?.length ?? 0) === 0) {
    return {
      data: null,
      error: new Error("An account with this email already exists. Try logging in."),
    };
  }

  if (error && isPhoneAlreadyRegistered(error.message)) {
    return { data: null, error: new Error("This phone number is already registered") };
  }

  return { data, error };
}

function isPhoneAlreadyRegistered(message: string): boolean {
  const msg = message.toLowerCase();
  return (
    msg.includes("phone number is already registered") ||
    msg.includes("profiles_phone") ||
    (msg.includes("duplicate") && msg.includes("phone"))
  );
}

export async function signInWithEmail(email: string, password: string) {
  if (!isSupabaseConfigured) {
    return { data: null, error: notConfigured() };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });
  return { data, error };
}

export async function requestPasswordReset(email: string, redirectTo: string) {
  if (!isSupabaseConfigured) {
    return { error: notConfigured() };
  }
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
    redirectTo,
  });
  return { error };
}

export async function updatePassword(password: string) {
  if (!isSupabaseConfigured) {
    return { error: notConfigured() };
  }
  const { error } = await supabase.auth.updateUser({ password });
  return { error };
}

export async function signOutSupabase() {
  if (!isSupabaseConfigured) return;
  await supabase.auth.signOut();
}

export async function fetchProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function upsertProfile(user: AppUser) {
  const existing = await fetchProfile(user.id);
  if (existing) {
    const { error } = await supabase
      .from("profiles")
      .update({
        name: user.name,
        email: user.email,
        phone: user.phone,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);
    if (error) throw error;
    return existing;
  }

  const { data, error } = await supabase
    .from("profiles")
    .insert({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      loyalty_points: WELCOME_LOYALTY_POINTS,
    })
    .select("*")
    .single();
  if (error) throw error;
  return data;
}

export async function updateProfile(
  userId: string,
  patch: Partial<Pick<Profile, "name" | "phone">>,
) {
  const { error } = await supabase
    .from("profiles")
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq("id", userId);
  if (error) throw error;
}

export async function fetchAddresses(userId: string): Promise<AddressRow[]> {
  const { data, error } = await supabase
    .from("addresses")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function insertAddress(
  userId: string,
  address: Omit<AddressRow, "id" | "user_id" | "created_at">,
): Promise<AddressRow> {
  const { data, error } = await supabase
    .from("addresses")
    .insert({ ...address, user_id: userId })
    .select("*")
    .single();
  if (error) throw error;
  return data;
}

export async function deleteAddress(userId: string, addressId: string) {
  const { error } = await supabase
    .from("addresses")
    .delete()
    .eq("id", addressId)
    .eq("user_id", userId);
  if (error) throw error;
}

export async function fetchOrders(
  userId: string,
): Promise<(OrderRow & { items: OrderItemRow[] })[]> {
  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  if (!orders?.length) return [];

  const ids = orders.map((o) => o.id);
  const { data: items, error: itemsError } = await supabase
    .from("order_items")
    .select("*")
    .in("order_id", ids);
  if (itemsError) throw itemsError;

  return orders.map((o) => ({
    ...o,
    items: (items ?? []).filter((i) => i.order_id === o.id),
  }));
}

export async function fetchOrderById(
  userId: string,
  orderId: string,
): Promise<(OrderRow & { items: OrderItemRow[] }) | null> {
  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw error;
  if (!order) return null;

  const { data: items, error: itemsError } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", orderId);
  if (itemsError) throw itemsError;

  return { ...order, items: items ?? [] };
}

export type PlaceOrderResult = {
  order_id: string;
  subtotal: number;
  discount: number;
  delivery_fee: number;
  cod_fee: number;
  loyalty_discount: number;
  total: number;
  points_earned: number;
  points_redeemed: number;
  loyalty_balance: number;
};

export async function placeOrderOnServer(input: {
  items: Array<{ slug: string; variant: string; qty: number; subscription: boolean }>;
  paymentMethod: string;
  addressId: string;
  couponCode: string | null;
  redeemLoyalty: boolean;
}): Promise<PlaceOrderResult> {
  const { data, error } = await supabase.rpc("place_order", {
    p_items: input.items,
    p_payment_method: input.paymentMethod,
    p_address_id: input.addressId,
    p_coupon_code: input.couponCode,
    p_redeem_loyalty: input.redeemLoyalty,
  });
  if (error) throw error;
  return data as PlaceOrderResult;
}

export function profileToAppUser(profile: Profile): AppUser {
  return {
    id: profile.id,
    name: profile.name || profile.email.split("@")[0] || "Pet Parent",
    email: profile.email,
    phone: profile.phone,
    loyaltyPoints: profileLoyaltyPoints(profile),
    role: profile.role ?? "customer",
  };
}
