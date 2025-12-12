import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Paper,
  Rating,
  TextField,
  Stack,
  Avatar,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

import { addToCart } from "../redux/cartSlice";
import { addToWishlist } from "../redux/wishlistSlice";
import { addReview } from "../redux/reviewSlice";

import { fetchProductDetails } from "../redux/productSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  const productId = Number(id);

  const { productDetails: product, items: allProducts, loading } = useSelector(
    (s: RootState) => s.products
  );

  const reviews = useSelector((s: RootState) =>
    s.reviews.reviews.filter((r) => r.productId === productId)
  );

  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState("");

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedWarranty, setSelectedWarranty] = useState<string | null>(null);
  const [selectedPlating, setSelectedPlating] = useState<string | null>(null);

  const getImage = (img: string | string[]) =>
    Array.isArray(img) ? img[0] : img;

  useEffect(() => {
    if (id) dispatch(fetchProductDetails(id) as any);
  }, [id, dispatch]);

  if (loading || !product)
    return <h2 style={{ padding: 20 }}>Loading product...</h2>;

  const avgRating = product.rating?.rate || 0;
  const ratingCount = product.rating?.count || 0;

  const similarProducts = allProducts.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  const isClothing = product.category.includes("clothing");
  const isElectronics = product.category === "electronics";
  const isJewelry = product.category === "jewelery";

  const sizes = ["S", "M", "L", "XL"];
  const colors = ["Black", "Red", "Blue", "White"];
  const warranties = ["1 Year", "2 Year"];
  const plating = ["Gold Plated", "Silver Plated"];

  const selectorButton = (selected: boolean) => ({
    textTransform: "none",
    minWidth: 60,
    borderRadius: 2,
    border: "1px solid #ccc",
    color: selected ? "white" : "black",
    bgcolor: selected ? "black" : "transparent",
    "&:hover": {
      bgcolor: selected ? "black" : "#f2f2f2",
    },
  });

  const handleAdd = () => {
    dispatch(
      addToCart({
        ...product,
        size: selectedSize,
        color: selectedColor,
        warranty: selectedWarranty,
        plating: selectedPlating,
        image: getImage(product.image),
      } as any)
    );
  };

  const handleWishlist = () => {
    dispatch(
      addToWishlist({
        ...product,
        size: selectedSize,
        color: selectedColor,
        warranty: selectedWarranty,
        plating: selectedPlating,
        image: getImage(product.image),
      } as any)
    );
  };

  const initials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <Box sx={{ p: 4, pt: 12 }}>
      <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        <Paper sx={{ p: 2, borderRadius: 2 }}>
          <img
            src={getImage(product.image)}
            alt={product.title}
            style={{
              width: 350,
              height: "auto",
              objectFit: "contain",
              borderRadius: 8,
            }}
          />
        </Paper>

        <Box sx={{ maxWidth: 600 }}>
          <Typography variant="h5" fontWeight={700}>
            {product.title}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <Rating value={avgRating} readOnly precision={0.5} />
            <Typography sx={{ ml: 1, opacity: 0.7 }}>
              ({ratingCount} ratings)
            </Typography>
          </Box>

          <Typography variant="h5" fontWeight={700} sx={{ mt: 1 }}>
            ₹{product.price}
          </Typography>

          <Typography sx={{ mt: 2, opacity: 0.8 }}>
            {product.description}
          </Typography>

          {isClothing && (
            <>
              <Typography fontWeight={700} mt={3}>
                Select Size
              </Typography>
              <Stack direction="row" spacing={1} mt={1}>
                {sizes.map((s) => (
                  <Button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    sx={selectorButton(selectedSize === s)}>
                    {s}
                  </Button>
                ))}
              </Stack>

              <Typography fontWeight={700} mt={3}>
                Select Color
              </Typography>
              <Stack direction="row" spacing={1} mt={1}>
                {colors.map((c) => (
                  <Button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    sx={selectorButton(selectedColor === c)}>
                    {c}
                  </Button>
                ))}
              </Stack>
            </>
          )}

          {isElectronics && (
            <>
              <Typography fontWeight={700} mt={3}>
                Warranty
              </Typography>
              <Stack direction="row" spacing={1} mt={1}>
                {warranties.map((w) => (
                  <Button
                    key={w}
                    onClick={() => setSelectedWarranty(w)}
                    sx={selectorButton(selectedWarranty === w)}>
                    {w}
                  </Button>
                ))}
              </Stack>
            </>
          )}

          {isJewelry && (
            <>
              <Typography fontWeight={700} mt={3}>
                Plating Option
              </Typography>
              <Stack direction="row" spacing={1} mt={1}>
                {plating.map((p) => (
                  <Button
                    key={p}
                    onClick={() => setSelectedPlating(p)}
                    sx={selectorButton(selectedPlating === p)}>
                    {p}
                  </Button>
                ))}
              </Stack>
            </>
          )}

          <Stack direction="row" spacing={2} mt={4}>
            <Button
              variant="contained"
              sx={{ bgcolor: "black", color: "white", borderRadius: 2 }}
              onClick={handleAdd}>
              ADD TO CART
            </Button>

            <Button
              variant="outlined"
              sx={{ borderRadius: 2 }}
              onClick={handleWishlist}>
              WISHLIST
            </Button>

            <Button
              variant="contained"
              sx={{ bgcolor: "black", color: "white", borderRadius: 2 }}
              onClick={handleAdd}>
              BUY NOW
            </Button>
          </Stack>
        </Box>
      </Box>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h6" fontWeight={700}>
          Customer Reviews
        </Typography>

        {reviews.length === 0 && <Typography>No reviews yet.</Typography>}

        <Stack spacing={2} mt={2}>
          {reviews.map((r, i) => (
            <Paper key={i} sx={{ p: 2, borderRadius: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar>{initials(r.user)}</Avatar>
                <Box>
                  <Typography fontWeight={700}>{r.user}</Typography>
                  <Rating value={r.rating} readOnly size="small" />
                </Box>
              </Box>
              <Typography mt={1}>{r.text}</Typography>
              <Typography sx={{ opacity: 0.6, fontSize: 12 }}>
                {r.date}
              </Typography>
            </Paper>
          ))}
        </Stack>

        <Box mt={3}>
          <Typography fontWeight={700}>Write a Review</Typography>
          <Rating
            value={rating}
            onChange={(e, v) => setRating(v || 0)}
            sx={{ mt: 1 }}/>
          <TextField
            fullWidth
            multiline
            rows={3}
            sx={{ mt: 2 }}
            placeholder="Write your review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}/>
          <Button
            variant="contained"
            sx={{ mt: 2, bgcolor: "black", color: "white", borderRadius: 2 }}
            onClick={() =>
              dispatch(
                addReview({
                  productId: product.id,
                  rating,
                  text: reviewText,
                  user: "You",
                  date: new Date().toLocaleString(),
                })
              )
            }>
            SUBMIT REVIEW
          </Button>
        </Box>
      </Box>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h6" fontWeight={700}>
          Similar Products
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mt: 2,
            overflowX: "auto",
            paddingBottom: 2,
            paddingTop: 2,
          }}>
          {similarProducts.map((sp) => (
            <Paper
              key={sp.id}
              sx={{
                p: 2,
                width: 170,
                borderRadius: 2,
                cursor: "pointer",
                "&:hover": {
                    boxShadow: 2,
                    transform: "scale(1.03)" },
              }}
              onClick={() => navigate(`/product/${sp.id}`)}>
              <img
                src={getImage(sp.image)}
                alt={sp.title}
                style={{
                  width: "100%",
                  height: 140,
                  objectFit: "contain",
                  padding: 10,
                }}/>

              <Typography
                fontWeight={700}
                sx={{
                  mt: 1,
                  fontSize: 14,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}>
                {sp.title}
              </Typography>

              <Typography fontWeight={700} mt={0.5}>
                ₹{sp.price}
              </Typography>
              <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, bgcolor: "black", color: "white", borderRadius: 2, }}
              onClick={() => navigate(`/product/${sp.id}`)}>BUY NOW</Button>
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
