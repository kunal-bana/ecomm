import React, { useState } from "react";
import emailjs from "emailjs-com";
import { Snackbar,Alert} from "@mui/material";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
  
    const showAlert = (msg: string) => {
      setAlertMsg(msg);
      setAlertOpen(true);
    };

  const handleSend = () => {
    const templateParams = {
      email: email,
      login_link: "http://localhost:3000/login", 
    };
    emailjs
      .send(
        "service_hi0vwsn",
        "template_fbf7lsd",
        templateParams,
        "OuOYAdO-C6TTqJDTL"
      )
      .then(() => {
        showAlert("Reset link sent to your email!");
      })
      .catch((err) => {
        console.log(err);
        showAlert("Failed to send email!");
      });
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
    <div style={{ width: "350px", margin: "50px auto", textAlign: "center",marginTop:"100px" }}>
      <h2>Forgot Password</h2>

      <input
        type="email"
        placeholder="Enter your email"
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
        onChange={(e) => setEmail(e.target.value)}/>

      <button
        onClick={handleSend}
        style={{
          width: "content-fit",
          padding: "10px",
          backgroundColor: "black",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
        }}>
        Send Reset Link
      </button>
    </div>
    </>
  );
}
