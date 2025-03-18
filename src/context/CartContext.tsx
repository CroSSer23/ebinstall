'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Cart, CartItem, CartContextType, CustomerInfo } from '@/types/cart';
import { v4 as uuidv4 } from 'uuid';

// Initialization of context with empty values
const CartContext = createContext<CartContextType | undefined>(undefined);

// Initial cart state
const initialCart: Cart = {
  items: [],
  totalPrice: 0
};

// Cart context provider
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Cart state
  const [cart, setCart] = useState<Cart>(initialCart);
  // Cart visibility state
  const [isCartOpen, setIsCartOpen] = useState(false);
  // Notification state
  const [notification, setNotification] = useState<{
    visible: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    visible: false,
    message: '',
    type: 'success'
  });
  
  // Load cart from localStorage on initialization
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);
  
  // Save cart to localStorage when it changes
  useEffect(() => {
    if (cart.items.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cart]);
  
  // Recalculate total price when cart items change
  useEffect(() => {
    const newTotalPrice = cart.items.reduce(
      (total, item) => total + item.price * item.quantity, 
      0
    );
    
    setCart(prevCart => ({
      ...prevCart,
      totalPrice: parseFloat(newTotalPrice.toFixed(2))
    }));
  }, [cart.items]);
  
  // Show notification
  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({
      visible: true,
      message,
      type
    });
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification(prev => ({ ...prev, visible: false }));
    }, 3000);
  };
  
  // Add item to cart
  const addToCart = (item: Omit<CartItem, 'id'>) => {
    setCart(prevCart => {
      // Check if the item already exists in the cart with the same parameters
      const existingItemIndex = prevCart.items.findIndex(
        i => i.type === item.type && 
            i.swl === item.swl && 
            i.length === item.length && 
            i.color === item.color
      );
      
      // If the item exists, increase its quantity
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevCart.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + item.quantity
        };
        
        return {
          ...prevCart,
          items: updatedItems
        };
      }
      
      // If the item doesn't exist, add it as new
      return {
        ...prevCart,
        items: [...prevCart.items, { ...item, id: uuidv4() }]
      };
    });
    
    // Show notification instead of opening the cart
    showNotification(`Added to cart: ${item.title} (${item.quantity})`);
  };
  
  // Remove item from cart
  const removeFromCart = (id: string) => {
    setCart(prevCart => ({
      ...prevCart,
      items: prevCart.items.filter(item => item.id !== id)
    }));
  };
  
  // Update item quantity
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCart(prevCart => ({
      ...prevCart,
      items: prevCart.items.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    }));
  };
  
  // Clear the cart
  const clearCart = () => {
    setCart(initialCart);
    localStorage.removeItem('cart');
  };
  
  // Set customer information
  const setCustomerInfo = (info: CustomerInfo) => {
    setCart(prevCart => ({
      ...prevCart,
      customer: info
    }));
  };
  
  // Open cart
  const openCart = () => setIsCartOpen(true);
  
  // Close cart
  const closeCart = () => setIsCartOpen(false);
  
  // Provide context
  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setCustomerInfo,
    isCartOpen,
    openCart,
    closeCart,
    notification
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
      {notification.visible && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </CartContext.Provider>
  );
};

// Hook for using cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 