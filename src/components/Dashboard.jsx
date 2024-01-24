import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Deposits from "./Deposits";
import OrderSummary from "./OrderSummary";
import SalesPurchase from "./SalesPurchase";
import { Typography } from "@mui/material";
import { Link } from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Inventory Management System
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Dashboard = () => {
  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Sales & Purchase  */}
          <Grid item xs={12} md={8} lg={9}>
            <SalesPurchase />
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={3}>
            <Deposits />
          </Grid>
          {/* Orders & Summary */}
          <Grid item xs={12}>
            <OrderSummary />
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </>
  );
};
export default Dashboard;
