import { LINES, useLineDeals, type LineId } from "@/components/home/lines";
import { Caption, LineLink, Rail, Section } from "@/components/home/shared";

const offers: Array<{ line: LineId; label: string }> = [
  { line: "krunch", label: "Dog Treats" },
  { line: "prey", label: "Dehydrated" },
  { line: "booster", label: "Meal Boosters" },
  { line: "wear", label: "Dog Wear" },
];

/* Hard offset shadow gives the sticker look from the reference without any image. */
const sticker = { WebkitTextStroke: "0.035em #111", textShadow: "0.05em 0.05em 0 #111" };

function OfferArt({ percent, label }: { percent: number; label: string }) {
  return (
    <span className="@container relative grid aspect-[10/7] place-items-center overflow-hidden rounded-[24px] bg-[radial-gradient(circle_at_50%_42%,#fff5e4_0%,#fde3c0_55%,#f9d3a6_100%)] md:rounded-[28px]">
      <span className="flex -rotate-3 flex-col items-center">
        {percent > 0 ? (
          <>
            <span className="relative flex items-start font-wordmark leading-none text-[#ff5a12]">
              <Burst side="left" />
              <span className="flex flex-col">
                <span className="text-[9cqw] font-bold" style={sticker}>
                  UP TO
                </span>
                <span className="-mt-[1cqw] text-[27cqw] font-bold tracking-tight" style={sticker}>
                  {percent}%
                </span>
              </span>
              <span className="ml-[1cqw] mt-[13cqw] text-[10cqw] font-bold" style={sticker}>
                OFF!
              </span>
              <Burst side="right" />
            </span>
          </>
        ) : (
          <span
            className="font-wordmark text-[18cqw] font-bold leading-none text-[#ff5a12]"
            style={sticker}
          >
            NEW IN
          </span>
        )}
        <span className="-mt-[1cqw] rotate-1 border-[0.6cqw] border-[#111] bg-white px-[5cqw] py-[1cqw] text-[8cqw] font-bold leading-tight text-[#111] shadow-[1.2cqw_1.2cqw_0_#111]">
          {label}
        </span>
      </span>
    </span>
  );
}

function Burst({ side }: { side: "left" | "right" }) {
  const rotations = side === "left" ? [-30, 0, 30] : [30, 0, -30];
  return (
    <span
      aria-hidden
      className={
        side === "left"
          ? "absolute -left-[9cqw] top-[12cqw] flex flex-col gap-[1.4cqw]"
          : "absolute -right-[9cqw] top-[2cqw] flex flex-col gap-[1.4cqw]"
      }
    >
      {rotations.map((deg) => (
        <span
          key={deg}
          className="block h-[1cqw] w-[5cqw] rounded-full bg-[#111]"
          style={{ transform: `rotate(${deg}deg)` }}
        />
      ))}
    </span>
  );
}

export function OfferCards() {
  const deals = useLineDeals();
  return (
    <Section id="offers" title="Spoil them this week">
      <Rail mobile={1.6} tablet={2.6} cols={4}>
        {offers.map(({ line, label }) => (
          <LineLink
            key={line}
            line={LINES[line]}
            label={deals[line] ? `${label}, up to ${deals[line]}% off` : label}
            className="home-lift block rounded-[24px]"
          >
            <OfferArt percent={deals[line]} label={label} />
            <Caption>Shop Now</Caption>
          </LineLink>
        ))}
      </Rail>
    </Section>
  );
}
