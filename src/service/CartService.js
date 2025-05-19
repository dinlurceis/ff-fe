import axios from "../utils/CustomizeAxios";

export const addItemCart = async (ingredientId,quantity=1) => {
    try {
        const response = await axios.post(`api/v1/cart/addOrUpdateItem`,{
            ingredientId:ingredientId,
            quantity:quantity
        })
        return response.data;
    } catch (error) {
        console.error('Error get my info', error);
        throw error;
    }
}

export const deleteItemcart = async (ingredientId) => {
    try {
        const response = await axios.delete(`api/v1/cart/delete/${ingredientId}`)
        return response.data;
    } catch (error) {
        console.error('Error get my info', error);
        throw error;
    }
}


export const deleteAllItemcart = async () => {
    try {
        const response = await axios.delete(`api/v1/cart/deleteAll`)
        return response.data;
    } catch (error) {
        console.error('Error get my info', error);
        throw error;
    }
}


export const detailcart = async () => {
    try {
        const response = await axios.get(`api/v1/cart/detailCart`)
        return response.data;
    } catch (error) {
        console.error('Error get my info', error);
        throw error;
    }
}