import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../reducers/productReducer";
import productDetailReducer from "../reducers/productDetailReducer";
import addNewReviewReducer from "../reducers/addNewReviewReducer";
import UserReducer from "../reducers/UserReducer";
import cartReducer from "../reducers/cartReducer";
import orderReducer from "../reducers/orderReducer";
import orderDetailsReducer from "../reducers/orderDetails";
import {
  adminProductReducer,
  adminNewProductReducer,
  deleteProductsReducer,
} from "../reducers/adminProductReducer";
import adminUserReducer from "../reducers/adminUserReducer";
import { adminOrdersReducer } from "../reducers/adminOrdersReducer";

export const store = configureStore({
  reducer: {
    product: productReducer,
    productDetails: productDetailReducer,
    newReview: addNewReviewReducer,
    User: UserReducer,
    cart: cartReducer,
    Order: orderReducer,
    orderDetails: orderDetailsReducer,
    adminProducts: adminProductReducer,
    allUsers: adminUserReducer,
    adminOrders: adminOrdersReducer,
    newProduct: adminNewProductReducer,
    deleteProducts: deleteProductsReducer,
  },
});
