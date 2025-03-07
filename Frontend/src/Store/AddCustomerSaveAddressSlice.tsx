import { createSlice } from "@reduxjs/toolkit";

interface AddAddressCustomerState {
    address: {
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

}
const initialState: AddAddressCustomerState = {
    address: {
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
}
const AddAddressCustomerSlice = createSlice({
    name: "addAdress",
    initialState,
    reducers: {
        SetAddAddress: (state, action) => {
            state.address = action.payload

        }
    }
})

export const { SetAddAddress } = AddAddressCustomerSlice.actions;
export default AddAddressCustomerSlice.reducer