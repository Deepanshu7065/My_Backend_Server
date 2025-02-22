
import { GetRepairAllApi } from '../AllGetApi'
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { imageUrl } from '../ApiEndPoint'
import { useDispatch } from 'react-redux'
import { ChangeStatusOrder } from '../Store/ChangeStatusByOrderSlice'

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
                    {data?.map((item: any) => (
                        <TableRow key={item._id}>
                            <TableCell>{item.orderId}</TableCell>
                            <TableCell>{item.createdBy?.userName}</TableCell>
                            <TableCell>{item.createdBy?.email}</TableCell>
                            <TableCell>{item.phone}</TableCell>
                            <TableCell>{item.address}</TableCell>
                            <TableCell>{item.product_name}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.total}</TableCell>
                            <TableCell>{item.status}</TableCell>
                            <TableCell>
                                <img src={imageUrl + item.images} alt="Product" style={{ width: "100px", height: "100px" }} />
                            </TableCell>
                            <TableCell>
                                <button onClick={() => dispatch(ChangeStatusOrder(item._id))}>open</button>
                                <button>Reject</button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </Box>
    )
}

export default RepairAllOrders