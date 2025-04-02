import React from 'react'
import shoppingBanner from '../assets/Banner/shoppingBanner.jpg'

const Banner = () => {
  return (
    <div className='h-80 w-full bg-zinc-800 overflow-hidden'>
      <div className='h-full w-full'>
        <img
          src={shoppingBanner}
          alt="Banner"
          className='w-full h-full object-cover'
        />
      </div>
    </div>
  );
};

export default Banner;