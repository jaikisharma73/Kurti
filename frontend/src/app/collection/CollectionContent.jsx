"use client";

import React, { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ShopContext } from '@/context/ShopContext'
import { assets } from '@/assets/assets';
import Title from '@/components/Title';
import ProductItem from '@/components/ProductItem';

const CollectionContent = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const searchParams = useSearchParams();
  const [showFilter, setShowFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent')
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Handle URL query parameters (e.g. ?category=Men)
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setCategory([cat]);
    }
  }, [searchParams]);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    if (minPrice || maxPrice) {
      productsCopy = productsCopy.filter(item => {
        let itemPrice = item.price;
        if (item.sizes && item.sizes.length > 0 && typeof item.sizes[0] === 'object' && item.sizes[0].size) {
          itemPrice = Math.min(...item.sizes.map(s => s.price));
        }
        if (minPrice && itemPrice < Number(minPrice)) return false;
        if (maxPrice && itemPrice > Number(maxPrice)) return false;
        return true;
      });
    }

    setFilterProducts(productsCopy)
  }

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products, minPrice, maxPrice])

  useEffect(() => {
    sortProduct();
  }, [sortType])

  useEffect(() => {
    if (filterProducts.length > 0) {
      const scrollToTop = () => {
        if (typeof window !== 'undefined') {
          window.scrollTo(0, 0);
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        }
      };
      scrollToTop();
      setTimeout(scrollToTop, 10);
    }
  }, [filterProducts]);

  return (
    <div className='flex flex-col gap-6 pt-10 border-t'>
      
      {/* Top Header Section */}
      <div className='flex justify-between items-center pb-4 border-b border-gray-100'>
        <div className='text-xl sm:text-2xl font-medium'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
        </div>
        
        <div className='flex items-center gap-3'>
          {/* Toggle Filters Button */}
          <button 
            onClick={() => setShowFilter(!showFilter)} 
            className='flex items-center gap-2 px-3 py-1.5 border border-gray-300 text-sm font-medium hover:bg-gray-50 transition-all rounded-sm cursor-pointer'
          >
            <span>FILTERS</span>
            <img className={`h-2.5 transition-transform duration-200 ${showFilter ? 'rotate-180' : ''}`} src={assets.dropdown_icon.src || assets.dropdown_icon} alt="" />
          </button>

          <select 
            onChange={(e) => setSortType(e.target.value)} 
            className='border border-gray-300 text-sm px-3 py-1.5 bg-white outline-none cursor-pointer rounded-sm hover:border-gray-400 transition-colors'
          >
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Price: Low to High</option>
            <option value="high-low">Sort by: Price: High to Low</option>
          </select>
        </div>
      </div>
      
      {/* Top Filters Panel */}
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${showFilter ? 'max-h-[800px] opacity-100 mb-4' : 'max-h-0 opacity-0 pointer-events-none'}`}>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-5 rounded border border-gray-200'>
          
          {/* Categories */}
          <div className='border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-6'>
            <p className='mb-3 text-xs font-semibold text-gray-900 uppercase tracking-wider'>Categories</p>
            <div className='flex flex-row md:flex-col flex-wrap gap-4 md:gap-2 text-sm font-light text-gray-700'>
              <label className='flex items-center gap-2 cursor-pointer hover:text-black transition-colors'>
                <input className='w-4 h-4 cursor-pointer accent-black' type="checkbox" value={'Men'} checked={category.includes('Men')} onChange={toggleCategory} /> 
                <span>Men</span>
              </label>
              <label className='flex items-center gap-2 cursor-pointer hover:text-black transition-colors'>
                <input className='w-4 h-4 cursor-pointer accent-black' type="checkbox" value={'Women'} checked={category.includes('Women')} onChange={toggleCategory} /> 
                <span>Women</span>
              </label>
              <label className='flex items-center gap-2 cursor-pointer hover:text-black transition-colors'>
                <input className='w-4 h-4 cursor-pointer accent-black' type="checkbox" value={'Kids'} checked={category.includes('Kids')} onChange={toggleCategory} /> 
                <span>Kids</span>
              </label>
            </div>
          </div>
          
          {/* Type */}
          <div className='border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-6'>
            <p className='mb-3 text-xs font-semibold text-gray-900 uppercase tracking-wider'>Product Type</p>
            <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 gap-2 text-sm font-light text-gray-700'>
              <label className='flex items-center gap-2 cursor-pointer hover:text-black transition-colors'>
                <input className='w-4 h-4 cursor-pointer accent-black' type="checkbox" value={'Topwear'} checked={subCategory.includes('Topwear')} onChange={toggleSubCategory} /> 
                <span>Topwear</span>
              </label>
              <label className='flex items-center gap-2 cursor-pointer hover:text-black transition-colors'>
                <input className='w-4 h-4 cursor-pointer accent-black' type="checkbox" value={'Bottomwear'} checked={subCategory.includes('Bottomwear')} onChange={toggleSubCategory} /> 
                <span>Bottomwear</span>
              </label>
              <label className='flex items-center gap-2 cursor-pointer hover:text-black transition-colors'>
                <input className='w-4 h-4 cursor-pointer accent-black' type="checkbox" value={'Winterwear'} checked={subCategory.includes('Winterwear')} onChange={toggleSubCategory} /> 
                <span>Winterwear</span>
              </label>
              <label className='flex items-center gap-2 cursor-pointer hover:text-black transition-colors'>
                <input className='w-4 h-4 cursor-pointer accent-black' type="checkbox" value={'Jeans'} checked={subCategory.includes('Jeans')} onChange={toggleSubCategory} /> 
                <span>Jeans</span>
              </label>
              <label className='flex items-center gap-2 cursor-pointer hover:text-black transition-colors'>
                <input className='w-4 h-4 cursor-pointer accent-black' type="checkbox" value={'Tshirt'} checked={subCategory.includes('Tshirt')} onChange={toggleSubCategory} /> 
                <span>T-Shirt</span>
              </label>
              <label className='flex items-center gap-2 cursor-pointer hover:text-black transition-colors'>
                <input className='w-4 h-4 cursor-pointer accent-black' type="checkbox" value={'Shirt'} checked={subCategory.includes('Shirt')} onChange={toggleSubCategory} /> 
                <span>Shirt</span>
              </label>
              <label className='flex items-center gap-2 cursor-pointer hover:text-black transition-colors'>
                <input className='w-4 h-4 cursor-pointer accent-black' type="checkbox" value={'Kurti'} checked={subCategory.includes('Kurti')} onChange={toggleSubCategory} /> 
                <span>Kurti</span>
              </label>
              <label className='flex items-center gap-2 cursor-pointer hover:text-black transition-colors'>
                <input className='w-4 h-4 cursor-pointer accent-black' type="checkbox" value={'Saree'} checked={subCategory.includes('Saree')} onChange={toggleSubCategory} /> 
                <span>Saree</span>
              </label>
            </div>
          </div>

          {/* Price Range */}
          <div>
            <p className='mb-3 text-xs font-semibold text-gray-900 uppercase tracking-wider'>Price Range (₹)</p>
            <div className='flex gap-3'>
              <div className='w-1/2'>
                <label className='text-xs text-gray-500 mb-1 block'>Min Price</label>
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full border border-gray-300 rounded-sm px-3 py-1.5 text-sm bg-white outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>
              <div className='w-1/2'>
                <label className='text-xs text-gray-500 mb-1 block'>Max Price</label>
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full border border-gray-300 rounded-sm px-3 py-1.5 text-sm bg-white outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Product Grid */}
      <div className='flex justify-center w-full'>
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-6 gap-y-8 w-full max-w-4xl'>
          {
            filterProducts.map((item, index) => (
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} sizes={item.sizes} />
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default CollectionContent;
