import { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material";

// Objeto completo de departamentos y municipios (puedes expandirlo)
const departamentosMunicipios = [
  {
    departamento: "Amazonas",
    municipios: ["Leticia", "El Encanto", "La Chorrera", "Puerto Nariño"],
  },
  {
    departamento: "Antioquia",
    municipios: [
      "Medellín",
      "Abejorral",
      "Bello",
      "Envigado",
      "Guarne",
      "Itagüí",
      "Sabaneta",
    ],
  },
  {
    departamento: "Cundinamarca",
    municipios: [
      "Bogotá D.C.",
      "Chía",
      "Facatativá",
      "Fusagasugá",
      "Zipaquirá",
    ],
  },
  {
    departamento: "Valle del Cauca",
    municipios: ["Cali", "Buenaventura", "Buga", "Cartago", "Yumbo"],
  },
  {
    departamento: "Santander",
    municipios: [
      "Bucaramanga",
      "Barrancabermeja",
      "Floridablanca",
      "Girón",
      "Socorro",
    ],
  },
  // Puedes agregar más departamentos y municipios aquí...
];

const LocationSelector = ({
  selectedDept,
  onDeptChange,
  selectedCity,
  onCityChange,
}) => {
  // No necesita loading ni fetch, ya que el objeto está local
  const [departamento, setDepartamento] = useState(selectedDept || "");
  const [municipio, setMunicipio] = useState(selectedCity || "");

  // Busca municipios asociados al departamento seleccionado
  const municipios = departamento
    ? departamentosMunicipios.find((d) => d.departamento === departamento)
        ?.municipios || []
    : [];

  // Cuando cambia en el padre, sincroniza
  // ¡O usa solo el estado arriba e info se pasa en handle!

  return (
    <Grid container spacing={2}>
      {/* Departamento */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth required>
          <InputLabel>Departamento</InputLabel>
          <Select
            value={departamento}
            onChange={(e) => {
              setDepartamento(e.target.value);
              setMunicipio("");
              onDeptChange(e.target.value);
              onCityChange(""); // Limpiar municipio al cambiar dept
            }}
            label="Departamento"
          >
            <MenuItem value="">
              <em>Selecciona un departamento</em>
            </MenuItem>
            {departamentosMunicipios.map((dep) => (
              <MenuItem key={dep.departamento} value={dep.departamento}>
                {dep.departamento}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Municipio */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth required disabled={!departamento}>
          <InputLabel>Municipio</InputLabel>
          <Select
            value={municipio}
            onChange={(e) => {
              setMunicipio(e.target.value);
              onCityChange(e.target.value);
            }}
            label="Municipio"
          >
            <MenuItem value="">
              <em>Selecciona un municipio</em>
            </MenuItem>
            {municipios.map((municipio) => (
              <MenuItem key={municipio} value={municipio}>
                {municipio}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default LocationSelector;
