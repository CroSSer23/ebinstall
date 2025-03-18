'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { WebbedSlingData } from '@/types/equipment';

interface WebbedSlingCardProps {
  data?: WebbedSlingData;
  defaultIcon?: string;
}

export default function WebbedSlingCard({ data, defaultIcon }: WebbedSlingCardProps) {
  const [selectedSWL, setSelectedSWL] = useState<string>('1t');
  const [selectedLength, setSelectedLength] = useState<string>('1m');
  const [price, setPrice] = useState<number>(0);

  // Данные по умолчанию, если не предоставлены данные из Google Sheets
  const defaultData: WebbedSlingData = {
    swlOptions: ['1t', '2t', '3t', '5t', '10t'],
    lengthOptions: ['1m', '2m', '3m', '5m', '10m'],
    priceMapping: {
      '1t': {
        '1m': 15,
        '2m': 20,
        '3m': 25,
        '5m': 35,
        '10m': 50
      },
      '2t': {
        '1m': 20,
        '2m': 25,
        '3m': 30,
        '5m': 40,
        '10m': 60
      },
      '3t': {
        '1m': 25,
        '2m': 30,
        '3m': 35,
        '5m': 50,
        '10m': 75
      },
      '5t': {
        '1m': 35,
        '2m': 45,
        '3m': 55,
        '5m': 70,
        '10m': 100
      },
      '10t': {
        '1m': 55,
        '2m': 70,
        '3m': 85,
        '5m': 110,
        '10m': 160
      }
    },
    image: '/images/webbed-sling.jpg',
    availableColors: ['Purple', 'Green', 'Yellow', 'Grey', 'Red', 'Brown', 'Blue']
  };

  const slingData = data || defaultData;
  
  // Обновить цену при изменении выбранных параметров
  useEffect(() => {
    const newPrice = slingData.priceMapping[selectedSWL]?.[selectedLength] || 0;
    setPrice(newPrice);
  }, [selectedSWL, selectedLength, slingData]);

  // Инициализировать начальные выбранные значения
  useEffect(() => {
    if (slingData.swlOptions.length > 0) {
      setSelectedSWL(slingData.swlOptions[0]);
    }
    if (slingData.lengthOptions.length > 0) {
      setSelectedLength(slingData.lengthOptions[0]);
    }
  }, [slingData]);

  const handleSwlChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSWL(e.target.value);
  };

  const handleLengthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLength(e.target.value);
  };

  const handleRequestClick = () => {
    if (typeof window !== 'undefined') {
      const enquirySection = document.querySelector('.enquiry-section');
      if (enquirySection) {
        enquirySection.scrollIntoView({ behavior: 'smooth' });
        
        // Автоматически заполняем поле сообщения с выбранными параметрами
        const messageField = document.getElementById('message') as HTMLTextAreaElement;
        if (messageField) {
          messageField.value = `I would like to request a Webbed Sling with the following specifications:\n- SWL: ${selectedSWL}\n- Length: ${selectedLength}\n- Price: £${price} per week`;
          
          // Добавляем эффект пульсации для привлечения внимания
          const enquireButton = document.getElementById('enquire-button');
          if (enquireButton) {
            enquireButton.classList.add('pulse-animation');
            setTimeout(() => {
              enquireButton.classList.remove('pulse-animation');
            }, 1500);
          }
        }
      }
    }
  };

  return (
    <div className="equipment-card webbed-sling-card">
      <h2>Webbed Sling</h2>
      
      <div className="equipment-content">
        <div className="equipment-image">
          {data && data.image && data.image.startsWith('/') ? (
            <Image 
              src={data.image} 
              alt="Webbed Sling" 
              width={300} 
              height={300} 
              style={{ width: '100%', height: 'auto' }}
            />
          ) : defaultIcon ? (
            <div className="default-icon" dangerouslySetInnerHTML={{ __html: defaultIcon }} />
          ) : (
            <div className="placeholder-image">No image available</div>
          )}
        </div>
        
        <div className="equipment-config">
          <div className="config-row">
            <label htmlFor="swl-select">Safe Working Load (SWL):</label>
            <select 
              id="swl-select" 
              value={selectedSWL} 
              onChange={handleSwlChange}
              className="config-select"
            >
              {slingData.swlOptions.map(swl => (
                <option key={swl} value={swl}>{swl}</option>
              ))}
            </select>
          </div>
          
          <div className="config-row">
            <label htmlFor="length-select">Length:</label>
            <select 
              id="length-select" 
              value={selectedLength} 
              onChange={handleLengthChange}
              className="config-select"
            >
              {slingData.lengthOptions.map(length => (
                <option key={length} value={length}>{length}</option>
              ))}
            </select>
          </div>

          {slingData.availableColors && slingData.availableColors.length > 0 && (
            <div className="config-row">
              <label>Available Colors:</label>
              <div className="color-options">
                {slingData.availableColors.map(color => (
                  <span key={color} className="color-tag">{color}</span>
                ))}
              </div>
            </div>
          )}
          
          <div className="price-section">
            <span className="price-label">Price per week:</span>
            <span className="price-value">£{price}</span>
          </div>
          
          <button 
            className="request-btn"
            onClick={handleRequestClick}
          >
            Request Equipment
          </button>
        </div>
      </div>
    </div>
  );
} 