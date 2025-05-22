import { CNavGroup, CNavItem, CNavTitle, CSidebarNav } from "@coreui/react";
import { useState } from "react"
import { NavLink } from "react-router-dom";
import "../css/AdminSidebarNav.css";
const AppSideBarNav = () =>{
    const [openItems,setOpenItems] = useState({
        user:false,
        order:false,
        book:false,
        category:false
    });

    const toggleItem = (name) =>{
        setOpenItems((prevOpenItems) =>({
            ...prevOpenItems,
            [name]:!prevOpenItems[name],
        }));
    };

    const renderNavItem = (text,link) =>(
        <CNavItem>
            <NavLink to={link} className="nav-link-custom">
                <span className="nav-bullet">-</span> {text}
            </NavLink>
        </CNavItem>
    );

    return (
        <CSidebarNav>
            {/* MANAGEMENT Group */}
            <CNavTitle style={{color:"#fff"}}>MANAGEMENT</CNavTitle>
            <CNavGroup
                toggler={<div className="me-2">User</div>}
                onClick={()=>toggleItem("user")}
                visible={openItems["user"]}//dùng để hiển thị true/flase của biến user
            >
                {renderNavItem("Manage","/admin/users")}
            </CNavGroup>
            <CNavGroup
                toggler={<div className="me-2">Ingredient</div>}
                onClick={()=>toggleItem("ingredient")}
                visible={openItems["ingredient"]}
            >
                {renderNavItem("Manage","/admin/ingredient/manage")}
                {renderNavItem("Upload ingredient","/admin/ingredient/upload-ingredient")}
            </CNavGroup>
            <CNavGroup
                toggler={<div className="me-2">Dish</div>}
                onClick={()=>toggleItem("dish")}
                visible={openItems["dish"]}
            >
                {renderNavItem("Manage","/admin/dish/manage")}
                {renderNavItem("Create dish","/admin/dish/create-dish")}
            </CNavGroup>
            <CNavGroup
                toggler={<div className="me-2">Order</div>}
                onClick={()=>toggleItem("order")}
                visible={openItems["order"]}
            >
                {renderNavItem("Manage","/admin/order/manage")}
            </CNavGroup>
            <CNavGroup
                toggler={<div className="me-2">Category</div>}
                onClick={()=>toggleItem("category")}
                visible={openItems["category"]}//dùng để hiển thị true/flase của biến user
            >
                {renderNavItem("Manage","/admin/category/manage")}
                {renderNavItem("Create Category","/admin/category/upload-category")}
            </CNavGroup>
            <CNavGroup
                toggler={<div className="me-2">Cart</div>}
                onClick={()=>toggleItem("cart")}
                visible={openItems["cart"]}
            >
                {renderNavItem("Manage","/admin/cart/manage")}
            </CNavGroup>
            <CNavGroup
                toggler={<div className="me-2">Supplier</div>}
                onClick={()=>toggleItem("supplier")}
                visible={openItems["supplier"]}
            >
                {renderNavItem("Manage","/admin/supplier/manage")}
            </CNavGroup>
            {/* ANALYSIS Group */}
            <CNavTitle style={{color:"#fff"}}>ANALYSIS</CNavTitle>
        </CSidebarNav>
    )
}

export default AppSideBarNav;