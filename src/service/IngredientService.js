import axios from "../utils/CustomizeAxios";

export const createIngredient = async (
  name,
  description,
  unit,
  ingredientPdf
) => {
  try {
    const formData = new FormData();
    formData.append(
      "request",
      new Blob([JSON.stringify({ name, description, unit })], {
        type: "application/json",
      })
    );
    formData.append("ingredientPdf", ingredientPdf); // Đây là file PDF

    const response = await axios.post(
      `/api/v1/ingredient/addIngredient`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error adding ingredient", error);
    throw error;
  }
};

export const updateIngredient = async (
  ingredientId,
  name,
  description,
  unit,
  ingredientPdf = null
) => {
  try {
    const formData = new FormData();

    // Gửi request object dưới dạng JSON
    const requestPayload = { name, description, unit };
    formData.append(
      "request",
      new Blob([JSON.stringify(requestPayload)], { type: "application/json" })
    );

    // Nếu có file thì mới đính kèm
    if (ingredientPdf) {
      formData.append("ingredientPdf", ingredientPdf);
    }

    const response = await axios.patch(
      `/api/v1/ingredient/updateIngredient/${ingredientId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating ingredient:", error);
    throw error;
  }
};

export const getIngredientById = async (ingredientId) => {
  try {
    const response = await axios.get(
      `api/v1/ingredient/getIngredientById/${ingredientId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error get my info", error);
    throw error;
  }
};

export const listAllIngredient = async () => {
  try {
    const response = await axios.get(`api/v1/ingredient/getAllIngredient`);
    return response.data;
  } catch (error) {
    console.error("Error get my info", error);
    throw error;
  }
};

export const deleteSoftIngredient = async (ingredientId) => {
  try {
    const response = await axios.delete(
      `api/v1/ingredient/deleteSoft/${ingredientId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error get my info", error);
    throw error;
  }
};

export const deleteHardIngredient = async (ingredientId) => {
  try {
    const response = await axios.delete(
      `api/v1/ingredient/deleteHard/${ingredientId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error get my info", error);
    throw error;
  }
};
export const getIngredientWithSortAndMultiFieldAndSearch = async (
  currentPage = 1,
  pageSize = 10,
  sortBy = null,
  searchTerms = []
) => {
  try {
    const apiUrl =
      "/api/v1/ingredient/getIngredientWithSortAndMultiFieldAndSearch";
      
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
}
export const getIngredientByKeyword = async (keyword) => {
  try {
    const response = await axios.get("/api/v1/ingredient/getIngredientByKeyword", keyword);
    return response.data;
  }
  catch(err) {
    throw err;
  }
}
export const getIngredientByKeyword2 = async (keyword = "") => {
  try {
    // Build the URL with the keyword parameter
    const url = `/api/v1/ingredient/getIngredientByKeyword?keyword=${keyword}`

    // Make the API request
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching ingredients:", error)
    throw error
  }
}
