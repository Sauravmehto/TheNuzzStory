import { useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, MapPin, Search, ShoppingCart, User } from "lucide-react";
import { BrandLockup } from "@/components/BrandLockup";
import { money, resolveCatalogImage } from "@/data/catalog";
import { useStore } from "@/store/StoreContext";
import { homeFocus } from "@/components/home/shared";
import { cn } from "@/lib/utils";

export function MainHeader({ onMenu }: { onMenu: () => void }) {
  const { products, cartCount, setCartOpen, wishlist, user } = useStore();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [pin, setPin] = useState("");
  const [pinOpen, setPinOpen] = useState(false);
  const [pinNote, setPinNote] = useState("");

  const hits = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q),
      )
      .slice(0, 6);
  }, [products, query]);

  return (
    <div className="relative flex items-center gap-2 px-4 py-3 md:gap-3 md:px-5 lg:gap-4 lg:px-[62px]">
      <button
        type="button"
        className={cn(
          "grid h-10 w-10 place-items-center rounded-lg border border-[var(--nav-line)] md:hidden",
          homeFocus,
        )}
        aria-label="Open menu"
        onClick={onMenu}
      >
        <span className="flex w-4 flex-col gap-1" aria-hidden>
          <span className="h-0.5 bg-white" />
          <span className="h-0.5 bg-white" />
          <span className="h-0.5 bg-white" />
        </span>
      </button>

      <BrandLockup
        compact
        className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
      />

      <form
        className="relative hidden min-w-0 md:block md:min-w-0 md:flex-1"
        onSubmit={(e) => {
          e.preventDefault();
          const first = hits[0];
          if (first) navigate({ to: "/product/$slug", params: { slug: first.slug } });
        }}
      >
        <label className="sr-only" htmlFor="home-search">
          Search products
        </label>
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--nav-ink)]/50"
        />
        <input
          id="home-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products"
          className={cn(
            "h-11 w-full rounded-full border-0 bg-white pl-10 pr-4 text-sm text-[var(--nav-ink)] outline-none placeholder:text-[var(--nav-ink)]/45",
            homeFocus,
          )}
        />
        {hits.length > 0 && (
          <ul className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 overflow-hidden rounded-xl border border-[var(--nav-drop-border)] bg-white text-[var(--nav-ink)] shadow-md">
            {hits.map((p) => (
              <li key={p.slug}>
                <Link
                  to="/product/$slug"
                  params={{ slug: p.slug }}
                  className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-[var(--nav-drop-hover)]"
                  onClick={() => setQuery("")}
                >
                  <img
                    src={resolveCatalogImage(p.image, p.category)}
                    alt=""
                    loading="lazy"
                    className="h-10 w-10 rounded-md object-cover"
                  />
                  <span className="min-w-0 flex-1 truncate">{p.name}</span>
                  <span className="font-semibold">{money(p.price)}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </form>

      <div className="relative hidden lg:block">
        <button
          type="button"
          className={cn(
            "flex h-11 items-center gap-2 rounded-full border border-[var(--nav-line)] px-3 text-sm text-white hover:bg-[var(--nav-hover)]",
            homeFocus,
          )}
          aria-expanded={pinOpen}
          onClick={() => setPinOpen((v) => !v)}
        >
          <MapPin size={16} />
          <span>{pin || "Pincode"}</span>
        </button>
        {pinOpen && (
          <form
            className="absolute right-0 top-[calc(100%+6px)] z-30 w-56 rounded-xl border border-[var(--nav-drop-border)] bg-white p-3 text-[var(--nav-ink)] shadow-md"
            onSubmit={(e) => {
              e.preventDefault();
              setPinNote(
                /^\d{6}$/.test(pin) ? `We deliver to ${pin}.` : "Enter a valid 6-digit pincode.",
              );
            }}
          >
            <label className="text-xs font-medium text-[var(--nav-ink)]/70" htmlFor="home-pin">
              Delivery pincode
            </label>
            <input
              id="home-pin"
              inputMode="numeric"
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
              className="mt-1 h-10 w-full rounded-lg border border-[var(--nav-drop-border)] px-3 text-sm"
            />
            <button
              type="submit"
              className={cn(
                "mt-2 h-10 w-full rounded-lg bg-[var(--nav-offer)] text-sm font-semibold text-white",
                homeFocus,
              )}
            >
              Check
            </button>
            {pinNote ? <p className="mt-2 text-xs text-[var(--nav-ink)]/70">{pinNote}</p> : null}
          </form>
        )}
      </div>

      <div className="ml-auto flex items-center md:ml-0">
        <Link
          to="/account/wishlist"
          aria-label={`Wishlist, ${wishlist.length} items`}
          className={cn(
            "relative grid h-10 w-10 place-items-center rounded-lg text-white hover:bg-[var(--nav-hover)]",
            homeFocus,
          )}
        >
          <Heart size={20} />
          {wishlist.length > 0 && (
            <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[var(--nav-offer)] px-1 text-[10px] font-bold text-white">
              {wishlist.length}
            </span>
          )}
        </Link>
        <button
          type="button"
          aria-label={`Open cart, ${cartCount} items`}
          onClick={() => setCartOpen(true)}
          className={cn(
            "relative grid h-10 w-10 place-items-center rounded-lg text-white hover:bg-[var(--nav-hover)]",
            homeFocus,
          )}
        >
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[var(--nav-offer)] px-1 text-[10px] font-bold text-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>
      <Link
        to={user ? "/account/profile" : "/account/login"}
        aria-label={user ? "Account" : "Log in"}
        className={cn(
          "hidden h-10 items-center gap-1 rounded-lg px-2 text-sm font-medium text-white hover:bg-[var(--nav-hover)] md:flex",
          homeFocus,
        )}
      >
        <User size={18} />
        <span className="hidden max-w-24 truncate lg:inline">{user ? user.name : "Account"}</span>
      </Link>
    </div>
  );
}
