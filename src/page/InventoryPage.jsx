import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

import Inventory from "../components/Inventory";
import MainPage from "../page/MainPage";
import inventoryServices from '../../services/inventoryServices';

const defaultTheme = createTheme();

export default function InventoryPage() {
  const [inventories, setInventories] = useState([]);

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const data = await inventoryServices.list();
        setInventories(data);
      } catch (error) {
        console.error('Error fetching inventory data:', error);
      }
    };
  
    fetchInventories();
  }, []);
  

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <MainPage />
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Container maxWidth="xl" sx={{ mt: 20, mb: 4 }}>
              <Inventory inventoryData={inventories} />
            </Container>
            <Toolbar />
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
