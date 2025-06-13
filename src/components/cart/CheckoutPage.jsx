import React from "react";
import { useCart } from "../../hooks/useCart"; // ✅ Corrected path
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { ArrowBack, Payment } from "@mui/icons-material";
import { formatPrice } from "../../utils/formatters";
import LoadingSpinner from "../common/LoadingSpinner";

const CheckoutPage = () => {
  const { items } = useCart();
  const navigate = useNavigate();

  if (!items) return <LoadingSpinner />;

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  const handlePlaceOrder = () => {
    navigate("/order-confirmation");
  };

  return (
    <Container maxWidth="md">
      <Breadcrumbs sx={{ my: 2 }}>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">Checkout</Typography>
      </Breadcrumbs>

      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Shipping Address
            </Typography>
            <TextField label="Full Name" fullWidth sx={{ mb: 2 }} />
            <TextField label="Address" fullWidth sx={{ mb: 2 }} />
            <TextField label="City" fullWidth sx={{ mb: 2 }} />
            <TextField label="Pincode" fullWidth sx={{ mb: 2 }} />
            <TextField label="Phone Number" fullWidth sx={{ mb: 2 }} />
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Payment Details
            </Typography>
            <TextField label="Card Number" fullWidth sx={{ mb: 2 }} />
            <TextField label="Name on Card" fullWidth sx={{ mb: 2 }} />
            <TextField label="Expiry Date" fullWidth sx={{ mb: 2 }} />
            <TextField label="CVV" fullWidth sx={{ mb: 2 }} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <List>
              {items.map((item) => (
                <ListItem key={item.id} sx={{ py: 1 }}>
                  <ListItemText primary={item.title} />
                  <Typography>{formatPrice(item.price)}</Typography>
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">
              Total: {formatPrice(totalPrice)}
            </Typography>

            <Box sx={{ mt: 3, display: "flex", gap: 1 }}>
              <Button
                startIcon={<ArrowBack />}
                onClick={() => navigate("/cart")}
                variant="outlined"
                fullWidth
              >
                Back to Cart
              </Button>
              <Button
                startIcon={<Payment />}
                onClick={handlePlaceOrder}
                variant="contained"
                fullWidth
              >
                Place Order
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;
