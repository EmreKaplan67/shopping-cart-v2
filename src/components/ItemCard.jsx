import { useProductStore } from "../store/useProductStore"

function ItemCard({ product }) {
  console.log('ItemCard rendered:', product.id)
  
  const cart = useProductStore((state) => state.cart)
  const addToCart = useProductStore((state) => state.addToCart)
  const updateQuantity = useProductStore((state) => state.updateQuantity)
  
  const cartItem = cart.find(item => item.product.id === product.id)
  const quantity = cartItem ? cartItem.quantity : 0

  return (
    <div className="border border-gray-300 rounded-lg p-3 md:p-4 w-full sm:w-[200px] mx-auto flex flex-col items-center gap-2 shadow-md hover:shadow-2xl transition-shadow duration-300">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-[120px] md:h-[150px] object-contain"
      />
      <div className="text-xs text-gray-600 capitalize">
        {product.category}
      </div>
      <div className="font-bold text-center text-sm md:text-base line-clamp-2">{product.title}</div>
      <div className="text-green-700 font-bold mt-auto">
        ${product.price.toFixed(2)}
      </div>
      
      {quantity === 0 ? (
        <button
          onClick={() => addToCart(product)}
          className="w-full mt-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors"
        >
          Add to Cart
        </button>
      ) : (
        <div className="w-full mt-2 flex items-center justify-between gap-2 bg-gray-100 rounded-lg p-2">
          <button
            onClick={() => updateQuantity(product.id, quantity - 1)}
            className="w-8 h-8 flex items-center justify-center bg-white hover:bg-gray-200 rounded-lg font-bold text-lg"
          >
            −
          </button>
          <span className="font-bold text-lg">{quantity}</span>
          <button
            onClick={() => updateQuantity(product.id, quantity + 1)}
            className="w-8 h-8 flex items-center justify-center bg-white hover:bg-gray-200 rounded-lg font-bold text-lg"
          >
            +
          </button>
        </div>
      )}
    </div>
  )
}

export default ItemCard