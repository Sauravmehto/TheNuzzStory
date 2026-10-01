import { Link } from "@tanstack/react-router";
import { MapPin, Truck } from "lucide-react";
import { STORE, money } from "@/data/catalog";
import { LINES, packs, type LineId } from "@/components/home/lines";
import { Caption, HomeImage, LineLink, Rail, Section, homeFocus } from "@/components/home/shared";

const bar: Array<{ line: LineId; bg: string; glow: string; image?: string | undefined }> = [
  { line: "krunch", bg: "#3d9be0", glow: "#d9ecfb", image: packs.krunch[0] },
  { line: "prey", bg: "#e23a83", glow: "#fbdbe9", image: packs.prey[0] },
  { line: "booster", bg: "#f0a531", glow: "#fdecc9" },
  { line: "butter", bg: "#e8603c", glow: "#fbdccf" },
];

/**
 * Vivid treat cards (ref: "Now open: Treat Bar"). A pale disc sits behind each pack so the
 * multiply-blended shot keeps its true colours instead of tinting to the card colour.
 */
export function TreatBar() {
  return (
    <Section title="Now open: the treat bar">
      <Rail mobile={1.5} tablet={2.6} cols={4}>
        {bar.map(({ line: id, bg, glow, image }) => {
          const line = LINES[id];
          return (
            <LineLink key={id} line={line} className="group block rounded-[24px]">
              <span
                className="relative isolate block aspect-[10/7] overflow-hidden rounded-[24px] md:rounded-[28px]"
                style={{ background: bg }}
              >
                <span
                  aria-hidden
                  className="absolute left-1/2 top-1/2 aspect-square w-[64%] -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-500 group-hover:scale-110"
                  style={{ background: `radial-gradient(circle, #fff 0%, ${glow} 55%, ${bg} 72%)` }}
                />
                {/* Transform the img itself, never this wrapper: a transformed wrapper would
                    isolate the blend and bring the white box back. */}
                <span className="absolute inset-[9%_20%]">
                  <HomeImage
                    src={image ?? line.image}
                    alt=""
                    cutout
                    width={400}
                    height={400}
                    className="transition-transform duration-500 group-hover:-rotate-2 group-hover:scale-105"
                  />
                </span>
              </span>
              <Caption>Shop {line.name}</Caption>
            </LineLink>
          );
        })}
      </Rail>
    </Section>
  );
}

/** Bordered service strip (ref: "Get 3000+ products delivered…" banner), real store facts only. */
export function DeliveryStrip() {
  return (
    <section aria-label="Delivery and store" className="home-cv home-reveal mt-8 md:mt-10">
      <div className="home-wrap">
        <div className="relative overflow-hidden rounded-[18px] border border-[var(--home-orange)] bg-[repeating-linear-gradient(115deg,#fff_0_38px,#fff7f1_38px_76px)] px-4 pb-0 pt-4 md:rounded-[22px] md:px-8 md:pt-5">
          <div className="flex flex-col items-center gap-3 text-center md:flex-row md:justify-center md:gap-6">
            <span className="flex items-center gap-2 font-wordmark text-2xl font-bold italic leading-none text-[var(--home-navy)] md:text-3xl">
              <Truck
                className="text-[var(--home-orange)]"
                size={30}
                strokeWidth={2.25}
                aria-hidden
              />
              NUZZ<span className="text-[var(--home-orange)]">DELIVERY</span>
            </span>
            <p className="text-base text-[var(--home-ink)] md:text-xl xl:text-[26px]">
              Free delivery on orders above{" "}
              <b className="font-semibold text-[var(--home-orange)]">
                {money(STORE.freeShippingAbove)}
              </b>
              , straight from{" "}
              <b className="font-semibold text-[var(--home-navy)]">our Delhi store</b>.
            </p>
          </div>
          <Link
            to="/contact"
            className={`mx-auto mt-4 flex w-fit max-w-full items-center gap-2 rounded-t-xl bg-[var(--home-orange)] px-4 py-2 text-left text-[13px] text-white transition-colors hover:bg-[#ec5f12] md:px-8 md:text-base xl:text-lg ${homeFocus}`}
          >
            <MapPin size={18} className="shrink-0" aria-hidden />
            <span className="line-clamp-2 md:line-clamp-1">
              Visit us in Chittaranjan Park, New Delhi · {STORE.hours.split("·")[0]?.trim()}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
