import React from 'react';
import { FaHandshake, FaHistory, FaUsers, FaCertificate } from 'react-icons/fa';

export default function CompanyInfo() {
  return (
    <section className="company-info">
      <div className="container">
        <h2 className="section-title">
          Elevator Equipment Rental — <span className="highlight">Easy and Convenient.</span>
        </h2>
        
        <div className="info-cards-container">
          <div className="info-card">
            <div className="card-icon">
              <FaHandshake size={20} color="#FFD700" />
            </div>
            <h3 className="info-title">Order in a Few Clicks</h3>
            <div className="card-content">
              <p className="info-text">
                We value your time, so we've made our rental process as simple as possible. There's no need to make any phone calls – you can do everything online.
              </p>
              <ul className="steps-list">
                <li><strong>Choose the equipment.</strong> Find the equipment you need in our catalog.</li>
                <li><strong>Place your order.</strong> Fill out a simple form on our website.</li>
                <li><strong>Confirm your order.</strong> We'll send you a confirmation email right away.</li>
                <li><strong>Pay</strong> after you've finished using the equipment.</li>
              </ul>
              <p className="info-text">
                After that, we'll deliver the equipment to the address you provide within a few hours.
              </p>
            </div>
          </div>
          
          <div className="info-card">
            <div className="card-icon">
              <FaHistory size={20} color="#FFD700" />
            </div>
            <h3 className="info-title">Save Time and Money</h3>
            <div className="card-content">
              <p className="info-text">
                Our service helps you save valuable resources:
              </p>
              <ul className="benefits-list">
                <li><strong>No unnecessary expenses.</strong> You don't need to purchase expensive equipment upfront or pay for storage. Just rent the equipment when you need it.</li>
                <li><strong>Rental reminders.</strong> We send you timely reminders about your rental period, so you can return the equipment on time and avoid extra charges.</li>
              </ul>
            </div>
          </div>
          
          <div className="info-card">
            <div className="card-icon">
              <FaUsers size={20} color="#FFD700" />
            </div>
            <h3 className="info-title">Experienced Team of Engineers</h3>
            <div className="card-content">
              <p className="info-text">
                We're proud of our team of experienced engineers. They're experts in elevator equipment and are always working to improve our rental service.
              </p>
              <p className="info-text">
                Thanks to their knowledge and experience, you'll receive reliable equipment and professional support every step of the way.
              </p>
            </div>
          </div>
          
          <div className="info-card">
            <div className="card-icon">
              <FaCertificate size={20} color="#FFD700" />
            </div>
            <h3 className="info-title">Honesty and Openness</h3>
            <div className="card-content">
              <p className="info-text">
                Our core principle is honesty. We value every customer and partner, so we work openly and fairly.
              </p>
              <p className="info-text accent">
                With us, renting equipment is simple, fast, and convenient!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 