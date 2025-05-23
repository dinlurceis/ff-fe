import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
let refreshingFunc = undefined;

const instance = axios.create({
  baseURL: "http://localhost:8081/",
  withCredentials: true, //cho phép gửi cookie Http-only khi gọi API
});

// Danh sách các endpoints không cần authentication
const publicEndpoints = [
  "/api/v1/auth", // Tất cả các endpoint bắt đầu bằng /auth/
  "/api/v1/auth/register",
  "/api/v1/auth/login",
  "/api/v1/category/categoryById/{categoryId}",
  "/api/v1/dish/getCommentsByIngredientSupplier/{ingredientBySupplierId}",
  "/api/v1/dish/getAllDish",
  "/api/v1/dish/getDishById/{dishId}",
  "/api/v1/dish/getDishWithSortAndMultiFieldAndSearch",
  "/api/v1/ingredientBySupplier/getIngredientWithSortAndMultiFieldAndSearch",
  "/api/v1/ingredientBySupplier/getIngredientById/{ingredientId}",
  "/api/v1/ingredientBySupplier/getAllIngredientBySupplier",
  "/api/v1/ingredient/getIngredientById/{ingredientId}",
  "/payment/vn-pay-callback"
];

// Kiểm tra xem một URL có phải là public endpoint không
const isPublicEndpoint = (url) => {
  const normalizedUrl = url.startsWith("/") ? url.slice(1) : url;

  return (
    publicEndpoints.includes(normalizedUrl) ||
    (normalizedUrl.startsWith("api/v1/auth/") &&
      publicEndpoints.includes("api/v1/auth"))
  );
};

const refreshToken = async () => {
  try {
    const response = await instance.post("api/v1/auth/refresh"); //không gửi token,cookie tự động gửi
    if (response.status === 200) {
      const accessToken = response.data.result.accessToken;
      sessionStorage.setItem("accessToken", accessToken); //refreshToken thành công thì lưu nó vào sesionStorage
      return accessToken;
    } else {
      throw new Error("Failed to refresh token");
    }
  } catch (error) {
    console.error("Error refreshing token: ", error);
    throw error;
  }
};

instance.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("accessToken");

    // Chỉ thêm token vào header nếu:
    // 1. Có accessToken
    // 2. URL không phải là endpoint refresh token
    // 3. URL không phải là public endpoint
    if (
      accessToken &&
      config.url !== "api/v1/auth/refresh" &&
      !isPublicEndpoint(config.url)
    ) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return error.response ? error.response : Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    console.log(response);
    return response; //nếu api phản hồi thành công status !=401 thì trả về response như bình thường
  },
  async (error) => {
    const originalRequest = error.config;
    console.log(originalRequest);
    // Nếu là public endpoint và gặp lỗi 401, chỉ trả về lỗi mà không redirect
    if (
      error.response &&
      error.response.status === 401 &&
      isPublicEndpoint(originalRequest.url)
    ) {
      console.log("isPublic:", isPublicEndpoint(originalRequest.url));
      console.log("originalRequest.url:", originalRequest.url);
      console.log("lỗi 401");
      return Promise.reject(error);
    }
    console.log(originalRequest);
    // Xử lý refresh token cho các endpoint yêu cầu authentication
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (!refreshingFunc) {
        refreshingFunc = refreshToken();
      }

      try {
        const newToken = await refreshingFunc;
        sessionStorage.setItem("accessToken", newToken);

        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        refreshingFunc = undefined;

        return instance(originalRequest);
      } catch (refreshError) {
        refreshingFunc = undefined;
        sessionStorage.removeItem("accessToken");

        // Chỉ redirect đến login nếu không phải là public endpoint
        if (!isPublicEndpoint(originalRequest.url)) {
          window.location = `${window.location.origin}/login`;
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
