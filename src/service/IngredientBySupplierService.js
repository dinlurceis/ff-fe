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
  searchTerms = [] // Nhận là mảng thay vì ...rest
) => {
  try {
    const apiUrl =
      "/api/v1/ingredientBySupplier/getIngredientWithSortAndMultiFieldAndSearch";

    const params = new URLSearchParams();
    params.append("page", currentPage);
    params.append("size", pageSize);

    if (sortBy) {
      params.append("sortBy", sortBy);
    }

    // Xử lý mảng searchTerms
    if (Array.isArray(searchTerms) && searchTerms.length > 0) {
      searchTerms.forEach((term) => {
        if (term) {
          // Chỉ append nếu term tồn tại
          params.append("search", term);
        }
      });
    }

    const response = await axios.get(apiUrl, { params });
    return response.data;
  } catch (error) {
    console.error("Error searching ingredients:", error);
    throw error;
  }
};

export const addIngredient = async (ingredientId, stock, price) => {
  try {
    const formData = new FormData();

    // Thêm các trường dữ liệu
    formData.append("ingredientId", ingredientId);
    formData.append("stock", stock);
    formData.append("price", price);

    const response = await axios.post(
      "/api/v1/ingredientBySupplier/supplierUploadIngredient",
      formData
    );

    return response.data;
  } catch (error) {
    console.error("Error adding ingredient:", error);
    throw error;
  }
};
