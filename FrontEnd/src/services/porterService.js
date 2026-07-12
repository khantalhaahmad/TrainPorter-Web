import api from "./api";

export const getMyApplication = async () => {
  const response = await api.get("/porter/my-application");
  return response.data;
};