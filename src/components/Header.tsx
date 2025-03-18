'use client';

import React from 'react';
import { FaPhone, FaEnvelope, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import Link from 'next/link';

const Header = () => {
  const { openCart, cart } = useCart();
  const cartItemCount = cart.items.length;

  return (
    <div className="top-header">
      <Link href="/" className="logo">
        <span className="eb-logo">EB</span>
        <span className="install-word">INSTALL</span>
      </Link>
      <div className="top-nav">
        <div className="contact-items">
          <div className="contact-item">
            <FaPhone size={14} />
            <a href="tel:+447478136061"> +44 7478 136061</a>
          </div>
          <div className="contact-item">
            <FaPhone size={14} />
            <a href="tel:+447340626369"> +44 7340 626369</a>
          </div>
          <div className="contact-item">
            <FaEnvelope size={14} />
            <a href="mailto:e.b.install.ltd@gmail.com"> e.b.install.ltd@gmail.com</a>
          </div>
        </div>
        <button className="cart-button" onClick={openCart}>
          <FaShoppingCart size={20} />
          {cartItemCount > 0 && (
            <span className="cart-item-count">{cartItemCount}</span>
          )}
          <span>Cart</span>
        </button>
      </div>
    </div>
  );
};

export default Header; 