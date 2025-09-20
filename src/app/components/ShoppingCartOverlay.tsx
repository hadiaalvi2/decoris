import React from 'react';

type CartItem = {
  id: string | number;
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
  onRemoveItem: (id: string | number) => void;
  onUpdateQuantity: (id: string | number, quantity: number) => void;
};

const ShoppingCartOverlay = ({ isOpen, cartItems, onClose, onRemoveItem, onUpdateQuantity }: ShoppingCartOverlayProps) => {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

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
          <h2 className="text-xs sm:text-sm font-normal tracking-widest">SHOPPING CART</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900 text-2xl lg:text-3xl leading-none">
            &times;
          </button>
        </div>

        {/* Mobile Title */}
        <div className="md:hidden px-3 py-2 sm:px-4">
          <h2 className="text-xs sm:text-sm font-normal tracking-widest flex items-center">
            SHOPPING CART
            <span className="ml-2">
              <svg width="16" height="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </h2>
        </div>

        <div className="p-3 sm:p-4 md:px-6">
          {cartItems.length === 0 ? (
            <p className="text-xs text-gray-500 mb-4">You have 0 product(s) in your shopping cart</p>
          ) : (
            <>
              <p className="text-xs text-gray-600 mb-4">You have {cartItems.reduce((sum, item) => sum + item.quantity, 0)} product(s) in your shopping cart</p>
              <div className="space-y-4 sm:space-y-6 max-h-96 sm:max-h-[500px] overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start pb-4 sm:pb-6 border-b border-gray-100 last:border-b-0">
                    <img src={item.image} alt={item.name} className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-cover mr-3 sm:mr-4 flex-shrink-0" />
                    <div className="flex-grow min-w-0">
                      <h3 className="text-xs font-medium text-gray-800 mb-1 leading-tight">{item.name}</h3>
                      <p className="text-xs text-gray-500 mb-1">£{item.price.toFixed(2)} <span className="text-gray-400">Including VAT</span></p>
                      <p className="text-xs text-gray-500 mb-2">{item.sku || '78621091'}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Quantity: {item.quantity}</span>
                        <button 
                          onClick={() => onRemoveItem(item.id)}
                          className="text-red-500 text-xs hover:text-red-700 ml-2 px-1 py-1"
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

          <button 
            className="w-full text-white py-3 px-4 text-xs font-normal tracking-widest hover:bg-opacity-90 mt-4 sm:mt-6 transition-colors"
            style={{ backgroundColor: '#29003A' }}
          >
            VIEW SHOPPING CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartOverlay;