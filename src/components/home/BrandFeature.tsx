import { ArrowRight } from "lucide-react";
import heroPets from "@/assets/hero-pets.jpg";
import { LINES, useLineDeals, type LineId } from "@/components/home/lines";
import { HomeImage, LineLink, Rail } from "@/components/home/shared";
import { thumb } from "@/components/home/thumbs";

const picks: LineId[] = ["krunch", "prey", "booster", "butter"];

/** Navy house-brand block (ref: "Up to 20% off, trusted by…" feature with product arches). */
export function BrandFeature() {
  const deals = useLineDeals();
  const best = Math.max(...picks.map((id) => deals[id]));

  return (
    <section
      aria-label="The Nuzz Story kitchen"
      className="home-cv home-reveal mt-10 bg-[var(--home-navy)] py-6 text-white md:mt-14 md:py-10 xl:mt-[72px] xl:py-12"
    >
      <div className="home-wrap grid gap-6 lg:grid-cols-[minmax(0,45%)_1fr] lg:items-center lg:gap-12">
        <LineLink
          line={LINES.dogFood}
          label="Shop The Nuzz Story dog food and treats"
          className="home-zoom relative block overflow-hidden rounded-[22px] bg-[#fbd9b4]"
        >
          <span className="block aspect-[16/10] md:aspect-[2/1] lg:aspect-video">
            <HomeImage
              src={thumb(heroPets)}
              alt="A golden retriever and a kitten on a peach backdrop"
              width={1400}
              height={788}
              className="object-[68%_center]"
            />
          </span>
          <span className="absolute left-5 top-5 max-w-[36%] text-[#3b1d0a] md:left-8 md:top-8">
            <span className="block font-[family-name:var(--font-tagline)] text-2xl italic leading-tight md:text-4xl xl:text-5xl">
              The Nuzz Story
            </span>
            <span className="mt-1 block text-sm md:text-base">Kitchen-made, pet-approved</span>
          </span>
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-3 bg-[var(--home-yellow)] md:h-4"
          />
        </LineLink>

        <div className="flex min-w-0 flex-col">
          <h2 className="text-2xl font-bold md:text-[28px]">
            {best > 0 ? `Up to ${best}% off` : "Fresh from our kitchen"}
          </h2>
          <p className="mt-1 text-base text-white/85 md:text-xl">
            Real meat, baked cookies and toppers, made in India
          </p>

          <Rail mobile={2.3} tablet={4} cols={4} className="mt-6 md:mt-8">
            {picks.map((id) => {
              const line = LINES[id];
              return (
                <LineLink key={id} line={line} className="group block rounded-xl">
                  <span className="relative block aspect-[5/4] overflow-hidden rounded-t-[999px] rounded-b-xl bg-[#fdecd9]">
                    <span className="absolute inset-[10%_12%_4%]">
                      <HomeImage
                        src={line.image}
                        alt=""
                        cutout
                        width={320}
                        height={320}
                        className="object-bottom transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105"
                      />
                    </span>
                  </span>
                  <span className="mt-3 block text-[15px] font-bold md:text-base">{line.name}</span>
                  <span className="mt-1 block text-sm">
                    {deals[id] > 0 ? (
                      <>
                        Up to{" "}
                        <span className="ml-0.5 rounded-sm bg-[var(--home-yellow)] px-1.5 py-0.5 font-semibold text-[var(--home-ink)]">
                          {deals[id]}% Off
                        </span>
                      </>
                    ) : (
                      <span className="text-white/75">New in</span>
                    )}
                  </span>
                </LineLink>
              );
            })}
          </Rail>

          <LineLink
            line={LINES.dogFood}
            className="mt-7 inline-flex h-12 w-fit items-center gap-3 rounded-md bg-[var(--home-yellow)] px-6 text-[15px] font-semibold text-[var(--home-ink)] transition-transform hover:-translate-y-0.5 lg:mt-auto"
          >
            Try The Nuzz Story <ArrowRight size={18} className="home-cta-arrow" />
          </LineLink>
        </div>
      </div>
    </section>
  );
}
