import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store, RootState } from "./redux/store";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import { fetchProducts } from "./redux/productSlice";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";
import { pushNote } from "./redux/notificationSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./redux/store";

import React, { Suspense, lazy, useEffect, useState } from "react";

const TestPage = lazy(() => import("./pages/TestPage"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const MyOrders = lazy(() => import("./pages/MyOrders"));
const Account = lazy(() => import("./pages/Account"));
const Cart = lazy(() => import("./pages/Cart"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Error401 = lazy(() => import("./pages/Error401"));
const Error404 = lazy(() => import("./pages/Error404"));
const Error500 = lazy(() => import("./pages/Error500"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const CheckoutStep1 = lazy(() => import("./pages/CheckoutStep1"));
const CheckoutStep2 = lazy(() => import("./pages/CheckoutStep2"));
const CheckoutStep3 = lazy(() => import("./pages/CheckoutStep3"));
const AddAddress = lazy(() => import("./pages/AddAddress"));
const TrackOrder = lazy(() => import("./pages/TrackOrder"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const NoInternet = lazy(() => import("./pages/NoInternet"));

function Layout() {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/reset-password"||
    location.pathname === "/401" ||
    location.pathname === "/404" ||
    location.pathname === "/500"; 

  const mode = useSelector((state: RootState) => state.theme.mode);

  const theme = createTheme({
    palette: {
      mode,
      background: {
        default: mode === "dark" ? "#121212" : "#f5f5f5",
      },
    },
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const scheduled = JSON.parse(localStorage.getItem("scheduledNotifs") || "[]");
      const now = new Date();

      let changed = false;

      scheduled.forEach((n: any) => {
        if (!n.delivered && new Date(n.time) <= now) {
          if (Notification.permission === "granted") {
            new Notification("MyShop", { body: n.message, icon: "" });
          }

          dispatch(pushNote({ message: n.message, scheduledTime: n.time }));

          n.delivered = true;
          changed = true;
        }
      });

      if (changed) {
        localStorage.setItem("scheduledNotifs", JSON.stringify(scheduled));
      }
    }, 20000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.default",
        }}>
        {!hideLayout && <Navbar />}

        <Box sx={{ flex: 1 }}>
          <Suspense fallback={<div style={{ textAlign: "center", paddingTop: "90px",fontWeight:"600" }}>Loading...</div>}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/401" element={<Error401 />} />
              <Route path="/404" element={<Error404 />} />
              <Route path="/500" element={<Error500 />} />
              <Route path="/test" element={<TestPage />} />
              <Route path="*" element={<Error404 />} />

              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/product/:id"
                element={
                  <ProtectedRoute>
                    <ProductDetails />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/wishlist"
                element={
                  <ProtectedRoute>
                    <Wishlist />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/myorders"
                element={
                  <ProtectedRoute>
                    <MyOrders />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <Account />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <TrackOrder />
                  </ProtectedRoute>
                }
              />

              <Route path="/category/:name" element={<ProtectedRoute><CategoryPage /></ProtectedRoute>} />
              <Route path="/checkout/address" element={<ProtectedRoute><CheckoutStep1 /></ProtectedRoute>} />
              <Route path="/checkout/shipping" element={<ProtectedRoute><CheckoutStep2 /></ProtectedRoute>} />
              <Route path="/checkout/payment" element={<ProtectedRoute><CheckoutStep3 /></ProtectedRoute>} />
              <Route path="/address/new" element={<ProtectedRoute><AddAddress /></ProtectedRoute>} />
              
            </Routes>
          </Suspense>
        </Box>

        {!hideLayout && <Footer />}
      </Box>
    </ThemeProvider>
  );
}

function AppWrapper() {
  const [isOnline, setIsOnline] = useState(true);

  const checkInternet = async () => {
    try {
      await fetch("https://www.google.com/generate_204", { method: "GET", mode: "no-cors" });
      setIsOnline(true);
    } catch (e) {
      setIsOnline(false);
    }
  };

  useEffect(() => {
    checkInternet();
    window.addEventListener("online", checkInternet);
    window.addEventListener("offline", () => setIsOnline(false));

    return () => {
      window.removeEventListener("online", checkInternet);
      window.removeEventListener("offline", () => setIsOnline(false));
    };
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {isOnline ? <Layout /> : <NoInternet />}
    </Suspense>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AppWrapper />
        </LocalizationProvider>
      </BrowserRouter>
    </Provider>
  );
}
