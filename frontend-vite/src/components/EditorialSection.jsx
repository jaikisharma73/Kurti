
import React from "react";
import { assets } from "../assets/assets";
import { Link } from 'react-router-dom';
import SplitImageSection from "./SplitImageSection";

const ImageBlock = ({ src, alt, align, title, text }) => {
  const isRight = align === "right";

  return (
    <div className={`relative flex flex-col md:flex-row ${isRight ? 'md:flex-row-reverse' : ''} justify-start items-end w-full mb-32`}>

      <Link to="/collection" onClick={() => window.scrollTo(0, 0)} className="relative block w-full md:w-auto md:max-w-[550px] flex-shrink-0 cursor-pointer">
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-cover transition-transform duration-700 ease-out hover:scale-105"
        />

        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent md:hidden pointer-events-none" />

        {alt && (
          <div className="absolute bottom-4 right-4 bg-white/70 backdrop-blur-sm px-3 py-1 text-sm font-sans tracking-widest text-neutral-800">
            {alt}
          </div>
        )}
      </Link>


      <div className={`absolute md:relative bottom-3 md:bottom-auto w-full md:w-full md:max-w-xs flex flex-col justify-end z-10 ${isRight ? 'items-end text-right pr-4 md:pr-6 lg:pr-12 right-0' : 'items-start text-left pl-4 md:pl-6 lg:pl-12 left-0'} md:pb-8 pointer-events-none`}>
        {title && <h3 className="font-serif text-xs md:text-base text-white md:text-black mb-0.5 md:mb-1 drop-shadow-md md:drop-shadow-none">{title}</h3>}
        {text && <p className="font-sans text-neutral-200 md:text-neutral-400 leading-relaxed text-[7px] md:text-[9px] uppercase tracking-[0.2em] max-w-[85%] md:max-w-full drop-shadow-md md:drop-shadow-none">{text}</p>}
      </div>
    </div>
  );
};

const EditorialSection = () => {
  return (
    <section className="relative bg-neutral-100 text-neutral-900">


      <div className="absolute inset-0 pointer-events-none z-50">
        <div className="sticky top-[93vh] md:top-[85vh] w-full flex justify-end pr-6">
          <div className="text-right -mr-6">
            <h2 className="font-serif text-4xl md:text-6xl lg:text-8xl bg-gradient-to-r from-white/50 via-white/90 to-white/30 bg-clip-text text-transparent tracking-[0.10em] transition-transform duration-500 ease-out drop-shadow-lg">
              ZORRY
            </h2>
          </div>
        </div>
      </div>
      <Link to="/collection" onClick={() => window.scrollTo(0, 0)} className="relative block min-h-[100vh] md:min-h-[120vh] w-full cursor-pointer overflow-hidden">
        <img
          src={assets.z11}
          alt="Editorial backdrop"
          className="absolute inset-0 w-full h-full object-cover scale-110 brightness-75 transition-transform duration-1000 hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />


        <div className="absolute top-0 left-0 pt-8 pl-6 md:pt-12 md:pl-12 pointer-events-none z-10">
          <p className="font-sans uppercase tracking-[0.2em] text-white text-lg md:text-2xl drop-shadow-md leading-relaxed">
            New Arrivals
          </p>
        </div>

        <div className="absolute inset-0 flex flex-col items-end justify-end pr-4 md:pr-12 pointer-events-none pb-[120px] md:pb-[180px]">
          <div className="text-right mr-4">
            <p className="font-sans uppercase tracking-[0.4em] text-white/80 text-sm md:text-base mt-12">
              SUMMER 2026
            </p>
          </div>
        </div>
      </Link>


      <div className="relative z-10 bg-neutral-100 overflow-hidden">
        <SplitImageSection />


        <div className="w-full py-24 space-y-24">
          <ImageBlock
            src={assets.z22}
            alt=""
            align="left"
            title="MODERN ELEGANCE"
            text="A curated selection of timeless pieces designed to redefine your everyday wardrobe with effortless sophistication."
          />
          <ImageBlock
            src={assets.z33}
            alt=""
            align="right"
            title="THE NEW SILHOUETTE"
            text="Bold proportions meet classic tailoring, creating a striking balance between structure and fluidity."
          />
          <ImageBlock
            src={assets.z44}
            alt=""
            align="left"
            title="REFINED TEXTURES"
            text="Luxurious fabrics and meticulous craftsmanship converge to deliver an unparalleled tactile experience."
          />
        </div>
      </div>
    </section>
  );
};

export default EditorialSection;
