import './Navigation.css';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const navItems = [
    { label: 'About', path: '/' },
    // { label: 'Clinics', path: '/clinics' },
    { label: 'Services', path: '/services' },
    { label: 'Innovation', path: '/innovation' },
    { label: 'Guides', path: '/guides' },
    { label: 'Study Area', path: '/study' },
  ];

  return (
    <nav
      className="navbar"
      aria-label="Main navigation"
    >
      <div className="navbar-container">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            end={item.path === '/'}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
