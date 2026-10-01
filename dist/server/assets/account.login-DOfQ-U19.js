import { a as fetchProfile, c as profileToAppUser, f as signUpWithEmail, l as requestPasswordReset, u as signInWithEmail } from "./auth-CZC283GC.js";
import { d as useStore } from "./router-qWL6gFKw.js";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
//#region src/lib/phone.ts
/** Normalize Indian mobile numbers to 10 digits for storage/lookup. */
function normalizePhone(input) {
	const digits = input.replace(/\D/g, "");
	if (digits.length === 10) return digits;
	if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
	if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
	return null;
}
function isValidPhone(input) {
	return normalizePhone(input) !== null;
}
//#endregion
//#region src/routes/account.login.tsx?tsr-split=component
var MIN_PASSWORD = 6;
function Login() {
	const { user, setUserFromAuth, refreshUser, isSupabaseConfigured } = useStore();
	const navigate = useNavigate();
	const [mode, setMode] = useState("signup");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [busy, setBusy] = useState(false);
	const [forgot, setForgot] = useState(false);
	if (user) return /* @__PURE__ */ jsxs("div", {
		className: "rounded-3xl border border-border bg-card p-8",
		children: [
			/* @__PURE__ */ jsx("h1", {
				className: "font-display text-2xl font-extrabold",
				children: "You're signed in"
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: [
					"Signed in as ",
					user.name,
					" · ",
					user.email
				]
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: () => navigate({ to: "/account/profile" }),
				className: "mt-5 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground",
				children: "Go to profile"
			})
		]
	});
	async function finishSignedIn(userId, successMessage) {
		const profile = await fetchProfile(userId);
		if (profile) setUserFromAuth(profileToAppUser(profile));
		await refreshUser();
		toast.success(successMessage);
		navigate({ to: "/account/profile" });
	}
	async function submit() {
		if (!isSupabaseConfigured) {
			toast.error("Add your Supabase URL and anon key to .env first");
			return;
		}
		if (password.length < MIN_PASSWORD) {
			toast.error(`Password must be at least ${MIN_PASSWORD} characters`);
			return;
		}
		setBusy(true);
		try {
			if (mode === "signup") {
				if (!name.trim()) throw new Error("Enter your full name");
				const normalized = normalizePhone(phone);
				if (!normalized || !isValidPhone(phone)) throw new Error("Enter a valid 10-digit phone number");
				const { data, error } = await signUpWithEmail({
					email,
					password,
					name,
					phone: normalized
				});
				if (error) throw error;
				const authUser = data?.user;
				if (!authUser) throw new Error("Could not create account");
				if (!data.session) {
					toast.success("Account created", { description: "Confirm your email, then log in with your password." });
					setMode("login");
					setPassword("");
					return;
				}
				await finishSignedIn(authUser.id, "Signed up successfully · +100 loyalty points");
				return;
			}
			const { data, error } = await signInWithEmail(email, password);
			if (error) throw error;
			const authUser = data?.user;
			if (!authUser) throw new Error("Login failed");
			await finishSignedIn(authUser.id, "Welcome back");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not sign in");
		} finally {
			setBusy(false);
		}
	}
	async function sendReset() {
		if (!isSupabaseConfigured) {
			toast.error("Add your Supabase URL and anon key to .env first");
			return;
		}
		setBusy(true);
		try {
			const { error } = await requestPasswordReset(email, `${window.location.origin}/account/reset-password`);
			if (error) throw error;
			toast.success("Check your email", { description: "Use the link to choose a new password." });
			setForgot(false);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not send reset email");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-md rounded-2xl border border-border bg-card p-4 sm:rounded-3xl sm:p-8",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "flex gap-2 rounded-xl bg-secondary p-1",
				children: ["signup", "login"].map((m) => /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: () => {
						setMode(m);
						setForgot(false);
					},
					className: `flex-1 rounded-lg px-3 py-2 text-sm font-bold ${mode === m ? "bg-card shadow-sm" : "text-muted-foreground"}`,
					children: m === "signup" ? "Sign up" : "Login"
				}, m))
			}),
			/* @__PURE__ */ jsx("h1", {
				className: "mt-5 font-display text-xl font-extrabold sm:mt-6 sm:text-2xl",
				children: forgot ? "Reset your password" : mode === "signup" ? "Join The Nuzz Story" : "Welcome back"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: forgot ? "We'll email you a link to choose a new password." : mode === "signup" ? "Create an account with your email and a password." : "Log in with the email and password you signed up with."
			}),
			/* @__PURE__ */ jsxs("form", {
				className: "mt-5 grid gap-4",
				onSubmit: (e) => {
					e.preventDefault();
					if (forgot) sendReset();
					else submit();
				},
				children: [
					mode === "signup" && !forgot && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("label", {
						className: "text-sm",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-xs font-semibold text-muted-foreground",
							children: "Full name"
						}), /* @__PURE__ */ jsx("input", {
							required: true,
							value: name,
							onChange: (e) => setName(e.target.value),
							className: "mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
						})]
					}), /* @__PURE__ */ jsxs("label", {
						className: "text-sm",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-xs font-semibold text-muted-foreground",
							children: "Phone number"
						}), /* @__PURE__ */ jsx("input", {
							type: "tel",
							required: true,
							value: phone,
							onChange: (e) => setPhone(e.target.value),
							placeholder: "10-digit mobile",
							className: "mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
						})]
					})] }),
					/* @__PURE__ */ jsxs("label", {
						className: "text-sm",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-xs font-semibold text-muted-foreground",
							children: "Email"
						}), /* @__PURE__ */ jsx("input", {
							type: "email",
							required: true,
							autoComplete: "email",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							className: "mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
						})]
					}),
					!forgot && /* @__PURE__ */ jsxs("label", {
						className: "text-sm",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-xs font-semibold text-muted-foreground",
							children: "Password"
						}), /* @__PURE__ */ jsx("input", {
							type: "password",
							required: true,
							minLength: MIN_PASSWORD,
							autoComplete: mode === "signup" ? "new-password" : "current-password",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							className: "mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
						})]
					}),
					/* @__PURE__ */ jsx("button", {
						type: "submit",
						disabled: busy,
						className: "rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:shadow-glow disabled:opacity-60",
						children: busy ? "Please wait…" : forgot ? "Send reset link" : mode === "signup" ? "Create account" : "Login"
					}),
					mode === "login" && /* @__PURE__ */ jsx("button", {
						type: "button",
						className: "text-sm font-semibold text-primary",
						onClick: () => setForgot((v) => !v),
						children: forgot ? "Back to login" : "Forgot password?"
					})
				]
			})
		]
	});
}
//#endregion
export { Login as component };
