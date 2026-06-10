import React from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const ReviewsModal = ({ product, token, onClose, refreshList }) => {
  if (!product) return null;

  const deleteReview = async (reviewId) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/review/delete', { productId: product._id, reviewId }, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        refreshList(); // refresh the list to get updated product stats
        onClose();     // simple way: close modal and require reopening to see changes, or we can fetch locally.
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
      <div className='bg-white rounded-lg shadow-xl w-full max-w-2xl flex flex-col max-h-[80vh]'>
        <div className='flex justify-between items-center p-4 border-b'>
          <h2 className='text-lg font-bold'>Reviews for {product.name}</h2>
          <button onClick={onClose} className='text-gray-500 hover:text-black font-bold text-xl'>&times;</button>
        </div>
        <div className='p-4 overflow-auto flex-1'>
          {product.reviews && product.reviews.length > 0 ? (
            <div className='flex flex-col gap-4'>
              {product.reviews.map((rev) => (
                <div key={rev._id} className='border p-3 rounded flex justify-between items-start'>
                  <div>
                    <h4 className='font-bold'>{rev.name} <span className='text-xs font-normal text-gray-500'>({new Date(rev.date).toLocaleDateString()})</span></h4>
                    <p className='text-yellow-500 font-bold'>Rating: {rev.rating}/5</p>
                    <p className='text-gray-700 mt-1'>{rev.comment}</p>
                  </div>
                  <button onClick={() => deleteReview(rev._id)} className='bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600 shrink-0'>Delete</button>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-center text-gray-500 py-8'>No reviews found for this product.</p>
          )}
        </div>
        <div className='p-4 border-t text-right'>
           <button onClick={onClose} className='bg-gray-200 px-4 py-2 rounded hover:bg-gray-300'>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewsModal;
