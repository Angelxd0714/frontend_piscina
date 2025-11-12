import axiosInstance from "./axiosConfig";

export const authApi = {
  // Login: POST /api/auth/login
  login: async (email, password) => {
    const response = await axiosInstance.post("/api/auth/login", {
      email,
      password,
    });
    return response.data;
  },

  // Register: POST /api/auth/register
  register: async (userData) => {
    const response = await axiosInstance.post("/api/auth/register", {
      nombre: userData.nombre,
      apellido: userData.apellido || "", // Opcional
      cedula: userData.identificacion,
      email: userData.correo,
      password: userData.password,
      rol: userData.rol || "USER",
    });
    return response.data;
  },

  // Logout (opcional, si el backend tiene endpoint)
  logout: async () => {
    const response = await axiosInstance.post("/api/auth/logout");
    return response.data;
  },
};
