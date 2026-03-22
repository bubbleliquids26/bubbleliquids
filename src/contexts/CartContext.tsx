import React, { createContext, useContext, useState, useCallback } from "react";

export interface CartItem {
  productId: string;
  name: string;
  size: string;
  grade: string;
  price: number;
  quantity: number;
  image: string;
  isCombo?: boolean;
  /** Sum of individual catalogue prices at combo sizes — for strikethrough when isCombo */
  comboFullPrice?: number;
  includedProducts?: Array<{
    name: string;
    size: string;
    grade: string;
  }>;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (productId: string, size: string, grade: string) => void;
  updateQuantity: (
    productId: string,
    size: string,
    grade: string,
    quantity: number,
  ) => void;
  totalItems: number;
  subtotal: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) =>
          i.productId === item.productId &&
          i.size === item.size &&
          i.grade === item.grade,
      );
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId &&
          i.size === item.size &&
          i.grade === item.grade
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback(
    (productId: string, size: string, grade: string) => {
      setItems((prev) =>
        prev.filter(
          (i) =>
            !(
              i.productId === productId &&
              i.size === size &&
              i.grade === grade
            ),
        ),
      );
    },
    [],
  );

  const updateQuantity = useCallback(
    (productId: string, size: string, grade: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId, size, grade);
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          i.productId === productId && i.size === size && i.grade === grade
            ? { ...i, quantity }
            : i,
        ),
      );
    },
    [removeItem],
  );

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        addItem,
        removeItem,
        updateQuantity,
        totalItems,
        subtotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
