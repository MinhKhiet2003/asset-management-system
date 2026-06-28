import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const navItems = [
    { path: '/', label: '📊 Tổng quan' },
    { path: '/assets', label: '📦 Tài sản' },
    { path: '/map', label: '🗺️ Bản đồ' },
  ];

  return (
    <header className="header">
      <div className="container header-inner">
        <div className="logo">
          <span className="logo-icon">🏛️</span>
          <span>Quản lý Tài sản</span>
          <span className="logo-badge">Xã/Phường</span>
        </div>
        <nav className="nav">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="user-info">
          <div className="avatar">CB</div>
          <span className="user-name">Cán bộ</span>
        </div>
      </div>
    </header>
  );
};

export default Header;