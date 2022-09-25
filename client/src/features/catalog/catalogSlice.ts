import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import api from "../../app/api/agent";
import { Product, ProductParams } from "../../app/models/product";
import { RootState } from "../../app/store/configureStore";

interface CatalogState {
  productsLoaded: boolean;
  filtersLoaded: boolean;
  status: string;
  brands: string[];
  types: string[];
  productParams: ProductParams;
}

const productsAdapter = createEntityAdapter<Product>();

function getAxiosParams(productParams: ProductParams) {
  const params = new URLSearchParams();
  params.append("pageNumber", productParams.pageNumber.toString());
  params.append("pageSize", productParams.pageSize.toString());
  params.append("orderBy", productParams.orderBy);
  if (productParams.searchTerm)
    params.append("searchTerm", productParams.searchTerm.toString());
  if (productParams.brands)
    params.append("brands", productParams.brands.toString());
  if (productParams.types)
    params.append("types", productParams.types.toString());

  return params;
}

export const fetchProductsAsync = createAsyncThunk<
  Product[],
  void,
  { state: RootState }
>("catalog/fetchProductsAsync", async (_, thunkAPI) => {
  const params = getAxiosParams(thunkAPI.getState().catalog.productParams);
  try {
    return await api.catalog.list(params);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const fetchProductAsync = createAsyncThunk<Product, number>(
  "catalog/fetchProductAsync",
  async (id, thunkAPI) => {
    try {
      return await api.catalog.details(id);
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err });
    }
  }
);

export const fetchFilters = createAsyncThunk(
  "catalog/fetchFilters",
  async (_, thunkAPI) => {
    try {
      return api.catalog.fetchFilters();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

function initParams() {
  return {
    pageNumber: 1,
    pageSize: 6,
    orderBy: "name",
  };
}

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: productsAdapter.getInitialState<CatalogState>({
    productsLoaded: false,
    filtersLoaded: false,
    status: "idle",
    brands: [],
    types: [],
    productParams: initParams(),
  }),
  reducers: {
    setProductParams: (state, action) => {
      state.productsLoaded = false;
      state.productParams = { ...state.productParams, ...action.payload };
    },
    resetProductParams: (state, action) => {
      state.productParams = initParams();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = "pendingFetchProducts";
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      productsAdapter.setAll(state, action.payload);
      state.status = "idle";
      state.productsLoaded = true;
    });
    builder.addCase(fetchProductsAsync.rejected, (state, action) => {
      state.status = "idle";
      console.log(action);
    });
    builder.addCase(fetchProductAsync.pending, (state) => {
      state.status = "pendingFetchProduct";
    });
    builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
      productsAdapter.upsertOne(state, action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchProductAsync.rejected, (state, action) => {
      state.status = "idle";
      console.log(action);
    });
    builder.addCase(fetchFilters.pending, (state) => {
      state.status = "pendingFetchFilters";
    });
    builder.addCase(fetchFilters.fulfilled, (state, action) => {
      state.brands = action.payload.brands;
      state.types = action.payload.types;
      state.status = "idle";
      state.filtersLoaded = true;
    });
    builder.addCase(fetchFilters.rejected, (state) => {
      state.status = "idle";
    });
  },
});

export const productSelectors = productsAdapter.getSelectors(
  (state: RootState) => state.catalog
);
export const { setProductParams, resetProductParams } = catalogSlice.actions;
