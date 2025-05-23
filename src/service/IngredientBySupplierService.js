import { Variable } from "lucide-react";
import axios from "../utils/CustomizeAxios";

export const getIngredientSupplierById = async (ingredientId) => {
  try {
    const response = await axios.get(
      `/api/v1/ingredientBySupplier/getIngredientSupplierById/${ingredientId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching ingredient:", error);
    throw error;
  }
};

export const getAllIngredientBySupplier = async (page = 1, size = 10) => {
  try {
    const response = await axios.get(
      "/api/v1/ingredientBySupplier/getAllIngredientBySupplier",
      {
        params: {
          page,
          size,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    throw error;
  }
};

export const searchIngredients = async (
  currentPage = 1,
  pageSize = 10,
  sortBy = null,
  listSearch = [] // Nhận là mảng thay vì ...rest
) => {
  try {
    var apiUrl =
      "/api/v1/ingredientBySupplier/getIngredientWithSortAndMultiFieldAndSearch";

    apiUrl += `?page=${currentPage}&size=${pageSize}`;
    if (sortBy) {
      apiUrl += `&sortBy=${sortBy}`;
    }
    if (listSearch) {
      //Append từng search item riêng biệt (sẽ ra search=title:conan&search=category:Trinh Thám)
      listSearch.forEach((item) => (apiUrl += `&search=${item}`));
    }
    console.log(apiUrl);
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error searching ingredients:", error);
    throw error;
  }
};

export const addIngredient = async (ingredientId, stock, price) => {
  try {
    const response = await axios.post(
      "/api/v1/ingredientBySupplier/supplierUploadIngredient",
      { ingredientId, stock, price } // Gửi trực tiếp object JSON
    );
    return response.data;
  } catch (error) {
    console.error("Error adding ingredient:", error);
    throw error;
  }
};