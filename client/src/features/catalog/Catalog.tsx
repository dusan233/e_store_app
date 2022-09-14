import { useState } from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default Catalog;
