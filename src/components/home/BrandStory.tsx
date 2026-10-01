import { Link } from "@tanstack/react-router";
import { Flower2 } from "lucide-react";
import logo from "@/assets/logo/logo.png";
import { DOG_WEAR_PRODUCTS, HUMAN_TSHIRT_PRODUCTS } from "@/data/product-assets";
import { Caption, HomeImage, Rail, Section, homeFocus } from "@/components/home/shared";
import { thumb } from "@/components/home/thumbs";
import maroonOnDog from "@/assets/product_list/Tshirts/marhoon gr w.jpg";

/** Orange announcement bar (ref: "Celebrating Sara's Birthday" strip). */
function StoryStrip() {
  return (
    <div className="relative isolate overflow-hidden rounded-[18px] bg-[var(--home-orange)] px-4 py-4 text-white md:rounded-[22px] md:px-6 md:py-5">
      {/* Bunting */}
      <span aria-hidden className="absolute -right-2 -top-1 hidden gap-2 lg:flex">
        {Array.from({ length: 7 }, (_, i) => (
          <span
            key={i}
            className="block h-10 w-9 bg-[var(--home-yellow)] [clip-path:polygon(0_0,100%_0,50%_100%)] xl:h-12 xl:w-11"
            style={{ transform: `translateY(${Math.round(Math.sin(i / 1.6) * 6)}px)` }}
          />
        ))}
      </span>
      <span aria-hidden className="absolute left-[27%] top-3 h-2 w-2 rounded-full bg-white/70" />
      <span
        aria-hidden
        className="absolute bottom-5 left-[70%] h-2 w-2 rounded-full bg-[var(--home-yellow)]"
      />

      <div className="flex flex-col items-center gap-3 md:flex-row md:gap-8">
        <span className="grid h-12 shrink-0 place-items-center rounded-xl bg-white px-3 md:h-16 md:px-4">
          <img
            src={thumb(logo)}
            alt="The Nuzz Story"
            width={480}
            height={165}
            loading="lazy"
            className="h-8 w-auto md:h-11"
          />
        </span>
        <div className="min-w-0 flex-1 text-center lg:pr-44">
          <p className="text-lg font-medium md:text-2xl xl:text-[28px]">
            Made in small batches, for every Nuzz
          </p>
          <p className="mx-auto mt-2 inline-block rounded-md bg-[var(--home-yellow)] px-3 py-1 text-[13px] text-[var(--home-ink)] md:px-5 md:text-base xl:text-xl">
            Human-grade ingredients · No fillers · No artificial preservatives
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = [
  { product: DOG_WEAR_PRODUCTS[0], caption: "Shop the Blue Tee" },
  { product: DOG_WEAR_PRODUCTS[1], caption: "Shop Built for Chaos" },
  { product: DOG_WEAR_PRODUCTS[2], caption: "Shop the Pink Tee" },
].filter((s) => s.product);

/** Magenta arch frame around a lifestyle photo (ref: festive style frames). */
function ArchFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <span className="relative block rounded-[24px] border-[3px] border-[var(--home-yellow)] bg-[var(--home-magenta)] px-[5%] pb-[5%] pt-[11%] md:rounded-[28px]">
      <Flower2 aria-hidden className="absolute left-[5%] top-[2.5%] h-[7%] w-auto text-pink-200" />
      <Flower2 aria-hidden className="absolute right-[5%] top-[2.5%] h-[7%] w-auto text-pink-200" />
      <span className="block aspect-[4/3] overflow-hidden rounded-[50%_50%_18px_18px/22%_22%_18px_18px] bg-[#eee]">
        <HomeImage src={src} alt={alt} width={900} height={600} className="object-[62%_center]" />
      </span>
    </span>
  );
}

export function BrandStory() {
  return (
    <>
      <section aria-label="Our story" className="home-cv home-reveal mt-10 md:mt-14 xl:mt-[72px]">
        <div className="home-wrap">
          <StoryStrip />
        </div>
      </section>
      <Section title="Styles for the main characters" className="!mt-8 md:!mt-10">
        <Rail mobile={1.35} tablet={2.4} cols={4}>
          {styles.map(({ product, caption }) => (
            <Link
              key={product!.slug}
              to="/product/$slug"
              params={{ slug: product!.slug }}
              className={`home-lift home-zoom block rounded-[24px] ${homeFocus}`}
            >
              <ArchFrame src={thumb(product!.front)} alt={product!.name} />
              <Caption>{caption}</Caption>
            </Link>
          ))}
          <Link
            to="/category/$slug"
            params={{ slug: "tshirt" }}
            className={`home-lift home-zoom block rounded-[24px] ${homeFocus}`}
          >
            <ArchFrame
              src={thumb(maroonOnDog)}
              alt={`Dog wearing the ${HUMAN_TSHIRT_PRODUCTS[1]?.name ?? "maroon Nuzz Story tee"}`}
            />
            <Caption>Shop Twinning Tees</Caption>
          </Link>
        </Rail>
      </Section>
    </>
  );
}
