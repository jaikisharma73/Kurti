"use client";

import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import Link from 'next/link';
import { ShopContext } from '../context/ShopContext';

const SplitImageSection2 = () => {
  const { homepageConfig } = useContext(ShopContext);

  const leftSrc = (homepageConfig && homepageConfig.splitLeft) 
    ? homepageConfig.splitLeft 
    : (assets.g1.src || assets.g1);

  const rightSrc = (homepageConfig && homepageConfig.splitRight) 
    ? homepageConfig.splitRight 
    : (assets.g2.src || assets.g2);

  const leftLink = homepageConfig?.splitLeftLink || "/collection";
  const rightLink = homepageConfig?.splitRightLink || "/collection";

  const leftPrice = homepageConfig?.splitLeftPrice || "2999";
  const rightPrice = homepageConfig?.splitRightPrice || "2999";

  return (
    <section className="relative w-full md:min-h-[120vh] flex flex-col md:flex-row gap-[3px] md:gap-0">
      
      <Link href={leftLink} onClick={() => { if (typeof window !== 'undefined') window.scrollTo(0, 0); }} className="relative block w-full md:w-1/2 h-auto cursor-pointer group">
        <img
          src={leftSrc}
          alt="Editorial split left"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-6 right-6 bg-white/80 backdrop-blur-md px-3 py-1.5 text-[9px] md:text-[10px] font-sans tracking-widest text-black uppercase">
          ₹{leftPrice}
        </div>
      </Link>

      
      <Link href={rightLink} onClick={() => { if (typeof window !== 'undefined') window.scrollTo(0, 0); }} className="relative block w-full md:w-1/2 h-auto cursor-pointer group">
        <img
          src={rightSrc}
          alt="Editorial split right"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-6 right-6 bg-white/80 backdrop-blur-md px-3 py-1.5 text-[9px] md:text-[10px] font-sans tracking-widest text-black uppercase">
          ₹{rightPrice}
        </div>
      </Link>
    </section>
  );
};

export default SplitImageSection2;
