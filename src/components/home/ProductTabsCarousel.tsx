import { memo, useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import { Link } from "@tanstack/react-router";
import { BedDouble, Bone, Cookie, HeartPulse, Shirt, Star, UtensilsCrossed } from "lucide-react";
import { money, resolveCatalogImage, type Product } from "@/data/catalog";
import { useStore } from "@/store/StoreContext";
import { percentOff } from "@/components/home/lines";
import { ArrowButton, HomeImage, Rail, Section, homeFocus } from "@/components/home/shared";
import { thumb } from "@/components/home/thumbs";
import { cn } from "@/lib/utils";

type Pet = "all" | "dog" | "cat";

const TABS: Array<{
  id: string;
  label: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  match: (p: Product) => boolean;
}> = [
  {
    id: "treats",
    label: "Treats & Chews",
    icon: Cookie,
    match: (p) => /^(dog|cat)-food$/.test(p.category) && ["Krunch", "Dehydrated"].includes(p.type),
  },
  {
    id: "toppers",
    label: "Meal Toppers",
    icon: UtensilsCrossed,
    match: (p) => ["Meal Booster", "Peanut Butter"].includes(p.type),
  },
  { id: "toys", label: "Toys", icon: Bone, match: (p) => p.category === "toys" },
  {
    id: "wear",
    label: "Wear",
    icon: Shirt,
    match: (p) => p.category === "dog-wear" || p.category === "tshirt",
  },
  {
    id: "beds",
    label: "Beds & Gear",
    icon: BedDouble,
    match: (p) => p.category === "beds" || p.category === "accessories",
  },
  { id: "health", label: "Health", icon: HeartPulse, match: (p) => p.category === "healthcare" },
];

/** House pack shots are on white and look best contained + blended; lifestyle photos fill. */
const PACK_TYPES = new Set(["Krunch", "Dehydrated", "Meal Booster", "Peanut Butter", "Bed"]);

const ProductSlide = memo(function ProductSlide({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (product: Product) => void;
}) {
  const off = percentOff(product);
  const pack = PACK_TYPES.has(product.type);
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg bg-white">
      {/* Height is reserved even without a discount so every card lines up. */}
      <p
        className={cn(
          "h-6 text-center text-xs font-medium leading-6",
          off >= 5 ? "bg-[#cdeadf] text-[#157a4f]" : "bg-transparent",
        )}
      >
        {off >= 5 ? `Upto ${off}%` : ""}
      </p>
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className={cn(
          "relative isolate block aspect-square overflow-hidden bg-[#f4f5f9]",
          homeFocus,
        )}
        tabIndex={-1}
        aria-hidden
      >
        <span className={cn("absolute", pack ? "inset-[8%]" : "inset-0")}>
          <HomeImage
            src={thumb(resolveCatalogImage(product.image, product.category))}
            alt=""
            cutout={pack}
            width={400}
            height={400}
            className="transition-transform duration-500 group-hover:scale-105"
          />
        </span>
        {product.rating > 0 && (
          <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-white/85 px-1.5 py-0.5 text-[13px] text-[var(--home-ink)]">
            <Star
              size={13}
              className="fill-[var(--home-orange)] text-[var(--home-orange)]"
              aria-hidden
            />
            {product.rating.toFixed(1)}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col px-0.5 pt-3">
        <p className="truncate text-sm font-medium text-[var(--home-orange)]">{product.brand}</p>
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          className={cn(
            "truncate py-0.5 text-sm text-[var(--home-ink)] hover:underline",
            homeFocus,
          )}
          title={product.name}
        >
          {product.name}
        </Link>
        <div className="mt-2 flex items-end justify-between gap-2 border-t border-[var(--home-border)] pt-2">
          <p className="min-w-0 leading-tight">
            <span className="block text-base font-semibold text-[var(--home-ink)]">
              {money(product.price)}
            </span>
            {off > 0 ? (
              <span className="block text-xs text-[var(--home-muted)]">
                <s>{money(product.mrp)}</s> <span className="text-[#1a9a5a]">({off}%)</span>
              </span>
            ) : (
              <span className="block text-xs">&nbsp;</span>
            )}
          </p>
          <button
            type="button"
            disabled={!product.inStock}
            aria-label={
              product.inStock ? `Add ${product.name} to cart` : `${product.name} is sold out`
            }
            onClick={() => onAdd(product)}
            className={cn(
              "h-9 shrink-0 rounded-md bg-[var(--home-orange)] px-4 text-sm font-medium text-white transition-[transform,background-color] hover:bg-[#ec5f12] active:scale-95 disabled:cursor-not-allowed disabled:bg-[var(--home-border)] disabled:text-[var(--home-muted)] md:px-7",
              homeFocus,
            )}
          >
            {product.inStock ? "Add" : "Sold out"}
          </button>
        </div>
      </div>
    </article>
  );
});

function readEdges(el: HTMLElement) {
  return {
    start: el.scrollLeft <= 4,
    end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
  };
}

function sameEdges(prev: { start: boolean; end: boolean }, next: { start: boolean; end: boolean }) {
  return prev.start === next.start && prev.end === next.end ? prev : next;
}

/** Quick add-to-cart row (ref 8): tab chips, scrolling product cards, real cart action. */
export function ProductTabsCarousel({ pet }: { pet: Pet }) {
  const { products, catalogLoading, addToCart } = useStore();
  const scroller = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const groups = useMemo(() => {
    const pool = pet === "all" ? products : products.filter((p) => p.pet === pet);
    return TABS.map((tab) => ({
      ...tab,
      items: pool
        .filter(tab.match)
        .sort((a, b) => Number(b.inStock) - Number(a.inStock) || b.popularity - a.popularity)
        .slice(0, 12),
    })).filter((g) => g.items.length > 0);
  }, [products, pet]);

  const [tabId, setTabId] = useState(TABS[0]!.id);
  const active = groups.find((g) => g.id === tabId) ?? groups[0];

  const updateEdges = () => {
    const el = scroller.current;
    if (el) setEdges((prev) => sameEdges(prev, readEdges(el)));
  };

  // New tab or filter: back to the first card.
  const activeId = active?.id;
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    el.scrollTo({ left: 0 });
    setEdges((prev) => sameEdges(prev, readEdges(el)));
  }, [activeId, pet]);

  function page(dir: 1 | -1) {
    const el = scroller.current;
    const card = el?.firstElementChild;
    if (!el || !(card instanceof HTMLElement)) return;
    const step = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
    el.scrollBy({
      left: dir * step * Math.max(1, Math.floor(el.clientWidth / step)),
      behavior: "smooth",
    });
  }

  return (
    <Section title="Quick add-to-carts!">
      <div
        role="tablist"
        aria-label="Product groups"
        data-scroll=""
        className="home-rail mb-5 md:mb-6 [&>*]:!flex-none"
      >
        {groups.map((group) => {
          const selected = group.id === active?.id;
          const Icon = group.icon;
          return (
            <button
              key={group.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setTabId(group.id)}
              className={cn(
                "flex h-11 items-center gap-2 rounded-lg px-4 text-[15px] transition-colors md:h-14 md:px-6 md:text-lg",
                homeFocus,
                selected
                  ? "bg-[#1f1f1f] font-semibold text-white"
                  : "bg-[#e9eefb] text-[var(--home-ink)] hover:bg-[#dde4f7]",
              )}
            >
              <Icon
                size={18}
                className={selected ? "text-[var(--home-yellow)]" : "text-[#6b7aa8]"}
              />
              {group.label}
            </button>
          );
        })}
      </div>

      <div className="relative" role="tabpanel" aria-label={active?.label}>
        <Rail
          mobile={2.15}
          tablet={3.4}
          desktop={5.4}
          railRef={scroller}
          onScroll={updateEdges}
          label={active ? `${active.label} products` : undefined}
        >
          {catalogLoading && !active
            ? Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="aspect-[3/5] animate-pulse rounded-lg bg-[#f4f5f9]" />
              ))
            : active?.items.map((product) => (
                <ProductSlide key={product.slug} product={product} onAdd={addToCart} />
              ))}
        </Rail>
        {!edges.start && (
          <ArrowButton
            dir="prev"
            label="Previous products"
            onClick={() => page(-1)}
            className="absolute -left-3 top-[38%] hidden md:grid"
          />
        )}
        {!edges.end && (
          <ArrowButton
            dir="next"
            label="More products"
            onClick={() => page(1)}
            className="absolute -right-3 top-[38%] hidden md:grid"
          />
        )}
      </div>
    </Section>
  );
}
