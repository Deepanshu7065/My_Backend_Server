import { Box, Card, Stack, Step, StepLabel, Stepper, Typography } from '@mui/material'
import React from 'react'
import { GetSingleMyOrderApi } from '../AllGetApi'
import { imageUrl } from '../ApiEndPoint'

const ViewMyOrderDetails = ({ order_id }: { order_id: string }) => {
    const { data, isLoading } = GetSingleMyOrderApi({ id: order_id })

    const totalAmount = data?.order?.product_id?.reduce((total, product) => total + (product?.price ?? 0), 0);

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

    return (
        <Box sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 1
        }}>
            <Typography style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "10px",
                color: "black",
                fontFamily: "'monospace', sans-serif",
            }}>
                Your All Items
            </Typography>
            <Box sx={{
                maxWidth: "100%",
                maxHeight: "400px",
                minHeight: "400px",
                display: "flex",
                flexDirection: "flexWrap",
                gap: 1,
                overflowY: "auto",
                overflowX: "auto",
                "&::-webkit-scrollbar": {
                    width: "5px",
                },
                p: 2,
                borderRadius: "8px",
                bgcolor: "white",
                flex: "flexWrap"

            }}>
                {data?.order?.product_id?.map((item, index) => (
                    <Card key={index} sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        p: 1,
                        boxShadow: 3,
                        maxHeight: "250px",
                        minHeight: "250px",
                    }}>
                        <Stack
                            direction="row"
                            width={"100%"}
                            height={"100%"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                        >
                            <div style={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px"
                            }}>
                                <img
                                    src={imageUrl + (item.image || "")}
                                    style={{
                                        width: "350px",
                                        height: "350px",
                                        objectFit: "contain",
                                        borderRadius: "8px"
                                    }}
                                />
                                <div style={{

                                }}>
                                    <Typography sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        fontSize: "20px",
                                        fontWeight: "bold"
                                    }}>
                                        {item?.product_name}
                                    </Typography>
                                    <Stack>
                                        <Typography fontSize={"14px"}>
                                            {item.description}
                                        </Typography>
                                        <Typography fontSize={"14px"}>
                                            Price: {item.price}
                                        </Typography>
                                        <Typography fontSize={"14px"}>
                                            Quantity: {item.quantity}
                                        </Typography>
                                    </Stack>
                                </div>
                            </div>
                            <div style={{
                                width: "300px",
                                height: "100%",
                            }}>
                                <table style={{ width: "100%" }}>
                                    <tbody>
                                        <tr>
                                            <td style={{
                                                fontWeight: "bold",
                                                padding: 5,
                                                fontSize: 12
                                            }}> Size </td>
                                            <td style={{
                                                padding: 5,
                                                fontSize: 12
                                            }}> M </td>
                                        </tr>
                                        <tr>
                                            <td style={{
                                                fontWeight: "bold",
                                                padding: 5,
                                                fontSize: 12
                                            }}> Brand </td>
                                            <td style={{
                                                padding: 5,
                                                fontSize: 12
                                            }}> Kashmir Willow </td>
                                        </tr>
                                        <tr>
                                            <td style={{
                                                fontWeight: "bold",
                                                padding: 5,
                                                fontSize: 12,
                                            }}> Sports </td>
                                            <td style={{
                                                padding: 5,
                                                fontSize: 12
                                            }}> Cricket </td>
                                        </tr>
                                        <tr>
                                            <td style={{
                                                fontWeight: "bold",
                                                fontSize: 12,
                                                padding: 5,
                                            }}> Weight </td>
                                            <td style={{
                                                padding: 5,
                                                fontSize: 12
                                            }}> 500g </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Stack>
                    </Card>
                ))}
            </Box>
            <Stack sx={{ width: "90%", mt: 2, alignItems: "flex-start" }}>
                <Typography sx={{
                    fontSize: 12,
                    fontFamily: "'monospace', cursive",
                }}
                ><strong>Order ID:</strong> {data?.order?.orderId}</Typography>
                <Typography sx={{
                    fontSize: 12,
                    fontFamily: "'monospace', cursive",
                }}><strong>Amount:</strong> ${totalAmount}</Typography>
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
                        <strong>Phone:</strong> {data?.order?.phone}</Typography>
                </Stack>
                <Typography fontSize={12}>
                    <strong>Address:</strong> {data?.order?.address}
                </Typography>
                <Stack spacing={5} direction="row" sx={{ width: "100%", justifyContent: "space-between" }}>
                    <Typography fontSize={12}>
                        <strong>Full Address:</strong> {data?.order?.fullAddress}
                    </Typography>
                </Stack>
                <Typography fontSize={12}>
                    <strong>Landmark:</strong> {data?.order?.landmark}
                </Typography>
                <Stack mt={2} direction={"row"} justifyContent={"space-between"} width={"100%"}>
                    <Typography variant="body1"><strong>State:</strong> {data?.order?.state}</Typography>
                    <Typography variant="body1"><strong>City:</strong> {data?.order?.city}</Typography>
                    <Typography
                        fontSize={12}
                    ><strong>Pincode:</strong> {data?.order?.pincode}</Typography>
                </Stack>
            </Box>
            <Stepper
                activeStep={getStatusIndex(data?.order?.status || "pending")}
                alternativeLabel
                sx={{
                    mt: 4,
                    width: "100%",
                    position: "relative",
                    bottom: 5,
                    height: "100%",
                }}
            >
                {getSteps(data?.order?.status || "pending").map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    )
}

export default ViewMyOrderDetails
