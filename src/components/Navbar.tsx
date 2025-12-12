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
} from "@mui/material";
import VoskVoice from "../components/VoskVoice";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

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
};
  const searchValue = useSelector((s: RootState) => s.products.searchTerm);
  const allProducts = useSelector((s: RootState) => s.products.items);

  const mode = useSelector((s: RootState) => s.theme.mode);
  const cartCount = useSelector((s: RootState) =>
    s.cart.items.reduce((a, b) => a + b.quantity, 0)
  );
  const wishlistCount = useSelector((s: RootState) => s.wishlist.items.length);
  const [voiceStatus, setVoiceStatus] = useState<"idle" | "speak" | "process">("idle");


  const suggestions = searchValue
  ? allProducts.filter((p: any) =>
      p.title.toLowerCase().includes(searchValue.toLowerCase())
    ).slice(0, 5)
  : [];


  const [catAnchor, setCatAnchor] = useState<null | HTMLElement>(null);
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);

  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "white",
        color: "black",
        boxShadow: 0,
        width: "100%",
        top: 0,
        left: 0,
        zIndex: 1100,
      }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          px: { xs: 1, md: 3 },
          minHeight: "68px", 
        }}>
        
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            variant="h5"
            fontFamily={"fantasy"}
            letterSpacing={1}
            sx={{fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap" }}
            onClick={() => {
              dispatch(setCategory(""));
              dispatch(setSearch(""));
              navigate("/");
            }}>
            MyShop
          </Typography>
          </Box>

        <Box sx={{flex: 1,mx: 2,bgcolor: "#f3f3f3",px: 2,py: 0.8,borderRadius: "999px",maxWidth: 450,position: "relative",boxShadow: "inset 0 1px 2px rgba(0,0,0,0.08)",}}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <SearchIcon sx={{ opacity: 0.6, color: "grey" }} />
            <InputBase
            placeholder="Search for products..."
            value={voiceStatus === "speak"? "Speak now…": voiceStatus === "process"? "Processing…": searchValue}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            sx={{ml: 1,flex: 1,color: "#555",fontSize: "15px",transition: "0.3s ease"}}/>
           <VoskVoice
           onText={(text) => dispatch(setSearch(text))}
           onListeningChange={(status) => setVoiceStatus(status)}/>
            </Box>
            {suggestions.length > 0 && (
              <Box
              sx={{position: "absolute",top: "110%",left: 0,right: 0,bgcolor: "white",borderRadius: "14px",boxShadow: "0 8px 25px rgba(0,0,0,0.12)",zIndex: 2000,overflow: "hidden",border: "1px solid #eee",}}>
                {suggestions.map((item: any) => (
                  <Box key={item.id}
                  onClick={() => dispatch(setSearch(item.title))}
                  sx={{display: "flex",alignItems: "center",gap: 1.5,px: 2,py: 1.2,cursor: "pointer",transition: "0.2s",
                    "&:hover": {
                      bgcolor: "#f5f5f5",
                    },
                  }}>
                    <Box
                    sx={{width: 8,height: 8,borderRadius: "50%",bgcolor: "grey.400",}}/>
                    <Typography
                    sx={{fontSize: "14px",color: "#333",whiteSpace: "nowrap",overflow: "hidden",textOverflow: "ellipsis",}}>
                      {item.title}
                    </Typography>
                    </Box>
                  ))}
                </Box>
              )}
        </Box>  
        <Menu anchorEl={catAnchor} open={Boolean(catAnchor)} onClose={() => setCatAnchor(null)}>
          <MenuItem
            onClick={() => {
              dispatch(setCategory(""));
              setCatAnchor(null);
              navigate("/");
            }}>
            All Products
          </MenuItem>
        </Menu>

        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          <IconButton style={{color:"black"}}
            size="small"
            onClick={goHome}>
            <HomeIcon />
          </IconButton>

          <IconButton style={{color:"black"}}
          onClick={() => navigate("/wishlist")}>
            <Badge badgeContent={wishlistCount} color="error">
              <FavoriteBorderIcon />
            </Badge>
          </IconButton>

          <IconButton style={{color:"black"}}
          onClick={() => navigate("/cart")}>
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <IconButton style={{color:"black"}}
           onClick={(e) => setProfileAnchor(e.currentTarget)}>
            <AccountCircleIcon />
          </IconButton>
          
          
          <NotificationBell/>

          <IconButton style={{color:"black"}}
          onClick={() => dispatch(toggleTheme())}>
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Box>

        <Menu
          anchorEl={profileAnchor}
          open={Boolean(profileAnchor)}
          onClose={() => setProfileAnchor(null)}>
          <MenuItem
            onClick={() => {
              navigate("/myorders");
              setProfileAnchor(null);
            }}>
            My Orders
          </MenuItem>

          <MenuItem
            onClick={() => {
              navigate("/account");
              setProfileAnchor(null);
            }}>
            My Account
          </MenuItem>

          <MenuItem
            sx={{ color: "red" }}
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/login");
            }}>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}