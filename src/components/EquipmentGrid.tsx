import React from 'react';
import { EquipmentDetail } from '@/types/equipment';

interface EquipmentGridProps {
  equipmentItems: EquipmentDetail[];
}

const EquipmentGrid: React.FC<EquipmentGridProps> = ({ equipmentItems }) => {
  const handleScrollToEnquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const enquirySection = document.querySelector('.enquiry-section');
    if (enquirySection) {
      enquirySection.scrollIntoView({ behavior: 'smooth' });
      
      const enquireButton = document.getElementById('enquire-button');
      if (enquireButton) {
        enquireButton.classList.add('pulse-animation');
        setTimeout(() => {
          enquireButton.classList.remove('pulse-animation');
        }, 1500);
      }
    }
  };

  return (
    <section className="equipment-list">
      <h2 className="equipment-title">Equipment Catalogue</h2>
      <div className="equipment-grid">
        {equipmentItems.map((item, index) => (
          <div 
            key={index} 
            className="equipment-card" 
            title="Click to request this equipment" 
            onClick={handleScrollToEnquiry}
          >
            <div className="equipment-image">
              <div dangerouslySetInnerHTML={{ __html: item.svgIcon }} />
            </div>
            <div className="equipment-details">
              <h3 className="equipment-name">{item.name}</h3>
              <div className="equipment-specs">
                {item.specs.map((spec, specIndex) => (
                  <div key={specIndex} className="spec-item">{spec}</div>
                ))}
              </div>
              <div className="equipment-price">{item.price}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EquipmentGrid; 