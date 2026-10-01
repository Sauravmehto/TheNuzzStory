import { l as isSupabaseConfigured, u as supabase } from "./catalog-db-DaRD-zQ5.js";
import { n as profileLoyaltyPoints } from "./loyalty-Cgl-vdog.js";
//#region src/lib/auth.ts
var notConfigured = () => /* @__PURE__ */ new Error("Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env");
async function signUpWithEmail(params) {
	if (!isSupabaseConfigured) return {
		data: null,
		error: notConfigured()
	};
	const { data, error } = await supabase.auth.signUp({
		email: params.email.trim().toLowerCase(),
		password: params.password,
		options: { data: {
			full_name: params.name.trim(),
			phone: params.phone.trim()
		} }
	});
	if (!error && data.user && (data.user.identities?.length ?? 0) === 0) return {
		data: null,
		error: /* @__PURE__ */ new Error("An account with this email already exists. Try logging in.")
	};
	if (error && isPhoneAlreadyRegistered(error.message)) return {
		data: null,
		error: /* @__PURE__ */ new Error("This phone number is already registered")
	};
	return {
		data,
		error
	};
}
function isPhoneAlreadyRegistered(message) {
	const msg = message.toLowerCase();
	return msg.includes("phone number is already registered") || msg.includes("profiles_phone") || msg.includes("duplicate") && msg.includes("phone");
}
async function signInWithEmail(email, password) {
	if (!isSupabaseConfigured) return {
		data: null,
		error: notConfigured()
	};
	const { data, error } = await supabase.auth.signInWithPassword({
		email: email.trim().toLowerCase(),
		password
	});
	return {
		data,
		error
	};
}
async function requestPasswordReset(email, redirectTo) {
	if (!isSupabaseConfigured) return { error: notConfigured() };
	const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), { redirectTo });
	return { error };
}
async function signOutSupabase() {
	if (!isSupabaseConfigured) return;
	await supabase.auth.signOut();
}
async function fetchProfile(userId) {
	const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
	if (error) throw error;
	return data;
}
async function upsertProfile(user) {
	const existing = await fetchProfile(user.id);
	if (existing) {
		const { error } = await supabase.from("profiles").update({
			name: user.name,
			email: user.email,
			phone: user.phone,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		}).eq("id", user.id);
		if (error) throw error;
		return existing;
	}
	const { data, error } = await supabase.from("profiles").insert({
		id: user.id,
		name: user.name,
		email: user.email,
		phone: user.phone,
		loyalty_points: 100
	}).select("*").single();
	if (error) throw error;
	return data;
}
async function updateProfile(userId, patch) {
	const { error } = await supabase.from("profiles").update({
		...patch,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	}).eq("id", userId);
	if (error) throw error;
}
async function fetchAddresses(userId) {
	const { data, error } = await supabase.from("addresses").select("*").eq("user_id", userId).order("created_at", { ascending: false });
	if (error) throw error;
	return data ?? [];
}
async function insertAddress(userId, address) {
	const { data, error } = await supabase.from("addresses").insert({
		...address,
		user_id: userId
	}).select("*").single();
	if (error) throw error;
	return data;
}
async function deleteAddress(userId, addressId) {
	const { error } = await supabase.from("addresses").delete().eq("id", addressId).eq("user_id", userId);
	if (error) throw error;
}
async function fetchOrders(userId) {
	const { data: orders, error } = await supabase.from("orders").select("*").eq("user_id", userId).order("created_at", { ascending: false });
	if (error) throw error;
	if (!orders?.length) return [];
	const ids = orders.map((o) => o.id);
	const { data: items, error: itemsError } = await supabase.from("order_items").select("*").in("order_id", ids);
	if (itemsError) throw itemsError;
	return orders.map((o) => ({
		...o,
		items: (items ?? []).filter((i) => i.order_id === o.id)
	}));
}
async function fetchOrderById(userId, orderId) {
	const { data: order, error } = await supabase.from("orders").select("*").eq("id", orderId).eq("user_id", userId).maybeSingle();
	if (error) throw error;
	if (!order) return null;
	const { data: items, error: itemsError } = await supabase.from("order_items").select("*").eq("order_id", orderId);
	if (itemsError) throw itemsError;
	return {
		...order,
		items: items ?? []
	};
}
async function placeOrderOnServer(input) {
	const { data, error } = await supabase.rpc("place_order", {
		p_items: input.items,
		p_payment_method: input.paymentMethod,
		p_address_id: input.addressId,
		p_coupon_code: input.couponCode,
		p_redeem_loyalty: input.redeemLoyalty
	});
	if (error) throw error;
	return data;
}
function profileToAppUser(profile) {
	return {
		id: profile.id,
		name: profile.name || profile.email.split("@")[0] || "Pet Parent",
		email: profile.email,
		phone: profile.phone,
		loyaltyPoints: profileLoyaltyPoints(profile),
		role: profile.role ?? "customer"
	};
}
//#endregion
export { fetchProfile as a, profileToAppUser as c, signOutSupabase as d, signUpWithEmail as f, fetchOrders as i, requestPasswordReset as l, upsertProfile as m, fetchAddresses as n, insertAddress as o, updateProfile as p, fetchOrderById as r, placeOrderOnServer as s, deleteAddress as t, signInWithEmail as u };
