import axios from "../utils/CustomizeAxios";

// export const getAlldish = async (currentPage=1,pageSize=10,) => {
//     try {
//         const response = await axios.get(`api/v1/dishs/dishList`,{
//             params:{
//                 page: currentPage,
//                 size: pageSize
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error get my info', error);
//         throw error;
//     }
// }
export const getAllDish = async (page, size, keyword, sorts) => {
  try {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("size", size);

    if (keyword) {
      params.append("keyword", keyword);
    }

    // Add each sort parameter separately
    if (sorts) {
      params.append("sorts", sorts);
    }
    console.log(params);
    console.log({ page, size, keyword, sorts });

    const response = await axios.get("api/v1/dish/dishList", {
      params: params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const getAllDishByAuthor = async (page, size, keyword, sorts) => {
//   try {
//     console.log(12);
//     console.log({ page, size, keyword, sorts });
//     const params = new URLSearchParams();
//     params.append("page", page);
//     params.append("size", size);

//     if (keyword) {
//       params.append("keyword", keyword);
//     }

//     // Add each sort parameter separately
//     if (sorts) {
//       params.append("sorts", sorts);
//     }
//     console.log(params);
//     const response = await axios.get("api/v1/dishs/dishListByAuthor", {
//       params: params,
//     });
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const SearchDish = async (
  currentPage,
  pageSize,
  sortBy,
  // authorName,
  listSearch = []
) => {
  try {
    var apiUrl = `api/v1/dish/getDishWithSortAndMultiFieldAndSearch`;

    apiUrl += `?page=${currentPage}&size=${pageSize}`;
    if (sortBy) {
      apiUrl += `&sorts=${sortBy}`;
    }
    if (listSearch) {
      apiUrl += `&search=`;
      //Append từng search item riêng biệt (sẽ ra search=title:conan&search=category:Trinh Thám)
      listSearch.forEach((item) => apiUrl += `${item},`);
      apiUrl = apiUrl.slice(0, -1); // Xóa dấu phẩy cuối cùng
    }
    console.log("qua list search rồi");

    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching dishes:", error);
    throw error;
  }
};

export const getDishById = async (id) => {
  try {
    const response = await axios.get(`api/v1/dish/getDishById/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching chapter by id:", error);
    throw error;
  }
};
export const uploadDish = async (dishData, thumbnailFile) => {
  try {
    // Create a FormData object
    const formData = new FormData();

    // Append the JSON request data
    formData.append(
      "request",
      new Blob([JSON.stringify(dishData)], {
        type: "application/json",
      })
    );

    // Append the thumbnail file
    formData.append("thumbnail", thumbnailFile);

    // Note: We're not including the PDF file

    const response = await axios.post(`api/v1/dish/uploadDish`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading dish:", error);
    throw error;
  }
};