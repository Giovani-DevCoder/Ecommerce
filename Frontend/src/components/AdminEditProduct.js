import React, { useEffect, useState } from 'react';
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import { Input } from "./ui/input"; // Ruta relativa
import { Label } from "./ui/label"; // Ruta relativa
import { Button } from "./ui/button"; // Ruta relativa
import { Textarea } from "./ui/textarea"; // Ruta relativa
import SummaryApi from '../common';
import { toast } from 'sonner'

const AdminEditProduct = ({ onClose, productData  }) => {

  const [data, setData, fetchdata] = useState({
    ...productData,
    productName: productData?.productName,
    brandName: productData?.brandName,
    category: productData?.category,
    productImage: productData?.productImage || [],
    description: productData?.description,
    price: productData?.price
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");


  
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  useEffect(() => {
  }, [data]);
  
  

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);

    setData((prev) => ({
      ...prev,
      productImage: [...prev.productImage, uploadImageCloudinary.url]
    }));
  };

  const handleDeleteProductImage = (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((prev) => ({
      ...prev,
      productImage: [...newProductImage]
    }));
  };

  const handleSubmit = async(e) => {
    const response = await fetch(SummaryApi.updateProduct.url,{
      method : SummaryApi.updateProduct.method,
      credentials : 'include',
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify(data)
    })
    const responseData = await response.json()

    if (responseData.success){
            toast.success(responseData.message)
            onClose()
            fetchdata()
            console.log("response data",responseData)
          } else {
            toast.warning(responseData.message)
          }
}
  return (
    <div className="fixed w-full h-full bg-black/30 backdrop-blur-sm top-0 left-0 right-0 bottom-0 flex justify-center items-center animate-fadeIn">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl h-full max-h-[90%] overflow-hidden">
        <div className="flex justify-between items-center pb-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">Edit Product</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <CgClose className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-8rem)] px-1">
          <form className="space-y-6 py-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="productName">Product name</Label>
              <Input
                id="productName"
                type="text"
                placeholder="Enter product name"
                name="productName"
                value={data.productName || ""}
                onChange={handleOnChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brandName">Brand name</Label>
              <Input
                type="text"
                id="brandName"
                placeholder="Enter brand name"
                name="brandName"
                value={data.brandName || ""}
                onChange={handleOnChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select required value={data.category} name='category' onChange={handleOnChange} className='px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
                  <option value={""}>Select Category</option>
                  {
                    productCategory.map((el,index)=>{
                      return(
                        <option value={el.value} key={el.value+index}>{el.label}</option>
                      )
                    })
                  }
              </select>
            </div>

            <div className="space-y-2">
              <Label>Product images</Label>
              <label htmlFor="uploadImagenInput" className="block">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 transition-colors hover:border-primary cursor-pointer bg-gray-50/50 hover:bg-gray-50">
                  <div className="flex flex-col items-center gap-2 text-gray-500">
                    <FaCloudUploadAlt className="w-12 h-12" />
                    <p className="text-sm font-medium">Upload product images</p>
                    <p className="text-xs text-gray-400">Click or drag and drop</p>
                  </div>
                  <input
                    type="file"
                    id="uploadImagenInput"
                    className="hidden"
                    onChange={handleUploadProduct}
                  />
                </div>
              </label>

              {data?.productImage[0] ? (
                <div className="grid grid-cols-4 gap-4 mt-4">
                  {data.productImage.map((el, index) => (
                    <div key={index} className="relative group aspect-square">
                      <img
                        src={el}
                        alt={`Product ${index + 1}`}
                        className="w-full h-full object-cover rounded-md cursor-pointer transition-opacity hover:opacity-80"
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(el);
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteProductImage(index)}
                        className="absolute top-2 right-2 p-1.5 custom-btn group-hover-btn"
                      >
                        <MdDelete className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-red-500 text-sm mt-2">
                  *Please upload at least one product image
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                type="number"
                id="price"
                placeholder="Enter product price"
                name="price"
                value={data.price}
                onChange={handleOnChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter product description"
                name="description"
                value={data.description}
                onChange={handleOnChange}
                className="h-32"
              />
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white">
              Update Product
            </Button>
          </form>
        </div>
      </div>

      {/* Display image full screen */}
      {openFullScreenImage && (
        <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
      )}
    </div>
  )
}

export default AdminEditProduct