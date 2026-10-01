import { createContext, useContext, useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Cat, Dog, PawPrint, type LucideIcon } from "lucide-react";
import { AppNotice } from "@/components/home/AppBanner";
import { BrandFeature } from "@/components/home/BrandFeature";
import { BrandLogos } from "@/components/home/BrandLogos";
import { BrandStory } from "@/components/home/BrandStory";
import { CategoryTiles } from "@/components/home/CategoryTiles";
import { CenterCarousel } from "@/components/home/CenterCarousel";
import { Essentials } from "@/components/home/Essentials";
import { ExploreGrid } from "@/components/home/ExploreGrid";
import { GroomingCards } from "@/components/home/GroomingCards";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { LittleLoves } from "@/components/home/LittleLoves";
import { OfferCards } from "@/components/home/OfferCards";
import { ProductTabsCarousel } from "@/components/home/ProductTabsCarousel";
import { homeFocus } from "@/components/home/shared";
import { DeliveryStrip, TreatBar } from "@/components/home/TreatBar";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Nuzz Story — Premium Pet Food, Grooming & Care" },
      {
        name: "description",
        content:
          "Vet-reviewed dog and cat food, grooming products, toys and accessories. Free delivery above ₹499.",
      },
    ],
  }),
  component: Home,
});

type PetFilter = "all" | "dog" | "cat";

const PetContext = createContext<{ pet: PetFilter; setPet: (pet: PetFilter) => void } | null>(null);

function PetProvider({ children }: { children: ReactNode }) {
  const [pet, setPet] = useState<PetFilter>("all");
  return <PetContext.Provider value={{ pet, setPet }}>{children}</PetContext.Provider>;
}

function usePetFilter() {
  const value = useContext(PetContext);
  if (!value) throw new Error("Pet filter is only available on the home page");
  return value;
}

const petOptions: Array<{ id: PetFilter; label: string; icon: LucideIcon }> = [
  { id: "all", label: "All", icon: PawPrint },
  { id: "dog", label: "Dogs", icon: Dog },
  { id: "cat", label: "Cats", icon: Cat },
];

function PetPills() {
  const { pet, setPet } = usePetFilter();
  return (
    <div className="px-4 pt-3 md:hidden">
      <div
        className="grid grid-cols-3 gap-1 rounded-2xl bg-white p-1 shadow-sm"
        role="group"
        aria-label="Filter by pet"
      >
        {petOptions.map(({ id, label, icon: Icon }) => {
          const selected = pet === id;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={selected}
              onClick={() => setPet(id)}
              className={cn(
                "inline-flex h-11 items-center justify-center gap-1.5 rounded-xl text-sm font-semibold transition-colors duration-200 active:scale-[0.98]",
                homeFocus,
                selected
                  ? "bg-[var(--home-orange)] text-white shadow-sm"
                  : "text-[var(--home-text)]",
              )}
            >
              <Icon size={16} strokeWidth={2} aria-hidden />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function HomeProducts() {
  const { pet } = usePetFilter();
  return <ProductTabsCarousel pet={pet} />;
}

function Home() {
  return (
    <PetProvider>
      <div className="home-shell">
        <AppNotice />
        <PetPills />
        <h1 className="sr-only">The Nuzz Story: dog treats, food, wear and grooming</h1>
        {/* Discover: hero → quick categories → this week's offers */}
        <HeroCarousel />
        <CategoryTiles />
        <OfferCards />
        {/* Brand: who we are, then the house range */}
        <BrandStory />
        <BrandFeature />
        {/* Browse: treat lines and everyday essentials */}
        <TreatBar />
        <DeliveryStrip />
        <Essentials />
        {/* Buy: add straight to cart, then deals by brand */}
        <HomeProducts />
        <BrandLogos />
        <LittleLoves />
        {/* Wider world: other pets, grooming, community */}
        <CenterCarousel />
        <GroomingCards />
        <ExploreGrid />
      </div>
    </PetProvider>
  );
}
