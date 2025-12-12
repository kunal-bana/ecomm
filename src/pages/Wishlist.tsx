import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { removeFromWishlist } from "../redux/wishlistSlice";
import { addToCart } from "../redux/cartSlice";
import { Box, Typography, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ToastMessage from "../components/ToastMessage";

export default function Wishlist() {
  const wishlist = useSelector((s: RootState) => s.wishlist.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mode = useSelector((s: RootState) => s.theme.mode);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastProduct, setToastProduct] = useState<any>(null);

  return (
    <Box sx={{ p: 3, minHeight: "80vh" }}>
      <Typography variant="h5" mb={3} fontWeight={700}>
        Wishlist
      </Typography>

      {wishlist.length === 0 && (
        <Box
          sx={{
            mt: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            opacity: mode === "light" ? 1 : 0.9,
          }}>
          <img
            src="/upi/wishlist.png"
            alt="empty"
            style={{ width: 120, marginBottom: 20 }}/>

          <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
            YOUR WISHLIST IS EMPTY
          </Typography>

          <Typography sx={{ opacity: 0.6, maxWidth: 350, mb: 4 }}>
            Add items that you like to your wishlist.
          </Typography>

          <Button
            variant="outlined"
            sx={{
              px: 4,
              py: 1,
              borderRadius: "4px",
              borderColor: "#526cd0",
              color: "#526cd0",
              fontWeight: "bold",
              "&:hover": {
                borderColor: "#3949ab",
                color: "#3949ab",
              },
            }}
            onClick={() => navigate("/")}>
            CONTINUE SHOPPING
          </Button>
        </Box>
      )}

      {wishlist.length > 0 &&
        wishlist.map((p) => (
          <Paper
            key={p.id}
            sx={{
              p: 2,
              mb: 2,
              display: "flex",
              alignItems: "center",
              gap: 2,
              borderRadius: 2,
              boxShadow: 3,
            }}>
            <img
              src={p.image}
              alt={p.title}
              style={{
                width: 80,
                height: 80,
                objectFit: "contain",
                borderRadius: 8,
              }}/>

            <Box sx={{ flex: 1 }}>
              <Typography fontWeight={700} sx={{ mb: 0.5 }}>
                {p.title}
              </Typography>
              <Typography
                fontSize={16}
                sx={{ color: mode === "light" ? "black" : "white" }}>
                ₹{p.price}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                sx={{
                  bgcolor: mode === "light" ? "black" : "white",
                  color: mode === "light" ? "white" : "black",
                }}
                onClick={() => {dispatch(addToCart(p));
                  setToastProduct(p);        
                  setToastOpen(true); }}
                variant="contained"
                size="small">
                Move to Cart
              </Button>

              <Button
                sx={{ color: mode === "light" ? "black" : "white" }}
                onClick={() => dispatch(removeFromWishlist(p.id))}
                variant="outlined"
                size="small">
                Remove
              </Button>
            </Box>
          </Paper>
        ))}
      {toastProduct && (
        <ToastMessage
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        productName={toastProduct.title}
        message="Moved to cart"/>
        )}
    </Box>
  );
}
