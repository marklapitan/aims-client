import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import MainPage from "./MainPage";
import Orders from "../components/Orders";
/**------------------------------------------------------------------------ */

const defaultTheme = createTheme();
/**----------------------------------------------------------------------- */
export default function OrdersPage() {
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
              <Orders />
            </Container>
            <Toolbar />
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
