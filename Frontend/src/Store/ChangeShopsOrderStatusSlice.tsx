import { createSlice } from "@reduxjs/toolkit";


const ChangeShopsStatusOrderSlice = createSlice({
    name: "ChangeShopsStatusOrder",
    initialState: {
        order_id: "",
    },
    reducers: {
        ChangeShopsStatusOrder: (state, action) => {
            state.order_id = action.payload;
        }
    }
})

export const { ChangeShopsStatusOrder } = ChangeShopsStatusOrderSlice.actions;
export default ChangeShopsStatusOrderSlice.reducer