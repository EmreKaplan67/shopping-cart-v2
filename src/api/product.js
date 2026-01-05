import axios from "axios";

export const getProducts = async (category, searchTerm) => {
  const url =
    category === "all"
      ? "https://fakestoreapi.com/products"
      : `https://fakestoreapi.com/products/category/${category}`;
  const response = await axios.get(url);

  if (!searchTerm) return response.data;

  return response.data.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
