import React, { useState } from "react";
import { Box, Typography, Paper, Snackbar, Alert } from "@mui/material";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import Face3Icon from "@mui/icons-material/Face3";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import BrushIcon from "@mui/icons-material/Brush";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import WeekendIcon from "@mui/icons-material/Weekend";

import { useNavigate } from "react-router-dom";

export default function CategorySection() {
  const navigate = useNavigate();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const showAlert = (msg: string) => {
    setAlertMsg(msg);
    setAlertOpen(true);
  };

  const categories = [
    {
      label: "Men",
      api: "men's clothing",
      icon: <CheckroomIcon fontSize="medium" />,
    },
    {
      label: "Women",
      api: "women's clothing",
      icon: <Face3Icon fontSize="medium" />,
    },
    {
      label: "Kids",
      api: null,
      icon: <ChildCareIcon fontSize="medium" />,
    },
    {
      label: "Mobiles",
      api: null,
      icon: <SmartphoneIcon fontSize="medium" />,
    },
    {
      label: "Electronics",
      api: "electronics",
      icon: <DevicesOtherIcon fontSize="medium" />,
    },
    {
      label: "Beauty",
      api: null,
      icon: <BrushIcon fontSize="medium" />,
    },
    {
      label: "Sports",
      api: null,
      icon: <SportsSoccerIcon fontSize="medium" />,
    },
    {
      label: "Home & Furniture",
      api: null,
      icon: <WeekendIcon fontSize="medium" />,
    },
  ];

  const handleSelect = (cat: any) => {
    if (!cat.api) {
      showAlert("No products are there in this category.");
      return;
    }

    const encoded = encodeURIComponent(cat.api);
    navigate(`/category/${encoded}`);
  };

  return (
    <>
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert
          severity="warning"
          variant="filled"
          onClose={() => setAlertOpen(false)}
          sx={{ width: "100%",bgcolor:"black",borderRadius:3 }}>
          {alertMsg}
        </Alert>
      </Snackbar>

      <Box sx={{ width: "100%", mt: 5 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, mb: 3, px: { xs: 2, md: 10 } }}>
          Browse By Category
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 6,
            overflowX: "auto",
            px: { xs: 2, md: 10 },
            pb: 2,
          }}>
          {categories.map((cat) => (
            <Paper
              key={cat.label}
              onClick={() => handleSelect(cat)}
              sx={{
                width: 130,
                height: 90,
                borderRadius: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                transition: "0.3s",
                border: "1px solid #ddd",
                bgcolor: "#fff",
                ":hover": {
                  transform: "scale(1.06)",
                  boxShadow: 4,
                },
              }}
              elevation={1}>
              <Box sx={{ color: "#000" }}>{cat.icon}</Box>

              <Typography
                sx={{
                  mt: 1,
                  fontWeight: 600,
                  textAlign: "center",
                  color: "#000",
                }}>
                {cat.label}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>
    </>
  );
}
