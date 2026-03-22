import { Gift, Check } from "lucide-react";
import type { CartItem } from "@/contexts/CartContext";
import {
  CART_PROMO_TIERS,
  getPromoQualifyingSubtotal,
  getHighestUnlockedTier,
  getNextTier,
} from "@/lib/cartPromotions";

interface CartPromotionProps {
  items: CartItem[];
}

const CartPromotion = ({ items }: CartPromotionProps) => {
  const qualifying = getPromoQualifyingSubtotal(items);
  const hasItems = items.length > 0;
  const comboOnly =
    hasItems && qualifying === 0 && items.every((i) => i.isCombo);

  const highest = getHighestUnlockedTier(qualifying);
  const next = getNextTier(qualifying);
  const progressToNext = next
    ? Math.min(100, (qualifying / next.min) * 100)
    : 100;

  return (
    <div className="rounded-2xl border border-secondary/25 bg-gradient-to-br from-accent/80 to-accent/40 p-4 space-y-3">
      <div className="flex items-start gap-2">
        <Gift className="h-5 w-5 shrink-0 text-secondary mt-0.5" aria-hidden />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-primary leading-tight">
            Free bottle rewards
          </p>
          <p className="text-[11px] text-muted-foreground mt-1 leading-snug">
            Only regular cart value counts toward these gifts.{" "}
            <span className="font-medium text-primary/90">
              Combo offers are excluded.
            </span>
          </p>
        </div>
      </div>

      {comboOnly && (
        <p className="text-xs text-amber-800 dark:text-amber-200/90 bg-amber-500/10 rounded-lg px-3 py-2 border border-amber-500/20">
          Add non-combo products to qualify for free bottle tiers. Your combo
          total does not count toward ₹499 / ₹999 / ₹1799.
        </p>
      )}

      <ul className="space-y-2">
        {CART_PROMO_TIERS.map((tier) => {
          const isCurrentOffer =
            highest != null && tier.min === highest.min;
          const notReached = qualifying < tier.min;
          return (
            <li
              key={tier.min}
              className={`flex items-start justify-between gap-2 text-xs rounded-lg px-2 py-1.5 ${
                isCurrentOffer ? "bg-secondary/10" : "opacity-90"
              }`}
            >
              <div className="min-w-0">
                <span className="font-semibold text-primary">
                  ₹{tier.min}+
                </span>
                <span className="text-muted-foreground"> — </span>
                <span className="text-foreground/90">{tier.description}</span>
              </div>
              {isCurrentOffer ? (
                <Check
                  className="h-4 w-4 shrink-0 text-secondary"
                  aria-label="Current offer"
                />
              ) : notReached ? (
                <span className="text-[10px] text-muted-foreground shrink-0 tabular-nums">
                  ₹{Math.max(0, tier.min - qualifying)} more
                </span>
              ) : (
                <span
                  className="text-[10px] text-muted-foreground/70 shrink-0"
                  aria-hidden
                >
                  —
                </span>
              )}
            </li>
          );
        })}
      </ul>

      <div className="space-y-1.5 pt-1 border-t border-border/50">
        <div className="flex justify-between text-[11px] text-muted-foreground">
          <span>Qualifying spend (excl. combos)</span>
          <span className="font-semibold text-primary tabular-nums">
            ₹{qualifying.toFixed(0)}
          </span>
        </div>
        {next ? (
          <>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full gradient-primary transition-[width] duration-300"
                style={{ width: `${progressToNext}%` }}
              />
            </div>
            <p className="text-[11px] text-muted-foreground">
              Add{" "}
              <span className="font-semibold text-primary">
                ₹{(next.min - qualifying).toFixed(0)}
              </span>{" "}
              more in regular products to unlock:{" "}
              <span className="text-foreground">{next.description}</span>
            </p>
          </>
        ) : (
          <p className="text-[11px] font-medium text-secondary">
            Highest tier reached — you qualify for a free{" "}
            {highest?.label ?? "bottle"} (mention when ordering).
          </p>
        )}
      </div>
    </div>
  );
};

export default CartPromotion;
