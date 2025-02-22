import { Box, CircularProgress, Stack, Typography, Stepper, Step, StepLabel } from '@mui/material';
import React from 'react';
import { GetRepairAllUserById } from '../AllGetApi';
import { imageUrl } from '../ApiEndPoint';

const ViewOrderDetails = ({ orderId }: { orderId: string }) => {
    const { data, isLoading } = GetRepairAllUserById({ id: orderId });

    if (isLoading) {
        return <CircularProgress />;
    }

    const getStatusIndex = (status: string) => {
        switch (status) {
            case "pending": return 0;
            case "in_progress": return 1;
            case "completed": return 2;
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
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 2,
            height: "50vh"
        }}>
            <Box sx={{ width: "90%", height: "300px", mb: 2 }}>
                <img
                    src={`${imageUrl}${data?.images[0] || ""}`}
                    alt='repair'
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }}
                    loading='lazy'
                />
            </Box>
            <Typography variant="h5">{data?.product_name}</Typography>
            <Stack spacing={2} sx={{ width: "100%", justifyContent: "space-between" }} direction="row">
                <Typography variant="body1"><strong>Order ID:</strong> {data?.orderId}</Typography>
                <Typography variant="body1"><strong>Amount:</strong> ${data?.amount}</Typography>
            </Stack>
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
            }}>
                <Stack spacing={5} direction="row" sx={{ width: "100%", justifyContent: "space-between" }}>
                <Typography variant="body1"><strong>Phone:</strong> {data?.phone}</Typography>
                </Stack>
                    <Typography variant="body1"><strong>Address:</strong> {data?.address}</Typography>
                <Stack spacing={5} direction="row" sx={{ width: "100%", justifyContent: "space-between" }}>
                    <Typography variant="body1"><strong>Full Address:</strong> {data?.fullAddress}</Typography>
                </Stack>
                <Typography variant="body1"><strong>Landmark:</strong> {data?.landmark}</Typography>
                <Stack spacing={5} direction="row" sx={{ width: "100%", justifyContent: "space-between" }}>
                    <Typography variant="body1"><strong>State:</strong> {data?.state}</Typography>
                    <Typography variant="body1"><strong>City:</strong> {data?.city}</Typography>
                    <Typography variant="body1"><strong>Pincode:</strong> {data?.pincode}</Typography>
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
                }}>
                <Step><StepLabel>Pending</StepLabel></Step>
                <Step><StepLabel>Processing</StepLabel></Step>
                <Step><StepLabel>Completed</StepLabel></Step>
            </Stepper>
        </Box>
    );
};

export default ViewOrderDetails;
