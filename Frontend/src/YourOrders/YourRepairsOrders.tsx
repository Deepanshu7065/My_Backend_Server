import React from 'react'
import {
    Box,
    Tab,
    Tabs,
    Typography,
    CircularProgress,
    Stack,
    Button,
    Card,
    CardContent,
    useMediaQuery
} from '@mui/material'
import { useState } from 'react'
import { GetRepairById } from '../AllGetApi'
import { imageUrl } from '../ApiEndPoint'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { DeleteRepair } from '../AllPostApi'
import { useSelector } from 'react-redux'
import { RootState } from '../Store'
import moment from 'moment'
import ViewOrderDetails from './ViewOrderDetails'
import { Delete } from '@mui/icons-material'
import { LazyImage } from '../App'

const YourRepairsOrders = () => {
    const { user } = useSelector((state: RootState) => state.CustomerUser);
    const [id, setId] = useState<string | null>(null);
    const [value, setValue] = useState(0);
    const [status, setStatus] = useState("");
    const [orderId, setOrderId] = useState<string | null>("");
    const mobile = useMediaQuery("(max-width:600px)")
    const { mutateAsync: deleteRepair } = DeleteRepair()
    const navigate = useNavigate()

    useEffect(() => {
        if (user?._id) {
            setId(user._id);
        }
    }, [user]);

    const { data: order, isLoading, refetch } = GetRepairById({
        id: id || "",
        status: status,
        search: ""
    });

    useEffect(() => {
        if (order && order.length > 0 && !orderId) {
            setOrderId(order[0]._id);
        }
    }, [order, refetch]);

    const handleDelete = async (orderId: string) => {
        if (!window.confirm("Are you sure you want to delete this order?")) {
            return
        }
        try {
            await deleteRepair({ id: orderId })
            refetch()

        } catch (error) {
            console.log(error)

        }
    };

    return (
        <Box sx={{
            width: "100%",
            height: "100%",
            display: "flex",
        }}>
            <Box sx={{
                width: { xs: "100%", md: "50%" },
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}>
                <>
                    <Tabs
                        value={value}
                        onChange={(_, newValue) => setValue(newValue)}
                        variant="scrollable"
                        scrollButtons="auto"
                        allowScrollButtonsMobile
                        sx={{
                            mb: 3,
                            width: "100%",
                            maxWidth: 400,
                        }}>
                        <Tab sx={{
                            fontSize: "0.8rem"
                        }}
                            label="All"
                            onClick={() => setStatus("")} />
                        <Tab sx={{
                            fontSize: "0.8rem"
                        }}
                            label="Pending"
                            onClick={() => setStatus("pending")} />
                        <Tab sx={{
                            fontSize: "0.8rem"
                        }}
                            label="PickUp"
                            onClick={() => setStatus("pickUp")} />
                        <Tab sx={{
                            fontSize: "0.8rem"
                        }}
                            label="Processing"
                            onClick={() => setStatus("in_progress")} />
                        <Tab sx={{
                            fontSize: "0.8rem"
                        }}
                            label="Completed"
                            onClick={() => setStatus("completed")} />
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
                                        cursor: "pointer",
                                    }}
                                    onClick={() => setOrderId(item._id)}
                                >
                                    <CardContent>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography
                                                fontFamily={"monospace"}
                                            >
                                                OrderId: {item.orderId}</Typography>
                                            <Typography
                                                fontFamily={"monospace"}
                                                fontSize={"0.8rem"}
                                            >
                                                Status: <strong style={{
                                                    color: item.status === "pending" ? "red" : "green"
                                                }}>{item.status}</strong></Typography>
                                        </Stack>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
                                            <Typography
                                                fontSize={"0.8rem"}
                                            >
                                                Date:
                                                {moment(item.createdAt).format("DD-MM-YYYY")}</Typography>
                                            < Box >

                                                <LazyImage
                                                    src={`${imageUrl}/${item?.images[0]}`}
                                                    alt={`Image ${item.orderId}`}
                                                    style={{ width: 50, height: 50, objectFit: "cover" }}
                                                />

                                            </Box>
                                        </Stack>
                                        <Stack
                                            direction="row" sx={{
                                                justifyContent: "space-between"
                                            }}>
                                            {item.status === "pending" && (
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    startIcon={<Delete />}
                                                    onClick={() => handleDelete(item._id)}
                                                    sx={{ mt: 0, fontSize: 11 }}
                                                >
                                                    Delete Order
                                                </Button>
                                            )}
                                            {mobile && (
                                                <button style={{
                                                    border: "none",
                                                    backgroundColor: "transparent",
                                                    color: "black",
                                                    cursor: "pointer",
                                                    marginTop: "10px",
                                                    fontSize: "0.8rem",
                                                    fontFamily: "monospace",
                                                    textDecoration: "underline"
                                                }}
                                                    onClick={() => navigate("/view_status?orderId=" + item._id)}
                                                >
                                                    View
                                                </button>
                                            )}
                                        </Stack>
                                    </CardContent>
                                </Card>
                            ))}
                        </Stack>
                    )}
                </>
            </Box>
            {!mobile && (
                <ViewOrderDetails orderId={orderId || ""} />
            )}
        </Box>
    )
}

export default YourRepairsOrders