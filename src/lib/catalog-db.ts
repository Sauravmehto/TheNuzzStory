import type { Coupon, Product } from "@/data/catalog";
import { products as staticProducts, coupons as staticCoupons, resolveCatalogImage } from "@/data/catalog";
import { PRODUCT_BOTH_IMAGE_KEYS, PRODUCT_GALLERIES } from "@/data/product-assets";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export type ProductRow = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  pet: string;
  category: string;
  type: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  image_url: string;
  variants: { label: string; priceDelta: number }[];
  in_stock: boolean;
  is_new: boolean;
  popularity: number;
  subscribable: boolean;
  life_stage: string;
  description: string;
  specs: { label: string; value: string }[];
  ingredients: string;
  active: boolean;
};

export type CouponRow = {
  code: string;
  label: string;
  type: "percent" | "flat";
  value: number;
  min_cart: number;
  active: boolean;
};

export function parseProductRow(row: unknown): ProductRow {
  const r = row as ProductRow;
  return {
    ...r,
    variants: (r.variants ?? []) as { label: string; priceDelta: number }[],
    specs: (r.specs ?? []) as { label: string; value: string }[],
  };
}

export function rowToProduct(row: ProductRow): Product {
  const category = row.category as Product["category"];
  const image = resolveCatalogImage(row.image_url, category);
  const gallery = PRODUCT_GALLERIES[row.slug];
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand: row.brand,
    pet: row.pet as Product["pet"],
    category,
    type: row.type,
    price: Number(row.price),
    mrp: Number(row.mrp),
    rating: Number(row.rating),
    reviews: row.reviews,
    image: gallery?.[0] ?? image,
    ...(gallery ? { images: gallery } : {}),
    variants: row.variants ?? [],
    inStock: row.in_stock,
    isNew: row.is_new,
    popularity: row.popularity,
    subscribable: row.subscribable,
    lifeStage: row.life_stage as Product["lifeStage"],
    description: row.description,
    specs: row.specs ?? [],
    ingredients: row.ingredients,
  };
}

/** Hide junk / unsalable rows from the public catalog (admin still sees everything). */
export function isStorefrontVisible(p: Product): boolean {
  const price = Number(p.price);
  // Out of stock + ₹0 (and any zero-price junk) must not appear on the storefront
  if (!Number.isFinite(price) || price <= 0) return false;
  if (!p.inStock && price <= 0) return false;
  // Broken CSV leftovers look like "20Kg,,0,3299,1.0 UNT,0,Food,3299"
  if (/,/.test(p.name) || /e[+-]?\d+/i.test(p.name)) return false;
  return true;
}

export function productToRow(p: Product, active = true): ProductRow {
  const image_url =
    PRODUCT_BOTH_IMAGE_KEYS[p.slug] ??
    (typeof p.image === "string" ? p.image.split("/").pop()?.split("?")[0] ?? p.image : "");

  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    pet: p.pet,
    category: p.category,
    type: p.type,
    price: p.price,
    mrp: p.mrp,
    rating: p.rating,
    reviews: p.reviews,
    image_url,
    variants: p.variants,
    in_stock: p.inStock,
    is_new: p.isNew,
    popularity: p.popularity,
    subscribable: p.subscribable,
    life_stage: p.lifeStage,
    description: p.description,
    specs: p.specs,
    ingredients: p.ingredients,
    active,
  };
}

export function rowToCoupon(row: CouponRow): Coupon {
  return {
    code: row.code,
    label: row.label,
    type: row.type,
    value: Number(row.value),
    minCart: Number(row.min_cart),
  };
}

export function couponToRow(c: Coupon, active = true): CouponRow {
  return {
    code: c.code.toUpperCase(),
    label: c.label,
    type: c.type,
    value: c.value,
    min_cart: c.minCart,
    active,
  };
}

export async function fetchCatalogProducts(includeInactive = false): Promise<Product[]> {
  if (!isSupabaseConfigured) return staticProducts.filter(isStorefrontVisible);

  let query = supabase.from("products").select("*").order("name");
  if (!includeInactive) query = query.eq("active", true);

  const { data, error } = await query;
  if (error || !data?.length) return staticProducts.filter(isStorefrontVisible);
  return data.map((row) => rowToProduct(parseProductRow(row))).filter(isStorefrontVisible);
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  if (!isSupabaseConfigured) {
    const local = staticProducts.find((p) => p.slug === slug) ?? null;
    return local && isStorefrontVisible(local) ? local : null;
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();

  if (error || !data) {
    const local = staticProducts.find((p) => p.slug === slug) ?? null;
    return local && isStorefrontVisible(local) ? local : null;
  }
  const product = rowToProduct(parseProductRow(data));
  return isStorefrontVisible(product) ? product : null;
}

export async function fetchCatalogCoupons(): Promise<Coupon[]> {
  if (!isSupabaseConfigured) return staticCoupons;

  const { data, error } = await supabase.from("coupons").select("*").eq("active", true);
  if (error || !data?.length) return staticCoupons;
  return data.map((row) => rowToCoupon(row as CouponRow));
}

export function getStaticProducts() {
  return staticProducts;
}

export function getStaticCoupons() {
  return staticCoupons;
}
