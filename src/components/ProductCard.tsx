import React from "react";
import {
  Paper,
  Typography,
  Box,
  IconButton,
  Button
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";
import { Product } from "../api/apiTypes";  // ✔ correct type import

interface Props {
  id: number;
  title: string;
  price: number;
  image: string; 
}

export default function ProductCard({ id, title, price, image }: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const isWishlisted = wishlist.some((item) => item.id === id);

  const mode = useSelector((s: RootState) => s.theme.mode);

  const productData: Product = {
    id,
    title,
    price,
    image,
    description: "",
    category: ""     
  };

  const toggleWishlist = (e: any) => {
    e.stopPropagation();

    if (isWishlisted) {
      dispatch(removeFromWishlist(id));
    } else {
      dispatch(addToWishlist(productData));
    }
  };

  return (
    <Paper
      sx={{
        width: "100%",
        maxWidth: 180,
        p: 1,
        borderRadius: 2,
        boxShadow: 2,
        cursor: "pointer",
        position: "relative",
        "&:hover": {
          boxShadow: 14,
          transform: "translateY(-4px)",
        },
        transition: "0.2s ease",
      }}>
      <IconButton
        size="small"
        sx={{
          position: "absolute",
          right: 6,
          top: 6,
          bgcolor: "black",
          color: "lightgray",
        }}
        onClick={toggleWishlist}>
        {isWishlisted ? (
          <FavoriteIcon sx={{ color: "red" }} />
        ) : (
          <FavoriteBorderIcon />
        )}
      </IconButton>

      <Box onClick={() => navigate(`/product/${id}`)}>
        <img
          src={image}
          alt={title}
          style={{
            width: "100%",
            height: 160,
            objectFit: "contain",
            borderRadius: 4,
          }}/>

        <Typography
          fontWeight={500}
          sx={{
            mt: 1,
            fontSize: 14,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}>
          {title}
        </Typography>

        <Typography
          sx={{
            fontWeight: 700,
            mt: 0.5,
            color: mode === "light" ? "black" : "white",
          }}>
          ₹{price}
        </Typography>
      </Box>

      <Box sx={{ mt: 1.5, display: "flex", gap: 1, flexDirection: "column" }}>
        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: mode === "light" ? "black" : "white",
            textTransform: "none",
            borderRadius: 2,
            py: 1,
            fontWeight: 600,
            color: mode === "light" ? "white" : "black",
          }}
          onClick={() => navigate(`/product/${id}?buynow=true`)}>
          Buy Now
        </Button>
      </Box>
    </Paper>
  );
}
