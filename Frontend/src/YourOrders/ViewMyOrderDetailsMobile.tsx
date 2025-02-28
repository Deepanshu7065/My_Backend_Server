import { Box, CircularProgress, Stack, Step, StepLabel, Stepper, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { GetSingleMyOrderApi } from '../AllGetApi';
import { Forward } from '@mui/icons-material';
import { imageUrl } from '../ApiEndPoint';

const ViewMyOrderDetailsMobile = () => {
    const location = useLocation();
    const queryParmas = new URLSearchParams(location.search);
    const orderId = queryParmas.get("orderId");

    const { data, isLoading, error, refetch } = GetSingleMyOrderApi({ id: orderId || "" })

    useEffect(() => {
        refetch()
    }, [refetch])

    if (isLoading) {
        return <CircularProgress />;
    }

    const getSteps = (status: string) => {
        if (status === "reject") {
            return ["Pending", "Rejected"];
        }
        return ["Pending", "PickUp", "Processing", "Completed"];
    };

    const getStatusIndex = (status: string) => {
        switch (status) {
            case "pending": return 0;
            case "pickUp": return 1;
            case "reject": return 1;
            case "in_progress": return 2;
            case "completed": return 3;
            default: return 0;
        }
    };

    if (isLoading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography variant="h5" color="error">Error fetching data</Typography>;
    }

    if (!data) {
        return <Typography variant="h5">No data available</Typography>;
    }

    const totalAmount = data?.order?.product_id?.reduce((total, product) => total + (product?.price ?? 0), 0);
    return (
        <Box sx={{
            width: { xs: "100%", md: "100%" },
            height: "97vh",
            display: { md: "flex" },
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Box sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 2,
                height: "100vh",
                mt: 7,
                textAlign: "center",
                wordBreak: "break-word",
                overflow: "auto",
                mb: 2
            }}>
                <Forward sx={{ fontSize: 18, color: "black", cursor: "pointer", alignSelf: "flex-end" }} onClick={() => window.history.back()} />
                {data?.order?.status === "Pending" && (
                    <Typography sx={{
                        color: "green",
                        fontSize: 12
                    }}>Your order will be Picking up within 2 days</Typography>
                )}
                {data?.order?.status === "pickUp" && (
                    <Typography sx={{
                        fontSize: 12,
                        color: "green",
                    }}>Your order has been picked up. </Typography>
                )}
                {data?.order.status === "in_progress" && (
                    <Typography sx={{
                        color: "green",
                        fontSize: 12
                    }}>Your order is being repaired. It will be completed within 2 days. </Typography>
                )}
                {data?.order?.status === "reject" && (
                    <Typography sx={{
                        fontSize: 12,
                        color: "red",
                    }}>Your order has been rejected. {data?.order?.reason} Please try again. </Typography>

                )}
                <Box sx={{
                    width: "100%",
                    maxHeight: "400px",
                    minHeight: "350px",
                    borderRadius: 4,
                    display: "flex",
                    flexWrap: "nowrap",
                    overflowX: "auto",
                    "&::-webkit-scrollbar": {
                        width: "100%",
                        height: "8px",
                    }
                }}>
                    {data?.order?.product_id?.map((data) => (
                        <>
                            <Box sx={{
                                width: "300px",
                                height: "fit-content",
                                p: 1,
                                flexShrink: 0,
                                boxShadow: 1,
                                mr: 2,
                                display: "flex",
                                flexDirection: "column",
                            }}>
                                <img
                                    src={`${imageUrl}${data?.image || ""}`}
                                    alt='repair'
                                    style={{ width: "300px", height: "200px", objectFit: "cover", borderRadius: 4 }}
                                    loading='lazy'
                                />
                                <Stack sx={{ width: "100%" }} >
                                    <Typography sx={{
                                        fontSize: 12,
                                        fontWeight: 600,
                                        mt: 1
                                    }}>
                                        {data?.product_name}
                                    </Typography>
                                    <Stack
                                        direction="row"
                                        sx={{
                                            width: "100%",
                                            justifyContent: "space-between"
                                        }} mt={2}>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "flex-start",
                                        }}>
                                            <Typography
                                                sx={{
                                                    fontSize: 12,
                                                    fontFamily: "monospace"
                                                }}
                                            >
                                                Price
                                            </Typography>
                                            <Typography sx={{
                                                fontSize: 12,
                                                fontFamily: "monospace"
                                            }}>
                                                Size
                                            </Typography>
                                            <Typography sx={{
                                                fontSize: 12,
                                                fontFamily: "monospace"
                                            }}>
                                                Brand
                                            </Typography>
                                            <Typography sx={{
                                                fontSize: 12,
                                                fontFamily: "monospace"
                                            }}>
                                                Quantity
                                            </Typography>
                                        </div>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "flex-end",
                                            marginRight: "10px"
                                        }}>
                                            <Typography sx={{
                                                fontSize: 12,
                                                fontFamily: "monospace"
                                            }}>
                                                {data?.price}
                                            </Typography>
                                            <Typography sx={{
                                                fontSize: 12,
                                                fontFamily: "monospace"
                                            }}>
                                                {data?.size}
                                            </Typography>
                                            <Typography sx={{
                                                fontSize: 12,
                                                fontFamily: "monospace"
                                            }}>
                                                {data?.brand}
                                            </Typography>
                                            <Typography sx={{
                                                fontSize: 12,

                                            }}>
                                                {data?.quantity}
                                            </Typography>
                                        </div>
                                    </Stack>
                                </Stack>
                            </Box>


                        </>
                    ))}
                </Box>

                <Stack sx={{ width: "100%", alignItems: "flex-start", }}>
                    <Typography sx={{
                        fontSize: 12
                    }}>
                        <strong>Order ID:</strong>
                        {data?.order?.orderId}
                    </Typography>
                    {data?.order.status !== "pending" && (
                        <Typography sx={{
                            color: "green",
                            fontSize: 12
                        }}>
                            Amount : &nbsp;{`${totalAmount} `}
                        </Typography>
                    )}
                </Stack>
                <Stepper
                    activeStep={getStatusIndex(data?.order?.status || "pending")}
                    orientation='vertical'
                    sx={{
                        mt: 4,
                        width: "100%",
                        position: "relative",
                        bottom: 5,
                        height: "100%",
                    }}
                >
                    {getSteps(data?.order.status || "pending").map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Box sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-start",
                    mt: 2,
                    // justifyContent: "space-between",
                    bgcolor: "white",
                    p: 2,
                    boxShadow: 3,
                    flexDirection: "column",
                    height: "100%"
                }}>
                    <Typography sx={{ fontSize: 17, fontFamily: "monospace", mb: 2, alignSelf: "center" }}>
                        your Details :-
                    </Typography>
                    <Stack sx={{ width: "100%", alignItems: "flex-start", }}>
                        <Typography sx={{
                            fontSize: 12
                        }}>
                            Contact : {data?.order.phone}
                        </Typography>
                        <Typography sx={{
                            fontSize: 12
                        }}>
                            {data?.order?.address}
                        </Typography>
                        <Typography sx={{
                            fontSize: 12
                        }}>
                            {data?.order?.fullAddress}
                        </Typography>
                        <Typography sx={{
                            fontSize: 12
                        }}>
                            City : {data?.order?.city}
                        </Typography>
                        <Typography sx={{
                            fontSize: 12
                        }}>
                            State : {data?.order?.state}
                        </Typography>
                        <Typography sx={{
                            fontSize: 12
                        }}>
                            Pincode : {data?.order?.pincode}
                        </Typography>
                    </Stack>
                </Box>

            </Box>
        </Box>
    )
}

export default ViewMyOrderDetailsMobile