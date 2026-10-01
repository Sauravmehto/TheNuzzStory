import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Home, LayoutGrid, LogOut, Tag, User, X } from "lucide-react";
import type { CategorySlug } from "@/data/catalog";
import { homeFocus } from "@/components/home/shared";
import { useStore } from "@/store/StoreContext";
import { cn } from "@/lib/utils";

const drawerLinks: Array<{
  label: string;
  slug?: CategorySlug;
  to?: "/grooming" | "/about" | "/contact" | "/faq";
}> = [
  { label: "Dog food", slug: "dog-food" },
  { label: "Cat food", slug: "cat-food" },
  { label: "Grooming salon", to: "/grooming" },
  { label: "Toys", slug: "toys" },
  { label: "Beds", slug: "beds" },
  { label: "Dog wear", slug: "dog-wear" },
  { label: "Healthcare", slug: "healthcare" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "FAQ", to: "/faq" },
];

export function MobileNav({
  open,
  onClose,
  onOpen,
}: {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}) {
  const { user, signOut } = useStore();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  async function logout() {
    onClose();
    await signOut();
    void navigate({ to: "/" });
  }

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[55] md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/40"
            onClick={onClose}
          />
          <aside className="absolute inset-y-0 left-0 flex w-[min(100%,320px)] flex-col bg-white p-5 text-[var(--nav-ink)] shadow-xl">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold">Menu</p>
              <button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className={cn("grid h-10 w-10 place-items-center", homeFocus)}
              >
                <X size={18} />
              </button>
            </div>
            <nav className="mt-4 grid gap-1 overflow-y-auto" aria-label="Mobile categories">
              {drawerLinks.map((link) =>
                link.slug ? (
                  <Link
                    key={link.label}
                    to="/category/$slug"
                    params={{ slug: link.slug }}
                    onClick={onClose}
                    className="rounded-lg px-2 py-3 text-sm font-medium hover:bg-[var(--nav-drop-hover)]"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <Link
                    key={link.label}
                    to={link.to ?? "/"}
                    onClick={onClose}
                    className="rounded-lg px-2 py-3 text-sm font-medium hover:bg-[var(--nav-drop-hover)]"
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </nav>
            <div className="mt-auto border-t border-[var(--nav-drop-border)] pt-3">
              {user ? (
                <button
                  type="button"
                  onClick={() => void logout()}
                  className={cn(
                    "flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-[var(--nav-drop-border)] text-sm font-semibold",
                    homeFocus,
                  )}
                >
                  <LogOut size={16} /> Log out
                </button>
              ) : (
                <Link
                  to="/account/login"
                  onClick={onClose}
                  className={cn(
                    "flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[var(--nav-blue)] text-sm font-semibold text-white",
                    homeFocus,
                  )}
                >
                  <User size={16} /> Log in
                </Link>
              )}
            </div>
          </aside>
        </div>
      )}

      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-4 border-t border-[var(--nav-drop-border)] bg-white py-2 text-[var(--nav-ink)] md:hidden"
      >
        <Link
          to="/"
          className={cn(
            "grid place-items-center gap-1 text-[11px] font-medium",
            pathname === "/" && "text-[var(--nav-blue)]",
          )}
        >
          <Home size={18} /> Home
        </Link>
        <button
          type="button"
          onClick={onOpen}
          className="grid place-items-center gap-1 text-[11px] font-medium"
        >
          <LayoutGrid size={18} /> Category
        </button>
        <Link
          to="/"
          hash="offers"
          className="grid place-items-center gap-1 text-[11px] font-medium"
        >
          <Tag size={18} /> Offers
        </Link>
        <Link
          to={user ? "/account/profile" : "/account/login"}
          className="grid place-items-center gap-1 text-[11px] font-medium"
        >
          <User size={18} /> Account
        </Link>
      </nav>
    </>
  );
}
