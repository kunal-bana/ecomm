import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Radio,
  Button,
  TextField,
  Alert, Snackbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function CheckoutStep2() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const mode = useSelector((s: RootState) => s.theme.mode);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
  
    const showAlert = (msg: string) => {
      setAlertMsg(msg);
      setAlertOpen(true);
    };

  const handleNext = () => {
    if (!selected) {
      showAlert("Please select a delivery option first");
      return;
    }

    const shippingInfo = {
      method: selected,
      date:
        selected === "schedule"
          ? scheduleDate
          : selected === "free"
          ? dayjs().format("DD MMM YYYY")
          : dayjs().add(1, "day").format("DD MMM YYYY"),
    };

    localStorage.setItem("shippingMethod", JSON.stringify(shippingInfo));
    navigate("/checkout/payment");
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
    <Box sx={{ p: 3, mt: "40px", display: "flex", justifyContent: "center" }}>
    
      <Box sx={{ width: "100%", maxWidth: "1100px" }}>
        
        <CheckoutSteps step={2} />

        <Typography fontWeight={700} mb={2} sx={{ fontSize: 18 }}>
          Choose Delivery Method
        </Typography>

        <Paper
          onClick={() => setSelected("free")}
          sx={{
            p: 2,
            mb: 2,
            borderRadius: 2,
            border: "1px solid #ddd",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
          }}>
          <Box>
            <Typography fontWeight={700}>Free Delivery</Typography>
            <Typography sx={{ fontSize: 14 }}>
              Delivery by {dayjs().format("DD MMM YYYY")}
            </Typography>
          </Box>

          <Radio checked={selected === "free"} />
        </Paper>

        <Paper
          onClick={() => setSelected("fast")}
          sx={{
            p: 2,
            mb: 2,
            borderRadius: 2,
            border: "1px solid #ddd",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
          }}>
          <Box>
            <Typography fontWeight={700}>Fast Delivery</Typography>
            <Typography sx={{ fontSize: 14 }}>
              Delivery by {dayjs().add(1, "day").format("DD MMM YYYY")}
            </Typography>
          </Box>

          <Radio checked={selected === "fast"} />
        </Paper>

        <Paper
          onClick={() => setSelected("schedule")}
          sx={{
            p: 2,
            mb: 2,
            borderRadius: 2,
            border: "1px solid #ddd",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
          }}>
          <Box>
            <Typography fontWeight={700}>Schedule Delivery</Typography>
            <Typography sx={{ fontSize: 14 }}>
              {scheduleDate ? scheduleDate : "Pick a date"}
            </Typography>
          </Box>

          <Radio checked={selected === "schedule"} />
        </Paper>

        
        {selected === "schedule" && (
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography fontWeight={600} mb={1}>
              Select Delivery Date
            </Typography>

            <TextField
              type="date"
              fullWidth
              value={scheduleDate}
              onChange={(e) =>
                setScheduleDate(dayjs(e.target.value).format("DD MMM YYYY"))
              }
              sx={{ maxWidth: 300 }}/>
          </Box>
        )}

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button
            variant="outlined"
            sx={{ color: mode === "light" ? "black" : "white" }}
            onClick={() => navigate("/checkout/address")}>
            Back
          </Button>

          <Button
            variant="contained"
            sx={{ bgcolor: mode === "light" ? "black" : "white" }}
            onClick={handleNext}>
            Next
          </Button>
        </Box>
      </Box>
    </Box>
    </>
  );
}
