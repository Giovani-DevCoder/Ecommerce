import React, {useEffect, useRef, useState} from 'react'
import SummaryApi from '../common'
import { Link } from 'react-router-dom'

const ProductList = () => {
  const scrollRef = useRef(null);
  const [showButtons, setShowButtons] = useState(false);

  const checkOverflow = () => {
    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current;
      setShowButtons(scrollWidth > clientWidth);
    }
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  useEffect(() => {
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

    const [categoryProduct,setCategoryProduct] = useState([])
    const [loading,setLoading] = useState(false)

    const fetchCategoryProduct = async() => {
        setLoading(true)
        const response = await fetch(SummaryApi.productCategory.url)
        const dataResponse = await response.json()
        setLoading(false)
        setCategoryProduct(dataResponse.data)
    }

    useEffect(()=>{
        fetchCategoryProduct()
    },[])

  return (
    <div className="relative">
      {showButtons && (
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded"
          onClick={scrollLeft}
        >
          &#8592;
        </button>
      )}
      <div
        ref={scrollRef}
        className="flex items-center justify-between bg-white h-16 overflow-scroll scrollbar-none"
      >
        {categoryProduct.map((product, index) => (
          <Link
            key={index}
            to={`/product-category/${product?.category}`}
            className="cursor-pointer mx-9 hover:underline"
          >
            <p className="text-sm text-gray-600 font-semibold capitalize">
              {product?.category}
            </p>
          </Link>
        ))}
      </div>
      {showButtons && (
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded"
          onClick={scrollRight}
        >
          &#8594;
        </button>
      )}
    </div>
  )
}

export default ProductList