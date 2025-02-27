import { Box, CircularProgress, Stack, Typography, Stepper, Step, StepLabel } from '@mui/material';
import { GetRepairAllUserById } from '../AllGetApi';
import { imageUrl } from '../ApiEndPoint';

const ViewOrderDetails = ({ orderId }: { orderId: string }) => {
    const { data, isLoading } = GetRepairAllUserById({ id: orderId });

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

    if (!data) {
        return (
            <Typography variant="h5">No data available</Typography>
        );
    }

    return (
        <Box sx={{
            width: { xs: "100%", md: "100%" },
            height: "50vh",
            mt: 3,
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
                height: "100%"
            }}>
                {data?.status === "pending" && (
                    <Typography sx={{
                        color: "green"
                    }}>Your order will be picked up within 1-2 days.</Typography>
                )}
                {data?.status === "pickUp" && (
                    <Typography sx={{
                        color: "green"
                    }}>Your order has been picked up. It will be repaired within 2 days.</Typography>
                )}
                {data?.status === "in_progress" && (
                    <Typography sx={{
                        color: "green"
                    }}>Your order is being repaired. It will be completed within 2 days. </Typography>
                )}
                {data?.status === "reject" && (
                    <Typography sx={{
                        color: "red"
                    }}>
                        Your order is rejected. {data?.reason} please try again
                    </Typography>
                )}
                <Box sx={{ width: "90%", height: "300px", mb: 2 }}>
                    <img
                        src={`${imageUrl}${data?.images[0] || ""}`}
                        alt='repair'
                        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }}
                        loading='lazy'
                    />
                </Box>
                <Typography
                    sx={{
                        width: "90%",
                        fontSize: 20,
                        fontFamily: "'monospace', cursive",
                    }}
                >{data?.product_name}</Typography>
                <Stack sx={{ width: "90%", mt: 2, alignItems: "flex-start" }}>
                    <Typography sx={{
                        fontSize: 12,
                        fontFamily: "'monospace', cursive",
                    }}
                    ><strong>Order ID:</strong> {data?.orderId}</Typography>
                    <Typography sx={{
                        fontSize: 12,
                        fontFamily: "'monospace', cursive",
                    }}><strong>Amount:</strong> ${data?.amount}</Typography>
                </Stack>
                <Box sx={{
                    width: "90%",
                    display: "flex",
                    alignItems: "flex-start",
                    mt: 1,
                    justifyContent: "center",
                    // bgcolor: "white",
                    // boxShadow: 3,
                    flexDirection: "column",
                }}>
                    <Stack
                        spacing={5}
                        direction="row"
                        sx={{
                            width: "100%",
                            justifyContent: "space-between"
                        }}>
                        <Typography
                            sx={{
                                fontSize: 12
                            }}
                        >
                            <strong>Phone:</strong> {data?.phone}</Typography>
                    </Stack>
                    <Typography fontSize={12}>
                        <strong>Address:</strong> {data?.address}
                    </Typography>
                    <Stack spacing={5} direction="row" sx={{ width: "100%", justifyContent: "space-between" }}>
                        <Typography fontSize={12}>
                            <strong>Full Address:</strong> {data?.fullAddress}
                        </Typography>
                    </Stack>
                    <Typography fontSize={12}>
                        <strong>Landmark:</strong> {data?.landmark}
                    </Typography>
                    <Stack >
                        <Typography variant="body1"><strong>State:</strong> {data?.state}</Typography>
                        <Typography variant="body1"><strong>City:</strong> {data?.city}</Typography>
                        <Typography
                            fontSize={12}
                        ><strong>Pincode:</strong> {data?.pincode}</Typography>
                    </Stack>
                </Box>
                <Stepper
                    activeStep={getStatusIndex(data?.status || "pending")}
                    alternativeLabel
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
            </Box>
        </Box>
    );
};

export default ViewOrderDetails;
