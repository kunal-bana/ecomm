import React from "react";
import { Box, Paper, TextField, Button, Typography, InputAdornment } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

export default function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      localStorage.setItem("user", JSON.stringify(values));
      navigate("/");
    },
  });

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        background: "linear-gradient(135deg, #101214ff, #fce4ec)", 
      }}>
      <Paper
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 380,
          borderRadius: 3,                
          boxShadow: "0px 4px 18px rgba(0,0,0,0.12)", 
        }}>
        <Typography variant="h5" fontWeight={700} mb={1}>
          Welcome Back 
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, opacity: 0.7 }}>
          Please login to continue shopping
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: "#777" }} />
                </InputAdornment>
              ),
            }}  />

          <TextField
            fullWidth
            type="password"
            label="Password"
            name="password"
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}

            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: "#777" }} />
                </InputAdornment>
              ),
            }}/>

          <Typography
            variant="body2"
            sx={{
              textAlign: "right",
              mt: 1,
              mb: 2,
              color: "primary.main",
              cursor: "pointer",
              fontSize: "0.85rem",
              ":hover": { textDecoration: "underline" },
            }}
            onClick={() => navigate("/forgot-password")}>
            Forgot Password?
          </Typography>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              mt: 1,
              py: 1.4,
              borderRadius: 2,
              transition: "0.3s",
              ":hover": {
                transform: "scale(1.02)",      
              },
            }}
            disabled={!formik.isValid || !formik.dirty}>
            Login
          </Button>
        </form>

        <Button
          fullWidth
          sx={{
            mt: 2,
            textTransform: "none",
          }}
          onClick={() => navigate("/signup")}>
          Create an account
        </Button>

        <Typography variant="caption" display="block" sx={{ textAlign: "center", mt: 2, opacity: 0.6 }}>
          Secure Login • MyShop
        </Typography>
      </Paper>
    </Box>
  );
}
