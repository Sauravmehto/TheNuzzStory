import { createContext, useContext, useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
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

function PetPills() {
  const { pet, setPet } = usePetFilter();
  return (
    <div className="flex gap-2 px-4 pt-3 md:hidden">
      {(["all", "dog", "cat"] as const).map((id) => (
        <button
          key={id}
          type="button"
          onClick={() => setPet(id)}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium",
            homeFocus,
            pet === id
              ? "bg-[var(--home-orange)] text-white shadow-md"
              : "bg-[var(--home-bg)] text-[var(--home-text)]",
          )}
        >
          {id === "all" ? "All" : id === "dog" ? "Dogs" : "Cats"}
        </button>
      ))}
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
