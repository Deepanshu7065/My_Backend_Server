import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow

} from '@mui/material'
import React from 'react'
import { GetALlShopOrderApi } from '../AllGetApi'
import { useDispatch, useSelector } from 'react-redux'
import { imageUrl } from '../ApiEndPoint'
import { ChangeStatusOrder } from '../Store/ChangeStatusByOrderSlice'
import { ChangeShopsStatusOrder } from '../Store/ChangeShopsOrderStatusSlice'
import { RootState } from '../Store'
import { LazyImage } from '../App'

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
                                {/* <RejectStatus order_id={item._id || ""} /> */}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </Box>
    )
}

export default AllShopOrder