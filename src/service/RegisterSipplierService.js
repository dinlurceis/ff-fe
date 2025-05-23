import axios from "../utils/CustomizeAxios";

export const getAllSupplier = async (page, size) => {
  try {
    const response = await axios.get('/api/v1/supplier/getAllSupplier', {
      params: {
        page,
        size
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    throw error;
  }
};

export const getAllSupplierStatus = async (page, size, status) => {
  try {
    const response = await axios.get('/api/v1/supplier/getAllSupplierStatus', {
      params: {
        page,
        size,
        status
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching suppliers by status:', error);
    throw error;
  }
};

export const acceptSupplier = async (supplierId) => {
  try {
    const response = await axios.patch(`/api/v1/supplier/acceptSupplier/${supplierId}`);
    return response.data;
  } catch (error) {
    console.error('Error accepting supplier:', error);
    throw error;
  }
};

export const rejectSupplier = async (supplierId) => {
  try {
    const response = await axios.patch(`/api/v1/supplier/rejectSupplier/${supplierId}`);
    return response.data;
  } catch (error) {
    console.error('Error rejecting supplier:', error);
    throw error;
  }
};

export const registerSupplier = async (requestData) => {
  try {
    const formData = new FormData();
    
    // Thêm dữ liệu JSON
    formData.append('request', new Blob([JSON.stringify(requestData)], {
      type: 'application/json'
    }));
    
    // Thêm file nếu có
    // if (avatarFile) formData.append('avatarPdf', avatarFile);
    // if (resumeFile) formData.append('resumePdf', resumeFile);

    const response = await axios.post('/api/v1/supplier/registerSupplier', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error registering supplier:', error);
    throw error;
  }
};