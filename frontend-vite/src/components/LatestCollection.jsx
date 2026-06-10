import React, { useContext, useEffect, useState, useRef } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setLatestProducts(products.slice(0, 10));
    }, [products])

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={sectionRef} className='py-16 px-[7px]'>
            <div className={`section-title-wrapper animate-on-scroll ${isVisible ? 'visible' : ''}`}>
                <p className="section-label">Fresh Drops</p>
                <div className='text-center text-3xl'>
                    <Title text1={'LATEST'} text2={'COLLECTIONS'} />
                </div>
                <div className="section-line" />
                <p className='section-desc'>
                    Stay ahead of the curve with our newest arrivals. From everyday essentials to statement pieces,
                    our latest collection brings you fashion-forward designs crafted with premium fabrics and
                    meticulous attention to detail.
                </p>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-8'>
                {
                    latestProducts.map((item, index) => (
                        <div
                            key={index}
                            className={`product-card-wrapper animate-on-scroll stagger-${index + 1} ${isVisible ? 'visible' : ''}`}
                        >
                            <ProductItem id={item._id} image={item.image} name={item.name} price={item.price} sizes={item.sizes} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default LatestCollection
