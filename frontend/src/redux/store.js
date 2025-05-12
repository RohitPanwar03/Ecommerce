import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../reducers/productReducer";
import productDetailReducer from "../reducers/productDetailReducer";
import addNewReviewReducer from "../reducers/addNewReviewReducer";
import UserReducer from "../reducers/UserReducer";

export const store = configureStore({
  reducer: {
    product: productReducer,
    productDetails: productDetailReducer,
    newReview: addNewReviewReducer,
    User: UserReducer,
  },
});
