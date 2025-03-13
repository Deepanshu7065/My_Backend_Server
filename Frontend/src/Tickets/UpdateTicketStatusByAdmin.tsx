


import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../Store'
import { updateTicketStatus } from '../Store/UpdateTicketStatus'
import { TicketStatusChange } from '../AllPostApi'

const UpdateTicketStatusByAdmin = () => {
    const { ticket_id } = useSelector((state: RootState) => state.TicketStatus)
    const dispatch = useDispatch()
    const [status, setStatus] = React.useState('')
    const { mutateAsync } = TicketStatusChange()
    const handleStatusChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value);
    }

    const handleClose = () => {
        dispatch(updateTicketStatus(""))
    }

    const handleUpdateChangeStatus = async () => {
        console.log(status)
        try {
            const rs = await mutateAsync({ status: status, id: ticket_id })
            if (rs?.status === 200) {
                dispatch(updateTicketStatus(""))
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Dialog open={ticket_id !== ""} onClose={handleClose}>
            <DialogTitle>Update status Ticket</DialogTitle>

            <DialogContent>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="Status"
                    onChange={handleStatusChange}
                    sx={{
                        width: "100%",
                        mt: 2
                    }}
                >
                    <MenuItem value={"Pending"}>Pending</MenuItem>
                    <MenuItem value={"Resolved"}>Resolved</MenuItem>
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleUpdateChangeStatus}>Update</Button>
            </DialogActions>
        </Dialog>
    )
}

export default UpdateTicketStatusByAdmin