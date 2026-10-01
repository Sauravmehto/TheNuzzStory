import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import heroPets from "@/assets/hero-pets.jpg";
import { money } from "@/data/catalog";
import { DOG_WEAR_PRODUCTS } from "@/data/product-assets";
import { LINES, packs, useLineFloor, type LineId } from "@/components/home/lines";
import { ArrowButton, HomeImage, LineLink, useReducedMotion } from "@/components/home/shared";
import { thumb } from "@/components/home/thumbs";
import { cn } from "@/lib/utils";

type Slide = {
  id: string;
  line: LineId;
  title: string;
  subtitle: string;
  /** Fallback tag when the line has no price floor (e.g. catalog still loading). */
  tag?: string;
  bg: string;
  ink: string;
  art: (priority: boolean) => ReactNode;
};

/** Three pack shots, the middle one forward, over a soft spotlight (ref: hero product cluster). */
function PackCluster({ images, priority }: { images: string[]; priority: boolean }) {
  const [back1, front, back2] = [images[1], images[0], images[2]];
  return (
    <div className="relative mx-auto h-full w-full max-w-[520px]">
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 aspect-square w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40"
      />
      <span
        aria-hidden
        className="absolute bottom-[6%] left-1/2 h-[6%] w-[70%] -translate-x-1/2 rounded-[50%] bg-black/10 blur-md"
      />
      {back1 && (
        <HomeImage
          src={back1}
          alt=""
          cutout
          priority={priority}
          className="absolute bottom-[8%] left-[4%] h-[64%] w-[40%] object-bottom"
        />
      )}
      {back2 && (
        <HomeImage
          src={back2}
          alt=""
          cutout
          priority={priority}
          className="absolute bottom-[8%] right-[4%] h-[64%] w-[40%] object-bottom"
        />
      )}
      {front && (
        <HomeImage
          src={front}
          alt=""
          cutout
          priority={priority}
          className="absolute bottom-[6%] left-[25%] h-[84%] w-[50%] object-bottom"
        />
      )}
    </div>
  );
}

const slides: Slide[] = [
  {
    id: "brand",
    line: "dogFood",
    title: "Where every Nuzz finds its story",
    subtitle: "Small-batch treats, made in India",
    tag: "New season",
    bg: "#f9d4ad",
    ink: "#5b2d0e",
    art: (priority) => (
      <HomeImage
        src={thumb(heroPets)}
        alt="A golden retriever and a kitten sitting together"
        priority={priority}
        width={1400}
        height={788}
        className="object-[72%_center]"
      />
    ),
  },
  {
    id: "krunch",
    line: "krunch",
    title: "Baked to be barked about",
    subtitle: "Explore Krunch cookies",
    bg: "linear-gradient(100deg, #dcebe1 0%, #b7d4c3 100%)",
    ink: "#0c5048",
    art: (priority) => <PackCluster images={packs.krunch} priority={priority} />,
  },
  {
    id: "prey",
    line: "prey",
    title: "Real meat. Nothing else.",
    subtitle: "Explore PREY dehydrated treats",
    bg: "linear-gradient(100deg, #f7e6d4 0%, #e8c39d 100%)",
    ink: "#5a2a0c",
    art: (priority) => <PackCluster images={packs.prey} priority={priority} />,
  },
  {
    id: "wear",
    line: "wear",
    title: "Dressed for the zoomies",
    subtitle: "Explore dog wear",
    bg: "linear-gradient(100deg, #e3e9f7 0%, #bfcdec 100%)",
    ink: "#13265a",
    art: (priority) => (
      <div className="mx-auto h-full w-full max-w-[440px] overflow-hidden rounded-t-full bg-white/50">
        <HomeImage
          src={thumb(DOG_WEAR_PRODUCTS[0]?.front ?? "")}
          alt="Golden retriever wearing a blue Nuzz Story dog tee"
          priority={priority}
          width={900}
          height={600}
          className="object-[70%_center]"
        />
      </div>
    ),
  },
];

function SlideTag({
  line,
  fallback,
  ink,
}: {
  line: LineId;
  fallback?: string | undefined;
  ink: string;
}) {
  const floor = useLineFloor(line);
  const text = fallback ?? (floor ? `Starts at ${money(floor)}` : "Shop the range");
  return (
    <span
      className="absolute left-0 top-0 z-10 rounded-br-2xl px-4 py-2 text-sm font-medium text-white md:px-6 md:py-2.5 md:text-lg xl:text-2xl"
      style={{ background: ink }}
    >
      {text}
    </span>
  );
}

export function HeroCarousel() {
  const scroller = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const paused = useRef(false);
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const next = Math.round(el.scrollLeft / (el.clientWidth || 1));
        if (next !== indexRef.current) {
          indexRef.current = next;
          setIndex(next);
        }
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Autoplay only while visible, the tab is active, and the user isn't interacting.
  useEffect(() => {
    const el = scroller.current;
    if (!el || reduced) return;
    let visible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? false;
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    const id = window.setInterval(() => {
      if (!visible || paused.current || document.hidden) return;
      const next = (indexRef.current + 1) % slides.length;
      el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
    }, 6000);
    return () => {
      window.clearInterval(id);
      observer.disconnect();
    };
  }, [reduced]);

  function go(next: number) {
    const el = scroller.current;
    if (!el) return;
    const wrapped = (next + slides.length) % slides.length;
    el.scrollTo({ left: wrapped * el.clientWidth, behavior: reduced ? "auto" : "smooth" });
  }

  const pause = () => (paused.current = true);
  const resume = () => (paused.current = false);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured"
      className="group/hero relative"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
      onTouchStart={pause}
    >
      <div
        ref={scroller}
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain no-scrollbar"
      >
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            className="relative w-full shrink-0 snap-start"
          >
            <LineLink
              line={LINES[slide.line]}
              label={`${slide.title}. ${slide.subtitle}`}
              className="relative isolate block h-[500px] overflow-hidden focus-visible:ring-inset md:h-[420px] xl:h-[clamp(420px,30vw,500px)]"
            >
              <div className="absolute inset-0 -z-10" style={{ background: slide.bg }} />
              <SlideTag line={slide.line} fallback={slide.tag} ink={slide.ink} />

              {slide.id === "brand" ? (
                // Photo slide: image fills the panel; text sits on its empty left side.
                <div className="absolute inset-0 -z-10">
                  {slide.art(i === 0)}
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-b from-[#f9d4ad] from-25% via-[#f9d4ad]/55 via-45% to-transparent to-65% md:bg-gradient-to-r md:from-0% md:via-[#f9d4ad]/40 md:to-100%"
                  />
                </div>
              ) : (
                <div className="absolute inset-x-0 bottom-12 top-[46%] md:bottom-10 md:left-[46%] md:right-[5%] md:top-8 xl:bottom-12">
                  {slide.art(i === 0)}
                </div>
              )}

              <HeroCopy slide={slide} />
            </LineLink>
          </div>
        ))}
      </div>

      <ArrowButton
        dir="prev"
        label="Previous slide"
        onClick={() => go(index - 1)}
        className="absolute left-3 top-1/2 hidden -translate-y-1/2 md:grid xl:left-5"
      />
      <ArrowButton
        dir="next"
        label="Next slide"
        onClick={() => go(index + 1)}
        className="absolute right-3 top-1/2 hidden -translate-y-1/2 md:grid xl:right-5"
      />
      <div className="absolute bottom-14 left-0 right-0 flex justify-center gap-1.5 md:bottom-16">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => go(i)}
            className="grid h-6 min-w-6 place-items-center"
          >
            <span
              className={cn(
                "block h-1.5 rounded-full transition-all duration-300",
                i === index ? "w-6 bg-[var(--home-ink)]/80" : "w-1.5 bg-[var(--home-ink)]/25",
              )}
            />
          </button>
        ))}
      </div>
    </section>
  );
}

function HeroCopy({ slide }: { slide: Slide }) {
  const style = { color: slide.ink } as CSSProperties;
  return (
    <div
      className="relative z-10 px-5 pt-16 md:max-w-[54%] md:px-0 md:pl-[72px] md:pt-16 lg:max-w-[50%] lg:pt-[80px] xl:pt-[104px]"
      style={style}
    >
      <p className="max-w-[16ch] text-[30px] font-semibold leading-[1.1] md:text-[34px] lg:text-[42px] xl:text-[52px]">
        {slide.title}
      </p>
      <p className="mt-2 text-lg font-light opacity-90 md:mt-3 md:text-xl lg:text-2xl xl:text-[32px]">
        {slide.subtitle}
      </p>
      <span
        className="mt-5 inline-flex h-11 items-center rounded-lg px-6 text-base font-medium text-white shadow-[0_2px_0_rgb(0_0_0/0.25)] transition-transform group-hover/hero:translate-y-[-1px] md:mt-6 md:h-12 md:px-10 md:text-lg lg:mt-7 lg:h-14 lg:px-12 lg:text-xl"
        style={{ background: slide.ink }}
      >
        Shop Now
      </span>
    </div>
  );
}
