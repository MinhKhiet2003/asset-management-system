// services/api.js

// Dữ liệu mẫu tài sản công đa dạng
let assets = [
  // Nội thất
  {
    id: 1,
    name: 'Bàn hội trường',
    category: 'Nội thất',
    code: 'TS-001',
    location: 'Hội trường UBND xã',
    latitude: 21.0285,
    longitude: 105.8542,
    status: 'Đang sử dụng',
    purchaseDate: '2020-05-10',
    lastMaintenance: '2023-12-01',
    nextMaintenance: '2024-06-01',
    description: 'Bàn dài 2m, chất liệu gỗ công nghiệp, màu nâu',
    image: null,
    history: [
      { date: '2020-05-10', event: 'Nhập kho' },
      { date: '2021-03-15', event: 'Sửa chữa nhỏ' }
    ]
  },
  {
    id: 2,
    name: 'Ghế hội trường (50 cái)',
    category: 'Nội thất',
    code: 'TS-002',
    location: 'Hội trường UBND xã',
    latitude: 21.0285,
    longitude: 105.8542,
    status: 'Đang sử dụng',
    purchaseDate: '2020-05-10',
    lastMaintenance: '2023-11-15',
    nextMaintenance: '2024-05-15',
    description: 'Ghế nhựa, màu xanh, 50 cái',
    image: null,
    history: [
      { date: '2020-05-10', event: 'Nhập kho' },
      { date: '2023-11-15', event: 'Vệ sinh, kiểm tra' }
    ]
  },
  {
    id: 3,
    name: 'Bàn làm việc cán bộ',
    category: 'Nội thất',
    code: 'TS-003',
    location: 'Phòng làm việc UBND xã',
    latitude: 21.0287,
    longitude: 105.8545,
    status: 'Đang sử dụng',
    purchaseDate: '2019-08-20',
    lastMaintenance: '2023-09-10',
    nextMaintenance: '2024-03-10',
    description: 'Bàn gỗ, kích thước 1.6m x 0.8m',
    image: null,
    history: [
      { date: '2019-08-20', event: 'Nhập kho' },
      { date: '2023-09-10', event: 'Sơn lại mặt bàn' }
    ]
  },
  {
    id: 4,
    name: 'Tủ tài liệu',
    category: 'Nội thất',
    code: 'TS-004',
    location: 'Phòng làm việc UBND xã',
    latitude: 21.0287,
    longitude: 105.8545,
    status: 'Đang sử dụng',
    purchaseDate: '2018-11-01',
    lastMaintenance: '2022-12-20',
    nextMaintenance: '2024-06-20',
    description: 'Tủ sắt, 4 ngăn, màu xám',
    image: null,
    history: [
      { date: '2018-11-01', event: 'Nhập kho' }
    ]
  },

  // Thiết bị văn phòng
  {
    id: 5,
    name: 'Máy tính để bàn',
    category: 'Thiết bị văn phòng',
    code: 'TS-005',
    location: 'Phòng làm việc UBND xã',
    latitude: 21.0287,
    longitude: 105.8545,
    status: 'Đang sử dụng',
    purchaseDate: '2021-06-15',
    lastMaintenance: '2023-10-05',
    nextMaintenance: '2024-04-05',
    description: 'Máy tính HP, Core i5, RAM 8GB, SSD 256GB',
    image: null,
    history: [
      { date: '2021-06-15', event: 'Nhập kho' },
      { date: '2023-10-05', event: 'Vệ sinh, cài đặt lại' }
    ]
  },
  {
    id: 6,
    name: 'Máy in laser',
    category: 'Thiết bị văn phòng',
    code: 'TS-006',
    location: 'Phòng làm việc UBND xã',
    latitude: 21.0287,
    longitude: 105.8545,
    status: 'Đang sử dụng',
    purchaseDate: '2022-01-10',
    lastMaintenance: '2023-08-20',
    nextMaintenance: '2024-02-20',
    description: 'Máy in Brother HL-1210W',
    image: null,
    history: [
      { date: '2022-01-10', event: 'Nhập kho' },
      { date: '2023-08-20', event: 'Thay mực' }
    ]
  },
  {
    id: 7,
    name: 'Máy chiếu',
    category: 'Thiết bị văn phòng',
    code: 'TS-007',
    location: 'Hội trường UBND xã',
    latitude: 21.0285,
    longitude: 105.8542,
    status: 'Đang bảo trì',
    purchaseDate: '2020-09-01',
    lastMaintenance: '2023-11-20',
    nextMaintenance: '2024-05-20',
    description: 'Máy chiếu Epson EB-X05, độ phân giải XGA',
    image: null,
    history: [
      { date: '2020-09-01', event: 'Nhập kho' },
      { date: '2023-11-20', event: 'Bảo trì, thay bóng đèn' }
    ]
  },

  // Phương tiện
  {
    id: 8,
    name: 'Xe ô tô tải',
    category: 'Phương tiện',
    code: 'TS-008',
    location: 'Bãi đỗ xe UBND xã',
    latitude: 21.0283,
    longitude: 105.8540,
    status: 'Đang sử dụng',
    purchaseDate: '2018-03-15',
    lastMaintenance: '2023-12-10',
    nextMaintenance: '2024-06-10',
    description: 'Xe tải Hyundai, tải trọng 1.5 tấn, biển số 29C-123.45',
    image: null,
    history: [
      { date: '2018-03-15', event: 'Nhập kho' },
      { date: '2023-12-10', event: 'Bảo dưỡng định kỳ' }
    ]
  },
  {
    id: 9,
    name: 'Xe máy công vụ',
    category: 'Phương tiện',
    code: 'TS-009',
    location: 'Bãi đỗ xe UBND xã',
    latitude: 21.0283,
    longitude: 105.8540,
    status: 'Đang sử dụng',
    purchaseDate: '2021-11-20',
    lastMaintenance: '2023-09-15',
    nextMaintenance: '2024-03-15',
    description: 'Xe máy Honda Wave RSX, biển số 29F1-678.90',
    image: null,
    history: [
      { date: '2021-11-20', event: 'Nhập kho' },
      { date: '2023-09-15', event: 'Thay nhớt, kiểm tra' }
    ]
  },

  // Cơ sở vật chất khác
  {
    id: 10,
    name: 'Cờ Tổ quốc (10 lá)',
    category: 'Trang trí',
    code: 'TS-010',
    location: 'Kho vật tư UBND xã',
    latitude: 21.0286,
    longitude: 105.8543,
    status: 'Đang sử dụng',
    purchaseDate: '2022-09-02',
    lastMaintenance: null,
    nextMaintenance: null,
    description: 'Cờ đỏ sao vàng, kích thước 1.2m x 0.8m, 10 lá',
    image: null,
    history: [
      { date: '2022-09-02', event: 'Nhập kho' }
    ]
  },
  {
    id: 11,
    name: 'Loa âm thanh hội trường',
    category: 'Thiết bị âm thanh',
    code: 'TS-011',
    location: 'Hội trường UBND xã',
    latitude: 21.0285,
    longitude: 105.8542,
    status: 'Đang sử dụng',
    purchaseDate: '2020-07-01',
    lastMaintenance: '2023-10-20',
    nextMaintenance: '2024-04-20',
    description: 'Bộ loa công suất 100W, 4 loa treo tường',
    image: null,
    history: [
      { date: '2020-07-01', event: 'Nhập kho' },
      { date: '2023-10-20', event: 'Kiểm tra, vệ sinh' }
    ]
  },
  {
    id: 12,
    name: 'Điều hòa nhiệt độ',
    category: 'Thiết bị điện',
    code: 'TS-012',
    location: 'Phòng làm việc UBND xã',
    latitude: 21.0287,
    longitude: 105.8545,
    status: 'Đang sử dụng',
    purchaseDate: '2020-05-20',
    lastMaintenance: '2023-11-01',
    nextMaintenance: '2024-05-01',
    description: 'Điều hòa Daikin inverter 1HP',
    image: null,
    history: [
      { date: '2020-05-20', event: 'Nhập kho' },
      { date: '2023-11-01', event: 'Vệ sinh, bổ sung gas' }
    ]
  },
  {
    id: 13,
    name: 'Quạt trần',
    category: 'Thiết bị điện',
    code: 'TS-013',
    location: 'Hội trường UBND xã',
    latitude: 21.0285,
    longitude: 105.8542,
    status: 'Đang sử dụng',
    purchaseDate: '2019-04-10',
    lastMaintenance: '2022-08-15',
    nextMaintenance: '2024-08-15',
    description: 'Quạt trần 5 cánh, màu trắng',
    image: null,
    history: [
      { date: '2019-04-10', event: 'Nhập kho' },
      { date: '2022-08-15', event: 'Vệ sinh, bảo trì' }
    ]
  },
  {
    id: 14,
    name: 'Bảng viết',
    category: 'Trang thiết bị',
    code: 'TS-014',
    location: 'Phòng họp UBND xã',
    latitude: 21.0286,
    longitude: 105.8544,
    status: 'Đang sử dụng',
    purchaseDate: '2021-07-12',
    lastMaintenance: null,
    nextMaintenance: null,
    description: 'Bảng viết trắng, kích thước 1.2m x 0.9m, có chân đế',
    image: null,
    history: [
      { date: '2021-07-12', event: 'Nhập kho' }
    ]
  },
  {
    id: 15,
    name: 'Tủ lạnh',
    category: 'Thiết bị điện',
    code: 'TS-015',
    location: 'Nhà bếp UBND xã',
    latitude: 21.0284,
    longitude: 105.8546,
    status: 'Hỏng',
    purchaseDate: '2016-11-05',
    lastMaintenance: '2020-06-10',
    nextMaintenance: null,
    description: 'Tủ lạnh cũ, công suất 120L, đã hỏng máy nén',
    image: null,
    history: [
      { date: '2016-11-05', event: 'Nhập kho' },
      { date: '2020-06-10', event: 'Hỏng máy nén, chờ thanh lý' }
    ]
  },
  {
    id: 16,
    name: 'Ghế xoay văn phòng',
    category: 'Nội thất',
    code: 'TS-016',
    location: 'Phòng làm việc UBND xã',
    latitude: 21.0287,
    longitude: 105.8545,
    status: 'Đang sử dụng',
    purchaseDate: '2020-12-15',
    lastMaintenance: null,
    nextMaintenance: null,
    description: 'Ghế xoay, tựa lưng cao, màu đen',
    image: null,
    history: [
      { date: '2020-12-15', event: 'Nhập kho' }
    ]
  },
  {
    id: 17,
    name: 'Bàn ăn tập thể',
    category: 'Nội thất',
    code: 'TS-017',
    location: 'Nhà bếp UBND xã',
    latitude: 21.0284,
    longitude: 105.8546,
    status: 'Đang sử dụng',
    purchaseDate: '2021-02-20',
    lastMaintenance: null,
    nextMaintenance: null,
    description: 'Bàn tròn đường kính 1.2m, mặt đá',
    image: null,
    history: [
      { date: '2021-02-20', event: 'Nhập kho' }
    ]
  },
  {
    id: 18,
    name: 'Ghế nhựa (100 cái)',
    category: 'Nội thất',
    code: 'TS-018',
    location: 'Kho vật tư UBND xã',
    latitude: 21.0286,
    longitude: 105.8543,
    status: 'Đang sử dụng',
    purchaseDate: '2022-03-01',
    lastMaintenance: null,
    nextMaintenance: null,
    description: 'Ghế nhựa màu xanh, 100 cái, dùng cho sự kiện',
    image: null,
    history: [
      { date: '2022-03-01', event: 'Nhập kho' }
    ]
  },
  {
    id: 19,
    name: 'Máy ảnh',
    category: 'Thiết bị văn phòng',
    code: 'TS-019',
    location: 'Phòng làm việc UBND xã',
    latitude: 21.0287,
    longitude: 105.8545,
    status: 'Đang sử dụng',
    purchaseDate: '2022-10-05',
    lastMaintenance: null,
    nextMaintenance: null,
    description: 'Máy ảnh Canon EOS 2000D, ống kính 18-55mm',
    image: null,
    history: [
      { date: '2022-10-05', event: 'Nhập kho' }
    ]
  },
  {
    id: 20,
    name: 'Cờ hội (20 lá)',
    category: 'Trang trí',
    code: 'TS-020',
    location: 'Kho vật tư UBND xã',
    latitude: 21.0286,
    longitude: 105.8543,
    status: 'Đang sử dụng',
    purchaseDate: '2023-01-20',
    lastMaintenance: null,
    nextMaintenance: null,
    description: 'Cờ đuôi nheo, màu sắc đa dạng, dùng trong sự kiện',
    image: null,
    history: [
      { date: '2023-01-20', event: 'Nhập kho' }
    ]
  },
  {
    id: 21,
    name: 'Loa cầm tay',
    category: 'Thiết bị âm thanh',
    code: 'TS-021',
    location: 'Phòng làm việc UBND xã',
    latitude: 21.0287,
    longitude: 105.8545,
    status: 'Đang bảo trì',
    purchaseDate: '2021-05-15',
    lastMaintenance: '2023-12-01',
    nextMaintenance: '2024-06-01',
    description: 'Loa di động, công suất 15W, tích hợp micro',
    image: null,
    history: [
      { date: '2021-05-15', event: 'Nhập kho' },
      { date: '2023-12-01', event: 'Pin yếu, gửi bảo trì' }
    ]
  },
  {
    id: 22,
    name: 'Bộ bàn ghế tiếp khách',
    category: 'Nội thất',
    code: 'TS-022',
    location: 'Phòng tiếp khách UBND xã',
    latitude: 21.0288,
    longitude: 105.8546,
    status: 'Đang sử dụng',
    purchaseDate: '2019-10-10',
    lastMaintenance: '2023-08-05',
    nextMaintenance: '2024-02-05',
    description: 'Bộ bàn ghế sofa, gồm 1 bàn và 2 ghế đơn',
    image: null,
    history: [
      { date: '2019-10-10', event: 'Nhập kho' },
      { date: '2023-08-05', event: 'Vệ sinh, bọc lại' }
    ]
  },
  {
    id: 23,
    name: 'Máy photocopy',
    category: 'Thiết bị văn phòng',
    code: 'TS-023',
    location: 'Phòng làm việc UBND xã',
    latitude: 21.0287,
    longitude: 105.8545,
    status: 'Đang sử dụng',
    purchaseDate: '2022-06-01',
    lastMaintenance: '2023-11-10',
    nextMaintenance: '2024-05-10',
    description: 'Máy photocopy Ricoh MPC 3503, in màu, scan',
    image: null,
    history: [
      { date: '2022-06-01', event: 'Nhập kho' },
      { date: '2023-11-10', event: 'Thay mực, bảo trì' }
    ]
  },
  {
    id: 24,
    name: 'Bộ loa di động',
    category: 'Thiết bị âm thanh',
    code: 'TS-024',
    location: 'Kho vật tư UBND xã',
    latitude: 21.0286,
    longitude: 105.8543,
    status: 'Thanh lý',
    purchaseDate: '2016-09-15',
    lastMaintenance: '2019-07-20',
    nextMaintenance: null,
    description: 'Bộ loa di động cũ, 2 loa + amply, đã cũ và không sử dụng',
    image: null,
    history: [
      { date: '2016-09-15', event: 'Nhập kho' },
      { date: '2023-12-20', event: 'Thanh lý do hỏng hóc' }
    ]
  },
  {
    id: 25,
    name: 'Tủ đựng hồ sơ',
    category: 'Nội thất',
    code: 'TS-025',
    location: 'Phòng làm việc UBND xã',
    latitude: 21.0287,
    longitude: 105.8545,
    status: 'Đang sử dụng',
    purchaseDate: '2020-04-01',
    lastMaintenance: null,
    nextMaintenance: null,
    description: 'Tủ hồ sơ 4 tầng, khóa an toàn',
    image: null,
    history: [
      { date: '2020-04-01', event: 'Nhập kho' }
    ]
  }
];

export const fetchAssets = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...assets]), 500);
  });
};

export const addAsset = (asset) => {
  const newAsset = { ...asset, id: Date.now(), history: [] };
  assets.push(newAsset);
  return Promise.resolve(newAsset);
};

export const updateAsset = (id, updatedData) => {
  const index = assets.findIndex(a => a.id === id);
  if (index !== -1) {
    assets[index] = { ...assets[index], ...updatedData };
    return Promise.resolve(assets[index]);
  }
  return Promise.reject('Không tìm thấy');
};

export const deleteAsset = (id) => {
  assets = assets.filter(a => a.id !== id);
  return Promise.resolve();
};