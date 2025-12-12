const BASE_URL = "https://fakestoreapi.com";

export const apiGetAllProducts = async () => {
  try {
    const res = await fetch(`${BASE_URL}/products`);

    if (!res.ok) {
      throw new Error(`Error ${res.status}`);
    }

    return await res.json();
  } catch (error: any) {
    throw error; 
  }
};

export const apiGetProductById = async (id: number | string) => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  return res.json();
};

export const apiGetCategories = async () => {
  const res = await fetch(`${BASE_URL}/products/categories`);
  return res.json();
};

export const apiGetProductsByCategory = async (category: string) => {
  const res = await fetch(`${BASE_URL}/products/category/${category}`);
  return res.json();
};

export const apiAddProduct = async (productData: any) => {
  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    body: JSON.stringify(productData),
  });
  return res.json();
};

export const apiUpdateProduct = async (id: number, productData: any) => {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(productData),
  });
  return res.json();
};

export const apiDeleteProduct = async (id: number) => {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
  });
  return res.json();
};


