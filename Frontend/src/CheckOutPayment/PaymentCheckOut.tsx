import React, { ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Store';
import { setProductDetails } from '../Store/ProductDetailsSlice';
import { GetCartApi } from '../AllGetApi';
import { OrderCreateApi } from '../AllPostApi';
import { Box, Button, Card, CardContent, Grid, Stack, TextField, Typography, CardMedia, Table, TableHead, TableRow, TableCell, TableBody, Paper, colors, useMediaQuery } from '@mui/material';
import { Footer } from '../User/AddUser';
import { LazyImage } from '../App';

const PaymentCheckOut = () => {
    const { user } = useSelector((state: RootState) => state?.CustomerUser);
    const { data } = GetCartApi({ id: user?._id || '' });
    const mobile = useMediaQuery("(max-width:600px)");

    const dispatch = useDispatch();
    const { mutateAsync } = OrderCreateApi();

    useEffect(() => {
        dispatch(setProductDetails(data as any));
    }, [data]);

    const products = useSelector((state: RootState) => state?.ProductId.products);

    const [updateOrders, setUpdateOrders] = React.useState<{
        product_id: string[];
        customer_name: string;
        quantity: number;
        total: number;
        user?: string;
        address: string;
        fullAddress: string;
        city: string;
        state: string;
        pincode: string;
        phone: Number;
        landmark: string;
    }>({
        product_id: [],
        customer_name: user?.userName || '',
        quantity: 0,
        total: 0,
        user: user?._id,
        address: '',
        fullAddress: '',
        city: '',
        state: '',
        pincode: '',
        phone: user?.phone || 0,
        landmark: ''
    });
    const totalQuantity = products?.reduce((acc, p) => acc + p.quantity, 0) || 0
    const totalPrice = products?.reduce((acc, item) => acc + Number(item.price ?? 0) * Number(item.quantity), 0) || 0
    useEffect(() => {
        setUpdateOrders({
            product_id: products?.map((p) => p.product_id._id) || [],
            customer_name: user?.userName || '',
            quantity: totalQuantity,
            total: totalPrice,
            user: user?._id,
            address: '',
            fullAddress: '',
            city: '',
            state: '',
            pincode: '',
            phone: user?.phone || 0,
            landmark: ''
        });
    }, [products, user]);

    const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdateOrders({
            ...updateOrders,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        try {
            await mutateAsync({ data: updateOrders });
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <Box
            sx={{
                p: { xs: 1, md: 4 },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: "100%",

            }}>
            <Box sx={{
                width: { xs: "100%", md: "80%" },
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: { xs: "80%", md: "62%" },
                alignContent: "center",
                gap: 1,
                zIndex: 1
                // mt: { xs: 7, md: 0 }
            }}>


                <Box sx={{
                    width: { xs: "100%", md: "50%" },
                    alignItems: "flex-start",
                    height: { xs: "100%", md: "100%" },
                }}>

                    {mobile && (<>
                        <Typography sx={{
                            fontWeight: "bold",
                            fontSize: "1rem",
                            mb: 2,
                            textAlign: "center",
                            // lightred
                            color: colors.green[300],
                            fontFamily: "'monospace',cursive"
                        }}>
                            CASH ON DELEVRY IS AVAILABLE
                        </Typography>
                        <Stack
                            direction={"row"}
                            width={"100%"}
                            justifyContent={"space-between"}
                            sx={{
                                bgcolor: "#050825", p: 2,
                                color: "white",
                                fontWeight: "bold"
                            }}
                        >
                            <span>
                                Total Quantity = {totalQuantity}
                            </span>
                            Total Price = {totalPrice}
                        </Stack>
                    </>
                    )}

                    <Card sx={{
                        p: 3,
                        boxShadow: 5,
                        height: { xs: "600px", md: "100%" },
                        width: "100%", alignItems: "flex-start"
                    }}>
                        <Typography
                            variant="h5"
                            sx={{
                                mb: 2,
                                textAlign: 'center',
                                fontWeight: 'bold',
                                fontFamily: "'monospace',cursive"
                            }}>
                            Place Order
                        </Typography>
                        <Stack spacing={2}>
                            <TextField
                                label="Customer Name"
                                name="customer_name"
                                value={updateOrders.customer_name}
                                onChange={handleChangeValue}
                                fullWidth
                            />
                            <TextField
                                label="Phone"
                                name="phone"
                                value={updateOrders.phone}
                                onChange={handleChangeValue}
                                fullWidth
                            />
                            <TextField
                                label="Address"
                                name="address"
                                value={updateOrders.address}
                                onChange={handleChangeValue}
                                fullWidth
                            />
                            <TextField
                                label="Full Address"
                                name="fullAddress"
                                value={updateOrders.fullAddress}
                                onChange={handleChangeValue}
                                fullWidth
                            />
                            <TextField
                                label="Landmark"
                                name="landmark"
                                value={updateOrders.landmark}
                                onChange={handleChangeValue}
                                fullWidth
                            />
                            <Stack
                                direction="row"
                                spacing={2}
                            >
                                <TextField
                                    label="City"
                                    name="city"
                                    value={updateOrders.city}
                                    onChange={handleChangeValue}
                                    fullWidth
                                    size="small"
                                />
                                <TextField
                                    size="small"
                                    label="State"
                                    name="state"
                                    value={updateOrders.state}
                                    onChange={handleChangeValue}
                                    fullWidth
                                />
                                <TextField
                                    label="Pincode"
                                    name="pincode"
                                    value={updateOrders.pincode}
                                    onChange={handleChangeValue}
                                    fullWidth
                                    size="small"
                                />
                            </Stack>
                        </Stack>

                        <Button variant="contained" color="primary" sx={{ mt: 3, width: '100%' }} onClick={handleSubmit}>
                            Submit Order
                        </Button>
                    </Card>
                </Box>

                {/* <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Product Price</TableCell>
                            <TableCell>Product Quantity</TableCell>
                            <TableCell>Product Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((data) => (
                            <TableRow>
                                <TableCell>{data?.product_id?.product_name}</TableCell>
                                <TableCell>{data?.product_id?.price}</TableCell>
                                <TableCell>{Number(data?.quantity)}</TableCell>
                                <TableCell>{Number(data?.price) * Number(data?.quantity)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table> */}
                {!mobile && <Box sx={{
                    width: "50%",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                }}>
                    <Stack
                        direction={"row"}
                        width={"100%"}
                        justifyContent={"space-between"}
                        sx={{
                            bgcolor: "#050825", p: 2,
                            color: "white",
                            fontWeight: "bold"
                        }}
                    >
                        <span>
                            Total Quantity = {totalQuantity}
                        </span>
                        Total Price = {totalPrice}
                    </Stack>
                    <Stack width={"100%"}
                        bgcolor={"#f2f2f2"}
                        // p={1}
                        height={"90%"}
                        boxShadow={5}
                        direction={"column"}
                        alignItems={"center"}
                        justifyContent={"space-between"}

                    >
                        <Stack sx={{
                            width: "100%",
                            display: "flex",
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <LazyImage src={"COD.webp"} alt="" style={{
                                width: "60%",
                                height: "70%",
                                borderRadius: "50%"
                            }} />
                        </Stack>
                        <Typography sx={{
                            fontWeight: "bold",
                            fontSize: "1.5rem",
                            mb: 2,
                            textAlign: "center",
                            // lightred
                            color: colors.green[400],
                            fontFamily: "'monospace',cursive"
                        }}>
                            CASH ON DELEVRY IS AVAILABLE
                        </Typography>
                    </Stack>

                </Box>}
            </Box>
            {!mobile && <Box sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                zIndex: 1
            }}>
                <Footer />
            </Box>}

        </Box >
    );
};

export default PaymentCheckOut;