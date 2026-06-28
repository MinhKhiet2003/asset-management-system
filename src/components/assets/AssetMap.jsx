import React from 'react';
import { useAssets } from '../../contexts/AssetContext';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Card from '../common/Card';

const AssetMap = () => {
  const { assets } = useAssets();
  const hasLocation = assets.filter(a => a.latitude && a.longitude);

  // Tâm bản đồ: lấy vị trí đầu tiên hoặc mặc định
  const center = hasLocation.length > 0
    ? [hasLocation[0].latitude, hasLocation[0].longitude]
    : [21.0285, 105.8542];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">🗺️ Bản đồ tài sản</h1>
        <p className="text-sm text-gray-500">
          Hiển thị {hasLocation.length} tài sản có vị trí trên bản đồ
        </p>
      </div>

      {hasLocation.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="text-4xl mb-2">📍</div>
          <p className="text-gray-500">Chưa có tài sản nào được gắn vị trí.</p>
          <p className="text-sm text-gray-400">Hãy thêm vĩ độ/kinh độ khi tạo hoặc sửa tài sản.</p>
        </Card>
      ) : (
        <Card className="p-0 overflow-hidden">
          <div className="h-[600px] w-full">
            <MapContainer
              center={center}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
              zoomControl={false}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <ZoomControl position="bottomright" />
              {hasLocation.map(asset => (
                <Marker key={asset.id} position={[asset.latitude, asset.longitude]}>
                  <Popup>
                    <div className="text-sm">
                      <strong className="text-primary-700">{asset.name}</strong><br />
                      <span className="text-gray-600">{asset.location}</span><br />
                      <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {asset.status}
                      </span>
                      <br />
                      <a
                        href={`/assets/${asset.id}`}
                        className="text-primary-600 hover:underline text-xs"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Xem chi tiết →
                      </a>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AssetMap;