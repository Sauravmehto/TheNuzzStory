import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import groomingHero from "@/assets/grooming-hero.jpg";
import heroPets from "@/assets/hero-pets.jpg";
import goldenInBlack from "@/assets/product_list/Tshirts/black gr.jpg";
import goldenInWhite from "@/assets/product_list/Tshirts/white gr.jpg";
import { testimonials } from "@/data/catalog";
import { HomeImage, Rail, Section, homeFocus } from "@/components/home/shared";
import { thumb } from "@/components/home/thumbs";

/** Portrait per testimonial, in catalog order, cropped toward the pet it describes. */
const portraits = [
  { src: thumb(goldenInBlack), position: "30% 50%" },
  { src: thumb(heroPets), position: "63% 50%" },
  { src: thumb(groomingHero), position: "49% 50%" },
  { src: thumb(goldenInWhite), position: "30% 50%" },
];

/** Tall editorial cards (ref: "Explore the world of…"), carrying real parent reviews. */
export function ExploreGrid() {
  const stories = testimonials.slice(0, portraits.length);
  return (
    <Section title="Stories from the pack" className="mb-12 md:mb-16 xl:mb-20">
      <Rail mobile={1.35} tablet={2.5} cols={4}>
        {stories.map((story, i) => {
          const portrait = portraits[i]!;
          return (
            <Link
              key={story.name}
              to="/about"
              className={`home-lift home-zoom group relative block aspect-[3/4.3] overflow-hidden rounded-[22px] bg-[#e9e2da] md:rounded-[26px] ${homeFocus}`}
            >
              <HomeImage
                src={portrait.src}
                alt=""
                width={900}
                height={600}
                style={{ objectPosition: portrait.position }}
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 via-45% to-transparent"
              />
              <span className="absolute inset-x-0 bottom-0 p-4 text-white md:p-5">
                <span className="flex gap-0.5" aria-label={`${story.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }, (_, s) => (
                    <Star
                      key={s}
                      size={14}
                      aria-hidden
                      className={
                        s < story.rating
                          ? "fill-[var(--home-yellow)] text-[var(--home-yellow)]"
                          : "text-white/40"
                      }
                    />
                  ))}
                </span>
                <span className="mt-2 line-clamp-4 block text-[15px] leading-snug md:text-base">
                  “{story.text}”
                </span>
                <span className="mt-3 block text-sm font-semibold">{story.name}</span>
                <span className="block text-xs text-white/75">{story.pet}</span>
              </span>
            </Link>
          );
        })}
      </Rail>
    </Section>
  );
}
