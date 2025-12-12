import React from "react";
import { Box, Typography } from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CreditCardIcon from "@mui/icons-material/CreditCard";

interface Props {
  step: number;
}

export default function CheckoutSteps({ step }: Props) {
  const steps = [
    { id: 1, label: "Address", icon: <LocationOnIcon /> },
    { id: 2, label: "Shipping", icon: <ShoppingBagIcon /> },
    { id: 3, label: "Payment", icon: <CreditCardIcon /> },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between", 
        width: "100%",                                    
        py: 4,
        }}>
      {steps.map((s) => {
        const active = step === s.id;
        const completed = step > s.id;

        return (
          <Box
            key={s.id}
            sx={{
              textAlign: "center",
              flex: 1,
              opacity: active ? 1 : 0.5,
            }}>
            <Box
              sx={{
                fontSize: 40,
                display: "flex",
                justifyContent: "center",
                mb: 1,
                color: active
                  ? "#000"
                  : completed
                  ? "green"
                  : "grey",
              }}>
              {s.icon}
            </Box>

            <Typography
              sx={{
                fontWeight: 500,
                mb: 1,
                color: active
                  ? "#000"
                  : completed
                  ? "green"
                  : "text.secondary",
              }}>
              Step {s.id}
            </Typography>

            <Typography
              sx={{
                fontSize: 16,
                fontWeight: active ? 700 : 500,
              }}>
              {s.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
