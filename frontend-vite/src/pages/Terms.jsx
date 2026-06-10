import React from 'react'

const Terms = () => {
  return (
    <div className='py-10 flex flex-col gap-5 max-w-4xl mx-auto min-h-[60vh]'>
        <div className='text-2xl text-center pt-8 border-t'>
            <h2 className='font-medium text-gray-800'>Terms of Service</h2>
        </div>
        <div className='text-gray-600 px-4 mt-6'>
            <p className='mb-4'>Welcome to ZorryFash. By accessing or using our website, you agree to be bound by these Terms of Service.</p>
            <h3 className='font-bold text-gray-800 mb-2'>Conditions of Use</h3>
            <p className='mb-4'>We provide services subject to the conditions stated in this document. Every time you visit this website, use its services, or make a purchase, you accept these conditions.</p>
            <h3 className='font-bold text-gray-800 mb-2'>License and Site Access</h3>
            <p className='mb-4'>We grant you a limited, non-exclusive, non-transferable license to access and make personal use of this site. This license does not include any resale or commercial use of this site or its contents.</p>
            <h3 className='font-bold text-gray-800 mb-2'>Product Descriptions</h3>
            <p className='mb-4'>We attempt to be as accurate as possible. However, we do not warrant that product descriptions or other content of this site is accurate, complete, reliable, current, or error-free.</p>
        </div>
    </div>
  )
}

export default Terms
