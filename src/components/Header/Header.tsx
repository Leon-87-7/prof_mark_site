import { useNavigate } from 'react-router-dom';
import './Header.css';
import { CalendarDots } from '@phosphor-icons/react';
import LanguageSelector from '../LanguageSelector/LanguageSelector';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <div>
            <div>Prof. Mark Eidelman</div>
            <div className="logo-subtitle">
              Pediatric Orthopedic Specialist
            </div>
          </div>
        </div>
        <div className="header-right">
          <div className="contact-info">
            <div className="phone">+972 (0)4 873-2227</div>
            <LanguageSelector variant="header" />
          </div>
          <button
            className="btn-book"
            onClick={() => navigate('/clinics')}
            aria-label="Book consultation now"
          >
            <CalendarDots
              size={22}
              className="icon-item"
              color="var(--tab-link-dark)"
              weight="duotone"
            />
            <span style={{ padding: '8px 0', fontSize: '1rem' }}>
              CONTACT US
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
