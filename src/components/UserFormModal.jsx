import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  IconButton,
  Alert,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import { Close, Person, Visibility, VisibilityOff } from "@mui/icons-material";
import { userApi } from "../api/userApi";

const UserFormModal = ({ open, onClose, user = null, onSuccess }) => {
  const isEdit = Boolean(user);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    identificacion: "",
    correo: "",
    password: "",
    rol: "USER",
    estado: "ACTIVO",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre || "",
        apellido: user.apellido || "",
        identificacion: user.identificacion || "",
        correo: user.correo || "",
        password: "",
        rol: user.rol || "USER",
        estado: user.estado || "ACTIVO",
      });
    } else {
      setFormData({
        nombre: "",
        apellido: "",
        identificacion: "",
        correo: "",
        password: "",
        rol: "USER",
        estado: "ACTIVO",
      });
    }
    setError("");
  }, [user, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validaciones básicas
      if (!formData.nombre || !formData.apellido || !formData.correo) {
        setError("Por favor completa todos los campos requeridos");
        setLoading(false);
        return;
      }

      if (!isEdit && !formData.password) {
        setError("La contraseña es requerida para crear un usuario");
        setLoading(false);
        return;
      }

      const dataToSend = { ...formData };

      // Si es edición y no hay password, no lo enviamos
      if (isEdit && !dataToSend.password) {
        delete dataToSend.password;
      }

      if (isEdit) {
        await userApi.update(user._id, dataToSend);
      } else {
        await userApi.create(dataToSend);
      }

      onSuccess();
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          `Error al ${isEdit ? "actualizar" : "crear"} el usuario`,
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Person color="primary" />
          <Typography variant="h6" fontWeight={600}>
            {isEdit ? "Editar Usuario" : "Nuevo Usuario"}
          </Typography>
        </Box>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ p: 3 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Grid container spacing={2}>
            {/* Nombre */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                autoFocus
              />
            </Grid>

            {/* Apellido */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Identificación */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Cédula/Identificación"
                name="identificacion"
                value={formData.identificacion}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Correo Electrónico"
                name="correo"
                type="email"
                value={formData.correo}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Contraseña */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={isEdit ? "Nueva Contraseña (opcional)" : "Contraseña"}
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required={!isEdit}
                helperText={
                  isEdit
                    ? "Dejar en blanco para mantener la contraseña actual"
                    : ""
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Rol */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Rol</InputLabel>
                <Select
                  name="rol"
                  value={formData.rol}
                  onChange={handleChange}
                  label="Rol"
                >
                  <MenuItem value="USER">Usuario</MenuItem>
                  <MenuItem value="ADMIN">Administrador</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Estado */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Estado</InputLabel>
                <Select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  label="Estado"
                >
                  <MenuItem value="ACTIVO">Activo</MenuItem>
                  <MenuItem value="INACTIVO">Inactivo</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions
          sx={{ p: 3, borderTop: "1px solid", borderColor: "divider" }}
        >
          <Button onClick={onClose} sx={{ textTransform: "none" }}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
            sx={{ textTransform: "none", px: 3 }}
          >
            {loading ? "Guardando..." : isEdit ? "Actualizar" : "Crear Usuario"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserFormModal;
