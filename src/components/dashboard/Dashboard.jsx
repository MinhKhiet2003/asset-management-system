import React from 'react';
import { useAssets } from '../../contexts/AssetContext';

const Dashboard = () => {
  const { assets } = useAssets();

  const total = assets.length;
  const inUse = assets.filter(a => a.status === 'Đang sử dụng').length;
  const maintenance = assets.filter(a => a.status === 'Đang bảo trì').length;
  const broken = assets.filter(a => a.status === 'Hỏng').length;
  const needMaintenance = assets.filter(a => a.nextMaintenance && new Date(a.nextMaintenance) < new Date()).length;

  const categoryStats = assets.reduce((acc, cur) => {
    acc[cur.category] = (acc[cur.category] || 0) + 1;
    return acc;
  }, {});

  const statItems = [
    { label: 'Tổng tài sản', value: total, icon: '📊', color: 'blue' },
    { label: 'Đang sử dụng', value: inUse, icon: '✅', color: 'green' },
    { label: 'Đang bảo trì', value: maintenance, icon: '🔧', color: 'yellow' },
    { label: 'Quá hạn bảo trì', value: needMaintenance, icon: '⚠️', color: 'red' },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Bảng điều khiển</h1>
      <p className="text-gray">Tổng quan tình trạng tài sản công</p>

      <div className="stat-grid mt-4">
        {statItems.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <div className={`stat-icon stat-icon-${stat.color}`}>{stat.icon}</div>
            <div>
              <div className="stat-number">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Phân bố theo danh mục */}
      <div className="card mt-4">
        <div className="card-body">
          <h3 className="font-semibold text-lg mb-2">Phân bố theo danh mục</h3>
          {Object.entries(categoryStats).map(([cat, count]) => (
            <div key={cat} className="flex items-center gap-2 py-1">
              <span className="text-sm" style={{ width: '120px' }}>{cat}</span>
              <div style={{ flex: 1, height: '8px', background: '#e2e8f0', borderRadius: '4px' }}>
                <div style={{ width: `${(count / total) * 100}%`, height: '100%', background: '#0ea5e9', borderRadius: '4px' }} />
              </div>
              <span className="text-sm font-semibold">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {needMaintenance > 0 && (
        <div className="alert alert-danger mt-4">
          ⚠️ Có {needMaintenance} tài sản quá hạn bảo trì. Vui lòng kiểm tra.
        </div>
      )}
    </div>
  );
};

export default Dashboard;