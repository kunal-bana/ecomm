import { Box, Typography } from "@mui/material";
export default function Error401() {
  return (
    <Box sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h3">401 - Unauthorized</Typography>
      <button style={{ marginTop: "20px", padding: "10px", backgroundColor: "black", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }} onClick={() => window.location.href = '/login'}>
      <Typography>Please login to continue</Typography>
      </button>
    </Box>
  );
}
