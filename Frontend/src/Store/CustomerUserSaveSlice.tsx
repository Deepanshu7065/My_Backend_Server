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

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user") as string);
const initialState: CustomerUserState = {
    user: {
        _id: user ? user._id : "",
        userName: user ? user.userName : "",
        email: user ? user.email : "",
        phone: user ? user.phone : 0,
        userType: user ? user.userType : ""
    },
    token: token ? token : ""
}

const CustomerUserSlice = createSlice({
    name: "CustomerUser",
    initialState,
    reducers: {
        setCustomerUser: (state, action) => {
            state.user = action.payload
        },
        logoutCustomerUser: (state) => {
            state.user = {
                _id: "",
                userName: "",
                email: "",
                phone: 0,
                userType: ""
            }
            state.token = "",
                localStorage.removeItem("token")
            localStorage.removeItem("user")
        }
    }
})

export const { setCustomerUser, logoutCustomerUser } = CustomerUserSlice.actions
export default CustomerUserSlice.reducer