'use client';
import React from 'react';
import { useCart } from '@/context/CartContext';

const CartButton: React.FC = () => {
  const { cart, openCart } = useCart();
  
  // Вычисляем общее количество товаров в корзине
  const itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <button 
      className="cart-button" 
      onClick={openCart}
      aria-label="Открыть корзину"
    >
      <div className="cart-icon">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        {itemCount > 0 && (
          <span className="cart-item-count">{itemCount}</span>
        )}
      </div>
      <span className="cart-label">Корзина</span>
    </button>
  );
};

export default CartButton; 