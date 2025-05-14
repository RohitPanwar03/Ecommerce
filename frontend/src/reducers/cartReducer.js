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
      console.log(action.payload);
      const productIndex = state.cartItem.findIndex((item) => {
        return item.id === product.id;
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
      const itemIndex = state.cartItem.findIndex((item) => {
        return item.id === action.payload;
      });

      state.cartItem[itemIndex] = {
        ...state.cartItem[itemIndex],
        quantity: (state.cartItem[itemIndex].quantity += 1),
      };

      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
    },
    decreaseQuantity: (state, action) => {
      const itemIndex = state.cartItem.findIndex((item) => {
        return item.id === action.payload;
      });
      state.cartItem[itemIndex] = {
        ...state.cartItem[itemIndex],
        quantity: state.cartItem[itemIndex].quantity - 1,
      };

      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
    },
    deleteItem: (state, action) => {
      const product = state.cartItem.filter((item) => {
        return item.id.toString() !== action.payload.toString();
      });

      state.cartItem = product;
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
    },
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      localStorage.setItem("shippingInfo", JSON.stringify(action.payload));
    },
  },
});

export const {
  AddToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
  saveShippingInfo,
} = cartReducer.actions;
export default cartReducer.reducer;
