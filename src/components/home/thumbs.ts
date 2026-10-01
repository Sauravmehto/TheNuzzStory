/**
 * Home-page image sizes. Catalog photos are 1–2 MB each; `scripts/home-thumbs.mjs`
 * writes trimmed WebP copies to src/assets/home/thumbs/ mirroring the source path.
 * `thumb(url)` swaps an original asset URL for its copy and falls back to the original.
 */
const originals = import.meta.glob<string>(
  [
    "/src/assets/*.{jpg,jpeg,png}",
    "/src/assets/logo/*.png",
    "/src/assets/product_list/**/*.{jpg,jpeg,png}",
  ],
  { eager: true, import: "default" },
);

const thumbs = import.meta.glob<string>("/src/assets/home/thumbs/**/*.webp", {
  eager: true,
  import: "default",
});

const byUrl = new Map<string, string>();
for (const [path, url] of Object.entries(originals)) {
  const key = path
    .replace("/src/assets/", "/src/assets/home/thumbs/")
    .replace(/\.(jpe?g|png)$/i, ".webp");
  const small = thumbs[key];
  if (small) byUrl.set(url, small);
}

export function thumb(url: string): string;
export function thumb(url: string | undefined): string | undefined;
export function thumb(url: string | undefined) {
  return url ? (byUrl.get(url) ?? url) : url;
}
