import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { getProducts } from "./api/product"
import { useProductStore } from "./store/useProductStore"
import Navbar from "./components/Navbar"
import ItemCard from "./components/ItemCard"
import Cart from "./components/Cart"
import { useState } from "react"

function App() {
  console.log('App rendered')
  
  const [isCartOpen, setIsCartOpen] = useState(false)

  const category = useProductStore((state) => state.category)
  const searchTerm = useProductStore((state) => state.searchTerm)
  const sortOrder = useProductStore((s) => s.sortOrder)

  const { data = [], isLoading, error } = useQuery({
    queryKey: ["products", category, searchTerm],
    queryFn: () => getProducts(category, searchTerm),
    placeholderData: keepPreviousData,
  })



  // Sort
  if (sortOrder === "price-asc") data.sort((a, b) => a.price - b.price)
  if (sortOrder === "price-desc") data.sort((a, b) => b.price - a.price)
  if (sortOrder === "alpha-asc") data.sort((a, b) => a.title.localeCompare(b.title))
  if (sortOrder === "alpha-desc") data.sort((a, b) => b.title.localeCompare(a.title))


  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <Navbar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      <div className={`transition-all duration-300 ${isCartOpen ? 'mr-[448px]' : ''}`}>
        {data.length === 0 ? (
          <div>No items found for "{searchTerm}"</div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 mt-4">
            {data.map((product) => (
              <ItemCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      
      {/* Cart Sidebar - Fixed on right */}
      {isCartOpen && <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />}
    </div>
  )
}

export default App
