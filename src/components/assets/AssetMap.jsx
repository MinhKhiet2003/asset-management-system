import React from 'react';
import { useAssets } from '../../contexts/AssetContext';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './AssetMap.css';

// Fix icon mặc định của Leaflet (tránh lỗi ảnh)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const AssetMap = () => {
  const { assets } = useAssets();
  
  // Lọc các tài sản có tọa độ
  const hasLocation = assets.filter(a => a.latitude && a.longitude);

  // Hàm xác định màu marker theo trạng thái
  const getMarkerColor = (status) => {
    switch(status) {
      case 'Đang sử dụng': return 'green';
      case 'Đang bảo trì': return 'orange';
      case 'Hỏng': return 'red';
      case 'Thanh lý': return 'gray';
      default: return 'blue';
    }
  };

  // Tạo icon động (tùy chỉnh màu)
  const createIcon = (status) => {
    const color = getMarkerColor(status);
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="30" height="42">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 12 24 12 24s12-17.373 12-24c0-6.627-5.373-12-12-12z" fill="${color === 'green' ? '#22c55e' : color === 'orange' ? '#f59e0b' : color === 'red' ? '#ef4444' : '#94a3b8'}" stroke="#fff" stroke-width="1.5"/>
        <circle cx="12" cy="12" r="6" fill="#fff" stroke="#fff" stroke-width="1.5"/>
      </svg>
    `;
    return L.icon({
      iconUrl: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
      iconSize: [30, 42],
      iconAnchor: [15, 42],
      popupAnchor: [0, -36],
    });
  };

  // Tâm bản đồ (nếu có tài sản, lấy vị trí đầu tiên, còn không dùng tọa độ trung tâm Hà Nội)
  const center = hasLocation.length > 0
    ? [hasLocation[0].latitude, hasLocation[0].longitude]
    : [21.0285, 105.8542];

  return (
    <div className="map-page-container">
      <div className="map-header">
        <h1>🗺️ Bản đồ tài sản công</h1>
        <p>Hiển thị <strong>{hasLocation.length}</strong> tài sản có vị trí trên địa bàn</p>
      </div>

      {hasLocation.length === 0 ? (
        <div className="map-card">
          <div className="empty-state">
            <div className="empty-icon">📍</div>
            <p className="empty-text">Chưa có tài sản nào được gắn vị trí.</p>
            <p className="empty-sub">Hãy thêm vĩ độ/kinh độ khi tạo hoặc sửa tài sản.</p>
          </div>
        </div>
      ) : (
        <div className="map-card">
          <div className="map-container">
            <MapContainer
              center={center}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
              zoomControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <ZoomControl position="bottomright" />
              {hasLocation.map(asset => (
                <Marker
                  key={asset.id}
                  position={[asset.latitude, asset.longitude]}
                  icon={createIcon(asset.status)}
                >
                  <Popup className="custom-popup">
                    <div>
                      <div className="popup-title">{asset.name}</div>
                      <div className="popup-location">{asset.location || 'Chưa có địa chỉ'}</div>
                      <span className={`popup-status status-${getMarkerColor(asset.status)}`}>
                        {asset.status}
                      </span>
                      <br />
                      <a href={`/assets/${asset.id}`} className="popup-link" target="_blank" rel="noreferrer">
                        Xem chi tiết →
                      </a>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetMap;