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
        className="fixed right-0 top-0 h-full w-full xs:w-80 sm:w-96 md:max-w-[350px] lg:max-w-[400px] bg-white shadow-lg z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out border-l border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between px-3 py-3 sm:px-4 sm:py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-2">
            <button onClick={onClose} className="text-gray-600 hover:text-gray-900 p-1">
              <svg width="18" height="18" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <img src="/assets/Decoris P.svg" alt="Decoris Logo" width={70} height={14} className="opacity-60 sm:w-20 sm:h-4" />
          </div>
          <div className="flex items-center space-x-3 sm:space-x-4">
            <img src="/assets/profile.svg" alt="Profile" width={14} height={16} className="opacity-60 sm:w-4 sm:h-5" />
            <img src="/assets/favourite.svg" alt="Favourites" width={18} height={16} className="opacity-60 sm:w-5 sm:h-5" />
            <img src="/assets/BAG.svg" alt="Bag" width={14} height={16} className="opacity-60 sm:w-4 sm:h-5" />
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex justify-between items-center p-4 lg:p-6 mb-4 lg:mb-6">
          <h2 className="text-xs sm:text-sm font-normal tracking-widest flex items-center">
            WISHLIST 
            <span className="ml-2">
              <svg width="20" height="20" className="lg:w-6 lg:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.7071 17.7071C11.0976 18.0976 11.7309 18.0976 12.1213 17.7071L18.4853 11.3431C18.8758 10.9526 18.8758 10.3195 18.4853 9.92893C18.0948 9.53841 17.4616 9.53841 17.0711 9.92893L11.4142 15.5858L6.80712 10.9787C6.4166 10.5882 5.78343 10.5882 5.39291 10.9787C5.00239 11.3693 5.00239 12.0024 5.39291 12.3929L11.4142 18.4142C11.8047 18.8047 12.4379 18.8047 12.8284 18.4142L18.4853 12.7574C18.8758 12.3668 18.8758 11.7337 18.4853 11.3431C18.0948 10.9526 17.4616 10.9526 17.0711 11.3431L11.4142 16.9999L10.7071 17.7071Z" transform="rotate(90 12 12)" fill="black"/>
              </svg>
            </span>
          </h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900 text-2xl lg:text-3xl leading-none">
            &times;
          </button>
        </div>

        {/* Mobile Title */}
        <div className="md:hidden px-3 py-2 sm:px-4">
          <h2 className="text-xs sm:text-sm font-normal tracking-widest flex items-center">
            WISHLIST
            <span className="ml-2">
              <svg width="16" height="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </h2>
        </div>

        <div className="p-3 sm:p-4 md:px-6">
          {wishlistItems.length === 0 ? (
            <p className="text-xs text-gray-500 mb-4">You have 0 product(s) in your wishlist</p>
          ) : (
            <>
              <p className="text-xs text-gray-600 mb-4">You have {wishlistItems.length} product(s) in your wishlist.</p>
              <div className="space-y-4 sm:space-y-6 max-h-96 sm:max-h-[500px] overflow-y-auto">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="flex items-start pb-4 sm:pb-6 border-b border-gray-100 last:border-b-0">
                    <img src={item.image} alt={item.name} className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-cover mr-3 sm:mr-4 flex-shrink-0" />
                    <div className="flex-grow min-w-0">
                      <h3 className="text-xs font-medium text-gray-800 mb-1 leading-tight">{item.name}</h3>
                      <p className="text-xs text-gray-500 mb-1">£{item.price.toFixed(2)} <span className="text-gray-400">including VAT</span></p>
                      <p className="text-xs text-gray-500 mb-2">{item.sku}</p>
                      
                      <div className="flex justify-end">
                        <button 
                          onClick={() => onRemoveItem(item.id)}
                          className="text-red-500 text-xs hover:text-red-700 px-1 py-1"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistOverlay;