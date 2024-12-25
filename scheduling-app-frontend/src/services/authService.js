import axiosInstance from "./axiosInstance";

export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post("/auth/login", credentials);
    return response;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};

export const useAuth = () => {
  const token = localStorage.getItem("authToken"); // Assuming you store the auth token in localStorage
  return {
    isAuthenticated: token ? true : false,
  };
};
