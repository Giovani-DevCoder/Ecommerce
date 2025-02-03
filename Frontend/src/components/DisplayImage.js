import React from 'react'
import { CgClose } from 'react-icons/cg'

const DisplayImage = ({
    imgUrl,
    onClose
}) => {
  return (
    <div className='fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center bg-gray-800'>
            <div className=''>
                <div className='w-fit ml-auto text-2xl cursor-pointer rounded-full bg-gray-100 hover:bg-gray-200 p-1' onClick={onClose}>
                    <CgClose/>
                </div>
                <div className='flex justify-center p-4 max-w-[80vh] max-h-[80vh]'>
                    <img src={imgUrl} className='w-full h-full'></img>
                </div>
            </div>
    </div>
  )
}

export default DisplayImage