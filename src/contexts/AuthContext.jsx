import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

// Dữ liệu người dùng mẫu (có thể mở rộng)
const USERS = {
  admin: { username: 'admin', password: '1', role: 'admin', name: 'Quản trị viên' },
  canbo1: { username: 'canbo1', password: '1', role: 'user', name: 'Cán bộ 1' },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Kiểm tra session khi khởi động
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Hàm đăng nhập (trả về promise)
  const login = (username, password) => {
    return new Promise((resolve, reject) => {
      // Giả lập API delay
      setTimeout(() => {
        const found = USERS[username];
        if (found && found.password === password) {
          const { password, ...userWithoutPassword } = found;
          setUser(userWithoutPassword);
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          resolve(userWithoutPassword);
        } else {
          reject(new Error('Tên đăng nhập hoặc mật khẩu không đúng'));
        }
      }, 500);
    });
  };

  // Hàm đăng ký (chỉ cho phép tạo user mới nếu chưa tồn tại)
  const register = (username, password, name) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (USERS[username]) {
          reject(new Error('Tên đăng nhập đã tồn tại'));
        } else {
          USERS[username] = { username, password, role: 'user', name: name || username };
          const { password, ...newUser } = USERS[username];
          resolve(newUser);
        }
      }, 500);
    });
  };

  // Đăng xuất
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};