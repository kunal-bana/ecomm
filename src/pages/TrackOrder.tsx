import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  Box,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
} from "@mui/material";

export default function TrackOrder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const mode = useSelector((s: RootState) => s.theme.mode);
  const orders = useSelector((s: RootState) => s.orders.orders);
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>No such order found.</Typography>
      </Box>
    );
  }

  const steps = ["Placed", "Shipped", "Out for Delivery", "Delivered"];

  const currentStepIndex = steps.findIndex(
    (s) => s.toLowerCase() === order.status.toLowerCase()
  );

  return (
    <Box sx={{ p: 3, mt: 10 }}>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Track Order #{order.id}
      </Typography>

      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Typography variant="h6" mb={2} fontWeight={600}>
          Order Status
        </Typography>

        <Stepper activeStep={currentStepIndex} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" mb={2} fontWeight={600}>
          Order Details
        </Typography>

        {order.items.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1,
              borderBottom: "1px solid #eee",
              pb: 1,
            }}>
            <Typography>{item.title}</Typography>
            <Typography>₹{item.price} × {item.quantity}</Typography>
          </Box>
        ))}

        <Typography fontWeight={700} mt={2}>
          Total: ₹{order.total}
        </Typography>

        <Typography sx={{ mt: 2, opacity: 0.7 }}>
          Ordered on: {order.date}
        </Typography>

        <Typography variant="h6" mt={3} mb={1} fontWeight={600}>
          Tracking History
        </Typography>

        {order.tracking.map((t, index) => (
          <Box key={index} sx={{ mb: 1 }}>
            <Typography fontWeight={600}>{t.status}</Typography>
            <Typography sx={{ fontSize: 13, opacity: 0.7 }}>
              {t.time}
            </Typography>
          </Box>
        ))}
      </Paper>

      <Button
        variant="outlined"
        sx={{ mt: 3,color:mode === "light" ? "black" : "white" }}
        onClick={() => navigate("/myorders")}>
        Back to My Orders
      </Button>
    </Box>
  );
}
