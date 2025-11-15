import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  IconButton,
  Chip,
  Card,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Close, Add, Delete, CloudUpload, Pool } from "@mui/icons-material";
import { piscinaApi } from "../../api/piscinaApi";
import LocationSelector from "../../components/LocationSelector";

const PiscinaFormModal = ({ open, onClose, piscina = null, onSuccess }) => {
  const isEdit = Boolean(piscina);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [profundidadError, setProfundidadError] = useState("");
  const [bombasError, setBombasError] = useState("");

  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    altura: "",
    ancho: "",
    departamento: "", // ✅ Solo para UI (selector)
    ciudad: "", // ✅ Se envía al backend
    municipio: "", // ✅ Se envía al backend
    temperaturaExterna: "",
    categoria: "Niños",
    totalProfundidades: 1,
    profundidades: [""],
    forma: "Rectangular",
    uso: "Privada",
    filtros: "",
    foto: null,
    bombas: [
      {
        marca: "",
        referencia: "",
        potencia: "",
        material: "Centrifuga",
        seRepite: "no",
        totalBombas: "",
        fotoBomba: null,
        hojaSeguridad: null,
        fichaTecnica: null,
      },
    ],
  });

  // ✅ Handlers para LocationSelector
  const handleDeptChange = (dept) => {
    setFormData({ ...formData, departamento: dept, ciudad: "", municipio: "" });
  };

  const handleCityChange = (city) => {
    // city aquí es el municipio seleccionado
    setFormData({ ...formData, ciudad: city, municipio: city });
  };

  const calcularTotalBombas = (bombas) => {
    let total = 0;
    total = bombas.length;
    console.log("Total Bombas:", total);
    return total;
  };

  const validarCantidadBombas = (bombas, totalProfundidades) => {
    const totalBombas = calcularTotalBombas(bombas);

    if (totalBombas !== totalProfundidades) {
      setBombasError(
        `La cantidad total de bombas (${totalBombas}) debe ser igual al total de profundidades (${totalProfundidades})`,
      );
      return false;
    }

    setBombasError("");
    return true;
  };

  const validarProfundidades = (profundidades) => {
    const valores = profundidades
      .map((p) => parseFloat(p))
      .filter((p) => !isNaN(p) && p > 0);

    if (valores.length < 2) {
      setProfundidadError("");
      return true;
    }

    for (let i = 0; i < valores.length - 1; i++) {
      if (valores[i] >= valores[i + 1]) {
        setProfundidadError(
          `Las profundidades deben estar en orden ascendente. ${valores[i]}m debe ser menor que ${valores[i + 1]}m`,
        );
        return false;
      }
    }

    setProfundidadError("");
    return true;
  };

  useEffect(() => {
    if (piscina) {
      setFormData({
        nombre: piscina.nombre || "",
        direccion: piscina.direccion || "",
        altura: piscina.altura || "",
        ancho: piscina.ancho || "",
        departamento: "",
        ciudad: piscina.ciudad || "",
        municipio: piscina.municipio || "",
        temperaturaExterna: piscina.temperaturaExterna || "",
        categoria: piscina.categoria || "Niños",
        totalProfundidades: piscina.profundidades?.length || 1,
        profundidades: piscina.profundidades?.map((p) => String(p)) || [""],
        forma: piscina.forma || "Rectangular",
        uso: piscina.uso || "Privada",
        filtros: piscina.filtros || "",
        foto: null,
        bombas: piscina.bombas || [
          {
            marca: "",
            referencia: "",
            potencia: "",
            material: "Centrifuga",
            seRepite: "no",
            totalBombas: "",
            fotoBomba: null,
            hojaSeguridad: null,
            fichaTecnica: null,
          },
        ],
      });
    }
  }, [piscina]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "totalProfundidades") {
      const total = parseInt(value) || 1;
      const newProfundidades = Array(total).fill("");
      setFormData({
        ...formData,
        totalProfundidades: total,
        profundidades: newProfundidades,
      });
      setProfundidadError("");

      validarCantidadBombas(formData.bombas, total);
    }
  };

  const handleProfundidadChange = (index, value) => {
    const newProfundidades = [...formData.profundidades];
    newProfundidades[index] = value;
    setFormData({ ...formData, profundidades: newProfundidades });

    validarProfundidades(newProfundidades);
  };

  const handleBombaChange = (index, field, value) => {
    const newBombas = [...formData.bombas];
    newBombas[index][field] = value;
    setFormData({ ...formData, bombas: newBombas });

    if (field === "seRepite" || field === "totalBombas") {
      validarCantidadBombas(newBombas, formData.totalProfundidades);
    }
  };

  const handleFileChange = (e, field, bombaIndex = null) => {
    const file = e.target.files[0];
    if (bombaIndex !== null) {
      const newBombas = [...formData.bombas];
      newBombas[bombaIndex][field] = file;
      setFormData({ ...formData, bombas: newBombas });
    } else {
      setFormData({ ...formData, [field]: file });
    }
  };

  const addBomba = () => {
    const newBombas = [
      ...formData.bombas,
      {
        marca: "",
        referencia: "",
        potencia: "",
        material: "Centrifuga",
        seRepite: "no",
        totalBombas: "",
        fotoBomba: null,
        hojaSeguridad: null,
        fichaTecnica: null,
      },
    ];
    setFormData({
      ...formData,
      bombas: newBombas,
    });

    validarCantidadBombas(newBombas, formData.totalProfundidades);
  };

  const removeBomba = (index) => {
    const newBombas = formData.bombas.filter((_, i) => i !== index);
    setFormData({ ...formData, bombas: newBombas });

    validarCantidadBombas(newBombas, formData.totalProfundidades);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validarProfundidades(formData.profundidades)) {
      setError(
        "Por favor, corrige el orden de las profundidades antes de continuar.",
      );
      return;
    }

    if (!validarCantidadBombas(formData.bombas, formData.totalProfundidades)) {
      setError(
        "La cantidad total de bombas debe ser igual al total de profundidades.",
      );
      return;
    }

    for (let i = 0; i < formData.bombas.length; i++) {
      const bomba = formData.bombas[i];
      if (!bomba.fotoBomba || !bomba.hojaSeguridad || !bomba.fichaTecnica) {
        setError(
          `Bomba ${i + 1}: Debes cargar foto, hoja de seguridad y ficha técnica.`,
        );
        return;
      }
    }

    setLoading(true);

    try {
      const data = new FormData();

      data.append("nombre", formData.nombre);
      data.append("direccion", formData.direccion);
      data.append("altura", formData.altura);
      data.append("ancho", formData.ancho);

      // ✅ Envía solo ciudad y municipio
      data.append("ciudad", formData.ciudad);
      data.append("municipio", formData.municipio);

      data.append("categoria", formData.categoria);
      data.append("totalProfundidades", formData.totalProfundidades);
      data.append("forma", formData.forma);
      data.append("uso", formData.uso);
      data.append("filtros", formData.filtros);

      if (formData.temperaturaExterna) {
        data.append("temperaturaExterna", formData.temperaturaExterna);
      }

      const profundidadesOrdenadas = formData.profundidades
        .map((p) => parseFloat(p))
        .filter((p) => !isNaN(p))
        .sort((a, b) => a - b);

      data.append("profundidades", JSON.stringify(profundidadesOrdenadas));

      if (formData.foto) {
        data.append("foto", formData.foto);
      }

      const bombasSinArchivos = formData.bombas.map((bomba) => ({
        marca: bomba.marca,
        referencia: bomba.referencia,
        potencia: bomba.potencia,
        material: bomba.material,
        seRepite: bomba.seRepite,
        totalBombas: bomba.totalBombas || undefined,
      }));
      data.append("bombas", JSON.stringify(bombasSinArchivos));

      formData.bombas.forEach((bomba, index) => {
        if (bomba.fotoBomba) {
          data.append(`fotoBomba_${index}`, bomba.fotoBomba);
        }
        if (bomba.hojaSeguridad) {
          data.append(`hojaSeguridad_${index}`, bomba.hojaSeguridad);
        }
        if (bomba.fichaTecnica) {
          data.append(`fichaTecnica_${index}`, bomba.fichaTecnica);
        }
      });

      if (isEdit) {
        await piscinaApi.update(piscina._id, data);
      } else {
        await piscinaApi.create(data);
      }

      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Error al guardar la piscina");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          maxHeight: "90vh",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Pool color="primary" />
          <Typography variant="h6" fontWeight={600}>
            {isEdit ? "Editar Piscina" : "Nueva Piscina"}
          </Typography>
        </Box>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ p: 3 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Información Básica */}
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Información Básica
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Dirección"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* ✅ LocationSelector - devuelve ciudad y municipio */}
            <Grid item xs={12} sm={6}>
              <LocationSelector
                selectedDept={formData.departamento}
                onDeptChange={handleDeptChange}
                selectedCity={formData.ciudad}
                onCityChange={handleCityChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Temperatura Externa (°C)"
                name="temperaturaExterna"
                type="number"
                value={formData.temperaturaExterna}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Características */}
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Características
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Altura (m)"
                name="altura"
                type="number"
                value={formData.altura}
                onChange={handleChange}
                required
                inputProps={{ step: "0.1", min: "0.1" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ancho (m)"
                name="ancho"
                type="number"
                value={formData.ancho}
                onChange={handleChange}
                required
                inputProps={{ step: "0.1", min: "0.1" }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth required>
                <InputLabel>Categoría</InputLabel>
                <Select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  label="Categoría"
                >
                  <MenuItem value="Niños">Niños</MenuItem>
                  <MenuItem value="Adultos">Adultos</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth required>
                <InputLabel>Forma</InputLabel>
                <Select
                  name="forma"
                  value={formData.forma}
                  onChange={handleChange}
                  label="Forma"
                >
                  <MenuItem value="Rectangular">Rectangular</MenuItem>
                  <MenuItem value="Circular">Circular</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth required>
                <InputLabel>Uso</InputLabel>
                <Select
                  name="uso"
                  value={formData.uso}
                  onChange={handleChange}
                  label="Uso"
                >
                  <MenuItem value="Privada">Privada</MenuItem>
                  <MenuItem value="Publica">Pública</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Profundidades */}
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Profundidades
          </Typography>

          {profundidadError && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              {profundidadError}
            </Alert>
          )}

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Total de Profundidades"
                name="totalProfundidades"
                type="number"
                value={formData.totalProfundidades}
                onChange={handleChange}
                required
                inputProps={{ min: "1" }}
              />
            </Grid>
            {formData.profundidades.map((prof, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <TextField
                  fullWidth
                  label={`Profundidad ${index + 1} (m)`}
                  type="number"
                  value={prof}
                  onChange={(e) =>
                    handleProfundidadChange(index, e.target.value)
                  }
                  required
                  inputProps={{ step: "0.1", min: "0.1" }}
                  error={profundidadError !== ""}
                  disabled={profundidadError !== "" || bombasError !== ""}
                />
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Filtros y Foto */}
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Filtros y Foto
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descripción de Filtros"
                name="filtros"
                value={formData.filtros}
                onChange={handleChange}
                required
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUpload />}
                fullWidth
                sx={{ textTransform: "none", py: 1.5 }}
              >
                {formData.foto
                  ? formData.foto.name
                  : "Subir Foto Principal (PNG/JPEG)"}
                <input
                  type="file"
                  hidden
                  accept="image/png,image/jpeg"
                  onChange={(e) => handleFileChange(e, "foto")}
                />
              </Button>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Bombas */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="subtitle1" fontWeight={600}>
              Bombas ({calcularTotalBombas(formData.bombas)} de{" "}
              {formData.totalProfundidades})
            </Typography>
            <Button
              variant="outlined"
              size="small"
              startIcon={<Add />}
              onClick={addBomba}
              sx={{ textTransform: "none" }}
            >
              Agregar Bomba
            </Button>
          </Box>

          {bombasError && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              {bombasError}
            </Alert>
          )}

          {formData.bombas.map((bomba, index) => (
            <Card key={index} sx={{ mb: 2, p: 2, bgcolor: "grey.50" }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Chip
                  label={`Bomba ${index + 1}`}
                  color="primary"
                  size="small"
                />
                {formData.bombas.length > 1 && (
                  <IconButton
                    size="small"
                    onClick={() => removeBomba(index)}
                    color="error"
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                )}
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Marca"
                    value={bomba.marca}
                    onChange={(e) =>
                      handleBombaChange(index, "marca", e.target.value)
                    }
                    required
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Referencia"
                    value={bomba.referencia}
                    onChange={(e) =>
                      handleBombaChange(index, "referencia", e.target.value)
                    }
                    required
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Potencia (HP)"
                    type="number"
                    value={bomba.potencia}
                    onChange={(e) =>
                      handleBombaChange(index, "potencia", e.target.value)
                    }
                    required
                    size="small"
                    inputProps={{ step: "0.1" }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth size="small" required>
                    <InputLabel>Material</InputLabel>
                    <Select
                      value={bomba.material}
                      onChange={(e) =>
                        handleBombaChange(index, "material", e.target.value)
                      }
                      label="Material"
                    >
                      <MenuItem value="Centrifuga">Centrífuga</MenuItem>
                      <MenuItem value="Sumergible">Sumergible</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth size="small" required>
                    <InputLabel>¿Se Repite?</InputLabel>
                    <Select
                      value={bomba.seRepite}
                      onChange={(e) =>
                        handleBombaChange(index, "seRepite", e.target.value)
                      }
                      label="¿Se Repite?"
                    >
                      <MenuItem value="no">No</MenuItem>
                      <MenuItem value="si">Sí</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {bomba.seRepite === "si" && (
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Total Bombas"
                      type="number"
                      value={bomba.totalBombas}
                      onChange={(e) =>
                        handleBombaChange(index, "totalBombas", e.target.value)
                      }
                      required
                      size="small"
                      inputProps={{ min: "1" }}
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Button
                      variant="outlined"
                      component="label"
                      size="small"
                      startIcon={<CloudUpload />}
                      sx={{ textTransform: "none" }}
                    >
                      {bomba.fotoBomba ? "✓ Foto" : "Foto"}
                      <input
                        type="file"
                        hidden
                        accept="image/png,image/jpeg"
                        onChange={(e) =>
                          handleFileChange(e, "fotoBomba", index)
                        }
                      />
                    </Button>
                    <Button
                      variant="outlined"
                      component="label"
                      size="small"
                      startIcon={<CloudUpload />}
                      sx={{ textTransform: "none" }}
                    >
                      {bomba.hojaSeguridad ? "✓ Hoja Seg." : "Hoja Seg."}
                      <input
                        type="file"
                        hidden
                        accept="application/pdf"
                        onChange={(e) =>
                          handleFileChange(e, "hojaSeguridad", index)
                        }
                      />
                    </Button>
                    <Button
                      variant="outlined"
                      component="label"
                      size="small"
                      startIcon={<CloudUpload />}
                      sx={{ textTransform: "none" }}
                    >
                      {bomba.fichaTecnica ? "✓ Ficha Téc." : "Ficha Téc."}
                      <input
                        type="file"
                        hidden
                        accept="application/pdf"
                        onChange={(e) =>
                          handleFileChange(e, "fichaTecnica", index)
                        }
                      />
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          ))}
        </DialogContent>

        <DialogActions
          sx={{ p: 3, borderTop: "1px solid", borderColor: "divider" }}
        >
          <Button onClick={onClose} sx={{ textTransform: "none" }}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading || profundidadError !== "" || bombasError !== ""}
            startIcon={loading && <CircularProgress size={20} />}
            sx={{ textTransform: "none", px: 3 }}
          >
            {loading ? "Guardando..." : isEdit ? "Actualizar" : "Crear Piscina"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PiscinaFormModal;
