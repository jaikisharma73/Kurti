import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext);
  const location = useLocation();
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState(location.state?.category || []);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent')
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

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
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      };
      scrollToTop();
      setTimeout(scrollToTop, 10);
    }
  }, [filterProducts]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      
      <div className='w-full sm:w-[30%] md:w-[25%] lg:w-[20%]'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Men'} checked={category.includes('Men')} onChange={toggleCategory} /> Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Women'} checked={category.includes('Women')} onChange={toggleCategory} /> Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Kids'} checked={category.includes('Kids')} onChange={toggleCategory} /> Kids
            </p>
          </div>
        </div>
        
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory} /> Topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} /> Bottomwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} /> Winterwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Jeans'} onChange={toggleSubCategory} /> Jeans
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Tshirt'} onChange={toggleSubCategory} /> T-Shirt
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Shirt'} onChange={toggleSubCategory} /> Shirt
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Kurti'} onChange={toggleSubCategory} /> Kurti
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Saree'} onChange={toggleSubCategory} /> Saree
            </p>
          </div>
        </div>

        
        <div className={`border border-gray-300 px-4 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>PRICE RANGE (₹)</p>
          <div className='flex flex-col gap-2'>
            <input
              type="number"
              placeholder="Min"
              className="w-full border border-gray-300 px-2 py-1 text-sm outline-none"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max"
              className="w-full border border-gray-300 px-2 py-1 text-sm outline-none"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
      </div>

      
      <div className='flex-1'>

        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
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

export default Collection
