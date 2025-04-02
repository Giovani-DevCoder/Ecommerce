import { useCallback, useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FaStar, FaStarHalf, FaShoppingCart } from "react-icons/fa"
import SummaryApi from "../common"
import displayUSDCurrency from "../helpers/displayCurrency"
import SmartProductCategoryDisplay from "../components/SmartProductCategoryDisplay"
import addToCart from "../helpers/addToCart"
import Context from "../context"

const Details = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  })
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const productImageListLoading = new Array(4).fill(null)
  const [activeImage, setActiveImage] = useState("")

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  })
  const [zoomImage, setZoomImage] = useState(false)

  const { fetchUserAddToCart } = useContext(Context)
  const navigate = useNavigate()

  const fetchDetails = useCallback(async () => {
    setLoading(true)
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    })
    setLoading(false)
    const dataResponse = await response.json()

    setData(dataResponse?.data)
    setActiveImage(dataResponse?.data?.productImage[0])
  }, [params])

  useEffect(() => {
    fetchDetails()
  }, [fetchDetails])

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL)
  }

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true)
    const { left, top, width, height } = e.target.getBoundingClientRect()

    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setZoomImageCoordinate({
      x,
      y,
    })
  }, [])

  const handleLeaveImageZoom = () => {
    setZoomImage(false)
  }

  const handleAddToCart = async (e, id) => {
    e.preventDefault()
    await addToCart(e, id)
    fetchUserAddToCart()
  }

  const handleBuyProduct = async (e, id) => {
    e.preventDefault()
    await addToCart(e, id)
    fetchUserAddToCart()
    navigate("/cart")
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Image */}
        <div className="lg:w-1/2">
          <div className="relative overflow-hidden rounded-lg bg-gray-100 mb-4">
            <img
              src={activeImage || "/placeholder.svg"}
              alt={data.productName}
              className="w-full h-[400px] object-contain"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
            />
            {zoomImage && (
              <div className="hidden lg:block absolute inset-0 pointer-events-none">
                <div
                  className="w-full h-full scale-150"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`,
                  }}
                ></div>
              </div>
            )}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {loading
              ? productImageListLoading.map((_, index) => (
                  <div key={index} className="w-20 h-20 bg-gray-200 rounded-md animate-pulse"></div>
                ))
              : data?.productImage?.map((imgURL, index) => (
                  <div
                    key={index}
                    className={`w-20 h-20 bg-gray-100 rounded-md cursor-pointer ${
                      activeImage === imgURL ? "ring-2 ring-blue-500" : ""
                    }`}
                    onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                    onClick={() => handleMouseEnterProduct(imgURL)}
                  >
                    <img
                      src={imgURL || "/placeholder.svg"}
                      alt={`Product view ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2">
          {loading ? (
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded-full w-1/4 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded-full w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded-full w-1/2 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded-full w-1/3 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded-full w-1/2 animate-pulse"></div>
              <div className="flex gap-4">
                <div className="h-12 bg-gray-200 rounded-full w-1/3 animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded-full w-1/3 animate-pulse"></div>
              </div>
              <div className="h-40 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          ) : (
            <>
              <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full mb-2">
                {data?.brandName}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{data?.productName}</h1>
              <p className="text-lg text-gray-600 mb-4 capitalize">{data?.category}</p>
              <div className="flex items-center mb-4">
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStarHalf className="text-yellow-400" />
                <span className="ml-2 text-gray-600">(4.5)</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-6">{displayUSDCurrency(data.price)}</p>
              <div className="flex gap-4 mb-8">
                <button
                  className="flex-1 px-6 py-3 text-sm font-medium text-gray-900 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  onClick={(e) => handleBuyProduct(e, data?._id)}
                >
                  Buy Now
                </button>
                <button
                  className="flex-1 px-6 py-3 text-sm font-medium text-white bg-zinc-900 rounded-full hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={(e) => handleAddToCart(e, data?._id)}
                >
                  <FaShoppingCart className="inline-block mr-2" />
                  Add to Cart
                </button>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Description</h2>
                <p className="text-gray-600">{data?.description}</p>
              </div>
            </>
          )}
        </div>
      </div>

      {data.category && (
        <div className="mt-16">
          <SmartProductCategoryDisplay category={data?.category} heading="Recommended Products" />
        </div>
      )}
    </div>
  )
}

export default Details
