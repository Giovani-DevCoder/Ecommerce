import { useContext, useEffect, useState, useCallback } from "react"
import { Link } from "react-router-dom"
import { FaShoppingCart } from "react-icons/fa"
import fetchSmartProductCategory from "../helpers/fetchSmartProductCategory"
import displayUSDCurrency from "../helpers/displayCurrency"
import addToCart from "../helpers/addToCart"
import Context from "../context"
import scrollTop from "../helpers/scrollTop"

const SmartProductCategoryDisplay = ({ category, heading }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const loadingList = new Array(4).fill(null)

  const { fetchAccountAddToCartProduct } = useContext(Context)

  const handleAddToCart = async (e, id) => {
    e.preventDefault()
    await addToCart(e, id)
    fetchAccountAddToCartProduct()
  }

  const fetchData = useCallback(async () => {
    setLoading(true)
    const categoryProduct = await fetchSmartProductCategory(category)
    setLoading(false)
    setData(categoryProduct?.data)
  }, [category])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className="container mx-auto px-4 my-12">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">{heading}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? loadingList.map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))
          : data.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="bg-white rounded-xl shadow-md overflow-hidden"
                onClick={scrollTop}
              >
                <div className="h-52 overflow-hidden">
                  <img
                    src={product.productImage[0] || "/placeholder.svg"}
                    alt={product.productName}
                    className="object-cover h-full w-full"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">{product.productName}</h3>
                  <p className="text-sm text-gray-600 capitalize">{product.category}</p>
                  <p className="text-lg font-bold text-gray-900">{displayUSDCurrency(product.price)}</p>
                  <button
                    className="w-full bg-zinc-900 hover:bg-zinc-700 text-white font-medium py-2 px-4 rounded-full transition-colors duration-300 flex items-center justify-center"
                    onClick={(e) => handleAddToCart(e, product._id)}
                  >
                    <FaShoppingCart className="mr-2" />
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
      </div>
    </div>
  )
}

export default SmartProductCategoryDisplay
