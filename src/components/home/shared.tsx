import {
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
  type Ref,
  type UIEventHandler,
} from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Line } from "@/components/home/lines";
import { cn } from "@/lib/utils";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return reduced;
}

export const homeFocus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--home-orange)] focus-visible:ring-offset-2";

/** One vertical rhythm for every titled section: 40px mobile → 56px tablet → 72px desktop. */
export function Section({
  id,
  title,
  action,
  children,
  className,
  bleed,
}: {
  id?: string;
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Full-width background; children manage their own .home-wrap. */
  bleed?: boolean;
}) {
  const head = title ? (
    <div className="mb-4 flex items-end justify-between gap-4 md:mb-5">
      <h2 className="home-title">{title}</h2>
      {action}
    </div>
  ) : null;

  return (
    <section
      id={id}
      aria-label={title}
      className={cn("home-cv home-reveal mt-10 md:mt-14 xl:mt-[72px]", className)}
    >
      {bleed ? (
        <>
          {head ? <div className="home-wrap">{head}</div> : null}
          {children}
        </>
      ) : (
        <div className="home-wrap">
          {head}
          {children}
        </div>
      )}
    </section>
  );
}

/**
 * Swipe row on mobile/tablet, grid on desktop (see .home-rail in styles.css).
 * `mobile`/`tablet` are visible-card counts; a fraction leaves a peek of the next card.
 */
export function Rail({
  mobile,
  tablet,
  cols,
  desktop,
  className,
  label,
  children,
  railRef,
  onScroll,
}: {
  mobile: number;
  tablet: number;
  cols?: number | undefined;
  /** When set, stays a scroller on desktop showing this many cards. */
  desktop?: number | undefined;
  className?: string | undefined;
  label?: string | undefined;
  children: ReactNode;
  railRef?: Ref<HTMLDivElement> | undefined;
  onScroll?: UIEventHandler<HTMLDivElement> | undefined;
}) {
  const style = {
    "--rail-m": mobile,
    "--rail-t": tablet,
    "--rail-cols": cols ?? 4,
    ...(desktop ? { "--rail-d": desktop } : {}),
  } as CSSProperties;
  return (
    <div
      ref={railRef}
      onScroll={onScroll}
      role={label ? "group" : undefined}
      aria-label={label}
      data-scroll={desktop ? "" : undefined}
      className={cn("home-rail", className)}
      style={style}
    >
      {children}
    </div>
  );
}

export function HomeImage({
  src,
  alt,
  className,
  priority = false,
  width = 640,
  height = 640,
  cutout = false,
  style,
}: {
  src: string | undefined;
  alt: string;
  className?: string | undefined;
  priority?: boolean | undefined;
  width?: number | undefined;
  height?: number | undefined;
  cutout?: boolean | undefined;
  style?: CSSProperties | undefined;
}) {
  if (!src) {
    return <div role="img" aria-label={alt} className={cn("h-full w-full", className)} />;
  }
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
      style={style}
      className={cn("h-full w-full", cutout ? "home-cutout" : "object-cover", className)}
    />
  );
}

/** Link into a catalog line; the product type rides along as ?type= for pre-filtering. */
export function LineLink({
  line,
  className,
  children,
  label,
}: {
  line: Line;
  className?: string;
  children: ReactNode;
  label?: string;
}) {
  return (
    <Link
      to="/category/$slug"
      params={{ slug: line.slug }}
      search={line.type ? { type: line.type } : {}}
      aria-label={label}
      className={cn(homeFocus, className)}
    >
      {children}
    </Link>
  );
}

/** Centered "Shop X →" line under a card, as in the references. */
export function Caption({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "mt-3 block text-center text-sm text-[var(--home-text)] md:text-[15px]",
        className,
      )}
    >
      {children}{" "}
      <span className="home-cta-arrow" aria-hidden>
        →
      </span>
    </span>
  );
}

export function ArrowButton({
  dir,
  label,
  onClick,
  className,
}: {
  dir: "prev" | "next";
  label: string;
  onClick: () => void;
  className?: string;
}) {
  const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "grid h-10 w-10 place-items-center rounded-full bg-white text-[var(--home-ink)] shadow-[0_2px_10px_rgb(0_0_0/0.16)] transition-transform hover:scale-105 active:scale-95",
        homeFocus,
        className,
      )}
    >
      <Icon size={18} strokeWidth={2.25} />
    </button>
  );
}
