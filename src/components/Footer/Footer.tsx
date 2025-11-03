import React from 'react';
import './Footer.css';
import { type PageType } from '../../types';

interface FooterProps {
  onPageChange: (page: PageType) => void;
}

const Footer: React.FC<FooterProps> = ({ onPageChange }) => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>QUICK LINKS</h4>
          <a onClick={() => onPageChange('home')}>
            About Prof. Eidelman
          </a>
          <a onClick={() => onPageChange('clinics')}>My Clinics</a>
          <a onClick={() => onPageChange('services')}>Our Services</a>
          <a onClick={() => onPageChange('innovation')}>
            Surgical Innovation
          </a>
          <a onClick={() => onPageChange('guides')}>Patient Guides</a>
          <a onClick={() => onPageChange('study')}>Study Area</a>
        </div>
        <div className="footer-section">
          <h4>CONTACT</h4>
          <p>📍 Haifa & Kiryat Motzkin, Israel</p>
          <p>📞 +972 (0)4 123-4567</p>
          <p>📧 info@clinicemail.com</p>
          <p>24/7 Emergency Line Available</p>
        </div>
        <div className="footer-section">
          <h4>INFORMATION</h4>
          <a onClick={() => alert('Privacy Policy')}>
            Privacy Policy
          </a>
          <a onClick={() => alert('Terms of Service')}>
            Terms of Service
          </a>
          <a onClick={() => alert('Accessibility')}>Accessibility</a>
          <a onClick={() => alert('Sitemap')}>Sitemap</a>
        </div>
        <div className="footer-section">
          <h4>FOLLOW US</h4>
          <p>Connect on social media</p>
          <p style={{ fontSize: '20px', marginTop: '10px' }}>
            <a
              style={{
                textDecoration: 'none',
                color: '#3498db',
                cursor: 'pointer',
              }}
            >
              f
            </a>
            <a
              style={{
                textDecoration: 'none',
                color: '#3498db',
                cursor: 'pointer',
                marginLeft: '10px',
              }}
            >
              in
            </a>
            <a
              style={{
                textDecoration: 'none',
                color: '#3498db',
                cursor: 'pointer',
                marginLeft: '10px',
              }}
            >
              📷
            </a>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          © 2025 Prof. Mark Eidelman Orthopedic Clinic. All rights
          reserved.
        </p>
        <p>
          Haifa & Kiryat Motzkin, Israel | info@clinicemail.com | +972
          (0)4 123-4567
        </p>
      </div>
    </div>
  );
};

export default Footer;
