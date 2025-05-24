import { CCloseButton, CSidebar, CSidebarBrand, CSidebarFooter, CSidebarHeader, CSidebarToggler } from "@coreui/react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CIcon from "@coreui/icons-react";
import AppSideBarNav from "./AppSidebarNav";
import { Link } from "react-router-dom";
import logo from "../../../img/logo1.jpg";

const AdminSidebar =() =>{
    const dispatch = useDispatch();
    const unfoldable = useSelector((state) => state.sidebarUnfoldable);
    const sidebarShow = useSelector((state) => state.sidebarShow);

    return (
        <CSidebar
            className="border-end"
            colorScheme="dark"
            position="fixed"
            unfoldable={unfoldable}
            visible={sidebarShow}
            onVisibleChange={(visible) => {
                dispatch({type:"set",sidebarShow: visible});
            }}
        >
            <CSidebarHeader className="border-bottom bg-white">
                <Link to={"/"} style={{textAlign:"center",display:"flex"}}>
                    <img
                        src={logo}
                        alt="logo"
                        height={32}
                        className="sidebar-brand-full"
                        />
                    </Link>
                <CCloseButton 
                    className="d-lg-none"
                    dark
                    onClick={() => dispatch({type:"set",sidebarShow:false})}
                />
            </CSidebarHeader>
            <AppSideBarNav /> {/*Gọi AppSideBarNav mà không truyền vào tham số items */}
            <CSidebarFooter className="border-top d-none d-lg-flex">
                <CSidebarToggler 
                    onClick={() => dispatch({type:"set",sidebarUnfoldable:!unfoldable})}
                />
            </CSidebarFooter>
        </CSidebar>
    );
};

export default React.memo(AdminSidebar);