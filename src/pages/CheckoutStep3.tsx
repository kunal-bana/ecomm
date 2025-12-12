import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Tabs,
  Tab,
  Button,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { clearCart } from "../redux/cartSlice";
import { placeOrder } from "../redux/orderSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import { useNavigate } from "react-router-dom";

export default function CheckoutStep3() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((s: RootState) => s.cart.items);
  const mode = useSelector((s: RootState) => s.theme.mode);
  const address = JSON.parse(localStorage.getItem("selectedAddress") || "null");
  const shippingInfo = JSON.parse(localStorage.getItem("shippingMethod") || "{}");

  const subtotal = cart.reduce((a, b) => a + b.price * b.quantity, 0);
  const tax = Math.floor(subtotal * 0.05);
  const shipping = subtotal < 100 ? 29 : 0;
  const total = subtotal + tax + shipping;

  const [tab, setTab] = useState(0);
  const [upiApp, setUpiApp] = useState("");

  const handlePay = () => {
    const formattedItems = cart.map((item) => ({
      ...item,
      images: [String(item.image)],
    }));

    dispatch(placeOrder({ items: formattedItems, total, address }));
    dispatch(clearCart());
    navigate("/myorders");
  };

  return (
    <Box sx={{ p: 3, mt: "40px", display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "100%", maxWidth: "1100px" }}>
        <CheckoutSteps step={3} />

        <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        
          <Paper
            sx={{
              width: { xs: "100%", md: "45%" },
              p: 3,
              borderRadius: 2,
              border: "1px solid #ddd",
            }}>
            <Typography variant="h6" fontWeight={700} mb={2}>
              Order Summary
            </Typography>

            {cart.map((item) => (
              <Box
                key={item.id}
                sx={{ display: "flex", alignItems: "center", mb: 2, gap: 2 }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: 60, height: 60, borderRadius: 8 }}/>
                <Box>
                  <Typography fontWeight={600}>{item.title}</Typography>
                  <Typography>₹{item.price}</Typography>
                </Box>
              </Box>
            ))}

            <Divider sx={{ my: 2 }} />

            <Typography fontWeight={600}>Address</Typography>
            <Typography fontSize={14} mb={1}>
              {address?.line1}
            </Typography>

            <Typography fontSize={14} mb={1}>
              {shippingInfo?.method === "free" && "Free Delivery"}
              {shippingInfo?.method === "fast" && "Fast Delivery"}
              {shippingInfo?.method === "schedule" && `Scheduled Delivery: ${shippingInfo.date}`}
            </Typography>


            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>Subtotal</Typography>
              <Typography>₹{subtotal}</Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>Estimated Tax</Typography>
              <Typography>₹{tax}</Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>Delivery Charges</Typography>
              <Typography>₹{shipping}</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography fontWeight={700}>Total</Typography>
              <Typography fontWeight={700}>₹{total}</Typography>
            </Box>
          </Paper>

          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <Typography variant="h6" fontWeight={700} mb={2}>
              Payment
            </Typography>

            <Tabs
              value={tab}
              onChange={(e, v) => setTab(v)}
              sx={{ mb: 3 }}
              textColor="inherit"
              indicatorColor="primary">
              <Tab label="Credit Card" />
              <Tab label="UPI" />
              <Tab label="Cash on Delivery" />
            </Tabs>

            {tab === 0 && (
              <>
                <Paper
                  sx={{
                    width: 300,
                    height: 170,
                    borderRadius: 3,
                    p: 2,
                    mb: 3,
                    background: "linear-gradient(135deg, #000, #333)",
                    color: "white",
                  }}>
                  <Typography fontSize={18} fontWeight={700}>
                    xxxx xxxx xxxx 9530
                  </Typography>
                  <Typography mt={4}>Cardholder Name</Typography>
                </Paper>

                <TextField label="Cardholder Name" fullWidth sx={{ mb: 2 }} />
                <TextField label="Card Number" fullWidth sx={{ mb: 2 }} />

                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField label="Exp. Date" fullWidth />
                  <TextField label="CVV" fullWidth />
                </Box>
              </>
            )}

            {tab === 1 && (
              <Box>
                <Typography mb={2} fontWeight={600}>
                  Select UPI App
                </Typography>

                <RadioGroup onChange={(e) => setUpiApp(e.target.value)}>
                  <FormControlLabel
                    value="Google Pay"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <img src="/upi/gpay.png" width={30} height={30} alt="GPay" />
                        Google Pay
                      </Box>
                    }/>

                  <FormControlLabel
                    value="PhonePe"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <img src="/upi/phonepe.png" width={30} height={30} alt="PhonePe" />
                        PhonePe
                      </Box>
                    }/>

                  <FormControlLabel
                    value="Paytm"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <img src="/upi/paytm.png" width={30} height={30} alt="Paytm" />
                        Paytm
                      </Box>
                    }/>

                  <FormControlLabel
                    value="BHIM"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <img src="/upi/bhim.png" width={30} height={30} alt="BHIM" />
                        BHIM UPI
                      </Box>
                    }/>
                </RadioGroup>

                {upiApp && (
                  <Typography mt={2} sx={{ opacity: 0.8 }}>
                    You will be redirected to <b>{upiApp}</b> to complete payment.
                  </Typography>
                )}
              </Box>
            )}

            {tab === 2 && (
              <Box>
                <Typography mb={2} fontWeight={600}>
                  <img src="/upi/money.png" width={30} height={30} alt="Cash On Delivery" style={{ verticalAlign: "middle", marginRight: 8 }}/>
                  Cash On Delivery
                </Typography>

                <Paper sx={{ p: 2, mb: 2 }}>
                  <Typography fontWeight={600}>{address?.name}</Typography>
                  <Typography>{address?.line1}</Typography>
                  <Typography>{address?.phone}</Typography>
                </Paper>

                <Typography fontWeight={600}>
                  You will pay <b>₹{total}</b> at the time of delivery.
                </Typography>
              </Box>
            )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 4,
              }}>
              <Button
                variant="outlined"
                sx={{ color: mode === "light" ? "black" : "white" }}
                onClick={() => navigate("/checkout/shipping")}>
                Back
              </Button>

              <Button
                variant="contained"
                sx={{ bgcolor: mode === "light" ? "black" : "white" }}
                onClick={handlePay}>
                {tab === 2 ? "Confirm Order" : "Pay"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
