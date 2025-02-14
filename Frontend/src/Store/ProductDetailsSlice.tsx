
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ProductDetailsState {
    productId: {
        _id: string,
        product_name: string,
        description: string,
        createdBy: string,
        price: string,
        quantity: string,
        image: string,
    }
}

const initialState: ProductDetailsState = {
    productId: {
        _id: "",
        product_name: "",
        description: "",
        createdBy: "",
        price: "",
        quantity: "",
        image: "",
    }

}


const ProductDetailsSlice = createSlice({
    name: "productDetails",
    initialState,
    reducers: {
        setProductDetails: (state, action) => {
            state.productId = action.payload
        }
    }
})

export const { setProductDetails } = ProductDetailsSlice.actions
export default ProductDetailsSlice.reducer


