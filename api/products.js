export default async function handler(req, res) {
  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({
        error: `External API failed with ${response.status}`,
      });
    }

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: error.message || "Internal Server Error",
    });
  }
}
