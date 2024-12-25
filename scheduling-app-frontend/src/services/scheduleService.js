import axiosInstance from "./axiosInstance";

export const fetchEmployees = async () => {
  try {
    const response = await axiosInstance.get("/employees");
    return response;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};

export const scheduleTask = async (scheduleData) => {
  try {
    const response = await axiosInstance.post("/schedules", scheduleData);
    return response;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};
