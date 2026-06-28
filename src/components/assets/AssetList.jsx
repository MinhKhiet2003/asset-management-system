import React, { useState } from 'react';
import { useAssets } from '../../contexts/AssetContext';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import Badge from '../common/Badge';

const AssetList = () => {
  const { assets, loading, removeAsset } = useAssets();
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const filtered = assets.filter(asset => {
    const matchName = asset.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = filterCategory ? asset.category === filterCategory : true;
    return matchName && matchCategory;
  });

  const categories = [...new Set(assets.map(a => a.category))];
  const statusColors = {
    'Đang sử dụng': 'green',
    'Đang bảo trì': 'yellow',
    'Hỏng': 'red',
    'Thanh lý': 'gray',
  };

  if (loading) return <div className="text-center p-4">⏳ Đang tải...</div>;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <h1 className="text-2xl font-bold">Danh sách tài sản</h1>
        <Link to="/assets/new">
          <Button variant="primary">+ Thêm mới</Button>
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="🔍 Tìm kiếm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control"
          style={{ flex: 1, minWidth: '200px' }}
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="form-control"
          style={{ width: '180px' }}
        >
          <option value="">Tất cả danh mục</option>
          {categories.map(cat => <option key={cat}>{cat}</option>)}
        </select>
      </div>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Mã</th>
              <th>Tên</th>
              <th>Danh mục</th>
              <th>Vị trí</th>
              <th>Tình trạng</th>
              <th className="text-right">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(asset => (
              <tr key={asset.id}>
                <td className="font-mono text-sm">{asset.code}</td>
                <td className="font-medium">{asset.name}</td>
                <td>{asset.category}</td>
                <td className="text-gray">{asset.location}</td>
                <td>
                  <Badge color={statusColors[asset.status] || 'gray'}>
                    {asset.status}
                  </Badge>
                </td>
                <td className="text-right">
                  <div className="actions justify-end">
                    <Link to={`/assets/${asset.id}`}>Chi tiết</Link>
                    <Link to={`/assets/edit/${asset.id}`}>Sửa</Link>
                    <button onClick={() => removeAsset(asset.id)} style={{ color: '#ef4444' }}>Xóa</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center p-4 text-gray-500">Không có tài sản nào</div>
        )}
      </div>
    </div>
  );
};

export default AssetList;