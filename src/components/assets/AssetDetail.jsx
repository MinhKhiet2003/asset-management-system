import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAssets } from '../../contexts/AssetContext';
import QRCode from 'react-qr-code';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{asset.name}</h1>
          <p className="text-sm text-gray-500">Mã: <span className="font-mono">{asset.code}</span></p>
        </div>
        <Link to="/assets">
          <Button variant="outline" size="sm">← Quay lại danh sách</Button>
        </Link>
      </div>

      {/* Cảnh báo quá hạn bảo trì */}
      {isOverdue && (
        <Card className="p-4 border-l-4 border-red-500 bg-red-50">
          <div className="flex items-start">
            <span className="text-red-600 text-xl mr-3">⚠️</span>
            <div>
              <p className="font-semibold text-red-800">Đã quá hạn bảo trì!</p>
              <p className="text-sm text-red-600">
                Ngày bảo trì kế tiếp: <strong>{asset.nextMaintenance}</strong>. Vui lòng thực hiện bảo trì ngay.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Grid thông tin */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Thông tin chung */}
        <Card className="lg:col-span-2 p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">📋</span> Thông tin chi tiết
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <div>
              <dt className="text-gray-500">Danh mục</dt>
              <dd className="font-medium">{asset.category}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Vị trí</dt>
              <dd>{asset.location || 'Chưa cập nhật'}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Tình trạng</dt>
              <dd><Badge color={statusColor}>{asset.status}</Badge></dd>
            </div>
            <div>
              <dt className="text-gray-500">Ngày mua</dt>
              <dd>{asset.purchaseDate || 'Chưa cập nhật'}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Bảo trì gần nhất</dt>
              <dd>{asset.lastMaintenance || 'Chưa có'}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Bảo trì kế tiếp</dt>
              <dd className={isOverdue ? 'text-red-600 font-semibold' : ''}>
                {asset.nextMaintenance || 'Chưa có kế hoạch'}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-gray-500">Mô tả</dt>
              <dd>{asset.description || 'Không có mô tả'}</dd>
            </div>
          </dl>
        </Card>

        {/* QR Code */}
        <Card className="p-5 flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Mã QR</h2>
          <div className="bg-white p-3 rounded-lg shadow-inner">
            <QRCode
              value={JSON.stringify({ id: asset.id, code: asset.code, name: asset.name })}
              size={140}
              bgColor="#ffffff"
              fgColor="#0c4a6e"
            />
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">
            Quét mã để xem thông tin nhanh<br />
            <span className="font-mono text-[10px]">{asset.code}</span>
          </p>
        </Card>
      </div>

      {/* Bản đồ GIS */}
      {asset.latitude && asset.longitude && (
        <Card className="p-0 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <span className="mr-2">📍</span> Vị trí trên bản đồ
            </h2>
          </div>
          <div className="h-64 w-full">
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
        </Card>
      )}

      {/* Lịch sử sử dụng */}
      <Card className="p-5">
        <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
          <span className="mr-2">📜</span> Lịch sử sử dụng
        </h2>
        {asset.history && asset.history.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {asset.history.map((item, index) => (
              <li key={index} className="py-2 flex justify-between text-sm">
                <span className="text-gray-700">{item.event}</span>
                <span className="text-gray-400">{item.date}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-400 italic">Chưa có lịch sử</p>
        )}
      </Card>

      {/* Hành động */}
      <div className="flex flex-wrap gap-3">
        <Link to={`/assets/edit/${asset.id}`}>
          <Button variant="secondary">✏️ Sửa tài sản</Button>
        </Link>
        <Button variant="outline" onClick={() => window.print()}>🖨️ In thông tin</Button>
      </div>
    </div>
  );
};

export default AssetDetail;