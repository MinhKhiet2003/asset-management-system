import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAssets } from '../../contexts/AssetContext';
import QRCode from 'react-qr-code';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const AssetDetail = () => {
  const { id } = useParams();
  const { assets } = useAssets();
  const [asset, setAsset] = useState(null);

  useEffect(() => {
    const found = assets.find(a => a.id === parseInt(id));
    setAsset(found);
  }, [id, assets]);

  if (!asset) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-4xl mb-2">🔍</div>
          <p className="text-gray-500">Đang tải hoặc không tìm thấy tài sản...</p>
          <Link to="/assets" className="text-primary-600 hover:underline mt-2 inline-block">
            ← Quay lại danh sách
          </Link>
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

  const getAssetUrl = () => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/assets/${asset.id}`;
  };

  return (
    <div className="container" style={{ padding: '20px' }}>
      {/* Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: '24px' }}>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#0f172a' }}>{asset.name}</h1>
          <p className="text-sm text-gray-500">Mã: <span style={{ fontFamily: 'monospace' }}>{asset.code}</span></p>
        </div>
        <Link to="/assets" className="btn btn-outline btn-sm">← Quay lại danh sách</Link>
      </div>

      {/* Cảnh báo quá hạn */}
      {isOverdue && (
        <div className="alert alert-danger">
          <div className="flex items-start">
            <span style={{ fontSize: '20px', marginRight: '12px' }}>⚠️</span>
            <div>
              <div className="font-bold" style={{ color: '#991b1b' }}>Đã quá hạn bảo trì!</div>
              <div className="text-sm" style={{ color: '#b91c1c' }}>
                Ngày bảo trì kế tiếp: <strong>{asset.nextMaintenance}</strong>. Vui lòng thực hiện bảo trì ngay.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid thông tin */}
      <div className="grid grid-cols-2" style={{ gap: '24px', marginBottom: '24px' }}>
        {/* Thông tin chung */}
        <div className="card card-body">
          <h2 className="text-lg font-semibold" style={{ marginBottom: '16px' }}>📋 Thông tin chi tiết</h2>
          <div className="grid grid-cols-2" style={{ gap: '12px 24px', fontSize: '14px' }}>
            <div><span className="text-gray">Danh mục</span><br/><strong>{asset.category}</strong></div>
            <div><span className="text-gray">Vị trí</span><br/>{asset.location || 'Chưa cập nhật'}</div>
            <div><span className="text-gray">Tình trạng</span><br/><span className={`badge badge-${statusColor}`}>{asset.status}</span></div>
            <div><span className="text-gray">Ngày mua</span><br/>{asset.purchaseDate || 'Chưa cập nhật'}</div>
            <div><span className="text-gray">Bảo trì gần nhất</span><br/>{asset.lastMaintenance || 'Chưa có'}</div>
            <div><span className="text-gray">Bảo trì kế tiếp</span><br/><span style={{ color: isOverdue ? '#dc2626' : 'inherit', fontWeight: isOverdue ? 'bold' : 'normal' }}>{asset.nextMaintenance || 'Chưa có kế hoạch'}</span></div>
            <div style={{ gridColumn: '1 / -1' }}><span className="text-gray">Mô tả</span><br/>{asset.description || 'Không có mô tả'}</div>
          </div>
        </div>

        {/* QR Code */}
        <div className="card card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h2 className="text-lg font-semibold" style={{ marginBottom: '12px' }}>Mã QR</h2>
          <div style={{ background: '#fff', padding: '12px', borderRadius: '8px', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)' }}>
            <QRCode value={getAssetUrl()} size={140} bgColor="#ffffff" fgColor="#0c4a6e" />
          </div>
          <p className="text-sm text-gray-500" style={{ marginTop: '12px', textAlign: 'center' }}>
            Quét mã để xem thông tin<br/>
            <span style={{ fontFamily: 'monospace', fontSize: '10px', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>{asset.code}</span>
          </p>
        </div>
      </div>

      {/* Bản đồ */}
      {asset.latitude && asset.longitude && (
        <div className="card" style={{ marginBottom: '24px' }}>
          <div className="card-body">
            <h2 className="text-lg font-semibold" style={{ marginBottom: '12px' }}>📍 Vị trí trên bản đồ</h2>
            <div className="map-container" style={{ height: '240px' }}>
              <MapContainer center={[asset.latitude, asset.longitude]} zoom={15} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[asset.latitude, asset.longitude]}>
                  <Popup>
                    <strong>{asset.name}</strong><br/>{asset.location}
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      )}

      {/* Lịch sử */}
      <div className="card card-body" style={{ marginBottom: '24px' }}>
        <h2 className="text-lg font-semibold" style={{ marginBottom: '12px' }}>📜 Lịch sử sử dụng</h2>
        {asset.history && asset.history.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {asset.history.map((item, index) => (
              <li key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9', fontSize: '14px' }}>
                <span style={{ color: '#1e293b' }}>{item.event}</span>
                <span style={{ color: '#94a3b8' }}>{item.date}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500" style={{ fontStyle: 'italic' }}>Chưa có lịch sử</p>
        )}
      </div>

      {/* Hành động */}
      <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
        <Link to={`/assets/edit/${asset.id}`} className="btn btn-secondary">✏️ Sửa tài sản</Link>
        <button className="btn btn-outline" onClick={() => window.print()}>🖨️ In thông tin</button>
      </div>
    </div>
  );
};

export default AssetDetail;