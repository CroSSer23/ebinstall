import React, { useRef } from 'react';
import { EquipmentItem } from '@/types/equipment';

interface EquipmentSliderProps {
  equipmentItems: EquipmentItem[];
}

const EquipmentSlider: React.FC<EquipmentSliderProps> = ({ equipmentItems }) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const slideWidth = 240; // Slide width + margin
      const scrollAmount = slideWidth * 3;
      
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth'
      });
    }
  };

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
    <section className="slider-section">
      <div className="slider-container">
        <h2 className="slider-title">Popular Equipment</h2>
        <div className="slider" ref={sliderRef}>
          {equipmentItems.map((item, index) => (
            <div 
              key={index} 
              className="slide" 
              title="Click to request"
              onClick={handleScrollToEnquiry}
            >
              <div className="slide-image">
                <div dangerouslySetInnerHTML={{ __html: item.svgIcon }} />
              </div>
              <div className="slide-content">
                <h3 className="slide-title">{item.name}</h3>
                <div className="slide-price">{item.price}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="slider-controls">
          <button 
            className="slider-button prev-button" 
            onClick={(e) => {
              e.stopPropagation();
              scrollSlider('left');
            }}
          >
            &#10094;
          </button>
          <button 
            className="slider-button next-button" 
            onClick={(e) => {
              e.stopPropagation();
              scrollSlider('right');
            }}
          >
            &#10095;
          </button>
        </div>
      </div>
    </section>
  );
};

export default EquipmentSlider; 