"use client";

import React, { useState, useEffect, useCallback, useContext } from "react";
import { assets } from "../assets/assets";
import Link from "next/link";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const slides = [
  {
    image: assets.hero_img3,
    subtitle: "Premium Collection",
    title: "CRAFTED FOR\nTHE MODERN YOU",
    desc: "Premium fabrics, contemporary cuts. Fashion that moves with you, designed for every occasion.",
  },
  {
    image: assets.hero_img,
    subtitle: "New Season 2026",
    title: "REDEFINE YOUR\nEVERYDAY STYLE",
    desc: "Discover curated fashion that blends comfort with elegance. Elevate your wardrobe with ZorryFash.",
  },
  {
    image: assets.hero_img2,
    subtitle: "Trending Now",
    title: "BOLD LOOKS,\nTIMELESS APPEAL",
    desc: "From casual streetwear to refined essentials — find pieces that speak your style language.",
  },
];

const SLIDE_DURATION = 5000;

const Hero = () => {
  const { backendUrl } = useContext(ShopContext);
  const [activeSlides, setActiveSlides] = useState(slides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const fetchDynamicPosters = async () => {
      try {
        const response = await axios.get(backendUrl + '/api/poster/list');
        if (response.data.success && response.data.posters.length > 0) {
          const activePosters = response.data.posters.filter(p => p.isActive);
          if (activePosters.length > 0) {
            const mappedSlides = activePosters.map(p => ({
              image: p.image,
              subtitle: p.subtitle || "Trending",
              title: p.title || "LATEST ARRIVALS",
              desc: p.description || "",
            }));
            setActiveSlides(mappedSlides);
          }
        }
      } catch (error) {
        console.error("Error fetching homepage posters:", error);
      }
    };
    if (backendUrl) {
      fetchDynamicPosters();
    }
  }, [backendUrl]);

  const goToSlide = useCallback(
    (index) => {
      if (isTransitioning) return;

      setIsTransitioning(true);
      setCurrentSlide(index);
      setProgress(0);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 1200);
    },
    [isTransitioning],
  );

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % activeSlides.length);
  }, [currentSlide, goToSlide, activeSlides.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }

        return prev + 100 / (SLIDE_DURATION / 50);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [nextSlide]);

  const marqueeItems = [
    "Free Shipping Over ₹999",
    "Handpicked Collections",
    "Premium Quality Fabrics",
    "Easy Returns & Exchanges",
    "New Arrivals Every Week",
    "Luxury Streetwear",
  ];

  return (
    <>
      <div className="relative z-20 bg-white">
        <div className="absolute inset-0 pointer-events-none z-50">
          <div className="sticky top-[93vh] md:top-[85vh] w-full flex justify-end pr-4">
            <div className="text-right -mr-4">
              <h1 className="font-serif text-4xl md:text-6xl lg:text-8xl bg-gradient-to-r from-white/50 via-white/90 to-white/30 bg-clip-text text-transparent tracking-[0.10em] transition-transform duration-500 ease-out drop-shadow-lg">
                ZORRY
              </h1>
            </div>
          </div>
        </div>

        <div className="relative w-full min-h-screen bg-black overflow-hidden">
          <picture>
            <source media="(max-width: 640px)" srcSet={assets.zorryPort.src || assets.zorryPort} />

            <img
              src={assets.main.src || assets.main}
              alt="Hero background"
              className="
                absolute inset-0
                w-full h-full
                object-cover
                object-[center_50%]
                sm:object-top
                scale-[1.02]
              "
            />
          </picture>

          <div className="absolute inset-0 bg-black/10 z-10" />

          <div className="absolute inset-0 z-20 flex flex-col justify-end items-center text-center px-6 pb-[40px] sm:pb-[40px]">
            <Link
              href="/collection"
              className="
                border
                border-white
                text-white
                px-8
                sm:px-10
                py-3
                sm:py-4
                text-xs
                sm:text-sm
                uppercase
                tracking-[4px]
                font-medium
                hover:bg-white
                hover:text-black
                transition-all
                duration-500
                backdrop-blur-sm
              "
            >
              SHOP NOW
            </Link>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-0 w-full h-screen flex flex-col">
        <section className="relative flex-1 w-full overflow-hidden flex items-center py-16 sm:py-24 lg:py-28">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
          >
            <source src={assets.herovid} type="video/webm" />
            <source src={assets.herovid} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-white/40 z-10" />

          <div className="relative z-20 max-w-[1600px] w-full mx-auto px-5 sm:px-10 lg:px-16">
            <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto min-h-[60vh]">
              <div
                key={currentSlide}
                className="
                transition-all
                duration-1000
                ease-out
                animate-[fadeUp_1s_ease]
                flex flex-col items-center
              "
              >
                <p
                  className="
                  uppercase
                  tracking-[6px]
                  text-[10px]
                  sm:text-xs
                  text-neutral-700
                  mb-5
                  font-medium
                "
                >
                  {slides[currentSlide].subtitle}
                </p>

                <h1
                  className="
                  text-[34px]
                  sm:text-[72px]
                  lg:text-[95px]
                  leading-[0.95]
                  tracking-[-2px]
                  text-black
                  mb-8
                  font-light
                "
                  style={{
                    whiteSpace: "pre-line",
                  }}
                >
                  {slides[currentSlide].title}
                </h1>

                <p
                  className="
                  text-neutral-800
                  text-sm
                  sm:text-base
                  leading-relaxed
                  max-w-xl
                  mx-auto
                  mb-10
                "
                >
                  {slides[currentSlide].desc}
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/collection"
                    className="
                    bg-black
                    text-white
                    px-8
                    sm:px-10
                    py-3
                    sm:py-4
                    uppercase
                    tracking-[4px]
                    text-[11px]
                    sm:text-xs
                    hover:bg-neutral-800
                    transition-all
                    duration-500
                  "
                  >
                    Shop Now
                  </Link>

                  <Link
                    href="/collection"
                    className="
                    border
                    border-black
                    text-black
                    px-8
                    sm:px-10
                    py-3
                    sm:py-4
                    uppercase
                    tracking-[4px]
                    text-[11px]
                    sm:text-xs
                    hover:bg-black
                    hover:text-white
                    transition-all
                    duration-500
                  "
                  >
                    Explore
                  </Link>
                </div>

                <div className="flex items-center justify-center gap-4 mt-14">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`
                      transition-all duration-500
                      ${index === currentSlide
                          ? "w-16 h-[2px] bg-black"
                          : "w-8 h-[2px] bg-neutral-300 hover:bg-black"
                        }
                    `}
                    />
                  ))}
                </div>

                <div
                  className="mt-5 h-[2px] bg-black transition-all duration-100 mx-auto"
                  style={{
                    width: `${progress}%`,
                    maxWidth: "220px",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="relative z-20 bg-white flex-shrink-0">
          <div className="overflow-hidden border-y border-neutral-200 py-5 bg-white">
            <div className="animate-marquee flex whitespace-nowrap gap-12 w-max">
              {[...marqueeItems, ...marqueeItems].map((item, i) => (
                <span
                  key={i}
                  className="
                  flex
                  items-center
                  gap-3
                  text-[10px]
                  sm:text-xs
                  uppercase
                  tracking-[4px]
                  text-neutral-700
                  flex-shrink-0
                "
                >
                  <span className="w-2 h-2 rounded-full bg-black" />

                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
