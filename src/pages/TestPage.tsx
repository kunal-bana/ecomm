import React, { useState } from "react";
import {
  Button,
  Box,
  Typography,
  Snackbar,
  Alert
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { pushNote } from "../redux/notificationSlice";
import { RootState } from "../redux/store";

import dayjs, { Dayjs } from "dayjs";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";

export default function TestPage() {
  const dispatch = useDispatch();
  const mode = useSelector((s: RootState) => s.theme.mode);

  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [time, setTime] = useState<Dayjs | null>(dayjs());

  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const showPopup = (text: string) => {
    setMsg(text);
    setOpen(true);
  };

  const sendNow = () => {
    dispatch(
      pushNote({
        message: "Immediate Notification Test!",
        scheduledTime: new Date().toISOString(),
      })
    );

    new Notification("MyShop Test", { body: "This is a test notification!" });

    showPopup("Notification sent instantly!");
  };

  const schedule = () => {
    if (!date || !time) {
      showPopup("Please select date & time");
      return;
    }

    const selectedDateTime = date
      .hour(time.hour())
      .minute(time.minute())
      .second(0)
      .toISOString();

    const notif = {
      id: Date.now(),
      message: "Scheduled Notification",
      time: selectedDateTime,
      delivered: false,
    };

    const list = JSON.parse(localStorage.getItem("scheduledNotifs") || "[]");
    list.push(notif);
    localStorage.setItem("scheduledNotifs", JSON.stringify(list));

    showPopup(
      `Notification scheduled for ${dayjs(selectedDateTime).format(
        "YYYY-MM-DD HH:mm"
      )}`
    );
  };

  return (
    <Box sx={{ p: 3, marginTop: "50px", maxWidth: "400px" }}>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Notification Test Page
      </Typography>

      <Typography fontWeight={600} mb={1}>
        Select Date
      </Typography>
      <DatePicker
        value={date}
        onChange={(newValue) => setDate(newValue)}
        slotProps={{
          textField: {
            fullWidth: true,
            sx: { mb: 3 },
          },
        }}/>

      
      <Typography fontWeight={600} mb={1}>
        Select Time
      </Typography>
      <TimePicker
        value={time}
        onChange={(newValue) => setTime(newValue)}
        slotProps={{
          textField: {
            fullWidth: true,
            sx: { mb: 3 },
          },
        }}/>

      <Button
        variant="contained"
        fullWidth
        sx={{
          mb: 2,
          bgcolor: mode === "light" ? "black" : "white",
          color: mode === "light" ? "white" : "black"
        }}
        onClick={sendNow}>
        Send notification now 
      </Button>

      <Button
        variant="outlined"
        fullWidth
        sx={{
          color: mode === "light" ? "black" : "white",
          borderColor: mode === "light" ? "black" : "white",
        }}
        onClick={schedule}>
        Schedule notification
      </Button>

      
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity="success">{msg}</Alert>
      </Snackbar>
    </Box>
  );
}
