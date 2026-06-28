import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="container" style={{ paddingTop: '1.5rem' }}>
      <h1 className="text-2xl font-bold">👤 Thông tin cá nhân</h1>
      <div className="card card-body" style={{ maxWidth: '500px', marginTop: '1rem' }}>
        <p><strong>Tên đăng nhập:</strong> {user?.username}</p>
        <p><strong>Họ tên:</strong> {user?.name}</p>
        <p><strong>Vai trò:</strong> {user?.role === 'admin' ? 'Quản trị viên' : 'Cán bộ'}</p>
      </div>
    </div>
  );
};

export default Profile;