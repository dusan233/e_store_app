import { useEffect, useState } from "react";
import api from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.catalog
      .list()
      .then((products) => {
        setProducts(products);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent />;

  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default Catalog;
