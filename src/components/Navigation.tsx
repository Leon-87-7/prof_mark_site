import { useState, useEffect, useRef } from 'react';
import type { ReactElement } from 'react';
import LanguageSelector from './LanguageSelector';
import './Navigation.css';

interface NavigationProps {
  currentPath?: string;
}

const Navigation = ({
  currentPath: propPath,
}: NavigationProps): ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const navItems = [
    { label: 'Home', path: '/' },
    ...(isMenuOpen ? [{ label: 'Clinics', path: '/clinics' }] : []),
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Innovation', path: '/innovation' },
    { label: 'Guides', path: '/guides' },
    { label: 'Study Area', path: '/study' },
  ];

  // Use prop if available, otherwise get from window
  const currentPath =
    propPath ||
    (typeof window !== 'undefined' ? window.location.pathname : '/');

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

  // Normalize the path by removing trailing slashes
  const normalizedPath =
    currentPath === '/' ? '/' : currentPath.replace(/\/$/, '');

  return (
    <nav
      ref={navRef}
      className="navbar"
      aria-label="Main navigation"
    >
      <div className="navbar-mobile-header">
        <button
          className="hamburger-menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <div
            id="nav-icon2"
            className={isMenuOpen ? 'open' : ''}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
        <a
          href="tel:+97248732227"
          className="navbar-phone"
        >
          +972 (0)4 873-2227
        </a>
      </div>

      <div className={`navbar-container ${isMenuOpen ? 'open' : ''}`}>
        {navItems.map((item) => {
          const isActive =
            item.path === '/'
              ? normalizedPath === '/'
              : normalizedPath === item.path;

          return (
            <a
              key={item.path}
              href={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              {item.label}
            </a>
          );
        })}

        <LanguageSelector variant="navbar" />
      </div>
    </nav>
  );
};

export default Navigation;
