import axiosInstance from "./axiosConfig";

export const userApi = {
  // Obtener todos los usuarios
  getAll: async (params = {}) => {
    const response = await axiosInstance.get("/api/users", { params });
    return response.data;
  },

  // Obtener usuario por ID
  getById: async (id) => {
    const response = await axiosInstance.get(`/api/users/${id}`);
    return response.data;
  },

  // Crear nuevo usuario
  create: async (userData) => {
    const response = await axiosInstance.post("/api/users", userData);
    return response.data;
  },

  // Actualizar usuario
  update: async (id, userData) => {
    const response = await axiosInstance.put(`/api/users/${id}`, userData);
    return response.data;
  },

  // Eliminar usuario
  delete: async (id) => {
    const response = await axiosInstance.delete(`/api/users/${id}`);
    return response.data;
  },

  toggleState: async (id) => {
    const response = await axiosInstance.patch(`/api/users/${id}/toggle-state`);
    return response.data;
  },
};

export default userApi;
