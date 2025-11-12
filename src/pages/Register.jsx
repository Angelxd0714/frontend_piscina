import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Pool,
  PersonAdd,
} from "@mui/icons-material";
import { authApi } from "../api/authApi";
import useAuthStore from "../store/authStore";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    identificacion: "",
    correo: "",
    password: "",
    rol: "USER",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    console.log(formData);
    if (
      !formData.nombre ||
      !formData.identificacion ||
      !formData.correo ||
      !formData.password
    ) {
      setError("Todos los campos son obligatorios (excepto apellido)");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setLoading(false);
      return;
    }

    try {
      const response = await authApi.register(formData);

      if (response.success) {
        login(response.data.user, response.data.token);

        navigate("/dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Error al registrar usuario. Intenta nuevamente.",
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1976d2 0%, #00bcd4 100%)",
        backgroundImage:
          "url(https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&q=80)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#1976d2",
              color: "white",
              py: 3,
              textAlign: "center",
            }}
          >
            <Pool sx={{ fontSize: 48, mb: 1 }} />
            <Typography variant="h5" fontWeight={600}>
              Sistema de Piscinas
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
              Crear nueva cuenta
            </Typography>
          </Box>

          <CardContent sx={{ p: 4 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                margin="normal"
                required
                autoComplete="given-name"
              />

              <TextField
                fullWidth
                label="Apellido (Opcional)"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                margin="normal"
                autoComplete="family-name"
              />

              <TextField
                fullWidth
                label="Cédula"
                name="identificacion"
                value={formData.identificacion}
                onChange={handleChange}
                margin="normal"
                required
                inputProps={{ maxLength: 15 }}
              />

              <TextField
                fullWidth
                label="Correo Electrónico"
                name="correo"
                type="email"
                value={formData.correo}
                onChange={handleChange}
                margin="normal"
                required
                autoComplete="email"
              />

              <TextField
                fullWidth
                label="Contraseña"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                required
                autoComplete="new-password"
                helperText="Mínimo 6 caracteres"
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

              <FormControl fullWidth margin="normal">
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

              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                startIcon={
                  loading ? <CircularProgress size={20} /> : <PersonAdd />
                }
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  borderRadius: 2,
                  backgroundColor: "#1976d2",
                  "&:hover": {
                    backgroundColor: "#1565c0",
                  },
                }}
              >
                {loading ? "Registrando..." : "Crear Cuenta"}
              </Button>

              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  ¿Ya tienes una cuenta?{" "}
                  <Link
                    to="/login"
                    style={{
                      color: "#1976d2",
                      textDecoration: "none",
                      fontWeight: 600,
                    }}
                  >
                    Iniciar Sesión
                  </Link>
                </Typography>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Register;
