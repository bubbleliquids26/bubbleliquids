export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  image: string;
  largeImage?: string;
  detailImages?: string[];
  basePrice: number;
  category: string;
  sizes: { label: string; ml: number; price: number }[];
  grades: { label: string; priceMultiplier: number }[];
  combos: { name: string; discount: number; description: string }[];
  litre?: string;
}

/** Card badge copy (`product.litre`) vs catalogue `sizes[].label` (e.g. "1 Ltr") */
const LITRE_BADGE_TO_ML: Record<string, number> = {
  "½ L": 500,
  "1/2 L": 500,
  "1 L": 1000,
  "5 L": 5000,
  "500 ml": 500,
};

/** Badge text for a variant row on the products page */
export function mlToLitreBadge(ml: number): string {
  if (ml === 500) return "½ L";
  if (ml === 1000) return "1 L";
  if (ml === 5000) return "5 L";
  return "1 L";
}

/** ½ L & 1 L → `image` (/1-litre/…); 5 L → `largeImage` (/5-litre/…) */
export function getProductCardImage(product: Product, sizeMl: number): string {
  if (sizeMl >= 5000) {
    return product.largeImage ?? product.image;
  }
  return product.image;
}

/** Resolves price/size for the Popular Product card badge — do not use `label === litre` (they differ). */
export function getSizeForProductCardBadge(product: Product) {
  if (!product.litre) return product.sizes[0];
  const targetMl = LITRE_BADGE_TO_ML[product.litre];
  if (targetMl !== undefined) {
    const exact = product.sizes.find((s) => s.ml === targetMl);
    if (exact) return exact;
    return product.sizes.reduce((best, s) =>
      Math.abs(s.ml - targetMl) < Math.abs(best.ml - targetMl) ? s : best,
    );
  }
  const byCatalogueLabel = product.sizes.find((s) => s.label === product.litre);
  return byCatalogueLabel ?? product.sizes[0];
}

export const products: Product[] = [
  {
    id: "detergent-ultra",
    name: "Bubble Detergent Ultra",
    description:
      "Our most powerful liquid detergent with advanced cleaning formula. Ultra-grade surfactants penetrate deep into fibers, removing the toughest stains effortlessly. Leaves clothes fresh, soft, and brilliantly clean with long-lasting fragrance.",
    shortDescription: "Maximum cleaning power ultra liquid",
    image: "/1-litre/ultra-gel.png",
    largeImage: "/5-litre/ultra-gel-5.png",
    detailImages: [
      "/product-details/ultra-gel/1.png",
      "/product-details/ultra-gel/2.png",
      "/product-details/ultra-gel/3.png",
      "/product-details/ultra-gel/4.png",
    ],
    basePrice: 79,
    category: "Laundry",
    sizes: [
      { label: "½ L", ml: 500, price: 79 },
      { label: "1 L", ml: 1000, price: 149 },
      { label: "5 L", ml: 5000, price: 549 },
    ],
    grades: [{ label: "Ultra", priceMultiplier: 1 }],
    combos: [
      { name: "Family Pack", discount: 15, description: "Buy 3 get 15% off" },
      { name: "Mega Saver", discount: 25, description: "Buy 5 get 25% off" },
    ],
    litre: "1 L",
  },
  {
    id: "detergent-smart",
    name: "Bubble Detergent Smart",
    description:
      "Smart cleaning formula that balances powerful stain removal with everyday affordability. Ideal for daily laundry with effective cleaning action and a refreshing scent.",
    shortDescription: "Smart cleaning, everyday affordability",
    image: "/1-litre/smart-gel.png",
    largeImage: "/5-litre/smart-gel-5.png",
    detailImages: [
      "/product-details/detergent-smart-gel/1.png",
      "/product-details/detergent-smart-gel/2.png",
      "/product-details/detergent-smart-gel/3.png",
      "/product-details/detergent-smart-gel/4.png",
    ],
    basePrice: 59,
    category: "Laundry",
    sizes: [
      { label: "½ L", ml: 500, price: 59 },
      { label: "1 L", ml: 1000, price: 129 },
      { label: "5 L", ml: 5000, price: 449 },
    ],
    grades: [{ label: "Premium", priceMultiplier: 1 }],
    combos: [
      { name: "Value Pack", discount: 10, description: "Buy 2 get 10% off" },
      { name: "Bulk Saver", discount: 20, description: "Buy 4 get 20% off" },
    ],
    litre: "½ L",
  },
  {
    id: "detergent-ordinary",
    name: "Bubble Detergent Ordinary",
    description:
      "Reliable everyday detergent that delivers effective cleaning at the most affordable price. Great for regular laundry needs with a clean, fresh finish.",
    shortDescription: "Effective cleaning, budget-friendly",
    image: "/1-litre/detergent-liquid.png",
    largeImage: "/5-litre/detergent-liquid-5.png",
    detailImages: [
      "/product-details/detergent-liquid/1.png",
      "/product-details/detergent-liquid/2.png",
      "/product-details/detergent-liquid/3.png",
      "/product-details/detergent-liquid/4.png",
    ],
    basePrice: 29,
    category: "Laundry",
    sizes: [
      { label: "½ L", ml: 500, price: 29 },
      { label: "1 L", ml: 1000, price: 99 },
      { label: "5 L", ml: 5000, price: 380 },
    ],
    grades: [{ label: "Standard", priceMultiplier: 1 }],
    combos: [
      { name: "Economy Pack", discount: 10, description: "Buy 3 get 10% off" },
    ],
    litre: "1 L",
  },
  {
    id: "dish-wash",
    name: "Bubble Dish Wash",
    description:
      "Cut through grease and grime with our concentrated dishwash formula. Creates rich lather that powers through baked-on food while protecting your hands. Infused with a fresh lemon fragrance.",
    shortDescription: "Cuts grease, protects hands",
    image: "/1-litre/dishwash.png",
    largeImage: "/5-litre/dishwash-5.png",
    detailImages: [
      "/product-details/dishwash/1.png",
      "/product-details/dishwash/2.png",
      "/product-details/dishwash/3.png",
      "/product-details/dishwash/4.png",
    ],
    basePrice: 79,
    category: "Kitchen",
    sizes: [
      { label: "½ L", ml: 500, price: 79 },
      { label: "1 L", ml: 1000, price: 139 },
      { label: "5 L", ml: 5000, price: 499 },
    ],
    grades: [{ label: "Standard", priceMultiplier: 1 }],
    combos: [
      { name: "Kitchen Duo", discount: 10, description: "Buy 2 get 10% off" },
      { name: "Bulk Pack", discount: 20, description: "Buy 4 get 20% off" },
    ],
    litre: "1 Litre",
  },
  {
    id: "fabric-conditioner",
    name: "Bubble Fabric Conditioner",
    description:
      "Luxuriously soft fabrics with long-lasting fragrance. Our fabric conditioner protects fibers, reduces wrinkles, and makes ironing easier. Leaves clothes feeling silky smooth.",
    shortDescription: "Soft fabrics, lasting fragrance",
    image: "/1-litre/fabric-freshner.png",
    largeImage: "/5-litre/fabric-freshner-5.png",
    detailImages: [
      "/product-details/fabric-freshner/1.png",
      "/product-details/fabric-freshner/2.png",
      "/product-details/fabric-freshner/3.png",
      "/product-details/fabric-freshner/4.png",
    ],
    basePrice: 79,
    category: "Laundry",
    sizes: [
      { label: "½ L", ml: 500, price: 79 },
      { label: "1 L", ml: 1000, price: 149 },
      { label: "5 L", ml: 5000, price: 499 },
    ],
    grades: [{ label: "Standard", priceMultiplier: 1 }],
    combos: [
      {
        name: "Laundry Bundle",
        discount: 12,
        description: "Buy 2 get 12% off",
      },
    ],
    litre: "½ L",
  },
  {
    id: "floor-cleaner",
    name: "Bubble Floor Cleaner",
    description:
      "Transform your floors with our advanced floor cleaning solution. Removes dirt, bacteria, and tough stains while leaving a long-lasting fresh fragrance. Safe for all floor types including marble, tile, and wood.",
    shortDescription: "Deep clean for all floor types",
    image: "/1-litre/floor-cleaner.png",
    largeImage: "/5-litre/floor-cleaner-5.png",
    detailImages: [
      "/product-details/floor-cleaner/1.png",
      "/product-details/floor-cleaner/2.png",
      "/product-details/floor-cleaner/3.png",
      "/product-details/floor-cleaner/4.png",
    ],
    basePrice: 59,
    category: "Home",
    sizes: [
      { label: "500 ml", ml: 500, price: 59 },
      { label: "1 L", ml: 1000, price: 129 },
      { label: "5 L", ml: 5000, price: 439 },
    ],
    grades: [{ label: "Standard", priceMultiplier: 1 }],
    combos: [
      { name: "Home Care Set", discount: 12, description: "Buy 2 get 12% off" },
    ],
    litre: "1 L",
  },
  {
    id: "phenyl",
    name: "Bubble Phenyl",
    description:
      "Powerful disinfectant phenyl for deep cleaning and germ protection. Eliminates bacteria and viruses while leaving surfaces sanitized with a strong, fresh scent. Ideal for bathrooms, floors, and drains.",
    shortDescription: "Powerful disinfection, deep clean",
    image: "/1-litre/perfumed-phenyl.png",
    largeImage: "/5-litre/perfumed-phenyl-5.png",
    detailImages: [
      "/product-details/perfumed-phenyl/1.png",
      "/product-details/perfumed-phenyl/2.png",
      "/product-details/perfumed-phenyl/3.png",
      "/product-details/perfumed-phenyl/4.png",
    ],
    basePrice: 69,
    category: "Home",
    sizes: [
      { label: "1 L", ml: 1000, price: 69 },
      { label: "5 L", ml: 5000, price: 249 },
    ],
    grades: [{ label: "Standard", priceMultiplier: 1 }],
    combos: [
      {
        name: "Clean Home Pack",
        discount: 10,
        description: "Buy 2 get 10% off",
      },
    ],
    litre: "1 L",
  },
];

export const getProductImage = (imageKey: string) => {
  // If a direct/public path is provided (e.g. "/1-litre/ultra-gel.png"),
  // just return it so the <img> tag can load from the public folder.
  if (imageKey.startsWith("/")) {
    return imageKey;
  }

  // Fallback: support older pattern-based assets like "product-*.png"
  const images: Record<string, string> = {};
  const modules = import.meta.glob("@/assets/product-*.png", {
    eager: true,
    query: "?url",
    import: "default",
  });

  for (const path in modules) {
    const key = path.replace("/src/assets/", "").replace(".png", "");
    images[key] = modules[path] as string;
  }

  return images[imageKey] || "";
};
