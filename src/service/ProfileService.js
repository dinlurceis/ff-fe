import axios from "../utils/CustomizeAxios";

export const getAvatar = async () => {
    const response = await axios.get(`api/v1/profile/get-avatar`)
    return response.data
}
export const updateAvatar = async (formData) => {
    try {
        const response = await axios.post(`api/v1/profile/update-avatar`, formData)
        console.log(response)
        return response.data;
    } catch (error) {
        console.log('Fail to update Avatar', error)
        throw error;
    }
};

export const removeAvatar = async () => {
    try {
        const response = await axios.delete(`api/v1/profile/remove-avatar`)
        return response.data;
    } catch (error) {
        console.log('Fail to remove Avatar', error)
        throw error;
    }
}
