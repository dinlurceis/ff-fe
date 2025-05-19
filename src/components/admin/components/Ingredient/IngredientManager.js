/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { TablePagination } from "@mui/material";
import "../../css/IngredientManage.css";
import { deleteSoftIngredient, getIngredientWithSortAndMultiFieldAndSearch } from "../../../../service/IngredientService";


const IngredientManage = ()=>{
    const [ingredients,setIngredients] = useState([]);//Lưu dánh sách truyện
    const [page,setPage] = useState(0);//Trang hiện tại
    const [rowsPerPage,setRowsPerPage]= useState(7);//Số dòng mỗi trang
    const [totalItems,setTotalItems] = useState(0);//Tổng số khóa học
    const [sort,setSort] = useState("id:desc");//Thứ tự sắp xếp
    const [searchTerm,setSearchTerm] = useState("");//Từ kháo tìm kiếm
    const navigate = useNavigate();//Hook điều hướng

    useEffect(() =>{
            fetchIngredients(page + 1,rowsPerPage,searchTerm,sort);
        },[page,rowsPerPage,sort,searchTerm]);
    
    const fetchIngredients = async (page,size,searchTerm,sort) =>{
        try{

            const response= await getIngredientWithSortAndMultiFieldAndSearch(page,size,searchTerm,sort);

            setIngredients(response.result.items);
            setTotalItems(response.result.totalElements)
        }catch(error){
            console.error("Error fetching users:",error);
        }
    }

    // useEffect(() => {
    //     fetchingredients();
    // },[page,rowsPerPage,sort,searchTerm]);

    // const fetchingredients = async() =>{
    //     try{
    //         console.log({page,rowsPerPage,sort,searchTerm});
    //         const listSearch=[];
    //         if(searchTerm){
    //             listSearch.push(`title:${searchTerm}`)
    //         }
            
    //         const response= await Searchingredient(page+1,rowsPerPage,sort,"",listSearch);
    //         console.log(response);
    //         setingredients(response.result.items);//lưu danh sách khóa học
    //         setTotalItems(response.totalElements);//Lưu tổng số khóa học
    //     }catch(error){
    //         console.error("Error fetching ingredients:",error)
    //     }
    // };
    
    //Xử lý điều kiện tìm kiếm
    // const handleSerachKeyDown = (e) =>{
    //     if(e.key === "Enter"){
    //         fetchingredients();
    //     }
    // };

    const handleRowClick = (id) =>{
        navigate(`/admin/ingredient/detail/${id}`);//chuyển hướng tới đúng URL
    }

    // const handleToggleIngredientStatus = async(ingredientId,isActive) =>{
    //         try{
    //             const ingredient = ingredients.find((ingredient) => ingredient.id === ingredientId);//lấy thông tin dựa trên userId
    //             await deleteSoftIngredient(ingredientId);
    //             console.log(ingredient);

    //             setIngredients((prevIngredients) =>
    //                 prevIngredients.map((ingredient) =>
    //                     ingredient.id===ingredientId ? {...ingredient,isActive: !isActive} : ingredient
    //                 )
    //             );
    //         }catch(error){
    //             console.error(`Error toggling ban status for user ${ingredientId}`,error);
    //         }
    //     };


    // const handleToggleingredientStatus = async(ingredientId) =>{
    //         try{
    //             const ingredient = ingredients.find((ingredient) => ingredient.id === ingredientId);//lấy thông tin dựa trên ingredientId
    //             await handleToggleingredientStatus(ingredientId);
    //             setingredients((previngredients) =>
    //                 previngredients.map((ingredient) =>
    //                     ingredient.id===ingredientId ? {...ingredient,active: !ingredient.active} : ingredient
    //                 )
    //             );
    //         }catch(error){
    //             console.error(`Error toggling ban status for user ${ingredientId}`,error);
    //         }
    //     }
    return (
        <div className="ingredient-manage">
            <h2 className="ingredient-manage-title">ingredient Management</h2>
            <div className="ingredient-manage-controls">
                <div className="ingredient-manage-search">
                    <input 
                        type="text"
                        placeholder="Search by title or supplier name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) =>{
                            if(e.key === "Enter"){
                                setPage(0);
                                fetchIngredients(1,rowsPerPage,searchTerm,sort);
                            }
                        }}
                    />
                </div>
                <div className="ingredient-manage-sort">
                    <select onChange={(e) => setSort(e.target.value)}>
                        <option value="title:asc">Sort by Title (A-Z)</option>
                        <option value="title:desc">Sort By Title (Z-A)</option>
                        <option value="id:desc">Sort by Date (Oldest)</option>
                        <option value="id:asc">Sort by Date (Newest)</option>
                    </select>
                </div>
            </div>
            <div className="ingredient-manage-table">
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th className="table-icon">Tên</th>
                            <th className="table-icon">Đơn vị</th>
                            {/* <th className="table-icon">Đăng truyện</th> */}
                            {/* <th className="table-icon">Updated At</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {ingredients.map((ingredient,index) =>(
                            <tr key={ingredient.ingredientId}>
                                <td>{page*rowsPerPage+index+1}</td>
                                <td
                                    onClick={() => handleRowClick(ingredient.id)}
                                    style={{cursor:"pointer"}}
                                    >{ingredient.name}
                                </td>
                                <td
                                    onClick={() => handleRowClick(ingredient.id)}
                                    style={{cursor:"pointer"}}
                                    >{ingredient.unit}
                                </td>
                                {/* <td>
                                    <label className="switch">
                                        <input 
                                            type="checkbox"
                                            checked={ingredient.isActive}
                                            onChange={() =>
                                                handleToggleIngredientStatus(ingredient.id,ingredient.isActive)
                                            }    
                                        />
                                        <span className="slider round">
                                            {ingredient.isActive ? "Yes":"No"}
                                        </span>
                                    </label>
                                </td> */}

                                {/* <td>
                                    {ingredient.updatedAt
                                        ?new Date(ingredient.updatedAt).toLocaleString()
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
                    onPageChange={(event,newPage) => setPage(newPage)}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={(event) => 
                        setRowsPerPage(parseInt(event.target.value,10))
                    }
                    rowsPerPageOptions={[7,14,21]}
                    //className="custom-pagination"
                    labelDisplayedRows={({from,to,count}) =>`${from}-${to} of ${count}`}
                />
            </div>
        </div>
    );
};

export default IngredientManage;