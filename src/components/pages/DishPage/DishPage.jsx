
import { motion } from "framer-motion";
import { Search } from "./components/Search";
import { ViewDish } from "./components/ViewDish";
import ReactPaginate from "react-paginate";
import { SearchDish } from "../../../service/DishService";
import { useEffect, useState } from "react";

export const Dishes = () => {
  const [loading, setLoading] = useState(true);
  const [dishes, setDishes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [totalPages, setTotalPages] = useState(0);
  const [supplierName, setSupplierName] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [listSearch, setListSearch] = useState([]);

  useEffect(() => {
    document.title = "Món ăn";
  });

  const fetchDishes = async () => {
    setLoading(true);
    try {
      const result = await SearchDish(
        currentPage,
        pageSize,
        sortBy,
        supplierName,
        listSearch
      );
      if (result && result.result) {
        setDishes(result.result.items);
        setTotalPages(result.result.totalPages);
      } else {
        setDishes([]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    setPageSize(12);
  }, [sortBy, supplierName, listSearch]);

  useEffect(() => {
    fetchDishes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize, sortBy, listSearch]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
  };
  return (
    <motion.div
      key={currentPage || sortBy || supplierName || listSearch}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
    >
      <Search
        dishes={dishes}
        sortBy={setSortBy}
        supplierName={setSupplierName}
        listSearch={setListSearch}
      />
      <div className="container-fluid">
        <div className="container py-3">
          <ReactPaginate
            previousLabel={"«"}
            nextLabel={"»"}
            breakLabel={"..."}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            forcePage={currentPage - 1}
            containerClassName={
              "pagination pagination-lg justify-content-center"
            }
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </motion.div>
  );
};
