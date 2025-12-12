import { Snackbar, Alert, Box, Typography } from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  productName: string;
  message: string; 
}

export default function ToastMessage({
  open,
  onClose,
  productName,
  message,
}: Props) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      sx={{ mb: 2 }}>
      <Alert
        severity="success"
        variant="filled"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          backgroundColor: "green",
          color: "white",
          p: 1.5,
          borderRadius: 2,
        }}>
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
            {message}   
          </Typography>

          <Typography sx={{ fontSize: 12 }}>
            {productName}
          </Typography>
        </Box>
      </Alert>
    </Snackbar>
  );
}
