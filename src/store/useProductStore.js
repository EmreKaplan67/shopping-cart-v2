// For UI State Management
import { create } from "zustand";

export const useProductStore = create((set, get)=> ({
    //filters
    category: "all",
    searchTerm: "",
    sortOrder:"", // "price-asc", "price-desc", "alpha-asc", "alpha-desc"
    
    // cart
    cart: [], // array of { product, quantity }
    
    // setters
    setCategory: (category) => set({category}),
    setSearchTerm: (searchTerm) => set({searchTerm}),
    setSortOrder: (sortOrder) => set({sortOrder}),
    
    // cart actions
    addToCart: (product) => set((state) => {
        const existingItem = state.cart.find(item => item.product.id === product.id)
        if (existingItem) {
            return {
                cart: state.cart.map(item => 
                    item.product.id === product.id 
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
        }
        return { cart: [...state.cart, { product, quantity: 1 }] }
    }),
    
    removeFromCart: (productId) => set((state) => ({ 
        cart: state.cart.filter((item) => item.product.id !== productId) 
    })),
    
    updateQuantity: (productId, quantity) => set((state) => ({
        cart: state.cart.map(item =>
            item.product.id === productId
                ? { ...item, quantity: Math.max(0, quantity) }
                : item
        ).filter(item => item.quantity > 0)
    })),
    
    clearCart: () => set({ cart: [] }),
}))