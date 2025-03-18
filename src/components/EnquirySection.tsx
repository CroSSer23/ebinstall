import React from 'react';

const EnquirySection: React.FC = () => {
  return (
    <section className="enquiry-section" id="enquiry-form">
      <h2 className="enquiry-title">Need Equipment for Your Project?</h2>
      <p className="enquiry-text">
        Submit a request and we&apos;ll help you select the right equipment 
        to meet your technical requirements and project timeline.
      </p>
      <a href="#" id="enquire-button" className="enquiry-button">
        Request Equipment
      </a>
      <div className="contact-info">
        <p>Call us: <a href="tel:+447478136061">+44 7478 136061</a></p>
        <p>Call us: <a href="tel:+447340626369">+44 7340 626369</a></p>
        <p>Email: <a href="mailto:e.b.install.ltd@gmail.com">e.b.install.ltd@gmail.com</a></p>
      </div>
    </section>
  );
};

export default EnquirySection; 