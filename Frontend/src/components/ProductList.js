import React, { useEffect, useRef, useState } from 'react';
import SummaryApi from '../common';
import { Link } from 'react-router-dom';

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

  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    setError(null); // Reinicia el estado de error
    try {
      const response = await fetch(SummaryApi.productCategory.url);
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
      const dataResponse = await response.json();
      setCategoryProduct(dataResponse.data || []); // Asegúrate de que sea un arreglo
    } catch (error) {
      setError(error.message); // Maneja el error
      setCategoryProduct([]); // Asegúrate de que categoryProduct sea un arreglo vacío
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

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
        className="flex items-center justify-between bg-[#F6F6F6] h-16 overflow-scroll scrollbar-none"
      >
        {loading ? (
          <p>Cargando...</p> // Muestra un mensaje de carga
        ) : error ? (
          <p>Error: {error}</p> // Muestra un mensaje de error
        ) : (
          categoryProduct.map((product, index) => (
            <Link
            to={"/product-category?category="+product?.category} className='cursor-pointer' key={product?.category}
            >
              <p className="text-sm text-gray-600 font-semibold capitalize m-6">
                {product?.category}
              </p>
            </Link>
          ))
        )}
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
  );
};

export default ProductList;