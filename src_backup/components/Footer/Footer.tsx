import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { MapPinSimple, Phone, At } from '@phosphor-icons/react';

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>QUICK LINKS</h4>
          <Link to="/">About Prof. Eidelman</Link>
          <Link to="/clinics">My Clinics</Link>
          <Link to="/services">Our Services</Link>
          <Link to="/innovation">Surgical Innovation</Link>
          <Link to="/guides">Patient Guides</Link>
          <Link to="/study">Study Area</Link>
        </div>
        <div className="footer-section">
          <h4>CONTACT</h4>
          <p>
            <MapPinSimple
              size={20}
              weight="fill"
              color="var(--secondary)"
              className="icon-item"
            />{' '}
            Haifa & K.Motzkin, Israel
          </p>
          <p>
            <Phone
              size={20}
              weight="fill"
              color="var(--secondary)"
              className="icon-item"
            />{' '}
            +972 (0)4 873-2227
          </p>
          <p>
            <At
              size={20}
              color="var(--secondary)"
              className="icon-item"
            />{' '}
            info@clinicat.com
          </p>
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
        {/* <div className="footer-section">
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
        </div> */}
      </div>
      <div className="footer-bottom">
        <p>
          © 2025 Prof. Mark Eidelman Orthopedic Clinic. All rights
          reserved.
        </p>
        <p>Haifa, Israel | info@clinicat.com | +972 (0)4 873-2227</p>
      </div>
    </div>
  );
};

export default Footer;
