import { create } from 'zustand'

interface CartStore {
  totalQuantity: number;
  updateQuantity: (quantity: number) => void;
}

export const useCartStore = create<CartStore>((set) => {
  // Инициализация количества из localStorage при создании стора
  const initializeQuantity = () => {
    if (typeof window !== 'undefined') {
      const storedQuantity = JSON.parse(localStorage.getItem('cartQuantity') || '0');
      return storedQuantity;
    }
    return 0;
  };

  return {
    totalQuantity: initializeQuantity(),

    updateQuantity: (quantity: number) => {
      // Обновление состояния и сохранение в localStorage
      set({totalQuantity: quantity});
      if (typeof window !== 'undefined') {
        localStorage.setItem('cartQuantity', JSON.stringify(quantity));
      }
    }
  };
});
