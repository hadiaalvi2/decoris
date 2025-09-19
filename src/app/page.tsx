'use client';
import React, { useState } from 'react';
import ShoppingCartOverlay from './components/ShoppingCartOverlay';
import ProductImageOverlay from './components/ProductImageOverlay';
import WishlistOverlay from './components/WishlistOverlay';

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  // State for current main images on each page
  const [page1MainImage, setPage1MainImage] = useState('/assets/1.jpg');
  const [page2MainImage, setPage2MainImage] = useState('/assets/2.jpg');
  const [page3MainImage, setPage3MainImage] = useState('/assets/petal.jpg');
  const [currentProduct, setCurrentProduct] = useState({
    id: '1',
    name: 'Black Gold Glass Sculpture',
    price: 1500.00,
    image: '/assets/1.jpg',
    sku: '78821001',
  });

  const allProducts = [
    { id: '1', name: 'Black Gold Glass Sculpture', price: 1500.00, image: '/assets/1.jpg', sku: '78821001' },
    { id: '2', name: 'Gold Glass Sculpture', price: 2325.00, image: '/assets/2.jpg', sku: '78821002' },
    { id: '3', name: 'Marble White Black Coffee Table', price: 3400.00, image: '/assets/3.jpg', sku: '78821003' },
  ];

  React.useEffect(() => {
    setCurrentProduct(allProducts[currentPage - 1]);
  }, [currentPage]);

  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Gold Glass Sculpture', price: 2325.00, image: '/assets/2.jpg', quantity: 1 },
    { id: '2', name: 'Black Gold Glass Sculpture', price: 1500.00, image: '/assets/1.jpg', quantity: 1 },
    { id: '3', name: 'Marble White Black Coffee Table', price: 3400.00, image: '/assets/3.jpg', quantity: 1 },
    { id: '4', name: 'Black Glass Ornament', price: 1200.00, image: '/assets/1.jpg', quantity: 2 },
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
  };

  type WishlistItem = {
    id: string;
    name: string;
    price: number;
    image: string;
    sku: string;
  };

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
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
      return prevItems; // Item already in wishlist
    });
  };

  const removeFromWishlist = (itemId: string) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {currentPage === 1 && (
        <div className="min-h-screen relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/bg.jpg')" }}>

          <div className="relative z-10 w-full max-w-screen-2xl mx-auto">
            {/* Navigation */}
            <nav className="flex items-center justify-between px-4 py-4 md:px-8 lg:px-16 lg:py-6">
              <div className="flex items-start space-x-2 lg:space-x-3">
                <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                  <img
                    src="/assets/grid.svg"
                    alt="Menu"
                    width={20}
                    height={20}
                    className="mt-4"
                  />
                </button>
                <div className="hidden lg:flex flex-col items-start space-y-2">
                  <img
                    src="/assets/Decoris P.svg"
                    alt="Decoris Logo"
                    width={100}
                    height={20}
                    className="opacity-60"
                  />
                  <img
                    src="/assets/grid.svg"
                    alt="Grid"
                    width={20}
                    height={20}
                    className="opacity-100"
                  />
                </div>
              </div>
              <div className="hidden lg:flex items-center space-x-6 lg:space-x-10 text-xs font-medium tracking-widest uppercase">
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
              <div className="flex items-center space-x-4 lg:space-x-6">
                <img src="/assets/profile.svg" alt="Profile" width={19} height={22} className="opacity-60 hover:opacity-100 transition-opacity" />
                <img
                  src="/assets/favourite.svg"
                  alt="Favourites"
                  width={24}
                  height={22}
                  className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={() => setIsWishlistOpen(!isWishlistOpen)}
                />
                <div className="relative cursor-pointer" onClick={() => setIsCartOpen(!isCartOpen)}>
                  <img src="/assets/BAG.svg" alt="Bag" width={20} height={22} className="opacity-60 transition-opacity" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-black text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                      {totalItems}
                    </span>
                  )}
                </div>
              </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
              <div className="lg:hidden fixed inset-0 z-40 bg-white bg-opacity-95 flex flex-col items-center justify-center space-y-8 text-lg font-medium tracking-widest uppercase">
                <button className="absolute top-4 right-4 text-gray-800 text-3xl" onClick={() => setIsMobileMenuOpen(false)}>
                  &times;
                </button>
                <a href="#" className="text-gray-800 hover:underline" onClick={() => setIsMobileMenuOpen(false)}>INTERIOR</a>
                <a href="#" className="text-gray-800 hover:underline" onClick={() => setIsMobileMenuOpen(false)}>OUTDOOR</a>
                <a href="#" className="text-gray-800 hover:underline" onClick={() => setIsMobileMenuOpen(false)}>FURNITURE</a>
                <a href="#" className="text-gray-800 hover:underline" onClick={() => setIsMobileMenuOpen(false)}>DECOR</a>
                <a href="#" className="text-gray-800 hover:underline" onClick={() => setIsMobileMenuOpen(false)}>LIFESTYLE</a>
                <a href="#" className="text-gray-800 hover:underline" onClick={() => setIsMobileMenuOpen(false)}>OTHER</a>
                <a href="#" className="text-gray-800 hover:underline" onClick={() => setIsMobileMenuOpen(false)}>ABOUT</a>
                <a href="#" className="text-gray-800 hover:underline" onClick={() => setIsMobileMenuOpen(false)}>SHIPPING</a>
                <a href="#" className="text-gray-800 hover:underline" onClick={() => setIsMobileMenuOpen(false)}>CONTACT</a>
              </div>
            )}

            {/* Left Side Icons */}
            <div className="absolute top-36 left-4 p-0 z-20 md:top-1/2 md:-translate-y-1/2 md:left-16">
              <h3 className="text-gray-600 text-xs font-light mb-155 ml-1 tracking-wider mt-75">Black Gold Glass Sculpture</h3>
              <div className="space-y-4">
               <div className="w-8 h-8 flex items-center justify-center cursor-pointer">
                  <img src="/assets/share.svg" alt="Share" width={14} height={14} className="mr-25 mb-290  hover:opacity-100 transition-opacity" />
                </div>

                <div className="w-10 h-10 flex items-center justify-center cursor-pointer "
                onClick={() => addToWishlist(currentProduct)}>
              </div>

              <div className="w-10 h-10 flex items-center justify-center cursor-pointer ">
                <img src="/assets/square.svg" alt="View" width={20} height={20} className="mb-260 mr-25 mt-90  hover:opacity-100 transition-opacity" />
              </div>



              </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row min-h-fit pt-8">
              {/* Product Image */}
              <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-4 lg:pt-12 lg:pl-16">
                <div className="relative w-full h-full">
                  <div className="shadow-lg">
                    <img
                      src={page1MainImage}
                      alt="Black Gold Glass Sculpture"
                      className="w-full h-full object-contain"
                      onClick={() => setSelectedImage(page1MainImage)}
                    />
                  </div>
 
                  <div className="flex space-x-2 mt-6 justify-center">
                    {Array.from({ length: 8 }, (_, i) => (
                      <div
                        key={i + 1}
                        className={`w-[120px] border cursor-pointer transition-colors hover:border-gray-600 overflow-hidden ${
                          page1MainImage === `/page/${i + 1}.jpg` ? 'border-gray-800' : 'border-gray-400'
                        }`}
                        onClick={() => setPage1MainImage(`/page/${i + 1}.jpg`)}
                      >
                        <img
                          src={`/page/${i + 1}.jpg`}
                          alt={`Thumbnail ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-gray-600 tracking-wide leading-relaxed text-center mt-6 max-w-sm mx-auto opacity-60 sm:max-w-lg">
                    This item is carefully crafted by skilled artisans, who devote continuous care to its creation.
                    As a result of its handmade and hand-finished nature, variations in glass, marble, metal, woodwork, and or other materials are to
                    be expected and celebrated. Each item is unique and possesses its individuality, ensuring that no two items are exactly alike.
                  </p>
                </div>
              </div>

              {/* Product Details */}
              <div className="w-full lg:w-1/2 px-4 pt-4 lg:pr-16 flex flex-col justify-center">
                <div className="max-w-lg p-8 rounded-sm mx-auto">
                  <p className="text-xs text-gray-600 mb-6 tracking-widest">78821001</p>

                  <div className="mb-8">
                    <p className="text-gray-600 leading-relaxed text-xs mb-6 tracking-wide">
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

                  <div className="mb-8">
                    <div className="text-xl font-semibold mb-1 text-gray-800 tracking-wide">
                      £1,500.00 <span className="text-xs text-gray-600 ml-2">Including VAT</span>
                    </div>
                    <p className="text-xs text-gray-600 tracking-widest">GBP</p>
                  </div>

                  <div className="mb-8">
                    <p className="text-xs text-gray-600 mb-4 tracking-wide">
                      Estimated Delivery Time: 6-8 weeks (on order confirmation)
                    </p>
                  </div>

                  <button
                    className="w-full  text-gray-800 py-3 px-8 border border-gray-800 text-xs font-normal tracking-widest uppercase transition-colors "
                    onClick={() => addToCart({ id: '1', name: 'Black Gold Glass Sculpture', price: 1500.00, image: '/assets/1.jpg' })}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Second Page */}
      <div className="min-h-screen relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/page/bg2.jpg')" }}>

        {/* Content container with relative positioning */}
        <div className="relative z-10 min-h-screen">
          <nav className="flex items-center justify-between px-4 py-4 md:px-8 lg:px-16 lg:py-6">
            <div className="flex items-start space-x-2 lg:space-x-3">
              <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <img
                  src="/assets/grid.svg"
                  alt="Menu"
                  width={20}
                  height={20}
                  className="opacity-60"
                />
              </button>
              <div className="hidden lg:flex flex-col items-start space-y-2">
                <img
                  src="/assets/Decoris P.svg"
                  alt="Decoris Logo"
                  width={100}
                  height={20}
                  className="opacity-60"
                />
                <img
                  src="/assets/grid.svg"
                  alt="Grid"
                  width={20}
                  height={20}
                  className="opacity-100"
                />
              </div>
            </div>


            <div className="flex items-center space-x-4 lg:space-x-6">
              <img src="/assets/profile.svg" alt="Profile" width={19} height={22} className="opacity-60 hover:opacity-100 transition-opacity" />
              <img
                src="/assets/favourite.svg"
                alt="Favourites"
                width={24}
                height={22}
                className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                onClick={() => setIsWishlistOpen(!isWishlistOpen)}
              />
              <div className="relative cursor-pointer" onClick={() => setIsCartOpen(!isCartOpen)}>
                <img src="/assets/BAG.svg" alt="Bag" width={20} height={22} className="opacity-60 transition-opacity" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    {totalItems}
                  </span>
                )}
              </div>
            </div>
          </nav>

          {/* Mobile Menu Overlay for Page 2 */}
          {isMobileMenuOpen && (
            <div className="lg:hidden fixed inset-0 z-40 bg-white bg-opacity-95 flex flex-col items-center justify-center space-y-8 text-lg font-medium tracking-widest uppercase">
              <button className="absolute top-4 right-4 text-gray-800 text-3xl" onClick={() => setIsMobileMenuOpen(false)}>
                &times;
              </button>
              <a href="#" className="text-gray-800 hover:underline" onClick={() => setIsMobileMenuOpen(false)}>INTERIOR</a>
              <a href="#" className="text-gray-800 hover:underline" onClick={() => setIsMobileMenuOpen(false)}>OUTDOOR</a>
              <a href="#" className="text-gray-800 hover:underline" onClick={() => setIsMobileMenuOpen(false)}>FURNITURE</a>
              <a href="#" className="text-gray-800 hover:underline" onClick={() => setIsMobileMenuOpen(false)}>DECOR</a>
              <a href="#" className="text-gray-800 hover:underline" onClick={() => setIsMobileMenuOpen(false)}>LIFESTYLE</a>
              <a href="#" className="text-gray-800 hover:underline" onClick={() => setIsMobileMenuOpen(false)}>OTHER</a>
              <a href="#" className="text-gray-800 hover:underline" onClick={() => setIsMobileMenuOpen(false)}>ABOUT</a>
              <a href="#" className="text-gray-800 hover:underline" onClick={() => setIsMobileMenuOpen(false)}>SHIPPING</a>
              <a href="#" className="text-gray-800 hover:underline" onClick={() => setIsMobileMenuOpen(false)}>CONTACT</a>
            </div>
          )}

          <div className="absolute top-24 left-4 p-0 z-20 md:left-8 md:top-1/2 md:-translate-y-1/2">
            <h3 className="text-gray-600 text-xs font-light mb-143 ml-22 tracking-wider mt-100">Black Gold Glass Sculpture</h3>
            <div className="space-y-4">
              <div className="w-10 h-10 flex items-center justify-center cursor-pointer mb-90">
                <img src="/assets/share.svg" alt="Share" width={14} height={14} className="mr-20 mb-290 ml-34 mt-22  hover:opacity-100 transition-opacity" />
                </div>

              <div className="w-10 h-10 flex items-center justify-center cursor-pointer "
                onClick={() => addToWishlist(currentProduct)}>
              </div>

              <div className="w-10 h-10 flex items-center justify-center cursor-pointer ">
                <img src="/assets/square.svg" alt="View" width={20} height={20} className="mb-260 ml-20  hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>

          <div className="flex min-h-screen flex-col md:flex-row">
            <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
              <div className="relative w-full max-w-lg">
                <div className="shadow-lg">
                  <img src={page2MainImage} alt="Black Gold Glass Sculpture" className="w-full h-auto object-contain"
                    onClick={() => setSelectedImage(page2MainImage)}
                  />
                </div>

                <div className="flex space-x-2 mt-4 justify-center">
                  {['/page/9.jpg', '/page/2.jpg', '/page/3.jpg', '/page/4.jpg', '/page/5.jpg', '/page/6.jpg', '/page/7.jpg', '/page/8.jpg'].map((imagePath, index) => (
                    <div key={index} className={`w-14 h-14 bg-gray-200 border cursor-pointer transition-colors hover:border-gray-400 overflow-hidden ${
                      page2MainImage === imagePath ? 'border-gray-800' : 'border-gray-500'
                    }`}
                      onClick={() => setPage2MainImage(imagePath)}>
                      <img src={imagePath} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-600 tracking-wide leading-relaxed text-center mt-6 max-w-sm mx-auto opacity-60 sm:max-w-lg">
                  This item is carefully crafted by skilled artisans, who devote continuous care to its creation.
                  As a result of its handmade and hand-finished nature, variations in glass, marble, metal, woodwork, and or other materials are to
                  be expected and celebrated. Each item is unique and possesses its individuality, ensuring that no two items are exactly alike.
                </p>
              </div>
            </div>

            <div className="w-1/2 px-4 pt-4 lg:p-12 flex flex-col justify-center">
              <div className="max-w-lg p-8 mx-auto">
                <p className="text-xs text-gray-700 mb-6 tracking-wider">78821001</p>

                <div className="mb-8">
                  <p className="text-gray-700 leading-relaxed text-xs mb-6 tracking-wide">
                    Upon entering this dazzling estate through the porte-cochere with incredible
                    blends of steel, wood, and stone, your senses are delighted by the combination
                    of breathtaking panoramic views, unparalleled privacy, perfect ski access, and
                    the precise sophistication of the construction and design. Award-Winning
                    Architecture and Interior Design Firm Bridgewater Consulting Group perfected
                    their consistent philosophy of marrying design and function with a functional
                    flow that perfectly frames the surrounding landscapes while providing multiple
                    four seasons of outdoor lounges complete with resort-style amenities...
                  </p>
                  <p className="text-xs text-gray-700 tracking-wide">
                    Glass | 18ct Gold | Black | 6.5kg | H100mm x W400mm x L650mm
                  </p>
                </div>

                <div className="mb-8">
                  <div className="text-xl font-semibold mb-1 text-gray-800 tracking-wide">
                    £1,500.00 <span className="text-xs text-gray-600 ml-2">Including VAT</span>
                  </div>
                  <p className="text-xs text-gray-600 tracking-widest">GBP</p>
                </div>

                <div className="mb-8">
                  <p className="text-xs text-gray-600 mb-4 tracking-wide">
                    Estimated Delivery Time: 6-8 weeks (on order confirmation)
                  </p>
                </div>

                <button
                  className="w-full  text-gray-800 py-3 px-8 border border-gray-800 text-xs font-normal tracking-widest uppercase transition-colors "
                  onClick={() => addToCart({ id: '2', name: 'Black Gold Glass Sculpture', price: 1500.00, image: '/assets/2.jpg' })}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>


        </div>
      </div>

      {/* Third Page */}
      <div className="min-h-screen relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/bg.jpg')" }}>

        {/* Content container with relative positioning */}
        <div className="relative z-10 min-h-screen">
          <nav className="flex items-center justify-between px-4 py-4 md:px-8 lg:px-16 lg:py-6">
            <div className="flex items-start space-x-2 lg:space-x-3">
              <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <img
                  src="/assets/grid.svg"
                  alt="Menu"
                  width={20}
                  height={20}
                  className="opacity-60"
                />
              </button>
              <div className="hidden lg:flex flex-col items-start space-y-2">
                <img
                  src="/assets/Decoris P.svg"
                  alt="Decoris Logo"
                  width={100}
                  height={20}
                  className="opacity-60"
                />
                <img
                  src="/assets/grid.svg"
                  alt="Grid"
                  width={20}
                  height={20}
                  className="opacity-100"
                />
              </div>
            </div>


            <div className="flex items-center space-x-4 lg:space-x-6">
              <img src="/assets/profile.svg" alt="Profile" width={19} height={22} className="opacity-60 hover:opacity-100 transition-opacity" />
              <img
                src="/assets/favourite.svg"
                alt="Favourites"
                width={24}
                height={22}
                className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                onClick={() => setIsWishlistOpen(!isWishlistOpen)}
              />
              <div className="relative cursor-pointer" onClick={() => setIsCartOpen(!isCartOpen)}>
                <img src="/assets/BAG.svg" alt="Bag" width={20} height={22} className="opacity-60 transition-opacity" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    {totalItems}
                  </span>
                )}
              </div>
            </div>
          </nav>

          {/* Mobile Menu Overlay for Page 3 */}
          {isMobileMenuOpen && (
            <div className="lg:hidden fixed inset-0 z-40 bg-white bg-opacity-95 flex flex-col items-center justify-center space-y-8 text-lg font-medium tracking-widest uppercase">
              <button className="absolute top-4 right-4 text-gray-800 text-3xl" onClick={() => setIsMobileMenuOpen(false)}>
                &times;
              </button>
              <a href="#" className="text-gray-800 hover:underline" onClick={() => setIsMobileMenuOpen(false)}>INTERIOR</a>
              <a href="#" className="text-gray-800 hover:underline" onClick={() => setIsMobileMenuOpen(false)}>OUTDOOR</a>
              <a href="#" className="text-gray-800 hover:underline" onClick={() => setIsMobileMenuOpen(false)}>FURNITURE</a>
              <a href="#" className="text-gray-800 hover:underline" onClick={() => setIsMobileMenuOpen(false)}>DECOR</a>
              <a href="#" className="text-gray-800 hover:underline" onClick={() => setIsMobileMenuOpen(false)}>LIFESTYLE</a>
              <a href="#" className="text-gray-800 hover:underline" onClick={() => setIsMobileMenuOpen(false)}>OTHER</a>
              <a href="#" className="text-gray-800 hover:underline" onClick={() => setIsMobileMenuOpen(false)}>ABOUT</a>
              <a href="#" className="text-gray-800 hover:underline" onClick={() => setIsMobileMenuOpen(false)}>SHIPPING</a>
              <a href="#" className="text-gray-800 hover:underline" onClick={() => setIsMobileMenuOpen(false)}>CONTACT</a>
            </div>
          )}

          <div className="absolute top-24 left-4 p-0 z-20 md:left-8 md:top-1/2 md:-translate-y-1/2">
         

            <div className="space-y-4">
              <div className="w-10 h-10 flex items-center justify-center cursor-pointer ">
               <img src="/assets/share.svg" alt="Share" width={14} height={14} className="mr-20 ml-10 mb-75 hover:opacity-100 transition-opacity" />
                </div>


              <div className="w-10 h-10 flex items-center justify-center cursor-pointer "
                onClick={() => addToWishlist(currentProduct)}>
              </div>

              <div className="w-10 h-10 flex items-center justify-center cursor-pointer ">
                <img src="/assets/square.svg" alt="View" width={20} height={20} className=" mr-7 mt-55 hover:opacity-100 transition-opacity" />
              </div>
              
            </div>
          </div>



          <div className="flex min-h-fit flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-4 lg:pt-12 lg:pl-16">
              <div className="relative w-full h-full">
                <div className="shadow-lg">
                  <img src={page3MainImage} alt="Black Gold Glass Sculpture" className="w-full h-auto object-contain"
                    onClick={() => setSelectedImage(page3MainImage)}
                  />
                </div>

                <div className="flex space-x-2 mt-6 justify-center">
                  {Array.from({ length: 8 }, (_, i) => (
                    <div
                      key={i + 1}
                      className={`w-[120px] border cursor-pointer transition-colors hover:border-gray-600 overflow-hidden ${
                        page3MainImage === `/page/${i + 1}.jpg` ? 'border-gray-800' : 'border-gray-400'
                      }`}
                      onClick={() => setPage3MainImage(`/page/${i + 1}.jpg`)}
                    >
                      <img
                        src={`/page/${i + 1}.jpg`}
                        alt={`Thumbnail ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-600 tracking-wide leading-relaxed text-center mt-6 max-w-sm mx-auto opacity-60 sm:max-w-lg">
                  This item is carefully crafted by skilled artisans, who devote continuous care to its creation.
                  As a result of its handmade and hand-finished nature, variations in glass, marble, metal, woodwork, and or other materials are to
                  be expected and celebrated. Each item is unique and possesses its individuality, ensuring that no two items are exactly alike.
                </p>
              </div>
            </div>

            <div className="w-1/2 px-4 pt-4 lg:p-12 flex flex-col justify-center">
              <div className="max-w-lg p-8 mx-auto">
                <p className="text-xs text-gray-700 mb-6 tracking-wider">78821001</p>

                <div className="mb-8">
                  <p className="text-gray-700 leading-relaxed text-xs mb-6 tracking-wide">
                    Upon entering this dazzling estate through the porte-cochere with incredible
                    blends of steel, wood, and stone, your senses are delighted by the combination
                    of breathtaking panoramic views, unparalleled privacy, perfect ski access, and
                    the precise sophistication of the construction and design. Award-Winning
                    Architecture and Interior Design Firm Bridgewater Consulting Group perfected
                    their consistent philosophy of marrying design and function with a functional
                    flow that perfectly frames the surrounding landscapes while providing multiple
                    four seasons of outdoor lounges complete with resort-style amenities...
                  </p>
                  <p className="text-xs text-gray-700 tracking-wide">
                    Glass | 18ct Gold | Black | 6.5kg | H100mm x W400mm x L650mm
                  </p>
                </div>

                <div className="mb-8">
                  <div className="text-xl font-semibold mb-1 text-gray-800 tracking-wide">
                    £1,500.00 <span className="text-xs text-gray-600 ml-2">Including VAT</span>
                  </div>
                  <p className="text-xs text-gray-600 tracking-widest">GBP</p>
                </div>

                <div className="mb-8">
                  <p className="text-xs text-gray-600 mb-4 tracking-wide">
                    Estimated Delivery Time: 6-8 weeks (on order confirmation)
                  </p>
                </div>

                <button
                  className="w-full bg-black text-white py-3 px-8 border border-gray-800 text-xs font-normal tracking-widest uppercase transition-colors "
                  onClick={() => addToCart({ id: '3', name: 'DECORIS Sculpture', price: 1500.00, image: '/assets/petal.jpg' })}
                >
                  ADD TO CART
                </button>
              </div>
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
      <ProductImageOverlay
        imageUrl={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
      <WishlistOverlay
        isOpen={isWishlistOpen}
        wishlistItems={wishlistItems}
        onClose={() => setIsWishlistOpen(false)}
        onRemoveItem={removeFromWishlist}
      />
    </>
  );
}