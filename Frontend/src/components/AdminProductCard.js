import React, { useState } from 'react';
import { MdModeEditOutline } from 'react-icons/md';
import AdminEditProduct from './AdminEditProduct';

const ProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);

  return (
    <div className="p-6 border rounded-lg shadow-md flex flex-col bg-white space-y-4">

      <div className="flex justify-between items-start">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <img
              src={data?.productImage[0]}
              alt={data?.productName || 'Producto'}
              className="w-40 h-40 object-cover rounded-md border border-gray-200"
            />
          </div>

          <div className="flex flex-col space-y-1 flex-grow">
            <h1 className="text-base font-semibold text-gray-800 truncate max-w-[200px]">
              {data?.productName || 'Nombre del Producto'}
            </h1>
            <div className="text-sm text-gray-600">${data?.price?.toFixed(2) || '0.00'}</div>
            <div className="text-sm text-gray-600 line-clamp-4">
              {data?.description || 'descripcion'}
            </div>
          </div>
        </div>
        <button
          type="button"
          className="flex flex-shrink-0 items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          onClick={() => setEditProduct(true)}
          aria-label="Editar producto"
        >
          <MdModeEditOutline className="w-5 h-5 text-gray-600" />
        </button>
      </div>


      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchdata={fetchdata}
        />
      )}
    </div>
  );
};

export default ProductCard;
