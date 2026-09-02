import anchoviesFront from "@/assets/product_list/dehydrated/anchovies_front.jpg";
import anchoviesBack from "@/assets/product_list/dehydrated/anchovies_back.jpg";
import anchoviesBoth from "@/assets/product_list/dehydrated/anchovies_both.jpg";
import chickenBreastFront from "@/assets/product_list/dehydrated/chickenbreast_front.jpg";
import chickenBreastBack from "@/assets/product_list/dehydrated/chickenbreast_back.jpg";
import chickenBreastBoth from "@/assets/product_list/dehydrated/chickenbreast_both.jpg";
import chickenCoconutFront from "@/assets/product_list/dehydrated/chickencoconut_front.jpg";
import chickenCoconutBack from "@/assets/product_list/dehydrated/chickencoconut_back.jpg";
import chickenCoconutBoth from "@/assets/product_list/dehydrated/chickencoconut_both.jpg";
import chickenFeetFront from "@/assets/product_list/dehydrated/chickenfeet_front.jpg";
import chickenFeetBack from "@/assets/product_list/dehydrated/chickenfeet_back.jpg";
import chickenFeetBoth from "@/assets/product_list/dehydrated/chickenfeet_both.jpg";
import lambJerkyFront from "@/assets/product_list/dehydrated/lambjerky_front.jpg";
import lambJerkyBack from "@/assets/product_list/dehydrated/lambjerky_back.jpg";
import lambJerkyBoth from "@/assets/product_list/dehydrated/lambjerky_both.jpg";
import lambOrgansFront from "@/assets/product_list/dehydrated/lamborgans_front.jpg";
import lambOrgansBack from "@/assets/product_list/dehydrated/lamborgans_back.jpg";
import lambOrgansBoth from "@/assets/product_list/dehydrated/lamborgans_both.jpg";
import turkeyChunksFront from "@/assets/product_list/dehydrated/turkeymeatychunks_front.jpg";
import turkeyChunksBack from "@/assets/product_list/dehydrated/turkeymeatychunks_back.jpg";
import turkeyChunksBoth from "@/assets/product_list/dehydrated/turkeymeatychunks_both.jpg";

import krunchBananaAppleFront from "@/assets/product_list/krunch/krunchbanana&apple_front.jpg";
import krunchBananaAppleBack from "@/assets/product_list/krunch/krunchbanana&apple_back.jpg";
import krunchBananaAppleBoth from "@/assets/product_list/krunch/krunchbanana&apple_both.jpg";
import krunchChickenCheeseFront from "@/assets/product_list/krunch/krunchchicken&cheese_front.jpg";
import krunchChickenCheeseBack from "@/assets/product_list/krunch/krunchchicken&cheese_back.jpg";
import krunchChickenCheeseBoth from "@/assets/product_list/krunch/krunchchicken&cheese_both.jpg";
import krunchChickenGoatmilkFront from "@/assets/product_list/krunch/krunchchicken&goatmilk_front.jpg";
import krunchChickenGoatmilkBack from "@/assets/product_list/krunch/krunchchicken&goatmilk_back.jpg";
import krunchChickenGoatmilkBoth from "@/assets/product_list/krunch/krunchchicken&goatmilk_both.jpg";
import krunchClassicChickenFront from "@/assets/product_list/krunch/krunchclassicchicken_front.jpg";
import krunchClassicChickenBack from "@/assets/product_list/krunch/krunchclassicchicken_back.jpg";
import krunchClassicChickenBoth from "@/assets/product_list/krunch/krunchclassicchicken_both.jpg";
import krunchClassicLambFront from "@/assets/product_list/krunch/krunchclassiclamb_front.jpg";
import krunchClassicLambBack from "@/assets/product_list/krunch/krunchclassiclamb_back.jpg";
import krunchClassicLambBoth from "@/assets/product_list/krunch/krunchclassiclamb_both.jpg";
import krunchPumpkinCarrotFront from "@/assets/product_list/krunch/krunchpumpkin&carrot_front.jpg";
import krunchPumpkinCarrotBack from "@/assets/product_list/krunch/krunchpumpkin&carrot_back.jpg";
import krunchPumpkinCarrotBoth from "@/assets/product_list/krunch/krunchpumpkin&carrot_both.jpg";

import mbChickenTurmericFront from "@/assets/product_list/meal booster/mealbooster_chickenorganswithturmeric_front.jpg";
import mbChickenTurmericBack from "@/assets/product_list/meal booster/mealbooster_chickenorganswithturmeric_back.jpg";
import mbLambOrgansFront from "@/assets/product_list/meal booster/mealbooster_lamborgans_front.jpg";
import mbLambOrgansBack from "@/assets/product_list/meal booster/mealbooster_lamborgans_back.jpg";
import mbSardinesAnchoviesFront from "@/assets/product_list/meal booster/mealbooster_sardines&anchovies_front.jpg";
import mbSardinesAnchoviesBack from "@/assets/product_list/meal booster/mealbooster_sardines&anchovies_back.jpg";

import peanutButterFront from "@/assets/product_list/peanutbutter/peanutbutter_front.jpg";
import peanutButterBack from "@/assets/product_list/peanutbutter/peanutbutter_back.jpg";

import bedFront from "@/assets/product_list/bed/bed_front.png";
import bedSide from "@/assets/product_list/bed/bed_side.png";
import bedLower from "@/assets/product_list/bed/bed_lower.png";

import teeBlack from "@/assets/product_list/Tshirts/black .jpg";
import teeBlueFront from "@/assets/product_list/Tshirts/blue f gr.jpg";
import teeBlueAlt from "@/assets/product_list/Tshirts/blue gr f.jpg";
import teeChaosRed from "@/assets/product_list/Tshirts/built for choas red.jpg";
import teeMaroon from "@/assets/product_list/Tshirts/marhoon.jpg";
import teePinkFront from "@/assets/product_list/Tshirts/pink front gr.jpg";
import teePinkGr from "@/assets/product_list/Tshirts/pink gr.jpg";
import teeWhite from "@/assets/product_list/Tshirts/white.jpg";

export type ProductImageSet = {
  key: string;
  /** Exact image basename prefix used in files, e.g. krunchbanana&apple */
  fileKey: string;
  slug: string;
  name: string;
  type: "Dehydrated" | "Krunch" | "Meal Booster" | "Peanut Butter" | "Bed" | "Men's T-Shirt" | "Dog T-Shirt";
  pet: "dog" | "cat";
  category: "dog-food" | "beds" | "tshirt" | "dog-wear";
  price: number;
  mrp: number;
  front: string;
  back: string;
  /** Card image — uses `_both` when available, otherwise `front`. */
  both: string;
  /** If false, DB key stores `_front.jpg` instead of `_both.jpg`. */
  hasBothFile?: boolean;
  /** Override gallery order (e.g. front → side → lower for beds). */
  gallery?: string[];
  /** Override filename → URL map when shots aren't front/back/both. */
  customFiles?: Record<string, string>;
  /** Stable card-image filename for DB (defaults from fileKey + both/front). */
  cardImageFile?: string;
};

/** Real dehydrated SKUs — card uses `both`; PDP gallery is both → front → back. */
export const DEHYDRATED_PRODUCTS: ProductImageSet[] = [
  {
    key: "anchovies",
    fileKey: "anchovies",
    slug: "anchovies-dehydrated",
    name: "Anchovies Dehydrated",
    type: "Dehydrated",
    pet: "dog",
    category: "dog-food",
    price: 449,
    mrp: 599,
    front: anchoviesFront,
    back: anchoviesBack,
    both: anchoviesBoth,
  },
  {
    key: "chickenbreast",
    fileKey: "chickenbreast",
    slug: "chicken-breast-dehydrated",
    name: "Chicken Breast Dehydrated",
    type: "Dehydrated",
    pet: "dog",
    category: "dog-food",
    price: 549,
    mrp: 699,
    front: chickenBreastFront,
    back: chickenBreastBack,
    both: chickenBreastBoth,
  },
  {
    key: "chickencoconut",
    fileKey: "chickencoconut",
    slug: "chicken-coconut-dehydrated",
    name: "Chicken Coconut Dehydrated",
    type: "Dehydrated",
    pet: "dog",
    category: "dog-food",
    price: 529,
    mrp: 679,
    front: chickenCoconutFront,
    back: chickenCoconutBack,
    both: chickenCoconutBoth,
  },
  {
    key: "chickenfeet",
    fileKey: "chickenfeet",
    slug: "chicken-feet-dehydrated",
    name: "Chicken Feet Dehydrated",
    type: "Dehydrated",
    pet: "dog",
    category: "dog-food",
    price: 499,
    mrp: 649,
    front: chickenFeetFront,
    back: chickenFeetBack,
    both: chickenFeetBoth,
  },
  {
    key: "lambjerky",
    fileKey: "lambjerky",
    slug: "lamb-jerky-dehydrated",
    name: "Lamb Jerky Dehydrated",
    type: "Dehydrated",
    pet: "dog",
    category: "dog-food",
    price: 599,
    mrp: 749,
    front: lambJerkyFront,
    back: lambJerkyBack,
    both: lambJerkyBoth,
  },
  {
    key: "lamborgans",
    fileKey: "lamborgans",
    slug: "lamb-organs-dehydrated",
    name: "Lamb Organs Dehydrated",
    type: "Dehydrated",
    pet: "dog",
    category: "dog-food",
    price: 579,
    mrp: 729,
    front: lambOrgansFront,
    back: lambOrgansBack,
    both: lambOrgansBoth,
  },
  {
    key: "turkeymeatychunks",
    fileKey: "turkeymeatychunks",
    slug: "turkey-meaty-chunks-dehydrated",
    name: "Turkey Meaty Chunks Dehydrated",
    type: "Dehydrated",
    pet: "dog",
    category: "dog-food",
    price: 569,
    mrp: 719,
    front: turkeyChunksFront,
    back: turkeyChunksBack,
    both: turkeyChunksBoth,
  },
];

/** Real Krunch SKUs — card uses `both`. */
export const KRUNCH_PRODUCTS: ProductImageSet[] = [
  {
    key: "banana-apple",
    fileKey: "krunchbanana&apple",
    slug: "banana-apple-krunch",
    name: "Banana & Apple Krunch",
    type: "Krunch",
    pet: "dog",
    category: "dog-food",
    price: 399,
    mrp: 499,
    front: krunchBananaAppleFront,
    back: krunchBananaAppleBack,
    both: krunchBananaAppleBoth,
  },
  {
    key: "chicken-cheese",
    fileKey: "krunchchicken&cheese",
    slug: "chicken-cheese-krunch",
    name: "Chicken & Cheese Krunch",
    type: "Krunch",
    pet: "dog",
    category: "dog-food",
    price: 429,
    mrp: 549,
    front: krunchChickenCheeseFront,
    back: krunchChickenCheeseBack,
    both: krunchChickenCheeseBoth,
  },
  {
    key: "chicken-goatmilk",
    fileKey: "krunchchicken&goatmilk",
    slug: "chicken-goat-milk-krunch",
    name: "Chicken & Goat Milk Krunch",
    type: "Krunch",
    pet: "dog",
    category: "dog-food",
    price: 449,
    mrp: 579,
    front: krunchChickenGoatmilkFront,
    back: krunchChickenGoatmilkBack,
    both: krunchChickenGoatmilkBoth,
  },
  {
    key: "classic-chicken",
    fileKey: "krunchclassicchicken",
    slug: "classic-chicken-krunch",
    name: "Classic Chicken Krunch",
    type: "Krunch",
    pet: "dog",
    category: "dog-food",
    price: 379,
    mrp: 479,
    front: krunchClassicChickenFront,
    back: krunchClassicChickenBack,
    both: krunchClassicChickenBoth,
  },
  {
    key: "classic-lamb",
    fileKey: "krunchclassiclamb",
    slug: "classic-lamb-krunch",
    name: "Classic Lamb Krunch",
    type: "Krunch",
    pet: "dog",
    category: "dog-food",
    price: 419,
    mrp: 529,
    front: krunchClassicLambFront,
    back: krunchClassicLambBack,
    both: krunchClassicLambBoth,
  },
  {
    key: "pumpkin-carrot",
    fileKey: "krunchpumpkin&carrot",
    slug: "pumpkin-carrot-krunch",
    name: "Pumpkin & Carrot Krunch",
    type: "Krunch",
    pet: "dog",
    category: "dog-food",
    price: 359,
    mrp: 459,
    front: krunchPumpkinCarrotFront,
    back: krunchPumpkinCarrotBack,
    both: krunchPumpkinCarrotBoth,
  },
];

/** Meal Booster — front/back only; card uses front. */
export const MEAL_BOOSTER_PRODUCTS: ProductImageSet[] = [
  {
    key: "chicken-turmeric",
    fileKey: "mealbooster_chickenorganswithturmeric",
    slug: "chicken-organs-turmeric-meal-booster",
    name: "Chicken Organs with Turmeric Meal Booster",
    type: "Meal Booster",
    pet: "dog",
    category: "dog-food",
    price: 349,
    mrp: 449,
    front: mbChickenTurmericFront,
    back: mbChickenTurmericBack,
    both: mbChickenTurmericFront,
    hasBothFile: false,
  },
  {
    key: "lamb-organs",
    fileKey: "mealbooster_lamborgans",
    slug: "lamb-organs-meal-booster",
    name: "Lamb Organs Meal Booster",
    type: "Meal Booster",
    pet: "dog",
    category: "dog-food",
    price: 369,
    mrp: 469,
    front: mbLambOrgansFront,
    back: mbLambOrgansBack,
    both: mbLambOrgansFront,
    hasBothFile: false,
  },
  {
    key: "sardines-anchovies",
    fileKey: "mealbooster_sardines&anchovies",
    slug: "sardines-anchovies-meal-booster",
    name: "Sardines & Anchovies Meal Booster",
    type: "Meal Booster",
    pet: "dog",
    category: "dog-food",
    price: 389,
    mrp: 499,
    front: mbSardinesAnchoviesFront,
    back: mbSardinesAnchoviesBack,
    both: mbSardinesAnchoviesFront,
    hasBothFile: false,
  },
];

/** Peanut Butter — front/back only; card uses front. */
export const PEANUT_BUTTER_PRODUCTS: ProductImageSet[] = [
  {
    key: "classic",
    fileKey: "peanutbutter",
    slug: "nuzz-peanut-butter",
    name: "The Nuzz Story Peanut Butter",
    type: "Peanut Butter",
    pet: "dog",
    category: "dog-food",
    price: 299,
    mrp: 399,
    front: peanutButterFront,
    back: peanutButterBack,
    both: peanutButterFront,
    hasBothFile: false,
  },
];

/** Beds — card uses bed_front; gallery front → side → lower. */
export const BED_PRODUCTS: ProductImageSet[] = [
  {
    key: "cozy",
    fileKey: "bed",
    slug: "nuzz-cozy-pet-bed",
    name: "The Nuzz Story Cozy Pet Bed",
    type: "Bed",
    pet: "dog",
    category: "beds",
    price: 1499,
    mrp: 1999,
    front: bedFront,
    back: bedSide,
    both: bedFront,
    hasBothFile: false,
    gallery: [bedFront, bedSide, bedLower],
    customFiles: {
      "bed_front.png": bedFront,
      "bed_side.png": bedSide,
      "bed_lower.png": bedLower,
    },
    cardImageFile: "bed_front.png",
  },
];

/** Men's / human T-Shirts — 3 colors, model shots. */
export const HUMAN_TSHIRT_PRODUCTS: ProductImageSet[] = [
  {
    key: "black",
    fileKey: "mens_tshirt_black",
    slug: "nuzz-tshirt-black",
    name: "The Nuzz Story T-Shirt — Black",
    type: "Men's T-Shirt",
    pet: "dog",
    category: "tshirt",
    price: 699,
    mrp: 899,
    front: teeBlack,
    back: teeBlack,
    both: teeBlack,
    hasBothFile: false,
    gallery: [teeBlack],
    customFiles: {
      "mens_tshirt_black.jpg": teeBlack,
      "black .jpg": teeBlack,
    },
    cardImageFile: "mens_tshirt_black.jpg",
  },
  {
    key: "maroon",
    fileKey: "mens_tshirt_maroon",
    slug: "nuzz-tshirt-maroon",
    name: "The Nuzz Story T-Shirt — Maroon",
    type: "Men's T-Shirt",
    pet: "dog",
    category: "tshirt",
    price: 699,
    mrp: 899,
    front: teeMaroon,
    back: teeMaroon,
    both: teeMaroon,
    hasBothFile: false,
    gallery: [teeMaroon],
    customFiles: {
      "mens_tshirt_maroon.jpg": teeMaroon,
      "marhoon.jpg": teeMaroon,
    },
    cardImageFile: "mens_tshirt_maroon.jpg",
  },
  {
    key: "white",
    fileKey: "mens_tshirt_white",
    slug: "nuzz-tshirt-white",
    name: "The Nuzz Story T-Shirt — White",
    type: "Men's T-Shirt",
    pet: "dog",
    category: "tshirt",
    price: 699,
    mrp: 899,
    front: teeWhite,
    back: teeWhite,
    both: teeWhite,
    hasBothFile: false,
    gallery: [teeWhite],
    customFiles: {
      "mens_tshirt_white.jpg": teeWhite,
      "white.jpg": teeWhite,
    },
    cardImageFile: "mens_tshirt_white.jpg",
  },
];

/** Dog wear T-Shirts — pet apparel shots. */
export const DOG_WEAR_PRODUCTS: ProductImageSet[] = [
  {
    key: "blue",
    fileKey: "dog_wear_blue",
    slug: "nuzz-dog-wear-blue",
    name: "Dog T-Shirt — Blue",
    type: "Dog T-Shirt",
    pet: "dog",
    category: "dog-wear",
    price: 499,
    mrp: 649,
    front: teeBlueAlt,
    back: teeBlueFront,
    both: teeBlueAlt,
    hasBothFile: false,
    gallery: [teeBlueAlt, teeBlueFront],
    customFiles: {
      "dog_wear_blue.jpg": teeBlueAlt,
      "blue gr f.jpg": teeBlueAlt,
      "blue f gr.jpg": teeBlueFront,
    },
    cardImageFile: "dog_wear_blue.jpg",
  },
  {
    key: "chaos-red",
    fileKey: "dog_wear_chaos_red",
    slug: "nuzz-dog-wear-built-for-chaos-red",
    name: "Built for Chaos Dog T-Shirt — Red",
    type: "Dog T-Shirt",
    pet: "dog",
    category: "dog-wear",
    price: 549,
    mrp: 699,
    front: teeChaosRed,
    back: teeChaosRed,
    both: teeChaosRed,
    hasBothFile: false,
    gallery: [teeChaosRed],
    customFiles: {
      "dog_wear_chaos_red.jpg": teeChaosRed,
      "built for choas red.jpg": teeChaosRed,
    },
    cardImageFile: "dog_wear_chaos_red.jpg",
  },
  {
    key: "pink",
    fileKey: "dog_wear_pink",
    slug: "nuzz-dog-wear-pink",
    name: "Dog T-Shirt — Pink",
    type: "Dog T-Shirt",
    pet: "dog",
    category: "dog-wear",
    price: 499,
    mrp: 649,
    front: teePinkGr,
    back: teePinkFront,
    both: teePinkGr,
    hasBothFile: false,
    gallery: [teePinkGr, teePinkFront],
    customFiles: {
      "dog_wear_pink.jpg": teePinkGr,
      "pink gr.jpg": teePinkGr,
      "pink front gr.jpg": teePinkFront,
    },
    cardImageFile: "dog_wear_pink.jpg",
  },
];

/** @deprecated Use HUMAN_TSHIRT_PRODUCTS */
export const TSHIRT_PRODUCTS = HUMAN_TSHIRT_PRODUCTS;

export const HOUSE_PACK_PRODUCTS: ProductImageSet[] = [
  ...DEHYDRATED_PRODUCTS,
  ...KRUNCH_PRODUCTS,
  ...MEAL_BOOSTER_PRODUCTS,
  ...PEANUT_BUTTER_PRODUCTS,
  ...BED_PRODUCTS,
  ...HUMAN_TSHIRT_PRODUCTS,
  ...DOG_WEAR_PRODUCTS,
];

/** Filename → bundled URL (for DB image_url resolution). */
export const PRODUCT_IMAGE_FILES: Record<string, string> = Object.fromEntries(
  HOUSE_PACK_PRODUCTS.flatMap((p) => {
    if (p.customFiles) return Object.entries(p.customFiles);
    const entries: [string, string][] = [
      [`${p.fileKey}_front.jpg`, p.front],
      [`${p.fileKey}_back.jpg`, p.back],
    ];
    if (p.hasBothFile !== false && p.both !== p.front) {
      entries.push([`${p.fileKey}_both.jpg`, p.both]);
    }
    return entries;
  }),
);

/** slug → gallery URLs (card shot first, then front/back). */
export const PRODUCT_GALLERIES: Record<string, string[]> = Object.fromEntries(
  HOUSE_PACK_PRODUCTS.map((p) => {
    const shots =
      p.gallery ??
      (p.hasBothFile === false ? [p.front, p.back] : [p.both, p.front, p.back]);
    return [p.slug, shots];
  }),
);

/** slug → stable card-image filename for DB. */
export const PRODUCT_BOTH_IMAGE_KEYS: Record<string, string> = Object.fromEntries(
  HOUSE_PACK_PRODUCTS.map((p) => [
    p.slug,
    p.cardImageFile ??
      (p.hasBothFile === false ? `${p.fileKey}_front.jpg` : `${p.fileKey}_both.jpg`),
  ]),
);

export function resolveProductGallery(slug: string, fallbackImage: string, categoryImage?: string): string[] {
  const gallery = PRODUCT_GALLERIES[slug];
  if (gallery?.length) return gallery;
  return [fallbackImage, categoryImage ?? fallbackImage].filter(Boolean);
}
