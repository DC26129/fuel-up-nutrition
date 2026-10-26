import { cpSync, mkdirSync, rmSync } from "node:fs";

const assets = [
  "index.html",
  "styles.css",
  "app.js",
  "manifest.webmanifest",
  "fuelup-icon.png",
  "fuelup-pwa-192.png",
  "fuelup-pwa-512.png",
  "fuelup-maskable-512.png",
  "fuelup-apple-touch.png",
];

rmSync("www", { recursive: true, force: true });
mkdirSync("www", { recursive: true });

for (const asset of assets) {
  cpSync(asset, `www/${asset}`);
}

console.log(`Prepared ${assets.length} mobile assets.`);
