import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function Footer() {
  const mode = useSelector((state: RootState) => state.theme.mode);

  return (
    <Box 
      sx={{
        width: "100%",
        overflowX: "hidden",   
        bgcolor: mode === "dark" ? "#0a0a0a" : "#111",
        color: "#fff",
        p: { xs: 3, md: 5 },
        mt: 6,
        borderTop: "1px solid #333",
        boxSizing: "border-box",
      }}>
      
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "center", md: "flex-start" },
          gap: 4,
          width: "100%",
          boxSizing: "border-box",
        }}>
        
        <Box
          sx={{
            maxWidth: { xs: "100%", md: "30%" },
            textAlign: { xs: "center", md:"justify"},
          }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            About Us
          </Typography>
          
          <Typography
            sx={{
              opacity: 0.8,
              fontSize: 14,
              lineHeight: 1.6,
              }}>
          We provide high quality fashion,electronics,home decor,mobiles and more. Our mission is to deliver a premium, smooth shopping experience with trusted suppliers and customers-first service.
          </Typography>
        </Box>

       
        <Box
          sx={{
            minWidth: { xs: "100%", md: 200 },
            textAlign: { xs: "center", md: "right" },
          }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            Contact Us
          </Typography>

          <Typography sx={{ opacity: 0.8, fontSize: 13 }}>
            support@myshop.com
          </Typography>
          <Typography sx={{ opacity: 0.8, fontSize: 13 }}>
            +91 8923135757
          </Typography>

          <Box sx={{ mt: 1 }}>
            <IconButton sx={{ color: "#fff" }}>
              <InstagramIcon
                onClick={() =>
                  window.open("https://www.instagram.com", "_blank")
                }/>
            </IconButton>

            <IconButton sx={{ color: "#fff" }}>
              <WhatsAppIcon
                onClick={() =>
                  window.open("https://www.whatsapp.com", "_blank")
                }/>
            </IconButton>

            <IconButton sx={{ color: "#fff" }}>
              <TwitterIcon
                onClick={() =>
                  window.open("https://www.twitter.com", "_blank")
                }/>
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Typography
        sx={{
          textAlign: "center",
          opacity: 0.6,
          mt: 4,
          fontSize: 13,
        }}>
        © 2025 MyShop — All Rights Reserved.
      </Typography>
    </Box>
  );
}
