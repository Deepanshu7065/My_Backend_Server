import React from 'react'
import { Box, Stack, Typography, Button } from '@mui/material'
import { colors } from '@mui/material'
import { Discount, Home } from '@mui/icons-material'
import { RootState } from '../Store'
import { useDispatch, useSelector } from 'react-redux'
import { setAddDeleveryCharge, setDiscountAdd } from '../Store/ProductDetailsSlice'


const CheckAdRenderProduct = () => {
    const { products, deleveryCharge, discount } = useSelector((state: RootState) => state.ProductId)
    // console.log(products)
    const totalPrice = products.reduce((total, product) => total + product.price * product.quantity, 0);
    const totalQuantity = products.reduce((total, product) => total + product.quantity, 0);
    const { address } = useSelector((state: RootState) => state?.AddAddressCustomer);
    const dispatch = useDispatch()

    if (address) {
        dispatch(setAddDeleveryCharge(100))
        dispatch(setDiscountAdd(50))
    }


    return (
        <Box sx={{
            display: { xs: "none", sm: "none", md: "flex", lg: "flex" },
            width: { xs: "100%", lg: "40%" },
            flexDirection: "column",
            p: { xs: 1, md: 2 },
            minHeight: "100vh",
            bgcolor: colors.grey[200],
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Stack width={"70%"} sx={{ alignItems: "flex-start" }}>
                <Typography sx={{ fontSize: "1rem", fontFamily: "monospace, cursive" }}>
                    Total
                </Typography>
                <Typography sx={{ fontSize: "2rem", fontWeight: "bold" }}>
                    {/* rupy sign */}
                    &#x20B9;{totalPrice || 0}
                </Typography>
            </Stack>
            <Stack width={"60%"} mt={3} direction={"row"} justifyContent={"space-between"}>
                <Stack width={"100%"}>
                    <Stack width={"100%"} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                        <div>
                            <Typography sx={{ fontSize: "1rem", fontFamily: "monospace, cursive", fontWeight: "bold" }}>
                                Quantity
                            </Typography>
                            <Typography sx={{ fontSize: 12 }}>
                                Your all Quantity
                            </Typography>
                        </div>
                        <Typography>
                            {totalQuantity || 0}
                        </Typography>
                    </Stack>
                    <Stack width={"100%"} mt={5} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                        <div>
                            <Typography sx={{ fontSize: "1rem", fontFamily: "monospace, cursive", fontWeight: "bold" }}>
                                Add Address
                            </Typography>
                            <Typography sx={{ fontSize: 12 }}>
                                Add Your Home address
                            </Typography>
                        </div>
                        <Typography>
                            <Home />
                        </Typography>
                    </Stack>
                    <Stack width={"100%"} mt={5} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                        <div>
                            <Typography sx={{ fontSize: "1rem", fontFamily: "monospace, cursive", fontWeight: "bold" }}>
                                Discount
                            </Typography>
                            <Typography sx={{ fontSize: 12 }}>
                                Your Discount Your Products
                            </Typography>
                        </div>
                        <Typography sx={{
                            fontSize: "1rem",
                            fontWeight: "bold"
                        }}>
                            &#x20B9;{discount || 0}
                        </Typography>
                    </Stack>
                    <Stack width={"100%"} mt={5} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                        <div>
                            <Typography sx={{ fontSize: "1rem", fontFamily: "monospace, cursive", fontWeight: "bold" }}>
                                Delevry Charges
                            </Typography>
                            <Typography sx={{ fontSize: 12 }}>
                                Delever to your address
                            </Typography>
                        </div>
                        <Typography sx={{
                            fontSize: "1rem",
                            fontWeight: "bold"
                        }}>
                            &#x20B9;{deleveryCharge || 0}
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    )
}

export default CheckAdRenderProduct