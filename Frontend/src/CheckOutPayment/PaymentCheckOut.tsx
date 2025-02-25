
import React, { useEffect } from 'react'
import { GetCartApi, GetMyOrderApi } from '../AllGetApi'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../Store'
import { setProductDetails } from '../Store/ProductDetailsSlice'
import { Box, Button } from '@mui/material'
import { OrderCreateApi } from '../AllPostApi'

const PaymentCheckOut = () => {
    const { data, isLoading } = GetCartApi()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setProductDetails(data as any))
    }, [data])
    const products = useSelector((state: RootState) => state?.ProductId.products)
    const { user } = useSelector((state: RootState) => state?.CustomerUser)
    const { mutateAsync } = OrderCreateApi()
    const [updateOrders, setUpdateOrders] = React.useState({
        product_id: [],
        quantity: 0,
        total: 0,
        user: user?._id
    })
    const { data: MyOrder } = GetMyOrderApi({ user_id: user?._id })

    useEffect(() => {
        setUpdateOrders({
            // i wiant in this product_id in his array so i have to find it and send in array all product_id
            product_id: [products?.map((p) => p.product_id._id)] as any,
            quantity: products?.reduce((acc, p) => acc + p.quantity, 0),
            total: products?.reduce((acc, item) => acc + Number(item.price ?? 0) * Number(item.quantity), 0),
            user: user?._id
        })
    }, [products, user])


    const handleSubmit = async () => {
        try {
            await mutateAsync({ data: updateOrders })

        } catch (error) {
            console.log(error)
        }
    }

    if (products?.length === 0 && isLoading) {
        return (
            <Box sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>

                <div>Cart is Empty</div>
            </Box>
        )
    }

    return (
        <Box sx={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Box sx={{
                width: "50%",
                height: "50%",
                border: "1px solid black"
            }}>

            </Box>
            <Button onClick={handleSubmit}>
                Submit
            </Button>
        </Box>
    )
}

export default PaymentCheckOut