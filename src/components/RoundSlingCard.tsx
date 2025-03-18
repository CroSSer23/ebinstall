'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { RoundSlingData } from '@/types/equipment';

interface RoundSlingCardProps {
  data?: RoundSlingData;
  defaultIcon?: string;
}

export default function RoundSlingCard({ data, defaultIcon }: RoundSlingCardProps) {
  const [selectedSWL, setSelectedSWL] = useState<string>('1t');
  const [selectedLength, setSelectedLength] = useState<string>('1m');
  const [price, setPrice] = useState<number>(0);

  // Данные по умолчанию, если не предоставлены данные из Google Sheets
  const defaultData: RoundSlingData = {
    swlOptions: ['1t', '2t', '3t', '5t', '10t'],
    lengthOptions: ['1m', '2m', '3m', '5m', '10m'],
    priceMapping: {
      '1t': {
        '1m': 20,
        '2m': 25,
        '3m': 30,
        '5m': 40,
        '10m': 60
      },
      '2t': {
        '1m': 25,
        '2m': 30,
        '3m': 35,
        '5m': 45,
        '10m': 70
      },
      '3t': {
        '1m': 30,
        '2m': 35,
        '3m': 40,
        '5m': 55,
        '10m': 85
      },
      '5t': {
        '1m': 40,
        '2m': 50,
        '3m': 60,
        '5m': 75,
        '10m': 110
      },
      '10t': {
        '1m': 60,
        '2m': 75,
        '3m': 90,
        '5m': 120,
        '10m': 180
      }
    },
    image: '/images/round-sling.jpg',
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
          messageField.value = `I would like to request a Round Sling with the following specifications:\n- SWL: ${selectedSWL}\n- Length: ${selectedLength}\n- Price: £${price} per week`;
          
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
    <div className="equipment-card round-sling-card">
      <h2>Round Sling</h2>
      
      <div className="equipment-content">
        <div className="equipment-image">
          {data && data.image && data.image.startsWith('/') ? (
            <Image 
              src={data.image} 
              alt="Round Sling" 
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