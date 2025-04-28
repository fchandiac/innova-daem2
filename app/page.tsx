"use client";
//rest
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  List,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import YouTubeIcon from "@mui/icons-material/YouTube";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import toolsData from "../toolsData";
import Form from "./Form";

const HomePage = () => {
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box sx={{ padding: "20px",  color:  "#000" }}>
      <Typography variant="h6" sx={{ mb: 2, color:'white' }} color="#fff">
        Herramientas digitales
      </Typography>
      <List>
        {toolsData.map((category, index) => (
          <Accordion
            key={index}
            sx={{
              backgroundColor: "transparent",
              color: "#fff",
              boxShadow: "none",
              "&::before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
            >
              <Typography>{category.category}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {category.tools.map((tool, i) => (
                <Box
                  key={i}
                  sx={{
                    pl: 2,
                    pb: 2,
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <Typography variant="subtitle2">{tool.name}</Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "12px", color: "#ddd", mb: 1 }}
                  >
                    {tool.description}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {tool.videoUrl && (
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<YouTubeIcon />}
                        href={tool.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: "#fff",
                          borderColor: "#fff",
                          textTransform: "none",
                          "& .MuiSvgIcon-root": { color: "red" },
                        }}
                      >
                        Ver video
                      </Button>
                    )}
                    {tool.website && (
                      <Button
                        variant="outlined"
                        size="small"
                        href={tool.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: "#fff",
                          borderColor: "#fff",
                          textTransform: "none",
                        }}
                      >
                        Sitio oficial
                      </Button>
                    )}
                  </Box>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </List>
    </Box>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Drawer escritorio */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Drawer
          sx={{
            width: 300,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 300,
              backgroundColor: "#154977",
              color: "#fff",
            },
          }}
          variant="persistent"
          anchor="left"
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Drawer mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: 280,
            backgroundColor: "#154977",
            color: "#fff",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Contenido principal */}
      <div
        style={{
          flexGrow: 1,
          padding: "20px",
          backgroundColor: "#9ac8cb",
          minHeight: "100vh",
        }}
      >
        <AppBar
          position="sticky"
          style={{
            backgroundColor: "#9ac8cb",
            borderRadius: "20px",
            boxShadow: "none",
            marginBottom: "20px",
            color: "#0a2747",
          }}
        >
          <Toolbar>
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
              {/* Logo + título */}
              <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                <img
                  src="/logo.png"
                  alt="Logo DAEM"
                  style={{ height: 90, width: "auto", marginRight: 12 }}
                />
                <Typography variant="h4" component="div">
                  InnovaDaem
                </Typography>
              </Box>

              {/* Subtítulo escritorio */}
              {!isMobile && (
                <Typography variant="h6" component="div">
                  Formulario Diagnóstico
                </Typography>
              )}

              {/* Botón menú mobile a la derecha */}
              {isMobile && (
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            backgroundColor: "#ffffffbb",
            borderRadius: "12px",
            padding: 4,
            maxWidth: 700,
            margin: "0 auto",
            boxShadow: 3,
          }}
        >
          {/* Título visible solo en mobile */}
          {isMobile && (
            <Typography
              variant="h6"
              component="div"
              sx={{ mb: 2, textAlign: "center" }}
              color="#0a2747"
            >
              Formulario Diagnóstico
            </Typography>
          )}

        

          <Typography fontSize={14} sx={{ mb: 2 }} align="justify" color="#000">
            Este formulario busca levantar información sobre el uso y dominio de herramientas digitales por parte de los docentes. Los datos permitirán planificar capacitaciones y acompañamientos técnico-pedagógicos desde la UTP del DAEM, en línea con el PADEM 2025.
          </Typography>
          <Typography fontSize={14} sx={{ mb: 3 }}  align="justify" color="#000">
            Las herramientas sugeridas están visibles a la derecha en la versión escritorio, y en dispositivos móviles puedes acceder a ellas mediante el <strong>ícono de menú</strong> en la parte superior derecha.
          </Typography>

          <Form />
        </Box>
      </div>
    </div>
  );
};

export default HomePage;
