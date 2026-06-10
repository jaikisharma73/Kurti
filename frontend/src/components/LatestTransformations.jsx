"use client";

import React, { useContext, useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const FloatingCard = ({ product, index, navigate, currency }) => {
  return (
    <motion.div
      className="relative overflow-hidden shadow-xl cursor-pointer group"
      onClick={() => navigate(`/product/${product._id}`)}
      whileHover={{
        scale: 1.04,
        rotate: 1.5,
        boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
      }}
      animate={{ y: [0, -12, 0] }}
      transition={{
        repeat: Infinity,
        duration: 3.5 + (index % 3) * 0.5,
        ease: 'easeInOut',
        delay: index * 0.2,
      }}
    >
      <img
        src={product.image[0]}
        alt={product.name}
        loading="lazy"
        className="w-full h-[420px] object-cover transition-transform duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

      <div className="absolute bottom-5 left-5 right-5 z-10">
        <p className="text-[#c8a06e] text-sm font-medium mt-1">
          {currency}{product.price}
        </p>
        <p className="text-white/50 text-xs mt-1 uppercase tracking-wider">
          {product.category}
        </p>
      </div>
    </motion.div>
  );
};

const LatestTransformations = () => {
  const { products, navigate, currency } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  const containerRef = useRef(null);

  useEffect(() => {
    setLatestProducts(products.slice(0, 8));
  }, [products]);

  return (
    <section
      ref={containerRef}
      className="relative bg-white py-24 overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-[120px] md:text-[200px] font-black text-black/5 tracking-widest">
          ZORRYFASH
        </h1>
      </div>

      <div className="absolute top-20 left-20 w-72 h-72 bg-[#c8a06e]/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-[#c8a06e]/20 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="section-title-wrapper text-center mb-16">
          <p className="section-label">TRENDING</p>
          <div className='text-center text-3xl'>
            <Title text1={'LATEST'} text2={'COLLECTIONS'} />
          </div>
          <div className="section-line" />
          <p className="section-desc">Discover the newest premium drops from ZorryFash with cinematic anti-gravity visuals.</p>
        </div>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[420px]">
        {latestProducts.map((product, idx) => (
          <div
            key={product._id}
            className={`relative ${idx % 2 === 0 ? 'translate-y-6' : '-translate-y-6'}`}
          >
            <FloatingCard product={product} index={idx} navigate={navigate} currency={currency} />
          </div>
        ))}
      </div>

    </section >
  );
};

export default LatestTransformations;