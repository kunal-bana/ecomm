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
    { label: "Men", api: "men's clothing", icon: <CheckroomIcon /> },
    { label: "Women", api: "women's clothing", icon: <Face3Icon /> },
    { label: "Kids", api: null, icon: <ChildCareIcon /> },
    { label: "Mobiles", api: null, icon: <SmartphoneIcon /> },
    { label: "Electronics", api: "electronics", icon: <DevicesOtherIcon /> },
    { label: "Beauty", api: null, icon: <BrushIcon /> },
    { label: "Sports", api: null, icon: <SportsSoccerIcon /> },
    { label: "Home & Furniture", api: null, icon: <WeekendIcon /> },
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
      {/* ALERT */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="warning"
          variant="filled"
          onClose={() => setAlertOpen(false)}
          sx={{ width: "100%", bgcolor: "black", borderRadius: 3 }}
        >
          {alertMsg}
        </Alert>
      </Snackbar>

      <Box sx={{ width: "100%", mt: { xs: 3, md: 5 } }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            mb: { xs: 2, md: 3 },
            px: { xs: 2, md: 10 },
            fontSize: { xs: "18px", md: "22px" },
          }}
        >
          Browse By Category
        </Typography>

        {/* CATEGORY LIST */}
        <Box
          sx={{
            display: "flex",
            gap: { xs: 2.5, md: 6 },
            overflowX: "auto",
            px: { xs: 2, md: 10 },
            pb: 2,
            scrollSnapType: "x mandatory",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {categories.map((cat) => (
            <Paper
              key={cat.label}
              onClick={() => handleSelect(cat)}
              elevation={1}
              sx={{
                minWidth: { xs: 100, sm: 120, md: 130 },
                height: { xs: 80, sm: 90 },
                borderRadius: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                transition: "0.3s",
                border: "1px solid #ddd",
                bgcolor: "#fff",
                scrollSnapAlign: "start",
                ":hover": {
                  transform: "scale(1.06)",
                  boxShadow: 4,
                },
              }}
            >
              {/* ICON */}
              <Box sx={{ color: "#000", fontSize: { xs: 22, md: 26 } }}>
                {cat.icon}
              </Box>

              {/* LABEL */}
              <Typography
                sx={{
                  mt: 1,
                  fontWeight: 600,
                  fontSize: { xs: "13px", md: "14px" },
                  textAlign: "center",
                  color: "#000",
                  px: 1,
                }}
              >
                {cat.label}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>
    </>
  );
}
