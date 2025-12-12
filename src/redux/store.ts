import { configureStore } from "@reduxjs/toolkit";
import products from "./productSlice";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
import orderReducer from "./orderSlice";
import reviewReducer from "./reviewSlice";
import themeReducer from "./themeSlice";
import customWishlistReducer from "./customListsSlice";
import notificationReducer from "./notificationSlice";

export const store = configureStore({
  reducer: {
    products,
    cart: cartReducer,
    wishlist: wishlistReducer,
    orders: orderReducer,
    reviews: reviewReducer,
    theme: themeReducer,
    notifications: notificationReducer,    
    customLists: customWishlistReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


