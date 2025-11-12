import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardMedia,
  Grid,
  Chip,
  CircularProgress,
  Alert,
  Divider,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Tab,
  Tabs,
} from "@mui/material";
import {
  ArrowBack,
  Edit,
  Delete,
  LocationOn,
  Straighten,
  Category,
  Build,
  InsertDriveFile,
  Image as ImageIcon,
} from "@mui/icons-material";
import { piscinaApi } from "../../api/piscinaApi";
import useAuthStore from "../../store/authStore";
import PiscinaFormModal from "../piscinas/PiscinaCreate";
import DeleteConfirmModal from "../piscinas/PiscinaModal";
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const PiscinaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuthStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPiscina, setEditingPiscina] = useState(null);
  const [piscina, setPiscina] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  useEffect(() => {
    fetchPiscinaDetail();
  }, [id]);
  const handleSuccess = () => {
    fetchPiscinaDetail();
  };

  const fetchPiscinaDetail = async () => {
    try {
      setLoading(true);
      const response = await piscinaApi.getById(id);
      setPiscina(response.data);
    } catch (err) {
      setError("Error al cargar los detalles de la piscina");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    await piscinaApi.delete(id);
    fetchPiscinaDetail();
    setDeleteModalOpen(false);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPiscina, setSelectedPiscina] = useState(null);
  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingPiscina(null);
  };
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPiscina(null);
  };
  const handleOpenEditModal = (piscina) => {
    setEditingPiscina(piscina);
    setModalOpen(true);
    handleMenuClose();
  };
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

  if (error || !piscina) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error || "Piscina no encontrada"}</Alert>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/piscinas")}
          sx={{ mt: 2, textTransform: "none" }}
        >
          Volver a la lista
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 2 }}>
        <IconButton onClick={() => navigate("/piscinas")}>
          <ArrowBack />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" fontWeight={700}>
            {piscina.nombre}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <LocationOn sx={{ fontSize: 16, verticalAlign: "middle" }} />{" "}
            {piscina.ciudad}, {piscina.municipio}
          </Typography>
        </Box>
        {isAdmin() && (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<Edit />}
              onClick={() => handleOpenEditModal(piscina)}
              sx={{ textTransform: "none" }}
            >
              Editar
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<Delete />}
              onClick={() => setDeleteModalOpen(true)}
              sx={{ textTransform: "none" }}
            >
              Eliminar
            </Button>
          </Box>
        )}
      </Box>

      {/* Imagen Principal */}
      <Card sx={{ mb: 3, borderRadius: 3, overflow: "hidden" }}>
        <CardMedia
          component="img"
          height="400"
          image={
            piscina.foto ||
            "https://via.placeholder.com/1200x400?text=Sin+Imagen"
          }
          alt={piscina.nombre}
          sx={{ objectFit: "cover" }}
        />
      </Card>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Información General" />
          <Tab label="Profundidades" />
          <Tab label="Bombas" />
        </Tabs>
      </Paper>

      {/* Tab 1: Información General */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {/* Características Básicas */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, height: "100%" }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Características Básicas
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <List>
                <ListItem>
                  <ListItemText
                    primary="Categoría"
                    secondary={
                      <Chip
                        label={piscina.categoria}
                        color="primary"
                        size="small"
                        sx={{ mt: 0.5 }}
                      />
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Forma"
                    secondary={
                      <Chip
                        label={piscina.forma}
                        color="secondary"
                        size="small"
                        sx={{ mt: 0.5 }}
                      />
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Uso"
                    secondary={
                      <Chip
                        label={piscina.uso}
                        color="info"
                        size="small"
                        sx={{ mt: 0.5 }}
                      />
                    }
                  />
                </ListItem>
              </List>
            </Card>
          </Grid>

          {/* Dimensiones */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, height: "100%" }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Dimensiones
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <List>
                <ListItem>
                  <Straighten sx={{ mr: 2, color: "primary.main" }} />
                  <ListItemText
                    primary="Altura"
                    secondary={`${piscina.altura} metros`}
                  />
                </ListItem>
                <ListItem>
                  <Straighten
                    sx={{
                      mr: 2,
                      color: "primary.main",
                      transform: "rotate(90deg)",
                    }}
                  />
                  <ListItemText
                    primary="Ancho"
                    secondary={`${piscina.ancho} metros`}
                  />
                </ListItem>
                {piscina.temperaturaExterna && (
                  <ListItem>
                    <Category sx={{ mr: 2, color: "primary.main" }} />
                    <ListItemText
                      primary="Temperatura Externa"
                      secondary={`${piscina.temperaturaExterna}°C`}
                    />
                  </ListItem>
                )}
              </List>
            </Card>
          </Grid>

          {/* Ubicación */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Ubicación
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <List>
                <ListItem>
                  <ListItemText
                    primary="Dirección"
                    secondary={piscina.direccion}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Ciudad" secondary={piscina.ciudad} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Municipio"
                    secondary={piscina.municipio}
                  />
                </ListItem>
              </List>
            </Card>
          </Grid>

          {/* Filtros */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Sistema de Filtración
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Typography variant="body2" color="text.secondary">
                {piscina.filtros}
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Tab 2: Profundidades */}
      <TabPanel value={tabValue} index={1}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Profundidades ({piscina.totalProfundidades})
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            {piscina.profundidades?.map((prof, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 2,
                    textAlign: "center",
                    bgcolor: "primary.light",
                    color: "white",
                  }}
                >
                  <Typography variant="caption" display="block">
                    Profundidad {index + 1}
                  </Typography>
                  <Typography variant="h4" fontWeight={700}>
                    {prof}m
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Card>
      </TabPanel>

      {/* Tab 3: Bombas */}
      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          {piscina.bombas?.map((bomba, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                    <Build />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight={600}>
                      Bomba {index + 1}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {bomba.marca} - {bomba.referencia}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ mb: 2 }} />

                <List dense>
                  <ListItem>
                    <ListItemText
                      primary="Potencia"
                      secondary={`${bomba.potencia} HP`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Material"
                      secondary={bomba.material}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="¿Se Repite?"
                      secondary={
                        bomba.seRepite === "si"
                          ? `Sí (${bomba.totalBombas} unidades)`
                          : "No"
                      }
                    />
                  </ListItem>
                </List>

                {/* Archivos de la bomba */}
                <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {bomba.fotoBomba && (
                    <Chip
                      icon={<ImageIcon />}
                      label="Ver Foto"
                      clickable
                      onClick={() => window.open(bomba.fotoBomba, "_blank")}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  )}
                  {bomba.hojaSeguridad && (
                    <Chip
                      icon={<InsertDriveFile />}
                      label="Hoja Seguridad"
                      clickable
                      onClick={() => window.open(bomba.hojaSeguridad, "_blank")}
                      size="small"
                      color="secondary"
                      variant="outlined"
                    />
                  )}
                  {bomba.fichaTecnica && (
                    <Chip
                      icon={<InsertDriveFile />}
                      label="Ficha Técnica"
                      clickable
                      onClick={() => window.open(bomba.fichaTecnica, "_blank")}
                      size="small"
                      color="info"
                      variant="outlined"
                    />
                  )}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {(!piscina.bombas || piscina.bombas.length === 0) && (
          <Alert severity="info">
            No hay bombas registradas para esta piscina
          </Alert>
        )}
      </TabPanel>
      <PiscinaFormModal
        open={modalOpen}
        onClose={handleCloseModal}
        piscina={editingPiscina}
        onSuccess={handleSuccess}
      />
      <DeleteConfirmModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Eliminar Piscina"
        message="¿Estás seguro de que deseas eliminar esta piscina? Se perderán todos los datos asociados."
        itemName={piscina.nombre}
      />
    </Container>
  );
};

export default PiscinaDetail;
