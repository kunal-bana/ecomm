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
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import VoskVoice from "../components/VoskVoice";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import ReorderIcon from "@mui/icons-material/Reorder";

import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setSearch, setCategory } from "../redux/productSlice";
import { toggleTheme } from "../redux/themeSlice";

import NotificationBell from "../components/NotificationBell";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const goHome = () => {
    dispatch(setCategory(""));
    dispatch(setSearch(""));
    navigate("/");
    setMobileOpen(false);
  };

  const handleMobileNav = (path: string) => {
    setMobileOpen(false);
    navigate(path);
  };

  const searchValue = useSelector((s: RootState) => s.products.searchTerm);
  const allProducts = useSelector((s: RootState) => s.products.items);
  const mode = useSelector((s: RootState) => s.theme.mode);

  const cartCount = useSelector((s: RootState) =>
    s.cart.items.reduce((a, b) => a + b.quantity, 0)
  );
  const wishlistCount = useSelector(
    (s: RootState) => s.wishlist.items.length
  );

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileAnchor, setProfileAnchor] =
    useState<null | HTMLElement>(null);
  const [voiceStatus, setVoiceStatus] = useState<
    "idle" | "speak" | "process"
  >("idle");

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
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: { xs: 1, md: 3 },
            minHeight: 68,
          }}
        >
  
          <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", gap: 1 }}>
            <IconButton onClick={() => setMobileOpen(true)}>
              <MenuIcon />
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
          </Box>

          <Typography
            variant="h5"
            fontFamily="fantasy"
            fontWeight={800}
            sx={{ cursor: "pointer", whiteSpace: "nowrap" }}
            onClick={goHome}
          >
            MyShop
          </Typography>

          <Box
            sx={{
              display: { xs: "none", md: "block" },
              flex: 1,
              mx: 2,
              bgcolor: "#f3f3f3",
              px: 2,
              py: 0.8,
              borderRadius: "999px",
              maxWidth: 450,
              position: "relative",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <SearchIcon sx={{ opacity: 0.6 }} />
              <InputBase
                placeholder="Search for products..."
                value={
                  voiceStatus === "speak"
                    ? "Speak now…"
                    : voiceStatus === "process"
                    ? "Processing…"
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
                  left: 0,
                  right: 0,
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
        </Toolbar>

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
            <SearchIcon sx={{ opacity: 0.6 }} />
            <InputBase
              placeholder="Search for products..."
              value={searchValue}
              onChange={(e) => dispatch(setSearch(e.target.value))}
              sx={{ ml: 1, flex: 1 }}
            />
          </Box>
        </Box>
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 260,
            pt: 2,
          },
        }}
      >
        <List>
          <ListItemButton onClick={goHome}>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>

          <ListItemButton onClick={() => handleMobileNav("/myorders")}>
            <ListItemIcon><ReorderIcon /></ListItemIcon>
            <ListItemText primary="My Orders" />
          </ListItemButton>

          <ListItemButton onClick={() => handleMobileNav("/account")}>
            <ListItemIcon><AccountCircleIcon /></ListItemIcon>
            <ListItemText primary="My Account" />
          </ListItemButton>

          <ListItemButton
            onClick={() => {
              setMobileOpen(false);
              localStorage.removeItem("user");
              navigate("/login");
            }}
          >
            <ListItemIcon>
              <LogoutIcon sx={{ color: "red" }} />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ color: "red" }} />
          </ListItemButton>
        </List>
      </Drawer>

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
    </>
  );
}
