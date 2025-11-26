import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import LanguageSelector from '../LanguageSelector/LanguageSelector';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const navItems = [
    { label: 'About', path: '/' },
    // { label: 'Clinics', path: '/clinics' },
    { label: 'Services', path: '/services' },
    { label: 'Innovation', path: '/innovation' },
    { label: 'Guides', path: '/guides' },
    { label: 'Study Area', path: '/study' },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <nav
      ref={navRef}
      className="navbar"
      aria-label="Main navigation"
    >
      <div className="navbar-mobile-header">
        <button
          className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
        <a
          href="tel:+97248732227"
          className="navbar-phone"
        >
          +972 (0)4 873-2227
        </a>
      </div>
      <div className={`navbar-container ${isMenuOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'active' : ''}`
            }
            end={item.path === '/'}
            onClick={handleLinkClick}
          >
            {item.label}
          </NavLink>
        ))}

        <LanguageSelector variant="navbar" />
      </div>
    </nav>
  );
};

export default Navigation;
