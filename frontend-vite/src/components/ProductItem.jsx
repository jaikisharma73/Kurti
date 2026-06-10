import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price, sizes }) => {

  const { currency } = useContext(ShopContext);

  let displayPrice = price;
  let hasSizePricing = false;
  if (sizes && sizes.length > 0 && typeof sizes[0] === 'object' && sizes[0].size) {
    const prices = sizes.map(s => s.price);
    displayPrice = Math.min(...prices);
    hasSizePricing = true;
  }

  return (
    <Link onClick={() => scrollTo(0, 0)} className='text-gray-700 cursor-pointer flex flex-col h-full' to={`/product/${id}`}>
      <div className='overflow-hidden aspect-[3/4] bg-white shrink-0'>
        <img className='w-full h-full object-cover hover:scale-110 transition ease-in-out' src={image[0]} alt="" />
      </div>
      <div className="flex flex-col flex-grow mt-3">
        <p className='pb-1 text-xs text-gray-500 line-clamp-2'>{name}</p>
        <p className='text-xs font-medium mt-auto'>
          {currency}{displayPrice}
          {hasSizePricing && <span className='text-[10px] text-gray-400 ml-1'>onwards</span>}
        </p>
      </div>
    </Link>
  )
}

export default ProductItem
