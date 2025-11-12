import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Warning,
  Delete,
  ErrorOutline,
  CheckCircleOutline,
} from "@mui/icons-material";
import { useState } from "react";

const DeleteConfirmModal = ({
  open,
  onClose,
  onConfirm,
  title = "Confirmar Eliminación",
  message = "¿Estás seguro de que deseas eliminar este elemento?",
  itemName,
  itemType = "elemento",
  consequences = [],
  confirmText = "Eliminar",
  cancelText = "Cancelar",
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConfirm = async () => {
    setLoading(true);
    setError("");
    try {
      await onConfirm();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Error al eliminar");
      console.error("Error al eliminar:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setError("");
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle sx={{ pb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              bgcolor: "error.light",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Warning sx={{ color: "error.main", fontSize: 28 }} />
          </Box>
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>
        </Box>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ pt: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Alert
          severity="warning"
          icon={<ErrorOutline />}
          sx={{ mb: 2, bgcolor: "warning.light", color: "warning.dark" }}
        >
          <Typography variant="body2" fontWeight={600}>
            Esta acción no se puede deshacer
          </Typography>
        </Alert>

        <Typography variant="body1" color="text.primary" sx={{ mb: 2 }}>
          {message}
        </Typography>

        {/* Elemento a eliminar */}
        {itemName && (
          <Box
            sx={{
              mb: 2,
              p: 2,
              bgcolor: "grey.50",
              borderRadius: 2,
              border: "2px solid",
              borderColor: "error.main",
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              gutterBottom
            >
              {itemType} a eliminar:
            </Typography>
            <Typography variant="body1" fontWeight={600} color="error.main">
              {itemName}
            </Typography>
          </Box>
        )}

        {/* Consecuencias */}
        {consequences && consequences.length > 0 && (
          <>
            <Typography
              variant="body2"
              fontWeight={600}
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              Consecuencias:
            </Typography>
            <List dense sx={{ bgcolor: "grey.50", borderRadius: 2, p: 1 }}>
              {consequences.map((consequence, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleOutline
                      sx={{ fontSize: 20, color: "warning.main" }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={consequence}
                    primaryTypographyProps={{
                      variant: "body2",
                      color: "text.secondary",
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}
      </DialogContent>

      <Divider />

      <DialogActions sx={{ p: 3, gap: 1 }}>
        <Button
          onClick={handleClose}
          disabled={loading}
          variant="outlined"
          sx={{
            textTransform: "none",
            borderRadius: 2,
            px: 3,
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color="error"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : <Delete />}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            px: 3,
            boxShadow: "none",
            "&:hover": {
              boxShadow: "0 4px 12px rgba(211, 47, 47, 0.3)",
            },
          }}
        >
          {loading ? "Eliminando..." : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmModal;
