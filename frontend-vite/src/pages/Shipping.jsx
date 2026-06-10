import React from 'react'

const Shipping = () => {
  return (
    <div className='py-10 flex flex-col gap-5 max-w-4xl mx-auto min-h-[60vh]'>
        <div className='text-2xl text-center pt-8 border-t'>
            <h2 className='font-medium text-gray-800'>Shipping Information</h2>
        </div>
        <div className='text-gray-600 px-4 mt-6'>
            <p className='mb-4'>Welcome to our Shipping Information page. We strive to process and ship your orders as quickly as possible.</p>
            <h3 className='font-bold text-gray-800 mb-2'>Domestic Shipping</h3>
            <p className='mb-4'>All domestic orders are processed within 1-2 business days. Standard shipping typically takes 3-5 business days to arrive.</p>
            <h3 className='font-bold text-gray-800 mb-2'>International Shipping</h3>
            <p className='mb-4'>We offer international shipping to select countries. Delivery times vary between 7-14 business days depending on the destination customs procedures.</p>
            <h3 className='font-bold text-gray-800 mb-2'>Order Tracking</h3>
            <p className='mb-4'>Once your order has shipped, you will receive an email confirmation with tracking information.</p>
        </div>
    </div>
  )
}

export default Shipping
