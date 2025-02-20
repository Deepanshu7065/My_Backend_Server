import { configureStore } from "@reduxjs/toolkit";
import ProductDetailsSlice from "./Store/ProductDetailsSlice";
import CustomerUserSlice from "./Store/CustomerUserSaveSlice";
import EditUserSlice from "./Store/EditUserSlice";
import EditProductSlice from "./Store/EditProductSlice";




export const store = configureStore({
    reducer: {
        ProductId: ProductDetailsSlice,
        CustomerUser: CustomerUserSlice,
        EditUser: EditUserSlice,
        EditProduct: EditProductSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
