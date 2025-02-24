import { Box, CircularProgress, Stack, Typography, Stepper, Step, StepLabel } from '@mui/material';
import { GetRepairAllUserById } from '../AllGetApi';
import { imageUrl } from '../ApiEndPoint';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Forward } from '@mui/icons-material';

const ViewOrderDetailsMobile = () => {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get("orderId");
    console.log(orderId)

    const { data, isLoading, error, refetch } = GetRepairAllUserById({ id: orderId || "" });

    useEffect(() => {
        console.log("Refetching API...");
        refetch();
    }, [orderId, refetch]);

    useEffect(() => {
        console.log("API Response Data:", data);
    }, [data]);

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
                {data?.status === "pending" && (
                    <Typography sx={{
                        color: "green",
                        fontSize: 12
                    }}>Your order will be picked up within 2 days</Typography>
                )}
                {data?.status === "pickUp" && (
                    <Typography sx={{
                        fontSize: 12,
                        color: "green",
                    }}>Your order has been picked up. </Typography>
                )}
                {data?.status === "in_progress" && (
                    <Typography sx={{
                        color: "green",
                        fontSize: 12
                    }}>Your order is being repaired. It will be completed within 2 days. </Typography>
                )}
                {data?.status === "reject" && (
                    <Typography sx={{
                        fontSize: 12,
                        color: "red",
                    }}>Your order has been rejected. {data?.reason} Please try again. </Typography>

                )}
                <Box sx={{ width: "90%", height: "300px", mb: 2 }}>
                    <img
                        src={`${imageUrl}${data?.images[0] || ""}`}
                        alt='repair'
                        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }}
                        loading='lazy'
                    />
                </Box>
                <Typography sx={{
                    fontSize: 17,
                    fontFamily: "monospace",
                }}>
                    {data?.product_name}
                </Typography>
                <Stack sx={{ width: "100%", alignItems: "flex-start", }}>
                    <Typography sx={{
                        fontSize: 12
                    }}>
                        <strong>Order ID:</strong>
                        {data?.orderId}
                    </Typography>
                    {data?.status !== "pending" && (
                        <Typography sx={{
                            color: "green",
                            fontSize: 12
                        }}>
                            {data?.amount ? `Amount: $${data?.amount}` : "Amount: $0"}
                        </Typography>
                    )}
                </Stack>
                <Stepper
                    activeStep={getStatusIndex(data?.status || "pending")}
                    orientation='vertical'
                    sx={{
                        mt: 4,
                        width: "100%",
                        position: "relative",
                        bottom: 5,
                        height: "100%",
                    }}
                >
                    {getSteps(data?.status || "pending").map((label) => (
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
                            Contact : {data?.phone}
                        </Typography>
                        <Typography sx={{
                            fontSize: 12
                        }}>
                            {data?.address}
                        </Typography>
                        <Typography sx={{
                            fontSize: 12
                        }}>
                            {data?.fullAddress}
                        </Typography>
                        <Typography sx={{
                            fontSize: 12
                        }}>
                            City : {data?.city}
                        </Typography>
                        <Typography sx={{
                            fontSize: 12
                        }}>
                            State : {data?.state}
                        </Typography>
                        <Typography sx={{
                            fontSize: 12
                        }}>
                            Pincode : {data?.pincode}
                        </Typography>
                    </Stack>
                </Box>

            </Box>
        </Box>
    );
};

export default ViewOrderDetailsMobile;
