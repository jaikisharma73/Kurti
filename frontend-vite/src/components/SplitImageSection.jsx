import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const SplitImageSection = () => {
  return (
    <section className="relative w-full md:min-h-[120vh] flex flex-col md:flex-row gap-[3px] md:gap-0">
      
      <Link to="/product/6a0eec70596a0ffbb99c488c" onClick={() => window.scrollTo(0, 0)} className="relative block w-full md:w-1/2 h-auto cursor-pointer group">
        <img
          src={assets.z111}
          alt="Editorial split left"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-6 right-6 bg-white/80 backdrop-blur-md px-3 py-1.5 text-[9px] md:text-[10px] font-sans tracking-widest text-black uppercase">
          ₹2999
        </div>
      </Link>

      
      <Link to="/product/6a0eeccd596a0ffbb99c4897" onClick={() => window.scrollTo(0, 0)} className="relative block w-full md:w-1/2 h-auto cursor-pointer group">
        <img
          src={assets.z122}
          alt="Editorial split right"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-6 right-6 bg-white/80 backdrop-blur-md px-3 py-1.5 text-[9px] md:text-[10px] font-sans tracking-widest text-black uppercase">
          ₹2999
        </div>
      </Link>
    </section>
  );
};

export default SplitImageSection;
