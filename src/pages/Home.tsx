import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState,AppDispatch } from "../redux/store";
import ProductCard from "../components/ProductCard";
import BannerCarousel from "../components/BannerCarousel";
import { Box, Typography, Pagination } from "@mui/material";
import "../styles/animations.css";
import CategorySection from "../components/CategorySection";
import { fetchProducts } from "../redux/productSlice";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((s: RootState) => s.products.items);
  const selectedCategory = useSelector((s: RootState) => s.products.selectedCategory);
  const searchTerm = useSelector((s: RootState) => s.products.searchTerm);
  const mode = useSelector((s: RootState) => s.theme.mode);

  const filtered = items
    .filter((p: any) =>
      selectedCategory ? p.category.toLowerCase().includes(selectedCategory.toLowerCase()) : true
    )
    .filter((p: any) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const [page, setPage] = useState(1);
  const [direction, setDirection] = useState("right");
  const itemsPerPage = 7;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filtered.slice(startIndex, endIndex);

  useEffect(() => {
    setPage(1);
  }, [selectedCategory, searchTerm]);

  useEffect(() => {
  if (selectedCategory === "") {
    dispatch(fetchProducts());
  }
}, [selectedCategory, dispatch]);
  return (
    <Box
      sx={{
        width: "100%",
        p: { xs: 1, md: 2 },
        overflowX: "hidden",
      }}>
      <BannerCarousel />
      <CategorySection />
      
      <Typography
        variant="h5"
        sx={{
          mt: 3,
          textAlign: "center",
          fontWeight: 700,
          mb: 2,
        }}>
        {selectedCategory ? selectedCategory : "All"} Products
      </Typography>
           
      <Box
        className={direction === "right" ? "slide-left" : "slide-right"}
        sx={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: { xs: 2, sm: 3, md: 3 },
          px: 1,
          pb: 4,
        }}>
        {paginatedProducts.length === 0 ? (
          <Typography sx={{ textAlign: "center", mt: 5 }}>
            No products found.
          </Typography>
        ) : (
          paginatedProducts.map((p: any) => (
            <ProductCard
              key={p.id}
              id={p.id}
              title={p.title}
              price={p.price}
              image={p.image}/>
          ))
        )}
      </Box>

      {filtered.length > itemsPerPage && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <Pagination
            count={Math.ceil(filtered.length / itemsPerPage)}
            page={page}
            onChange={(e, value) => {
              setDirection(value > page ? "right" : "left");
              setPage(value);
            }}
            shape="rounded"
            sx={{
              mt: 2,
              "& .MuiPaginationItem-root": {
                color: mode === "light" ? "#000" : "#fff",
              },
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: mode === "light" ? "#000" : "#fff",
                color: mode === "light" ? "#fff" : "#000",
              },
            }}/>
        </Box>
      )}
    </Box>
  );
}
