import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navItems = [
    { path: '/', label: '📊 Tổng quan' },
    { path: '/assets', label: '📦 Tài sản' },
    { path: '/map', label: '🗺️ Bản đồ' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Đóng dropdown khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="container header-inner">
        {/* Logo */}
        <div className="logo">
          <span className="logo-icon">🏛️</span>
          <Link to="/" style={{ color: 'inherit' }}>Quản lý Tài sản Công</Link>
          <span className="logo-badge">Xã/Phường</span>
        </div>

        {/* Navigation */}
        <nav className="nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User info + Dropdown */}
        <div className="user-info" ref={dropdownRef}>
          <div 
            className="avatar-wrapper"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="avatar">
              {user?.name?.charAt(0) || 'CB'}
            </div>
            <span className="user-name">{user?.name || 'Cán bộ'}</span>
            <span className="dropdown-arrow">▾</span>
          </div>

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-header">
                <div className="dropdown-avatar">
                  {user?.name?.charAt(0) || 'CB'}
                </div>
                <div>
                  <div className="dropdown-name">{user?.name || 'Cán bộ'}</div>
                  <div className="dropdown-username">@{user?.username || 'user'}</div>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                👤 Thông tin cá nhân
              </Link>
              <Link to="/settings" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                ⚙️ Cài đặt
              </Link>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item dropdown-logout" onClick={handleLogout}>
                🚪 Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;