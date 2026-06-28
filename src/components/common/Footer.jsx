import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        © {new Date().getFullYear()} - Hệ thống Quản lý Tài sản Công xã/phường - VDCD Ninh Bình | Phiên bản 1.0
      </div>
    </footer>
  );
};

export default Footer;