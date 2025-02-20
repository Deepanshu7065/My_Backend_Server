import { createSlice } from "@reduxjs/toolkit";


const EditProductSlice = createSlice({
    name: "editProductId",
    initialState: {
        product_id: "",
    },
    reducers: {
        setEditProductId: (state, action) => {
            state.product_id = action.payload
        }
    }
})

export const { setEditProductId } = EditProductSlice.actions
export default EditProductSlice.reducer