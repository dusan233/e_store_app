export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  type: string;
  type2: string;
  brand: string;
  quantityInStock: number;
}

export interface ProductParams {
  orderBy: string;
  searchTerm?: string;
  types: string[];
  types2: string[];
  brands: string[];
  pageNumber: number;
  pageSize: number;
}
