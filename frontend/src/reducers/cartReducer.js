import { createSlice } from "@reduxjs/toolkit";

const cartReducer = createSlice({
  name: "cart",
  initialState: {
    cartItem: localStorage.getItem("cartItem")
      ? JSON.parse(localStorage.getItem("cartItem"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
  reducers: {
    AddToCart: (state, action) => {
      const product = action.payload;
      const productIndex = state.cartItem.findIndex((item) => {
        return item.product === product.product;
      });

      if (productIndex >= 0) {
        state.cartItem[productIndex] = {
          ...state.cartItem[productIndex],
          quantity: state.cartItem[productIndex].quantity + product.quantity,
        };
      } else {
        state.cartItem.push(product);
      }
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
    },
    increaseQuantity: (state, action) => {
      const productIndex = state.cartItem.findIndex((item) => {
        return item.product === action.payload;
      });

       if (productIndex >= 0) {
        state.cartItem[productIndex] = {
          ...state.cartItem[productIndex],
          quantity: state.cartItem[productIndex].quantity + 1,
        };
      }

      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
    },
    decreaseQuantity: (state, action) => {
      const productIndex = state.cartItem.findIndex((item) => {
        return item.product === action.payload;
      });
       if (productIndex >= 0) {
        state.cartItem[productIndex] = {
          ...state.cartItem[productIndex],
          quantity: state.cartItem[productIndex].quantity - 1,
        };
      }

      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
    },
    deleteItem: (state, action) => {
      const product = state.cartItem.filter((item) => {
        return item.product.toString() !== action.payload.toString();
      });

      state.cartItem = product;
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
    },
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      localStorage.setItem("shippingInfo", JSON.stringify(action.payload));
    },
    clearCart: (state, action) => {
      state.cartItem = [];
      localStorage.cartItem("cartItem");
    },
  },
});

export const {
  AddToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
  saveShippingInfo,
  clearCart,
} = cartReducer.actions;
export default cartReducer.reducer;
