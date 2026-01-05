import React from 'react';
import { useProductStore } from '../store/useProductStore';
import SearchBar from './SearchBar';

function Navbar({ isCartOpen, setIsCartOpen }) {
    console.log('Navbar rendered')
    
    const category = useProductStore((state) => state.category);
    const sortOrder = useProductStore((state) => state.sortOrder);
    const cart = useProductStore((state) => state.cart);
    const setCategory = useProductStore((state) => state.setCategory);
    const setSortOrder = useProductStore((state) => state.setSortOrder);
    
    const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const categories = [
        "all",
        "electronics",
        "jewelery",
        "men's clothing",
        "women's clothing"
    ]

    const sortOptions = [
        { label: "Price (Low to High)", value: "price-asc" },
        { label: "Price (High to Low)", value: "price-desc" },
        { label: "Alphabetical (A to Z)", value: "alpha-asc" },
        { label: "Alphabetical (Z to A)", value: "alpha-desc" },
    ]

    return (
        <nav className="bg-white shadow-md rounded-lg p-6 mb-6">
                {/* Header with Search Bar and Cart */}
                <div className="flex items-center justify-between mb-6 gap-4">
                    <SearchBar />
                    
                    {/* Cart Button */}
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                    >
                        <span>🛒 Cart</span>
                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                                {cartItemCount}
                            </span>
                        )}
                    </button>
                </div>

            {/* Categories */}
            <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Categories</h3>
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                        <button 
                            key={cat} 
                            onClick={() => setCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 capitalize ${
                                category === cat 
                                    ? 'bg-blue-600 text-white shadow-md' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Sort Options */}
            <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Sort By</h3>
                <div className="flex flex-wrap gap-2">
                    {sortOptions.map((option) => (
                        <button 
                            key={option.value} 
                            onClick={() => setSortOrder(option.value)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                sortOrder === option.value 
                                    ? 'bg-blue-600 text-white shadow-md' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
