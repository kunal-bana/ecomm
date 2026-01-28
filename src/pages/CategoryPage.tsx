import { useState } from "react";
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
  Drawer,
  Stack,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import FilterListIcon from '@mui/icons-material/FilterList';

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

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const getImage = (img: string | string[]) =>
    Array.isArray(img) ? img[0] : img;

  let filtered = products.filter((p) => {
    const rating = (p as any)?.rating?.rate || 0;
    const count = (p as any)?.rating?.count || 0;

    const meetsCategory = p.category.toLowerCase() === decodedName.toLowerCase();
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

  const FilterContent = (
    <Box sx={{ p: { xs: 1, md: 0 } }}>
      <Typography variant="h6" fontWeight={700}>Filters</Typography>
      <Divider sx={{ my: 2 }} />
      <Typography fontWeight={600} mb={1}>Search</Typography>
      <TextField
        fullWidth
        size="small"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Divider sx={{ my: 2 }} />
      <Typography fontWeight={600}>Price Range</Typography>
      <Slider
        sx={{ color: mode === "light" ? "black" : "white" }}
        value={[minPrice, maxPrice]}
        onChange={(_, v: any) => { setMinPrice(v[0]); setMaxPrice(v[1]); }}
        min={10}
        max={2000}
      />
      <Typography>₹{minPrice} – ₹{maxPrice}</Typography>
      <Divider sx={{ my: 2 }} />
      <Typography fontWeight={600} mb={1}>Minimum Rating</Typography>
      <Rating value={minRating} onChange={(_, v) => setMinRating(v || 0)} />
      <Divider sx={{ my: 2 }} />
      <FormControlLabel
        control={<Checkbox checked={discountFilter} onChange={(e) => setDiscountFilter(e.target.checked)} />}
        label="High demand items"
      />
      <Divider sx={{ my: 2 }} />
      <Button
        variant="contained"
        fullWidth
        onClick={() => { resetFilters(); setMobileFilterOpen(false); }}
        sx={{
          borderRadius: 2,
          bgcolor: mode === "light" ? "black" : "white",
          color: mode === "light" ? "white" : "black",
          mt: 2,
          textTransform: 'none'
        }}
      >
        Reset Filters
      </Button>
    </Box>
  );

  return (
    <Box 
      sx={{ 
        display: "flex", 
        flexDirection: { xs: "column", md: "row" }, 
        pt: { xs: 8, md: 12 }, 
        px: { xs: 2, md: 4 }, 
        gap: 4 
      }}
    >
      
      <Box sx={{ display: { xs: "none", md: "block" }, width: 280, position: "sticky", top: 100, height: "fit-content" }}>
        <Paper sx={{ p: 3, borderRadius: 3, bgcolor: mode === "light" ? "#fff" : "#121212" }} elevation={0} variant="outlined">
          {FilterContent}
        </Paper>
      </Box>

      <Box sx={{ flex: 1 }}>
        <Typography 
          variant="h5" 
          fontWeight={800} 
          sx={{ mb: 2, mt: { xs: 2, md: 0 } }}
        >
          {decodedName.toUpperCase()}
        </Typography>

        <Stack 
          direction="row" 
          spacing={1} 
          sx={{ 
            display: { xs: "flex", md: "none" }, 
            mb: 3, 
            position: 'sticky', 
            top: 60, 
            zIndex: 10, 
            bgcolor: 'background.default', 
            py: 1 
          }}
        >
          <Button 
            fullWidth 
            variant="outlined" 
            startIcon={<FilterListIcon />} 
            onClick={() => setMobileFilterOpen(true)}
            sx={{ 
              borderRadius: '8px', 
              textTransform: 'none', 
              color: mode === 'light' ? 'black' : 'white', 
              borderColor: 'divider',
              height: '40px'
            }}
          >
            Filters
          </Button>
          
          <TextField
            select
            SelectProps={{ native: true }}
            size="small"
            fullWidth
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            sx={{ 
              "& .MuiOutlinedInput-root": { borderRadius: '8px', height: '40px' } 
            }}
          >
            <option value="none">Sort By</option>
            <option value="low">Price: Low-High</option>
            <option value="high">Price: High-Low</option>
            <option value="newest">Newest</option>
            <option value="az">A-Z</option>
          </TextField>
        </Stack>

        <Box 
          sx={{ 
            display: "grid", 
            gridTemplateColumns: { xs: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }, 
            gap: 3 
          }}
        >
          {filtered.map((p) => (
            <Paper
              key={p.id}
              elevation={0}
              sx={{ 
                p: 2, 
                borderRadius: 3, 
                border: '1px solid', 
                borderColor: 'divider', 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <Box onClick={() => navigate(`/product/${p.id}`)} sx={{ cursor: 'pointer' }}>
                <img src={getImage(p.image)} alt={p.title} style={{ width: "100%", height: 200, objectFit: "contain", marginBottom: '16px' }} />
                <Typography fontWeight={700} sx={{ mb: 1 }}>
                  {p.title}
                </Typography>
                <Typography variant="h6" fontWeight={800}>₹{p.price}</Typography>
                <Rating value={(p as any)?.rating?.rate || 0} precision={0.5} readOnly size="small" />
              </Box>
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2, bgcolor: "black", color: "white", borderRadius: 2, fontWeight: 700, textTransform: 'none' }}
                onClick={() => navigate(`/product/${p.id}?buynow=true`)}
              >
                BUY NOW
              </Button>
            </Paper>
          ))}
        </Box>
      </Box>
      <Drawer
        anchor="bottom"
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        PaperProps={{ 
          sx: { 
            borderTopLeftRadius: 20, 
            borderTopRightRadius: 20, 
            p: 3, 
            maxHeight: '70vh' 
          } 
        }}
      >
        {FilterContent}
      </Drawer>
    </Box>
  );
}