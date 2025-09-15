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
        className="fixed right-0 top-0 h-full w-full max-w-[350px] bg-white shadow-lg z-50 p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out border-l border-gray-200"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the cart
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-sm font-normal tracking-widest">SHOPPING CART</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900 text-3xl leading-none">
            &times;
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-xs text-gray-500 mb-4">You have 0 product(s) in your shopping cart</p>
        ) : (
          <>
            <p className="text-xs text-gray-600 mb-4">You have {cartItems.length} product(s) in your shopping cart</p>
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center mb-4 border-b pb-4 last:border-b-0">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover mr-4 rounded" />
                <div className="flex-grow text-sm">
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">£{item.price.toFixed(2)} <span className="text-gray-400">excluding VAT</span></p>
                  <p className="text-xs text-gray-500">78821001</p>
                  
                  <div className="flex items-center space-x-2 mt-2">
                    <p className="text-xs text-gray-600">Quantity: {item.quantity}</p>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity === 1}
                      className="text-gray-500 hover:text-gray-700 disabled:opacity-50 text-base"
                    >
                      -
                    </button>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="text-gray-500 hover:text-gray-700 text-base"
                    >
                      +
                    </button>
                    
                  </div>
                </div>
                <button 
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-500 text-xs hover:text-red-700"
                >
                    Remove
                </button>
              </div>
            ))}
            <div className="flex justify-between items-center mt-6 pt-4 border-t">
              <span className="text-sm font-medium">SUBTOTAL</span>
              <span className="text-sm font-medium">£{calculateTotal()}</span>
            </div>
          </>
        )}

        <button className="mt-8 w-full bg-black text-white py-3 tracking-wider hover:bg-gray-800">
          VIEW SHOPPING CART
        </button>
      </div>
    </div>
  );
};

export default ShoppingCartOverlay;
