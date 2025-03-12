
import { GetRepairAllApi } from '../AllGetApi'
import { Box, Button, Dialog, DialogActions, DialogContent, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material'
import { imageUrl } from '../ApiEndPoint'
import { useDispatch } from 'react-redux'
import { ChangeStatusOrder } from '../Store/ChangeStatusByOrderSlice'
import { useState } from 'react'
import { UploadRepairStatus } from '../AllPostApi'
import { LazyImage } from '../App'

const RepairAllOrders = () => {
    const { data } = GetRepairAllApi()

    const dispatch = useDispatch()


    return (
        <Box sx={{
            mt: 10
        }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Order Id</TableCell>
                        <TableCell>Customer Name</TableCell>
                        <TableCell>Customer Email</TableCell>
                        <TableCell>Customer Phone</TableCell>
                        <TableCell>Customer Address</TableCell>
                        <TableCell>Product Name</TableCell>
                        <TableCell>Product Price</TableCell>
                        <TableCell>Product Quantity</TableCell>
                        <TableCell>Product Total</TableCell>
                        <TableCell>Order Status</TableCell>
                        <TableCell>Images</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell>{item.orderId}</TableCell>
                            <TableCell>{item.createdBy?.userName}</TableCell>
                            <TableCell>{item.createdBy?.email}</TableCell>
                            <TableCell>{item.phone}</TableCell>
                            <TableCell>{item.address}</TableCell>
                            <TableCell>{item.product_name}</TableCell>
                            <TableCell>{item?.address}</TableCell>
                            <TableCell>{item?.amount}</TableCell>
                            <TableCell>{item?.orderId}</TableCell>
                            <TableCell>{item?.status}</TableCell>
                            <TableCell>
                                <LazyImage src={imageUrl + item.images} alt="Product" style={{ width: "100px", height: "100px" }} />
                            </TableCell>
                            <TableCell>
                                <button onClick={() => dispatch(ChangeStatusOrder(item._id))}>open</button>
                                <RejectStatus order_id={item._id || ""} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </Box>
    )
}

export default RepairAllOrders


const RejectStatus = ({ order_id }: { order_id: string }) => {
    const { mutateAsync } = UploadRepairStatus()
    const [open, setOpen] = useState(false);
    const [updateStatus, setUpdateStatus] = useState({
        status: "",
        reason: ""
    })

    const handleSubmit = async () => {
        try {
            await mutateAsync({ id: order_id, data: updateStatus });
            setOpen(false)
        } catch (error) {
            console.error("Update failed:", error);
        }
    };

    return (
        <>
            <button onClick={() => setOpen(true)}>
                Reject
            </button>
            <Dialog open={open} onClose={() => setOpen(false)} sx={{
                "& .MuiDialog-paper": {
                    width: "50%",
                    height: "50%"
                }
            }}>
                <DialogContent>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Status"
                            value={updateStatus.status}
                            onChange={(e) => setUpdateStatus({ ...updateStatus, status: e.target.value })}
                        >
                            <MenuItem value={"reject"}>Reject</MenuItem>
                        </Select>
                        <TextField
                            label="Reason"
                            multiline
                            rows={4}
                            value={updateStatus.reason}
                            onChange={(e) => setUpdateStatus({ ...updateStatus, reason: e.target.value })} />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog >
        </>

    )
}