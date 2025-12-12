import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Review {
  productId: number;
  rating: number;
  text: string;
  user: string;
  date: string;
}

interface ReviewState {
  reviews: Review[];
}

const initialState: ReviewState = {
  reviews: JSON.parse(localStorage.getItem("reviews") || "[]"),
};

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    addReview(state, action: PayloadAction<Review>) {
      state.reviews.push(action.payload);
      localStorage.setItem("reviews", JSON.stringify(state.reviews));
    },
  },
});

export const { addReview } = reviewSlice.actions;
export default reviewSlice.reducer;
