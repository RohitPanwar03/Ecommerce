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
  productDetailsReducer,
  updateProductReducer,
} from "../reducers/adminProductReducer";
import {
  adminUserReducer,
  deleteUserReducer,
  updateUserRoleReducer,
  userDetailsReducer,
} from "../reducers/adminUserReducer";
import {
  adminOrdersReducer,
  getOrderDetailReducer,
  updateOrderReducer,
} from "../reducers/adminOrdersReducer";

export const store = configureStore({
  reducer: {
    product: productReducer,
    productDetails: productDetailReducer,
    newReview: addNewReviewReducer,
    User: UserReducer,
    cart: cartReducer,
    Order: orderReducer,
    orderDetails: orderDetailsReducer,

    // Admin Users {Update, Get-Details, Delete}
    allUsers: adminUserReducer,
    deleteUsers: deleteUserReducer,
    getUserDetail: userDetailsReducer,
    updateUserRole: updateUserRoleReducer,

    // Admin Orders {Update, Get-Details}
    adminOrders: adminOrdersReducer,
    getOrderDetail: getOrderDetailReducer,
    updateOrder: updateOrderReducer,

    // Admin Products {Update, Delete, Create}
    adminProducts: adminProductReducer,
    newProduct: adminNewProductReducer,
    getProductDetails: productDetailsReducer,
    updateProducts: updateProductReducer,
    deleteProducts: deleteProductsReducer,
  },
});
