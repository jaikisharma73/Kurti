import React, { Suspense } from 'react';
import ProductContent from './ProductContent';

async function getProduct(productId) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/single`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId }),
            next: { revalidate: 60 } // Cache for 60 seconds
        });
        const data = await response.json();
        if (data.success) {
            return data.product;
        }
    } catch (error) {
        console.error("Failed to fetch product for schema generation", error);
    }
    return null;
}

export async function generateMetadata({ params }) {
    const { productId } = await params;
    const product = await getProduct(productId);
    if (product) {
        return {
            title: `Buy ${product.name} Online | ZorryFash`,
            description: `${product.description.slice(0, 155)}... Shop premium ethnic wear starting at ₹${product.price} onwards. Cash on Delivery is available.`,
            openGraph: {
                title: `${product.name} | ZorryFash`,
                description: product.description,
                images: [{ url: product.image[0] }],
            }
        };
    }
    return {
        title: 'Product Details | ZorryFash',
        description: 'Shop designer Kurtis, luxury ethnic wear, and streetwear on ZorryFash.',
    };
}

export default async function ProductPage({ params }) {
    const { productId } = await params;
    const product = await getProduct(productId);

    const schemaJson = product ? {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "image": product.image,
        "description": product.description,
        "brand": {
            "@type": "Brand",
            "name": "ZorryFash"
        },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "INR",
            "price": product.price,
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition"
        }
    } : null;

    return (
        <>
            {schemaJson && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
                />
            )}
            <Suspense fallback={<div className="py-20 text-center text-gray-500">Loading product details...</div>}>
                <ProductContent />
            </Suspense>
        </>
    );
}
