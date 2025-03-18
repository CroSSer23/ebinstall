'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { EquipmentTypes } from '@/types/equipment';
import { useCart } from '@/context/CartContext';

interface EquipmentCardProps {
  type: string;
  title: string;
  data?: any;
  defaultIcon?: string;
}

const EquipmentCard: React.FC<EquipmentCardProps> = ({ type, title, data, defaultIcon }) => {
  const [selectedSWL, setSelectedSWL] = useState<string>('');
  const [selectedLength, setSelectedLength] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [showPriceTable, setShowPriceTable] = useState<boolean>(false);
  const [showSpecs, setShowSpecs] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  
  // Get cart context
  const { addToCart } = useCart();
  
  // Define some properties based on type
  const isLeverHoist = type === EquipmentTypes.LeverHoist;
  const isRoundSling = type === EquipmentTypes.RoundSling;
  const isWebbedSling = type === EquipmentTypes.WebbedSling;
  
  // Define CSS class for the card
  const getCardClass = () => {
    // Base class for all cards
    let baseClass = 'equipment-card catalog-item';
    
    // For standard types add their specific styles
    if (isLeverHoist) return `${baseClass} leverHoist-card`;
    if (isRoundSling) return `${baseClass} roundSling-card`;
    if (isWebbedSling) return `${baseClass} webbedSling-card`;
    
    // For other types just return base class
    return baseClass;
  };

  // Use first available SWL and length options on first render
  useEffect(() => {
    if (data) {
      // Select first SWL option
      if (data.swlOptions && data.swlOptions.length > 0) {
        setSelectedSWL(data.swlOptions[0]);
      }
      
      // Select first length option
      if (data.lengthOptions && data.lengthOptions.length > 0) {
        setSelectedLength(data.lengthOptions[0]);
      }
      
      // Update price
      updatePrice(
        data.swlOptions ? data.swlOptions[0] : '',
        data.lengthOptions ? data.lengthOptions[0] : ''
      );
    }
  }, [data]);

  // Use effect to update price when selector values change
  useEffect(() => {
    if (selectedSWL && selectedLength) {
      updatePrice(selectedSWL, selectedLength);
    }
  }, [selectedSWL, selectedLength, data]);

  // Price update function
  const updatePrice = (swl: string, length: string) => {
    if (!data || !data.priceMapping) {
      console.log('No price mapping data available');
      setPrice(0);
      return;
    }
    
    // Check different formats of price data structure
    if (data.priceMapping[swl] && data.priceMapping[swl][length]) {
      // Structure priceMapping[swl][length]
      const newPrice = data.priceMapping[swl][length];
      setPrice(newPrice);
    } else {
      // Check alternative format key "swl|length"
      const key = `${swl}|${length}`;
      if (data.priceMapping[key]) {
        const newPrice = data.priceMapping[key];
        setPrice(newPrice);
      } else if (data.basePrice) {
        setPrice(data.basePrice);
      } else {
        setPrice(0);
      }
    }
  };

  // Value change handlers
  const handleSWLChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSWL = e.target.value;
    setSelectedSWL(newSWL);
    updatePrice(newSWL, selectedLength);
  };

  const handleLengthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLength = e.target.value;
    setSelectedLength(newLength);
    updatePrice(selectedSWL, newLength);
  };
  
  // Quantity selection handlers
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Function to add item to cart
  const handleAddToCart = () => {
    addToCart({
      type,
      title,
      swl: selectedSWL,
      length: selectedLength,
      color: data.selectedColor ? data.selectedColor : undefined,
      price,
      quantity,
      image: data.image || ''
    });
  };

  // If no data, return empty component
  if (!data) {
    return null;
  }

  return (
    <div className={getCardClass()}>
      {/* Card header */}
      <h2>{title}</h2>
      
      <div className="equipment-content">
        {/* Equipment image */}
        <div className="equipment-image">
          {data.image ? (
            <Image 
              src={data.image} 
              alt={title} 
              width={100} 
              height={100} 
              style={{ objectFit: 'contain' }} 
            />
          ) : defaultIcon ? (
            <div dangerouslySetInnerHTML={{ __html: defaultIcon }} />
          ) : (
            <div className="no-image">No image</div>
          )}
        </div>
        
        <div className="equipment-details">
          {/* Configuration selectors */}
          <div className="equipment-config">
            {/* SWL and length selectors */}
            {data.swlOptions && data.swlOptions.length > 0 && (
              <div className="config-row">
                <label className="config-label">Safe Working Load:</label>
                <select className="config-select" value={selectedSWL} onChange={handleSWLChange}>
                  {data.swlOptions.map((swl: string) => (
                    <option key={swl} value={swl}>{swl}</option>
                  ))}
                </select>
              </div>
            )}
            
            {data.lengthOptions && data.lengthOptions.length > 0 && (
              <div className="config-row">
                <label className="config-label">Length:</label>
                <select className="config-select" value={selectedLength} onChange={handleLengthChange}>
                  {data.lengthOptions.map((length: string) => (
                    <option key={length} value={length}>{length}</option>
                  ))}
                </select>
              </div>
            )}
            
            {/* Available colors section */}
            {data.availableColors && data.availableColors.length > 0 && (
              <div className="colors-row">
                <div className="config-label">Available Colors:</div>
                <div className="color-options">
                  {data.availableColors.map((color: string, index: number) => (
                    <span key={index} className="color-tag">{color}</span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity selection */}
            <div className="quantity-selector">
              <span className="quantity-selector-label">Quantity:</span>
              <div className="quantity-selector-controls">
                <button 
                  type="button" 
                  className="quantity-selector-btn"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <input
                  type="number"
                  className="quantity-selector-value"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                />
                <button 
                  type="button" 
                  className="quantity-selector-btn"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          
          {/* Price */}
          <div className="price-section">
            <div className="price-label">Weekly Price:</div>
            <div className="price-value">£{price.toFixed(2)}</div>
          </div>
          
          {/* Specifications - button and content */}
          {data.specs && data.specs.length > 0 && (
            <div className="specs-accordion">
              <button 
                className="specs-toggle" 
                onClick={() => setShowSpecs(!showSpecs)}
              >
                Specifications
                <span className={`toggle-icon ${showSpecs ? 'open' : ''}`}>
                  ▼
                </span>
              </button>
              
              {showSpecs && (
                <div className="specs-content">
                  <ul className="specs-list">
                    {data.specs.map((spec: string, index: number) => (
                      <li key={index} className="spec-item">{spec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          
          {/* Buttons */}
          <div className="action-buttons">
            <button 
              className="add-to-cart-button" 
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentCard; 