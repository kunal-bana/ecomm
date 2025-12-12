import {useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Slider,
  Rating,
  Button,
  TextField,
  Divider,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function CategoryPage() {
  const { name } = useParams();
  const navigate = useNavigate();

  const products = useSelector((s: RootState) => s.products.items);
  const mode = useSelector((s: RootState) => s.theme.mode);

  const decodedName = decodeURIComponent(name || "");

  const [maxPrice, setMaxPrice] = useState(2000);
  const [minPrice, setMinPrice] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [sortType, setSortType] = useState("none");
  const [search, setSearch] = useState("");
  const [discountFilter, setDiscountFilter] = useState(false);

  const getImage = (img: string | string[]) =>
    Array.isArray(img) ? img[0] : img;

  let filtered = products.filter((p) => {
    const rating = (p as any)?.rating?.rate || 0;
    const count = (p as any)?.rating?.count || 0;

    const meetsCategory =
      p.category.toLowerCase() === decodedName.toLowerCase();

    const meetsPrice = p.price >= minPrice && p.price <= maxPrice;

    const meetsRating = rating >= minRating;

    const meetsSearch = p.title.toLowerCase().includes(search.toLowerCase());

    const meetsDiscount = discountFilter ? count > 200 : true;

    return meetsCategory && meetsPrice && meetsRating && meetsSearch && meetsDiscount;
  });

  if (sortType === "low") filtered.sort((a, b) => a.price - b.price);
  if (sortType === "high") filtered.sort((a, b) => b.price - a.price);
  if (sortType === "newest") filtered.sort((a, b) => b.id - a.id);
  if (sortType === "az") filtered.sort((a, b) => a.title.localeCompare(b.title));

  const resetFilters = () => {
    setMaxPrice(2000);
    setMinPrice(0);
    setMinRating(0);
    setSearch("");
    setSortType("none");
    setDiscountFilter(false);
  };

  return (
    <Box sx={{ display: "flex", mt: 10, p: 3 }}>

      <Paper
        sx={{
          width: { xs: "90", md: 250 },
          p: 3,
          borderRadius: 2,
          height: "100vh",
          position: "sticky",
          top: 90,
          boxShadow: 4,
          background: mode === "light" ? "#fff" : "black",
        }}>
        <Typography variant="h6" fontWeight={700}>
          Filters
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography fontWeight={600} sx={{ mb: 1 }}>
          Search
        </Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}/>

        <Divider sx={{ my: 2 }} />

        <Typography fontWeight={600}>Price Range</Typography>
        <Slider sx={{ color: mode === "light" ? "black" : "white"}}
          value={[minPrice, maxPrice]}
          onChange={(e, v: any) => {
            setMinPrice(v[0]);
            setMaxPrice(v[1]);
          }}
          min={10}
          max={2000}/>
        <Typography>
          ₹{minPrice} – ₹{maxPrice}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography fontWeight={600} sx={{ mb: 1 }}>
          Minimum Rating
        </Typography>
        <Rating
          value={minRating}
          onChange={(e, v) => setMinRating(v || 0)}/>

        <Divider sx={{ my: 2 }} />

        <FormControlLabel
          control={
            <Checkbox
              checked={discountFilter}
              onChange={(e) => setDiscountFilter(e.target.checked)}/>
          }
          label="High demand items"/>

        <Divider sx={{ my: 2 }} />

        <Typography fontWeight={600} sx={{ mb: 1 }}>
          Sort By
        </Typography>

        <TextField
          select
          SelectProps={{ native: true }}
          size="small"
          fullWidth
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}>
          <option value="none">Featured</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="newest">Newest First</option>
          <option value="az">A → Z</option>
        </TextField>

        <Divider sx={{ my: 2 }} />

        <Button
          variant="contained"
          fullWidth
          onClick={resetFilters}
          sx={{ textTransform: "none", borderRadius: 2,background: mode === "light" ? "black" : "white" }}>
          Reset Filters
        </Button>
      </Paper>

      <Box sx={{ flex: 1, ml: 3 }}>
        <Typography variant="h5" fontWeight={700} mb={2}>
          {decodedName.toUpperCase()}
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: 2,
          }}>
          {filtered.map((p) => (
            <Paper
              key={p.id}
              sx={{
                width: "100%",
                maxWidth: 180,
                p: 1,
                borderRadius: 2,
                transition: "0.2s",
                "&:hover": {
                    boxShadow: 6,
                    transform: "scale(1.03)" },
              }}>
              <Box
                onClick={() => navigate(`/product/${p.id}`)}
                sx={{ cursor: "default" }}>
                <img
                  src={getImage(p.image)}
                  alt={p.title}
                  style={{
                    width: "100%",
                    height: 160,
                    objectFit: "contain",
                  }}/>

                <Typography
                  fontWeight={600}
                  sx={{
                    mt: 1,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}>
                  {p.title}
                </Typography>

                <Typography fontWeight={700}>₹{p.price}</Typography>

                <Rating
                  value={(p as any)?.rating?.rate || 0}
                  precision={0.5}
                  readOnly
                  size="small"/>
              </Box>

              <Button
                variant="contained"
                fullWidth
                sx={{
                  mt: 1.5,
                  bgcolor: "black",
                  color: "white",
                  textTransform: "none",
                  borderRadius: 2,
                  fontWeight: 600,
                }}
                onClick={() => navigate(`/product/${p.id}?buynow=true`)}>
                Buy Now
              </Button>
            </Paper>
          ))}
        </Box>

        {filtered.length === 0 && (
          <Typography sx={{ mt: 5, opacity: 0.6 }}>
            No products match your filters.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
