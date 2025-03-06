import { createSlice } from "@reduxjs/toolkit";

interface AddAddressCustomerState {
    _id: string
    product_id: string[];
    customer_name: string;
    last_name: string;
    quantity: number;
    total: number;
    user?: string;
    address: string;
    fullAddress: string;
    city: string;
    state: string;
    pincode: string;
    phone: Number;
    landmark: string;
    country: string
}
const initialState: AddAddressCustomerState = {
    _id: "",
    product_id: [],
    customer_name: "",
    last_name: "",
    quantity: 0,
    total: 0,
    user: "",
    address: "",
    fullAddress: "",
    city: "",
    state: "",
    pincode: "",
    phone: 0,
    landmark: "",
    country: ""
}
const AddAddressCustomerSlice = createSlice({
    name: "addAdress",
    initialState,
    reducers: {
        SetAddAddress: (state, action) => {
            state._id = action.payload
            state.product_id = action.payload
            state.customer_name = action.payload
            state.last_name = action.payload
            state.quantity = action.payload
            state.total = action.payload
            state.user = action.payload
            state.address = action.payload
            state.fullAddress = action.payload
            state.city = action.payload
            state.state = action.payload
            state.pincode = action.payload
            state.phone = action.payload
            state.landmark = action.payload
            state.country = action.payload

        }
    }
})

export const { SetAddAddress } = AddAddressCustomerSlice.actions;
export default AddAddressCustomerSlice.reducer