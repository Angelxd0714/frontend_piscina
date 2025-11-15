import axiosInstance from "./axiosConfig";

export const authApi = {
  login: async (correo, password) => {
    const response = await axiosInstance.post("/api/auth/login", {
      correo,
      password,
    });
    return response.data;
  },

  register: async (userData) => {
    console.log(userData);
    const response = await axiosInstance.post("/api/auth/register", {
      nombre: userData.nombre,
      apellido: userData.apellido || "",
      identificacion: String(userData.identificacion),
      correo: userData.correo,
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
  forgotPassword: async (correo) => {
    const response = await axiosInstance.post(
      "/api/auth/request-password-reset",
      {
        correo,
      },
    );
    return response.data;
  },
};
