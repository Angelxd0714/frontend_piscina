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
  useTheme,
  alpha,
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
  const theme = useTheme();
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
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        backgroundImage:
          "linear-gradient(135deg, rgba(25, 118, 210, 0.9) 0%, rgba(0, 188, 212, 0.9) 100%), url(https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&q=80)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
        py: 2,
        px: 2,
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            overflow: "hidden",
            width: "100%",
            maxWidth: 450,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          }}
        >
          {/* Header con gradiente */}
          <Box
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              color: "white",
              py: 4,
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: -50,
                right: -50,
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: alpha("#fff", 0.1),
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: -30,
                left: -30,
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: alpha("#fff", 0.1),
              }}
            />

            <Box position="relative" zIndex={1}>
              <Pool
                sx={{
                  fontSize: 48,
                  mb: 2,
                  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
                }}
              />
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Crear Cuenta
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Únete al Sistema de Gestión de Piscinas
              </Typography>
            </Box>
          </Box>

          <CardContent sx={{ p: 4 }}>
            {error && (
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  borderRadius: 2,
                  alignItems: "center",
                }}
              >
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  margin="normal"
                  required
                  autoComplete="given-name"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Apellido (Opcional)"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  margin="normal"
                  autoComplete="family-name"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Cédula"
                  name="identificacion"
                  value={formData.identificacion}
                  onChange={handleChange}
                  margin="normal"
                  required
                  type="number"
                  inputProps={{ maxLength: 15 }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
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
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
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
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: "text.secondary" }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Rol</InputLabel>
                  <Select
                    name="rol"
                    value={formData.rol}
                    onChange={handleChange}
                    label="Rol"
                    sx={{
                      borderRadius: 2,
                    }}
                  >
                    <MenuItem value="USER">Usuario</MenuItem>
                    <MenuItem value="ADMIN">Administrador</MenuItem>
                  </Select>
                </FormControl>
              </Box>

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
                  mt: 2,
                  mb: 3,
                  py: 1.5,
                  textTransform: "none",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  borderRadius: 2,
                  boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
                  "&:hover": {
                    boxShadow: "0 6px 16px rgba(25, 118, 210, 0.4)",
                    transform: "translateY(-1px)",
                  },
                  "&:disabled": {
                    transform: "none",
                    boxShadow: "none",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                {loading ? "Creando cuenta..." : "Registrarse"}
              </Button>

              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  ¿Ya tienes una cuenta?{" "}
                  <Link
                    to="/login"
                    style={{
                      color: theme.palette.primary.main,
                      textDecoration: "none",
                      fontWeight: 600,
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.color = theme.palette.primary.dark)
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.color = theme.palette.primary.main)
                    }
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
