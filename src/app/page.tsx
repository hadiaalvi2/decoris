'use client';
import React, { useState } from 'react';
import ShoppingCartOverlay from './components/ShoppingCartOverlay';
import WishlistOverlay from './components/WishlistOverlay';
import Image from 'next/image';

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  
  // State for current main image
  const [mainImage, setMainImage] = useState('/Product Images/1.png');
  
  // Product data for each image
  const products = [
    {
      id: '1',
      name: 'Black Gold Glass Sculpture',
      price: 1500.00,
      image: '/Product Images/1.png',
      sku: '78621091',
    },
    {
      id: '2',
      name: 'Gold Glass Sculpture',
      price: 2325.00,
      image: '/Product Images/2.png',
      sku: '78621113',
    },
    {
      id: '3',
      name: 'Marble White Black Coffee Table',
      price: 3400.00,
      image: '/Product Images/3.png',
      sku: '78622459',
    },
    {
      id: '4',
      name: 'Black Glass Ornament',
      price: 1200.00,
      image: '/Product Images/4.png',
      sku: '78622487',
    },
    {
      id: '5',
      name: 'Gold Brass Sculpture',
      price: 2500.00,
      image: '/Product Images/5.png',
      sku: '78621114',
    },
    {
      id: '6',
      name: 'Silver Glass Sculpture',
      price: 1800.00,
      image: '/Product Images/6.png',
      sku: '78621115',
    },
    {
      id: '7',
      name: 'Crystal Glass Table',
      price: 4200.00,
      image: '/Product Images/7.png',
      sku: '78622460',
    },
    {
      id: '8',
      name: 'Modern Glass Art',
      price: 1600.00,
      image: '/Product Images/8.png',
      sku: '78622488',
    },
  ];

  const currentProduct = products[0]; // Default to first product

  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Gold Glass Sculpture', price: 2325.00, image: '/assets/2.jpg', quantity: 1, sku: '78821113' },
    { id: '2', name: 'Black Gold Glass Sculpture', price: 1500.00, image: '/assets/1.jpg', quantity: 1, sku: '78821091' },
    { id: '3', name: 'Marble White Black Coffee Table', price: 3400.00, image: '/assets/3.jpg', quantity: 1, sku: '78822459' },
    { id: '4', name: 'Black Glass Ornament', price: 1200.00, image: '/assets/1.jpg', quantity: 2, sku: '78822487' },
  ]);

  const [wishlistItems, setWishlistItems] = useState([
    { id: '1', name: 'Gold Glass Sculpture', price: 2500.00, image: '/assets/1.jpg', sku: '78821113' },
    { id: '2', name: 'Black Gold Glass Sculpture', price: 1500.00, image: '/assets/2.jpg', sku: '78821091' },
    { id: '3', name: 'Marble White Black Coffee Table', price: 3400.00, image: '/assets/3.jpg', sku: '78822459' },
    { id: '4', name: 'Black Glass Ornament', price: 1200.00, image: '/assets/1.jpg', sku: '78822487' },
  ]);

  type Product = {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity?: number;
    sku: string;
  };

  type WishlistItem = {
    id: string;
    name: string;
    price: number;
    image: string;
    sku: string;
  };

  type CartItem = {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    sku: string;
  };

  const addToCart = (product: Product) => {
    setCartItems((prevItems: CartItem[]) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const addToWishlist = (product: WishlistItem) => {
    setWishlistItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (!existingItem) {
        return [...prevItems, product];
      }
      return prevItems; 
    });
  };

  const removeFromWishlist = (itemId: string) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <div className="min-h-screen relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/bg.jpg')" }}>
        <div className="relative z-10 w-full max-w-screen-2xl mx-auto">
          {/* Navigation */}
          <nav className="flex items-center justify-between px-3 py-3 sm:px-4 sm:py-4 md:px-8 lg:px-16 lg:py-6">
            <div className="flex items-start space-x-2 lg:space-x-3">
              <button className="lg:hidden mt-2 sm:mt-4" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <Image
                  src="/assets/grid.svg"
                  alt="Menu"
                  width={18}
                  height={18}
                  className="sm:w-5 sm:h-5"
                />
              </button>
              <div className="hidden lg:flex flex-col items-start space-y-2">
                <Image
                  src="/assets/Decoris P.svg"
                  alt="Decoris Logo"
                  width={80}
                  height={16}
                  className="opacity-60 xl:w-24 xl:h-5"
                />
                <Image
                  src="/assets/grid.svg"
                  alt="Grid"
                  width={20}
                  height={20}
                  className="opacity-100"
                />
              </div>
            </div>
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-10 text-xs font-medium tracking-widest uppercase">
              <a href="#" className="text-gray-600 hover:underline">INTERIOR</a>
              <a href="#" className="text-gray-600 hover:underline">OUTDOOR</a>
              <a href="#" className="text-gray-600 hover:underline">FURNITURE</a>
              <a href="#" className="text-gray-600 hover:underline">DECOR</a>
              <a href="#" className="text-gray-600 hover:underline">LIFESTYLE</a>
              <a href="#" className="text-gray-600 hover:underline">OTHER</a>
              <a href="#" className="text-gray-600 hover:underline">ABOUT</a>
              <a href="#" className="text-gray-600 hover:underline">SHIPPING</a>
              <a href="#" className="text-gray-600 hover:underline">CONTACT</a>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6">
              <Image src="/assets/profile.svg" alt="Profile" width={16} height={19} className="opacity-60 hover:opacity-100 transition-opacity sm:w-4 sm:h-5 lg:w-5 lg:h-6" />
              <Image
  src="/assets/favourite.svg"
  alt="Favourites"
  width={9}
  height={8}
  className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
  onClick={() => setIsWishlistOpen(!isWishlistOpen)}
/>
              <div className="relative cursor-pointer" onClick={() => setIsCartOpen(!isCartOpen)}>
                <Image src="/assets/BAG.svg" alt="Bag" width={17} height={19} className="opacity-60 transition-opacity sm:w-4 sm:h-5 lg:w-5 lg:h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-black text-white rounded-full w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center text-xs">
                    {totalItems}
                  </span>
                )}
              </div>
            </div>
          </nav>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div className="lg:hidden fixed inset-0 z-40 bg-white">
              {/* Header */}
              <div className="flex items-center justify-between px-3 py-3 sm:px-4 sm:py-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <Image
                    src="/assets/grid.svg"
                    alt="Grid"
                    width={18}
                    height={18}
                    className="opacity-100 sm:w-5 sm:h-5"
                  />
                  <Image
                    src="/assets/Decoris P.svg"
                    alt="Decoris Logo"
                    width={70}
                    height={14}
                    className="opacity-60 sm:w-20 sm:h-4"
                  />
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <Image src="/assets/profile.svg" alt="Profile" width={14} height={16} className="opacity-60 sm:w-4 sm:h-5" />
                 <Image src="/assets/favourite.svg" alt="Favourites" width={9} height={8} className="opacity-60" />
                  <Image src="/assets/BAG.svg" alt="Bag" width={14} height={16} className="opacity-60 sm:w-4 sm:h-5" />
                </div>
              </div>

              {/* Menu Items */}
              <div className="flex-1 px-3 py-4 sm:px-4 sm:py-6">
                <nav className="space-y-4 sm:space-y-6">
                  <a href="#" className="block text-xs sm:text-sm font-normal text-gray-800 hover:text-gray-600 tracking-widest">INTERIOR</a>
                  <a href="#" className="block text-xs sm:text-sm font-normal text-gray-800 hover:text-gray-600 tracking-widest">OUTDOOR</a>
                  <a href="#" className="block text-xs sm:text-sm font-normal text-gray-800 hover:text-gray-600 tracking-widest">FURNITURE</a>
                  <a href="#" className="block text-xs sm:text-sm font-normal text-gray-800 hover:text-gray-600 tracking-widest">DECOR</a>
                  <a href="#" className="block text-xs sm:text-sm font-normal text-gray-800 hover:text-gray-600 tracking-widest">LIFESTYLE</a>
                  <a href="#" className="block text-xs sm:text-sm font-normal text-gray-800 hover:text-gray-600 tracking-widest">OTHER</a>
                  <a href="#" className="block text-xs sm:text-sm font-normal text-gray-800 hover:text-gray-600 tracking-widest">ABOUT</a>
                  <a href="#" className="block text-xs sm:text-sm font-normal text-gray-800 hover:text-gray-600 tracking-widest">SHIPPING</a>
                  <a href="#" className="block text-xs sm:text-sm font-normal text-gray-800 hover:text-gray-600 tracking-widest">CONTACT</a>
                </nav>
              </div>

              {/* Footer */}
              <div className="px-3 py-4 sm:px-4 sm:py-6 border-t border-gray-200">
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>EUROS | ENGLISH</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">© COPYRIGHT 2021 DECORIS ARTFUL UK. SOUTH KENSINGTON.</p>
              </div>
            </div>
          )}

          {/* Left Side Icons */}
          <div className="absolute top-20 left-2 p-0 z-20 sm:top-24 sm:left-3 md:top-32 md:left-4 lg:top-1/2 lg:-translate-y-1/2 lg:left-12">
            <h3 className="text-black text-xs font-light mb-4 ml-2 tracking-wider sm:text-sm lg:mb-120">Black Gold Glass Sculpture</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full transition-colors">
                <img src="/assets/share.svg" alt="Share" width={12} height={12} className="sm:w-3.5 sm:h-3.5 mr-12 mb-220" />
              </div>
              <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full transition-colors">
                <img src="/assets/square.svg" alt="View" width={14} height={14} className="sm:w-4 sm:h-4 mr-9 mb-40" />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row min-h-screen pt-4 sm:pt-6 lg:pt-8">
            {/* Product Image */}
            <div className="w-full lg:w-3/5 flex items-center justify-center px-3 py-4 sm:px-6 sm:py-8 lg:pt-12 lg:pl-16">
              <div className="relative w-full max-w-5xl">
               
                <div>
                  <Image
                    src={mainImage}
                    alt="Black Gold Glass Sculpture"
                    width={800}
                    height={500}
                    className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover"
                  />
                </div>
 
              <div className="flex space-x-1.5 sm:space-x-2 mt-3 sm:mt-4 justify-center overflow-x-auto pb-2">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="w-16 h-12 sm:w-20 sm:h-14 md:w-24 md:h-16 cursor-pointer transition-all duration-200 overflow-hidden flex-shrink-0"
                    onClick={() => {
                      setMainImage(product.image);
                    }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={96}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

               <p className="text-xs text-gray-600 mt-2 sm:mt-3 opacity-60 mb-4">
  This item is carefully crafted by skilled artisans, who devote continuous care to its creation.
  As a result of its handmade and hand-finished nature, variations in glass, marble, metal, woodwork, and or other materials are to
  be expected and celebrated. Each item is unique and possesses its individuality, ensuring that no two items are exactly alike.
</p>

              </div>
            </div>

            {/* Product Details */}
            <div className="w-full lg:w-2/5 px-4 py-4 sm:px-8 sm:py-8 lg:pr-20 flex flex-col justify-center mb-40">
              <div className="max-w-lg mx-auto">
                <p className="text-xs text-black-600 mb-1 tracking-widest">Black Gold Glass Sculpture</p>
                <p className="text-xs text-gray-600 mb-4 tracking-widest">78621091</p>

                <div className="mb-6">
                  <p className="text-gray-600 leading-relaxed text-xs mb-4 tracking-wide">
                    Upon entering this dazzling estate through the porte-cochere with incredible
                    blends of steel, wood, and stone, your senses are delighted by the combination
                    of breathtaking panoramic views, unparalleled privacy, perfect ski access, and
                    the precise sophistication of the construction and design. Award-Winning
                    Architecture and Interior Design Firm Bridgewater Consulting Group perfected
                    their consistent philosophy of marrying design and function with a functional
                    flow that perfectly frames the surrounding landscapes while providing multiple
                    four seasons of outdoor lounges complete with resort-style amenities...
                  </p>
                  <p className="text-xs text-gray-600 tracking-wide">
                    Glass | 18ct Gold | Black | 6.5kg | H100mm x W400mm x L650mm
                  </p>
                </div>

                <div className="mb-6">
                  <div className="text-lg font-semibold mb-1 text-gray-800 tracking-wide">
                    £1,800.00 <span className="text-xs text-gray-600 ml-2">Including VAT</span>
                  </div>
                  <p className="text-xs text-gray-600 tracking-widest">GBP</p>
                </div>

                <div className="mb-6">
                  <p className="text-xs text-gray-600 mb-4 tracking-wide">
                    Estimated Delivery Time: 6-8 weeks (on order confirmation)
                  </p>
                </div>

                <button
                  className="mt-9 w-full text-gray-800 py-3 px-4 border border-gray-800 text-xs font-normal tracking-widest uppercase transition-colors hover:bg-[#29003A] hover:text-white"
                  onClick={() => addToCart(currentProduct)}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </div>

        <ShoppingCartOverlay
          isOpen={isCartOpen}
          cartItems={cartItems}
          onClose={() => setIsCartOpen(false)}
          onRemoveItem={(itemId: string | number) =>
            setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
          }
          onUpdateQuantity={(itemId: string | number, newQuantity: number) =>
            setCartItems((prevItems) =>
              prevItems.map((item) =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
              )
            )
          }
        />
        <WishlistOverlay
          isOpen={isWishlistOpen}
          wishlistItems={wishlistItems}
          onClose={() => setIsWishlistOpen(false)}
          onRemoveItem={removeFromWishlist}
        />
      </div>
    </>
  );
}