import { configureStore } from "@reduxjs/toolkit";
import ProductDetailsSlice from "./Store/ProductDetailsSlice";




export const store = configureStore({
    reducer: {
        ProductId: ProductDetailsSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
