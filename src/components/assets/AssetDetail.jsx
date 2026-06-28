import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAssets } from '../../contexts/AssetContext';
import QRCode from 'react-qr-code';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './AssetDetail.css'; // Import CSS riêng

const AssetDetail = () => {
  const { id } = useParams();
  const { assets } = useAssets();
  const [asset, setAsset] = useState(null);

  useEffect(() => {
    const found = assets.find(a => a.id === parseInt(id));
    setAsset(found);
  }, [id, assets]);

  // Hàm tạo URL đầy đủ cho QR code
  const getAssetUrl = () => {
    // Lấy domain hiện tại (nếu chạy trên trình duyệt)
    const baseUrl = window.location.origin; // ví dụ: https://asset-management-system-j5dl.vercel.app
    return `${baseUrl}/assets/${asset.id}`;
  };

  if (!asset) {
    return (
      <div className="loading">
        <div>
          <div className="icon">🔍</div>
          <p className="text">Đang tải hoặc không tìm thấy tài sản...</p>
          <Link to="/assets" className="link">← Quay lại danh sách</Link>
        </div>
      </div>
    );
  }

  const statusColor = {
    'Đang sử dụng': 'green',
    'Đang bảo trì': 'yellow',
    'Hỏng': 'red',
    'Thanh lý': 'gray',
  }[asset.status] || 'gray';

  const isOverdue = asset.nextMaintenance && new Date(asset.nextMaintenance) < new Date();

  return (
    <div className="asset-detail-container">
      {/* Header */}
      <div className="asset-header">
        <div>
          <h1 className="asset-title">{asset.name}</h1>
          <div className="asset-code">Mã: <span>{asset.code}</span></div>
        </div>
        <Link to="/assets" className="btn-back">← Quay lại danh sách</Link>
      </div>

      {/* Cảnh báo quá hạn */}
      {isOverdue && (
        <div className="alert-warning">
          <span className="icon">⚠️</span>
          <div>
            <div className="title">Đã quá hạn bảo trì!</div>
            <div className="desc">
              Ngày bảo trì kế tiếp: <strong>{asset.nextMaintenance}</strong>. Vui lòng thực hiện bảo trì ngay.
            </div>
          </div>
        </div>
      )}

      {/* Grid thông tin + QR */}
      <div className="asset-grid">
        {/* Thông tin chung */}
        <div className="card">
          <h2 className="card-title">📋 Thông tin chi tiết</h2>
          <dl className="info-grid">
            <div>
              <dt>Danh mục</dt>
              <dd>{asset.category}</dd>
            </div>
            <div>
              <dt>Vị trí</dt>
              <dd>{asset.location || 'Chưa cập nhật'}</dd>
            </div>
            <div>
              <dt>Tình trạng</dt>
              <dd>
                <span className={`badge badge-${statusColor}`}>{asset.status}</span>
              </dd>
            </div>
            <div>
              <dt>Ngày mua</dt>
              <dd>{asset.purchaseDate || 'Chưa cập nhật'}</dd>
            </div>
            <div>
              <dt>Bảo trì gần nhất</dt>
              <dd>{asset.lastMaintenance || 'Chưa có'}</dd>
            </div>
            <div>
              <dt>Bảo trì kế tiếp</dt>
              <dd style={{ color: isOverdue ? '#dc2626' : 'inherit', fontWeight: isOverdue ? 'bold' : 'normal' }}>
                {asset.nextMaintenance || 'Chưa có kế hoạch'}
              </dd>
            </div>
            <div className="full-width">
              <dt>Mô tả</dt>
              <dd>{asset.description || 'Không có mô tả'}</dd>
            </div>
          </dl>
        </div>

        {/* QR Code */}
        <div className="card qr-wrapper">
          <h2 className="card-title">Mã QR</h2>
          <div className="qr-box">
            <QRCode
              value={getAssetUrl()}  // ← Đường dẫn URL đầy đủ
              size={150}
              bgColor="#ffffff"
              fgColor="#0c4a6e"
            />
          </div>
          <p className="qr-label">
            Quét mã để xem thông tin<br />
            <span className="code">{asset.code}</span>
          </p>
        </div>
      </div>

      {/* Bản đồ */}
      {asset.latitude && asset.longitude && (
        <div className="card map-wrapper">
          <h2 className="card-title">📍 Vị trí trên bản đồ</h2>
          <div className="map-container">
            <MapContainer
              center={[asset.latitude, asset.longitude]}
              zoom={15}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[asset.latitude, asset.longitude]}>
                <Popup>
                  <strong>{asset.name}</strong><br />
                  {asset.location}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      )}

      {/* Lịch sử */}
      <div className="card">
        <h2 className="card-title">📜 Lịch sử sử dụng</h2>
        {asset.history && asset.history.length > 0 ? (
          <ul className="history-list">
            {asset.history.map((item, index) => (
              <li key={index} className="history-item">
                <span className="event">{item.event}</span>
                <span className="date">{item.date}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-history">Chưa có lịch sử</p>
        )}
      </div>

      {/* Hành động */}
      <div className="actions">
        <Link to={`/assets/edit/${asset.id}`} className="btn-edit">✏️ Sửa tài sản</Link>
        <button className="btn-print" onClick={() => window.print()}>🖨️ In thông tin</button>
      </div>
    </div>
  );
};

export default AssetDetail;