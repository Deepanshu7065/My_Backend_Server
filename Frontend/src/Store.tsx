import { configureStore } from "@reduxjs/toolkit";
import ProductDetailsSlice from "./Store/ProductDetailsSlice";
import CustomerUserSlice from "./Store/CustomerUserSaveSlice";
import EditUserSlice from "./Store/EditUserSlice";
import EditProductSlice from "./Store/EditProductSlice";
import ChangeStatusOrderSlice from "./Store/ChangeStatusByOrderSlice";




export const store = configureStore({
    reducer: {
        ProductId: ProductDetailsSlice,
        CustomerUser: CustomerUserSlice,
        EditUser: EditUserSlice,
        EditProduct: EditProductSlice,
        ChangeStatusOrder: ChangeStatusOrderSlice,
        
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
