import React, { useContext, useState } from 'react'
import displayUSDCurrency from '../helpers/displayCurrency'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import { Link } from 'react-router-dom'
import { FaShoppingCart } from "react-icons/fa"
import scrollTop from '../helpers/scrollTop'

const SearchResults = ({loading, data = []}) => {
  const loadingList = new Array(4).fill(null)

  const { fetchAccountAddToCartProduct } = useContext(Context)
  
  const handleAddToCart = async (e, id) => {
    e.preventDefault()
    await addToCart(e, id)
    fetchAccountAddToCartProduct()
  }
  return (
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
                    <div className="h-80 overflow-hidden">
                      <img
                        src={product.productImage[0] || "/placeholder.svg"}
                        alt={product.productName}
                        className="object-cover w-full h-full"
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
  )
}

export default SearchResults