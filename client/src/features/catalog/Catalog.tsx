import { useEffect, useState } from "react";
import api from "../../app/api/agent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.catalog.list().then((products) => {
      setProducts(products);
    });
  }, []);

  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default Catalog;
