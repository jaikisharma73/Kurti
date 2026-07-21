import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { useParams, useNavigate } from 'react-router-dom'

const Edit = ({ token }) => {

  const { id } = useParams()
  const navigate = useNavigate()

  const [images, setImages] = useState([
    { file: null, preview: null, existingUrl: "" },
    { file: null, preview: null, existingUrl: "" },
    { file: null, preview: null, existingUrl: "" },
    { file: null, preview: null, existingUrl: "" },
  ])

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("Topwear")
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])
  const [sizePrices, setSizePrices] = useState({})
  const [loading, setLoading] = useState(true)

  const allSizes = subCategory === "Jeans" ? ["26", "28", "30", "32", "34", "36"] : ["S", "M", "L", "XL", "XXL"];

  const defaultPrices = {
    "S": 399,
    "M": 499,
    "L": 599,
    "XL": 699,
    "XXL": 799,
    "26": 599,
    "28": 699,
    "30": 799,
    "32": 1199,
    "34": 1299
  };

  const toggleSize = (size) => {
    if (sizes.includes(size)) {
      setSizes(prev => prev.filter(item => item !== size));
      setSizePrices(prev => {
        const updated = {...prev};
        delete updated[size];
        return updated;
      });
    } else {
      setSizes(prev => [...prev, size]);
      if (defaultPrices[size]) {
        setSizePrices(prev => ({...prev, [size]: defaultPrices[size]}));
      }
    }
  }

  const updateSizePrice = (size, price) => {
    setSizePrices(prev => ({...prev, [size]: price}));
  }

  const fetchProduct = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/product/single', { productId: id })
      if (response.data.success) {
        const product = response.data.product
        setName(product.name)
        setDescription(product.description)
        setCategory(product.category)
        setSubCategory(product.subCategory)
        setBestseller(product.bestseller)
        // Populate the 4 slots
        const fetchedImages = product.image || []
        const initialImages = [
          { file: null, preview: null, existingUrl: fetchedImages[0] || "" },
          { file: null, preview: null, existingUrl: fetchedImages[1] || "" },
          { file: null, preview: null, existingUrl: fetchedImages[2] || "" },
          { file: null, preview: null, existingUrl: fetchedImages[3] || "" },
        ]
        setImages(initialImages)

        if (product.sizes && product.sizes.length > 0) {
          if (typeof product.sizes[0] === 'object' && product.sizes[0].size) {

            const sizeNames = product.sizes.map(s => s.size);
            const prices = {};
            product.sizes.forEach(s => { prices[s.size] = s.price; });
            setSizes(sizeNames);
            setSizePrices(prices);
          } else {

            setSizes(product.sizes);
            const prices = {};
            product.sizes.forEach(s => { prices[s] = product.price; });
            setSizePrices(prices);
          }
        }

        setLoading(false)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [id])

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    const validSizes = sizes.filter(size => allSizes.includes(size));

    for (const size of validSizes) {
      if (!sizePrices[size] || sizePrices[size] <= 0) {
        toast.error(`Please enter a price for size ${size}`);
        return;
      }
    }

    if (validSizes.length === 0) {
      toast.error('Please select at least one size');
      return;
    }

    try {
      const formData = new FormData()

      const sizesWithPrices = validSizes.map(size => ({
        size: size,
        price: Number(sizePrices[size])
      }));

      const defaultPrice = Math.min(...sizesWithPrices.map(s => s.price));

      formData.append("id", id)
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", defaultPrice)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizesWithPrices))

      const imageSlots = images.map(img => {
        if (img.file) {
          return { type: 'new' };
        } else if (img.existingUrl) {
          return { type: 'existing', url: img.existingUrl };
        } else {
          return { type: 'empty' };
        }
      });
      formData.append("imageSlots", JSON.stringify(imageSlots));

      images.forEach((img, idx) => {
        if (img.file) {
          formData.append(`image${idx + 1}`, img.file);
        }
      });

      const response = await axios.post(backendUrl + "/api/product/edit", formData, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        navigate('/list')
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  if (loading) {
    return <p>Loading product data...</p>
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div className='flex items-center gap-2 mb-2'>
        <button type="button" onClick={() => navigate('/list')} className='px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors'>
          ← Back to List
        </button>
        <p className='text-lg font-medium'>Edit Product</p>
      </div>

      <div className='w-full'>
        <p className='mb-2 font-medium text-gray-700'>Product Images</p>
        <p className='text-sm text-gray-400 mb-3'>
          Click any slot to upload/replace a picture. Click the red "×" button to clear a slot.
        </p>

        <div className='flex flex-wrap gap-3'>
          {images.map((img, idx) => {
            const displaySrc = img.preview || img.existingUrl || assets.upload_area;
            return (
              <div key={idx} className="relative group w-24 h-24 border border-gray-300 rounded overflow-hidden bg-white hover:border-gray-400 transition-colors">
                <label htmlFor={`image${idx}`} className="cursor-pointer flex items-center justify-center w-full h-full">
                  <img className='w-full h-full object-cover' src={displaySrc} alt={`slot-${idx}`} />
                  <input 
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setImages(prev => {
                          const updated = [...prev];
                          updated[idx] = {
                            file: file,
                            preview: URL.createObjectURL(file),
                            existingUrl: prev[idx].existingUrl
                          };
                          return updated;
                        });
                      }
                    }} 
                    type="file" 
                    id={`image${idx}`} 
                    hidden 
                  />
                </label>
                {(img.preview || img.existingUrl) && (
                  <button
                    type="button"
                    onClick={() => {
                      setImages(prev => {
                        const updated = [...prev];
                        updated[idx] = { file: null, preview: null, existingUrl: "" };
                        return updated;
                      });
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center cursor-pointer hover:bg-red-600 shadow-md transition-colors"
                  >
                    ×
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write content here' required />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

        <div>
          <p className='mb-2'>Product category</p>
          <select onChange={(e) => setCategory(e.target.value)} value={category} className='w-full px-3 py-2'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Sub category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className='w-full px-3 py-2'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
            <option value="Jeans">Jeans</option>
            <option value="Tshirt">Tshirt</option>
            <option value="Shirt">Shirt</option>
            <option value="Kurti">Kurti</option>
            <option value="Saree">Saree</option>
          </select>
        </div>

      </div>

      <div>
        <p className='mb-2'>Product Sizes & Prices</p>
        <p className='text-sm text-gray-400 mb-2'>Click a size to select it, then enter the price for that size</p>
        <div className='flex gap-3'>
          {allSizes.map((size) => (
            <div key={size} onClick={() => toggleSize(size)}>
              <p className={`${sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>{size}</p>
            </div>
          ))}
        </div>

        
        {sizes.length > 0 && (
          <div className='mt-4 flex flex-col gap-2'>
            <p className='text-sm font-medium text-gray-600'>Set price for each product size:</p>
            <div className='flex flex-wrap gap-4'>
              {sizes.map((size) => (
                <div key={size} className='flex items-center gap-2 bg-gray-50 border rounded px-3 py-2'>
                  <span className='font-medium text-sm min-w-[30px]'>{size}:</span>
                  <span className='text-gray-500'>₹</span>
                  <input
                    type="number"
                    min="1"
                    placeholder="Price"
                    value={sizePrices[size] || ''}
                    onChange={(e) => updateSizePrice(size, e.target.value)}
                    className='w-[80px] px-2 py-1 border rounded text-sm'
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className='flex gap-2 mt-2'>
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
        <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
      </div>

      <div className='flex gap-3 mt-4'>
        <button type="submit" className='w-28 py-3 bg-black text-white'>UPDATE</button>
        <button type="button" onClick={() => navigate('/list')} className='w-28 py-3 bg-gray-300 text-gray-700'>CANCEL</button>
      </div>

    </form>
  )
}

export default Edit
