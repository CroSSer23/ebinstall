// Type for cart item (product with selected parameters)
export interface CartItem {
  id: string; // Unique identifier for the cart item
  type: string; // Equipment type (LeverHoist, RoundSling, WebbedSling, etc.)
  title: string; // Product name
  swl: string; // Safe Working Load
  length: string; // Length or HOL
  color?: string; // Color, if available
  price: number; // Price per week
  quantity: number; // Number of units
  image?: string; // Image URL, if available
}

// Type for customer information
export interface CustomerInfo {
  name: string;
  phone: string;
  email?: string;
  notes?: string;
}

// Type for the entire cart
export interface Cart {
  items: CartItem[];
  totalPrice: number;
  customer?: CustomerInfo;
}

// Type for notification
export interface Notification {
  visible: boolean;
  message: string;
  type: 'success' | 'error';
}

// Type for cart context
export interface CartContextType {
  cart: Cart;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setCustomerInfo: (info: CustomerInfo) => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  notification: Notification;
} 