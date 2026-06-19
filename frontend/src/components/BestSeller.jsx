"use client";

import React, { useContext, useEffect, useState, useRef } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'

const BestSeller = () => {

    const { products } = useContext(ShopContext)

    const [bestSeller, setBestSeller] = useState([])
    const sectionRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const bestProduct = products.filter((item) => item.bestseller)
        setBestSeller(bestProduct.slice(0, 5))
    }, [products])

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.1 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-white py-20 sm:py-28 px-4 sm:px-8 lg:px-14 overflow-hidden z-20"
        >

            <div
                className={`
                    max-w-[1600px] mx-auto
                    transition-all duration-1000
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                `}
            >

                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-14">

                    <div className="max-w-2xl">

                        <p className="uppercase tracking-[4px] text-[11px] sm:text-xs text-neutral-500 mb-5">
                            Most Wanted 
                        </p>

                        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tight leading-none text-black">
                            Best
                            <br />
                            Sellers
                        </h2>

                    </div>

                    <div className="max-w-md">

                        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                            Discover elevated essentials inspired by modern luxury fashion.
                            Timeless silhouettes, premium fabrics, And statement pieces
                            curated for everyday wear.
                        </p>

                    </div>

                </div>

                <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-4 sm:gap-x-6 gap-y-12">

                    {bestSeller.map((item, index) => (

                        <div
                            key={index}
                            className={`
                                group
                                transition-all duration-1000
                                ${isVisible
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-12'
                                }
                            `}
                            style={{
                                transitionDelay: `${index * 150}ms`
                            }}
                        >

                            <div className="relative overflow-hidden bg-white">

                                <div className="overflow-hidden">

                                    <ProductItem
                                        id={item._id}
                                        name={item.name}
                                        image={item.image}
                                        price={item.price}
                                        sizes={item.sizes}
                                    />

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

                <div className="flex justify-center mt-16">

                    <button
                        className="
                            border border-black
                            px-10 py-3
                            uppercase
                            tracking-[3px]
                            text-xs sm:text-sm
                            hover:bg-black
                            hover:text-white
                            transition-all duration-300
                        "
                    >
                        View
                    </button>

                </div>

            </div>

        </section>
    )
}

export default BestSeller