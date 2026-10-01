import { useMemo } from "react";
import accessoriesImg from "@/assets/p-accessories.jpg";
import catFoodImg from "@/assets/p-catfood.jpg";
import healthImg from "@/assets/p-health.jpg";
import toysImg from "@/assets/p-toys.jpg";
import type { CategorySlug, Product } from "@/data/catalog";
import {
  BED_PRODUCTS,
  DEHYDRATED_PRODUCTS,
  DOG_WEAR_PRODUCTS,
  HUMAN_TSHIRT_PRODUCTS,
  KRUNCH_PRODUCTS,
  MEAL_BOOSTER_PRODUCTS,
  PEANUT_BUTTER_PRODUCTS,
  type ProductImageSet,
} from "@/data/product-assets";
import { useStore } from "@/store/StoreContext";
import { thumb } from "@/components/home/thumbs";

const shot = (set: ProductImageSet[], fileKey: string, view: "front" | "both" = "front") => {
  const item = set.find((p) => p.fileKey === fileKey) ?? set[0];
  return thumb(item ? item[view] : "");
};

/** Pack shots per line, used where a section shows a small cluster. */
export const packs = {
  krunch: [
    shot(KRUNCH_PRODUCTS, "krunchclassicchicken"),
    shot(KRUNCH_PRODUCTS, "krunchbanana&apple"),
    shot(KRUNCH_PRODUCTS, "krunchpumpkin&carrot"),
  ],
  prey: [
    shot(DEHYDRATED_PRODUCTS, "lambjerky"),
    shot(DEHYDRATED_PRODUCTS, "chickenfeet"),
    shot(DEHYDRATED_PRODUCTS, "anchovies"),
  ],
  booster: [shot(MEAL_BOOSTER_PRODUCTS, "mealbooster_sardines&anchovies")],
};

/**
 * A "line" is a shoppable slice of the catalog: a category, optionally narrowed to one
 * product type. Links carry the type as ?type= so the category page opens pre-filtered.
 */
export type Line = {
  name: string;
  slug: CategorySlug;
  type?: string;
  image: string;
  /** true = pack shot on white (render with .home-cutout); false = full photo. */
  cutout: boolean;
};

export const LINES = {
  dogFood: {
    name: "Dog Food & Treats",
    slug: "dog-food",
    image: shot(KRUNCH_PRODUCTS, "krunchclassicchicken", "both"),
    cutout: true,
  },
  krunch: {
    name: "Krunch Cookies",
    slug: "dog-food",
    type: "Krunch",
    image: shot(KRUNCH_PRODUCTS, "krunchclassicchicken", "both"),
    cutout: true,
  },
  prey: {
    name: "PREY Dehydrated",
    slug: "dog-food",
    type: "Dehydrated",
    image: shot(DEHYDRATED_PRODUCTS, "lambjerky", "both"),
    cutout: true,
  },
  booster: {
    name: "Meal Boosters",
    slug: "dog-food",
    type: "Meal Booster",
    image: shot(MEAL_BOOSTER_PRODUCTS, "mealbooster_lamborgans"),
    cutout: true,
  },
  butter: {
    name: "Peanut Butter",
    slug: "dog-food",
    type: "Peanut Butter",
    image: shot(PEANUT_BUTTER_PRODUCTS, "peanutbutter"),
    cutout: true,
  },
  beds: {
    name: "Beds",
    slug: "beds",
    // Side view: cleaner white backdrop than the front shot.
    image: thumb(BED_PRODUCTS[0]?.back ?? ""),
    cutout: true,
  },
  wear: {
    name: "Dog Wear",
    slug: "dog-wear",
    image: thumb(DOG_WEAR_PRODUCTS[0]?.front ?? ""),
    cutout: false,
  },
  tees: {
    name: "T-Shirts",
    slug: "tshirt",
    image: thumb(HUMAN_TSHIRT_PRODUCTS[0]?.front ?? ""),
    cutout: false,
  },
  toys: { name: "Toys", slug: "toys", image: thumb(toysImg), cutout: false },
  accessories: {
    name: "Accessories",
    slug: "accessories",
    image: thumb(accessoriesImg),
    cutout: false,
  },
  health: { name: "Healthcare", slug: "healthcare", image: thumb(healthImg), cutout: false },
  catFood: { name: "Cat Food", slug: "cat-food", image: thumb(catFoodImg), cutout: false },
} satisfies Record<string, Line>;

export type LineId = keyof typeof LINES;

export function inLine(product: Product, line: Line) {
  return product.category === line.slug && (!line.type || product.type === line.type);
}

export function percentOff(product: Pick<Product, "mrp" | "price">) {
  return product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;
}

/** Best live discount per line, so offer art never promises more than the catalog gives. */
export function useLineDeals() {
  const { products } = useStore();
  return useMemo(() => {
    const deals = {} as Record<LineId, number>;
    for (const id of Object.keys(LINES) as LineId[]) {
      const line: Line = LINES[id];
      deals[id] = products.reduce(
        (best, p) => (inLine(p, line) && p.inStock ? Math.max(best, percentOff(p)) : best),
        0,
      );
    }
    return deals;
  }, [products]);
}

/** Lowest in-stock price in a line, for "Starts at ₹…" tags. */
export function useLineFloor(id: LineId) {
  const { products } = useStore();
  return useMemo(() => {
    const line: Line = LINES[id];
    const prices = products.filter((p) => inLine(p, line) && p.inStock).map((p) => p.price);
    return prices.length ? Math.min(...prices) : 0;
  }, [products, id]);
}
