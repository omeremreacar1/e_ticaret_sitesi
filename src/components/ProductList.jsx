import React, { useEffect } from "react";
import { getAllProducts } from "../redux/slices/productSlice";
import { useSelector, useDispatch } from "react-redux";
import Product from "./Product";

function ProductList() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const { searchTerm } = useSelector((state) => state.search);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <div className={`flex flex-wrap gap-10 justify-center py-10`}>
      {(searchTerm === "" ? products : filteredProducts).map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
