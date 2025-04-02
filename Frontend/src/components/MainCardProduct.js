import { useContext, useEffect, useState, useCallback, useRef } from "react"
import { Link } from "react-router-dom"
import Context from "../context"
import fetchSmartProductCategory from "../helpers/fetchSmartProductCategory"
import displayUSDCurrency from "../helpers/displayCurrency"
import addToCart from "../helpers/addToCart"
import { FaStar, FaShoppingCart, FaAngleLeft, FaAngleRight } from "react-icons/fa"

const MainCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const loadingList = new Array(13).fill(null)

  const scrollContainerRef = useRef(null)

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

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  return (
    <div className="container mx-auto px-4 my-16 relative bg-[#f6f6f6]">
      <h2 className="text-4xl font-bold p-8 text-gray-800">{heading}</h2>

      <div className="relative">
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 text-xl text-gray-600 hover:text-gray-800 transition-colors z-10 hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>

        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 text-xl text-gray-600 hover:text-gray-800 transition-colors z-10 hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth transition-all pb-4"
        >
          {loading
            ? loadingList.map((_, index) => (
                <div key={index} className="min-w-[300px]] bg-white rounded-xl shadow-lg flex flex-col animate-pulse">
                  <div className="h-80 bg-gray-200 rounded-t-xl"></div>
                  <div className="p-6 flex-grow">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))
            : data.map((product) => (
              <Link
              key={product._id}
              to={`product/${product._id}`}
              className="min-w-[400px] bg-white rounded-xl shadow-lg flex flex-col transition-transform duration-300 overflow-hidden hover:shadow-xl"
            >
              <div className="h-80 overflow-hidden">
                <img
                  src={product.productImage[0] || "/placeholder.svg"}
                  alt={product.productName}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-2xl text-gray-800 mb-2 truncate">{product.productName}</h3>
                  <p className="text-lg text-gray-600 mb-4 capitalize">{product.category}</p>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 mr-1" />
                    ))}
                    <span className="text-gray-600 ml-2">(4.5)</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-3xl font-bold text-gray-800">{displayUSDCurrency(product.price)}</p>
                    <button
                      className="bg-zinc-900 hover:bg-zinc-700 text-white font-medium py-3 px-6 rounded-full transition-colors duration-300 flex items-center justify-center text-lg whitespace-nowrap"
                      onClick={(e) => handleAddToCart(e, product._id)}
                    >
                      <FaShoppingCart className="mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </Link>
              ))}
        </div>
      </div>
    </div>
  )
}

export default MainCardProduct

