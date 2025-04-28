import { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  Button,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";

const herramientas = {
  presentaciones: ["Google Slides", "PowerPoint", "Prezi", "Canva", "Genially"],
  evaluaciones: ["Kahoot", "Mentimeter", "Quizizz", "Socrative", "Plickers"],
  hojas: ["Excel", "Google Sheets", "Tableau"],
  interactivas: ["Padlet", "Nearpod", "Thinglink", "Pear Deck", "Wakelet"],
  colaboracion: ["Jamboard", "Miro", "Trello", "Notion"],
  multimedia: ["Powtoon", "Animoto", "Flipgrid"],
  escritura: ["Book Creator", "Storybird", "ReadWorks"],
  ciencias: ["Desmos", "GeoGebra", "Code.org", "Tynker"],
};

const colegios = [
  "Santiago Urrutia Benavente",
  "Liceo Bicentenario Pablo Neruda",
  "Luis Armando Gómez Muñoz",
  "Nider Orrego Quevedo",
  "Liceo Federico Heise Marti",
  "José Matta Callejón",
  "Arrau Méndez",
  "C.E.I.A. Juanita Zúñiga Fuentes",
  "Remigio Agurto Fuentes",
  "Ignacio Urrutia de la Sotta",
  "El Libertador",
  "Francisco Pérez Lavín",
  "Francisco Maureira",
  "Liceo Bicentenario Alberto Molina Castillo",
  "Armando Guzmán Morales",
  "La Fortuna",
  "El Ciénago",
  "Villa Reina",
  "Carlos Zúñiga Fuentes",
].sort();

const Form = () => {
  const [form, setForm] = useState({
    nombre: "",
    nivel: [] as string[],
    asignaturas: "",
    colegio: "",
    edad: "",
    frecuenciaUso: "",
    herramientasUsadas: [] as string[],
    herramientaAprender: "",
    areaCapacitacion: "",
    preferenciaCapacitacion: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | boolean>(false);

  const handleChange = (field: string) => (e: { target: { value: any } }) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleNivelCheckbox =
    (value: string) => (e: { target: { checked: boolean } }) => {
      setForm((prev) => ({
        ...prev,
        nivel: e.target.checked
          ? [...prev.nivel, value]
          : prev.nivel.filter((item) => item !== value),
      }));
    };

  const handleCheckbox =
    (tool: string) => (e: { target: { checked: boolean } }) => {
      setForm((prev) => ({
        ...prev,
        herramientasUsadas: e.target.checked
          ? [...prev.herramientasUsadas, tool]
          : prev.herramientasUsadas.filter((item) => item !== tool),
      }));
    };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (
      !form.asignaturas.trim() ||
      !form.frecuenciaUso.trim() ||
      form.nivel.length === 0 ||
      form.herramientasUsadas.length === 0
    ) {
      setError("Debes completar algunos campos obligatorios.");
      return;
    }

    setIsLoading(true);
    setError(false);

    const dataToSend = {
      ...form,
      edad: form.edad ? parseInt(form.edad) : 0,
    };

    try {
      const res = await fetch("/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (res.ok) {
        setSuccess(true);
        setIsLoading(false);
      } else {
        throw new Error("Error al guardar en el servidor");
      }
    } catch (err) {
      console.error("Error al enviar:", err);
      setError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      const timeout = setTimeout(() => {
        window.location.href = "https://www.daemparral.cl";
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [success]);

  return (
    <Box>
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          ¡Formulario enviado con éxito! Serás redirigido en unos segundos...
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {typeof error === "string"
            ? error
            : "Ocurrió un error al enviar el formulario. Inténtalo nuevamente."}
        </Alert>
      )}

      {!success && (
        <form onSubmit={handleSubmit}>
          <Grid
            container
            direction="column"
            spacing={2}
            sx={{ color: "#000", padding: "20px" }}
          >
            <Grid item>
              <Typography variant="h6">1. Datos Generales</Typography>
            </Grid>

            <Grid item>
              <TextField
                fullWidth
                label="Nombre (opcional)"
                value={form.nombre}
                onChange={handleChange("nombre")}
                inputProps={{
                  maxLength: 50,
                  
                }}
              />
            </Grid>

            <Grid item>
              <Typography variant="subtitle1">
                Nivel educativo en el que imparte clases
              </Typography>
              <FormGroup row>
                {["Educación Parvularia", "Educación Básica", "Educación Media"].map((nivel) => (
                  <FormControlLabel
                    key={nivel}
                    control={
                      <Checkbox
                        checked={form.nivel.includes(nivel)}
                        onChange={handleNivelCheckbox(nivel)}
                      />
                    }//test 
                    label={nivel}
                  />
                ))}
              </FormGroup>
            </Grid>

            <Grid item>
              <TextField
                fullWidth
                label="Asignatura(s) que imparte"
                value={form.asignaturas}
                onChange={handleChange("asignaturas")}
              />
            </Grid>

            {/* Colegio select */}
            <Grid item>
              <Typography variant="subtitle1">Colegio</Typography>
              <FormControl fullWidth>
                <Select
                  labelId="colegio-label"
                  id="colegio-select"
                  value={form.colegio}
                  onChange={handleChange("colegio")}
                  displayEmpty
                >
                  <MenuItem value="">
                    <em>Seleccione un colegio</em>
                  </MenuItem>
                  {colegios.map((colegio, index) => (
                    <MenuItem key={index} value={colegio}>
                      {colegio}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item>
              <TextField
                fullWidth
                label="Edad (opcional)"
                type="number"
                value={form.edad}
                onChange={handleChange("edad")}
              />
            </Grid>

            <Grid item>
              <Typography variant="h6">
                2. Uso de Herramientas Digitales
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                En esta sección se busca conocer con qué frecuencia usas
                herramientas tecnológicas, cuáles conoces y aplicas en tu
                práctica docente, y cuáles te gustaría aprender.
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="subtitle1">Frecuencia de uso</Typography>
              <FormControl fullWidth>
                <Select
                  value={form.frecuenciaUso}
                  onChange={handleChange("frecuenciaUso")}
                >
                  <MenuItem value="A diario">A diario</MenuItem>
                  <MenuItem value="Algunas veces a la semana">
                    Algunas veces a la semana
                  </MenuItem>
                  <MenuItem value="Algunas veces al mes">
                    Algunas veces al mes
                  </MenuItem>
                  <MenuItem value="Casi nunca">Casi nunca</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item>
              <Typography variant="subtitle1">
                ¿Has utilizado alguna de las siguientes herramientas?
              </Typography>
              <FormGroup>
                {Object.entries(herramientas).map(([categoria, tools]) => (
                  <div key={categoria}>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {categoria.charAt(0).toUpperCase() + categoria.slice(1)}:
                    </Typography>
                    {tools.map((tool) => (
                      <FormControlLabel
                        key={tool}
                        control={
                          <Checkbox
                            checked={form.herramientasUsadas.includes(tool)}
                            onChange={handleCheckbox(tool)}
                          />
                        }
                        label={tool}
                      />
                    ))}
                  </div>
                ))}
              </FormGroup>
            </Grid>

            <Grid item>
              <Typography variant="body1">
                ¿Cuál te gustaría aprender a usar mejor?
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={form.herramientaAprender}
                  onChange={handleChange("herramientaAprender")}
                >
                  {Object.values(herramientas)
                    .flat()
                    .map((tool) => (
                      <MenuItem key={tool} value={tool}>
                        {tool}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item>
              <Typography variant="h6">
                3. Necesidades y Preferencias
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="body1">
                ¿En qué área le gustaría recibir capacitación?
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={form.areaCapacitacion}
                  onChange={handleChange("areaCapacitacion")}
                >
                  <MenuItem value="Creación de presentaciones y contenido visual">
                    Creación de presentaciones y contenido visual
                  </MenuItem>
                  <MenuItem value="Evaluaciones y gamificación">
                    Evaluaciones y gamificación
                  </MenuItem>
                  <MenuItem value="Organización y colaboración digital">
                    Organización y colaboración digital
                  </MenuItem>
                  <MenuItem value="Creación de videos y material interactivo">
                    Creación de videos y material interactivo
                  </MenuItem>
                  <MenuItem value="Análisis de datos y gestión de información">
                    Análisis de datos y gestión de información
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item>
              <Typography variant="subtitle1">
                ¿Prefieres capacitaciones presenciales, virtuales o híbridas?
              </Typography>
              <RadioGroup
                value={form.preferenciaCapacitacion}
                onChange={handleChange("preferenciaCapacitacion")}
              >
                <FormControlLabel
                  value="Presencial"
                  control={<Radio />}
                  label="Presencial"
                />
                <FormControlLabel
                  value="Virtual"
                  control={<Radio />}
                  label="Virtual"
                />
                <FormControlLabel
                  value="Híbrida"
                  control={<Radio />}
                  label="Híbrida (ambas)"
                />
              </RadioGroup>
            </Grid>

            <Grid item>
              <Button type="submit" variant="contained" disabled={isLoading}>
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Enviar"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Box>
  );
};

export default Form;
