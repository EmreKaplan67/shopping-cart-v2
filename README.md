# Amazing Store - E-Commerce Product Browser

A modern, performant e-commerce product browsing application built with React, featuring advanced state management, server-side data fetching, and a fully functional shopping cart.

## 🚀 Tech Stack

### Core Technologies
- **React 19.2.0** - Latest React with modern hooks and concurrent features
- **Vite 7.2.4** - Lightning-fast build tool and dev server
- **TanStack Query v5** (React Query) - Powerful server state management
- **Zustand 5.0.9** - Lightweight client-side state management
- **Axios 1.13.2** - HTTP client for API requests
- **Tailwind CSS 4.1.18** - Utility-first CSS framework

### API
- **Fake Store API** - RESTful API for product data

## 📝 Learning Outcomes

This project demonstrates:
- Separation of server state (React Query) and client state (Zustand)
- Performance optimization techniques in React
- Proper use of React.memo and selective subscriptions
- Modern React patterns with hooks
- Responsive UI design with Tailwind CSS
- Shopping cart implementation
- API integration and error handling

## ✨ Features

### Product Browsing
- Browse products from multiple categories (electronics, jewelry, men's/women's clothing)
- Real-time search functionality
- Multiple sorting options (price, alphabetical)
- Responsive grid layout with auto-fill columns
- Product cards with hover effects

### Shopping Cart
- Add/remove items with quantity controls
- Persistent cart state across navigation
- Real-time cart total and item count
- Fixed sidebar cart with full-screen height
- Quantity controls directly on product cards
- Empty cart state handling

### UI/UX
- Modern, clean interface with Tailwind CSS
- Smooth transitions and animations
- Active state indicators for filters and sort options
- Responsive design
- Loading states with placeholder data
- Error handling

## 🎯 Performance Optimizations

### React Query Optimizations
1. **`keepPreviousData`** - Prevents UI flashing during refetches by showing previous data while new data loads
2. **Smart caching** - Automatic caching based on `queryKey` (category + searchTerm)
3. **Background refetching** - Seamless data updates without blocking UI

### Zustand State Management
1. **Granular selectors** - Components only subscribe to specific state slices they need
2. **Stable function references** - Action functions don't cause re-renders
3. **Minimal re-renders** - Only affected components update when state changes

### React Component Optimizations
1. **React.memo on SearchBar** - Prevents unnecessary re-renders when parent (Navbar) updates
2. **Selective subscriptions** - Components only subscribe to required Zustand state
3. **Efficient cart calculations** - Computed values only recalculate when cart changes

### Render Optimization Strategy
- **App component** - Re-renders only when category, searchTerm, or sortOrder changes
- **Navbar component** - Re-renders only when category, sortOrder, or cart changes (necessary for active states)
- **SearchBar component** - Never re-renders after initial mount (memoized)
- **ItemCard components** - Re-render only when product data changes

### API Optimization
- Client-side filtering for search (reduces API calls)
- Proper REST endpoint usage for category filtering
- Single source of truth for product data



## 📁 Project Structure

```
src/
├── components/
│   ├── Cart.jsx          # Shopping cart sidebar
│   ├── ItemCard.jsx      # Product card with quantity controls
│   ├── Navbar.jsx        # Navigation with filters and cart button
│   └── SearchBar.jsx     # Search input (memoized)
├── store/
│   └── useProductStore.js # Zustand store (cart + UI state)
├── api/
│   └── product.js        # API calls with Axios
├── App.jsx               # Main app component
└── main.jsx              # App entry point with React Query provider
```

## 🛠️ State Management Architecture

### Server State (React Query)
- Product data fetching and caching
- Loading and error states
- Automatic background refetching
- Query invalidation on filter changes

### Client State (Zustand)
- **UI State**: category, searchTerm, sortOrder
- **Cart State**: cart items with quantities
- **Actions**: addToCart, removeFromCart, updateQuantity, clearCart

## 🚦 Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🎨 Key Implementation Details

### Cart Functionality
- Items stored as `{ product, quantity }` objects
- Automatic quantity increment for duplicate items
- Quantity controls with automatic removal at 0
- Real-time total calculations

### Search & Filter Flow
1. User selects category → Zustand updates → React Query refetches with new category
2. User searches → Zustand updates → React Query refetches → Client-side filtering
3. User sorts → Zustand updates → Client-side sorting (no refetch)

### Performance Monitoring
Console logs added to track component renders:
- `App rendered`
- `Navbar rendered`
- `SearchBar rendered`
- `ItemCard rendered: [id]`


