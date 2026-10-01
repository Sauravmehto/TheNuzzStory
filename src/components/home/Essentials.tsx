import { ArrowRight } from "lucide-react";
import { LINES, type LineId } from "@/components/home/lines";
import { HomeImage, LineLink, Rail, Section } from "@/components/home/shared";

const cards: Array<{ line: LineId; title: [string, string] }> = [
  { line: "krunch", title: ["Crunchy &", "Baked Cookies"] },
  { line: "prey", title: ["Single-Meat", "Chews"] },
  { line: "beds", title: ["Beds Worth", "Napping On"] },
];

/** Wide peach cards: big two-line heading, product on the right, orange corner arrow (ref 7). */
export function Essentials() {
  return (
    <Section title="Essentials for every dog">
      <Rail mobile={1.12} tablet={1.7} cols={3}>
        {cards.map(({ line: id, title }) => {
          const line = LINES[id];
          return (
            <LineLink
              key={id}
              line={line}
              label={`${title.join(" ")}: shop ${line.name}`}
              className="home-lift group relative isolate block aspect-[2.6/1] overflow-hidden rounded-[22px] bg-[var(--home-peach)] md:rounded-[28px] lg:aspect-[2.3/1]"
            >
              <span
                aria-hidden
                className="absolute left-[4%] top-[10%] h-3 w-3 rounded-full border-2 border-[var(--home-orange)] border-r-transparent"
              />
              <span
                aria-hidden
                className="absolute left-[42%] top-[8%] h-2 w-2 rounded-full bg-[var(--home-navy)]"
              />
              <span
                aria-hidden
                className="absolute bottom-[12%] left-[5%] h-2 w-2 rounded-full bg-[var(--home-orange)]"
              />
              <span
                aria-hidden
                className="absolute bottom-[8%] left-[48%] h-2 w-2 rounded-full bg-[#e0417f]"
              />

              <span className="absolute left-[7%] top-1/2 z-10 -translate-y-1/2 text-[clamp(20px,6.2vw,26px)] font-medium leading-[1.08] tracking-tight text-[#4a2a17] md:text-[26px] xl:text-[30px]">
                {title[0]}
                <br />
                {title[1]}
              </span>
              <span className="absolute bottom-[4%] right-[3%] top-[8%] w-[40%]">
                <HomeImage
                  src={line.image}
                  alt=""
                  cutout
                  width={420}
                  height={320}
                  className="object-bottom transition-transform duration-300 group-hover:scale-105"
                />
              </span>
              <span className="absolute bottom-0 right-0 z-10 grid h-9 w-14 place-items-center rounded-tl-2xl bg-[var(--home-orange)] text-white md:h-11 md:w-16">
                <ArrowRight
                  size={22}
                  className="transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </LineLink>
          );
        })}
      </Rail>
    </Section>
  );
}
