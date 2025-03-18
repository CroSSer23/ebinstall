'use client';

import React from 'react';
import { FaPhone, FaEnvelope, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { openCart, cart } = useCart();
  const cartItemCount = cart.items.length;

  return (
    <div className="top-header">
      <a href="/" className="logo">
        <span className="eb-logo">EB</span>
        <span className="install-word">INSTALL</span>
      </a>
      <div className="top-nav">
        <div className="contact-items">
          <div className="contact-item">
            <FaPhone size={14} />
            <a href="tel:+44123456789"> +44 (12) 345-6789</a>
          </div>
          <div className="contact-item">
            <FaEnvelope size={14} />
            <a href="mailto:info@ebinstall.com"> info@ebinstall.com</a>
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