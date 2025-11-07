import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { CalendarDots, CaretDown } from '@phosphor-icons/react';
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

const Header = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] =
    useState<Language>('en');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLang = languages.find(
    (lang) => lang.code === selectedLanguage
  );

  const handleLanguageSelect = (lang: Language) => {
    setSelectedLanguage(lang);
    setIsDropdownOpen(false);
    // TODO: Implement actual language switching logic
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

            <div
              className="language-selector"
              ref={dropdownRef}
            >
              <button
                className="language-button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-label="Select language"
                aria-expanded={isDropdownOpen}
              >
                <span
                  className={`fi fi-${selectedLang?.flag}`}
                ></span>
                <span className="language-name">
                  {selectedLang?.name}
                </span>
                <CaretDown
                  size={14}
                  weight="bold"
                  className={`caret ${isDropdownOpen ? 'open' : ''}`}
                />
              </button>
              {isDropdownOpen && (
                <div className="language-dropdown-menu">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`language-option ${
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
