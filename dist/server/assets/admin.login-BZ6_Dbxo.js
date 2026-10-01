import { l as isSupabaseConfigured } from "./catalog-db-DaRD-zQ5.js";
import { a as fetchProfile, c as profileToAppUser, d as signOutSupabase, u as signInWithEmail } from "./auth-CZC283GC.js";
import { d as useStore } from "./router-qWL6gFKw.js";
import { o as isStaffRole } from "./roles-DGja2QmC.js";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
//#region src/routes/admin.login.tsx?tsr-split=component
function AdminLogin() {
	const navigate = useNavigate();
	const { setUserFromAuth, refreshUser } = useStore();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [busy, setBusy] = useState(false);
	const [forgot, setForgot] = useState(false);
	async function submit() {
		if (!isSupabaseConfigured) {
			toast.error("Supabase is not configured");
			return;
		}
		setBusy(true);
		try {
			const { data, error } = await signInWithEmail(email, password);
			if (error) throw error;
			const authUser = data?.user;
			if (!authUser) throw new Error("Login failed");
			const profile = await fetchProfile(authUser.id);
			if (!profile || profile.is_active === false || !isStaffRole(profile.role)) {
				await signOutSupabase();
				toast.error("This account is not an admin. Ask a super_admin to grant access.");
				return;
			}
			setUserFromAuth(profileToAppUser(profile));
			await refreshUser();
			toast.success("Welcome to admin");
			navigate({ to: "/admin/dashboard" });
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not sign in");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ jsx("div", {
		className: "grid min-h-screen place-items-center bg-[#f6f4ef] px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-sm",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "text-xs font-bold uppercase tracking-wide text-primary",
					children: "Staff only"
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "mt-2 font-display text-2xl font-extrabold",
					children: "Admin login"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Sign in with the email and password on your staff account."
				}),
				/* @__PURE__ */ jsxs("form", {
					className: "mt-5 grid gap-4",
					onSubmit: (e) => {
						e.preventDefault();
						submit();
					},
					children: [
						/* @__PURE__ */ jsxs("label", {
							className: "text-sm",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-xs font-semibold text-muted-foreground",
								children: "Staff email"
							}), /* @__PURE__ */ jsx("input", {
								type: "email",
								required: true,
								autoComplete: "username",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								className: "mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
							})]
						}),
						/* @__PURE__ */ jsxs("label", {
							className: "text-sm",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-xs font-semibold text-muted-foreground",
								children: "Password"
							}), /* @__PURE__ */ jsx("input", {
								type: "password",
								required: true,
								autoComplete: "current-password",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								className: "mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
							})]
						}),
						/* @__PURE__ */ jsx("button", {
							type: "submit",
							disabled: busy,
							className: "rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground disabled:opacity-60",
							children: busy ? "Signing in…" : "Sign in"
						})
					]
				})
			]
		})
	});
}
//#endregion
export { AdminLogin as component };
