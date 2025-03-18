'use client';

import React, { useEffect } from 'react';
import Header from '@/components/Header';
import MainHeader from '@/components/MainHeader';
import CompanyInfo from '@/components/CompanyInfo';
import EquipmentContainer from '@/components/EquipmentContainer';
import EnquirySection from '@/components/EnquirySection';
import '@/styles/components.css';

export default function Home() {
  useEffect(() => {
    // Добавить обработчик клика для кнопки "Get a Quote"
    if (typeof window !== 'undefined') {
      const quoteButton = document.querySelector('.quote-button');
      if (quoteButton) {
        quoteButton.addEventListener('click', scrollToEnquiry);
      }

      return () => {
        // Очистка обработчика событий при размонтировании
        if (quoteButton) {
          quoteButton.removeEventListener('click', scrollToEnquiry);
        }
      };
    }
  }, []);

  const scrollToEnquiry = (e: React.MouseEvent | Event) => {
    e.preventDefault();
    
    if (typeof window !== 'undefined') {
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
    }
  };

  return (
    <main>
      <Header />
      <MainHeader />
      <CompanyInfo />
      <EquipmentContainer />
      <EnquirySection />
    </main>
  );
}
