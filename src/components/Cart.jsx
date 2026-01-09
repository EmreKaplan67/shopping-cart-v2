import { useProductStore } from "../store/useProductStore"

function Cart({ isOpen, onClose }) {
  const cart = useProductStore((state) => state.cart)
  const updateQuantity = useProductStore((state) => state.updateQuantity)
  const removeFromCart = useProductStore((state) => state.removeFromCart)
  const clearCart = useProductStore((state) => state.clearCart)

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  if (!isOpen) return null

  return (
    <div className="fixed right-0 top-0 w-full max-w-sm bg-white border-l border-gray-300 shadow-lg flex flex-col h-screen z-10">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 pt-12">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              <p className="text-lg">Your cart is empty</p>
              <p className="text-sm mt-2">Add some products to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 border rounded-lg"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-20 h-20 object-contain"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm line-clamp-2">
                      {item.product.title}
                    </h3>
                    <p className="text-green-700 font-bold mt-1">
                      ${item.product.price.toFixed(2)}
                    </p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="ml-auto text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t p-6 space-y-4">
            <div className="flex justify-between text-lg">
              <span className="font-semibold">Total Items:</span>
              <span className="font-bold">{totalItems}</span>
            </div>
            <div className="flex justify-between text-xl">
              <span className="font-semibold">Total Price:</span>
              <span className="font-bold text-green-700">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <button
              onClick={clearCart}
              className="w-full py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              Clear Cart
            </button>
            <button
              className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
  )
}

export default Cart
