import React from "react";
import { Box, Typography, Button } from "@mui/material";

export default function NoInternet() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        p: 2,
      }}>
        <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
            No Internet Connection
            </Typography>
      <img
        src="/nointernet/nointernet.png"
        alt="No Internet"
        style={{ width: "140px", marginBottom: "20px", opacity: 0.8 }}/>

      <Typography variant="body1" sx={{ mb: 3, opacity: 0.7 }}>
        Please check your network and try again.
      </Typography>

      <Button
        variant="contained"
        onClick={() => window.location.reload()}
        sx={{ backgroundColor: "black", ":hover": { backgroundColor: "#333" } }}>
        Retry
      </Button>
    </Box>
  );
}
