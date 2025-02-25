import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
    _id: string;
    product_id: {
        _id: string,
        product_name: string,
        description: string,
        createdBy: string,
        price: number,
        quantity: number,
        image: string,
        brand: string,
        size: string,
        more_details: string,
        weight: number,
    };
    price: number;
    quantity: number;

}

interface ProductDetailsState {
    products: Product[];

}

const initialState: ProductDetailsState = {
    products: [],

};

const ProductDetailsSlice = createSlice({
    name: "productDetails",
    initialState,
    reducers: {
        setProductDetails: (state, action: PayloadAction<Product[]>) => {

            state.products = action.payload;
        },
        setIncreaseQuantity: (state, action: PayloadAction<string>) => {
            state.products = state.products.map((product) =>
                product.product_id._id === action.payload
                    ? { ...product, quantity: product.quantity + 1 }
                    : product
            );
        },
        setDecreaseQuantity: (state, action: PayloadAction<string>) => {
            state.products = state.products.map((product) =>
                product.product_id._id === action.payload && product.quantity > 1
                    ? { ...product, quantity: product.quantity - 1 }
                    : product
            );
        },
        setRemoveProduct: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter(
                (product) => product.product_id._id !== action.payload
            );
        },
    },
});

export const { setProductDetails, setIncreaseQuantity, setDecreaseQuantity, setRemoveProduct, } = ProductDetailsSlice.actions;
export default ProductDetailsSlice.reducer;
