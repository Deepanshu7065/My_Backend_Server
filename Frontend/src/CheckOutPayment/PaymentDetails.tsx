import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../Store'
import { Box, CardContent, Card, Typography, TextField, Stack, Button, colors } from '@mui/material';
import { OrderCreateApi } from '../AllPostApi';

const PaymentDetails = () => {
    const { _id } = useSelector((state: RootState) => state?.AddAddressCustomer);
    const { deleveryCharge, discount } = useSelector((state: RootState) => state.ProductId)
    const products = useSelector((state: RootState) => state?.ProductId.products);
    const totalPrice = products.reduce((total, product) => total + product.price * product.quantity, 0);
    const totalQuantity = products.reduce((total, product) => total + product.quantity, 0);
    const { user } = useSelector((state: RootState) => state?.CustomerUser);
    const total = (totalPrice + (deleveryCharge ?? 0) - (discount ?? 0))
    const { mutateAsync: orderCreate } = OrderCreateApi()
    const [message, setMessage] = useState("")

    const [submitOrder, setSubmitOrder] = useState<{
        product_id: string[];
        address: string;
        deleveryCharge: number;
        discount: number;
        total: number;
        quantity: number;
        user: string;
    }>({
        product_id: [],
        address: "",
        deleveryCharge: 0,
        discount: 0,
        total: 0,
        quantity: 0,
        user: ""
    })

    useEffect(() => {
        setSubmitOrder({
            product_id: products?.map((p) => p.product_id._id) || [],
            address: _id || "",
            deleveryCharge: deleveryCharge ?? 0,
            discount: discount ?? 0,
            total,
            quantity: totalQuantity,
            user: user?._id
        })
    }, [products, user])

    if (!_id) {
        return (
            <>
                First use Address Go to AddressPage And check Icon
            </>
        )
    }


    console.log(_id)

    // const handleSubmitOrderCreate = async () => {
    //     try {
    //         const res = await orderCreate({
    //             data: submitOrder
    //         })
    //         if (res && res.status === 201) {
    //             setMessage(res.data.message)
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }


    return (
        <Box sx={{
            width: { xs: "100%", md: "100%" },
            height: "100%",
            display: "flex",
            flexDirection: "column",
            p: { xs: 1, md: 2 },
            minHeight: "70%",
            mb: 2,
            alignItems: "center",
        }}>
            {!message && (
                <Card sx={{
                    maxWidth: "600px",
                    minWidth: "600px",
                    height: "400px",
                    mt: 5,
                    borderRadius: "10px",
                }}>
                    <CardContent>
                        <Typography sx={{
                            display: "flex",
                            fontSize: "1.6rem",
                            fontWeight: "bold",
                            fontFamily: "monospace, cursive",
                            flexDirection: "column",
                            m: 3
                        }}>
                            CheckOut
                            <span style={{
                                fontSize: "0.8rem",
                                fontFamily: "monospace, cursive",
                                color: "GrayText"
                            }}>
                                Complete Your purchase - Total : {(totalPrice + (deleveryCharge ?? 0) - (discount ?? 0)) || 0}
                            </span>
                        </Typography>

                        <Typography sx={{
                            display: "flex",
                            fontFamily: "monospace, cursive",
                            flexDirection: "column",
                            m: 3,
                            fontSize: 13
                        }}>
                            Card Number
                            <span style={{ marginTop: 2 }}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    name="card_number"
                                    label="8938 8239 8332 9283"
                                    value={""}
                                />
                            </span>
                        </Typography>
                        <Stack direction="row" justifyContent="space-between" sx={{ m: 3 }}>
                            <Typography sx={{
                                display: "flex",
                                fontFamily: "monospace, cursive",
                                flexDirection: "column",
                                fontSize: 13
                            }}>
                                Expiry Date
                                <span style={{ marginTop: 2 }}>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        name="card_number"
                                        label="MM/YY"
                                        value={""}
                                    />
                                </span>
                            </Typography>
                            <Typography sx={{
                                display: "flex",
                                fontFamily: "monospace, cursive",
                                flexDirection: "column",
                                fontSize: 13
                            }}>
                                CVV
                                <span style={{ marginTop: 2 }}>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        name="card_number"
                                        label="CVV"
                                        value={""}
                                    />
                                </span>
                            </Typography>
                        </Stack>

                        <Stack direction={"row"} m={3} alignContent={"center"} justifyContent={"center"}>
                            <Button variant="contained" sx={{
                                bgcolor: colors.grey[800],
                                "&:hover": {
                                    bgcolor: "black",
                                },
                                fontWeight: "bold",
                                fontFamily: "monospace, cursive",
                                p: 1,
                                mt: 4,
                                borderRadius: "10px"
                            }}
                                // onClick={handleSubmitOrderCreate}
                                fullWidth>Pay Now</Button>
                        </Stack>

                    </CardContent>
                </Card>
            )}
            {message && (
                <>
                    Order Placed SuccessFull
                </>
            )}

        </Box>
    )
}

export default PaymentDetails