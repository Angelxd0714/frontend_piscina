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

        navigate("/piscinas");
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
        background: "linear-gradient(135deg, #1976d2 0%, #00bcd4 100%)",
        backgroundImage:
          "url(https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&q=80)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
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
          {/* Header */}
          <Box
            sx={{
              backgroundColor: "#1976d2",
              color: "white",
              py: 4,
              textAlign: "center",
            }}
          >
            <Pool sx={{ fontSize: 60, mb: 1 }} />
            <Typography variant="h5" fontWeight={600}>
              Sistema de Piscinas
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
              Inicia sesión para continuar
            </Typography>
          </Box>

          <CardContent sx={{ p: 4 }}>
            {/* Mensaje de éxito */}
            {successMessage && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {successMessage}
              </Alert>
            )}

            {/* Mensaje de error */}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Correo Electrónico"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
                autoComplete="email"
                autoFocus
                InputProps={{
                  sx: { borderRadius: 2 },
                }}
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
                autoComplete="current-password"
                InputProps={{
                  sx: { borderRadius: 2 },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

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
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>

              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  ¿No tienes una cuenta?{" "}
                  <Link
                    to="/register"
                    style={{
                      color: "#1976d2",
                      textDecoration: "none",
                      fontWeight: 600,
                    }}
                  >
                    Regístrate aquí
                  </Link>
                </Typography>
              </Box>

              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Link
                  to="/"
                  style={{
                    color: "#666",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                  }}
                >
                  ← Volver al inicio
                </Link>
              </Box>
            </form>
          </CardContent>
        </Card>

        {/* Demo credentials (opcional - solo para testing) */}
        <Box
          sx={{
            mt: 3,
            p: 2,
            backgroundColor: "rgba(255,255,255,0.9)",
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="caption" color="text.secondary">
            <strong>Demo:</strong> admin@test.com / Admin123!
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
