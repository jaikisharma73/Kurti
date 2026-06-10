import React from 'react'

const Returns = () => {
  return (
    <div className='py-10 flex flex-col gap-5 max-w-4xl mx-auto min-h-[60vh]'>
        <div className='text-2xl text-center pt-8 border-t'>
            <h2 className='font-medium text-gray-800'>Returns & Exchanges</h2>
        </div>
        <div className='text-gray-600 px-4 mt-6'>
            <p className='mb-4'>We want you to be completely satisfied with your purchase. If you are not entirely happy, we're here to help.</p>
            <h3 className='font-bold text-gray-800 mb-2'>Returns</h3>
            <p className='mb-4'>You have 7 days to return an item from the date you received it. To be eligible for a return, your item must be unused, in its original packaging, and in the same condition that you received it.</p>
            <h3 className='font-bold text-gray-800 mb-2'>Exchanges</h3>
            <p className='mb-4'>If you need to exchange an item for a different size or color, please initiate a return for the original item and place a new order.</p>
            <h3 className='font-bold text-gray-800 mb-2'>Process</h3>
            <p className='mb-4'>Please contact our support team to initiate the return process and receive your return shipping label.</p>
        </div>
    </div>
  )
}

export default Returns
