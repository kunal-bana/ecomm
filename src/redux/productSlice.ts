import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  apiGetAllProducts,
  apiGetProductsByCategory,
  apiGetProductById,
} from "../api/api";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string | string[];
  rating?: {
    rate: number;
    count: number;
  }
}

interface ProductState {
  items: Product[];
  productDetails: Product | null;
  selectedCategory: string;
  searchTerm: string;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  productDetails: null,
  selectedCategory: "",
  searchTerm: "",
  loading: false,
  error: null,
};


export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  return await apiGetAllProducts();
});

export const fetchProductDetails = createAsyncThunk(
  "products/details",
  async (id: string | number) => {
    return await apiGetProductById(id);
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  "products/byCategory",
  async (category: string) => {
    return await apiGetProductsByCategory(category);
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
    },

    setSearch(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },

    setProducts(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message?.includes("404")) {
          state.error = "Products not found (404)";
        } else if (action.error.message?.includes("500")) {
          state.error = "Server error, try again later (500)"
        } else {
          state.error = "Something went wrong";}
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        const p = action.payload;

        state.productDetails = {
          ...p,
          images: [typeof p.image === "string" ? p.image : p.image[0]],
        } as any;

        state.loading = false;
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load product details";
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductsByCategory.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load category products";
      });
  },
});

export const { setCategory, setSearch, setProducts } = productSlice.actions;

export default productSlice.reducer;
