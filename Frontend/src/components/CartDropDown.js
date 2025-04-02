import { useState, useEffect, useContext, useCallback } from "react"
import { MdDelete } from "react-icons/md"
import { FaMinus, FaPlus, FaShoppingBag } from "react-icons/fa"
import Context from "../context"
import SummaryApi from "../common"
import displayUSDCurrency from "../helpers/displayCurrency"

const CartDropdown = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const { fetchAccountAddToCartProduct } = useContext(Context)
  const loadingCart = new Array(3).fill(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(SummaryApi.addToCartView.url, {
        method: SummaryApi.addToCartView.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      })

      const responseData = await response.json()

      if (responseData.success) {
        setData(responseData.data)
      }
    } catch (error) {
      console.error("Error fetching cart data:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return

    try {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: newQuantity,
        }),
      })

      const responseData = await response.json()

      if (responseData.success) {
        fetchData()
      }
    } catch (error) {
      console.error("Error updating quantity:", error)
    }
  }

  const deleteCartProduct = async (id) => {
    try {
      const response = await fetch(SummaryApi.deleteCartProduct.url, {
        method: SummaryApi.deleteCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
        }),
      })

      const responseData = await response.json()

      if (responseData.success) {
        fetchData()
        fetchAccountAddToCartProduct()
      }
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  const totalQty = data.reduce((prev, curr) => prev + curr.quantity, 0)
  const totalPrice = data.reduce((prev, curr) => {
    if (curr?.productId?.price) {
      return prev + curr.quantity * curr.productId.price
    }
    return prev
  }, 0)

  return (
    <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-lg shadow-lg z-50 border border-gray-200 overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">Your Cart</h3>
          <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {totalQty} items
          </span>
        </div>

        {loading ? (
          <div className="space-y-4">
            {loadingCart.map((_, index) => (
              <div key={index} className="flex items-center space-x-4 animate-pulse">
                <div className="w-16 h-16 bg-gray-200 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {data.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8">
                <FaShoppingBag className="text-gray-300 text-5xl mb-4" />
                <p className="text-gray-500 text-center">Your cart is empty</p>
              </div>
            ) : (
              <div className="max-h-96 overflow-y-auto pr-1">
                {data.map((product) => (
                  <div
                    key={product?._id}
                    className="flex items-start space-x-4 p-3 mb-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-16 h-16 bg-white rounded-md overflow-hidden flex items-center justify-center p-1">
                      <img
                        src={product?.productId?.productImage?.[0] || "/placeholder.svg"}
                        alt={product?.productId?.productName}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">
                        {product?.productId?.productName}
                      </h4>
                      <p className="text-xs text-gray-500 capitalize mb-1">{product?.productId?.category}</p>
                      <p className="text-sm font-bold text-gray-900">{displayUSDCurrency(product?.productId?.price)}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2">
                          <button
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                            onClick={() => updateQuantity(product?._id, product?.quantity - 1)}
                            disabled={product?.quantity <= 1}
                          >
                            <FaMinus className="text-xs" />
                          </button>
                          <span className="text-sm font-medium w-6 text-center">{product?.quantity}</span>
                          <button
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                            onClick={() => updateQuantity(product?._id, product?.quantity + 1)}
                          >
                            <FaPlus className="text-xs" />
                          </button>
                        </div>
                        <button
                          className="text-red-500 hover:text-red-700 transition-colors"
                          onClick={() => deleteCartProduct(product?._id)}
                        >
                          <MdDelete className="text-lg" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {data.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="text-sm font-medium text-gray-900">{displayUSDCurrency(totalPrice)}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-sm text-gray-600">Items</span>
                  <span className="text-sm font-medium text-gray-900">{totalQty}</span>
                </div>
                <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-colors duration-300 flex items-center justify-center">
                  Checkout
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default CartDropdown

