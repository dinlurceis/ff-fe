import React from "react";
import "./IngredientPage.css";

const ProductFilter = ({
  // categorySearch,
  // setCategorySearch,
  // listCategory,
  minPriceIngredient,
  maxPriceIngredient,
  setMinPriceIngredient,
  setMaxPriceIngredient,
}) => {
  const PriceIngredient_MIN = 0;
  const PriceIngredient_MAX = 1000000;

  const PriceIngredientRanges = [
    { id: "0-50000", label: "0 - 50,000đ", count: 7, min: 0, max: 50000 },
    {
      id: "50000-100000",
      label: "50,000đ - 100,000đ",
      count: 4,
      min: 50000,
      max: 100000,
    },
    {
      id: "100000-200000",
      label: "100,000đ - 200,000đ",
      count: 2,
      min: 100000,
      max: 200000,
    },
    {
      id: "200000-500000",
      label: "200,000đ - 500,000đ",
      count: 2,
      min: 200000,
      max: 500000,
    },
    {
      id: "500000-above",
      label: "500,000đ - 2,000,000",
      count: 1,
      min: 500000,
      max: 2000000,
    },
  ];

  // const handleCategoryChange = (id) => {
  //   setCategorySearch((prev) =>
  //     prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
  //   );
  // };

  const handlePriceIngredientRangeSelect = (range) => {
    setMinPriceIngredient(range.min);
    setMaxPriceIngredient(range.max || PriceIngredient_MAX);
  };

  const resetPriceIngredientFilter = () => {
    setMinPriceIngredient(PriceIngredient_MIN);
    setMaxPriceIngredient(PriceIngredient_MAX);
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
        {PriceIngredientRanges.map((range) => (
          <div key={range.id} className="filter-option">
            <input
              type="radio"
              id={range.id}
              name="PriceIngredient-range"
              checked={
                minPriceIngredient === range.min &&
                (maxPriceIngredient === range.max || range.max === null)
              }
              onChange={() => handlePriceIngredientRangeSelect(range)}
            />
            <label htmlFor={range.id}>
              {range.label} ({range.count})
            </label>
          </div>
        ))}

        <div className="PriceIngredient-input-wrapper">
          <h4>Hoặc chọn mức giá phù hợp</h4>
          <div className="PriceIngredient-inputs">
            <input
              type="number"
              value={minPriceIngredient}
              onChange={(e) => {
                const value = Number(e.target.value);
                setMinPriceIngredient(
                  Math.min(Math.max(value, PriceIngredient_MIN), maxPriceIngredient - 1000)
                );
              }}
              placeholder="Từ"
            />
            <span>-</span>
            <input
              type="number"
              value={maxPriceIngredient}
              onChange={(e) => {
                const value = Number(e.target.value);
                setMaxPriceIngredient(
                  Math.max(Math.min(value, PriceIngredient_MAX), minPriceIngredient + 1000)
                );
              }}
              placeholder="Đến"
            />
            <button onClick={resetPriceIngredientFilter}>Xóa</button>
          </div>
        </div>

        <div className="current-filter-info">
          <div>
            <b>Giá:</b> Từ {minPriceIngredient}đ - Đến {maxPriceIngredient}đ
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;

// import React, { useState } from 'react';

// const ProductFilter = ({categorySearch,setCategorySearch,listCategory,minPriceIngredient,maxPriceIngredient,setMinPriceIngredient,setMaxPriceIngredient}) => {
// //   const [selectedCategory, setSelectedCategory] = useState('');
// //   const [minPriceIngredient, setMinPriceIngredient] = useState(0);
// //   const [maxPriceIngredient, setMaxPriceIngredient] = useState(1000000);

//   // Giá trị min-max của slider
//   const PriceIngredient_MIN = 0;
//   const PriceIngredient_MAX = 1000000;

// //   const categories = [
// //     { id: 'sach-tieng-viet', name: 'Sách Tiếng Việt', count: 3465 },
// //     { id: 'foreign-books', name: 'Foreign Books', count: 2 },
// //     { id: 'do-choi', name: 'Đồ Chơi', count: 1 }
// //   ];

//   const PriceIngredientRanges = [
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

//   const handlePriceIngredientRangeSelect = (range) => {
//     setMinPriceIngredient(range.min);
//     setMaxPriceIngredient(range.max || PriceIngredient_MAX);
//   };

//   const calculateSliderPosition = (value) => {
//     return ((value - PriceIngredient_MIN) / (PriceIngredient_MAX - PriceIngredient_MIN)) * 100;
//   };

//   const handleSliderChange = (values) => {
//     // Sắp xếp lại giá trị để giá trị lớn hơn luôn là max
//     const sortedValues = values.sort((a, b) => a - b);
//     setMaxPriceIngredient(sortedValues[1]);
//     setMinPriceIngredient(sortedValues[0]);
//   };

//   const resetPriceIngredientFilter = () => {
//     setMinPriceIngredient(PriceIngredient_MIN);
//     setMaxPriceIngredient(PriceIngredient_MAX);
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
//         {PriceIngredientRanges.map(range => (
//           <div key={range.id} className="flex items-center mb-1">
//             <input
//               type="radio"
//               id={range.id}
//               name="PriceIngredient-range"
//               checked={minPriceIngredient === range.min && (maxPriceIngredient === range.max || range.max === null)}
//               className="mr-2"
//               onChange={() => handlePriceIngredientRangeSelect(range)}
//             />
//             <label htmlFor={range.id} className="flex-grow">
//               {range.label} ({range.count})
//             </label>
//           </div>
//         ))}

//        <div className="mt-4 relative">
//           <h4 className="font-semibold mb-2">Hoặc chọn mức giá phù hợp</h4>

//           {/* Custom PriceIngredient Slider */}
//           {/* <div className="relative w-full h-10"> */}
//             {/* Slider Track */}
//             {/* <div className="absolute w-full h-1 bg-gray-300 top-1/2 transform -translate-y-1/2 rounded"> */}
//               {/* Progress Bar */}
//               {/* <div
//                 className="absolute h-1 bg-blue-500 rounded"
//                 style={{
//                   left: `${calculateSliderPosition(minPriceIngredient)}%`,
//                   width: `${calculateSliderPosition(maxPriceIngredient) - calculateSliderPosition(minPriceIngredient)}%`,
//                 }}
//               ></div>
//             </div> */}

//             {/* Input Range Min */}
//             {/* <input
//               type="range"
//               min={PriceIngredient_MIN}
//               max={PriceIngredient_MAX}
//               value={minPriceIngredient}
//               onChange={(e) => {
//                 const value = Number(e.target.value);
//                 if (value < maxPriceIngredient - 1000) {
//                   setMinPriceIngredient(value);
//                 }
//               }}
//               className="absolute w-full pointer-events-none appearance-none z-30"
//               style={{ WebkitAppearance: 'none' }}
//             /> */}

//             {/* Input Range Max */}
//             {/* <input
//               type="range"
//               min={PriceIngredient_MIN}
//               max={PriceIngredient_MAX}
//               value={maxPriceIngredient}
//               onChange={(e) => {
//                 const value = Number(e.target.value);
//                 if (value > minPriceIngredient + 1000) {
//                   setMaxPriceIngredient(value);
//                 }
//               }}
//               className="absolute w-full pointer-events-none appearance-none z-20"
//               style={{ WebkitAppearance: 'none' }}
//             /> */}

//             {/* Thumbs */}
//             {/* <div
//               className="absolute w-4 h-4 bg-blue-600 rounded-full top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40"
//               style={{ left: `${calculateSliderPosition(minPriceIngredient)}%` }}
//             ></div>
//             <div
//               className="absolute w-4 h-4 bg-blue-600 rounded-full top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40"
//               style={{ left: `${calculateSliderPosition(maxPriceIngredient)}%` }}
//             ></div>
//           </div> */}

//           {/* Giá hiện tại */}
//           {/* <div className="w-full flex justify-between text-sm text-gray-600 mt-6">
//             <span style={{width:"20px"}}>{minPriceIngredient}đ</span>
//             <span>-</span>
//             <span style={{width:"20px"}}>{maxPriceIngredient}đ</span>
//           </div> */}

//           {/* Manual PriceIngredient Input */}
//           <div className="flex items-center space-x-2 mt-4">
//             <input
//               type="number"
//               value={minPriceIngredient}
//               style={{width:"100px"}}
//               onChange={(e) => {
//                 const value = Number(e.target.value);
//                 setMinPriceIngredient(Math.min(Math.max(value, PriceIngredient_MIN), maxPriceIngredient - 1000));
//               }}
//               className="w-24 p-1 border rounded"
//               placeholder="Từ"
//             />
//             <span> - </span>
//             <input
//               type="number"
//               value={maxPriceIngredient}
//               style={{width:"100px"}}
//               onChange={(e) => {
//                 const value = Number(e.target.value);
//                 setMaxPriceIngredient(Math.max(Math.min(value, PriceIngredient_MAX), minPriceIngredient + 1000));
//               }}
//               className="w-24 p-1 border rounded"
//               placeholder="Đến"
//             />
//             <button
//               onClick={resetPriceIngredientFilter}
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
//             <b>Giá: </b>Từ {minPriceIngredient}đ - Đến {maxPriceIngredient}đ
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductFilter;
