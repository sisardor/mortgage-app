// /store/productsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../_types/Product";

type ProductsState = {
  items: Product[];
};

const initialState: ProductsState = {
  items: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;