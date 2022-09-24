import { Cart } from "../../app/models/cart";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../app/api/agent";

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
>("cart/addCartItemAsync", async ({ productId, quantity = 1 }) => {
  try {
    return await api.cart.addItem(productId, quantity);
  } catch (err) {
    console.log(err);
  }
});

export const removeCartItemAsync = createAsyncThunk<
  void,
  { productId: number; quantity: number; name?: string }
>("cart/removeCartItemAsync", async ({ productId, quantity }) => {
  try {
    return await api.cart.removeItem(productId, quantity);
  } catch (err) {
    console.log(err);
  }
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCartItemAsync.pending, (state, action) => {
      state.status = "pendingAddItem" + action.meta.arg.productId;
    });
    builder.addCase(addCartItemAsync.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.status = "idle";
    });
    builder.addCase(addCartItemAsync.rejected, (state, action) => {
      state.status = "idle";
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
  },
});

export const { setCart } = cartSlice.actions;
