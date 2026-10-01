import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  fetchProfile,
  profileToAppUser,
  requestPasswordReset,
  signInWithEmail,
  signUpWithEmail,
} from "@/lib/auth";
import { isValidPhone, normalizePhone } from "@/lib/phone";
import { useStore } from "@/store/StoreContext";

export const Route = createFileRoute("/account/login")({
  component: Login,
});

const MIN_PASSWORD = 6;

function Login() {
  const { user, setUserFromAuth, refreshUser, isSupabaseConfigured } = useStore();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [forgot, setForgot] = useState(false);

  if (user) {
    return (
      <div className="rounded-3xl border border-border bg-card p-8">
        <h1 className="font-display text-2xl font-extrabold">You're signed in</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Signed in as {user.name} · {user.email}
        </p>
        <button
          type="button"
          onClick={() => navigate({ to: "/account/profile" })}
          className="mt-5 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground"
        >
          Go to profile
        </button>
      </div>
    );
  }

  async function finishSignedIn(userId: string, successMessage: string) {
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
        if (!normalized || !isValidPhone(phone)) {
          throw new Error("Enter a valid 10-digit phone number");
        }

        const { data, error } = await signUpWithEmail({
          email,
          password,
          name,
          phone: normalized,
        });
        if (error) throw error;
        const authUser = data?.user;
        if (!authUser) throw new Error("Could not create account");

        if (!data.session) {
          toast.success("Account created", {
            description: "Confirm your email, then log in with your password.",
          });
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
      const { error } = await requestPasswordReset(
        email,
        `${window.location.origin}/account/reset-password`,
      );
      if (error) throw error;
      toast.success("Check your email", {
        description: "Use the link to choose a new password.",
      });
      setForgot(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send reset email");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-4 sm:rounded-3xl sm:p-8">
      <div className="flex gap-2 rounded-xl bg-secondary p-1">
        {(["signup", "login"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMode(m);
              setForgot(false);
            }}
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-bold ${
              mode === m ? "bg-card shadow-sm" : "text-muted-foreground"
            }`}
          >
            {m === "signup" ? "Sign up" : "Login"}
          </button>
        ))}
      </div>

      <h1 className="mt-5 font-display text-xl font-extrabold sm:mt-6 sm:text-2xl">
        {forgot ? "Reset your password" : mode === "signup" ? "Join The Nuzz Story" : "Welcome back"}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {forgot
          ? "We'll email you a link to choose a new password."
          : mode === "signup"
            ? "Create an account with your email and a password."
            : "Log in with the email and password you signed up with."}
      </p>

      <form
        className="mt-5 grid gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (forgot) void sendReset();
          else void submit();
        }}
      >
        {mode === "signup" && !forgot && (
          <>
            <label className="text-sm">
              <span className="text-xs font-semibold text-muted-foreground">Full name</span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            </label>
            <label className="text-sm">
              <span className="text-xs font-semibold text-muted-foreground">Phone number</span>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit mobile"
                className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            </label>
          </>
        )}
        <label className="text-sm">
          <span className="text-xs font-semibold text-muted-foreground">Email</span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
          />
        </label>
        {!forgot && (
        <label className="text-sm">
          <span className="text-xs font-semibold text-muted-foreground">Password</span>
          <input
            type="password"
            required
            minLength={MIN_PASSWORD}
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
          />
        </label>
        )}
        <button
          type="submit"
          disabled={busy}
          className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:shadow-glow disabled:opacity-60"
        >
          {busy
            ? "Please wait…"
            : forgot
              ? "Send reset link"
              : mode === "signup"
                ? "Create account"
                : "Login"}
        </button>
        {mode === "login" && (
          <button
            type="button"
            className="text-sm font-semibold text-primary"
            onClick={() => setForgot((v) => !v)}
          >
            {forgot ? "Back to login" : "Forgot password?"}
          </button>
        )}
      </form>
    </div>
  );
}
