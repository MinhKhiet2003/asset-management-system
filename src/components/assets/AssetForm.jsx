import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAssets } from '../../contexts/AssetContext';
import './AssetForm.css'; // import CSS vừa tạo

const AssetForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { assets, addNewAsset, editAsset } = useAssets();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    code: '',
    location: '',
    latitude: '',
    longitude: '',
    status: 'Đang sử dụng',
    purchaseDate: '',
    lastMaintenance: '',
    nextMaintenance: '',
    description: '',
  });

  useEffect(() => {
    if (isEdit) {
      const asset = assets.find(a => a.id === parseInt(id));
      if (asset) {
        setFormData({
          name: asset.name,
          category: asset.category,
          code: asset.code,
          location: asset.location || '',
          latitude: asset.latitude || '',
          longitude: asset.longitude || '',
          status: asset.status,
          purchaseDate: asset.purchaseDate || '',
          lastMaintenance: asset.lastMaintenance || '',
          nextMaintenance: asset.nextMaintenance || '',
          description: asset.description || '',
        });
      } else {
        navigate('/assets');
      }
    }
  }, [id, isEdit, assets, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await editAsset(parseInt(id), formData);
      } else {
        await addNewAsset(formData);
      }
      navigate('/assets');
    } catch (error) {
      alert('Lỗi khi lưu: ' + error.message);
    }
  };

  return (
    <div className="asset-form-container">
      <h1 className="asset-form-title">
        {isEdit ? '✏️ Sửa tài sản' : '➕ Thêm mới tài sản'}
      </h1>

      <div className="asset-form-card">
        <form onSubmit={handleSubmit}>
          <div className="asset-form-row">
            <div className="asset-form-group">
              <label className="asset-form-label">Tên tài sản <span className="required">*</span></label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="asset-form-input"
                required
                placeholder="Ví dụ: Bàn hội trường"
              />
            </div>
            <div className="asset-form-group">
              <label className="asset-form-label">Mã tài sản <span className="required">*</span></label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="asset-form-input"
                required
                placeholder="Ví dụ: TS-001"
              />
            </div>
            <div className="asset-form-group">
              <label className="asset-form-label">Danh mục <span className="required">*</span></label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="asset-form-input"
                required
                placeholder="Nội thất, thiết bị, phương tiện..."
              />
            </div>
            <div className="asset-form-group">
              <label className="asset-form-label">Tình trạng</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="asset-form-select"
              >
                <option value="Đang sử dụng">Đang sử dụng</option>
                <option value="Đang bảo trì">Đang bảo trì</option>
                <option value="Hỏng">Hỏng</option>
                <option value="Thanh lý">Thanh lý</option>
              </select>
            </div>
          </div>

          <div className="asset-form-group">
            <label className="asset-form-label">Vị trí</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="asset-form-input"
              placeholder="Ví dụ: Hội trường UBND xã"
            />
          </div>

          <div className="asset-form-row">
            <div className="asset-form-group">
              <label className="asset-form-label">Vĩ độ (Latitude)</label>
              <input
                type="number"
                step="any"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                className="asset-form-input"
                placeholder="Ví dụ: 21.0285"
              />
            </div>
            <div className="asset-form-group">
              <label className="asset-form-label">Kinh độ (Longitude)</label>
              <input
                type="number"
                step="any"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                className="asset-form-input"
                placeholder="Ví dụ: 105.8542"
              />
            </div>
          </div>

          <div className="asset-form-row">
            <div className="asset-form-group">
              <label className="asset-form-label">Ngày mua</label>
              <input
                type="date"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleChange}
                className="asset-form-input"
              />
            </div>
            <div className="asset-form-group">
              <label className="asset-form-label">Bảo trì gần nhất</label>
              <input
                type="date"
                name="lastMaintenance"
                value={formData.lastMaintenance}
                onChange={handleChange}
                className="asset-form-input"
              />
            </div>
            <div className="asset-form-group">
              <label className="asset-form-label">Bảo trì kế tiếp</label>
              <input
                type="date"
                name="nextMaintenance"
                value={formData.nextMaintenance}
                onChange={handleChange}
                className="asset-form-input"
              />
            </div>
          </div>

          <div className="asset-form-group">
            <label className="asset-form-label">Mô tả</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="asset-form-textarea"
              rows="3"
              placeholder="Thông tin thêm về tài sản..."
            ></textarea>
          </div>

          <div className="asset-form-actions">
            <button type="submit" className="asset-btn asset-btn-primary">
              {isEdit ? '💾 Cập nhật' : '➕ Thêm mới'}
            </button>
            <button type="button" className="asset-btn asset-btn-outline" onClick={() => navigate('/assets')}>
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssetForm;