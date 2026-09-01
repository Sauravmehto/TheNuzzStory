import dogFoodImg from "@/assets/p-dogfood.jpg";
import catFoodImg from "@/assets/p-catfood.jpg";
import groomingImg from "@/assets/p-grooming.jpg";
import toysImg from "@/assets/p-toys.jpg";
import accessoriesImg from "@/assets/p-accessories.jpg";
import healthImg from "@/assets/p-health.jpg";
import {
  BED_PRODUCTS,
  DEHYDRATED_PRODUCTS,
  KRUNCH_PRODUCTS,
  MEAL_BOOSTER_PRODUCTS,
  PEANUT_BUTTER_PRODUCTS,
  PRODUCT_GALLERIES,
  PRODUCT_IMAGE_FILES,
  TSHIRT_PRODUCTS,
} from "@/data/product-assets";

export type Pet = "dog" | "cat";

export type CategorySlug =
  | "dog-food"
  | "cat-food"
  | "dog-grooming"
  | "cat-grooming"
  | "toys"
  | "accessories"
  | "healthcare"
  | "beds"
  | "tshirt";

export interface Category {
  slug: CategorySlug;
  name: string;
  blurb: string;
  image: string;
  pet: Pet | "both";
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  pet: Pet;
  category: CategorySlug;
  type: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  image: string;
  /** Optional gallery — card uses `image` (usually the `_both` pack shot). */
  images?: string[];
  variants: { label: string; priceDelta: number }[];
  inStock: boolean;
  isNew: boolean;
  popularity: number;
  subscribable: boolean;
  lifeStage: "puppy" | "kitten" | "adult" | "senior" | "all";
  description: string;
  specs: { label: string; value: string }[];
  ingredients: string;
}

export const CATEGORY_IMAGES: Record<CategorySlug, string> = {
  "dog-food": dogFoodImg,
  "cat-food": catFoodImg,
  "dog-grooming": groomingImg,
  "cat-grooming": groomingImg,
  toys: toysImg,
  accessories: accessoriesImg,
  healthcare: healthImg,
  beds: BED_PRODUCTS[0]?.front ?? accessoriesImg,
  tshirt: TSHIRT_PRODUCTS[0]?.front ?? accessoriesImg,
};

const LOCAL_ASSETS: Record<string, string> = {
  "p-dogfood.jpg": dogFoodImg,
  "p-catfood.jpg": catFoodImg,
  "p-grooming.jpg": groomingImg,
  "p-toys.jpg": toysImg,
  "p-accessories.jpg": accessoriesImg,
  "p-health.jpg": healthImg,
  ...PRODUCT_IMAGE_FILES,
};

/** Map Vite-dev paths / filenames stored in the DB to bundled URLs. */
export function resolveCatalogImage(url: string, category?: CategorySlug): string {
  if (!url) return category ? CATEGORY_IMAGES[category] : dogFoodImg;
  // Already a usable URL (CDN, Vite prod `/assets/…`, Vite dev `/src/…`, or data URI)
  if (
    /^https?:\/\//.test(url) ||
    url.startsWith("/assets/") ||
    url.startsWith("/src/") ||
    url.startsWith("data:")
  ) {
    return url;
  }
  const rawName = url.split("/").pop()?.split("?")[0] ?? "";
  const filename = (() => {
    try {
      return decodeURIComponent(rawName);
    } catch {
      return rawName;
    }
  })();
  if (LOCAL_ASSETS[filename]) return LOCAL_ASSETS[filename];
  if (LOCAL_ASSETS[rawName]) return LOCAL_ASSETS[rawName];
  if (PRODUCT_GALLERIES[url]?.[0]) return PRODUCT_GALLERIES[url]![0]!;
  return category ? CATEGORY_IMAGES[category] : url;
}

export const categories: Category[] = [
  {
    slug: "dog-food",
    name: "Dog Food",
    blurb: "Dehydrated, Krunch, meal boosters & peanut butter",
    image: dogFoodImg,
    pet: "dog",
  },
  {
    slug: "cat-food",
    name: "Cat Food",
    blurb: "Dehydrated, Krunch & meal boosters",
    image: catFoodImg,
    pet: "cat",
  },
  {
    slug: "dog-grooming",
    name: "Dog Grooming",
    blurb: "Shampoo & brushes",
    image: groomingImg,
    pet: "dog",
  },
  {
    slug: "cat-grooming",
    name: "Cat Grooming",
    blurb: "Wipes & deshedders",
    image: groomingImg,
    pet: "cat",
  },
  { slug: "toys", name: "Toys", blurb: "Chew, fetch & play", image: toysImg, pet: "both" },
  {
    slug: "accessories",
    name: "Accessories",
    blurb: "Collars, bowls & more",
    image: accessoriesImg,
    pet: "both",
  },
  {
    slug: "beds",
    name: "Beds",
    blurb: "Cozy beds & mats",
    image: BED_PRODUCTS[0]?.front ?? accessoriesImg,
    pet: "both",
  },
  {
    slug: "tshirt",
    name: "T-Shirts",
    blurb: "Pet apparel & tees",
    image: TSHIRT_PRODUCTS[0]?.front ?? accessoriesImg,
    pet: "both",
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    blurb: "Supplements & care",
    image: healthImg,
    pet: "both",
  },
];

const FOOD_VARIANTS = [
  { label: "1 kg", priceDelta: 0 },
  { label: "3 kg", priceDelta: 1150 },
  { label: "7 kg", priceDelta: 2600 },
];
const ML_VARIANTS = [
  { label: "200 ml", priceDelta: 0 },
  { label: "500 ml", priceDelta: 210 },
];
const SIZE_VARIANTS = [
  { label: "Small", priceDelta: 0 },
  { label: "Medium", priceDelta: 180 },
  { label: "Large", priceDelta: 340 },
];
const SINGLE = [{ label: "Standard pack", priceDelta: 0 }];

type Seed = [
  name: string,
  brand: string,
  pet: Pet,
  category: CategorySlug,
  type: string,
  price: number,
  mrp: number,
  rating: number,
  reviews: number,
];

const seeds: Seed[] = [
  // Dog food real packs come from product-assets (dehydrated, krunch, meal booster, peanut butter)
  // Cat food — The Nuzz Story in-house demos
  ["Tuna Dehydrated Flakes", "The Nuzz Story", "cat", "cat-food", "Dehydrated", 449, 599, 4.7, 92],
  ["Chicken Dehydrated Cubes Cat", "The Nuzz Story", "cat", "cat-food", "Dehydrated", 429, 569, 4.6, 78],
  ["Salmon Dehydrated Strips", "The Nuzz Story", "cat", "cat-food", "Dehydrated", 499, 649, 4.8, 110],
  ["Liver Dehydrated Cat Treats", "The Nuzz Story", "cat", "cat-food", "Dehydrated", 399, 529, 4.5, 66],
  ["Fish Mix Dehydrated Pack", "The Nuzz Story", "cat", "cat-food", "Dehydrated", 529, 699, 4.4, 54],
  ["Chicken & Pumpkin Dehydrated Cat", "The Nuzz Story", "cat", "cat-food", "Dehydrated", 469, 619, 4.6, 61],
  ["White Fish Dehydrated Bites", "The Nuzz Story", "cat", "cat-food", "Dehydrated", 479, 629, 4.5, 49],
  ["Tuna Krunch Bites", "The Nuzz Story", "cat", "cat-food", "Krunch", 349, 449, 4.6, 88],
  ["Chicken Krunch Cat Cubes", "The Nuzz Story", "cat", "cat-food", "Krunch", 329, 429, 4.5, 74],
  ["Salmon Krunch Crunchies", "The Nuzz Story", "cat", "cat-food", "Krunch", 359, 469, 4.4, 63],
  ["Ocean Mix Krunch", "The Nuzz Story", "cat", "cat-food", "Krunch", 339, 439, 4.3, 47],
  ["Chicken Meal Booster Cat", "The Nuzz Story", "cat", "cat-food", "Meal Booster", 269, 359, 4.7, 97],
  ["Fish Broth Meal Booster", "The Nuzz Story", "cat", "cat-food", "Meal Booster", 289, 379, 4.6, 81],
  ["Pumpkin Meal Booster Cat", "The Nuzz Story", "cat", "cat-food", "Meal Booster", 249, 329, 4.5, 70],
  ["Salmon Oil Meal Booster", "The Nuzz Story", "cat", "cat-food", "Meal Booster", 309, 399, 4.8, 65],
  ["Liver Sprinkle Meal Booster", "The Nuzz Story", "cat", "cat-food", "Meal Booster", 259, 349, 4.4, 52],
  ["Oatmeal Soothing Dog Shampoo", "Fluffly", "dog", "dog-grooming", "Shampoo", 549, 749, 4.6, 289],
  ["Tearless Puppy Shampoo", "Fluffly", "dog", "dog-grooming", "Shampoo", 479, 649, 4.4, 152],
  ["Slicker Deshedding Brush", "Groomio", "dog", "dog-grooming", "Brush", 699, 999, 4.5, 340],
  ["Paw Balm & Nose Butter", "Fluffly", "dog", "dog-grooming", "Skin Care", 399, 549, 4.7, 176],
  ["Waterless Cat Foam Cleanser", "Purrfect Co", "cat", "cat-grooming", "Shampoo", 529, 699, 4.3, 133],
  ["Gentle Cat Grooming Glove", "Groomio", "cat", "cat-grooming", "Brush", 349, 499, 4.2, 219],
  ["Cat Deshedding Comb Pro", "Groomio", "cat", "cat-grooming", "Brush", 599, 849, 4.6, 187],
  ["Cat Wipes (80 pulls)", "Fluffly", "cat", "cat-grooming", "Skin Care", 299, 399, 4.1, 96],
  ["Tough Rope Tug Toy", "Playpaws", "dog", "toys", "Chew Toy", 349, 499, 4.5, 512],
  ["Squeaky Rubber Fetch Ball", "Playpaws", "dog", "toys", "Fetch", 249, 349, 4.4, 388],
  ["Catnip Teaser Wand", "Playpaws", "cat", "toys", "Interactive", 299, 449, 4.7, 274],
  ["Crinkle Mice Trio", "Purrfect Co", "cat", "toys", "Interactive", 199, 299, 4.3, 168],
  ["Padded Coral Collar & Leash", "Trotters", "dog", "accessories", "Walk Gear", 1099, 1499, 4.6, 231],
  ["Anti-Skid Steel Bowl Set", "Trotters", "dog", "accessories", "Feeding", 799, 1099, 4.5, 190],
  ["Cloud Cuddle Pet Bed", "Trotters", "cat", "accessories", "Bedding", 2199, 2999, 4.8, 145],
  ["Breakaway Cat Collar + Bell", "Trotters", "cat", "accessories", "Walk Gear", 449, 649, 4.2, 118],
  ["Multivitamin Chews for Dogs", "VetNest", "dog", "healthcare", "Supplement", 899, 1199, 4.6, 260],
  ["Tick & Flea Spot-On", "VetNest", "dog", "healthcare", "Parasite Care", 649, 899, 4.4, 205],
  ["Omega-3 Skin & Coat Oil", "VetNest", "cat", "healthcare", "Supplement", 749, 999, 4.5, 173],
  ["Probiotic Digestive Powder", "VetNest", "cat", "healthcare", "Supplement", 699, 949, 4.3, 128],
];

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const seededProducts: Product[] = seeds.map((s, i) => {
  const [name, brand, pet, category, type, price, mrp, rating, reviews] = s;
  const isFood = category === "dog-food" || category === "cat-food";
  const isLiquid = type === "Shampoo" || type === "Skin Care" || type === "Supplement";
  const slug = slugify(name);
  const gallery = PRODUCT_GALLERIES[slug];
  return {
    id: `P${1000 + i}`,
    slug,
    name,
    brand,
    pet,
    category,
    type,
    price,
    mrp,
    rating,
    reviews,
    image: gallery?.[0] ?? CATEGORY_IMAGES[category],
    ...(gallery ? { images: gallery } : {}),
    variants: isFood
      ? FOOD_VARIANTS
      : isLiquid
        ? ML_VARIANTS
        : category === "accessories"
          ? SIZE_VARIANTS
          : SINGLE,
    inStock: i % 11 !== 5,
    isNew: i % 7 === 3,
    popularity: reviews + Math.round(rating * 40),
    subscribable: isFood,
    lifeStage: name.includes("Puppy")
      ? "puppy"
      : name.includes("Kitten")
        ? "kitten"
        : name.includes("Senior")
          ? "senior"
          : "all",
    description: `${name} from ${brand} is crafted for ${pet === "dog" ? "dogs" : "cats"} who deserve better. Made in small batches with responsibly sourced ingredients, no artificial colours, and a recipe reviewed by in-house veterinarians. Loved by ${reviews}+ pet parents at our store.`,
    specs: [
      { label: "Brand", value: brand },
      { label: "Suitable for", value: pet === "dog" ? "Dogs" : "Cats" },
      { label: "Product type", value: type },
      { label: "Shelf life", value: "18 months from manufacture" },
      { label: "Country of origin", value: "India" },
    ],
    ingredients: isFood
      ? "Deboned chicken, brown rice, oats, chicken fat, dried egg, pumpkin, flaxseed, salmon oil (source of Omega-3), chicory root, vitamins & chelated minerals, taurine, natural rosemary extract."
      : "Purified water, plant-derived surfactants, aloe vera extract, oatmeal protein, glycerin, vitamin E, chamomile oil, natural fragrance. Free from parabens, sulphates and artificial dyes.",
  };
});

const dehydratedCatalogProducts: Product[] = DEHYDRATED_PRODUCTS.map((p, i) => ({
  id: `nuzz-dehydrated-${p.key}`,
  slug: p.slug,
  name: p.name,
  brand: "The Nuzz Story",
  pet: p.pet,
  category: p.category,
  type: p.type,
  price: p.price,
  mrp: p.mrp,
  rating: 4.6 + (i % 3) * 0.1,
  reviews: 48 + i * 11,
  image: p.both,
  images: [p.both, p.front, p.back],
  variants: [
    { label: "70 g", priceDelta: 0 },
    { label: "150 g", priceDelta: 180 },
    { label: "300 g", priceDelta: 380 },
  ],
  inStock: true,
  isNew: true,
  popularity: 200 - i * 8,
  subscribable: true,
  lifeStage: "all" as const,
  description: `${p.name} from The Nuzz Story — slow-dehydrated, single-ingredient goodness for dogs. No fillers, no artificial colours.`,
  specs: [
    { label: "Brand", value: "The Nuzz Story" },
    { label: "Suitable for", value: "Dogs" },
    { label: "Product type", value: "Dehydrated" },
    { label: "Shelf life", value: "12 months from manufacture" },
    { label: "Country of origin", value: "India" },
  ],
  ingredients: "100% dehydrated meat / fish. No additives, no preservatives, no fillers.",
}));

const krunchCatalogProducts: Product[] = KRUNCH_PRODUCTS.map((p, i) => ({
  id: `nuzz-krunch-${p.key}`,
  slug: p.slug,
  name: p.name,
  brand: "The Nuzz Story",
  pet: p.pet,
  category: p.category,
  type: p.type,
  price: p.price,
  mrp: p.mrp,
  rating: 4.5 + (i % 3) * 0.1,
  reviews: 52 + i * 9,
  image: p.both,
  images: [p.both, p.front, p.back],
  variants: [
    { label: "100 g", priceDelta: 0 },
    { label: "250 g", priceDelta: 160 },
    { label: "500 g", priceDelta: 320 },
  ],
  inStock: true,
  isNew: true,
  popularity: 190 - i * 7,
  subscribable: true,
  lifeStage: "all" as const,
  description: `${p.name} from The Nuzz Story — crunchy, oven-baked bites dogs love. Made in small batches with real ingredients.`,
  specs: [
    { label: "Brand", value: "The Nuzz Story" },
    { label: "Suitable for", value: "Dogs" },
    { label: "Product type", value: "Krunch" },
    { label: "Shelf life", value: "12 months from manufacture" },
    { label: "Country of origin", value: "India" },
  ],
  ingredients: "Real meat / produce, whole grains, natural binders. No artificial colours or flavours.",
}));

const mealBoosterCatalogProducts: Product[] = MEAL_BOOSTER_PRODUCTS.map((p, i) => ({
  id: `nuzz-mealbooster-${p.key}`,
  slug: p.slug,
  name: p.name,
  brand: "The Nuzz Story",
  pet: p.pet,
  category: p.category,
  type: p.type,
  price: p.price,
  mrp: p.mrp,
  rating: 4.6 + (i % 3) * 0.1,
  reviews: 44 + i * 10,
  image: p.both,
  images: [p.front, p.back],
  variants: [
    { label: "50 g", priceDelta: 0 },
    { label: "100 g", priceDelta: 120 },
    { label: "200 g", priceDelta: 240 },
  ],
  inStock: true,
  isNew: true,
  popularity: 180 - i * 6,
  subscribable: true,
  lifeStage: "all" as const,
  description: `${p.name} from The Nuzz Story — sprinkle over meals for a protein-rich flavour boost dogs go crazy for.`,
  specs: [
    { label: "Brand", value: "The Nuzz Story" },
    { label: "Suitable for", value: "Dogs" },
    { label: "Product type", value: "Meal Booster" },
    { label: "Shelf life", value: "12 months from manufacture" },
    { label: "Country of origin", value: "India" },
  ],
  ingredients: "Dehydrated organs / fish, natural seasonings. No fillers or artificial additives.",
}));

const peanutButterCatalogProducts: Product[] = PEANUT_BUTTER_PRODUCTS.map((p, i) => ({
  id: `nuzz-peanutbutter-${p.key}`,
  slug: p.slug,
  name: p.name,
  brand: "The Nuzz Story",
  pet: p.pet,
  category: p.category,
  type: p.type,
  price: p.price,
  mrp: p.mrp,
  rating: 4.7,
  reviews: 96 + i,
  image: p.both,
  images: [p.front, p.back],
  variants: [
    { label: "250 g", priceDelta: 0 },
    { label: "500 g", priceDelta: 150 },
  ],
  inStock: true,
  isNew: true,
  popularity: 210,
  subscribable: true,
  lifeStage: "all" as const,
  description: `${p.name} — xylitol-free peanut butter made for dogs. Perfect for lick mats, kong stuffing and training rewards.`,
  specs: [
    { label: "Brand", value: "The Nuzz Story" },
    { label: "Suitable for", value: "Dogs" },
    { label: "Product type", value: "Peanut Butter" },
    { label: "Shelf life", value: "9 months from manufacture" },
    { label: "Country of origin", value: "India" },
  ],
  ingredients: "Roasted peanuts. No xylitol, no added sugar, no salt.",
}));

const bedCatalogProducts: Product[] = BED_PRODUCTS.map((p, i) => ({
  id: `nuzz-bed-${p.key}`,
  slug: p.slug,
  name: p.name,
  brand: "The Nuzz Story",
  pet: p.pet,
  category: p.category,
  type: p.type,
  price: p.price,
  mrp: p.mrp,
  rating: 4.7,
  reviews: 68 + i,
  image: p.both,
  images: p.gallery ?? [p.front, p.back],
  variants: [
    { label: "S", priceDelta: 0 },
    { label: "M", priceDelta: 200 },
    { label: "L", priceDelta: 400 },
  ],
  inStock: true,
  isNew: true,
  popularity: 220,
  subscribable: false,
  lifeStage: "all" as const,
  description: `${p.name} — soft, supportive rest for dogs who love a proper nest.`,
  specs: [
    { label: "Brand", value: "The Nuzz Story" },
    { label: "Suitable for", value: "Dogs" },
    { label: "Product type", value: "Bed" },
    { label: "Country of origin", value: "India" },
  ],
  ingredients: "",
}));

const tshirtCatalogProducts: Product[] = TSHIRT_PRODUCTS.map((p, i) => ({
  id: `nuzz-tshirt-${p.key}`,
  slug: p.slug,
  name: p.name,
  brand: "The Nuzz Story",
  pet: p.pet,
  category: p.category,
  type: p.type,
  price: p.price,
  mrp: p.mrp,
  rating: 4.6 + (i % 3) * 0.1,
  reviews: 40 + i * 8,
  image: p.both,
  images: p.gallery ?? [p.front, p.back],
  variants: [
    { label: "XS", priceDelta: 0 },
    { label: "S", priceDelta: 0 },
    { label: "M", priceDelta: 50 },
    { label: "L", priceDelta: 100 },
    { label: "XL", priceDelta: 150 },
  ],
  inStock: true,
  isNew: true,
  popularity: 200 - i * 5,
  subscribable: false,
  lifeStage: "all" as const,
  description: `${p.name} — soft everyday apparel from The Nuzz Story.`,
  specs: [
    { label: "Brand", value: "The Nuzz Story" },
    { label: "Suitable for", value: "Dogs" },
    { label: "Product type", value: "T-Shirt" },
    { label: "Country of origin", value: "India" },
  ],
  ingredients: "",
}));

export const products: Product[] = [
  ...dehydratedCatalogProducts,
  ...krunchCatalogProducts,
  ...mealBoosterCatalogProducts,
  ...peanutButterCatalogProducts,
  ...bedCatalogProducts,
  ...tshirtCatalogProducts,
  ...seededProducts,
];

export const brands = Array.from(new Set(products.map((p) => p.brand))).sort();
export const productTypes = Array.from(new Set(products.map((p) => p.type))).sort();

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const byCategory = (slug: CategorySlug) => products.filter((p) => p.category === slug);

export interface Coupon {
  code: string;
  label: string;
  type: "percent" | "flat";
  value: number;
  minCart: number;
}

export const coupons: Coupon[] = [
  { code: "PAW20", label: "Flat 20% off on orders above ₹999", type: "percent", value: 20, minCart: 999 },
  { code: "NEWPET", label: "₹150 off your first order", type: "flat", value: 150, minCart: 499 },
  { code: "GROOM10", label: "10% off grooming essentials", type: "percent", value: 10, minCart: 0 },
];

export const offers = [
  {
    title: "Flat 20% off",
    subtitle: "On all dry food above ₹999",
    code: "PAW20",
    tone: "primary" as const,
  },
  {
    title: "Buy 1 Get 1",
    subtitle: "On treats & training snacks",
    code: "BOGO",
    tone: "accent" as const,
  },
  {
    title: "Free grooming kit",
    subtitle: "On every order above ₹999",
    code: "AUTO",
    tone: "sand" as const,
  },
];

export const testimonials = [
  {
    name: "Ananya Rao",
    pet: "Simba · Golden Retriever",
    text: "Simba's coat has never looked better. Delivery was next-day and the free grooming kit was such a lovely surprise.",
    rating: 5,
  },
  {
    name: "Rohit Menon",
    pet: "Mishti · Indie Cat",
    text: "The subscribe & save option means I never run out of kibble. Support even helped me switch the flavour mid-cycle.",
    rating: 5,
  },
  {
    name: "Fatima Sheikh",
    pet: "Coco · Shih Tzu",
    text: "Booked a spa package at the store through the site. Slot picker was simple and Coco came back smelling amazing.",
    rating: 4,
  },
  {
    name: "Dev Patel",
    pet: "Bruno · Labrador",
    text: "Genuine products, vet-reviewed recommendations and honest pricing. This is now my only pet store.",
    rating: 5,
  },
];

export const groomingServices = [
  {
    id: "bath-brush",
    name: "Bath & Brush",
    price: 799,
    duration: "45 min",
    description: "Warm-water bath with pH-balanced shampoo, blow dry and full-coat brush out.",
  },
  {
    id: "haircut",
    name: "Haircut & Styling",
    price: 1299,
    duration: "75 min",
    description: "Breed-specific trim or a custom style, finished with sanitary and paw-pad tidy-up.",
  },
  {
    id: "nails",
    name: "Nail Trimming",
    price: 349,
    duration: "20 min",
    description: "Gentle nail clip and file with treats between every paw. Great for anxious pets.",
  },
  {
    id: "ears",
    name: "Ear Cleaning",
    price: 399,
    duration: "20 min",
    description: "Vet-approved ear solution, gentle wipe-down and a quick health check for infection.",
  },
  {
    id: "spa",
    name: "Signature Spa Package",
    price: 2199,
    duration: "2 hrs",
    description: "Bath, haircut, nails, ears, teeth brushing, de-shed treatment and a paw balm finish.",
  },
];

export const timeSlots = [
  "10:00 AM",
  "11:30 AM",
  "01:00 PM",
  "02:30 PM",
  "04:00 PM",
  "05:30 PM",
];

export type OrderStatus = "Placed" | "Shipped" | "Out for Delivery" | "Delivered" | "Cancelled";

export interface MockOrder {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: { name: string; qty: number; variant: string; image: string }[];
}

export const mockOrders: MockOrder[] = [
  {
    id: "PP-24817",
    date: "12 Jul 2026",
    status: "Out for Delivery",
    total: 2648,
    items: [
      { name: "Chicken Breast Dehydrated", qty: 1, variant: "150 g", image: dogFoodImg },
      { name: "Classic Chicken Krunch", qty: 2, variant: "100 g", image: dogFoodImg },
    ],
  },
  {
    id: "PP-24610",
    date: "28 Jun 2026",
    status: "Delivered",
    total: 1548,
    items: [{ name: "Oatmeal Soothing Dog Shampoo", qty: 2, variant: "500 ml", image: groomingImg }],
  },
  {
    id: "PP-24455",
    date: "09 Jun 2026",
    status: "Delivered",
    total: 1099,
    items: [{ name: "Tuna Dehydrated Flakes", qty: 1, variant: "1 kg", image: catFoodImg }],
  },
  {
    id: "PP-24102",
    date: "21 May 2026",
    status: "Cancelled",
    total: 349,
    items: [{ name: "Tough Rope Tug Toy", qty: 1, variant: "Standard pack", image: toysImg }],
  },
];

export const savedAddressesSeed = [
  {
    id: "a1",
    name: "Ananya Rao",
    phone: "98765 43210",
    pincode: "560034",
    address: "402, Lakeview Residency, 12th Main",
    city: "Bengaluru",
    state: "Karnataka",
    landmark: "Opposite Koramangala Park",
    type: "Home" as const,
  },
  {
    id: "a2",
    name: "Ananya Rao",
    phone: "98765 43210",
    pincode: "560001",
    address: "7th Floor, Orion Tech Park, MG Road",
    city: "Bengaluru",
    state: "Karnataka",
    landmark: "Next to Metro Station",
    type: "Work" as const,
  },
];

export const faqs = [
  {
    q: "How fast will my order arrive?",
    a: "Orders placed before 4 PM ship the same day. Metro cities receive delivery in 1–2 days, rest of India in 3–5 days.",
  },
  {
    q: "Do you offer Cash on Delivery?",
    a: "Yes, COD is available on orders up to ₹5,000 across 19,000+ pincodes. A ₹29 handling fee applies.",
  },
  {
    q: "Are the products genuine?",
    a: "Every product is sourced directly from brands or their authorised distributors, with batch and expiry checks at our warehouse.",
  },
  {
    q: "How does Subscribe & Save work?",
    a: "Choose a monthly cycle on any food product and save 10% on every delivery. Pause, skip or cancel anytime from your account.",
  },
  {
    q: "Can I return an opened food bag?",
    a: "If your pet doesn't like it, tell us within 7 days. We'll refund or swap the flavour once — our Tail Wag Guarantee.",
  },
  {
    q: "Do you groom cats too?",
    a: "Yes. Our cat grooming is handled by feline-trained groomers in a separate quiet room, by appointment only.",
  },
];

export const STORE = {
  name: "The Nuzz Story",
  phone: "+91 98450 11223",
  email: "hello@thenuzzstory.in",
  address:
    "Market No 1, 40/42 UGF, Main Rd, opposite to Looks Salon, Pocket 40, Chittaranjan Park, New Delhi, Delhi 110019",
  hours: "Mon–Sat 9:30 AM – 9:00 PM · Sun 10:00 AM – 6:00 PM",
  freeShippingAbove: 499,
  deliveryFee: 49,
};

export const money = (n: number) =>
  `₹${Math.round(n).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
