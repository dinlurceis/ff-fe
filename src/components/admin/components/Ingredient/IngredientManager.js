/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { TablePagination } from "@mui/material";
import "../../css/IngredientManage.css";
import { deleteSoftIngredient, getAllIngredient, getIngredientWithSortAndMultiFieldAndSearch } from "../../../../service/IngredientService";


const IngredientManage = ()=>{
    const [ingredients,setIngredients] = useState([]);
    const [page,setPage] = useState(0);
    const [rowsPerPage,setRowsPerPage]= useState(7);
    const [totalItems,setTotalItems] = useState(0);
    const [sort,setSort] = useState("id:desc");
    const [searchTerm,setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() =>{
            fetchIngredients(page + 1,rowsPerPage,searchTerm,sort);
        },[page,rowsPerPage,sort,searchTerm]);
    
    const fetchIngredients = async (page,size,searchTerm,sort) =>{
        try{

            const response= await getAllIngredient(page,size,searchTerm,sort);

            setIngredients(response.result.items);
            setTotalItems(response.result.totalElements)
        }catch(error){
            console.error("Error fetching users:",error);
        }
    }

    const handleSerachKeyDown = (e) =>{
        if(e.key === "Enter"){
            fetchIngredients();
        }
    };

    const handleRowClick = (id) =>{
        navigate(`/admin/ingredient/detail/${id}`);//chuyển hướng tới đúng URL
    }

    const handleToggleIngredientStatus = async(ingredientId,isActive) =>{
            try{
                const ingredient = ingredients.find((ingredient) => ingredient.ingredientId === ingredientId);//lấy thông tin dựa trên userId
                console.log(ingredient);
                await deleteSoftIngredient(ingredientId);
                console.log(ingredient);

                setIngredients((prevIngredients) =>
                    prevIngredients.map((ingredient) =>
                        ingredient.ingredientId===ingredientId ? {...ingredient,active: !isActive} : ingredient
                    )
                );
            }catch(error){
                console.error(`Error toggling ban status for user ${ingredientId}`,error);
            }
        };
    return (
        <div className="ingredient-manage">
            <h2 className="ingredient-manage-title">Ingredient management</h2>
            <div className="ingredient-manage-controls">
                <div className="ingredient-manage-search">
                    <input 
                        type="text"
                        placeholder="Search by name"
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
                        <option value="name:asc">Sort by Title (A-Z)</option>
                        <option value="name:desc">Sort By Title (Z-A)</option>
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
                            <th className="table-icon">Image</th>
                            <th className="table-icon">Name</th>
                            <th className="table-icon">Description</th>
                            <th className="table-icon">Unit</th>
                            <th className="table-icon">Action</th>
                            {/* <th className="table-icon">Image</th> */}
                            {/* <th className="table-icon">Đăng truyện</th> */}
                            {/* <th className="table-icon">Updated At</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {ingredients.map((ingredient,index) =>(
                            <tr key={ingredient.ingredientId}>
                                <td>{page*rowsPerPage+index+1}</td>
                                <td
                                    onClick={() => handleRowClick(ingredient.ingredientId)}
                                    style={{cursor:"pointer"}}
                                    > <img 
                                        src={ingredient.ingredientImage} 
                                        alt={ingredient.ingredientName}
                                        style={{
                                            width: "60px",
                                            height: "60px", // 3:4 ratio
                                            objectFit: "cover",
                                            borderRadius: "4px"
                                        }}
                                    />           
                                </td>
                                <td
                                    onClick={() => handleRowClick(ingredient.ingredientId)}
                                    style={{cursor:"pointer"}}
                                    >{ingredient.name}
                                </td>
                                 <td
                                    onClick={() => handleRowClick(ingredient.ingredientId)}
                                    style={{cursor:"pointer"}}
                                    ><div dangerouslySetInnerHTML={{ __html:ingredient.description }} />
                                </td>
                                <td
                                    onClick={() => handleRowClick(ingredient.ingredientId)}
                                    style={{cursor:"pointer"}}
                                    >{ingredient.unit}
                                </td>
                                <td>
                                    <label className="switch">
                                        <input 
                                            type="checkbox"
                                            checked={ingredient.active}
                                            onChange={() =>
                                                handleToggleIngredientStatus(ingredient.ingredientId,ingredient.active)
                                            }    
                                        />
                                        <span className="slider round">
                                            {ingredient.active ? "Yes":"No"}
                                        </span>
                                    </label>
                                </td>

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