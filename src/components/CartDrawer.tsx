import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, MessageCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { getProductImage } from "@/data/products";
import {
  getPromoQualifyingSubtotal,
  getHighestUnlockedTier,
} from "@/lib/cartPromotions";
import CartPromotion from "./CartPromotion";

const CartDrawer = () => {
  const {
    items,
    isOpen,
    setIsOpen,
    removeItem,
    updateQuantity,
    subtotal,
    clearCart,
  } = useCart();

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;
    const qualifying = getPromoQualifyingSubtotal(items);
    const tier = getHighestUnlockedTier(qualifying);
    const promoNote =
      qualifying > 0
        ? `\n\n[Promo] Qualifying spend (excl. combos): ₹${qualifying.toFixed(0)}${
            tier ? ` — Unlocked: ${tier.description}` : ""
          }`
        : "";
    const itemsList = items
      .map((i) => {
        if (i.isCombo && i.includedProducts) {
          const products = i.includedProducts
            .map((p) => `${p.name} (${p.size})`)
            .join(", ");
          const line = `• ${i.name} [${products}] – Qty: ${i.quantity} – Combo ₹${(i.price * i.quantity).toFixed(0)}`;
          if (i.comboFullPrice != null) {
            return `${line} (catalog ₹${(i.comboFullPrice * i.quantity).toFixed(0)})`;
          }
          return line;
        }
        return `• ${i.name} – ${i.size} – ${i.grade} – Qty: ${i.quantity} – ₹${(i.price * i.quantity).toFixed(0)}`;
      })
      .join("\n");
    const message = `Hello Bubble Liquid,\nI would like to order:\n\n${itemsList}\n\nTotal Amount: ₹${subtotal.toFixed(0)}${promoNote}`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/919176952152?text=${encoded}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-border z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-bold text-primary">Your Cart</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl hover:bg-accent transition-colors"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <p className="text-lg font-medium mb-2">Cart is empty</p>
                  <p className="text-sm">Add some products to get started!</p>
                </div>
              ) : (
                items.map((item) => {
                  const image = getProductImage(item.image);
                  return (
                    <motion.div
                      key={`${item.productId}-${item.size}-${item.grade}`}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      className="glass-card rounded-2xl p-4 flex gap-4"
                    >
                      <div className="bg-accent/30 rounded-xl p-2 w-20 h-20 flex-shrink-0 flex items-center justify-center">
                        <img
                          src={image}
                          alt={item.name}
                          className="max-h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col">
                        <h4 className="font-semibold text-primary text-sm">
                          {item.name}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-2">
                          {item.size} · {item.grade}
                        </p>

                        {/* Included Products for Combo */}
                        {item.isCombo && item.includedProducts && (
                          <div className="text-xs text-muted-foreground mb-2 space-y-1">
                            <p className="font-medium text-primary text-xs">
                              Includes:
                            </p>
                            {item.includedProducts.map((p, i) => (
                              <div
                                key={i}
                                className="pl-2 border-l border-border/40 text-xs"
                              >
                                {p.name} • {p.size}
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.size,
                                  item.grade,
                                  item.quantity - 1,
                                )
                              }
                              className="p-1 rounded-lg hover:bg-accent transition-colors"
                            >
                              <Minus className="h-3.5 w-3.5 text-muted-foreground" />
                            </button>
                            <span className="text-sm font-medium text-primary w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.size,
                                  item.grade,
                                  item.quantity + 1,
                                )
                              }
                              className="p-1 rounded-lg hover:bg-accent transition-colors"
                            >
                              <Plus className="h-3.5 w-3.5 text-muted-foreground" />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col items-end gap-0.5">
                              <span className="font-semibold text-sm gradient-text">
                                ₹{(item.price * item.quantity).toFixed(0)}
                              </span>
                              {item.isCombo && item.comboFullPrice != null && (
                                <span className="text-xs text-muted-foreground line-through">
                                  ₹
                                  {(
                                    item.comboFullPrice * item.quantity
                                  ).toFixed(0)}
                                </span>
                              )}
                            </div>
                            <button
                              onClick={() =>
                                removeItem(
                                  item.productId,
                                  item.size,
                                  item.grade,
                                )
                              }
                              className="p-1 rounded-lg hover:bg-destructive/10 transition-colors"
                            >
                              <Trash2 className="h-3.5 w-3.5 text-destructive" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                <CartPromotion items={items} />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground font-medium">
                    Subtotal
                  </span>
                  <span className="text-2xl font-bold gradient-text">
                    ₹{subtotal.toFixed(0)}
                  </span>
                </div>
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full gradient-primary text-primary-foreground py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="20"
                    height="20"
                    viewBox="0 0 50 50"
                    style={{ fill: "currentColor" }}
                  >
                    <path d="M25,2C12.318,2,2,12.318,2,25c0,3.96,1.023,7.854,2.963,11.29L2.037,46.73c-0.096,0.343-0.003,0.711,0.245,0.966 C2.473,47.893,2.733,48,3,48c0.08,0,0.161-0.01,0.24-0.029l10.896-2.699C17.463,47.058,21.21,48,25,48c12.682,0,23-10.318,23-23 S37.682,2,25,2z M36.57,33.116c-0.492,1.362-2.852,2.605-3.986,2.772c-1.018,0.149-2.306,0.213-3.72-0.231 c-0.857-0.27-1.957-0.628-3.366-1.229c-5.923-2.526-9.791-8.415-10.087-8.804C15.116,25.235,13,22.463,13,19.594 s1.525-4.28,2.067-4.864c0.542-0.584,1.181-0.73,1.575-0.73s0.787,0.005,1.132,0.021c0.363,0.018,0.85-0.137,1.329,1.001 c0.492,1.168,1.673,4.037,1.819,4.33c0.148,0.292,0.246,0.633,0.05,1.022c-0.196,0.389-0.294,0.632-0.59,0.973 s-0.62,0.76-0.886,1.022c-0.296,0.291-0.603,0.606-0.259,1.19c0.344,0.584,1.529,2.493,3.285,4.039 c2.255,1.986,4.158,2.602,4.748,2.894c0.59,0.292,0.935,0.243,1.279-0.146c0.344-0.39,1.476-1.703,1.869-2.286 s0.787-0.487,1.329-0.292c0.542,0.194,3.445,1.604,4.035,1.896c0.59,0.292,0.984,0.438,1.132,0.681 C37.062,30.587,37.062,31.755,36.57,33.116z"></path>
                  </svg>
                  Order via WhatsApp
                </button>
                <button
                  onClick={clearCart}
                  className="w-full text-muted-foreground text-sm hover:text-destructive transition-colors py-2"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
