import React from "react";
import { Box, Paper, Typography, Button, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

export default function MyOrders() {
  const orders = useSelector((s: RootState) => s.orders.orders);
  const mode = useSelector((s: RootState) => s.theme.mode);
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 3, mt: 8,maxWidth: 900, mx: "auto" }}>
      <Typography variant="h5" fontWeight={700} mb={3}>
        My Orders
      </Typography>

      {orders.length === 0 && (
        <Typography>No orders found.</Typography>
      )}

      {orders.map((o) => (
        <Paper
          key={o.id}
          sx={{
            p: 5,
            mb: 3,
            borderRadius: 3,
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            background: mode === "light" ? "#fff" : "#1f1f1f",
          }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography fontWeight={700}>Order #{o.id}</Typography>
            <Typography sx={{ opacity: 0.7 }}>{o.date}</Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          {o.items.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
              }}>
            
              <Box
                component="img"
                src={item.image}
                alt={item.title}
                sx={{
                  width: 80,
                  height: 80,
                  objectFit: "contain",
                  borderRadius: 2,
                  mr: 2,
                  border: "1px solid #e0e0e0",
                  background: "#fff",
                }}/>

              <Box>
                <Typography fontWeight={600}>{item.title}</Typography>
                <Typography sx={{ opacity: 0.7, fontSize: 14 }}>
                  Qty: {item.quantity}
                </Typography>
                <Typography fontWeight={600}>₹{item.price}</Typography>
              </Box>
            </Box>
          ))}

          <Divider sx={{ my: 2 }} />
          <Typography fontWeight={700}>Total Amount: ₹{o.total}</Typography>
          <Typography sx={{ mt: 1 }}>
            Status: <b>{o.status}</b>
          </Typography>
          <Box sx={{ textAlign: "right" }}>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              py: 1,
              fontWeight: 500,
              bgcolor: mode === "light" ? "black" : "white",
              color: mode === "light" ? "white" : "black",
              "&:hover": {
                opacity: 0.8,
                bgcolor: mode === "light" ? "black" : "white",
              },
            }}
            onClick={() => navigate(`/order/${o.id}`)}>
            Track Order
          </Button>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}
