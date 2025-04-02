import { useContext, useEffect, useRef, useState } from "react"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"
import { Link } from "react-router-dom"
import Context from "../context"
import fetchSmartProductCategory from "../helpers/fetchSmartProductCategory"
import displayUSDCurrency from "../helpers/displayCurrency"
import addToCart from "../helpers/addToCart"

const CardProduct = ({ category, heading }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const loadingList = new Array(6).fill(null)

  const scrollElement = useRef(null)

  const { fetchAccountAddToCartProduct } = useContext(Context)

  const handleAddToCart = async (e, id) => {
    e.preventDefault()
    await addToCart(e, id)
    fetchAccountAddToCartProduct()
  }

  const fetchData = async () => {
    setLoading(true)
    const categoryProduct = await fetchSmartProductCategory(category)
    setLoading(false)
    setData(categoryProduct?.data)
  }

  useEffect(() => {
    fetchData()
  }, [category])

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300
  }
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300
  }

  return (
    <div className="container mx-auto px-4 my-12 relative bg-[#f6f6f6]">
      <h2 className="text-3xl font-bold p-8 text-gray-800">{heading}</h2>

      <div className="relative">
        {/** <button
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
        </button> */}

        <div
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth transition-all pb-4"
          ref={scrollElement}
        >
          {loading
            ? loadingList.map((_, index) => (
                <div key={index} className="w-72 bg-white rounded-lg shadow-md flex flex-col animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                  <div className="p-4 flex-grow">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))
            : data.map((product) => (
                <Link
                  key={product._id}
                  to={`product/${product._id}`}
                  className="w-80 bg-white rounded-lg shadow-md flex flex-col transition-transform duration-300"
                >
                  <div className="h-48 bg-gray-100 rounded-t-xl flex items-center justify-center overflow-hidden">
                    <img
                      src={product.productImage[0] || "/placeholder.svg"}
                      alt={product.productName}
                      className="object-cover h-full w-full"
                    />
                  </div>
                  <div className="p-4 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800 mb-1 line-clamp-1">{product.productName}</h3>
                      <p className="text-sm text-gray-600 mb-2 capitalize">{product.category}</p>
                      <p className="text-lg font-bold text-gray-800">{displayUSDCurrency(product.price)}</p>
                    </div>
                    <button
                      className="mt-4 w-full bg-zinc-900 hover:bg-zinc-700 text-white font-medium py-2 px-4 rounded-full transition-colors duration-300"
                      onClick={(e) => handleAddToCart(e, product._id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </div>
  )
}

export default CardProduct

