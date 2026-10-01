import { n as TSS_SERVER_FUNCTION } from "../server.js";
import { a as assertPermission, c as permissionsForRole, i as STAFF_ROLES, n as DEFAULT_ROLE_PERMISSIONS, o as isStaffRole, t as ALL_PERMISSIONS } from "./roles-DGja2QmC.js";
import { createClient } from "@supabase/supabase-js";
//#region node_modules/@tanstack/start-server-core/dist/esm/createServerRpc.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
//#region src/server/supabase.ts
function env(name) {
	const fromProcess = typeof process !== "undefined" ? process.env[name] : void 0;
	const fromMeta = {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_SUPABASE_ANON_KEY": "sb_publishable_ctUdGpQ6Eijw1d0tbcHjnQ_5l970XSZ",
		"VITE_SUPABASE_PUBLISHABLE_KEY": "sb_publishable_ctUdGpQ6Eijw1d0tbcHjnQ_5l970XSZ",
		"VITE_SUPABASE_URL": "https://ittmbsqsgndgmwmtavim.supabase.co"
	}[name];
	return fromProcess || fromMeta;
}
/** Server-only Supabase client (service role). Never import into browser components. */
function createServiceSupabase() {
	const url = env("SUPABASE_URL") || env("VITE_SUPABASE_URL");
	const secret = env("SUPABASE_SECRET_KEY");
	if (!url || !secret) throw new Error("Missing SUPABASE_URL or SUPABASE_SECRET_KEY for admin server client");
	return createClient(url, secret, { auth: {
		persistSession: false,
		autoRefreshToken: false
	} });
}
//#endregion
//#region src/server/audit.ts
async function writeAuditLog(input) {
	try {
		await createServiceSupabase().from("audit_log").insert({
			actor_id: input.session.userId,
			actor_email: input.session.email,
			action: input.action,
			entity_type: input.entityType,
			entity_id: input.entityId ?? "",
			details: input.details ?? {}
		});
	} catch (err) {
		console.error("audit log failed", err);
	}
}
//#endregion
//#region src/server/admin-auth.ts
async function loadPermissionOverrides() {
	const { data, error } = await createServiceSupabase().from("role_permissions").select("*");
	if (error || !data?.length) return { ...DEFAULT_ROLE_PERMISSIONS };
	const map = {
		ops: [],
		support: [],
		admin: [],
		super_admin: []
	};
	for (const row of data) {
		if (!isStaffRole(row.role)) continue;
		if (!row.allowed) continue;
		if (ALL_PERMISSIONS.includes(row.permission)) map[row.role].push(row.permission);
	}
	for (const role of STAFF_ROLES) if (map[role].length === 0) map[role] = [...DEFAULT_ROLE_PERMISSIONS[role]];
	map.super_admin = [...ALL_PERMISSIONS];
	return map;
}
async function resolveStaffFromAccessToken(accessToken) {
	const admin = createServiceSupabase();
	const { data: authData, error: authError } = await admin.auth.getUser(accessToken);
	if (authError || !authData.user) throw new Error("Not authenticated");
	const { data: profile, error: profileError } = await admin.from("profiles").select("*").eq("id", authData.user.id).maybeSingle();
	if (profileError) throw profileError;
	if (!profile || profile.is_active === false || !isStaffRole(profile.role)) throw new Error("Admin access denied");
	const overrides = await loadPermissionOverrides();
	return {
		session: {
			userId: profile.id,
			email: profile.email,
			role: profile.role,
			name: profile.name || profile.email,
			permissions: permissionsForRole(profile.role, overrides)
		},
		overrides
	};
}
async function requirePermissionFromToken(accessToken, permission) {
	const { session, overrides } = await resolveStaffFromAccessToken(accessToken);
	assertPermission(session.role, permission, overrides);
	return {
		session,
		overrides,
		admin: createServiceSupabase()
	};
}
//#endregion
export { createServerRpc as i, resolveStaffFromAccessToken as n, writeAuditLog as r, requirePermissionFromToken as t };
