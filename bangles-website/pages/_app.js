import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('bangles_cart');
    if (saved) setCart(JSON.parse(saved));
    const savedWish = localStorage.getItem('bangles_wishlist');
    if (savedWish) setWishlist(JSON.parse(savedWish));
  }, []);

  const addToCart = (product) => {
    const updated = [...cart];
    const idx = updated.findIndex(i => i.id === product.id);
    if (idx > -1) updated[idx].qty += 1;
    else updated.push({ ...product, qty: 1 });
    setCart(updated);
    localStorage.setItem('bangles_cart', JSON.stringify(updated));
  };

  const removeFromCart = (id) => {
    const updated = cart.filter(i => i.id !== id);
    setCart(updated);
    localStorage.setItem('bangles_cart', JSON.stringify(updated));
  };

  const updateQty = (id, qty) => {
    if (qty < 1) { removeFromCart(id); return; }
    const updated = cart.map(i => i.id === id ? { ...i, qty } : i);
    setCart(updated);
    localStorage.setItem('bangles_cart', JSON.stringify(updated));
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.find(i => i.id === product.id);
    const updated = exists ? wishlist.filter(i => i.id !== product.id) : [...wishlist, product];
    setWishlist(updated);
    localStorage.setItem('bangles_wishlist', JSON.stringify(updated));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('bangles_cart');
  };

  return (
    <>
      <Navbar cartCount={cart.reduce((a, i) => a + i.qty, 0)} wishCount={wishlist.length} />
      <Component
        {...pageProps}
        cart={cart}
        wishlist={wishlist}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        updateQty={updateQty}
        toggleWishlist={toggleWishlist}
        clearCart={clearCart}
      />
      <Footer />
    </>
  );
}
