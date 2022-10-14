import { Cart } from "../../app/models/cart";
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import api from "../../app/api/agent";
import { getCookie } from "../../app/util/util";

interface CartState {
  cart: Cart | null;
  status: string;
}

const initialState: CartState = {
  cart: null,
  status: "idle",
};

export const addCartItemAsync = createAsyncThunk<
  Cart,
  { productId: number; quantity?: number }
>("cart/addCartItemAsync", async ({ productId, quantity = 1 }, thunkAPI) => {
  try {
    return await api.cart.addItem(productId, quantity);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const removeCartItemAsync = createAsyncThunk<
  void,
  { productId: number; quantity: number; name?: string }
>("cart/removeCartItemAsync", async ({ productId, quantity }, thunkAPI) => {
  try {
    return await api.cart.removeItem(productId, quantity);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const fetchCartAsync = createAsyncThunk<Cart>(
  "cart/fetchCartAsync",
  async (_, thunkAPI) => {
    try {
      console.log("cartinjo");
      return await api.cart.get();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    clearCart: (state) => {
      state.cart = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCartItemAsync.pending, (state, action) => {
      state.status = "pendingAddItem" + action.meta.arg.productId;
    });

    builder.addCase(removeCartItemAsync.pending, (state, action) => {
      state.status =
        "pendingRemoveItem" + action.meta.arg.productId + action.meta.arg.name;
    });
    builder.addCase(removeCartItemAsync.fulfilled, (state, action) => {
      const { productId, quantity } = action.meta.arg;
      const itemIndex = state.cart?.items.findIndex(
        (i) => i.productId === productId
      );
      if (itemIndex === -1 || itemIndex === undefined) return;

      state.cart!.items[itemIndex].quantity -= quantity;

      if (state.cart?.items[itemIndex].quantity === 0)
        state.cart.items.splice(itemIndex, 1);

      state.status = "idle";
    });
    builder.addCase(removeCartItemAsync.rejected, (state, action) => {
      state.status = "idle";
    });
    builder.addMatcher(
      isAnyOf(addCartItemAsync.fulfilled, fetchCartAsync.fulfilled),
      (state, action) => {
        state.cart = action.payload;
        state.status = "idle";
      }
    );
    builder.addMatcher(
      isAnyOf(addCartItemAsync.rejected, fetchCartAsync.rejected),
      (state, action) => {
        state.status = "idle";
      }
    );
  },
});

export const { setCart, clearCart } = cartSlice.actions;
