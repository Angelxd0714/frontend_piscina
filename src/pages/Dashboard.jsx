import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  useTheme,
  alpha,
} from "@mui/material";
import { Add, Description, Pool, TrendingUp, Group } from "@mui/icons-material";
import useAuthStore from "../store/authStore";

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { user, isAdmin } = useAuthStore();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Buenos días";
    if (hour < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  const quickActions = [
    {
      title: "Añadir Nueva Piscina",
      description: "Registra una nueva piscina en el sistema.",
      action: () => navigate("/piscinas/create"),
      buttonText: "Empezar",
      color: "#e3f2fd",
      icon: <Add sx={{ fontSize: 32, color: "#2196f3" }} />,
      adminOnly: true,
      badge: "Nuevo",
    },
    {
      title: "Ver Piscinas",
      description: "Explora todas las piscinas registradas.",
      action: () => navigate("/piscinas"),
      buttonText: "Ver Lista",
      color: "#e8f5e9",
      icon: <Pool sx={{ fontSize: 32, color: "#4caf50" }} />,
      adminOnly: false,
    },
    {
      title: "Gestionar Usuarios",
      description: "Administra los usuarios del sistema.",
      action: () => navigate("/users"),
      buttonText: "Ver Lista",
      color: "#e0f7fa",
      icon: <Group sx={{ fontSize: 32, color: "#00bcd4" }} />,
      adminOnly: false,
      badge: "Próximamente",
    },
  ];

  const stats = [];

  const filteredActions = quickActions.filter(
    (action) => !action.adminOnly || (action.adminOnly && isAdmin()),
  );

  return (
    <Box sx={{ width: "100%", minHeight: "100vh" }}>
      <Container
        maxWidth="xl"
        sx={{
          py: { xs: 2, sm: 3, md: 4 },
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {/* Mensaje de Bienvenida */}
        <Box
          sx={{
            mb: { xs: 4, md: 6 },
            p: { xs: 3, sm: 4, md: 4 },
            borderRadius: 4,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            color: "white",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: -50,
              right: -50,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: alpha("#fff", 0.1),
              display: { xs: "none", md: "block" },
            },
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -80,
              right: 100,
              width: 150,
              height: 150,
              borderRadius: "50%",
              background: alpha("#fff", 0.05),
              display: { xs: "none", md: "block" },
            },
          }}
        >
          <Box position="relative" zIndex={1}>
            <Chip
              label={isAdmin() ? "Administrador" : "Usuario"}
              sx={{
                mb: 2,
                backgroundColor: alpha("#fff", 0.2),
                color: "white",
                fontWeight: 600,
              }}
            />
            <Typography
              variant="h3"
              fontWeight={700}
              gutterBottom
              sx={{
                fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
              }}
            >
              {getGreeting()}, {user?.nombre}! 👋
            </Typography>
            <Typography
              variant="h6"
              sx={{
                opacity: 0.9,
                mb: 1,
                fontSize: { xs: "1rem", sm: "1.15rem", md: "1.25rem" },
              }}
            >
              Bienvenido al Sistema de Gestión de Piscinas
            </Typography>
            <Typography
              variant="body1"
              sx={{
                opacity: 0.85,
                maxWidth: "600px",
                fontSize: { xs: "0.875rem", sm: "0.95rem", md: "1rem" },
              }}
            >
              {isAdmin()
                ? "Como administrador, tienes acceso completo a todas las funcionalidades del sistema para gestionar piscinas, usuarios y mantenimientos."
                : "Explora y gestiona las piscinas registradas en el sistema de manera eficiente."}
            </Typography>
          </Box>
        </Box>

        {/* Estadísticas Rápidas */}
        <Grid
          container
          spacing={{ xs: 2, sm: 2, md: 3 }}
          sx={{ mb: { xs: 4, md: 6 } }}
        >
          {stats.map((stat, index) => (
            <Grid item xs={6} sm={6} md={3} key={index}>
              <Card
                sx={{
                  p: { xs: 2, sm: 2.5, md: 3 },
                  borderRadius: 3,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  border: `1px solid ${theme.palette.divider}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 1,
                    flexWrap: "wrap",
                    gap: 0.5,
                  }}
                >
                  <Typography
                    variant="h4"
                    fontWeight={700}
                    color="primary"
                    sx={{
                      fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Chip
                    icon={<TrendingUp sx={{ fontSize: { xs: 14, sm: 16 } }} />}
                    label={stat.trend}
                    size="small"
                    color={stat.trend.startsWith("+") ? "success" : "error"}
                    sx={{ height: { xs: 20, sm: 24 } }}
                  />
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={500}
                  sx={{
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  }}
                >
                  {stat.label}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Acceso Rápido */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{
              mb: 1,
              fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
            }}
          >
            Acceso Rápido
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              mb: 3,
              fontSize: { xs: "0.875rem", sm: "0.95rem", md: "1rem" },
            }}
          >
            Accede rápidamente a las funciones principales del sistema
          </Typography>

          <Grid
            container
            spacing={{ xs: 2, sm: 2, md: 3 }}
            justifyContent="center"
          >
            {filteredActions.map((action, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    borderRadius: 3,
                    border: `1px solid ${theme.palette.divider}`,
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    "&:hover": {
                      boxShadow: "0 12px 28px rgba(0,0,0,0.15)",
                      transform: "translateY(-4px)",
                    },
                  }}
                  onClick={action.action}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      textAlign: "left",
                      p: { xs: 2, sm: 2.5, md: 3 },
                      height: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: { xs: 48, sm: 52, md: 56 },
                          height: { xs: 48, sm: 52, md: 56 },
                          borderRadius: 2,
                          backgroundColor: action.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {action.icon}
                      </Box>
                      {action.badge && (
                        <Chip
                          label={action.badge}
                          size="small"
                          color={
                            action.badge === "Nuevo" ? "primary" : "default"
                          }
                          variant="outlined"
                          sx={{
                            fontSize: { xs: "0.65rem", sm: "0.75rem" },
                          }}
                        />
                      )}
                    </Box>

                    <Typography
                      variant="h6"
                      fontWeight={600}
                      gutterBottom
                      sx={{
                        lineHeight: 1.3,
                        fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                      }}
                    >
                      {action.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 3,
                        flexGrow: 1,
                        lineHeight: 1.5,
                        fontSize: {
                          xs: "0.8rem",
                          sm: "0.85rem",
                          md: "0.875rem",
                        },
                      }}
                    >
                      {action.description}
                    </Typography>

                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: 2,
                        py: { xs: 0.75, sm: 1 },
                        boxShadow: "none",
                        fontSize: {
                          xs: "0.8rem",
                          sm: "0.875rem",
                          md: "0.9375rem",
                        },
                        "&:hover": {
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        },
                      }}
                    >
                      {action.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Sección de ayuda */}
        <Box sx={{ mt: { xs: 4, md: 6 } }}>
          <Card
            sx={{
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              borderRadius: 3,
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            }}
          >
            <CardContent sx={{ p: { xs: 3, sm: 3.5, md: 4 } }}>
              <Typography
                variant="h6"
                fontWeight={700}
                gutterBottom
                color="primary"
                sx={{
                  fontSize: { xs: "1.1rem", sm: "1.15rem", md: "1.25rem" },
                }}
              >
                ¿Necesitas ayuda?
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 3,
                  maxWidth: "600px",
                  fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.875rem" },
                }}
              >
                Si tienes alguna duda sobre cómo usar el sistema, consulta
                nuestra documentación completa o contacta con nuestro equipo de
                soporte técnico.
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  onClick={() => alert("Documentación próximamente")}
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    px: { xs: 2, sm: 2.5, md: 3 },
                    fontSize: { xs: "0.8rem", sm: "0.875rem", md: "0.9375rem" },
                  }}
                >
                  Ver Documentación
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => alert("Soporte próximamente")}
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    px: { xs: 2, sm: 2.5, md: 3 },
                    fontSize: { xs: "0.8rem", sm: "0.875rem", md: "0.9375rem" },
                  }}
                >
                  Contactar Soporte
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
