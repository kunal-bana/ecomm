import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function AddNewAddress() {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
    },

    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is required"),
      address: Yup.string().required("Address is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      pincode: Yup.string()
        .matches(/^[0-9]{6}$/, "Pincode must be 6 digits")
        .required("Pincode is required"),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
        .required("Phone is required"),
    }),

    onSubmit: (values) => {
      console.log("Address Data:", values);
      alert("Address Saved Successfully!");
    },
  });

  return (
    <div
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "110px",
        maxWidth: "990px",
        padding: "30px",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
      }}>
      <h2 style={{ textAlign: "center", marginBottom: "25px" }}>
        Add New Address
      </h2>

      <form onSubmit={formik.handleSubmit}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}>

          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              onChange={formik.handleChange}
              value={formik.values.fullName}
              style={inputStyle}/>
            <p style={errorStyle}>{formik.touched.fullName && formik.errors.fullName}</p>

            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={formik.handleChange}
              value={formik.values.city}
              style={inputStyle}/>
            <p style={errorStyle}>{formik.touched.city && formik.errors.city}</p>

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              onChange={formik.handleChange}
              value={formik.values.pincode}
              style={inputStyle}/>
            <p style={errorStyle}>{formik.touched.pincode && formik.errors.pincode}</p>
          </div>

          <div>
            <input
              type="text"
              name="address"
              placeholder="Address Line"
              onChange={formik.handleChange}
              value={formik.values.address}
              style={inputStyle}/>
            <p style={errorStyle}>{formik.touched.address && formik.errors.address}</p>

            <input
              type="text"
              name="state"
              placeholder="State"
              onChange={formik.handleChange}
              value={formik.values.state}
              style={inputStyle}/>
            <p style={errorStyle}>{formik.touched.state && formik.errors.state}</p>

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              onChange={formik.handleChange}
              value={formik.values.phone}
              style={inputStyle}/>
            <p style={errorStyle}>{formik.touched.phone && formik.errors.phone}</p>
          </div>
        </div>

        <button
          type="submit"
          style={{
            alignItems: "center",
            marginTop: "25px",
            width: "100%",
            padding: "12px",
            background: "black",
            color: "white",
            borderRadius: "6px",
            fontWeight: "600",
            cursor: "pointer",
            border: "none",
          }}>
          SAVE ADDRESS
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "5px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const errorStyle = {
  color: "red",
  fontSize: "12px",
  marginBottom: "10px",
};
