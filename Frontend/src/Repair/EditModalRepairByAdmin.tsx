import React from 'react'
import { GetRepairAllUserById } from '../AllGetApi'
import { Dialog, DialogActions, DialogContent, Select, MenuItem, TextField, Button, SelectChangeEvent } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../Store'
import { ChangeStatusOrder } from '../Store/ChangeStatusByOrderSlice'
import { UploadRepairStatus } from '../AllPostApi'

const EditModalRepairByAdmin = () => {
    const dispatch = useDispatch()
    const { order_id } = useSelector((state: RootState) => state.ChangeStatusOrder)
    const { mutateAsync } = UploadRepairStatus()

    // State for updating status and rate
    const [updateStatus, setUpdateStatus] = React.useState({
        status: "",
        amount: "",
    })

    // Handle Select change correctly using SelectChangeEvent
    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        setUpdateStatus(prev => ({
            ...prev,
            status: event.target.value,
        }));
    }

    // Handle TextField change
    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUpdateStatus(prev => ({
            ...prev,
            [name]: name === "amount" ? Number(value) : value,
        }));
    }

    // Close the modal
    const handleClose = () => {
        dispatch(ChangeStatusOrder(""))
    }

    // Submit updated status
    const handleSubmit = async () => {
        try {
            await mutateAsync({ id: order_id, data: updateStatus });
            handleClose();
        } catch (error) {
            console.error("Update failed:", error);
        }
    };

    return (
        <Dialog
            open={order_id !== ""}
            sx={{
                "& .MuiDialog-paper": {
                    width: "50%",
                    height: "auto",
                    borderRadius: "10px"
                }
            }}
            onClose={handleClose}
        >
            <DialogContent>
                <Select
                    fullWidth
                    name="status"
                    value={updateStatus.status}
                    onChange={handleSelectChange}
                    displayEmpty
                >
                    <MenuItem value="" disabled>Select Status</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="pickUp">Pick Up</MenuItem>
                    <MenuItem value="in_progress">In Progress</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                </Select>

                <TextField
                    fullWidth
                    name="amount"
                    label="amount"
                    value={updateStatus.amount}
                    onChange={handleTextChange}
                    type="number"
                    margin="normal"
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="secondary">Cancel</Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">Submit</Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditModalRepairByAdmin;
