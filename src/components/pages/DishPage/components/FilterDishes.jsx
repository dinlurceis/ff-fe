import React, { useState } from "react";

export const ProductFilter = ({
  categorySearch,
  setCategorySearch,
  listCategory,
  minTimeCook,
  maxTimeCook,
  setMinTimeCook,
  setMaxTimeCook,
}) => {
  // const [selectedCategory, setSelectedCategory] = useState('');
  // const [minTimeCook, setMinTimeCook] = useState(0);
  // const [maxTimeCook, setMaxTimeCook] = useState(120);

  // Thời gian nấu trị min-max của slider
  const TimeCook_MIN = 0;
  const TimeCook_MAX = 120;

  //   const categories = [
  //     { id: 'sach-tieng-viet', name: 'Sách Tiếng Việt', count: 3465 },
  //     { id: 'foreign-books', name: 'Foreign Books', count: 2 },
  //     { id: 'do-choi', name: 'Đồ Chơi', count: 1 }
  //   ];

  const timeCookRanges = [
    { id: "0-15", label: "0 - 15 phút", count: 5, min: 0, max: 15 },
    { id: "15-30", label: "15 - 30 phút", count: 3, min: 15, max: 30 },
    { id: "30-45", label: "30 - 45 phút", count: 4, min: 30, max: 45 },
    { id: "45-60", label: "45 - 60 phút", count: 2, min: 45, max: 60 },
    { id: "60-above", label: "> 60 phút", count: 1, min: 60, max: 120 },
  ];

  const handleCategoryChange = (id) => {
    setCategorySearch(
      (prev) =>
        prev.includes(id)
          ? prev.filter((item) => item !== id) // bỏ chọn nếu đã có
          : [...prev, id] // thêm nếu chưa có
    );
  };

  const handleTimeCookRangeSelect = (range) => {
    setMinTimeCook(range.min);
    setMaxTimeCook(range.max || TimeCook_MAX);
  };

  const calculateSliderPosition = (value) => {
    return ((value - TimeCook_MIN) / (TimeCook_MAX - TimeCook_MIN)) * 100;
  };

  const handleSliderChange = (values) => {
    // Sắp xếp lại Thời gian nấu trị để Thời gian nấu trị lớn hơn luôn là max
    const sortedValues = values.sort((a, b) => a - b);
    setMaxTimeCook(sortedValues[1]);
    setMinTimeCook(sortedValues[0]);
  };

  const resetTimeCookFilter = () => {
    setMinTimeCook(TimeCook_MIN);
    setMaxTimeCook(TimeCook_MAX);
  };

  return (
    <div className="filter-container">
      <h2 className="filter-title">LỌC THEO</h2>

      <div className="mb-4">
        <h3 className="mb-2" style={{ fontSize: "25px" }}>
          DANH MỤC CHÍNH
        </h3>
        {listCategory.map((category) => (
          <div key={category.id} className="flex items-center mb-1">
            <input
              type="checkbox"
              id={category.id}
              checked={categorySearch.includes(category.id)}
              onChange={() => handleCategoryChange(category.id)}
              className="mr-2"
            />
            <label htmlFor={category.id} className="flex-grow">
              {category.name}
            </label>
          </div>
        ))}
      </div>

      <div>
        <h3 className="mb-2" style={{ fontSize: "25px" }}>
          THỜI GIAN NẤU
        </h3>
        {timeCookRanges.map((range) => (
          <div key={range.id} className="flex items-center mb-1">
            <input
              type="radio"
              id={range.id}
              name="TimeCook-range"
              checked={
                minTimeCook === range.min &&
                (maxTimeCook === range.max || range.max === null)
              }
              className="mr-2"
              onChange={() => handleTimeCookRangeSelect(range)}
            />
            <label htmlFor={range.id} className="flex-grow">
              {range.label} ({range.count})
            </label>
          </div>
        ))}
        <div className="mt-4 relative">
          <h4 className="font-semibold mb-2">Hoặc chọn thời gian nấu phù hợp</h4>
          {/* Custom TimeCook Slider
        <div className="relative w-full h-10"> 
        <div className="absolute w-full h-1 bg-gray-300 top-1/2 transform -translate-y-1/2 rounded">
        <div
                className="absolute h-1 bg-blue-500 rounded"
                style={{
                  left: `${calculateSliderPosition(minTimeCook)}%`,
                  width: `${calculateSliderPosition(maxTimeCook) - calculateSliderPosition(minTimeCook)}%`,
                }}
              ></div>
            </div>

        <input
              type="range"
              min={TimeCook_MIN}
              max={TimeCook_MAX}
              value={minTimeCook}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value < maxTimeCook - 1000) {
                  setMinTimeCook(value);
                }
              }}
              className="absolute w-full pointer-events-none appearance-none z-30"
              style={{ WebkitAppearance: 'none' }}
            />

        <input
              type="range"
              min={TimeCook_MIN}
              max={TimeCook_MAX}
              value={maxTimeCook}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value > minTimeCook + 1000) {
                  setMaxTimeCook(value);
                }
              }}
              className="absolute w-full pointer-events-none appearance-none z-20"
              style={{ WebkitAppearance: 'none' }}
            />

        <div
              className="absolute w-4 h-4 bg-blue-600 rounded-full top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40"
              style={{ left: `${calculateSliderPosition(minTimeCook)}%` }}
            ></div>
            <div
              className="absolute w-4 h-4 bg-blue-600 rounded-full top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40"
              style={{ left: `${calculateSliderPosition(maxTimeCook)}%` }}
            ></div>
          </div>

        <div className="w-full flex justify-between text-sm text-gray-600 mt-6">
            <span style={{width:"20px"}}>{minTimeCook} phút</span>
            <span>-</span>
            <span style={{width:"20px"}}>{maxTimeCook} phút</span>
          </div> */}
          
          <div className="flex items-center space-x-2 mt-4">
            <input
              type="number"
              value={minTimeCook}
              style={{ width: "100px" }}
              onChange={(e) => {
                const value = Number(e.target.value);
                setMinTimeCook(
                  Math.min(Math.max(value, TimeCook_MIN), maxTimeCook - 15)
                );
              }}
              className="w-24 p-1 border rounded"
              placeholder="Từ"
            />
            <span> - </span>
            <input
              type="number"
              value={maxTimeCook}
              style={{ width: "100px" }}
              onChange={(e) => {
                const value = Number(e.target.value);
                setMaxTimeCook(
                  Math.max(Math.min(value, TimeCook_MAX), minTimeCook + 15)
                );
              }}
              className="w-24 p-1 border rounded"
              placeholder="Đến"
            />
            <button
              onClick={resetTimeCookFilter}
              style={{ background: "#f2291b" }}
              className="ml-2 px-2 py-1 bg-red-500 text-white rounded text-sm"
            >
              Xóa
            </button>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <div>
            <b>Danh mục:</b>{" "}
            {categorySearch.length > 0
              ? categorySearch
                  .map((id) => listCategory.find((c) => c.id === id)?.name)
                  .filter(Boolean)
                  .join(", ")
              : "Không có"}
          </div>
          <div>
            <b>Thời gian nấu: </b>Từ {minTimeCook} phút - Đến {maxTimeCook} phút
          </div>
        </div>
      </div>
    </div>
  );
};
