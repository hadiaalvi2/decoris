import React from 'react';
import Image from 'next/image';

type CartItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  sku?: string;
};

type ShoppingCartOverlayProps = {
  isOpen: boolean;
  cartItems: CartItem[];
  onClose: () => void;
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
};

const ShoppingCartOverlay = ({ isOpen, cartItems, onClose, onRemoveItem, onUpdateQuantity }: ShoppingCartOverlayProps) => {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-40" 
      onClick={onClose} 
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)' }}
    >
      <div 
        className="fixed right-0 top-0 h-full w-full xs:w-80 sm:w-96 md:max-w-[350px] lg:max-w-[400px] xl:max-w-[450px] bg-white shadow-lg z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out border-l border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between px-3 py-3 sm:px-4 sm:py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-2">
            <button 
              onClick={onClose} 
              className="text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Close cart"
            >
              <svg width="16" height="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <Image 
              src="/assets/Decoris P.svg" 
              alt="Decoris Logo" 
              width={70} 
              height={14} 
              className="opacity-60 sm:w-20 sm:h-4" 
            />
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Image src="/assets/profile.svg" alt="Profile" width={14} height={16} className="opacity-60 sm:w-4 sm:h-5" />
            <Image src="/assets/favourite.svg" alt="Favourites" width={14} height={16} className="opacity-60 sm:w-2 sm:h-2" />
            <Image src="/assets/BAG.svg" alt="Bag" width={14} height={16} className="opacity-60 sm:w-4 sm:h-5" />
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex justify-between items-center p-4 lg:p-6 mb-2 lg:mb-4">
          <h2 className="text-xs sm:text-sm font-normal tracking-widest">SHOPPING CART</h2>
          <button 
            onClick={onClose} 
            className="text-gray-600 hover:text-gray-900 text-2xl lg:text-3xl leading-none hover:bg-gray-100 rounded-full w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center transition-colors"
            aria-label="Close cart"
          >
            &times;
          </button>
        </div>

        {/* Mobile Title */}
        <div className="md:hidden px-3 py-2 sm:px-4">
          <h2 className="text-xs sm:text-sm font-normal tracking-widest flex items-center">
            SHOPPING CART
            <span className="ml-2">
              <svg width="14" height="14" className="sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </h2>
        </div>

        {/* Cart Content */}
        <div className="p-3 sm:p-4 md:px-4 lg:px-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <div className="mb-4">
                <Image src="/assets/BAG.svg" alt="Empty Cart" width={32} height={32} className="mx-auto opacity-30 sm:w-10 sm:h-10" />
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mb-2">Your cart is empty</p>
              <p className="text-xs text-gray-400">Add some beautiful items to get started</p>
            </div>
          ) : (
            <>
              <p className="text-xs sm:text-sm text-gray-600 mb-4 lg:mb-6">
                You have {cartItems.reduce((sum, item) => sum + item.quantity, 0)} product(s) in your shopping cart
              </p>
              
              {/* Cart Items */}
              <div className="space-y-3 sm:space-y-4 lg:space-y-6 max-h-72 xs:max-h-80 sm:max-h-96 lg:max-h-[400px] overflow-y-auto overlay-scroll">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start pb-3 sm:pb-4 lg:pb-6 border-b border-gray-100 last:border-b-0">
                    <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mr-3 sm:mr-4 flex-shrink-0 overflow-hidden rounded-sm">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        width={80}
                        height={80}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h3 className="text-xs sm:text-sm font-medium text-gray-800 mb-1 leading-tight pr-2">
                        {item.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">
                        £{item.price.toFixed(2)} <span className="text-gray-400">Including VAT</span>
                      </p>
                      <p className="text-xs text-gray-500 mb-2 sm:mb-3">{item.sku || '78621091'}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs sm:text-sm text-gray-600">Qty: {item.quantity}</span>
                          <div className="hidden sm:flex items-center space-x-1">
                            <button 
                              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <button 
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button 
                          onClick={() => onRemoveItem(item.id)}
                          className="text-red-500 text-xs sm:text-sm hover:text-red-700 px-2 py-1 hover:bg-red-50 rounded transition-colors"
                          aria-label={`Remove ${item.name}`}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="mt-4 sm:mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm sm:text-base font-medium text-gray-800">Total:</span>
                  <span className="text-lg sm:text-xl font-semibold text-gray-900">£{calculateTotal()}</span>
                </div>
              </div>
            </>
          )}

          {/* View Cart Button */}
          <button 
            className="w-full text-white py-3 sm:py-4 px-4 text-xs sm:text-sm font-normal tracking-widest hover:bg-opacity-90 mt-4 sm:mt-6 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#29003A' }}
            disabled={cartItems.length === 0}
          >
            {cartItems.length === 0 ? 'CART IS EMPTY' : 'VIEW SHOPPING CART'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartOverlay;