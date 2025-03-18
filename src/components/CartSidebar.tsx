'use client';
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { CustomerInfo } from '@/types/cart';

// Cart sidebar component
const CartSidebar: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    closeCart, 
    removeFromCart, 
    updateQuantity,
    clearCart,
    setCustomerInfo
  } = useCart();
  
  // State for customer information
  const [customerInfo, setCustomerFormInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    email: '',
    notes: ''
  });
  
  // State for checkout form display
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  
  // State for form errors
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [orderStatus, setOrderStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  // Handle customer info form changes
  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerFormInfo(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field error on input
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Form validation
  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {};
    
    if (!customerInfo.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!customerInfo.phone.trim()) {
      errors.phone = 'Phone is required';
    } else if (!/^[\d\s\+\-\(\)]{10,15}$/.test(customerInfo.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    if (customerInfo.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      errors.email = 'Please enter a valid email';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Submit order
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Update customer info in context
    setCustomerInfo(customerInfo);
    
    // Отправляем заказ на сервер
    try {
      // Send data via email
      const emailContent = `
New order from ${customerInfo.name}:

Contact Information:
Name: ${customerInfo.name}
Phone: ${customerInfo.phone}
Email: ${customerInfo.email || 'Not provided'}
Notes: ${customerInfo.notes || 'None'}

Ordered Items:
${cart.items.map(item => 
  `- ${item.title} (${item.quantity} units)
   SWL: ${item.swl}, Length: ${item.length}
   Price: £${item.price.toFixed(2)} × ${item.quantity} = £${(item.price * item.quantity).toFixed(2)}`
).join('\n\n')}

Total: £${cart.totalPrice.toFixed(2)}
      `;
      
      // Format parameters for mailto link
      const subject = encodeURIComponent('New order from website');
      const body = encodeURIComponent(emailContent);
      const mailtoLink = `mailto:info@ebinstall.co.uk?subject=${subject}&body=${body}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // If successful
      setOrderStatus('success');
      setTimeout(() => {
        clearCart();
        closeCart();
        setOrderStatus('idle');
        setShowCheckoutForm(false);
      }, 3000);
    } catch (error) {
      console.error('Error sending order:', error);
      setOrderStatus('error');
    }
  };
  
  // If cart is closed, don't render the component
  if (!isCartOpen) {
    return null;
  }
  
  return (
    <div className="cart-sidebar-overlay">
      <div className="cart-sidebar">
        <div className="cart-header">
          <h2>Cart</h2>
          <button className="close-cart" onClick={closeCart}>×</button>
        </div>
        
        {cart.items.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button className="continue-shopping" onClick={closeCart}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.items.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <h3>{item.title}</h3>
                    <div className="cart-item-details">
                      <p>SWL: {item.swl}, Length: {item.length}</p>
                      {item.color && <p>Color: {item.color}</p>}
                      <p className="item-price">£{item.price.toFixed(2)} / week</p>
                    </div>
                  </div>
                  
                  <div className="cart-item-actions">
                    <div className="quantity-control">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="quantity-btn"
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="quantity-btn"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="remove-item"
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div className="cart-item-total">
                    £{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <div className="cart-total">
                <span>Total:</span>
                <span>£{cart.totalPrice.toFixed(2)}</span>
              </div>
              
              {!showCheckoutForm ? (
                <div className="cart-buttons">
                  <button 
                    className="checkout-button"
                    onClick={() => setShowCheckoutForm(true)}
                  >
                    Checkout
                  </button>
                  <button 
                    className="clear-cart-button"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitOrder} className="checkout-form">
                  <h3>Your Information</h3>
                  
                  <div className="form-group">
                    <label htmlFor="name">Name*</label>
                    <input 
                      type="text"
                      id="name"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleCustomerInfoChange}
                      required
                    />
                    {formErrors.name && <span className="error">{formErrors.name}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Phone*</label>
                    <input 
                      type="tel"
                      id="phone"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleCustomerInfoChange}
                      required
                    />
                    {formErrors.phone && <span className="error">{formErrors.phone}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                      type="email"
                      id="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleCustomerInfoChange}
                    />
                    {formErrors.email && <span className="error">{formErrors.email}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="notes">Order Notes</label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={customerInfo.notes}
                      onChange={handleCustomerInfoChange}
                      rows={3}
                    />
                  </div>
                  
                  <div className="form-buttons">
                    <button 
                      type="submit" 
                      className="submit-order"
                      disabled={orderStatus === 'loading'}
                    >
                      {orderStatus === 'loading' ? 'Sending...' : 'Send Order'}
                    </button>
                    <button 
                      type="button"
                      className="back-to-cart"
                      onClick={() => setShowCheckoutForm(false)}
                    >
                      Back to Cart
                    </button>
                  </div>
                  
                  {orderStatus === 'success' && (
                    <div className="success-message">
                      Order sent successfully! We will contact you soon.
                    </div>
                  )}
                  
                  {orderStatus === 'error' && (
                    <div className="error-message">
                      An error occurred when sending your order. Please try again or contact us directly.
                    </div>
                  )}
                </form>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartSidebar; 