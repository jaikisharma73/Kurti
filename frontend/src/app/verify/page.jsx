import React, { Suspense } from 'react';
import VerifyContent from './VerifyContent';

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-gray-500">Verifying payment, please wait...</div>}>
      <VerifyContent />
    </Suspense>
  );
}
