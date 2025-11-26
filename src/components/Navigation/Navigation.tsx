import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { CaretDown } from '@phosphor-icons/react';
import 'flag-icons/css/flag-icons.min.css';

type Language = 'en' | 'he' | 'ru';

interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { code: 'en', name: 'English', flag: 'us' },
  { code: 'he', name: 'עברית', flag: 'il' },
  { code: 'ru', name: 'Русский', flag: 'ru' },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: 'About', path: '/' },
    // { label: 'Clinics', path: '/clinics' },
    { label: 'Services', path: '/services' },
    { label: 'Innovation', path: '/innovation' },
    { label: 'Guides', path: '/guides' },
    { label: 'Study Area', path: '/study' },
  ];

  const selectedLang = languages.find(
    (lang) => lang.code === selectedLanguage
  );

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleLanguageSelect = (lang: Language) => {
    setSelectedLanguage(lang);
    setIsLangDropdownOpen(false);
    // TODO: Implement actual language switching logic
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
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
          className={`hamburger-menu ${isMenuOpen ? 'hidden' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
        <a href="tel:+97248732227" className="navbar-phone">
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

        <div className="navbar-language-selector" ref={langDropdownRef}>
          <button
            className="navbar-language-button"
            onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
            aria-label="Select language"
            aria-expanded={isLangDropdownOpen}
          >
            <span className={`fi fi-${selectedLang?.flag}`}></span>
            <span className="navbar-language-name">
              {selectedLang?.name}
            </span>
            <CaretDown
              size={14}
              weight="bold"
              className={`navbar-caret ${isLangDropdownOpen ? 'open' : ''}`}
            />
          </button>
          {isLangDropdownOpen && (
            <div className="navbar-language-dropdown">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`navbar-language-option ${
                    selectedLanguage === lang.code ? 'active' : ''
                  }`}
                  onClick={() => handleLanguageSelect(lang.code)}
                >
                  <span className={`fi fi-${lang.flag}`}></span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
