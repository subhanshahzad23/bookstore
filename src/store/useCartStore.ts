import { create } from "zustand";
import { CardItem } from "@/types";

interface CartStore {
  items: CardItem[];
  totalPrice: number;
  addItem: (item: CardItem) => void;
  removeItem: (itemId: string) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  calculateTotal: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  totalPrice: 0,

  addItem: (item: CardItem) => {
    const items = get().items;
    const existingItem = items.find((i) => i.id === item.id);

    if (existingItem) {
      const updatedItems = items.map((i) =>
        i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
      );
      set({ items: updatedItems });
    } else {
      set({ items: [...items, { ...item, quantity: 1 }] });
    }
    get().calculateTotal();
  },

  removeItem: (itemId: string) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
    }));
    get().calculateTotal();
  },

  updateItemQuantity: (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      ),
    }));
    get().calculateTotal();
  },

  clearCart: () => {
    set({ items: [], totalPrice: 0 });
  },

  calculateTotal: () => {
    const total = get().items.reduce((sum, item) => {
      return sum + parseFloat(item.price) * (item.quantity || 1);
    }, 0);
    set({ totalPrice: Number(total.toFixed(2)) });
  },
}));
