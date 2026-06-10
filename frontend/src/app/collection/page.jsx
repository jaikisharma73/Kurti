import React, { Suspense } from 'react';
import CollectionContent from './CollectionContent';

export const metadata = {
  title: 'Shop Ethnic, Kurtis, and Streetwear Collection | ZorryFash',
  description: 'Explore our complete fashion collection of traditional ethnic Kurtis, sarees, modern topwear, bottomwear, jeans, and premium winter jackets on ZorryFash.',
  keywords: ['Kurtis', 'Saree', 'Topwear', 'Bottomwear', 'Jeans', 'Sizing filters', 'Women collections', 'Men collections'],
}

export default function CollectionPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-gray-500">Loading collection catalog...</div>}>
      <CollectionContent />
    </Suspense>
  );
}
