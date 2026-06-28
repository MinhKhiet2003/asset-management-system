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

  const statCards = [
    { label: 'Tổng tài sản', value: total, icon: '📊', color: 'blue' },
    { label: 'Đang sử dụng', value: inUse, icon: '✅', color: 'green' },
    { label: 'Đang bảo trì', value: maintenance, icon: '🔧', color: 'yellow' },
    { label: 'Quá hạn bảo trì', value: needMaintenance, icon: '⚠️', color: 'red' },
  ];

  return (
    <div className="container" style={{ padding: '20px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 className="text-2xl font-bold" style={{ color: '#0f172a' }}>Bảng điều khiển</h1>
        <p className="text-sm text-gray-500">Tổng quan tình trạng tài sản công trên địa bàn</p>
      </div>

      <div className="stat-grid">
        {statCards.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <div className={`stat-icon stat-icon-${stat.color}`}>
              <span>{stat.icon}</span>
            </div>
            <div>
              <div className="stat-number">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card card-body" style={{ marginTop: '24px' }}>
        <h3 className="text-lg font-semibold" style={{ marginBottom: '12px' }}>Phân bố theo danh mục</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {Object.entries(categoryStats).map(([cat, count]) => (
            <div key={cat} className="flex items-center">
              <span style={{ width: '120px', fontSize: '14px', color: '#475569' }}>{cat}</span>
              <div style={{ flex: 1, height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${(count / total) * 100}%`, height: '100%', background: '#0ea5e9', borderRadius: '4px' }}></div>
              </div>
              <span style={{ marginLeft: '8px', fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>{count}</span>
            </div>
          ))}
        </div>
      </div>

      {needMaintenance > 0 && (
        <div className="alert alert-warning" style={{ marginTop: '16px' }}>
          <div className="flex items-start">
            <span style={{ fontSize: '20px', marginRight: '12px' }}>⚠️</span>
            <div>
              <div className="font-bold" style={{ color: '#92400e' }}>Có {needMaintenance} tài sản quá hạn bảo trì</div>
              <div className="text-sm" style={{ color: '#78350f' }}>Vui lòng kiểm tra và lên kế hoạch bảo trì kịp thời.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;