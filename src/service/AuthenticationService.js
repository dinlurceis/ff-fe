import { toast } from "react-toastify";
import axios from "../utils/CustomizeAxios";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`api/v1/auth/login`, {
      email,
      password,
    });
    console.log(response.data);
    if (response.data.result) {
      return response.data;
    } else {
      toast.success("Email or password incorrect");
      return;
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const register = async (email, password, fullName) => {
  try {
    const response = await axios.post(`api/v1/auth/register`, {
      email,
      password,
      fullName,
    });
    console.log(response.data);
    if (response.data.result) {
      return response.data;
    } else {
      toast.success("Email or password incorrect");
      return;
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const verifyEmail = async (Otp) => {
  try {
    const response = await axios.get(`api/v1/auth/email-verification/${Otp}`);
    console.log(response.data);
    if (response.data.result) {
      return response.data;
    } else {
      toast.success("Email or password incorrect");
      return;
    }
  } catch (error) {
    throw new Error(error);
  }
};
export const introspect = async () => {
  try {
    const accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Token is missing");
    }

    const response = await axios.post(`api/v1/auth/introspect`, {
      accessToken: accessToken,
    });

    if (response.data && response.data.result) {
      return response.data.result;
    } else {
      throw new Error("Invalid introspect response structure");
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to introspect token";
    throw new Error(errorMessage);
  }
};
