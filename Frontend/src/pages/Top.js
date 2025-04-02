import React from 'react'

const Top = () => {
  return (
    <div className='bg-zinc-800 text-zinc-100 text-sm p-2 font-medium'>
      <div className='flex flex-col md:flex-row items-center justify-between container mx-auto px-4'>
        <p className='text-xs md:text-sm text-center md:text-left mb-2 md:mb-0'>
          Welcome - Sign Up Now & Get 25% off
        </p>
        <p className='text-xs md:text-sm text-center md:text-right'>
          Exhibition website created by Sky
        </p>
      </div>
    </div>
  );
}

export default Top