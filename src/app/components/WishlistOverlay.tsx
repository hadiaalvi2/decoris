'use client';
import React from 'react';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  sku: string;
}

interface WishlistOverlayProps {
  isOpen: boolean;
  wishlistItems: WishlistItem[];
  onClose: () => void;
  onRemoveItem: (itemId: string) => void;
}

const WishlistOverlay: React.FC<WishlistOverlayProps> = ({ isOpen, wishlistItems, onClose, onRemoveItem }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40" onClick={onClose} style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)' }}>
      <div 
        className="fixed right-0 top-0 h-full w-full max-w-[350px] bg-white shadow-lg z-50 p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out border-l border-gray-200"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the wishlist
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-sm font-normal tracking-widest flex items-center">
            WISHLIST 
            <span className="ml-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.7071 17.7071C11.0976 18.0976 11.7309 18.0976 12.1213 17.7071L18.4853 11.3431C18.8758 10.9526 18.8758 10.3195 18.4853 9.92893C18.0948 9.53841 17.4616 9.53841 17.0711 9.92893L11.4142 15.5858L6.80712 10.9787C6.4166 10.5882 5.78343 10.5882 5.39291 10.9787C5.00239 11.3693 5.00239 12.0024 5.39291 12.3929L11.4142 18.4142C11.8047 18.8047 12.4379 18.8047 12.8284 18.4142L18.4853 12.7574C18.8758 12.3668 18.8758 11.7337 18.4853 11.3431C18.0948 10.9526 17.4616 10.9526 17.0711 11.3431L11.4142 16.9999L10.7071 17.7071Z" transform="rotate(90 12 12)" fill="black"/>
              </svg>
            </span>
          </h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900 text-3xl leading-none">
            &times;
          </button>
        </div>

        {wishlistItems.length === 0 ? (
          <p className="text-xs text-gray-500 mb-4">You have 0 product(s) in your wishlist</p>
        ) : (
          <>
            <p className="text-xs text-gray-600 mb-4">You have {wishlistItems.length} product(s) in your wishlist.</p>
            {wishlistItems.map((item) => (
              <div key={item.id} className="flex items-center mb-4 border-b pb-4 last:border-b-0">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover mr-4" />
                <div className="flex-grow text-sm">
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">£{item.price.toFixed(2)} <span className="text-gray-400">including VAT</span></p>
                  <p className="text-xs text-gray-500">{item.sku}</p>
                </div>
                <button 
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-500 text-xs hover:text-red-700"
                >
                    Remove
                </button>
              </div>
            ))}
          </>
        )}

      </div>
    </div>
  );
};

export default WishlistOverlay;
