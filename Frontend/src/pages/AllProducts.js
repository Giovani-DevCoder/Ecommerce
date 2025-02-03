import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

const AllProducts = () => {
  const [openUploadProduct,setOpenUploadProduct] = useState(false)
  const [allProduct,setAllProduct] = useState([])

  const fetchAllProduct = async() => {
      const response = await fetch(SummaryApi.allProduct.url)
      const dataResponse = await response.json()

      console.log("product name",dataResponse)

      setAllProduct(dataResponse?.data || [])
  }

  useEffect(()=>{
    fetchAllProduct()
  },[])
  return (
    <div className='min-h-[calc(98vh-100px)] md:flex hidden bg-slate-200 max-w-7xl'>
        <div className='bg-white py-10 px-9 flex flex-col items-center'>
            <h2 className='font-bold text-lg'>All products</h2>
            <button className='rounded-full py-2 px-7 bg-blue-500 hover:bg-blue-600' 
            onClick={() =>setOpenUploadProduct(true)} >Upload product</button>
        </div>

        {/** upload product */}
        {
          openUploadProduct && (
            <UploadProduct onClose={() =>setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>
          )
        }

        {/** all product */}

        <div className="flex items-center gap-4 p-5 py-4 h-full w-full grid grid-cols-2 overflow-auto max-h-[750px]">
          {allProduct.map((product, index) => (
            <AdminProductCard
              data={product}
              key={index + "allProduct"}
              fetchdata={fetchAllProduct}
            />
          ))}
        </div>    
    </div>
  )
}

export default AllProducts