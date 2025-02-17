import { createSlice, PayloadAction } from "@reduxjs/toolkit"
interface Product {
    _id: string;
    product_name: string;
    description: string;
    createdBy: string;
    price: string;
    quantity: number;
    image: string;
}
interface ProductDetailsState {
    products: Product[];
}

const initialState: ProductDetailsState = {
    products: []
}

const ProductDetailsSlice = createSlice({
    name: "productDetails",
    initialState,
    reducers: {
        setProductDetails: (state, action: PayloadAction<Product>) => {
            const product = action.payload;
            const existingProduct = state.products.find(p => p._id === product._id);
            if (!existingProduct) {
                state.products.push({ ...product, quantity: 0 });
            }
        },
        setIncreaseQuantity: (state, action: PayloadAction<string>) => {
            const product = state.products.find(p => p._id === action.payload);
            if (product) {
                product.quantity += 1;
            }
        },
        setDecreaseQuantity: (state, action: PayloadAction<string>) => {
            const product = state.products.find(p => p._id === action.payload);
            if (product && product.quantity > 1) {
                product.quantity -= 1;
            }
        },
        setRemoveProduct: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter(p => p._id !== action.payload);
        },
    }
})

export const { setProductDetails, setIncreaseQuantity, setDecreaseQuantity, setRemoveProduct } = ProductDetailsSlice.actions;
export default ProductDetailsSlice.reducer;
