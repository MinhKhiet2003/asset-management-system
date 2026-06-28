import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-6">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <img
            src="https://vdcd.vn/wp-content/uploads/2024/03/Logo-VDCD-01-1.png" 
            alt="VDCD Logo"
            className="h-8 w-auto"
          />
          <span className="font-semibold text-gray-800"> </span>
        </div>

        <div className="text-center">
          © {new Date().getFullYear()} - Hệ thống Quản lý Tài sản Công xã/phường
        </div>

        {/* Phiên bản bên phải */}
        <div className="text-gray-400">Phiên bản 1.0</div>
      </div>
    </footer>
  );
};

export default Footer;