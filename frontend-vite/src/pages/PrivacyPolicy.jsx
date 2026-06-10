import React from 'react'

const PrivacyPolicy = () => {
  return (
    <div className='py-10 flex flex-col gap-5 max-w-4xl mx-auto min-h-[60vh]'>
        <div className='text-2xl text-center pt-8 border-t'>
            <h2 className='font-medium text-gray-800'>Privacy Policy</h2>
        </div>
        <div className='text-gray-600 px-4 mt-6'>
            <p className='mb-4'>Your privacy is important to us. It is ZorryFash's policy to respect your privacy regarding any information we may collect from you across our website.</p>
            <h3 className='font-bold text-gray-800 mb-2'>Information We Collect</h3>
            <p className='mb-4'>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.</p>
            <h3 className='font-bold text-gray-800 mb-2'>Use of Information</h3>
            <p className='mb-4'>The information we collect is used solely to fulfill your orders, process payments, and improve your shopping experience. We never share your data with unauthorized third parties.</p>
            <h3 className='font-bold text-gray-800 mb-2'>Data Retention</h3>
            <p className='mb-4'>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we'll protect within commercially acceptable means to prevent loss and theft.</p>
        </div>
    </div>
  )
}

export default PrivacyPolicy
