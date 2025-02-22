import { createSlice } from "@reduxjs/toolkit";


const ChangeStatusOrderSlice = createSlice({
    name: "ChangeStatusOrder",
    initialState: {
        order_id: "",
    },
    reducers: {
        ChangeStatusOrder: (state, action) => {
            state.order_id = action.payload;
        }
    }
})

export const { ChangeStatusOrder } = ChangeStatusOrderSlice.actions;
export default ChangeStatusOrderSlice.reducer