import axios from "../utils/CustomizeAxios";


export const createIngredient = async (name, description,unit, ingredientPdf) => {
    try {
        const formData = new FormData();
        formData.append('request', new Blob([JSON.stringify({ name, description,unit })], { type: 'application/json' }));
        formData.append('ingredientPdf', ingredientPdf); // Đây là file PDF

        const response = await axios.post(`/api/v1/ingredient/addIngredient`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error adding ingredient', error);
        throw error;
    }
};

export const updateIngredient = async (ingredientId, name, description,unit, ingredientPdf = null) => {
    try {
        const formData = new FormData();

        // Gửi request object dưới dạng JSON
        const requestPayload = { name, description,unit };
        formData.append('request', new Blob([JSON.stringify(requestPayload)], { type: 'application/json' }));

        // Nếu có file thì mới đính kèm
        if (pdfFile) {
            formData.append('ingredientPdf', ingredientPdf);
        }

        const response = await axios.patch(`/api/v1/ingredient/updateIngredient/${ingredientId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error updating ingredient:', error);
        throw error;
    }
};


export const getIngredientById = async (IngredientId) => {
    try {
        const response = await axios.get(`api/v1/ingredient/getIngredientById/${IngredientId}`);
        return response.data;
    } catch (error) {
        console.error('Error get my info', error);
        throw error;
    }
}

export const listAllIngredient = async () => {
    try {
        const response = await axios.get(`api/v1/ingredient/getAllIngredient`)
        return response.data;
    } catch (error) {
        console.error('Error get my info', error);
        throw error;
    }
}

export const deleteSoftIngredient = async (IngredientId) => {
    try {
        const response = await axios.delete(`api/v1/ingredient/deleteSoft/${IngredientId}`);
        return response.data;
    } catch (error) {
        console.error('Error get my info', error);
        throw error;
    }
}

export const deleteHardIngredient = async (IngredientId) => {
    try {
        const response = await axios.delete(`api/v1/ingredient/deleteHard/${IngredientId}`);
        return response.data;
    } catch (error) {
        console.error('Error get my info', error);
        throw error;
    }
}