import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

export default function BannerCarousel() {
  const images = [
    "/slideshow/furniture.png",
    "/slideshow/electronics.png",
    "/slideshow/iwatch.png",
    "/slideshow/mensclothes.png",
    "/slideshow/kids.png",
    "/slideshow/iphone.png",
    "/slideshow/books.png",
    "/slideshow/sports.png",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((p) => (p + 1) % images.length);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <Box
      sx={{
        width: "100vw",    
        position: "relative",
        overflow: "hidden",
        padding: 0,
        margin: 0,
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",  
        marginRight: "-50vw",
        marginTop:"49px"
      }}>
      <Box
        component="img"
        src={images[index]}
        alt="banner"
        sx={{
          width: "100%",
          height: { xs: "30vh", sm: "50vh", md: "60vh", lg: "80vh" },
          objectFit: "cover",
          display: "block",
        }}/>
    </Box>
  );
}
