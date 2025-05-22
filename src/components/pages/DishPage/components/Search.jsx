import { useEffect, useState } from "react";
import { Select } from "antd";
import { listAllCategory } from "../../../../service/CategoryService";
import { ViewDish } from "./ViewDish";
import { SearchDish } from "../../../../service/DishService";
import { ProductFilter } from "./FilterDishes";

export const Search = ({ dishes, sortBy, listSearch }) => {
  const [listCategory, setListCategory] = useState([]);
  const [categorySearch, setCategorySearch] = useState([]);
  const [name, setName] = useState("");
  const [sort, setSort] = useState("");
  const [minTimeCook, setMinTimeCook] = useState(0);
  const [maxTimeCook, setMaxTimeCook] = useState(120);

  const handleSearch = () => {
    let searchs = [];

    searchs.push(`name:${name.trim()}`);

    if (categorySearch && categorySearch.length > 0) {
      const selectedCategoryNames = listCategory
        .filter((category) => categorySearch.includes(category.id))
        .map((category) => category.name)
        .join(",");

      searchs.push(`category:${selectedCategoryNames}`);
    }
    if (maxTimeCook !== null && maxTimeCook !== "") {
      searchs.push(`timeCook<${maxTimeCook}`);
    }

    if (minTimeCook !== null && minTimeCook !== "") {
      searchs.push(`timeCook>${minTimeCook}`);
    }

    if (sort) {
      console.log(sort);
      sortBy(sort);
    }

    console.log(searchs);
    if (searchs.length > 0) {
      listSearch(searchs);
      handleFilterAll(searchs);
    }
  };

  useEffect(() => {
    const listCategories = async () => {
      try {
        const data = await listAllCategory();
        if (data.result && Array.isArray(data.result)) {
          setListCategory(data.result);
          // setCategorySearch(
          //   "category:" +
          //   data.result.map((category) => `${category.name}`).join(","))
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    listCategories();
  }, []);

  const handleFilterAll = async () => {
    try {
      const response = await SearchDish(1, 12, sortBy, listSearch);
      if (response && response.result) {
        dishes(response.result.items);
      } else {
        dishes([]);
      }
    } catch (error) {
      console.error("Error fetching dishes:", error);
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
                categorySearch={categorySearch}
                setCategorySearch={setCategorySearch}
                listCategory={listCategory}
                minTimeCook={minTimeCook}
                maxTimeCook={maxTimeCook}
                setMinTimeCook={setMinTimeCook}
                setMaxTimeCook={setMaxTimeCook}
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                  <option value="name:asc">Sort By:Name (A-Z)</option>
                  <option value="name:desc">Sort By:Name(Z-A)</option>
                  {/* <option value="TimeCook:asc">
                    Sort By:TimeCook (Low &gt; High)
                  </option>
                  <option value="TimeCook:desc">
                    Sort By:TimeCook (Hight &gt; Low)
                  </option> */}
                  <option value="id:desc">Sort By:Mới nhất</option>
                  <option value="id:asc">Sort By:Cũ nhất</option>
                </select>
              </div>
              {/* <div className="row mx-0 justify-content-center">
                <div className="col-lg-8">
                  <div className="section-name text-center position-relative mb-5">
                    <h5 className="display-4" style={{ fontSize: "50px" }}>
                      Khám phá nguyên liệu
                    </h5>
                  </div>
                </div>
              </div> */}
              <ViewDish dishes={dishes} />
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>

    // <div className="content-page py-5" style={{marginTop:"150px"}}>
    //     <div className="container-fluid mb-3">
    //         <div className="search-bar p-4 rounded shadow-sm custom-search-bar">

    //             {/* Hàng 1: name, supplier, Category - Cùng chiều cao */}
    //             <div className="row g-3 align-items-stretch mb-3">
    //                 {/* name Search */}
    //                 <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 d-flex">
    //                     <input
    //                         type="text"
    //                         className="form-control search-input custom-input h-100"
    //                         placeholder="Search by name"
    //                         value={name}
    //                         onChange={(e) => setname(e.target.value)}
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

    //             {/* Hàng 2: TimeCook Range, Sort, Search Button */}
    //             <div className="row g-3 align-items-center">
    //                 {/* Min TimeCook */}
    //                 <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
    //                     <input
    //                         type="number"
    //                         className="form-control search-input custom-input"
    //                         placeholder="Min TimeCook"
    //                         value={minTimeCook || ''}
    //                         onChange={(e) => setMinTimeCook(e.target.value)}
    //                         min={0}
    //                     />
    //                 </div>

    //                 {/* Max TimeCook */}
    //                 <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
    //                     <input
    //                         type="number"
    //                         className="form-control search-input custom-input"
    //                         placeholder="Max TimeCook"
    //                         value={maxTimeCook || ''}
    //                         onChange={(e) => setMaxTimeCook(e.target.value)}
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
    //                         <option value="name:asc">Sort By:Name (A-Z)</option>
    //                         <option value="name:desc">Sort By:Name(Z-A)</option>
    //                         <option value="TimeCook:asc">Sort By:TimeCook (Low &gt; High)</option>
    //                         <option value="TimeCook:desc">Sort By:TimeCook (Hight &gt; Low)</option>
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
