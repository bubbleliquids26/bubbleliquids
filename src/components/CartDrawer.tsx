import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Plus, Minus, Trash2, MessageCircle, Check } from "lucide-react";
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

  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const discountPercentage = appliedCoupon === "FIRSTORDER10" ? 10 : 0;
  const discountAmount = (subtotal * discountPercentage) / 100;
  const finalTotal = subtotal - discountAmount;

  const handleApplyCoupon = () => {
    if (coupon.trim().toUpperCase() === "FIRSTORDER10") {
      setAppliedCoupon("FIRSTORDER10");
    } else {
      alert("Invalid coupon code. Please try FIRSTORDER10");
      setCoupon("");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCoupon("");
  };

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
            className="fixed right-0 top-0 h-full max-h-[100dvh] w-full sm:max-w-md bg-background border-l border-border z-50 flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between p-4 sm:p-6 border-b border-border">
              <h2 className="text-lg sm:text-xl font-bold text-primary">
                Your Cart
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl hover:bg-accent transition-colors"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-muted-foreground min-h-0">
                <p className="text-lg font-medium mb-2">Cart is empty</p>
                <p className="text-sm">Add some products to get started!</p>
              </div>
            ) : (
              <>
                {/* Scrollable: line items first, then promo & totals — no max-height cap */}
                <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-3 sm:p-6 space-y-3 sm:space-y-4">
                  <div className="space-y-2 sm:space-y-4">
                {items.map((item) => {
                  const image = getProductImage(item.image);
                  return (
                    <motion.div
                      key={`${item.productId}-${item.size}-${item.grade}`}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      className="glass-card rounded-xl sm:rounded-2xl p-2.5 sm:p-4 flex gap-2.5 sm:gap-4"
                    >
                      <div className="bg-accent/30 rounded-lg sm:rounded-xl p-1.5 sm:p-2 w-14 h-14 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center">
                        <img
                          src={image}
                          alt={item.name}
                          className="max-h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col">
                        <h4 className="font-semibold text-primary text-xs sm:text-sm">
                          {item.name}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-1 sm:mb-2">
                          {item.size} · {item.grade}
                        </p>

                        {/* Included Products for Combo */}
                        {item.isCombo && item.includedProducts && (
                          <div className="text-xs text-muted-foreground mb-1 sm:mb-2 space-y-0.5">
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
                          <div className="flex items-center gap-1 sm:gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.size,
                                  item.grade,
                                  item.quantity - 1,
                                )
                              }
                              className="p-0.5 rounded-lg hover:bg-accent transition-colors"
                            >
                              <Minus className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-muted-foreground" />
                            </button>
                            <span className="text-xs sm:text-sm font-medium text-primary w-5 text-center">
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
                              className="p-0.5 rounded-lg hover:bg-accent transition-colors"
                            >
                              <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-muted-foreground" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="flex flex-col items-end gap-0">
                              <span className="font-semibold text-xs sm:text-sm gradient-text">
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
                })}
                  </div>

                  <CartPromotion items={items} />

                  {/* Coupon Code Section */}
                  <div className="space-y-2 pt-1 border-t border-border/60">
                    {!appliedCoupon ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={coupon}
                          onChange={(e) =>
                            setCoupon(e.target.value.toUpperCase())
                          }
                          placeholder="Enter coupon code"
                          className="flex-1 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-border bg-background text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-ring/50"
                        />
                        <button
                          type="button"
                          onClick={handleApplyCoupon}
                          className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border-2 border-primary text-primary text-xs sm:text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all shrink-0"
                        >
                          Apply
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-2 bg-green-50 border border-green-200 rounded-xl p-3 sm:p-4">
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                          <span className="text-xs sm:text-sm font-medium text-green-700">
                            Coupon Applied: {appliedCoupon}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveCoupon}
                          className="text-green-600 hover:text-green-700 text-xs font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Pricing Section */}
                  <div className="space-y-2 pt-2 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground font-medium text-sm">
                        Subtotal
                      </span>
                      <span className="text-lg font-bold text-primary">
                        ₹{subtotal.toFixed(0)}
                      </span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-green-600 font-medium text-sm">
                          Discount ({discountPercentage}%)
                        </span>
                        <span className="text-lg font-bold text-green-600">
                          -₹{discountAmount.toFixed(0)}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <span className="text-muted-foreground font-medium text-sm">
                        Total
                      </span>
                      <span className="text-2xl font-bold gradient-text">
                        ₹{finalTotal.toFixed(0)}
                      </span>
                    </div>
                  </div>

                  {/* Delivery Information */}
                  <div className="mt-4 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-blue-900 text-sm mb-1">Delivery Information</h4>
                        <p className="text-blue-800 text-xs leading-relaxed">
                          <strong>Free delivery</strong> up to 3 kms radius. 
                          Additional delivery charges applicable for locations beyond 3 kms based on distance.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fixed bottom actions — does not shrink cart lines */}
                <div className="shrink-0 border-t border-border bg-background p-4 sm:p-6 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] space-y-2 sm:space-y-3">
                  <button
                    type="button"
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
                      aria-hidden
                    >
                      <path d="M25,2C12.318,2,2,12.318,2,25c0,3.96,1.023,7.854,2.963,11.29L2.037,46.73c-0.096,0.343-0.003,0.711,0.245,0.966 C2.473,47.893,2.733,48,3,48c0.08,0,0.161-0.01,0.24-0.029l10.896-2.699C17.463,47.058,21.21,48,25,48c12.682,0,23-10.318,23-23 S37.682,2,25,2z M36.57,33.116c-0.492,1.362-2.852,2.605-3.986,2.772c-1.018,0.149-2.306,0.213-3.72-0.231 c-0.857-0.27-1.957-0.628-3.366-1.229c-5.923-2.526-9.791-8.415-10.087-8.804C15.116,25.235,13,22.463,13,19.594 s1.525-4.28,2.067-4.864c0.542-0.584,1.181-0.73,1.575-0.73s0.787,0.005,1.132,0.021c0.363,0.018,0.85-0.137,1.329,1.001 c0.492,1.168,1.673,4.037,1.819,4.33c0.148,0.292,0.246,0.633,0.05,1.022c-0.196,0.389-0.294,0.632-0.59,0.973 s-0.62,0.76-0.886,1.022c-0.296,0.291-0.603,0.606-0.259,1.19c0.344,0.584,1.529,2.493,3.285,4.039 c2.255,1.986,4.158,2.602,4.748,2.894c0.59,0.292,0.935,0.243,1.279-0.146c0.344-0.39,1.476-1.703,1.869-2.286 s0.787-0.487,1.329-0.292c0.542,0.194,3.445,1.604,4.035,1.896c0.59,0.292,0.984,0.438,1.132,0.681 C37.062,30.587,37.062,31.755,36.57,33.116z"></path>
                    </svg>
                    Order via WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="w-full text-muted-foreground text-sm hover:text-destructive transition-colors py-2"
                  >
                    Clear Cart
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
