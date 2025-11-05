import './Header.css';
import type { BookingCallbacks } from '../../types';

interface HeaderProps extends BookingCallbacks {}

const Header = ({ onBookingClick }: HeaderProps) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          {/* <div
            className="logo-icon"
            role="img"
            aria-label="Hospital"
          >
            🏥
          </div> */}
          <div>
            <div>Prof. Mark Eidelman</div>
            <div className="logo-subtitle">
              Pediatric Orthopedic Specialist
            </div>
          </div>
        </div>
        <div className="header-right">
          <div className="contact-info">
            <div className="phone">+972 (0)4 123-4567</div>
            <div>24/7 Emergency Line</div>
          </div>
          <button
            className="btn-book"
            onClick={onBookingClick}
            aria-label="Book consultation now"
          >
            <span
              role="img"
              aria-label="Calendar"
            >
              📅
            </span>{' '}
            BOOK NOW
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
