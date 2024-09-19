import axios from "axios";
import { useEffect, useState } from "react";

const ProductApi = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {

    try {
      const res = await axios.get("/api/products");

      const productsData = res.data.products || [];
      setProducts(productsData);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  return {
    products:[products]
  };
};

export default ProductApi;
