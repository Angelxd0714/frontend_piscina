import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  Switch,
  IconButton,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Fab,
  Tooltip,
} from "@mui/material";
import { Search, Add, Edit, Delete } from "@mui/icons-material";
import { userApi } from "../../api/userApi";
import useAuthStore from "../../store/authStore";
import UserFormModal from "../../components/UserFormModal";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";

const UsersList = () => {
  const { isAdmin } = useAuthStore();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    rol: "",
    estado: "",
  });

  // Estados del modal
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userApi.getAll();
      setUsers(response.data || []);
      console.log(response.data);
    } catch (err) {
      setError("Error al cargar los usuarios");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreateModal = () => {
    setEditingUser(null);
    setModalOpen(true);
  };

  const handleOpenEditModal = (user) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingUser(null);
  };

  const handleSuccess = () => {
    fetchUsers();
  };

  const handleDelete = async () => {
    await userApi.delete(selectedUser._id);
    fetchUsers();
  };

  const handleToggleState = async (userId) => {
    try {
      await userApi.toggleState(userId);
      fetchUsers();
    } catch (err) {
      alert("Error al cambiar el estado del usuario");
    }
  };

  // Filtrar usuarios
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.correo?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRol = !filters.rol || user.rol === filters.rol;
    const matchesEstado = !filters.estado || user.estado === filters.estado;

    return matchesSearch && matchesRol && matchesEstado;
  });

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Función para obtener iniciales
  const getInitials = (nombre, apellido) => {
    const firstInitial = nombre?.charAt(0)?.toUpperCase() || "";
    const lastInitial = apellido?.charAt(0)?.toUpperCase() || "";
    return `${firstInitial}${lastInitial}`;
  };

  const getAvatarColor = (nombre) => {
    const colors = ["#E3F2FD", "#E0F7FA", "#F3E5F5", "#FFF3E0", "#E8F5E9"];
    const index = nombre?.charCodeAt(0) % colors.length || 0;
    return colors[index];
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

  return (
    <Container maxWidth="xl" sx={{ py: 4, position: "relative" }}>
      {/* Header */}
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Gestión de Usuarios
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Búsqueda y Filtros */}
      <Card sx={{ mb: 3, p: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <TextField
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ flex: 1, minWidth: 250 }}
          />

          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel>Filtrar por Rol</InputLabel>
            <Select
              value={filters.rol}
              onChange={(e) => setFilters({ ...filters, rol: e.target.value })}
              label="Filtrar por Rol"
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="ADMIN">Admin</MenuItem>
              <MenuItem value="USER">User</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Filtrar por Estado</InputLabel>
            <Select
              value={filters.estado}
              onChange={(e) =>
                setFilters({ ...filters, estado: e.target.value })
              }
              label="Filtrar por Estado"
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="activo">Activo</MenuItem>
              <MenuItem value="inactivo">Inactivo</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Card>

      {/* Tabla de Usuarios */}
      <Card sx={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.50" }}>
                <TableCell>
                  <Typography variant="body2" fontWeight={600}>
                    Nombre Completo
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={600}>
                    Email
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={600}>
                    Cédula
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={600}>
                    Rol
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={600}>
                    Estado
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2" fontWeight={600}>
                    Acciones
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      No se encontraron usuarios
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    sx={{
                      "&:hover": { bgcolor: "grey.50" },
                      transition: "background-color 0.2s",
                    }}
                  >
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: getAvatarColor(user.nombre),
                            color: "primary.main",
                            fontWeight: 600,
                            width: 40,
                            height: 40,
                          }}
                        >
                          {getInitials(user.nombre, user.apellido)}
                        </Avatar>
                        <Typography variant="body2" fontWeight={500}>
                          {user.nombre} {user.apellido}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {user.correo}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {user.identificacion}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.rol}
                        size="small"
                        color={user.rol === "ADMIN" ? "primary" : "info"}
                        sx={{ fontWeight: 600 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.estado === "ACTIVO" ? "ACTIVO" : "INACTIVO"}
                        size="small"
                        color={user.estado === "ACTIVO" ? "success" : "error"}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          gap: 0.5,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {isAdmin() && (
                          <>
                            <Tooltip title="Editar">
                              <IconButton
                                size="small"
                                onClick={() => handleOpenEditModal(user)}
                              >
                                <Edit fontSize="small" />
                              </IconButton>
                            </Tooltip>

                            {/* ✅ Switch Activar/Desactivar */}
                            <Tooltip
                              title={
                                user.estado === "INACTIVO"
                                  ? "ACTIVAR"
                                  : "INACTIVO"
                              }
                            >
                              <Switch
                                checked={user.estado === "ACTIVO"}
                                onChange={() => handleToggleState(user._id)}
                                size="small"
                              />
                            </Tooltip>

                            {/* ✅ Botón Eliminar */}
                            <Tooltip title="Eliminar">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => {
                                  setSelectedUser(user);
                                  setDeleteModalOpen(true);
                                }}
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Paginación */}
        {totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
            />
          </Box>
        )}
      </Card>

      {/* FAB para crear usuario */}
      {isAdmin() && (
        <Tooltip title="Nuevo Usuario" placement="left">
          <Fab
            color="primary"
            onClick={handleOpenCreateModal}
            sx={{
              position: "fixed",
              bottom: 24,
              right: 24,
              zIndex: 1000,
            }}
          >
            <Add />
          </Fab>
        </Tooltip>
      )}

      {/* Modal de Formulario */}
      <UserFormModal
        open={modalOpen}
        onClose={handleCloseModal}
        user={editingUser}
        onSuccess={handleSuccess}
      />

      {/* ✅ Modal de Eliminar */}
      <DeleteConfirmModal
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedUser(null);
        }}
        onConfirm={handleDelete}
        title="Eliminar Usuario"
        message="¿Estás seguro de que deseas eliminar este usuario? Esta acción eliminará permanentemente toda su información."
        itemName={
          selectedUser ? `${selectedUser.nombre} ${selectedUser.apellido}` : ""
        }
        itemType="Usuario"
        consequences={[
          "Se eliminarán todos los datos del usuario",
          "Se perderá el historial de actividad",
          "No podrá acceder más al sistema",
        ]}
        confirmText="Sí, eliminar usuario"
        cancelText="No, cancelar"
      />
    </Container>
  );
};

export default UsersList;
