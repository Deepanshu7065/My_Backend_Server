import { createSlice } from "@reduxjs/toolkit";

interface CustomerUserState {
    user: {
        _id: string
        userName: string;
        email: string;
        phone: number;
        userType: string
    },
    token: string
}

const initialState: CustomerUserState = {
    user: {
        _id: "",
        userName: "",
        email: "",
        phone: 0,
        userType: ""
    },
    token: ""
}

const CustomerUserSlice = createSlice({
    name: "CustomerUser",
    initialState,
    reducers: {
        setCustomerUser: (state, action) => {
            state.user = action.payload
        },
    }
})

export const { setCustomerUser } = CustomerUserSlice.actions
export default CustomerUserSlice.reducer