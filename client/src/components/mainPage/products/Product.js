import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductList from "../utils/ProductLists/ProductList";

export const Product = () => {
  const state = useContext(GlobalState);

  const isAdmin = state.userApi?.isAdmin ?? false;

  const productsApi = state.productsApi || {};

  const [products] = productsApi.products || [[], () => {}];

  const productList = Array.isArray(products) ? products : [];

  return (
    <div className="products">
      {productList.length > 0 ? (
        productList.map((product) => (
          <ProductList
            key={product._id}
            product={product}
            image={product.image}
            isAdmin={isAdmin}
          />
        ))
      ) : (
        <div>No products available</div>
      )}
    </div>
  );
};
