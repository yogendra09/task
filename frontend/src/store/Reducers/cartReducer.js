import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  selectedProduct:null
};

export const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {

    updateCart: (state, action) => {
      (state.cart = action.payload);
    },
    addProductToCart: (state, action) => {
        (state.cart.push(action.payload));
    },
    removeProductFromCart: (state, action) => {
        state.cart = state.cart.filter((product) => product._id!== action.payload._id);
    }
  },
});

// Action creators are generated for each case reducer function
export const {updateCart,addProductToCart,removeProductFromCart } = cartReducer.actions;

export default cartReducer.reducer;
