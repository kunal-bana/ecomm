import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Box,
  Menu,
  MenuItem,
  Typography,
  Badge,
  Drawer,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";

import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setSearch, setCategory } from "../redux/productSlice";
import { toggleTheme } from "../redux/themeSlice";

import VoskVoice from "../components/VoskVoice";
import NotificationBell from "../components/NotificationBell";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const searchValue = useSelector((s: RootState) => s.products.searchTerm);
  const allProducts = useSelector((s: RootState) => s.products.items);
  const mode = useSelector((s: RootState) => s.theme.mode);

  const cartCount = useSelector((s: RootState) =>
    s.cart.items.reduce((a, b) => a + b.quantity, 0)
  );
  const wishlistCount = useSelector(
    (s: RootState) => s.wishlist.items.length
  );

  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState<
    "idle" | "speak" | "process"
  >("idle");

  const goHome = () => {
    dispatch(setCategory(""));
    dispatch(setSearch(""));
    navigate("/");
  };

  const suggestions = searchValue
    ? allProducts
        .filter((p: any) =>
          p.title.toLowerCase().includes(searchValue.toLowerCase())
        )
        .slice(0, 5)
    : [];

  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: "white", color: "black" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* LEFT */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              sx={{ display: { xs: "flex", md: "none" } }}
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              fontFamily="fantasy"
              fontWeight={800}
              sx={{ cursor: "pointer" }}
              onClick={goHome}
            >
              MyShop
            </Typography>
          </Box>

          {/* DESKTOP SEARCH */}
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              flex: 1,
              mx: 2,
              maxWidth: 450,
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "#f3f3f3",
                px: 2,
                py: 0.8,
                borderRadius: "999px",
              }}
            >
              <SearchIcon />
              <InputBase
                placeholder="Search products..."
                value={
                  voiceStatus === "speak"
                    ? "Speak now..."
                    : voiceStatus === "process"
                    ? "Processing..."
                    : searchValue
                }
                onChange={(e) => dispatch(setSearch(e.target.value))}
                sx={{ ml: 1, flex: 1 }}
              />
              <VoskVoice
                onText={(t) => dispatch(setSearch(t))}
                onListeningChange={setVoiceStatus}
              />
            </Box>

            {suggestions.length > 0 && (
              <Box
                sx={{
                  position: "absolute",
                  top: "110%",
                  width: "100%",
                  bgcolor: "white",
                  borderRadius: 2,
                  boxShadow: 3,
                  zIndex: 2000,
                }}
              >
                {suggestions.map((item: any) => (
                  <MenuItem
                    key={item.id}
                    onClick={() => dispatch(setSearch(item.title))}
                  >
                    {item.title}
                  </MenuItem>
                ))}
              </Box>
            )}
          </Box>

          {/* DESKTOP ICONS */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 2,
            }}
          >
            <IconButton onClick={goHome}>
              <HomeIcon />
            </IconButton>

            <IconButton onClick={() => navigate("/wishlist")}>
              <Badge badgeContent={wishlistCount} color="error">
                <FavoriteBorderIcon />
              </Badge>
            </IconButton>

            <IconButton onClick={() => navigate("/cart")}>
              <Badge badgeContent={cartCount} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <NotificationBell />

            <IconButton onClick={(e) => setProfileAnchor(e.currentTarget)}>
              <AccountCircleIcon />
            </IconButton>

            <IconButton onClick={() => dispatch(toggleTheme())}>
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Box>

          {/* MOBILE CART ICON */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={() => navigate("/cart")}>
              <Badge badgeContent={cartCount} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>

        {/* MOBILE SEARCH */}
        <Box sx={{ display: { xs: "block", md: "none" }, px: 2, pb: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "#f3f3f3",
              px: 2,
              py: 0.8,
              borderRadius: "999px",
            }}
          >
            <SearchIcon />
            <InputBase
              placeholder="Search products..."
              value={searchValue}
              onChange={(e) => dispatch(setSearch(e.target.value))}
              sx={{ ml: 1, flex: 1 }}
            />
          </Box>
        </Box>
      </AppBar>

      {/* PROFILE MENU */}
      <Menu
        anchorEl={profileAnchor}
        open={Boolean(profileAnchor)}
        onClose={() => setProfileAnchor(null)}
      >
        <MenuItem onClick={() => navigate("/myorders")}>My Orders</MenuItem>
        <MenuItem onClick={() => navigate("/account")}>My Account</MenuItem>
        <MenuItem
          sx={{ color: "red" }}
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/login");
          }}
        >
          Logout
        </MenuItem>
      </Menu>

      {/* MOBILE DRAWER */}
      <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: 250, p: 2 }}>
          <MenuItem onClick={goHome}>Home</MenuItem>
          <MenuItem onClick={() => navigate("/wishlist")}>Wishlist</MenuItem>
          <MenuItem onClick={() => navigate("/cart")}>Cart</MenuItem>
          <MenuItem onClick={() => navigate("/myorders")}>My Orders</MenuItem>
          <MenuItem onClick={() => navigate("/account")}>My Account</MenuItem>
          <MenuItem
            sx={{ color: "red" }}
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/login");
            }}
          >
            Logout
          </MenuItem>
        </Box>
      </Drawer>
    </>
  );
}
