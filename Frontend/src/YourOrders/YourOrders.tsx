import {
    Box,
    Typography,
    CircularProgress,
    Stack,
    Button,
    Card,
    CardContent,
    useMediaQuery,
} from '@mui/material'

import { GetMyOrderApi } from '../AllGetApi'
import { useSelector } from 'react-redux'
import { RootState } from '../Store'
import moment from 'moment'
import { imageUrl } from '../ApiEndPoint'
import { Delete } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import ViewMyOrderDetails from './ViewMyOrderDetails'
import { useEffect, useState } from 'react'

const YourOrders = () => {
    const navigate = useNavigate()
    const { user } = useSelector((state: RootState) => state.CustomerUser)
    const [orderId, setOrderId] = useState("")
    const { data, isLoading, } = GetMyOrderApi({ user_id: user._id })
    const mobile = useMediaQuery("(max-width:600px)")

    useEffect(() => {
        if (data && data?.orders?.length > 0 && !orderId) {
            setOrderId(data?.orders[0]?._id || "");
        }
    }, [data]);

    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%"
        }}>
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
                        {/* <Tabs
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
                        </Tabs> */}

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
                                {data?.orders?.map((item: any) => (
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

                                                    <img
                                                        src={`${imageUrl}/${item?.product_id?.[0].image}`}
                                                        alt={`Image ${item?.orderId}`}
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
                                                        // onClick={() => handleDelete(item._id)}
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
                    <ViewMyOrderDetails order_id={orderId} />
                )}
            </Box>
        </Box>
    )
}

export default YourOrders