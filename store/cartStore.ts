import { create } from 'zustand';
import { ProductType } from '../app/(tab)';

interface CartItem {
    cart: Array<ProductType & { quantity: number }>;
    itemsCount: number;
    addToCart: (product: ProductType) => void;
    removeFromCart: (product: ProductType) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartItem>((set) => ({
    cart: [],
    itemsCount: 0,

    addToCart: (product) =>
        set((state) => {
            const existingItem = state.cart.find((item) => item.id === product.id);

            let updatedCart;

            if (existingItem) {
                updatedCart = state.cart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            } else {
                updatedCart = [...state.cart, { ...product, quantity: 1 }];
            }

            const totalCount = updatedCart.reduce((sum, item) => sum + item.quantity, 0);

            return {
                cart: updatedCart,
                itemsCount: totalCount,
            };
        }),

    removeFromCart: (product) =>
        set((state) => {
            const updatedCart = state.cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item).filter((item) => item.quantity > 0);
            const totalCount = updatedCart.reduce(
                (sum, item) => sum + item.quantity,
                0
            );

            return {
                cart: updatedCart,
                itemsCount: totalCount,
            };
        }),

    clearCart: () =>
        set({
            cart: [],
            itemsCount: 0,
        }),
}));
