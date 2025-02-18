import { createSlice } from "@reduxjs/toolkit";


const EditUserSlice = createSlice({
    name: "user_id",
    initialState: {
        user_id: ""
    },
    reducers: {
        setUserId: (state, action) => {
            state.user_id = action.payload;
        }
    }

})

export const { setUserId } = EditUserSlice.actions
export default EditUserSlice.reducer