import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import UserManager from "../components/User/UserManager";
import UserDetail from "../components/User/UserDetail";
import IngredientManage from "../components/Ingredient/IngredientManager";
import BookDetail from "../components/Ingredient/IngredientDetail";
import { NotFound } from "../../error/NotFound";
import AdminLayout from "./AdminLayout";
import "../css/style.scss";
import OrderManage from "../components/Order/OrderManager";
import OrderDetail from "../components/Order/OrderDetail";
import { UploadAdminIngredient } from "../components/Ingredient/IngredientAdminUpload";
import CatgoryManage from "../components/Category/CategoryManage";
import { UploadCategory } from "../components/Category/CategoryUpload";
import DishManage from "../components/Dish/DishManager";
import { CreateDish } from "../components/Dish/CreateDish";
import  CartManage  from "../components/Cart/CartManager";
import SupplierManage from "../components/Supplier/SupplierManager";

const AdminApp = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Các route bên trong AdminLayout */}
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UserManager />} />
          <Route path="users/detail/:id" element={<UserDetail />} />

          {/* Thêm route này */}
          <Route path="ingredient/manage" element={<IngredientManage />} />
          <Route path="ingredient/detail/:ingredientId" element={<BookDetail />} />
          <Route path="ingredient/upload-ingredient" element={<UploadAdminIngredient />}/>

          <Route path="order/manage" element={<OrderManage />} />
          <Route path="order/detail/:orderId" element={<OrderDetail />} />

          <Route path="category/manage" element={<CatgoryManage />} />
          <Route path="category/upload-category" element={<UploadCategory />} />

          <Route path="dish/manage" element={<DishManage />} />
          <Route path="dish/create-dish" element={<CreateDish />} />
          <Route path="cart/manage" element={<CartManage />} />
          <Route path="supplier/manage" element={<SupplierManage />} />
        </Route>
        {/* Route riêng cho NotFound */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AdminApp;