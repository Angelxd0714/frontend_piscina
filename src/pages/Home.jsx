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
  alpha,
} from "@mui/material";
import {
  CalendarMonth,
  Schedule,
  Forum,
  Pool,
  ArrowForward,
} from "@mui/icons-material";

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const features = [
    {
      icon: (
        <CalendarMonth
          sx={{ fontSize: 48, color: theme.palette.primary.main }}
        />
      ),
      title: "Gestión de Reservas",
      description:
        "Organiza y gestiona las reservas de tus instalaciones de manera sencilla y eficaz.",
    },
    {
      icon: (
        <Schedule sx={{ fontSize: 48, color: theme.palette.primary.main }} />
      ),
      title: "Control de Mantenimiento",
      description:
        "Lleva un registro detallado de las tareas de mantenimiento para asegurar la calidad del agua.",
    },
    {
      icon: <Forum sx={{ fontSize: 48, color: theme.palette.primary.main }} />,
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
        background: "linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)",
      }}
    >
      {/* Navbar */}
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 1px 20px rgba(0,0,0,0.08)",
          borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Pool
              sx={{
                color: theme.palette.primary.main,
                mr: 2,
                fontSize: 32,
                filter: "drop-shadow(0 2px 4px rgba(25, 118, 210, 0.2))",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 700,
                fontSize: "1.25rem",
              }}
            >
              Sistema de Piscinas
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={() => navigate("/login")}
            endIcon={<ArrowForward />}
            sx={{
              backgroundColor: theme.palette.primary.main,
              textTransform: "none",
              fontWeight: 600,
              px: 4,
              py: 1,
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
                boxShadow: "0 6px 16px rgba(25, 118, 210, 0.4)",
                transform: "translateY(-1px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Iniciar Sesión
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          minHeight: isMobile ? "70vh" : "85vh",
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.9)} 0%, ${alpha(theme.palette.primary.dark, 0.9)} 100%), url(https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&q=80)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: isMobile ? "scroll" : "fixed",
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
            background:
              "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
          },
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 1,
            px: 3,
            py: 8,
          }}
        >
          <Box sx={{ maxWidth: "800px", mx: "auto" }}>
            <Typography
              variant={isMobile ? "h3" : "h2"}
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 800,
                textShadow: "2px 2px 8px rgba(0,0,0,0.3)",
                mb: 3,
                lineHeight: 1.2,
              }}
            >
              Sistema de Gestión de Piscinas
            </Typography>
            <Typography
              variant={isMobile ? "h6" : "h5"}
              sx={{
                mb: 5,
                opacity: 0.95,
                fontWeight: 300,
                textShadow: "1px 1px 4px rgba(0,0,0,0.3)",
                lineHeight: 1.6,
                maxWidth: "600px",
                mx: "auto",
              }}
            >
              La solución todo-en-uno para administrar tus instalaciones
              acuáticas de forma eficiente y profesional.
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 3,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/login")}
                endIcon={<ArrowForward />}
                sx={{
                  backgroundColor: "white",
                  color: theme.palette.primary.main,
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  px: 5,
                  py: 1.5,
                  borderRadius: 3,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                  "&:hover": {
                    backgroundColor: "#f8f9fa",
                    transform: "translateY(-3px)",
                    boxShadow: "0 12px 32px rgba(0,0,0,0.3)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Comenzar Ahora
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/register")}
                sx={{
                  borderColor: "white",
                  color: "white",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  px: 5,
                  py: 1.5,
                  borderRadius: 3,
                  "&:hover": {
                    backgroundColor: alpha("#fff", 0.1),
                    borderColor: "white",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Crear Cuenta
              </Button>
            </Box>
          </Box>
        </Container>

        {/* Wave separator */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "80px",
            background: "linear-gradient(180deg, transparent 0%, #f8fbff 100%)",
          }}
        />
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant={isMobile ? "h4" : "h3"}
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary,
              mb: 2,
            }}
          >
            Características Principales
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: "600px",
              mx: "auto",
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            Descubre todas las herramientas que tenemos para optimizar la
            gestión de tus piscinas
          </Typography>
        </Box>

        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="stretch"
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
                  p: 4,
                  borderRadius: 4,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.05)}`,
                  background: "white",
                  transition: "all 0.4s ease",
                  "&:hover": {
                    transform: "translateY(-12px)",
                    boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
                    borderColor: alpha(theme.palette.primary.main, 0.2),
                  },
                }}
              >
                <Box
                  sx={{
                    mb: 3,
                    p: 3,
                    borderRadius: "50%",
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    transition: "all 0.3s ease",
                    ".MuiCard-root:hover &": {
                      backgroundColor: alpha(theme.palette.primary.main, 0.12),
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  {feature.icon}
                </Box>
                <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
                  <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                      mb: 2,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.7,
                      fontSize: "1.05rem",
                    }}
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
          py: 6,
          backgroundColor: alpha(theme.palette.primary.main, 0.02),
          borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
              mb: 3,
              flexWrap: "wrap",
            }}
          >
            <Button
              color="inherit"
              sx={{
                textTransform: "none",
                color: "text.secondary",
                fontWeight: 500,
                "&:hover": {
                  color: theme.palette.primary.main,
                  backgroundColor: "transparent",
                },
              }}
            >
              Contacto
            </Button>
            <Button
              color="inherit"
              sx={{
                textTransform: "none",
                color: "text.secondary",
                fontWeight: 500,
                "&:hover": {
                  color: theme.palette.primary.main,
                  backgroundColor: "transparent",
                },
              }}
            >
              Términos de Servicio
            </Button>
            <Button
              color="inherit"
              sx={{
                textTransform: "none",
                color: "text.secondary",
                fontWeight: 500,
                "&:hover": {
                  color: theme.palette.primary.main,
                  backgroundColor: "transparent",
                },
              }}
            >
              Política de Privacidad
            </Button>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{
              fontSize: "0.875rem",
              fontWeight: 500,
            }}
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
