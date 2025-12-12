import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material"; 
import { useState } from "react"; 

export default function ResetPassword() {
  const navigate = useNavigate();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (message: string) => {
    setAlertMessage(message);
    setAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New Password is required"),

      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords must match")
        .required("Confirm Password is required"),
    }),

    onSubmit: () => {
      showAlert("Password changed successfully!");
      navigate("/login");
    },
  });

  return (
    <>
    <Snackbar
      open={alertOpen}
      autoHideDuration={3000} 
      onClose={handleCloseAlert}>
      <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
        {alertMessage}
      </Alert>
    </Snackbar> 
    <div
      style={{
        marginTop: "150px",
        width: "380px",
        margin: "80px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Reset Password
      </h2>

      <form onSubmit={formik.handleSubmit}>
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "5px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.newPassword}/>

        {formik.touched.newPassword && formik.errors.newPassword ? (
          <p style={{ color: "red", fontSize: "14px" }}>
            {formik.errors.newPassword}
          </p>
        ) : null}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "15px",
            marginBottom: "5px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}/>

        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <p style={{ color: "red", fontSize: "14px" }}>
            {formik.errors.confirmPassword}
          </p>
        ) : null}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "20px",
            backgroundColor: "black",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}>
          Change Password
        </button>
      </form>
    </div>
    </>
  );
}
