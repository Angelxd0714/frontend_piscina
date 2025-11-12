import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
  Chip,
  IconButton,
  CircularProgress,
  Alert,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Fab,
  Tooltip,
} from "@mui/material";
import {
  Add,
  Search,
  Visibility,
  Edit,
  Delete,
  MoreVert,
} from "@mui/icons-material";
import { piscinaApi } from "../../api/piscinaApi";
import useAuthStore from "../../store/authStore";
import PiscinaFormModal from "../piscinas/PiscinaCreate";

const PiscinasList = () => {
  const { isAdmin } = useAuthStore();

  const [piscinas, setPiscinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    categoria: "",
    forma: "",
    uso: "",
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPiscina, setSelectedPiscina] = useState(null);

  // Estados del modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPiscina, setEditingPiscina] = useState(null);

  useEffect(() => {
    fetchPiscinas();
  }, []);

  const fetchPiscinas = async () => {
    try {
      setLoading(true);
      const response = await piscinaApi.getAll();
      setPiscinas(response.data || []);
    } catch (err) {
      setError("Error al cargar las piscinas");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuOpen = (event, piscina) => {
    setAnchorEl(event.currentTarget);
    setSelectedPiscina(piscina);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPiscina(null);
  };

  const handleOpenCreateModal = () => {
    setEditingPiscina(null);
    setModalOpen(true);
  };

  const handleOpenEditModal = (piscina) => {
    setEditingPiscina(piscina);
    setModalOpen(true);
    handleMenuClose();
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingPiscina(null);
  };

  const handleSuccess = () => {
    fetchPiscinas();
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta piscina?")) {
      try {
        await piscinaApi.delete(id);
        fetchPiscinas();
        handleMenuClose();
      } catch (err) {
        alert("Error al eliminar la piscina");
      }
    }
  };

  const filteredPiscinas = piscinas.filter((piscina) => {
    const matchesSearch = piscina.nombre
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategoria =
      !filters.categoria || piscina.categoria === filters.categoria;
    const matchesForma = !filters.forma || piscina.forma === filters.forma;
    const matchesUso = !filters.uso || piscina.uso === filters.uso;

    return matchesSearch && matchesCategoria && matchesForma && matchesUso;
  });

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ position: "relative", pb: 10 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Gestión de Piscinas
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Administra todas las piscinas registradas en el sistema
          </Typography>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Search and Filters */}
      <Card sx={{ mb: 4, p: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ borderRadius: 2 }}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={2}>
            <FormControl fullWidth>
              <InputLabel>Categoría</InputLabel>
              <Select
                value={filters.categoria}
                onChange={(e) =>
                  setFilters({ ...filters, categoria: e.target.value })
                }
                label="Categoría"
              >
                <MenuItem value="">Todas</MenuItem>
                <MenuItem value="Niños">Niños</MenuItem>
                <MenuItem value="Adultos">Adultos</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4} md={2}>
            <FormControl fullWidth>
              <InputLabel>Forma</InputLabel>
              <Select
                value={filters.forma}
                onChange={(e) =>
                  setFilters({ ...filters, forma: e.target.value })
                }
                label="Forma"
              >
                <MenuItem value="">Todas</MenuItem>
                <MenuItem value="Rectangular">Rectangular</MenuItem>
                <MenuItem value="Circular">Circular</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4} md={2}>
            <FormControl fullWidth>
              <InputLabel>Uso</InputLabel>
              <Select
                value={filters.uso}
                onChange={(e) =>
                  setFilters({ ...filters, uso: e.target.value })
                }
                label="Uso"
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="Privada">Privada</MenuItem>
                <MenuItem value="Publica">Pública</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={2}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => setFilters({ categoria: "", forma: "", uso: "" })}
              sx={{ textTransform: "none", py: 1.8 }}
            >
              Limpiar Filtros
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* Piscinas Grid */}
      {filteredPiscinas.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
          }}
        >
          <Typography variant="h6" color="text.secondary">
            No se encontraron piscinas
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {searchTerm || filters.categoria || filters.forma || filters.uso
              ? "Intenta con otros filtros"
              : "Comienza agregando una nueva piscina"}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredPiscinas.map((piscina) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={piscina._id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  borderRadius: 3,
                  transition: "all 0.3s",
                  "&:hover": {
                    boxShadow: "0 8px 16px rgba(0,0,0,0.12)",
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={
                    piscina.foto ||
                    "https://via.placeholder.com/400x300?text=Sin+Imagen"
                  }
                  alt={piscina.nombre}
                  sx={{ objectFit: "cover" }}
                />

                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Typography variant="h6" fontWeight={600} gutterBottom noWrap>
                    {piscina.nombre}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                    noWrap
                  >
                    📍 {piscina.ciudad}
                  </Typography>

                  <Box
                    sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", mt: 1 }}
                  >
                    <Chip
                      label={piscina.categoria}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                    <Chip
                      label={piscina.forma}
                      size="small"
                      color="secondary"
                      variant="outlined"
                    />
                    <Chip
                      label={piscina.uso}
                      size="small"
                      color="info"
                      variant="outlined"
                    />
                  </Box>
                </CardContent>

                <CardActions
                  sx={{ justifyContent: "space-between", p: 2, pt: 0 }}
                >
                  <Button
                    size="small"
                    startIcon={<Visibility />}
                    onClick={() => alert("Ver detalles próximamente")}
                    sx={{ textTransform: "none" }}
                  >
                    Ver Detalles
                  </Button>

                  {isAdmin() && (
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, piscina)}
                    >
                      <MoreVert />
                    </IconButton>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Menu de acciones */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleOpenEditModal(selectedPiscina)}>
          <Edit sx={{ mr: 1, fontSize: 20 }} /> Editar
        </MenuItem>
        <MenuItem
          onClick={() => handleDelete(selectedPiscina?._id)}
          sx={{ color: "error.main" }}
        >
          <Delete sx={{ mr: 1, fontSize: 20 }} /> Eliminar
        </MenuItem>
      </Menu>

      {/*Floating Action Button (FAB) */}
      {isAdmin() && (
        <Tooltip title="Nueva Piscina" placement="left">
          <Fab
            color="primary"
            aria-label="add"
            onClick={handleOpenCreateModal}
            sx={{
              position: "fixed",
              bottom: { xs: 16, md: 24 },
              right: { xs: 16, md: 24 },
              zIndex: 1000,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              "&:hover": {
                transform: "scale(1.1)",
                boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <Add />
          </Fab>
        </Tooltip>
      )}

      {/* Modal de Formulario */}
      <PiscinaFormModal
        open={modalOpen}
        onClose={handleCloseModal}
        piscina={editingPiscina}
        onSuccess={handleSuccess}
      />
    </Container>
  );
};

export default PiscinasList;
