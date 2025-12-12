import { Box, Typography, Card, CardContent, CardMedia, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { addToCart } from "../redux/cartSlice";
import AddIcon from "@mui/icons-material/Add";

export default function FrequentlyBoughtTogether() {
  const dispatch = useDispatch();
  const allProducts = useSelector((s: RootState) => s.products.items);
  const cart = useSelector((s: RootState) => s.cart.items);

  if (cart.length === 0) return null;

  const item = cart[0];

  let recommended: any[] = [];

  const addUnique = (arr: any[]) => {
    arr.forEach((p) => {
      if (!recommended.some((x) => x.id === p.id) && p.id !== item.id) {
        recommended.push(p);
      }
    });
  };

  if (item.category) {
    const catMatches = allProducts.filter(
      (p) =>
        p.category?.toLowerCase() === item.category?.toLowerCase() &&
        p.id !== item.id
    );
    addUnique(catMatches);
  }
  recommended = recommended.slice(0, 4);

  if (recommended.length === 0) return null;

  return (
    <Box mt={5}>
      <Typography variant="h6" mb={2}>Frequently Bought Together</Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        {recommended.map((p) => (
          <Card
            key={p.id}
            sx={{
              width: 200,
              borderRadius: 2,
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}>
            <CardMedia
              component="img"
              height="120"
              style={{ objectFit: "contain", padding: 10 }}
              image={p.image}/>

            <CardContent>
              <Typography
                fontSize={14}
                overflow={"hidden"}
                textOverflow="ellipsis"
                whiteSpace="nowrap">
                {p.title}
              </Typography>

              <Typography fontWeight={700}>₹{p.price}</Typography>

              <Button
                variant="contained"
                style={{
                  color: "black",
                  backgroundColor: "white",
                  marginTop: 10,
                }}
                size="medium"
                onClick={() => dispatch(addToCart(p))}>
                <AddIcon /> Add
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
