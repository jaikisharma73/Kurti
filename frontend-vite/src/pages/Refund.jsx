import React from 'react'

const Refund = () => {
  return (
    <div className='py-10 flex flex-col gap-5 max-w-4xl mx-auto min-h-[60vh]'>
        <div className='text-2xl text-center pt-8 border-t'>
            <h2 className='font-medium text-gray-800'>Refund Policy</h2>
        </div>
        <div className='text-gray-600 px-4 mt-6'>
            <p className='mb-4'>Our goal is to ensure your complete satisfaction. Please read our refund policy below.</p>
            <h3 className='font-bold text-gray-800 mb-2'>Refund Eligibility</h3>
            <p className='mb-4'>To be eligible for a refund, you must return the item within the specified 7-day period. The item must be unused, unwashed, and in its original packaging with all tags attached.</p>
            <h3 className='font-bold text-gray-800 mb-2'>Processing Refunds</h3>
            <p className='mb-4'>Once your return is received and inspected, we will send you an email to notify you that we have received your returned item, as well as the approval or rejection of your refund. If approved, your refund will be processed and a credit will automatically be applied to your original method of payment within 5-7 business days.</p>
            <h3 className='font-bold text-gray-800 mb-2'>Non-Refundable Items</h3>
            <p className='mb-4'>Gift cards, promotional/sale items, and intimates/swimwear are not eligible for refunds.</p>
        </div>
    </div>
  )
}

export default Refund
