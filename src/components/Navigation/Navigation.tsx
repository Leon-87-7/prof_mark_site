import './Navigation.css';
import type { PageType, PageChangeCallbacks } from '../../types';

interface NavigationProps extends PageChangeCallbacks {
  activePage: PageType;
}

const Navigation = ({ activePage, onPageChange }: NavigationProps) => {
  const navItems = [
    { label: 'About', page: 'home' as const },
    { label: 'Clinics', page: 'clinics' as const },
    { label: 'Services', page: 'services' as const },
    { label: 'Innovation', page: 'innovation' as const },
    { label: 'Guides', page: 'guides' as const },
    { label: 'Study Area', page: 'study' as const },
  ];

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar-container" role="tablist">
        {navItems.map((item) => (
          <button
            key={item.page}
            role="tab"
            aria-selected={activePage === item.page}
            aria-controls={`${item.page}-content`}
            className={`nav-item ${activePage === item.page ? 'active' : ''}`}
            onClick={() => onPageChange(item.page)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
