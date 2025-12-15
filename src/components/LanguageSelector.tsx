import { useState, useEffect, useRef } from 'react';
import './LanguageSelector.css';

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

interface LanguageSelectorProps {
  variant?: 'header' | 'navbar';
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'header',
}) => {
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
