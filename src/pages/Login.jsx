import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  CircularProgress,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Pool,
  Login as LoginIcon,
} from "@mui/icons-material";
import { authApi } from "../api/authApi";
import useAuthStore from "../store/authStore";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { login } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const successMessage = location.state?.message;

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

    if (!formData.email || !formData.password) {
      setError("Por favor completa todos los campos");
      setLoading(false);
      return;
    }

    try {
      const response = await authApi.login(formData.email, formData.password);

      if (response.success) {
        login(response.data.user, response.data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Credenciales incorrectas. Verifica tu email y contraseña.",
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
        <Box sx={{ width: "100%", maxWidth: 450 }}>
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
              overflow: "hidden",
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              mb: 3,
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
                  Iniciar Sesión
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Bienvenido de vuelta al sistema
                </Typography>
              </Box>
            </Box>

            <CardContent sx={{ p: 4 }}>
              {/* Mensaje de éxito */}
              {successMessage && (
                <Alert
                  severity="success"
                  sx={{
                    mb: 3,
                    borderRadius: 2,
                    alignItems: "center",
                  }}
                >
                  {successMessage}
                </Alert>
              )}

              {/* Mensaje de error */}
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
                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    label="Correo Electrónico"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    autoFocus
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    label="Contraseña"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
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
                            aria-label="toggle password visibility"
                            sx={{ color: "text.secondary" }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  startIcon={
                    loading ? <CircularProgress size={20} /> : <LoginIcon />
                  }
                  sx={{
                    mt: 1,
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
                  {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </Button>

                <Box sx={{ textAlign: "center", mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    ¿No tienes una cuenta?{" "}
                    <Link
                      to="/register"
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
                      Regístrate aquí
                    </Link>
                  </Typography>
                </Box>

                <Box sx={{ textAlign: "center" }}>
                  <Link
                    to="/"
                    style={{
                      color: theme.palette.text.secondary,
                      textDecoration: "none",
                      fontSize: "0.875rem",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.color = theme.palette.text.primary)
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.color = theme.palette.text.secondary)
                    }
                  >
                    ← Volver al inicio
                  </Link>
                </Box>
              </form>
            </CardContent>
          </Card>

          {/* Demo credentials */}
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            }}
          >
            <CardContent sx={{ p: 2, textAlign: "center" }}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontWeight: 500 }}
              >
                <strong>Credenciales de Demo:</strong> admin@test.com /
                Admin123!
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
