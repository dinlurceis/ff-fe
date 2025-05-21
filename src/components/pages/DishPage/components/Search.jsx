import { useEffect, useState } from "react";
import { Select } from "antd";
import { listAllCategory } from "../../../../service/CategoryService";
import ProductFilter from "./FilterDishes";
import { ViewDish } from "./ViewDish";

export const Search = ({ dishes, sortBy, supplierName, listSearch }) => {
  const [listCategory, setListCategory] = useState([]);
  const [categorySearch, setCategorySearch] = useState([]);
  const [title, setTitle] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [sort, setSort] = useState("");

  const handleSearch = () => {
    let searchs = [];

    if (title && title.trim() !== "") {
      searchs.push(`title:${title}`);
    }

    if (categorySearch.length > 0) {
      searchs.push(...categorySearch);
    }

    if (maxPrice !== null && maxPrice !== "") {
      searchs.push(`price<${maxPrice}`);
    }

    if (minPrice !== null && minPrice !== "") {
      searchs.push(`price>${minPrice}`);
    }
    console.log(sort);
    if (sort) {
      console.log(sort);
      sortBy(sort);
    }

    if (searchs.length > 0) {
      listSearch(searchs);
    }
  };

  useEffect(() => {
    const listCategories = async () => {
      try {
        const data = await listAllCategory();
        if (data.result && Array.isArray(data.result)) {
          setListCategory(data.result);
        }
      } catch (error) {
        console.error("Error fetching favorite course:", error);
      }
    };
    listCategories();
  }, []);

  return (
    <>
      {/* <div className="container"> */}
      <div
        className="row gutters"
        style={{ width: "100%", marginTop: "200px" }}
      >
        {/* Cột trái */}
        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
          <div className="card h-100">
            <div className="card-body">
              <ProductFilter
                categorySearch={categorySearch}
                setCategorySearch={setCategorySearch}
                listCategory={listCategory}
                minPrice={minPrice}
                maxPrice={maxPrice}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
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
                    placeholder="Search by Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                  <option value="title:asc">Sort By:Name (A-Z)</option>
                  <option value="title:desc">Sort By:Name(Z-A)</option>
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
                  <div className="section-title text-center position-relative mb-5">
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

    //             {/* Hàng 1: Title, supplier, Category - Cùng chiều cao */}
    //             <div className="row g-3 align-items-stretch mb-3">
    //                 {/* Title Search */}
    //                 <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 d-flex">
    //                     <input
    //                         type="text"
    //                         className="form-control search-input custom-input h-100"
    //                         placeholder="Search by Title"
    //                         value={title}
    //                         onChange={(e) => setTitle(e.target.value)}
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

    //             {/* Hàng 2: Price Range, Sort, Search Button */}
    //             <div className="row g-3 align-items-center">
    //                 {/* Min Price */}
    //                 <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
    //                     <input
    //                         type="number"
    //                         className="form-control search-input custom-input"
    //                         placeholder="Min Price"
    //                         value={minPrice || ''}
    //                         onChange={(e) => setMinPrice(e.target.value)}
    //                         min={0}
    //                     />
    //                 </div>

    //                 {/* Max Price */}
    //                 <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
    //                     <input
    //                         type="number"
    //                         className="form-control search-input custom-input"
    //                         placeholder="Max Price"
    //                         value={maxPrice || ''}
    //                         onChange={(e) => setMaxPrice(e.target.value)}
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
    //                         <option value="title:asc">Sort By:Name (A-Z)</option>
    //                         <option value="title:desc">Sort By:Name(Z-A)</option>
    //                         <option value="price:asc">Sort By:Price (Low &gt; High)</option>
    //                         <option value="price:desc">Sort By:Price (Hight &gt; Low)</option>
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
