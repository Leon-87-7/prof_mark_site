import { useState, useEffect, useRef } from 'react';
import type { ReactElement } from 'react';
import LanguageSelector from './LanguageSelector';
import { useTranslations, getPathPrefix, type Language } from '../i18n/utils';
import './Navigation.css';

interface NavigationProps {
  currentPath?: string;
  lang: Language;
}

const Navigation = ({
  currentPath: propPath,
  lang,
}: NavigationProps): ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const t = useTranslations(lang);
  const langPrefix = getPathPrefix(lang);

  const navItems = [
    { label: lang === 'he' ? 'בית' : lang === 'en' ? 'Home' : 'Главная', path: `${langPrefix}/` },
    ...(isMenuOpen ? [{ label: t('nav.clinics'), path: `${langPrefix}/clinics` }] : []),
    { label: t('nav.about'), path: `${langPrefix}/about` },
    { label: t('nav.services'), path: `${langPrefix}/services` },
    { label: t('nav.innovation'), path: `${langPrefix}/innovation` },
    { label: t('nav.guides'), path: `${langPrefix}/guides` },
    { label: t('nav.study'), path: `${langPrefix}/study` },
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
          dir="ltr"
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

        <LanguageSelector variant="navbar" currentPath={currentPath} />
      </div>
    </nav>
  );
};

export default Navigation;
