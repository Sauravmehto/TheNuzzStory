import { useEffect, useRef } from "react";
import { DOG_WEAR_PRODUCTS } from "@/data/product-assets";
import { LINES, type LineId } from "@/components/home/lines";
import {
  ArrowButton,
  HomeImage,
  LineLink,
  Section,
  useReducedMotion,
} from "@/components/home/shared";
import { thumb } from "@/components/home/thumbs";

type Banner = {
  line: LineId;
  title: string;
  subtitle: string;
  bg: string;
  ink: string;
  button: string;
  image: string;
  cutout?: boolean;
};

const banners: Banner[] = [
  {
    line: "toys",
    title: "Toys that survive zoomies",
    subtitle: "Tug, fetch and chew, built tough",
    bg: "#fff0c4",
    ink: "#6b3d00",
    button: "#c0392b",
    image: LINES.toys.image,
  },
  {
    line: "wear",
    title: "It's T-Shirt Season!",
    subtitle: "Lightweight & breathable layers",
    bg: "#f8dcc6",
    ink: "#7a1414",
    button: "#13305c",
    image: thumb(DOG_WEAR_PRODUCTS[2]?.front ?? DOG_WEAR_PRODUCTS[0]?.front ?? ""),
  },
  {
    line: "catFood",
    title: "For the cat people",
    subtitle: "Flakes, cubes and crunchy bites",
    bg: "#d9efe9",
    ink: "#0b544c",
    button: "#0b544c",
    image: LINES.catFood.image,
  },
  {
    line: "beds",
    title: "Nap time, upgraded",
    subtitle: "Hand-carved wooden beds",
    bg: "#efe3da",
    ink: "#4a2716",
    button: "#4a2716",
    image: LINES.beds.image,
    cutout: true,
  },
];

/** Center-mode banner carousel with neighbours peeking in (ref: "For every kind of pet"). */
export function CenterCarousel() {
  const scroller = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Open on the second banner so both neighbours peek from the first paint.
  useEffect(() => {
    const el = scroller.current;
    const second = el?.children[1];
    if (!el || !(second instanceof HTMLElement)) return;
    el.scrollLeft = second.offsetLeft - (el.clientWidth - second.offsetWidth) / 2;
  }, []);

  function go(dir: 1 | -1) {
    const el = scroller.current;
    const slide = el?.firstElementChild;
    if (!el || !(slide instanceof HTMLElement)) return;
    el.scrollBy({ left: dir * (slide.offsetWidth + 16), behavior: reduced ? "auto" : "smooth" });
  }

  return (
    <Section title="For every kind of pet" bleed>
      <div className="relative">
        <div
          ref={scroller}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-[6%] no-scrollbar md:px-[9%] xl:px-[11%]"
        >
          {banners.map((b) => (
            <LineLink
              key={b.line}
              line={LINES[b.line]}
              label={`${b.title}. ${b.subtitle}`}
              className="group relative isolate block aspect-[4/3] w-[88%] shrink-0 snap-center overflow-hidden rounded-[22px] sm:aspect-[2.1/1] md:w-[82%] md:rounded-[28px] lg:aspect-[2.8/1] xl:aspect-[3.8/1] xl:w-[78%]"
            >
              <span className="absolute inset-0 -z-10" style={{ background: b.bg }} />
              <span className="absolute bottom-0 right-0 top-[22%] w-[46%] sm:top-0 sm:w-[52%] xl:w-[46%]">
                <HomeImage
                  src={b.image}
                  alt=""
                  cutout={b.cutout}
                  width={900}
                  height={600}
                  className={
                    b.cutout
                      ? "object-[center_bottom] p-[4%] transition-transform duration-500 group-hover:scale-105"
                      : "object-[60%_center] [mask-image:linear-gradient(to_right,transparent,black_28%)] transition-transform duration-500 group-hover:scale-105"
                  }
                />
              </span>
              <span
                className="relative block max-w-[60%] p-5 sm:max-w-[56%] md:p-7 lg:p-8 xl:px-[6%] xl:py-[3.2%]"
                style={{ color: b.ink }}
              >
                <span className="block text-2xl font-semibold leading-tight md:text-[26px] lg:text-3xl xl:text-[36px]">
                  {b.title}
                </span>
                <span className="mt-1 block text-base opacity-90 md:text-lg lg:text-xl xl:text-2xl">
                  {b.subtitle}
                </span>
                <span
                  className="mt-4 inline-flex h-10 items-center rounded-lg px-5 text-sm font-medium text-white shadow-[0_2px_0_rgb(0_0_0/0.25)] md:mt-4 md:h-11 md:px-8 md:text-base lg:mt-5 lg:h-12 lg:px-12 lg:text-lg"
                  style={{ background: b.button }}
                >
                  Shop Now
                </span>
              </span>
            </LineLink>
          ))}
        </div>
        <ArrowButton
          dir="prev"
          label="Previous banner"
          onClick={() => go(-1)}
          className="absolute left-3 top-1/2 hidden -translate-y-1/2 md:grid"
        />
        <ArrowButton
          dir="next"
          label="Next banner"
          onClick={() => go(1)}
          className="absolute right-3 top-1/2 hidden -translate-y-1/2 md:grid"
        />
      </div>
    </Section>
  );
}
