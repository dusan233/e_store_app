import { useEffect, useState } from "react";
import api from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";
import ProductList from "./ProductList";

const Catalog = () => {
  const products = useAppSelector(productSelectors.selectAll);
  const dispatch = useAppDispatch();
  const { productsLoaded, status } = useAppSelector((state) => state.catalog);

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded]);

  if (status === "pendingFetchProducts") return <LoadingComponent />;

  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default Catalog;
