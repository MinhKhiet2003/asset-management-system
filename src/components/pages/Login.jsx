import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(username, password);
        navigate('/');
      } else {
        await register(username, password, name || username);
        // Chuyển sang tab đăng nhập sau khi đăng ký thành công
        setIsLogin(true);
        setPassword('');
        setError('Đăng ký thành công! Vui lòng đăng nhập.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="login-logo">
            <span className="icon">🏛️</span>
            <h1 className="title">Quản lý Tài sản</h1>
          </div>
          <p className="login-subtitle">Hệ thống quản lý tài sản công xã/phường</p>
        </div>

        <div className="login-tabs">
          <button
            className={`login-tab ${isLogin ? 'active' : ''}`}
            onClick={() => { setIsLogin(true); setError(''); }}
          >
            Đăng nhập
          </button>
          <button
            className={`login-tab ${!isLogin ? 'active' : ''}`}
            onClick={() => { setIsLogin(false); setError(''); }}
          >
            Đăng ký
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <div className="form-group">
              <label>Họ tên</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập họ tên của bạn"
                required={!isLogin}
              />
            </div>
          )}

          <div className="form-group">
            <label>Tên đăng nhập</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Tên đăng nhập"
              required
              autoComplete="username"
              className={error ? 'input-error' : ''}
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu"
              required
              autoComplete={isLogin ? 'current-password' : 'new-password'}
              className={error ? 'input-error' : ''}
            />
            {error && <div className="error-text">{error}</div>}
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Đang xử lý...' : isLogin ? 'Đăng nhập' : 'Đăng ký'}
          </button>
        </form>

        <div className="login-footer">
          {isLogin ? (
            <span>
              Chưa có tài khoản?{' '}
              <button 
                type="button"
                className="link-button"
                onClick={() => { setIsLogin(false); setError(''); }}
              >
                Đăng ký ngay
              </button>
            </span>
          ) : (
            <span>
              Đã có tài khoản?{' '}
              <button 
                type="button"
                className="link-button"
                onClick={() => { setIsLogin(true); setError(''); }}
              >
                Đăng nhập
              </button>
            </span>
          )}
        </div>

        <div className="demo-accounts">
          <div className="title">🔑 Tài khoản demo</div>
          <div className="accounts">
            <div className="account">
              <span className="label">admin</span> / <span className="pass">1</span>
            </div>
            <div className="account">
              <span className="label">canbo1</span> / <span className="pass">1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;