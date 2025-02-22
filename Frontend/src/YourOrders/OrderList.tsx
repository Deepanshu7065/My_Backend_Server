import React, { useEffect, useState } from 'react';
import { RootState } from '../Store';
import { useSelector } from 'react-redux';
import { GetRepairById } from '../AllGetApi';
import { Box, Stack, Tab, Tabs, Typography, Card, CardContent, Button, CircularProgress, Divider } from '@mui/material';
import { imageUrl } from '../ApiEndPoint';
import { Delete } from '@mui/icons-material';
import ViewOrderDetails from './ViewOrderDetails';

const OrderList = () => {
    const { user } = useSelector((state: RootState) => state.CustomerUser);
    const [id, setId] = useState<string | null>(null);
    const [value, setValue] = useState(0);
    const [status, setStatus] = useState("");
    const [orderId, setOrderId] = useState<string | null>("");

    useEffect(() => {
        if (user?._id) {
            setId(user._id);
        }
    }, [user]);

    const { data: order, isLoading } = GetRepairById({
        id: id || "",
        status: status,
        search: ""
    });

    useEffect(() => {
        if (order && order.length > 0 && !orderId) {
            setOrderId(order[0]._id);
        }
    }, [order]);

    const handleDelete = (orderId: string) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            console.log("Deleting order: ", orderId);
            // Implement delete API call here
        }
    };

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100vw",
            height: "100%",
            p: { xs: 1, md: 4 },
            mt: 8
        }}>
            <Box sx={{
                width: { xs: "100%", md: "80%" },
                height: "100%",
                display: "flex",
                bgcolor: "grey.100",
                p: 2,
                minHeight: "85vh"
            }}>
                <Box sx={{
                    width: { xs: "100%", md: "50%" },
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <Typography variant="h4" gutterBottom>
                        Your Orders
                    </Typography>

                    <Tabs value={value} onChange={(_, newValue) => setValue(newValue)} sx={{ mb: 3 }}>
                        <Tab label="All" onClick={() => setStatus("")} />
                        <Tab label="Pending" onClick={() => setStatus("pending")} />
                        <Tab label="Processing" onClick={() => setStatus("in_progress")} />
                        <Tab label="Completed" onClick={() => setStatus("completed")} />
                    </Tabs>

                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        <Stack
                            spacing={1}
                            width="100%"
                            maxWidth={500}
                            sx={{
                                overflowY: "auto",
                                maxHeight: "70vh",
                            }}
                        >
                            {order?.map((item: any) => (
                                <Card
                                    key={item.orderId}
                                    sx={{
                                        p: 1,
                                        boxShadow: 3,
                                        height: "150px",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                    }}
                                    onClick={() => setOrderId(item._id)}
                                >
                                    <CardContent>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography >Order ID: {item.orderId}</Typography>
                                            <Typography>Status: <strong>{item.status}</strong></Typography>
                                        </Stack>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
                                            <Typography>Date: {new Date(item.createdAt).toLocaleDateString()}</Typography>
                                            <Box>

                                                <img
                                                    src={`${imageUrl}/${item?.images[0]}`}
                                                    alt={`Image ${item.orderId}`}
                                                    style={{ width: 50, height: 50, objectFit: "cover" }}
                                                />

                                            </Box>
                                        </Stack>
                                        {item.status === "pending" && (
                                            <Button
                                                variant="contained"
                                                color="error"
                                                startIcon={<Delete />}
                                                onClick={() => handleDelete(item.orderId)}
                                                sx={{ mt: 0 }}
                                            >
                                                Delete Order
                                            </Button>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </Stack>
                    )}
                </Box>
                <Box sx={{
                    width: { xs: "none", md: "70%" },
                    height: "70vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <ViewOrderDetails orderId={orderId || ""} />
                </Box>
            </Box>


        </Box>
    );
};

export default OrderList;
