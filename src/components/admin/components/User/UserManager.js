import { useEffect, useState } from "react"
import { banSupplier, banUser, getAllUser, unBanUser, updateRoleSupplier } from "../../../../service/UserService";
import { useNavigate } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";
import "../../css/UserManage.css";
import { acceptSupplier, rejectSupplier } from "../../../../service/RegisterSipplierService";
const UserManager = () =>{
    const [users,setUsers] = useState([]);
    const [page,setPage] = useState(0);
    const [rowsPerPage,setRowsPerPage] = useState(7);
    const [totalItems,setTotalItems] = useState(0);
    const [sort,setSort] = useState("id:desc");
    const [searchTerm ,setSearchTerm] = useState("");
    // const [roleSupplier,setRoleSupplier]=useState(false);
    const navigate = useNavigate();

    useEffect(() =>{
        fetchUsers(page + 1,rowsPerPage,searchTerm,sort);
    },[page,rowsPerPage,sort,searchTerm]);

    const fetchUsers = async (page,size,searchTerm,sort) =>{
        try{
            console.log(2);
            console.log({page,size,searchTerm,sort});

            const response= await getAllUser(page,size,searchTerm,sort);

            setUsers(response.result.items);

            setTotalItems(response.result.totalElements)
        }catch(error){
            console.error("Error fetching users:",error);
        }
    }

    const handleChangePage = (event,newPage) =>{
        setPage(newPage);
    };

    const handleChangeRowsPerPage =(event) =>{
        setRowsPerPage(parseInt(event.target.value,10));
        setPage(0);//Reset to the first page when rows pẻ page change
    };

    const handleRowClick =(id) =>{
        navigate(`/admin/users/detail/${id}`);//điều hướng đến trang chi tiết người dùng
    }

    const updateSupplier = async (userId) => {
    try {
        await acceptSupplier(userId); // Gọi API cập nhật role Supplier

        // Cập nhật role ở frontend nếu chưa có Supplier
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.userId === userId
                    ? {
                        ...user,
                        role: user.role.includes("Supplier")
                            ? user.role
                            : [...user.role, "Supplier"]
                    }
                    : user
            )
        );
        } catch (error) {
            console.log(`Error changing user role ${userId}:`, error);
        }
    };

    const banRoleSupplier = async (userId) => {
    try {
        await rejectSupplier(userId); // Gọi API xóa role Supplier ở backend

        // Cập nhật lại UI: xóa Supplier khỏi danh sách role
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.userId === userId
                    ? {
                        ...user,
                        role: user.role.filter((r) => r !== "SUPPLIER") // Loại bỏ Supplier(dùng filter để loại bỏ SUPPLIER trong UI)
                    }
                    : user
            )
        );
        } catch (error) {
            console.log(`Error removing Supplier role from user ${userId}:`, error);
        }
    };

    const handleToggleSupplierStatus = async(userId,role) =>{
        try{
            if(role.includes("SUPPLIER")){
                console.log(12)
                await banRoleSupplier(userId);
            }else{
                console.log(13);
                await updateSupplier(userId);
            }
        }catch(error){
            console.error(`Error toggling ban status for user ${userId}}`,error);
        }
    };

    const handleToggleBanStatus = async(userId,isActive) =>{
        try{
            const user = users.find((user) => user.userId === userId);//lấy thông tin dựa trên userId
            if(isActive){
                console.log(isActive)
                await banUser(userId);
            }else{
                console.log(isActive)
                await unBanUser(userId);
            }
            // console.log(user);
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.userId===userId ? {...user,active: !isActive} : user
                )
            );
        }catch(error){
            console.error(`Error toggling ban status for user ${userId}`,error);
        }
    };

    return (
        <div className="user-manage">
            <h2 className="user-manage-title">User management</h2>
            <div className="user-manage-controls">
                <div className="user-manage-search">
                    <input 
                        type="text"
                        placeholder="Search by name or email"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) =>{
                            if(e.key === "Enter"){
                                setPage(0);
                                fetchUsers(1,rowsPerPage,searchTerm,sort);
                            }
                        }}
                    />
                </div>
                <div className="user-manage-sort">
                    <select onChange={(e) =>setSort(e.target.value)}>
                        <option value="fullName:asc">Sort by Name (A-Z)</option>
                        <option value="fullName:desc">Sort by Name (Z-A)</option>
                        <option value="id:desc">Sort by Date (Oldest)</option>
                        <option value="id:asc">Sort by Date (Newest)</option>
                    </select>
                </div>
            </div>
            <div className="user-manage-table">
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th className="table-icon">Name</th>
                            <th className="table-icon">Email</th>
                            <th className="table-icon">Role</th>
                            <th className="table-icon">Phone</th>
                            <th className="table-icon">Ban/Unban</th>
                            <th className="table-icon">Supplier</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user,index) =>(
                            <tr key={user.userId}>
                                <td>{page * rowsPerPage + index +1}</td>
                                <td
                                    onClick={() => handleRowClick(user.userId)}
                                    style={{cursor:"pointer"}}
                                    >{user.fullName}
                                </td>
                                <td
                                    onClick={() => handleRowClick(user.userId)}
                                    style={{cursor:"pointer"}}
                                >{user.email}</td>
                                <td>
                                    <div
                                        onClick={()=>updateSupplier(user.userId)}
                                    >
                                        {user.roles.join(',')}
                                    </div>
                                </td>
                                <td
                                    onClick={() => handleRowClick(user.userId)}
                                    style={{cursor:"pointer"}}
                                >{user.phoneNumber ? user.phoneNumber : "N/A"}</td>
                                <td>
                                    <label className="switch">
                                        <input 
                                            type="checkbox"
                                            checked={user.active}
                                            onChange={() =>
                                                handleToggleBanStatus(user.userId,user.active)
                                            }    
                                        />
                                        <span className="slider round">
                                            {user.isActive ? "Unban":"Ban"}
                                        </span>
                                    </label>
                                </td>
                                 <td>
                                    <label className="switch">
                                        <input 
                                            type="checkbox"
                                            checked={user.roles.includes("SUPPLIER")?true:false}
                                            onChange={() =>
                                                handleToggleSupplierStatus(user.userId,user.roles)
                                            }    
                                        />
                                        <span className="slider round">
                                            {user.roles.includes("SUPPLIER") ? "Yes":"No"}
                                        </span>
                                    </label>
                                </td>
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
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[7,14,21]}
                    //className="custom-pagination"
                    labelDisplayedRows={({from,to,count}) =>`${from}-${to} of ${count}`}
                />
            </div>
        </div>
    );
};

export default UserManager;