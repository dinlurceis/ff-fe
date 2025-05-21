import React from "react";
import "./IngredientPage.css";

const ProductFilter = ({
  categorySearch,
  setCategorySearch,
  listCategory,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
}) => {
  const PRICE_MIN = 0;
  const PRICE_MAX = 1000000;

  const priceRanges = [
    { id: "0-150000", label: "0 - 150,000đ", count: 3465, min: 0, max: 150000 },
    {
      id: "150000-300000",
      label: "150,000đ - 300,000đ",
      count: 76,
      min: 150000,
      max: 300000,
    },
    {
      id: "300000-500000",
      label: "300,000đ - 500,000đ",
      count: 14,
      min: 300000,
      max: 500000,
    },
    {
      id: "500000-700000",
      label: "500,000đ - 700,000đ",
      count: 2,
      min: 500000,
      max: 700000,
    },
    {
      id: "700000-above",
      label: "700,000đ - 1,000,000",
      count: 1,
      min: 700000,
      max: 1000000,
    },
  ];

  const handleCategoryChange = (id) => {
    setCategorySearch((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handlePriceRangeSelect = (range) => {
    setMinPrice(range.min);
    setMaxPrice(range.max || PRICE_MAX);
  };

  const resetPriceFilter = () => {
    setMinPrice(PRICE_MIN);
    setMaxPrice(PRICE_MAX);
  };

  return (
    <div className="filter-container">
      <h2 className="filter-title">LỌC THEO</h2>

      {/* <div className="filter-section">
        <h3 className="filter-section-title">DANH MỤC CHÍNH</h3>
        {listCategory.map((category) => (
          <div key={category.id} className="filter-option">
            <input
              type="checkbox"
              id={category.id}
              checked={categorySearch.includes(category.id)}
              onChange={() => handleCategoryChange(category.id)}
            />
            <label htmlFor={category.id}>{category.name}</label>
          </div>
        ))}
      </div> */}

      <div className="filter-section">
        <h3 className="filter-section-title">GIÁ</h3>
        {priceRanges.map((range) => (
          <div key={range.id} className="filter-option">
            <input
              type="radio"
              id={range.id}
              name="price-range"
              checked={
                minPrice === range.min &&
                (maxPrice === range.max || range.max === null)
              }
              onChange={() => handlePriceRangeSelect(range)}
            />
            <label htmlFor={range.id}>
              {range.label} ({range.count})
            </label>
          </div>
        ))}

        <div className="price-input-wrapper">
          <h4>Hoặc chọn mức giá phù hợp</h4>
          <div className="price-inputs">
            <input
              type="number"
              value={minPrice}
              onChange={(e) => {
                const value = Number(e.target.value);
                setMinPrice(
                  Math.min(Math.max(value, PRICE_MIN), maxPrice - 1000)
                );
              }}
              placeholder="Từ"
            />
            <span>-</span>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => {
                const value = Number(e.target.value);
                setMaxPrice(
                  Math.max(Math.min(value, PRICE_MAX), minPrice + 1000)
                );
              }}
              placeholder="Đến"
            />
            <button onClick={resetPriceFilter}>Xóa</button>
          </div>
        </div>

        <div className="current-filter-info">
          <div>
            <b>Giá:</b> Từ {minPrice}đ - Đến {maxPrice}đ
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;

// import React, { useState } from 'react';

// const ProductFilter = ({categorySearch,setCategorySearch,listCategory,minPrice,maxPrice,setMinPrice,setMaxPrice}) => {
// //   const [selectedCategory, setSelectedCategory] = useState('');
// //   const [minPrice, setMinPrice] = useState(0);
// //   const [maxPrice, setMaxPrice] = useState(1000000);

//   // Giá trị min-max của slider
//   const PRICE_MIN = 0;
//   const PRICE_MAX = 1000000;

// //   const categories = [
// //     { id: 'sach-tieng-viet', name: 'Sách Tiếng Việt', count: 3465 },
// //     { id: 'foreign-books', name: 'Foreign Books', count: 2 },
// //     { id: 'do-choi', name: 'Đồ Chơi', count: 1 }
// //   ];

//   const priceRanges = [
//     { id: '0-150000', label: '0 - 150,000đ', count: 3465, min: 0, max: 150000 },
//     { id: '150000-300000', label: '150,000đ - 300,000đ', count: 76, min: 150000, max: 300000 },
//     { id: '300000-500000', label: '300,000đ - 500,000đ', count: 14, min: 300000, max: 500000 },
//     { id: '500000-700000', label: '500,000đ - 700,000đ', count: 2, min: 500000, max: 700000 },
//     { id: '700000-above', label: '700,000đ - 1,000,000', count: 1, min: 700000, max: 1000000 }
//   ];

//   const handleCategoryChange = (id) => {
//     setCategorySearch(prev =>
//         prev.includes(id)
//         ? prev.filter(item => item !== id) // bỏ chọn nếu đã có
//         : [...prev, id] // thêm nếu chưa có
//     );
//     };

//   const handlePriceRangeSelect = (range) => {
//     setMinPrice(range.min);
//     setMaxPrice(range.max || PRICE_MAX);
//   };

//   const calculateSliderPosition = (value) => {
//     return ((value - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
//   };

//   const handleSliderChange = (values) => {
//     // Sắp xếp lại giá trị để giá trị lớn hơn luôn là max
//     const sortedValues = values.sort((a, b) => a - b);
//     setMaxPrice(sortedValues[1]);
//     setMinPrice(sortedValues[0]);
//   };

//   const resetPriceFilter = () => {
//     setMinPrice(PRICE_MIN);
//     setMaxPrice(PRICE_MAX);
//   };

//   return (
//     <div className="p-4 border rounded-lg">
//       <h2 className="text-xl font-bold mb-4 text-red-600" style={{color:"#f2291b",textAlign:'center'}}>LỌC THEO</h2>

//       <div className="mb-4">
//         <h3 className="mb-2" style={{fontSize:"25px"}}>DANH MỤC CHÍNH</h3>
//         {listCategory.map(category => (
//           <div key={category.id} className="flex items-center mb-1">
//                 <input
//                     type="checkbox"
//                     id={category.id}
//                     checked={categorySearch.includes(category.id)}
//                     onChange={() => handleCategoryChange(category.id)}
//                     className="mr-2"
//                 />
//             <label htmlFor={category.id} className="flex-grow">
//               {category.name}
//             </label>
//           </div>
//         ))}
//       </div>

//       <div>
//         <h3 className="mb-2" style={{fontSize:"25px"}}>GIÁ</h3>
//         {priceRanges.map(range => (
//           <div key={range.id} className="flex items-center mb-1">
//             <input
//               type="radio"
//               id={range.id}
//               name="price-range"
//               checked={minPrice === range.min && (maxPrice === range.max || range.max === null)}
//               className="mr-2"
//               onChange={() => handlePriceRangeSelect(range)}
//             />
//             <label htmlFor={range.id} className="flex-grow">
//               {range.label} ({range.count})
//             </label>
//           </div>
//         ))}

//        <div className="mt-4 relative">
//           <h4 className="font-semibold mb-2">Hoặc chọn mức giá phù hợp</h4>

//           {/* Custom Price Slider */}
//           {/* <div className="relative w-full h-10"> */}
//             {/* Slider Track */}
//             {/* <div className="absolute w-full h-1 bg-gray-300 top-1/2 transform -translate-y-1/2 rounded"> */}
//               {/* Progress Bar */}
//               {/* <div
//                 className="absolute h-1 bg-blue-500 rounded"
//                 style={{
//                   left: `${calculateSliderPosition(minPrice)}%`,
//                   width: `${calculateSliderPosition(maxPrice) - calculateSliderPosition(minPrice)}%`,
//                 }}
//               ></div>
//             </div> */}

//             {/* Input Range Min */}
//             {/* <input
//               type="range"
//               min={PRICE_MIN}
//               max={PRICE_MAX}
//               value={minPrice}
//               onChange={(e) => {
//                 const value = Number(e.target.value);
//                 if (value < maxPrice - 1000) {
//                   setMinPrice(value);
//                 }
//               }}
//               className="absolute w-full pointer-events-none appearance-none z-30"
//               style={{ WebkitAppearance: 'none' }}
//             /> */}

//             {/* Input Range Max */}
//             {/* <input
//               type="range"
//               min={PRICE_MIN}
//               max={PRICE_MAX}
//               value={maxPrice}
//               onChange={(e) => {
//                 const value = Number(e.target.value);
//                 if (value > minPrice + 1000) {
//                   setMaxPrice(value);
//                 }
//               }}
//               className="absolute w-full pointer-events-none appearance-none z-20"
//               style={{ WebkitAppearance: 'none' }}
//             /> */}

//             {/* Thumbs */}
//             {/* <div
//               className="absolute w-4 h-4 bg-blue-600 rounded-full top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40"
//               style={{ left: `${calculateSliderPosition(minPrice)}%` }}
//             ></div>
//             <div
//               className="absolute w-4 h-4 bg-blue-600 rounded-full top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40"
//               style={{ left: `${calculateSliderPosition(maxPrice)}%` }}
//             ></div>
//           </div> */}

//           {/* Giá hiện tại */}
//           {/* <div className="w-full flex justify-between text-sm text-gray-600 mt-6">
//             <span style={{width:"20px"}}>{minPrice}đ</span>
//             <span>-</span>
//             <span style={{width:"20px"}}>{maxPrice}đ</span>
//           </div> */}

//           {/* Manual Price Input */}
//           <div className="flex items-center space-x-2 mt-4">
//             <input
//               type="number"
//               value={minPrice}
//               style={{width:"100px"}}
//               onChange={(e) => {
//                 const value = Number(e.target.value);
//                 setMinPrice(Math.min(Math.max(value, PRICE_MIN), maxPrice - 1000));
//               }}
//               className="w-24 p-1 border rounded"
//               placeholder="Từ"
//             />
//             <span> - </span>
//             <input
//               type="number"
//               value={maxPrice}
//               style={{width:"100px"}}
//               onChange={(e) => {
//                 const value = Number(e.target.value);
//                 setMaxPrice(Math.max(Math.min(value, PRICE_MAX), minPrice + 1000));
//               }}
//               className="w-24 p-1 border rounded"
//               placeholder="Đến"
//             />
//             <button
//               onClick={resetPriceFilter}
//               style={{background:"#f2291b"}}
//               className="ml-2 px-2 py-1 bg-red-500 text-white rounded text-sm"
//             >
//               Xóa
//             </button>
//           </div>
//         </div>

//         {/* Hiển thị thông tin lọc hiện tại */}
//         <div className="mt-4 text-sm text-gray-600">
//             <div>
//                 <b>Danh mục:</b>{" "}
//                 {categorySearch.length > 0
//                     ? categorySearch
//                         .map(id => listCategory.find(c => c.id === id)?.name)
//                         .filter(Boolean)
//                         .join(", ")
//                     : "Không có"}
//             </div>
//           <div>
//             <b>Giá: </b>Từ {minPrice}đ - Đến {maxPrice}đ
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductFilter;
