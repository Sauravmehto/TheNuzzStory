import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import logoMark from "@/assets/logo/nuzzstorylogo-removebg.png";
import type { CategorySlug } from "@/data/catalog";
import { useStore } from "@/store/StoreContext";
import { percentOff } from "@/components/home/lines";
import { Caption, Rail, Section, homeFocus } from "@/components/home/shared";
import { thumb } from "@/components/home/thumbs";

const HOUSE = "The Nuzz Story";

/** Card palette from the reference: deep, bright and pastel blocks, dark text on the light ones. */
const palette = [
  { bg: "#0b2a7a", ink: "#fff" },
  { bg: "#a3001b", ink: "#fff" },
  { bg: "#b3dcf5", ink: "#0f0f0f" },
  { bg: "#fed874", ink: "#0f0f0f" },
  { bg: "#13aee6", ink: "#fff" },
  { bg: "#9c1f6e", ink: "#fff" },
];

type BrandDeal = { brand: string; off: number; slug: CategorySlug; count: number };

export function BrandLogos() {
  const { products } = useStore();

  const brands = useMemo(() => {
    const map = new Map<string, { off: number; count: number; cats: Map<CategorySlug, number> }>();
    for (const p of products) {
      if (!p.inStock) continue;
      const entry = map.get(p.brand) ?? { off: 0, count: 0, cats: new Map() };
      entry.off = Math.max(entry.off, percentOff(p));
      entry.count += 1;
      entry.cats.set(p.category, (entry.cats.get(p.category) ?? 0) + 1);
      map.set(p.brand, entry);
    }
    const list: BrandDeal[] = [...map].map(([brand, e]) => ({
      brand,
      off: e.off,
      count: e.count,
      // Send shoppers to the category where the brand has the most products.
      slug: [...e.cats].sort((a, b) => b[1] - a[1])[0]![0],
    }));
    return list
      .sort((a, b) => Number(b.brand === HOUSE) - Number(a.brand === HOUSE) || b.count - a.count)
      .slice(0, 6);
  }, [products]);

  if (brands.length < 2) return null;

  return (
    <Section title="Brands on bigger deals">
      <Rail mobile={2.4} tablet={4.2} cols={6}>
        {brands.map((b, i) => {
          const tone = palette[i % palette.length]!;
          return (
            <Link
              key={b.brand}
              to="/category/$slug"
              params={{ slug: b.slug }}
              search={{ brand: b.brand }}
              aria-label={`${b.brand}${b.off ? `, up to ${b.off}% off` : ""}`}
              className={`home-lift group block rounded-[24px] ${homeFocus}`}
            >
              <span className="@container relative block pt-[23%]">
                <span
                  className="block rounded-[20px] px-2 pb-[9%] pt-[27%] text-center md:rounded-[26px]"
                  style={{ background: tone.bg, color: tone.ink }}
                >
                  <span className="block truncate text-[11cqw] font-semibold leading-tight">
                    {b.brand}
                  </span>
                  {/* Always two lines so every card in the row is the same height. */}
                  <span className="mt-[2cqw] block text-[14cqw] font-light leading-none">
                    {b.off > 0 ? "Up To" : "Shop the"}
                  </span>
                  <span className="block text-[17cqw] font-bold leading-tight">
                    {b.off > 0 ? `${b.off}% OFF` : "Range"}
                  </span>
                </span>
                <span
                  className="absolute left-1/2 top-0 grid aspect-square w-[46%] -translate-x-1/2 place-items-center overflow-hidden rounded-full border-[1.8cqw] bg-white transition-transform duration-300 group-hover:-translate-y-1"
                  style={{ borderColor: tone.bg }}
                >
                  {b.brand === HOUSE ? (
                    <img
                      src={thumb(logoMark)}
                      alt=""
                      width={120}
                      height={67}
                      loading="lazy"
                      className="w-[78%]"
                    />
                  ) : (
                    <span
                      className="font-wordmark text-[15cqw] font-bold leading-none"
                      style={{
                        color: tone.bg === "#fed874" || tone.bg === "#b3dcf5" ? "#0f0f0f" : tone.bg,
                      }}
                    >
                      {b.brand
                        .split(/\s+/)
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </span>
                  )}
                </span>
              </span>
              <Caption className="!mt-2">Shop Now</Caption>
            </Link>
          );
        })}
      </Rail>
    </Section>
  );
}
