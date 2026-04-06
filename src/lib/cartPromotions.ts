import type { CartItem } from "@/contexts/CartContext";

/** Spend on these regular-product thresholds unlocks a free bottle (WhatsApp order). Combos excluded. */
export const CART_PROMO_TIERS = [
  {
    min: 499,
    label: "½ L bottle",
    description: "Any ½ L bottle free",
  },
  {
    min: 999,
    label: "1 L bottle",
    description: "Any 1 L bottle product free",
  },
  {
    min: 1799,
    label: "5 L bottle",
    description: "Any 5 L liquid free",
  },
] as const;

export function getPromoQualifyingSubtotal(items: CartItem[]): number {
  return items
    .filter((i) => !i.isCombo)
    .reduce((sum, i) => sum + i.price * i.quantity, 0);
}

export function getHighestUnlockedTier(qualifying: number) {
  let tier: (typeof CART_PROMO_TIERS)[number] | null = null;
  for (const t of CART_PROMO_TIERS) {
    if (qualifying >= t.min) tier = t;
  }
  return tier;
}

export function getNextTier(qualifying: number) {
  return CART_PROMO_TIERS.find((t) => qualifying < t.min) ?? null;
}
