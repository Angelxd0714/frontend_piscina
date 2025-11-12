import axiosInstance from "./axiosConfig";

export const piscinaApi = {
  getAll: async (params = {}) => {
    const response = await axiosInstance.get("/api/piscinas", { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosInstance.get(`/api/piscinas/${id}`);
    return response.data;
  },

  create: async (formData) => {
    const response = await axiosInstance.post("/api/piscinas", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  update: async (id, formData) => {
    const response = await axiosInstance.put(`/api/piscinas/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(`/api/piscinas/${id}`);
    return response.data;
  },
};
