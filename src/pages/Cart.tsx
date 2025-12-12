import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { removeFromCart, increaseQty, decreaseQty } from "../redux/cartSlice";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import FrequentlyBoughtTogether from "../components/FrequentlyBoughtTogether";

export default function CartPage() {
  const navigate = useNavigate();
  const cart = useSelector((s: RootState) => s.cart.items);
  const dispatch = useDispatch();
  const mode = useSelector((s: RootState) => s.theme.mode);

  const subtotal = cart.reduce((a, b) => a + b.price * b.quantity, 0);
  const tax = Math.floor(subtotal * 0.05);
  const shipping = subtotal < 100 ? 29 : 0;
  const total = subtotal + tax + shipping;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 4,
        p: { xs: 1, md: 4 },
        flexWrap: "wrap",
      }}>
      <Box sx={{ flex: 1, minWidth: 350, marginTop: "50px" }}>
        {cart.length === 0 ? (
          <Box
            sx={{
              mt: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              width: "100%",
            }}>
            <img
              src="/upi/empty.png"
              alt="empty-cart"
              style={{ width: 150, marginBottom: 20 }}/>

            <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
              Hey, it feels so light!
            </Typography>

            <Typography sx={{ opacity: 0.6, maxWidth: 340, mb: 4 }}>
              There is nothing in your bag. Let's add some items.
            </Typography>

            <Button
              variant="outlined"
              sx={{
                px: 4,
                py: 1.2,
                borderRadius: "4px",
                borderColor: "#526cd0",
                color: "#526cd0",
                fontWeight: "bold",
                "&:hover": {
                  borderColor: "#3949ab",
                  color: "#3949ab",
                },
              }}
              onClick={() => navigate("/wishlist")}>
              ADD ITEMS FROM WISHLIST
            </Button>
          </Box>
        ) : (
          <>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
              Shopping Cart
            </Typography>
            {cart.map((item) => (
              <Paper
                key={item.id}
                sx={{
                  p: 2,
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  borderRadius: 2,
                }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "contain",
                    borderRadius: 8,
                  }}/>

                <Box sx={{ flex: 1 }}>
                  <Typography fontWeight={600}>{item.title}</Typography>
                  <Typography fontSize={14} sx={{ opacity: 0.7 }}>
                    ₹{item.price}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <IconButton
                      onClick={() => dispatch(decreaseQty(item.id))}
                      size="small">
                      <RemoveIcon />
                    </IconButton>

                    <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>

                    <IconButton
                      onClick={() => dispatch(increaseQty(item.id))}
                      size="small">
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Box>

                <IconButton
                  onClick={() => dispatch(removeFromCart(item.id))}
                  size="small">
                  <CloseIcon />
                </IconButton>
              </Paper>
            ))}
            <FrequentlyBoughtTogether />
          </>
        )}
      </Box>
      {cart.length > 0 && (
        <Paper
          sx={{
            width: 330,
            height: "fit-content",
            p: 3,
            borderRadius: 2,
            position: { md: "sticky" },
            top: 90,
            marginTop: "100px",
          }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Order Summary
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography sx={{ opacity: 0.6 }}>Discount Code</Typography>
            <Paper
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 1,
                mt: 1,
                borderRadius: 2,
              }}>
              <input
                placeholder="Enter code"
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  background: "transparent",
                }}
              />
              <Button size="small">Apply</Button>
            </Paper>
          </Box>

          <Divider sx={{ my: 2 }} />

          <SummaryRow label="Subtotal" value={`₹${subtotal}`} />
          <SummaryRow label="Estimated Tax" value={`₹${tax}`} />
          <SummaryRow label="Delivery Charges" value={`₹${shipping}`} />
          <SummaryRow label="Total" value={`₹${total}`} bold larger />

          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.2,
              borderRadius: 2,
              bgcolor: mode === "light" ? "black" : "white",
              color: mode === "light" ? "white" : "black",
            }}
            onClick={() => navigate("/checkout/address")}>
            Checkout
          </Button>
        </Paper>
      )}
    </Box>
  );
}

function SummaryRow({
  label,
  value,
  bold = false,
  larger = false,
}: {
  label: string;
  value: string;
  bold?: boolean;
  larger?: boolean;
}) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
      <Typography
        sx={{ fontSize: larger ? 18 : 14, fontWeight: bold ? 700 : 400 }}>
        {label}
      </Typography>
      <Typography
        sx={{ fontSize: larger ? 18 : 14, fontWeight: bold ? 700 : 400 }}>
        {value}
      </Typography>
    </Box>
  );
}
