import { Link, useRouterState } from "@tanstack/react-router";
import {
  BadgePercent,
  BedDouble,
  Bone,
  Cat,
  Cookie,
  Dog,
  Fish,
  HeartPulse,
  House,
  Scissors,
  Shirt,
  Sparkles,
  Store,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import type { CategorySlug } from "@/data/catalog";
import { cn } from "@/lib/utils";

const navFocus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--nav-blue)]";

const dropFocus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--nav-ink)] focus-visible:ring-offset-2";

const navItemClass =
  "nav-item-active group/item relative inline-flex items-center gap-1.5 px-3 py-3 text-sm font-medium transition-colors duration-200 hover:bg-[var(--nav-hover)]";

const navIconClass =
  "size-4 shrink-0 transition-transform duration-200 ease-out group-hover/item:scale-[1.04]";

const columnIcons: Record<string, LucideIcon> = {
  Food: UtensilsCrossed,
  Care: Scissors,
  Home: House,
};

const slugIcons: Partial<Record<CategorySlug, LucideIcon>> = {
  "dog-food": Cookie,
  "cat-food": Fish,
  healthcare: HeartPulse,
  "dog-grooming": Scissors,
  "cat-grooming": Scissors,
  "dog-wear": Shirt,
  toys: Bone,
  beds: BedDouble,
  accessories: Sparkles,
};

type Column = {
  title: string;
  links: Array<{ label: string; slug: CategorySlug }>;
};

const dogColumns: Column[] = [
  {
    title: "Food",
    links: [
      { label: "Dog food", slug: "dog-food" },
      { label: "Healthcare", slug: "healthcare" },
    ],
  },
  {
    title: "Care",
    links: [
      { label: "Grooming", slug: "dog-grooming" },
      { label: "Dog wear", slug: "dog-wear" },
    ],
  },
  {
    title: "Home",
    links: [
      { label: "Toys", slug: "toys" },
      { label: "Beds", slug: "beds" },
      { label: "Accessories", slug: "accessories" },
    ],
  },
];

const catColumns: Column[] = [
  {
    title: "Food",
    links: [
      { label: "Cat food", slug: "cat-food" },
      { label: "Healthcare", slug: "healthcare" },
    ],
  },
  {
    title: "Care",
    links: [{ label: "Grooming", slug: "cat-grooming" }],
  },
  {
    title: "Home",
    links: [
      { label: "Toys", slug: "toys" },
      { label: "Beds", slug: "beds" },
      { label: "Accessories", slug: "accessories" },
    ],
  },
];

const megaPanelClass =
  "mega-menu-panel pointer-events-none invisible absolute left-0 top-full z-30 min-w-[520px] translate-y-1 rounded-xl border border-[var(--nav-drop-border)] bg-white p-5 text-[var(--nav-ink)] opacity-0 shadow-md transition-[opacity,transform,visibility] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:grid md:grid-cols-3 md:gap-4 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100";

function Menu({
  label,
  icon: Icon,
  columns,
  active,
  pathname,
}: {
  label: string;
  icon: LucideIcon;
  columns: Column[];
  active: boolean;
  pathname: string;
}) {
  return (
    <div className="group relative">
      <button
        type="button"
        className={cn(navItemClass, navFocus)}
        data-active={active ? "true" : "false"}
        aria-haspopup="true"
        aria-current={active ? "page" : undefined}
      >
        <Icon className={navIconClass} strokeWidth={2} aria-hidden />
        {label}
      </button>
      <div className={megaPanelClass}>
        {columns.map((col) => {
          const ColIcon = columnIcons[col.title] ?? House;
          return (
            <div key={col.title}>
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--nav-ink)]/55">
                <ColIcon className="size-3.5 shrink-0" strokeWidth={2} aria-hidden />
                {col.title}
              </p>
              <ul className="mt-2 grid gap-0.5">
                {col.links.map((link) => {
                  const LinkIcon = slugIcons[link.slug];
                  const linkActive = pathname === `/category/${link.slug}`;
                  return (
                    <li key={`${col.title}-${link.label}`}>
                      <Link
                        to="/category/$slug"
                        params={{ slug: link.slug }}
                        className={cn(
                          "flex items-center gap-2 rounded-md px-1.5 py-1.5 text-sm transition-colors duration-150 hover:bg-[var(--nav-drop-hover)]",
                          dropFocus,
                          linkActive && "bg-[var(--nav-drop-hover)] font-medium",
                        )}
                        aria-current={linkActive ? "page" : undefined}
                      >
                        {LinkIcon ? (
                          <LinkIcon
                            className="size-3.5 shrink-0 text-[var(--nav-ink)]/55"
                            strokeWidth={2}
                            aria-hidden
                          />
                        ) : null}
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function MegaMenu() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const dogActive = ["/category/dog-food", "/category/dog-grooming", "/category/dog-wear"].includes(
    pathname,
  );
  const catActive = ["/category/cat-food", "/category/cat-grooming"].includes(pathname);
  const groomActive = pathname === "/grooming";

  return (
    <nav
      aria-label="Categories"
      className="hidden border-t border-[var(--nav-line)] px-5 md:block lg:px-[62px]"
    >
      <div className="flex flex-wrap items-center gap-1">
        <Menu label="Dogs" icon={Dog} columns={dogColumns} active={dogActive} pathname={pathname} />
        <Menu label="Cats" icon={Cat} columns={catColumns} active={catActive} pathname={pathname} />
        <Link
          to="/category/$slug"
          params={{ slug: "dog-food" }}
          className={cn(navItemClass, navFocus)}
          data-active="false"
        >
          <Store className={navIconClass} strokeWidth={2} aria-hidden />
          Brands
        </Link>
        <Link
          to="/grooming"
          aria-current={groomActive ? "page" : undefined}
          className={cn(navItemClass, navFocus)}
          data-active={groomActive ? "true" : "false"}
        >
          <Scissors className={navIconClass} strokeWidth={2} aria-hidden />
          Grooming
        </Link>
        <Link
          to="/category/$slug"
          params={{ slug: "dog-food" }}
          className={cn("group/offer", navItemClass, navFocus)}
          data-active="false"
        >
          <BadgePercent className={navIconClass} strokeWidth={2} aria-hidden />
          Offer Zone
          <span className="rounded-full bg-[var(--nav-offer)] px-2 py-0.5 text-[10px] font-bold text-white transition-transform duration-200 ease-out group-hover/offer:scale-[1.03]">
            Up to 20% off
          </span>
        </Link>
      </div>
    </nav>
  );
}
