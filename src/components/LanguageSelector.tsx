import { useState, useEffect, useRef } from 'react';
import './LanguageSelector.css';

type Language = 'en' | 'he' | 'ru';

interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { code: 'he', name: 'עברית', flag: 'il' },
  { code: 'en', name: 'English', flag: 'us' },
  { code: 'ru', name: 'Русский', flag: 'ru' },
];

interface LanguageSelectorProps {
  variant?: 'header' | 'navbar';
  currentPath?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'header',
  currentPath = '/',
}) => {
  // Detect current language from URL
  const getCurrentLanguage = (): Language => {
    if (typeof window === 'undefined') return 'he';
    const path = currentPath || window.location.pathname;
    if (path.startsWith('/en')) return 'en';
    if (path.startsWith('/ru')) return 'ru';
    return 'he'; // Default to Hebrew
  };

  const [selectedLanguage, setSelectedLanguage] = useState<Language>(getCurrentLanguage());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update selected language when path changes
  useEffect(() => {
    setSelectedLanguage(getCurrentLanguage());
  }, [currentPath]);

  const selectedLang = languages.find(
    (lang) => lang.code === selectedLanguage
  );

  const handleLanguageSelect = (lang: Language) => {
    if (typeof window === 'undefined') return;

    const currentPath = window.location.pathname;
    let newPath = currentPath;

    // Remove existing language prefix
    newPath = newPath.replace(/^\/(en|ru)/, '') || '/';

    // Add new language prefix (except for Hebrew which is root)
    if (lang === 'en') {
      newPath = `/en${newPath}`;
    } else if (lang === 'ru') {
      newPath = `/ru${newPath}`;
    }

    // Navigate to new URL
    window.location.href = newPath;
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

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div
      className={`language-selector language-selector--${variant}`}
      ref={dropdownRef}
    >
      <button
        className="language-button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        aria-label="Select language"
        aria-expanded={isDropdownOpen}
      >
        <span className={`fi fi-${selectedLang?.flag}`}></span>
        <span className="language-name">{selectedLang?.name}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 256 256"
          fill="currentColor"
          className={`caret ${isDropdownOpen ? 'open' : ''}`}
        >
          <path d="M216.49,104.49l-80,80a12,12,0,0,1-17,0l-80-80a12,12,0,0,1,17-17L128,159l71.51-71.52a12,12,0,0,1,17,17Z"></path>
        </svg>
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
  );
};

export default LanguageSelector;
