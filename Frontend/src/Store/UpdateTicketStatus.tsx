import { createSlice } from "@reduxjs/toolkit";


const TicketStatusChange = createSlice({
    name: "ticketStatus",
    initialState: {
        ticket_id: ""
    },
    reducers: {
        updateTicketStatus: (state, action) => {
            state.ticket_id = action.payload
        }
    }
})

export const { updateTicketStatus } = TicketStatusChange.actions;
export default TicketStatusChange.reducer