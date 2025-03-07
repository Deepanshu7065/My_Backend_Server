import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../Store'
import { Box, CardContent, Card, Typography, TextField, Stack, Button, colors } from '@mui/material';
import { OrderCreateApi } from '../AllPostApi';

const PaymentDetails = () => {
    const { address } = useSelector((state: RootState) => state?.AddAddressCustomer);


    // if (!address?._id) {
    //     return (
    //         <>
    //             First use Address Go to AddressPage And check Icon
    //         </>
    //     )
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
                            Complete Your purchase - Total :
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


        </Box>
    )
}

export default PaymentDetails