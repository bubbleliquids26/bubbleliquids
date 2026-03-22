import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import {
  Product,
  getProductImage,
  getSizeForProductCardBadge,
  getProductCardImage,
  mlToLitreBadge,
} from "@/data/products";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  product: Product;
  index?: number;
  /** Products listing: one card per size; uses correct price, badge, and 1L vs 5L image */
  variantMl?: number;
}

const ProductCard = ({ product, index = 0, variantMl }: ProductCardProps) => {
  const { addItem } = useCart();

  const cardSize =
    variantMl != null
      ? (product.sizes.find((s) => s.ml === variantMl) ?? product.sizes[0])
      : getSizeForProductCardBadge(product);

  const displayPrice = cardSize.price;
  const displaySize = cardSize.label;
  const imageKey = getProductCardImage(product, cardSize.ml);
  const image = getProductImage(imageKey);

  const badgeLabel =
    variantMl != null
      ? mlToLitreBadge(variantMl)
      : (product.litre ?? mlToLitreBadge(cardSize.ml));

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      size: displaySize,
      grade: product.grades[0].label,
      price: displayPrice,
      image: imageKey,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link
        to={`/products/${product.id}?size=${cardSize.ml}`}
        className="block group"
      >
        <div className="glass-card rounded-2xl overflow-hidden hover:shadow-product-hover transition-all duration-300 hover:-translate-y-2 relative">
          {/* Litre Badge */}
          <div className="absolute top-3 right-3 z-10 gradient-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full">
            {badgeLabel}
          </div>

          {/* Image */}
          <div className="relative bg-accent/30 p-6 flex items-center justify-center h-64 overflow-hidden">
            <img
              src={image}
              alt={product.name}
              className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Info */}
          <div className="p-5">
            <p className="text-xs font-medium text-secondary mb-1 uppercase tracking-wider">
              {product.category}
            </p>
            <h3 className="font-semibold text-primary text-lg mb-1 group-hover:text-secondary transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {product.shortDescription}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-xl font-bold gradient-text">
                ₹{displayPrice}
              </span>
              <div className="flex gap-2">
                <span className="text-xs text-muted-foreground border border-border rounded-lg px-3 py-2 group-hover:border-secondary group-hover:text-secondary transition-colors font-medium">
                  View Details
                </span>
                <button
                  onClick={handleAddToCart}
                  className="gradient-primary p-2.5 rounded-xl text-primary-foreground hover:opacity-90 transition-all hover:scale-105 active:scale-95"
                  aria-label="Add to cart"
                >
                  <ShoppingCart className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
