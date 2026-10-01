import { LINES, useLineDeals, type LineId } from "@/components/home/lines";
import { Caption, HomeImage, LineLink, Rail, Section } from "@/components/home/shared";

const loves: LineId[] = ["toys", "beds", "accessories", "health"];

/** Orange discount balloon with a string (ref: "All of Sara's little loves"). */
function Balloon({ percent }: { percent: number }) {
  return (
    <span aria-hidden className="absolute left-[5%] top-[8%] z-10 w-[33%]">
      <span className="relative grid aspect-[1/1.08] place-items-center rounded-[50%_50%_48%_52%/52%_52%_48%_48%] bg-[var(--home-orange)] text-white shadow-[inset_-6px_-8px_0_rgb(0_0_0/0.08)]">
        <span className="font-wordmark leading-none">
          <span className="block text-[6cqw] font-semibold">UP TO</span>
          <span className="block text-[15cqw] font-bold">
            {percent}
            <span className="text-[9cqw]">%</span>
          </span>
          <span className="block text-right text-[7cqw] font-bold">OFF</span>
        </span>
        <span className="absolute -bottom-[3%] left-1/2 h-0 w-0 -translate-x-1/2 border-x-[2cqw] border-t-[2.4cqw] border-x-transparent border-t-[var(--home-orange)]" />
      </span>
      <svg viewBox="0 0 40 80" className="mx-auto -mt-px h-auto w-[34%]" fill="none">
        <path d="M20 0 C 6 20, 34 36, 18 56 S 14 76, 24 80" stroke="#1f1f1f" strokeWidth="1.6" />
      </svg>
    </span>
  );
}

export function LittleLoves() {
  const deals = useLineDeals();
  return (
    <Section title="All of their little loves">
      <Rail mobile={1.25} tablet={2.3} cols={4}>
        {loves.map((id) => {
          const line = LINES[id];
          return (
            <LineLink key={id} line={line} className="group block rounded-[24px]">
              <span className="@container relative isolate block aspect-[10/7] overflow-hidden rounded-[24px] bg-[#fcc9a6] md:rounded-[28px]">
                <svg
                  aria-hidden
                  viewBox="0 0 60 30"
                  className="absolute right-[6%] top-[4%] w-[16%]"
                  fill="none"
                >
                  <path
                    d="M2 20 C 14 2, 24 30, 34 12 S 52 4, 58 18"
                    stroke="#d81b72"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
                <span
                  aria-hidden
                  className="absolute bottom-[14%] left-[40%] h-[3cqw] w-[3cqw] rounded-full bg-[var(--home-navy)]"
                />
                {deals[id] > 0 && <Balloon percent={deals[id]} />}
                {line.cutout ? (
                  <span className="absolute bottom-[4%] right-[3%] top-[10%] w-[62%]">
                    <HomeImage
                      src={line.image}
                      alt=""
                      cutout
                      width={420}
                      height={420}
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                  </span>
                ) : (
                  <span className="absolute inset-y-0 right-0 w-[68%] [mask-image:linear-gradient(to_right,transparent,black_30%)]">
                    <HomeImage
                      src={line.image}
                      alt=""
                      width={420}
                      height={420}
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                  </span>
                )}
              </span>
              <Caption>Shop {line.name}</Caption>
            </LineLink>
          );
        })}
      </Rail>
    </Section>
  );
}
