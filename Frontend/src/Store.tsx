import { configureStore } from "@reduxjs/toolkit";
import ProductDetailsSlice from "./Store/ProductDetailsSlice";
import CustomerUserSlice from "./Store/CustomerUserSaveSlice";
import EditUserSlice from "./Store/EditUserSlice";




export const store = configureStore({
    reducer: {
        ProductId: ProductDetailsSlice,
        CustomerUser: CustomerUserSlice,
        EditUser: EditUserSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
