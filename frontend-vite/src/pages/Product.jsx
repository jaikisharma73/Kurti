import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import axios from 'axios';
import { toast } from 'react-toastify';

const Product = () => {

  const { productId } = useParams();
  const { products, currency, addToCart, token, backendUrl } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')
  const [displayPrice, setDisplayPrice] = useState(0)

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [activeTab, setActiveTab] = useState('description');

  const getSizePrice = (product, selectedSize) => {
    if (product.sizes && product.sizes.length > 0 && typeof product.sizes[0] === 'object' && product.sizes[0].size) {

      const found = product.sizes.find(s => s.size === selectedSize);
      return found ? found.price : product.price;
    }

    return product.price;
  }

  const getSizeNames = (product) => {
    if (product.sizes && product.sizes.length > 0 && typeof product.sizes[0] === 'object' && product.sizes[0].size) {
      return product.sizes.map(s => s.size);
    }
    return product.sizes || [];
  }

  const getDefaultPrice = (product) => {
    if (product.sizes && product.sizes.length > 0 && typeof product.sizes[0] === 'object' && product.sizes[0].size) {
      const prices = product.sizes.map(s => s.price);
      return Math.min(...prices);
    }
    return product.price;
  }

  const fetchProductData = async () => {

    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        setDisplayPrice(getDefaultPrice(item))
        return null;
      }
    })

  }

  useEffect(() => {
    fetchProductData();
  }, [productId, products])

  useEffect(() => {
    if (productData) {
      const scrollToTop = () => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      };
      scrollToTop();
      setTimeout(scrollToTop, 10);
    }
  }, [productData]);

  const handleSizeSelect = (selectedSize) => {
    setSize(selectedSize);
    if (productData) {
      setDisplayPrice(getSizePrice(productData, selectedSize));
    }
  }

  const submitReview = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error('Please login to submit a review');
      return;
    }
    if (!comment) {
      toast.error('Please enter a comment');
      return;
    }
    try {
      const response = await axios.post(backendUrl + '/api/product/review/' + productId, { rating, comment }, { headers: { token } });
      if (response.data.success) {
        toast.success('Review added successfully');
        setComment('');
        setRating(5);

        window.location.reload();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>

        
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className=' flex items-center gap-1 mt-2'>
            {[1, 2, 3, 4, 5].map((star) => (
              <img key={star} src={star <= Math.round(productData.rating || 0) ? assets.star_icon : assets.star_dull_icon} alt="" className="w-3 5" />
            ))}
            <p className='pl-2'>({productData.numReviews || 0})</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>
            {currency}{displayPrice}
            {!size && productData.sizes && productData.sizes.length > 0 && typeof productData.sizes[0] === 'object' && (
              <span className='text-sm text-gray-400 ml-2'>onwards</span>
            )}
          </p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {getSizeNames(productData).map((item, index) => (
                <button onClick={() => handleSizeSelect(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
              ))}
            </div>
          </div>
          <button onClick={() => addToCart(productData._id, size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      
      <div className='mt-20'>
        <div className='flex'>
          <b onClick={() => setActiveTab('description')} className={`border px-5 py-3 text-sm cursor-pointer ${activeTab === 'description' ? 'font-bold bg-gray-50' : 'font-normal'}`}>Description</b>
          <p onClick={() => setActiveTab('reviews')} className={`border px-5 py-3 text-sm cursor-pointer ${activeTab === 'reviews' ? 'font-bold bg-gray-50' : 'font-normal'}`}>Reviews ({productData.numReviews || 0})</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          {activeTab === 'description' ? (
            <>
              <p>{productData.description}</p>
            </>
          ) : (
            <div>
              {token ? (
                <form onSubmit={submitReview} className='mb-8 flex flex-col gap-3'>
                  <h3 className='text-lg font-medium text-black'>Write a Review</h3>
                  <div className='flex items-center gap-2'>
                    <label>Rating:</label>
                    <select value={rating} onChange={(e) => setRating(e.target.value)} className='border p-1'>
                      <option value="5">5 - Excellent</option>
                      <option value="4">4 - Very Good</option>
                      <option value="3">3 - Good</option>
                      <option value="2">2 - Fair</option>
                      <option value="1">1 - Poor</option>
                    </select>
                  </div>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder='Write your review here...'
                    className='border p-3 w-full h-24'
                    required
                  ></textarea>
                  <button type="submit" className='bg-black text-white px-4 py-2 w-max'>Submit Review</button>
                </form>
              ) : (
                <p className='mb-8 text-black'>Please <span className='font-bold underline'>login</span> to write a review.</p>
              )}

              <div className='flex flex-col gap-4'>
                {productData.reviews && productData.reviews.length > 0 ? (
                  productData.reviews.slice().reverse().map((rev, index) => (
                    <div key={index} className='border-b pb-4'>
                      <div className='flex items-center gap-2 mb-1'>
                        <span className='font-bold text-black'>{rev.name}</span>
                        <div className='flex'>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <img key={star} src={star <= rev.rating ? assets.star_icon : assets.star_dull_icon} alt="" className="w-3" />
                          ))}
                        </div>
                        <span className='text-xs text-gray-400'>{new Date(rev.date).toLocaleDateString()}</span>
                      </div>
                      <p>{rev.comment}</p>
                    </div>
                  ))
                ) : (
                  <p>No reviews yet.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : <div className=' opacity-0'></div>
}

export default Product
