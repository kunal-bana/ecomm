import React, { useState } from "react";
import { Box, Paper, Typography, Radio, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

export default function CheckoutStep1() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const mode = useSelector((s: RootState) => s.theme.mode);

  type Address = {
    id: string;
    name: string;
    line1: string;
    phone: string;
  };

  const addresses: Address[] = JSON.parse(localStorage.getItem("addresses") || "[]");

  const handleDelete = (id: string) => {
    const updated = addresses.filter(addr => addr.id !== id);
    localStorage.setItem("addresses", JSON.stringify(updated));
    window.location.reload();
  };

  return (
    <Box sx={{ p: 3, mt: "40px", display: "flex", justifyContent: "center" }}>
      
      
      <Box sx={{ width: "100%", maxWidth: "1100px" }}>
        
        <CheckoutSteps step={1} />

        <Typography fontWeight={700} mb={2} sx={{ fontSize: 18 }}>
          Select Address
        </Typography>

        {addresses.length === 0 ? (
          <Typography>No address saved.</Typography>
        ) : (
          addresses.map((addr) => (
            <Paper
              key={addr.id}
              sx={{
                p: 2,
                mb: 2,
                display: "flex",
                alignItems: "center",
                borderRadius: 2,
                border: "1px solid #ddd",
                justifyContent: "space-between",
              }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Radio
                  checked={selected === addr.id}
                  onChange={() => setSelected(addr.id)}/>

                <Box>
                  <Typography fontWeight={700} sx={{ fontSize: 15 }}>
                    {addr.name}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>{addr.line1}</Typography>
                  <Typography sx={{ fontSize: 14 }}>{addr.phone}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton onClick={() => navigate(`/address/edit/${addr.id}`)}>
                  <EditIcon fontSize="small" />
                </IconButton>

                <IconButton onClick={() => handleDelete(addr.id)}>
                  <CloseIcon fontSize="small" color="error" />
                </IconButton>
              </Box>
            </Paper>
          ))
        )}

        
        <Box sx={{ display: "flex", alignItems: "center", gap: 3, mt: 3 }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: mode === "light" ? "black" : "white",
              width: 120,
            }}
            disabled={!selected}
            onClick={() => {
              const chosen = addresses.find((a) => a.id === selected);
              localStorage.setItem("selectedAddress", JSON.stringify(chosen));
              navigate("/checkout/shipping");
            }}>
            Next
          </Button>

          <Button
            variant="outlined"
            sx={{boxShadow:"1",
              color: mode === "light" ? "black" : "white",
              fontWeight: 600,
            }}
            onClick={() => navigate("/address/new")}>
            + Add New Address
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
