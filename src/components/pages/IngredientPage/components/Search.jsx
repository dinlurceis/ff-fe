import { useEffect, useState } from "react";
import { Select } from "antd";
import { listAllCategory } from "../../../../service/CategoryService";
import ProductFilter from "./FilterIngredients";
import { ViewIngredient } from "./ViewIngredient";
import { searchIngredients } from "../../../../service/IngredientBySupplierService";

export const Search = ({ ingredients, sortBy, listSearch }) => {
  // const [listCategory, setListCategory] = useState([]);
  // const [categorySearch, setCategorySearch] = useState([]);
  const [nameIngredient, setNameIngredient] = useState("");
  const [minPriceIngredient, setMinPriceIngredient] = useState(0);
  const [maxPriceIngredient, setMaxPriceIngredient] = useState(2000000);
  const [sort, setSort] = useState("");
  // const [supplier, setSupplier] = useState("");

  const handleSearch = () => {
    let searchs = [];

    console.log(nameIngredient);
    searchs.push(`nameIngredient:${nameIngredient}`);
  
    // if (categorySearch.length > 0) {
    //   searchs.push(...categorySearch);
    // }

    console.log(minPriceIngredient);
    if (maxPriceIngredient !== null && maxPriceIngredient !== "") {
      searchs.push(`priceIngredient<${maxPriceIngredient}`);
    }

    if (minPriceIngredient !== null && minPriceIngredient !== "") {
      searchs.push(`priceIngredient>${minPriceIngredient}`);
    }

    if (sort) {
      sortBy(sort); // Gửi sort về cha nếu cần
    }

    listSearch(searchs); // Gửi search về cha nếu cần
    handleFilterAll(searchs, sort); // Gọi API
  };

  const handleFilterAll = async (searchs, sortValue) => {
    try {
      const response = await searchIngredients(1, 12, sortValue, searchs); // sortValue là string
      if (response && response.result) {
        ingredients(response.result.items);
      } else {
        ingredients([]);
      }
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  };

  return (
    <>
      {/* <div className="container"> */}
      <div className="row gutters" style={{ width: "100%", marginTop: "20px" }}>
        {/* Cột trái */}
        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
          <div className="card h-100">
            <div className="card-body">
              <ProductFilter
                // categorySearch={categorySearch}
                // setCategorySearch={setCategorySearch}
                // listCategory={listCategory}
                minPriceIngredient={minPriceIngredient}
                maxPriceIngredient={maxPriceIngredient}
                setMinPriceIngredient={setMinPriceIngredient}
                setMaxPriceIngredient={setMaxPriceIngredient}
              />
            </div>
          </div>
        </div>
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
          <div className="card h-100">
            <div className="card-body">
              <div
                className="row align-items-center"
                style={{ marginBottom: "20px" }}
              >
                <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9 d-flex">
                  <input
                    type="text"
                    className="form-control search-input custom-input w-100"
                    placeholder="Search by name"
                    value={nameIngredient}
                    onChange={(e) => setNameIngredient(e.target.value)}
                  />
                </div>
                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3">
                  <button
                    className="w-100 custom-btn"
                    style={{ background: "#f2291b" }}
                    onClick={handleSearch}
                  >
                    <i
                      className="fa fa-search me-2"
                      style={{ borderRadius: "10px", fontSize: "20px" }}
                    ></i>
                    Search
                  </button>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 d-flex align-items-center mb-2">
                <label
                  className="me-2 text-nowrap"
                  style={{ fontSize: "20px" }}
                >
                  Sắp xếp theo :{" "}
                </label>
                <select
                  className="form-control search-input custom-input"
                  value={sort}
                  style={{ width: "800px" }}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="">Mặc định</option>
                  <option value="price:asc">
                    Sort By:Price (Low &gt; High)
                  </option>
                  <option value="price:desc">
                    Sort By:Price (Hight &gt; Low)
                  </option>
                  <option value="id:desc">Sort By:Mới nhất</option>
                  <option value="id:asc">Sort By:Cũ nhất</option>
                </select>
              </div>
              {/* <div className="row mx-0 justify-content-center">
                <div className="col-lg-8">
                  <div className="section-nameIngredient text-center position-relative mb-5">
                    <h5 className="display-4" style={{ fontSize: "50px" }}>
                      Khám phá nguyên liệu
                    </h5>
                  </div>
                </div>
              </div> */}
              <ViewIngredient ingredients={ingredients} />
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>

    // <div className="content-page py-5" style={{marginTop:"150px"}}>
    //     <div className="container-fluid mb-3">
    //         <div className="search-bar p-4 rounded shadow-sm custom-search-bar">

    //             {/* Hàng 1: nameIngredient, supplier, Category - Cùng chiều cao */}
    //             <div className="row g-3 align-items-stretch mb-3">
    //                 {/* nameIngredient Search */}
    //                 <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 d-flex">
    //                     <input
    //                         type="text"
    //                         className="form-control search-input custom-input h-100"
    //                         placeholder="Search by nameIngredient"
    //                         value={nameIngredient}
    //                         onChange={(e) => setnameIngredient(e.target.value)}
    //                         style={{ height: '100%' }}
    //                     />
    //                 </div>

    //                 {/* supplier Search */}
    //                 <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 d-flex">
    //                     <input
    //                         type="text"
    //                         className="form-control search-input custom-input h-100"
    //                         placeholder="Search by supplier"
    //                         value={supplier}
    //                         onChange={(e) => setsupplier(e.target.value)}
    //                         style={{ height: '100%' }}
    //                     />
    //                 </div>

    //                 {/* Category Select */}
    //                 <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 d-flex">
    //                     <Select
    //                         mode="multiple"
    //                         placeholder="Select categories"
    //                         value={categorySearch}
    //                         onChange={(e) => setCategorySearch(e)}
    //                         options={listCategory.map((category) => ({
    //                             value: `category:${category.name}`,
    //                             label: `${category.name}`
    //                         }))}
    //                         className="w-100"
    //                         style={{ height: '100%' }}
    //                         popupMatchSelectWidth={false}
    //                     />
    //                 </div>
    //             </div>

    //             {/* Hàng 2: PriceIngredient Range, Sort, Search Button */}
    //             <div className="row g-3 align-items-center">
    //                 {/* Min PriceIngredient */}
    //                 <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
    //                     <input
    //                         type="number"
    //                         className="form-control search-input custom-input"
    //                         placeholder="Min PriceIngredient"
    //                         value={minPriceIngredient || ''}
    //                         onChange={(e) => setMinPriceIngredient(e.target.value)}
    //                         min={0}
    //                     />
    //                 </div>

    //                 {/* Max PriceIngredient */}
    //                 <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
    //                     <input
    //                         type="number"
    //                         className="form-control search-input custom-input"
    //                         placeholder="Max PriceIngredient"
    //                         value={maxPriceIngredient || ''}
    //                         onChange={(e) => setMaxPriceIngredient(e.target.value)}
    //                         min={0}
    //                     />
    //                 </div>

    //                 {/* Sort By */}
    //                 <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
    //                     <select
    //                         className="form-control search-input custom-input"
    //                         value={sort}
    //                         onChange={(e) => setSort(e.target.value)}
    //                     >
    //                         <option value="">Default Sorting</option>
    //                         <option value="nameIngredient:asc">Sort By:Name (A-Z)</option>
    //                         <option value="nameIngredient:desc">Sort By:Name(Z-A)</option>
    //                         <option value="PriceIngredient:asc">Sort By:PriceIngredient (Low &gt; High)</option>
    //                         <option value="PriceIngredient:desc">Sort By:PriceIngredient (Hight &gt; Low)</option>
    //                         <option value="id:desc">Sort By:Truyện mới nhất</option>
    //                         <option value="id:asc">Sort By:Truyện xưa nhất</option>
    //                     </select>
    //                 </div>

    //                 {/* Search Button */}
    //                 <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
    //                     <button
    //                         className="btn btn-primary w-100 custom-btn"
    //                         onClick={handleSearch}
    //                         style={{ height: '100%' }}
    //                     >
    //                         <i className="fa fa-search me-2"></i>
    //                         Search
    //                     </button>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </div>
  );
};
