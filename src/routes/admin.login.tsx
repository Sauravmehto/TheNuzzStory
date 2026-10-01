import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  fetchProfile,
  profileToAppUser,
  requestPasswordReset,
  signInWithEmail,
  signOutSupabase,
} from "@/lib/auth";
import { isStaffRole } from "@/lib/admin/roles";
import { isSupabaseConfigured } from "@/lib/supabase";
import { useStore } from "@/store/StoreContext";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

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

  return (
    <div className="grid min-h-screen place-items-center bg-[#f6f4ef] px-4">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-wide text-primary">Staff only</p>
        <h1 className="mt-2 font-display text-2xl font-extrabold">Admin login</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Sign in with the email and password on your staff account.
        </p>

        <form
          className="mt-5 grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            void submit();
          }}
        >
          <label className="text-sm">
            <span className="text-xs font-semibold text-muted-foreground">Staff email</span>
            <input
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
          </label>
          <label className="text-sm">
            <span className="text-xs font-semibold text-muted-foreground">Password</span>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
          </label>
          <button
            type="submit"
            disabled={busy}
            className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground disabled:opacity-60"
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
