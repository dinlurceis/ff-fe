import axios from "../utils/CustomizeAxios";

export const createCategory = async (name,description) => {
    try {
        const response = await axios.post(`api/v1/category/insertCategory`,{
            name:name,
            description:description
        })
        return response.data;
    } catch (error) {
        console.error('Error get my info', error);
        throw error;
    }
}

export const getCategoryById = async (categoryId) => {
    try {
        const response = await axios.get(`api/v1/category/getCategoryId/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error('Error get my info', error);
        throw error;
    }
}

export const listAllCategory = async () => {
    try {
        const response = await axios.get(`api/v1/category/listCategory`)
        return response.data;
    } catch (error) {
        console.error('Error get my info', error);
        throw error;
    }
}

export const deleteCategory = async (categoryId) => {
    try {
        const response = await axios.delete(`api/v1/category/deleteCategory/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error('Error get my info', error);
        throw error;
    }
}