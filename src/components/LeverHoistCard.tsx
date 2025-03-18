'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { LeverHoistData } from '@/types/equipment';

interface LeverHoistCardProps {
  data?: LeverHoistData;
  defaultIcon?: string;
}

export default function LeverHoistCard({ data, defaultIcon }: LeverHoistCardProps) {
  const [selectedSWL, setSelectedSWL] = useState<string>('0.5t');
  const [selectedHOL, setSelectedHOL] = useState<string>('1.5m');
  const [price, setPrice] = useState<number>(0);
  // Состояния для отображения/скрытия UI элементов, которые могут быть использованы в будущем
  // const [showPriceTable, setShowPriceTable] = useState(false);
  // const [showSpecifications, setShowSpecifications] = useState(false);
  
  // Данные по умолчанию, если не предоставлены данные из Google Sheets
  const defaultData: LeverHoistData = {
    swlOptions: ['0.5t', '0.75t', '1.5t', '3.0t', '6.0t'],
    holOptions: ['1.5m', '3m', '6m'],
    priceMapping: {
      '0.5t': {
        '1.5m': 25,
        '3m': 35,
        '6m': 45
      },
      '0.75t': {
        '1.5m': 30,
        '3m': 40,
        '6m': 55
      },
      '1.5t': {
        '1.5m': 45,
        '3m': 55,
        '6m': 75
      },
      '3.0t': {
        '1.5m': 65,
        '3m': 85,
        '6m': 115
      },
      '6.0t': {
        '1.5m': 120,
        '3m': 150,
        '6m': 195
      }
    },
    image: '/images/lever-hoist.jpg'
  };

  const hoistData = data || defaultData;
  
  // Обновить цену при изменении выбранных параметров
  useEffect(() => {
    const newPrice = hoistData.priceMapping[selectedSWL]?.[selectedHOL] || 0;
    setPrice(newPrice);
  }, [selectedSWL, selectedHOL, hoistData]);

  // Инициализировать начальные выбранные значения
  useEffect(() => {
    if (hoistData.swlOptions.length > 0) {
      setSelectedSWL(hoistData.swlOptions[0]);
    }
    if (hoistData.holOptions.length > 0) {
      setSelectedHOL(hoistData.holOptions[0]);
    }
  }, [hoistData]);

  const handleSwlChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSWL(e.target.value);
  };

  const handleHolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedHOL(e.target.value);
  };
  
  const handleRequestClick = () => {
    if (typeof window !== 'undefined') {
      const enquirySection = document.querySelector('.enquiry-section');
      if (enquirySection) {
        enquirySection.scrollIntoView({ behavior: 'smooth' });
        
        // Автоматически заполняем поле сообщения с выбранными параметрами
        const messageField = document.getElementById('message') as HTMLTextAreaElement;
        if (messageField) {
          messageField.value = `I would like to request a Lever Hoist with the following specifications:\n- SWL: ${selectedSWL}\n- HOL: ${selectedHOL}\n- Price: £${price} per week`;
          
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
    <div className="equipment-card lever-hoist-card">
      <h2>Lever Hoist</h2>
      
      <div className="equipment-content">
        <div className="equipment-image">
          {hoistData.image && hoistData.image.startsWith('/') ? (
            <Image 
              src={hoistData.image} 
              alt="Lever Hoist" 
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
              {hoistData.swlOptions.map(swl => (
                <option key={swl} value={swl}>{swl}</option>
              ))}
            </select>
          </div>
          
          <div className="config-row">
            <label htmlFor="hol-select">Height of Lift (HOL):</label>
            <select 
              id="hol-select" 
              value={selectedHOL} 
              onChange={handleHolChange}
              className="config-select"
            >
              {hoistData.holOptions.map((hol: string) => (
                <option key={hol} value={hol}>{hol}</option>
              ))}
            </select>
          </div>
          
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
      
      {/* {showPriceTable && (
        <div className="pricing-table">
          <div className="price-table-scroller">
            <table>
              <thead>
                <tr>
                  <th>SWL</th>
                  <th>HOL</th>
                  <th>Price per Week</th>
                </tr>
              </thead>
              <tbody>
                {hoistData.swlOptions.flatMap(swl => {
                  return hoistData.holOptions.map((hol: string) => {
                    const priceMap = hoistData.priceMapping[swl];
                    const price = priceMap ? priceMap[hol] : '';
                    return (
                      <tr 
                        key={`${swl}-${hol}`} 
                        className={selectedSWL === swl && selectedHOL === hol ? 'selected-row' : ''}
                        onClick={() => {
                          setSelectedSWL(swl);
                          setSelectedHOL(hol);
                        }}
                      >
                        <td>{swl}</td>
                        <td>{hol}</td>
                        <td>{price}</td>
                      </tr>
                    );
                  });
                })}
              </tbody>
            </table>
          </div>
        </div>
      )} */}
    </div>
  );
} 