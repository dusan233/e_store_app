import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import api from "../../app/api/agent";
import { User } from "../../app/models/user";

interface AccountState {
  user: User | null;
}

const initialState: AccountState = {
  user: null,
};

export const signInUser = createAsyncThunk<User, FieldValues>(
  "account/signInUser",
  async (data, thunkAPI) => {
    try {
      const user = await api.account.login(data);
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<User>(
  "account/signInUser",
  async (_, thunkAPI) => {
    try {
      const user = await api.account.currentUser();
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled),
      (state, action) => {
        state.user = action.payload;
      }
    );
    builder.addMatcher(
      isAnyOf(signInUser.rejected, fetchCurrentUser.rejected),
      (state, action) => {
        console.log(action.payload);
      }
    );
  },
});
