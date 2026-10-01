import { Link } from "@tanstack/react-router";
import { Ear, Scissors, type LucideIcon } from "lucide-react";
import groomingHero from "@/assets/grooming-hero.jpg";
import groomingKit from "@/assets/p-grooming.jpg";
import { groomingServices, money } from "@/data/catalog";
import { HomeImage, Rail, Section, homeFocus } from "@/components/home/shared";
import { thumb } from "@/components/home/thumbs";

type Visual = { photo: string; position?: string } | { icon: LucideIcon; sign: string };

/** One visual per service, in catalog order. Services without a photo get a flat sign illustration. */
const visuals: Visual[] = [
  { photo: thumb(groomingHero), position: "50% 40%" },
  { photo: thumb(groomingKit) },
  { icon: Scissors, sign: "Nail Care" },
  { icon: Ear, sign: "Ear Care" },
];

/** Flat illustration in the reference's style: orange sign, dark outline, cream backdrop. */
function Sign({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <span className="@container grid h-full place-items-center bg-[#f7e3cc]">
      <span className="grid w-[48%] -rotate-3 place-items-center gap-[4cqw] rounded-[5cqw] border-[1.2cqw] border-[#2b2b2b] bg-[var(--home-orange)] px-[4cqw] py-[9cqw] text-white shadow-[2cqw_2cqw_0_#2b2b2b] transition-transform duration-500 group-hover:-rotate-1 group-hover:scale-105">
        <Icon className="h-[16cqw] w-[16cqw]" strokeWidth={2.2} aria-hidden />
        <span className="text-center text-[8cqw] font-bold leading-none">{label}</span>
      </span>
    </span>
  );
}

export function GroomingCards() {
  const services = groomingServices.slice(0, visuals.length);
  return (
    <Section title="Easy booking for gentle grooming">
      <Rail mobile={1.6} tablet={2.6} cols={4}>
        {services.map((service, i) => {
          const visual = visuals[i]!;
          return (
            <Link
              key={service.id}
              to="/grooming"
              className={`home-lift group block overflow-hidden rounded-[20px] border border-[#2b2b2b] bg-[#1f1f1f] md:rounded-[24px] ${homeFocus}`}
            >
              <span className="home-zoom block aspect-square overflow-hidden">
                {"photo" in visual ? (
                  <HomeImage
                    src={visual.photo}
                    alt=""
                    width={640}
                    height={640}
                    style={visual.position ? { objectPosition: visual.position } : undefined}
                  />
                ) : (
                  <Sign icon={visual.icon} label={visual.sign} />
                )}
              </span>
              <span className="block px-4 py-3 md:px-5 md:py-4">
                <span className="block text-[15px] font-semibold text-white md:text-base">
                  {service.name}
                </span>
                <span className="mt-0.5 block text-[13px] text-white/80 md:text-sm">
                  {service.duration} · from {money(service.price)}
                </span>
              </span>
            </Link>
          );
        })}
      </Rail>
    </Section>
  );
}
