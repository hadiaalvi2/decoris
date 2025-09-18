import React from 'react';

type CartItem = {
  id: string | number;
  name: string;
  image: string;
  price: number;
  quantity: number;
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
        className="fixed right-0 top-0 h-full w-full md:max-w-[350px] bg-white shadow-lg z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out border-l border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <img src="/assets/grid.svg" alt="Grid" width={20} height={20} className="opacity-100" />
            <img src="/assets/Decoris P.svg" alt="Decoris Logo" width={80} height={16} className="opacity-60" />
          </div>
          <div className="flex items-center space-x-4">
            <img src="/assets/profile.svg" alt="Profile" width={16} height={18} className="opacity-60" />
            <img src="/assets/favourite.svg" alt="Favourites" width={20} height={18} className="opacity-60" />
            <img src="/assets/BAG.svg" alt="Bag" width={16} height={18} className="opacity-60" />
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex justify-between items-center p-6 mb-6">
          <h2 className="text-sm font-normal tracking-widest">SHOPPING CART</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900 text-3xl leading-none">
            &times;
          </button>
        </div>

        {/* Mobile Title */}
        <div className="md:hidden px-4 py-2">
          <h2 className="text-sm font-normal tracking-widest flex items-center">
            SHOPPING CART
            <span className="ml-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </h2>
        </div>

        <div className="p-4 md:px-6">
          {cartItems.length === 0 ? (
            <p className="text-xs text-gray-500 mb-4">You have 0 product(s) in your shopping cart</p>
          ) : (
            <>
              <p className="text-xs text-gray-600 mb-4">You have {cartItems.length} product(s) in your shopping cart</p>
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-start mb-6 pb-6 border-b border-gray-100 last:border-b-0">
                  <img src={item.image} alt={item.name} className="w-16 h-16 md:w-20 md:h-20 object-cover mr-4 flex-shrink-0" />
                  <div className="flex-grow min-w-0">
                    <h3 className="text-xs font-medium text-gray-800 mb-1">{item.name}</h3>
                    <p className="text-xs text-gray-500 mb-1">£{item.price.toFixed(2)} <span className="text-gray-400">excluding VAT</span></p>
                    <p className="text-xs text-gray-500 mb-2">78821001</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Quantity: {item.quantity}</span>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity === 1}
                          className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 disabled:opacity-50 text-sm border border-gray-300"
                        >
                          -
                        </button>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 text-sm border border-gray-300"
                        >
                          +
                        </button>
                        <button 
                          onClick={() => onRemoveItem(item.id)}
                          className="text-red-500 text-xs hover:text-red-700 ml-2"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          <button className="w-full bg-black text-white py-3 px-4 text-xs font-normal tracking-widest hover:bg-gray-800 mt-6">
            VIEW SHOPPING CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartOverlay;