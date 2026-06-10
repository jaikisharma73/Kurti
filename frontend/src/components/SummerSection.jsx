"use client";

import React from 'react';
import Link from 'next/link';
import { assets } from '../assets/assets';

const SummerSection = () => {
  return (<>

    <Link href="/collection?category=Men" onClick={() => { if (typeof window !== 'undefined') window.scrollTo(0, 0); }} className="relative block min-h-[100vh] md:min-h-[120vh] w-full cursor-pointer overflow-hidden ">
      <img
        src={assets.mens.src || assets.mens}
        alt="Editorial backdrop"
        className="absolute inset-0 w-full h-full object-cover object-left sm:object-center scale-110 brightness-75 transition-transform duration-1000 hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
      <div className="absolute inset-0 flex flex-col items-center justify-center pr-4 md:pr-12 pointer-events-none pb-[120px] md:pb-[180px]">
        <div className="text-right mr-4">
          <p className="font-sans uppercase tracking-[0.4em] text-white/80 text-sm md:text-base mt-12">
            Men
          </p>
        </div>
      </div>
      <div className="absolute inset-0 flex flex-col items-end justify-end pr-4 md:pr-12 pointer-events-none pb-[120px] md:pb-[180px]">
        <div className="text-right mr-4">
          <p className="font-sans uppercase tracking-[0.4em] text-white/80 text-sm md:text-base mt-12">
            SUMMER 2026
          </p>
          <p className="font-sans uppercase tracking-[0.4em] text-white/80 text-sm md:text-base mt-5">Men Lightweight luxury summer wear</p>
        </div>
      </div>
    </Link>
    <Link href="/collection?category=Women" onClick={() => { if (typeof window !== 'undefined') window.scrollTo(0, 0); }} className="relative block min-h-[100vh] md:min-h-[120vh] w-full cursor-pointer overflow-hidden">
      <img
        src={assets.women.src || assets.women}
        alt="Editorial backdrop"
        className="absolute inset-0 w-full h-full object-cover object-left sm:object-center scale-110 brightness-75 transition-transform duration-1000 hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
      <div className="absolute inset-0 flex flex-col items-center justify-center pr-4 md:pr-12 pointer-events-none pb-[120px] md:pb-[180px]">
        <div className="text-right mr-4">
          <p className="font-sans uppercase tracking-[0.4em] text-white/80 text-sm md:text-base mt-12">
            Women
          </p>
        </div>
      </div>
      <div className="absolute inset-0 flex flex-col items-end justify-end pr-4 md:pr-12 pointer-events-none pb-[120px] md:pb-[180px]">
        <div className="text-right mr-4">
          <p className="font-sans uppercase tracking-[0.4em] text-white/80 text-sm md:text-base mt-12">
            SUMMER 2026
          </p>
          <p className="font-sans uppercase tracking-[0.4em] text-white/80 text-sm md:text-sm mt-5">
            Women Lightweight luxury summer wear
          </p>
        </div>
      </div>
    </Link>
    <Link href="/collection?category=Kids" onClick={() => { if (typeof window !== 'undefined') window.scrollTo(0, 0); }} className="relative block min-h-[100vh] md:min-h-[120vh] w-full cursor-pointer overflow-hidden">
      <img
        src={assets.kids.src || assets.kids}
        alt="Editorial backdrop"
        className="absolute inset-0 w-full h-full object-cover object-left sm:object-center scale-110 brightness-75 transition-transform duration-1000 hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
      <div className="absolute inset-0 flex flex-col items-center justify-center pr-4 md:pr-12 pointer-events-none pb-[120px] md:pb-[180px]">
        <div className="text-right mr-4">
          <p className="font-sans uppercase tracking-[0.4em] text-white/80 text-sm md:text-sm mt-12">
            Kids
          </p>

        </div>
      </div>
      <div className="absolute inset-0 flex flex-col items-end justify-end pr-4 md:pr-12 pointer-events-none pb-[120px] md:pb-[180px]">
        <div className="text-right mr-4">
          <p className="font-sans uppercase tracking-[0.4em] text-white/80 text-sm md:text-base mt-12">
            SUMMER 2026
          </p>
          <p className="font-sans uppercase tracking-[0.4em] text-white/80 text-sm md:text-sm mt-5">
            Kids Lightweight luxury summer wear
          </p>
        </div>
      </div>
    </Link>

  </>

  );
};

export default SummerSection;
