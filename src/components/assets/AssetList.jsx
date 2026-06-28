import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAssets } from '../../contexts/AssetContext';

const AssetList = () => {
  const { assets, loading, removeAsset } = useAssets();
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  // Lấy danh sách các vị trí duy nhất (loại bỏ null, undefined, rỗng)
  const locations = useMemo(() => {
    const locs = new Set();
    assets.forEach(a => {
      if (a.location && a.location.trim()) {
        locs.add(a.location.trim());
      }
    });
    return Array.from(locs).sort();
  }, [assets]);

  // Lọc tài sản theo selectedLocation, search, category
  const filteredAssets = useMemo(() => {
    return assets.filter(asset => {
      // Lọc theo vị trí
      if (selectedLocation && asset.location !== selectedLocation) return false;
      // Lọc theo tên hoặc mã
      if (search) {
        const term = search.toLowerCase();
        const nameMatch = asset.name.toLowerCase().includes(term);
        const codeMatch = asset.code.toLowerCase().includes(term);
        if (!nameMatch && !codeMatch) return false;
      }
      // Lọc theo danh mục
      if (filterCategory && asset.category !== filterCategory) return false;
      return true;
    });
  }, [assets, selectedLocation, search, filterCategory]);

  // Đếm số lượng tài sản theo vị trí
  const locationCount = (loc) => {
    return assets.filter(a => a.location === loc).length;
  };

  const statusColors = {
    'Đang sử dụng': 'green',
    'Đang bảo trì': 'yellow',
    'Hỏng': 'red',
    'Thanh lý': 'gray',
  };

  if (loading) return <div className="container" style={{ padding: '20px' }}>⏳ Đang tải dữ liệu...</div>;

  return (
    <div className="container" style={{ padding: '20px' }}>
      <div className="flex items-center justify-between" style={{ marginBottom: '16px' }}>
        <h1 className="text-2xl font-bold" style={{ color: '#0f172a' }}>Danh sách tài sản</h1>
        <Link to="/assets/new" className="btn btn-primary">+ Thêm mới</Link>
      </div>

      {/* Bộ lọc */}
      <div className="flex flex-wrap gap-2" style={{ marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="🔍 Tìm kiếm tên hoặc mã..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control"
          style={{ flex: '1 1 200px' }}
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="form-control"
          style={{ width: '200px' }}
        >
          <option value="">Tất cả danh mục</option>
          {[...new Set(assets.map(a => a.category))].map(cat => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="form-control"
          style={{ width: '200px' }}
        >
          <option value="">Tất cả vị trí</option>
          {locations.map(loc => (
            <option key={loc}>{loc}</option>
          ))}
        </select>
      </div>

      {/* Hiển thị theo kiểu 2 cột: bên trái là danh sách vị trí, bên phải là danh sách tài sản */}
      <div className="grid" style={{ gridTemplateColumns: '1fr 3fr', gap: '20px' }}>
        {/* Cột trái: Danh sách vị trí */}
        <div>
          <div className="card" style={{ padding: '12px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>📍 Vị trí</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <button
                onClick={() => setSelectedLocation('')}
                className="btn btn-sm"
                style={{
                  textAlign: 'left',
                  justifyContent: 'flex-start',
                  background: selectedLocation === '' ? '#dbeafe' : 'transparent',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '6px 10px',
                  fontWeight: selectedLocation === '' ? '600' : '400',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                🏠 Tất cả ({assets.length})
              </button>
              {locations.map(loc => (
                <button
                  key={loc}
                  onClick={() => setSelectedLocation(loc)}
                  className="btn btn-sm"
                  style={{
                    textAlign: 'left',
                    justifyContent: 'flex-start',
                    background: selectedLocation === loc ? '#dbeafe' : 'transparent',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '6px 10px',
                    fontWeight: selectedLocation === loc ? '600' : '400',
                    cursor: 'pointer',
                    width: '100%',
                  }}
                >
                  {loc} ({locationCount(loc)})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cột phải: Danh sách tài sản */}
        <div>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Mã</th>
                  <th>Tên</th>
                  <th>Danh mục</th>
                  <th>Tình trạng</th>
                  <th style={{ textAlign: 'right' }}>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.map(asset => (
                  <tr key={asset.id}>
                    <td><span style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{asset.code}</span></td>
                    <td><strong>{asset.name}</strong></td>
                    <td>{asset.category}</td>
                    <td><span className={`badge badge-${statusColors[asset.status] || 'gray'}`}>{asset.status}</span></td>
                    <td className="actions" style={{ justifyContent: 'flex-end' }}>
                      <Link to={`/assets/${asset.id}`} className="text-primary-600 hover:underline">Chi tiết</Link>
                      <Link to={`/assets/edit/${asset.id}`} className="text-primary-600 hover:underline">Sửa</Link>
                      <button onClick={() => removeAsset(asset.id)} className="text-danger" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Xóa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredAssets.length === 0 && (
              <div className="text-center" style={{ padding: '40px 0', color: '#94a3b8' }}>Không có tài sản nào</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetList;