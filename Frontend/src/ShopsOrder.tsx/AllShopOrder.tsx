import {
    Box,
    Button,
    Dialog,
    DialogContent,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField

} from '@mui/material'
import  { useState } from 'react'
import { GetALlShopOrderApi } from '../AllGetApi'
import { useDispatch,  } from 'react-redux'
import { imageUrl } from '../ApiEndPoint'
import { ChangeShopsStatusOrder } from '../Store/ChangeShopsOrderStatusSlice'
import { LazyImage } from '../App'
import { ChangeShopsOrderStatus } from '../AllPostApi'

const AllShopOrder = () => {

    const { data } = GetALlShopOrderApi()

    const dispatch = useDispatch()


    return (
        <Box sx={{
            mt: 11
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
                    {data?.orders?.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell>{item.orderId}</TableCell>
                            <TableCell>{item.user?.userName}</TableCell>
                            <TableCell>{item.user?.email}</TableCell>
                            <TableCell>{item.address?.phone}</TableCell>
                            <TableCell>{item.address?.address}</TableCell>
                            <TableCell>{item.product_id[0]?.product_name}</TableCell>
                            <TableCell>{item?.address?.address}</TableCell>
                            <TableCell>{item?.quantity}</TableCell>
                            <TableCell>{item?.orderId}</TableCell>
                            <TableCell>{item?.status}</TableCell>
                            <TableCell>
                                <LazyImage src={imageUrl + item.product_id[0]?.image} alt="Product" style={{ width: "100px", height: "100px" }} />
                            </TableCell>
                            <TableCell>
                                <button onClick={() => dispatch(ChangeShopsStatusOrder(item._id))}>open</button>
                                <RejectStatus order_id={item._id || ""} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </Box>
    )
}

export default AllShopOrder

const RejectStatus = ({ order_id }: any) => {
    const { mutateAsync } = ChangeShopsOrderStatus()
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
                    height: "auto"
                }
            }}>
                <DialogContent>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <TextField label="Status" name="status" onChange={(e) => setUpdateStatus({ ...updateStatus, status: e.target.value })} />
                        <TextField label="Reason" name="reason" onChange={(e) => setUpdateStatus({ ...updateStatus, reason: e.target.value })} />
                        <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    )


}