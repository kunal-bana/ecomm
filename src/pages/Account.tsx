import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

export default function Account() {
  
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [isEditing, setIsEditing] = useState(false);
  const mode = useSelector((s: RootState) => s.theme.mode);

  const schema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phone: Yup.string().required("Required"),
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
        My Account
      </Typography>

      <Paper sx={{ p: 3, width: "100%", maxWidth: 500 }}>
        {!isEditing ? (
          <>
            <Typography fontSize={18} fontWeight={700}>
              {user.name}
            </Typography>

            <Typography sx={{ opacity: 0.7 }}>{user.email}</Typography>
            <Typography sx={{ opacity: 0.7 }}>{user.phone}</Typography>

            <Button
              variant="contained"
              sx={{ mt: 3,bgcolor:mode === "light" ? "black" : "white" }}
              onClick={() => setIsEditing(true)}>
              Edit Details
            </Button>
          </>
        ) : (
          <Formik
            initialValues={{
              name: user.name || "",
              email: user.email || "",
              phone: user.phone || "",
            }}
            validationSchema={schema}
            onSubmit={(values) => {
              localStorage.setItem("user", JSON.stringify(values));

              setIsEditing(false);
            }}>
            {({ errors, touched }) => (
              <Form>
                <Field
                  as={TextField}
                  label="Full Name"
                  name="name"
                  fullWidth
                  margin="normal"
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}/>

                <Field
                  as={TextField}
                  label="Email"
                  name="email"
                  fullWidth
                  margin="normal"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}/>

                <Field
                  as={TextField}
                  label="Phone"
                  name="phone"
                  fullWidth
                  margin="normal"
                  error={touched.phone && Boolean(errors.phone)}
                  helperText={touched.phone && errors.phone}/>

                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  <Button type="submit" variant="contained"
                  sx={{bgcolor:mode === "light" ? "black" : "white" }}>
                    Save
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    sx={{color:mode === "light" ? "black" : "white"}}
                    onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        )}
      </Paper>
    </Box>
  );
}
