import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { CalendarMonth, Schedule, Forum, Pool } from "@mui/icons-material";

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const features = [
    {
      icon: <CalendarMonth sx={{ fontSize: 48, color: "#1976d2" }} />,
      title: "Gestión de Reservas",
      description:
        "Organiza y gestiona las reservas de tus instalaciones de manera sencilla y eficaz.",
    },
    {
      icon: <Schedule sx={{ fontSize: 48, color: "#1976d2" }} />,
      title: "Control de Mantenimiento",
      description:
        "Lleva un registro detallado de las tareas de mantenimiento para asegurar la calidad del agua.",
    },
    {
      icon: <Forum sx={{ fontSize: 48, color: "#1976d2" }} />,
      title: "Comunicación con Usuarios",
      description:
        "Mantén a tus usuarios informados con notificaciones y comunicados directos.",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Navbar */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar>
          <Pool sx={{ color: "#1976d2", mr: 1, fontSize: 32 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: "#333",
              fontWeight: 600,
            }}
          >
            Sistema de Piscinas
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/login")}
            sx={{
              backgroundColor: "#1976d2",
              textTransform: "none",
              fontWeight: 500,
              px: 3,
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#1565c0",
              },
            }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: isMobile ? "400px" : "500px",
          background: "linear-gradient(135deg, #1976d2 0%, #00bcd4 100%)",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(25, 118, 210, 0.6)",
          },
        }}
      >
        <Container
          maxWidth="md"
          sx={{ position: "relative", zIndex: 1, px: 3 }}
        >
          <Typography
            variant={isMobile ? "h3" : "h2"}
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              mb: 2,
            }}
          >
            Sistema de Gestión de Piscinas
          </Typography>
          <Typography
            variant={isMobile ? "body1" : "h6"}
            sx={{
              mb: 4,
              opacity: 0.95,
              fontWeight: 300,
              textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
            }}
          >
            La solución todo-en-uno para administrar tus instalaciones acuáticas
            de forma eficiente.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/login")}
            sx={{
              backgroundColor: "white",
              color: "#1976d2",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1.1rem",
              px: 5,
              py: 1.5,
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              "&:hover": {
                backgroundColor: "#f5f5f5",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Iniciar Sesión
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant={isMobile ? "h4" : "h3"}
          component="h2"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: "#333",
            mb: 6,
          }}
        >
          Características Principales
        </Typography>

        <Grid
          container
          spacing={4}
          justifyContent="center" // ✅ Centra horizontalmente
          alignItems="stretch" // ✅ Iguala altura de cards
        >
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  p: 3,
                  borderRadius: 3,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  },
                }}
              >
                <Box
                  sx={{
                    mb: 2,
                    p: 2,
                    borderRadius: "50%",
                    backgroundColor: "rgba(25, 118, 210, 0.1)",
                  }}
                >
                  {feature.icon}
                </Box>
                <CardContent>
                  <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    sx={{ fontWeight: 600, color: "#333" }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.7 }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          mt: "auto",
          py: 3,
          backgroundColor: "#f5f5f5",
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 3,
              mb: 2,
              flexWrap: "wrap",
            }}
          >
            <Button
              color="inherit"
              sx={{
                textTransform: "none",
                color: "#666",
                "&:hover": { color: "#1976d2" },
              }}
            >
              Contacto
            </Button>
            <Button
              color="inherit"
              sx={{
                textTransform: "none",
                color: "#666",
                "&:hover": { color: "#1976d2" },
              }}
            >
              Términos de Servicio
            </Button>
            <Button
              color="inherit"
              sx={{
                textTransform: "none",
                color: "#666",
                "&:hover": { color: "#1976d2" },
              }}
            >
              Política de Privacidad
            </Button>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ fontSize: "0.875rem" }}
          >
            © 2024 Sistema de Gestión de Piscinas. Todos los derechos
            reservados.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
