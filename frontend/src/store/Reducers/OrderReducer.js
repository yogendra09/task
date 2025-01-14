import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  selectedProduct:null
};

export const orderReducer = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateOrder: (state, action) => {
      (state.orders = action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateOrder } = orderReducer.actions;

export default orderReducer.reducer;
