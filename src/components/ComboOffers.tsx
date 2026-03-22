import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

export type ComboOffersVariant = "grid" | "carousel";

/** Maps combo badge text → product size `ml` in `products.ts` */
const LITRE_TO_ML: Record<string, number> = {
  "1/2 Litre": 500,
  "1 Litre": 1000,
  "5 Litre": 5000,
};

function getSizeForComboVolume(
  product: (typeof products)[number],
  targetMl: number,
) {
  const exact = product.sizes.find((s) => s.ml === targetMl);
  if (exact) return exact;
  return product.sizes.reduce((best, s) =>
    Math.abs(s.ml - targetMl) < Math.abs(best.ml - targetMl) ? s : best,
  );
}

/** Match combo badge wording (1 Litre / 5 Litre / ½ Litre) vs catalogue "Ltr" */
function formatComboSizeLabel(label: string) {
  if (label === "½ Ltr") return "½ Litre";
  if (label === "1 Ltr") return "1 Litre";
  if (label === "5 Ltr") return "5 Litre";
  return label;
}

/** Card images live in `public/combo-offers/` — `offerPrice` is the bundle price */
const combos = [
  {
    id: "laundry-combo",
    name: "Laundry Combo",
    products: ["detergent-ultra", "detergent-smart", "fabric-conditioner"],
    litre: "1 Litre",
    offerPrice: 329,
    image: "/combo-offers/Laundry-Combo.png",
  },
  {
    id: "basic-home-care",
    name: "Basic Home Care",
    products: ["dish-wash", "detergent-smart", "phenyl"],
    litre: "1 Litre",
    offerPrice: 279,
    image: "/combo-offers/Basic-Home-Care.png",
  },
  {
    id: "premium-cleaning",
    name: "Premium Cleaning",
    products: [
      "detergent-ultra",
      "dish-wash",
      "floor-cleaner",
      "fabric-conditioner",
    ],
    litre: "5 Litre",
    offerPrice: 1599,
    image: "/combo-offers/Premium-Cleaning.png",
  },
  {
    id: "mini-combo",
    name: "Mini Combo",
    products: ["detergent-smart", "dish-wash"],
    litre: "1/2 Litre",
    offerPrice: 129,
    image: "/combo-offers/Mini-Combo.png",
  },
  {
    id: "family-monthly",
    name: "Family Monthly",
    products: [
      "detergent-ultra",
      "detergent-ordinary",
      "fabric-conditioner",
      "floor-cleaner",
    ],
    litre: "5 Litre",
    offerPrice: 1499,
    image: "/combo-offers/Family-Monthly.png",
  },
  {
    id: "economy-bulk",
    name: "Economy Bulk",
    products: ["detergent-ordinary", "dish-wash"],
    litre: "5 Litre",
    offerPrice: 229,
    image: "/combo-offers/Economy-Bulk.png",
  },
  {
    id: "trial-combo",
    name: "Trial Combo",
    products: [
      "fabric-conditioner",
      "floor-cleaner",
      "dish-wash",
      "detergent-ordinary",
      "phenyl",
    ],
    litre: "1/2 Litre",
    offerPrice: 79,
    image: "/combo-offers/Trial-Combo.png",
  },
] as const;

interface ComboOffersProps {
  /** Landing page: single-row infinite auto-scroll. Full page: responsive grid. */
  variant?: ComboOffersVariant;
}

const ComboOffers = ({ variant = "grid" }: ComboOffersProps) => {
  const { addItem } = useCart();

  const getComboProducts = (productIds: readonly string[]) =>
    productIds.map((id) => products.find((p) => p.id === id)!).filter(Boolean);

  const getComboCatalogTotal = (
    productIds: readonly string[],
    litre: string,
  ) => {
    const ml = LITRE_TO_ML[litre];
    return getComboProducts(productIds).reduce(
      (sum, p) => sum + getSizeForComboVolume(p, ml).price,
      0,
    );
  };

  const handleAddCombo = (combo: (typeof combos)[number]) => {
    const ml = LITRE_TO_ML[combo.litre];
    const comboProducts = getComboProducts(combo.products);
    const fullPrice = comboProducts.reduce(
      (sum, p) => sum + getSizeForComboVolume(p, ml).price,
      0,
    );

    addItem({
      productId: combo.id,
      name: combo.name,
      size: "Combo",
      grade: "Combo",
      price: combo.offerPrice,
      image: combo.image,
      isCombo: true,
      comboFullPrice: fullPrice,
      includedProducts: comboProducts.map((p) => {
        const s = getSizeForComboVolume(p, ml);
        return {
          name: p.name,
          size: formatComboSizeLabel(s.label),
          grade: p.grades[0].label,
        };
      }),
    });
  };

  /** Fixed height; list grows so price + CTA align across cards */
  const cardClassName =
    "glass-card rounded-2xl overflow-hidden hover:shadow-product-hover transition-all duration-300 hover:-translate-y-2 relative w-[280px] sm:w-[300px] h-[396px] sm:h-[404px] flex flex-col flex-shrink-0";

  const renderCard = (
    combo: (typeof combos)[number],
    i: number,
    keyPrefix: string,
  ) => {
    const original = getComboCatalogTotal(combo.products, combo.litre);
    const comboProducts = getComboProducts(combo.products);

    const inner = (
      <>
        <div className="absolute top-3 right-3 z-10 gradient-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full">
          {combo.litre}
        </div>

        {/* Image */}
        <div className="relative bg-accent/30 p-3 flex items-center justify-center h-[168px] w-full flex-shrink-0 border-b border-border/40">
          <img
            src={combo.image}
            alt={combo.name}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        <div className="flex flex-col flex-1 min-h-0 px-3 pb-3 pt-2.5 gap-2">
          <h3 className="font-semibold text-primary text-sm sm:text-base leading-tight line-clamp-2 shrink-0">
            {combo.name}
          </h3>
          <ul className="text-[11px] sm:text-xs text-muted-foreground space-y-0.5 flex-1 min-h-0 overflow-y-auto overscroll-contain pr-0.5 leading-snug">
            {comboProducts.map((p) => (
              <li key={p.id}>• {p.name}</li>
            ))}
          </ul>

          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <span className="text-lg font-bold gradient-text">
              ₹{combo.offerPrice}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              ₹{original}
            </span>
          </div>

          <button
            type="button"
            onClick={() => handleAddCombo(combo)}
            className="w-full gradient-primary text-primary-foreground py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Add Combo to Cart
          </button>
        </div>
      </>
    );

    if (variant === "carousel") {
      return (
        <div key={`${keyPrefix}-${combo.id}`} className={cardClassName}>
          {inner}
        </div>
      );
    }

    return (
      <motion.div
        key={`${keyPrefix}-${combo.id}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: i * 0.05 }}
        className={cardClassName}
      >
        {inner}
      </motion.div>
    );
  };

  return (
    <section className="py-16 md:py-20 bg-accent/30">
      <div
        className={
          variant === "carousel"
            ? "max-w-[100vw] mx-auto"
            : "max-w-7xl mx-auto px-4 sm:px-0"
        }
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`text-center mb-10 md:mb-14 ${variant === "carousel" ? "px-4" : ""}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
            Exclusive Combo Offers
          </h2>
          <div className="w-16 h-1 gradient-primary rounded-full mx-auto mb-4" />
          {variant === "carousel" && (
            <Link
              to="/combo-offers"
              className="text-sm font-medium text-secondary hover:underline"
            >
              View all combos
            </Link>
          )}
        </motion.div>

        {variant === "carousel" ? (
          <div className="group relative overflow-hidden">
            {/* Edge fade */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-12 bg-gradient-to-r from-accent/30 to-transparent"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-12 bg-gradient-to-l from-accent/30 to-transparent"
              aria-hidden
            />
            <div className="flex w-max gap-6 pl-4 animate-combo-marquee motion-reduce:animate-none hover:[animation-play-state:paused] pr-4">
              {[...combos, ...combos].map((combo, i) =>
                renderCard(combo, i, `a${i}`),
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center sm:place-items-start px-4 sm:px-0">
            {combos.map((combo, i) => renderCard(combo, i, "grid"))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ComboOffers;
