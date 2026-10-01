// Builds lightweight WebP copies of catalog/brand images for the home page.
// Source photos are 1–2 MB at 4000px+; home cards never render above ~700px.
// Output mirrors the source path under src/assets/home/thumbs/ so
// src/components/home/thumbs.ts can map an original import to its thumb.
//
//   node scripts/home-thumbs.mjs
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ASSETS = path.resolve("src/assets");
const OUT = path.join(ASSETS, "home/thumbs");

/** Pack shots on white: trim the empty studio margin so the product fills the frame. */
const PACK_DIRS = ["dehydrated", "krunch", "meal booster", "peanutbutter"];

async function* walk(dir) {
  for (const name of await readdir(dir)) {
    const full = path.join(dir, name);
    if ((await stat(full)).isDirectory()) yield* walk(full);
    else yield full;
  }
}

/** Studio shots whose grey backdrop needs lifting to white so multiply blends cleanly. */
const WHITEN_DIRS = ["bed"];

/** Photos with baked-in black letterbox bars. */
const LETTERBOXED = ["grooming-hero.jpg"];

async function build(src, { width, trim, whiten = false, letterbox = false }) {
  const rel = path.relative(ASSETS, src).replace(/\.(jpe?g|png)$/i, ".webp");
  const out = path.join(OUT, rel);
  await mkdir(path.dirname(out), { recursive: true });
  let img = sharp(src).rotate();
  if (letterbox) {
    img = sharp(await img.trim({ background: "#000000", threshold: 24 }).toBuffer());
  }
  if (whiten) img = img.linear(1.12, -2);
  if (trim) {
    img = sharp(await img.trim({ background: "#ffffff", threshold: 18 }).toBuffer()).extend({
      top: 60,
      bottom: 60,
      left: 60,
      right: 60,
      background: "#ffffff",
    });
  }
  const info = await img
    .resize({ width, height: width, fit: "inside", withoutEnlargement: true })
    .flatten({ background: "#ffffff" })
    .webp({ quality: 78, effort: 5 })
    .toFile(out);
  console.log(`${rel}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB`);
}

for (const name of await readdir(ASSETS)) {
  if (/\.(jpe?g|png)$/i.test(name)) {
    await build(path.join(ASSETS, name), { width: 1400, letterbox: LETTERBOXED.includes(name) });
  }
}

for (const name of await readdir(path.join(ASSETS, "logo"))) {
  if (/\.png$/i.test(name)) await build(path.join(ASSETS, "logo", name), { width: 480 });
}

for await (const file of walk(path.join(ASSETS, "product_list"))) {
  if (!/\.(jpe?g|png)$/i.test(file) || /_back\./i.test(file)) continue;
  const dir = path.basename(path.dirname(file));
  const pack = PACK_DIRS.includes(dir);
  await build(file, { width: pack ? 640 : 900, trim: pack, whiten: WHITEN_DIRS.includes(dir) });
}
