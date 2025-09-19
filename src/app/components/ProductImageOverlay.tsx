'use client';
import React from 'react';

interface ProductImageOverlayProps {
  imageUrl: string | null;
  onClose: () => void;
}

const ProductImageOverlay: React.FC<ProductImageOverlayProps> = ({ imageUrl, onClose }) => {
  if (!imageUrl) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
      onClick={onClose}
    >
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute top-4 right-4 text-white text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <img 
          src={imageUrl} 
          alt="Product" 
          className="max-w-[90vw] max-h-[90vh] object-contain"
          style={{ imageRendering: 'high-quality' }}
        />
      </div>
    </div>
  );
};

export default ProductImageOverlay;
