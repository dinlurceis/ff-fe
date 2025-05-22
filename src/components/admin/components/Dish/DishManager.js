/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllDish, SearchDish } from "../../../../service/DishService";
import { TablePagination } from "@mui/material";
import "../../css/DishManage.css";

const DishManage = () => {
  const [dishes, setDishes] = useState([]); //Lưu dánh sách truyện
  const [page, setPage] = useState(0); //Trang hiện tại
  const [rowsPerPage, setRowsPerPage] = useState(7); //Số dòng mỗi trang
  const [totalItems, setTotalItems] = useState(0); //Tổng số khóa học
  const [sort, setSort] = useState("id:desc"); //Thứ tự sắp xếp
  const [searchTerm, setSearchTerm] = useState(""); //Từ kháo tìm kiếm
  const navigate = useNavigate(); //Hook điều hướng

  useEffect(() => {
    fetchDishes(page + 1, rowsPerPage, searchTerm, sort);
  }, [page, rowsPerPage, sort, searchTerm]);

  const fetchDishes = async (page, size, searchTerm, sort) => {
    try {
      const response = await SearchDish(page, size, sort, searchTerm);

      setDishes(response.result.items);
      setTotalItems(response.result.totalElements);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // useEffect(() => {
  //     fetchdishes();
  // },[page,rowsPerPage,sort,searchTerm]);

  // const fetchdishes = async() =>{
  //     try{
  //         console.log({page,rowsPerPage,sort,searchTerm});
  //         const listSearch=[];
  //         if(searchTerm){
  //             listSearch.push(`title:${searchTerm}`)
  //         }

  //         const response= await Searchdish(page+1,rowsPerPage,sort,"",listSearch);
  //         console.log(response);
  //         setdishes(response.result.items);//lưu danh sách khóa học
  //         setTotalItems(response.totalElements);//Lưu tổng số khóa học
  //     }catch(error){
  //         console.error("Error fetching dishes:",error)
  //     }
  // };

  //Xử lý điều kiện tìm kiếm
  // const handleSerachKeyDown = (e) =>{
  //     if(e.key === "Enter"){
  //         fetchdishes();
  //     }
  // };

  //Điều hướng đến trang chi tiết khóa học
  const handleRowClick = (id) => {
    navigate(`/admin/dish/detail/${id}`); //chuyển hướng tới đúng URL
  };

  // const handleToggleDishStatus = async(dishId,isActive) =>{
  //         try{
  //             const dish = dishes.find((dish) => dish.id === dishId);//lấy thông tin dựa trên userId
  //             await toggleStatusDish(dishId);
  //             console.log(dish);

  //             setDishes((prevdishes) =>
  //                 prevdishes.map((dish) =>
  //                     dish.id===dishId ? {...dish,isActive: !isActive} : dish
  //                 )
  //             );
  //         }catch(error){
  //             console.error(`Error toggling ban status for user ${dishId}`,error);
  //         }
  //     };
  // const handleToggledishestatus = async(dishId) =>{
  //         try{
  //             const dish = dishes.find((dish) => dish.id === dishId);//lấy thông tin dựa trên dishId
  //             await handleToggledishestatus(dishId);
  //             setdishes((prevdishes) =>
  //                 prevdishes.map((dish) =>
  //                     dish.id===dishId ? {...dish,active: !dish.active} : dish
  //                 )
  //             );
  //         }catch(error){
  //             console.error(`Error toggling ban status for user ${dishId}`,error);
  //         }
  //     }
  return (
    <div className="dish-manage">
      <h2 className="dish-manage-title">Dish management</h2>
      <div className="dish-manage-controls">
        <div className="dish-manage-search">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setPage(0);
                fetchDishes(1, rowsPerPage, searchTerm, sort);
              }
            }}
          />
        </div>
        <div className="dish-manage-sort">
          <select onChange={(e) => setSort(e.target.value)}>
            <option value="name:asc">Sort by name (A-Z)</option>
            <option value="name:desc">Sort By name (Z-A)</option>
            <option value="id:desc">Sort by Date (Oldest)</option>
            <option value="id:asc">Sort by Date (Newest)</option>
          </select>
        </div>
      </div>
      <div className="dish-manage-table">
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th className="table-icon">name</th>
              <th className="table-icon">Time Cook</th>
              <th className="table-icon">price</th>
              {/* <th className="table-icon">Updated At</th> */}
            </tr>
          </thead>
          <tbody>
            {dishes.map((dish, index) => (
              <tr key={dish.id}>
                <td>{page * rowsPerPage + index + 1}</td>
                <td
                  onClick={() => handleRowClick(dish.id)}
                  style={{ cursor: "pointer" }}
                >
                  {dish.name}
                </td>
                <td
                  onClick={() => handleRowClick(dish.id)}
                  style={{ cursor: "pointer" }}
                >
                  {dish.timeCook || "Unknown"}
                </td>
                <td
                  onClick={() => handleRowClick(dish.id)}
                  style={{ cursor: "pointer" }}
                >
                  {dish.price} VND
                </td>
                {/* <td>
                                    <label className="switch">
                                        <input 
                                            type="checkbox"
                                            checked={dish.isActive}
                                            onChange={() =>
                                                handleToggleDishStatus(dish.id,dish.isActive)
                                            }    
                                        />
                                        <span className="slider round">
                                            {dish.isActive ? "Yes":"No"}
                                        </span>
                                    </label>
                                </td> */}
                {/* <td>
                                    {dish.updatedAt
                                        ?new Date(dish.updatedAt).toLocaleString()
                                        :"N/A"}
                                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-container">
        <TablePagination
          component="div"
          count={totalItems}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(event) =>
            setRowsPerPage(parseInt(event.target.value, 10))
          }
          rowsPerPageOptions={[7, 14, 21]}
          //className="custom-pagination"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} of ${count}`
          }
        />
      </div>
    </div>
  );
};

export default DishManage;
