import { LINES, type LineId } from "@/components/home/lines";
import { HomeImage, LineLink, Rail } from "@/components/home/shared";

const tiles: Array<{ line: LineId; label: string }> = [
  { line: "krunch", label: "Krunch" },
  { line: "prey", label: "Dehydrated" },
  { line: "booster", label: "Boosters" },
  { line: "butter", label: "Nut Butter" },
  { line: "beds", label: "Beds" },
  { line: "wear", label: "Dog Wear" },
  { line: "toys", label: "Toys" },
  { line: "catFood", label: "Cat Food" },
];

/** Quick-entry tiles that overlap the hero (ref: peach tiles with yellow label pills). */
export function CategoryTiles() {
  return (
    <nav aria-label="Shop by category" className="relative z-10 -mt-10 md:-mt-12">
      <div className="home-wrap">
        <Rail mobile={3.9} tablet={6.3} cols={8} className="pb-1 pt-1">
          {tiles.map(({ line: id, label }) => {
            const line = LINES[id];
            return (
              <LineLink key={id} line={line} className="home-lift group block rounded-[22px]">
                <span className="relative block aspect-square overflow-hidden rounded-[18px] border-[3px] border-[var(--home-yellow)] bg-[var(--home-peach)] md:rounded-[22px]">
                  <span
                    aria-hidden
                    className="absolute right-[12%] top-[10%] h-1.5 w-1.5 rounded-full bg-[var(--home-navy)]"
                  />
                  <span
                    aria-hidden
                    className="absolute left-[8%] top-[22%] h-1.5 w-1.5 rounded-full bg-[var(--home-orange)]"
                  />
                  <span className="absolute inset-x-[10%] bottom-[24%] top-[8%]">
                    <HomeImage
                      src={line.image}
                      alt=""
                      cutout={line.cutout}
                      width={240}
                      height={240}
                      className={
                        line.cutout
                          ? "transition-transform duration-300 group-hover:scale-105"
                          : "rounded-xl transition-transform duration-300 group-hover:scale-105"
                      }
                    />
                  </span>
                  <span className="absolute inset-x-[6%] bottom-[5%] truncate rounded-lg bg-[var(--home-yellow)] px-1 py-0.5 text-center font-wordmark text-[13px] font-semibold leading-tight text-[var(--home-ink)] shadow-[0_2px_0_rgb(0_0_0/0.08)] sm:text-sm md:rounded-xl md:py-1 lg:text-base xl:text-xl">
                    {label}
                  </span>
                </span>
              </LineLink>
            );
          })}
        </Rail>
      </div>
    </nav>
  );
}
