import { Box, Card, CircularProgress, colors, Stack, Step, StepLabel, Stepper, Typography } from '@mui/material'
import { GetSingleMyOrderApi } from '../AllGetApi'
import { imageUrl } from '../ApiEndPoint'
import { LazyImage } from '../App'

const ViewMyOrderDetails = ({ order_id }: { order_id: string }) => {
    const { data, isLoading } = GetSingleMyOrderApi({ id: order_id })
    if (isLoading) {
        return <CircularProgress />
    }


    const totalAmount = data?.order?.total

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
                Your All Items ({data?.order?.product_id?.length})
            </Typography>
            <Box sx={{
                maxHeight: "400px",
                minHeight: "300px",
                display: "flex",
                width: "900px",
                overflowX: "auto",
                flexWrap: "nowrap",
                // scrollable design
                "&::-webkit-scrollbar": {
                    width: "18px",
                    height: "8px",

                }

            }}>
                {data?.order?.product_id?.map((item, index) => (
                    <Card key={index} sx={{
                        width: { xs: "100%", md: "100%" },
                        display: "flex",
                        alignItems: "center",
                        p: 1,
                        boxShadow: 12,
                        maxHeight: "250px",
                        minHeight: "250px",
                        flexShrink: 0,
                        gap: 5
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
                                <LazyImage
                                    src={imageUrl + (item.image || "")}
                                    style={{
                                        width: "350px",
                                        height: "350px",
                                        objectFit: "contain",
                                        borderRadius: "8px"
                                    }}
                                    alt='image'
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
                                            Quantity: {data?.order?.quantity}
                                        </Typography>
                                    </Stack>
                                </div>
                            </div>
                            <div style={{
                                width: "300px",
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
            <Stack direction={"row"}
                sx={{
                    width: "90%",
                    alignItems: "center",
                    justifyContent: "space-between"
                }} spacing={2}>
                <Typography sx={{
                    fontSize: 14,
                    fontFamily: "'monospace', cursive",
                    color: colors.grey[700]
                }}
                ><strong>Order ID:</strong> {data?.order?.orderId}</Typography>
                <Typography sx={{
                    fontSize: 14,
                    fontFamily: "'monospace', cursive",
                }}>
                    <strong>Amount:</strong>
                    <span style={{
                        color: colors.green[700],
                        fontFamily: "'monospace', cursive",
                        letterSpacing: 1,
                        marginLeft: 14,
                        fontSize: 16
                    }}>
                        &#8377;{totalAmount}
                    </span>
                </Typography>
            </Stack>
            <Box sx={{
                width: "90%",
                display: "flex",
                alignItems: "flex-start",
                mt: 3,
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
                            fontSize: 12,
                            fontFamily: "'monospace', cursive",

                        }}
                    >
                        <strong>Phone:</strong>
                        <span style={{
                            color: colors.grey[700],
                            fontFamily: "'monospace', cursive",
                            letterSpacing: 1,
                            marginLeft: 14
                        }}>
                            {data?.order?.address?.phone}
                        </span>
                    </Typography>
                </Stack>
                <Typography
                    fontSize={12} mt={1}
                    sx={{
                        fontFamily: "'monospace', cursive",
                    }}
                >
                    <strong>Address:</strong>
                    <span style={{
                        color: colors.grey[700],
                        fontFamily: "'monospace', cursive",
                        letterSpacing: 1,
                        marginLeft: 12
                    }}>
                        {data?.order?.address?.address}
                    </span>
                </Typography>
                <Stack
                    spacing={5}
                    direction="row"
                    sx={{
                        width: "100%",
                        justifyContent: "space-between",
                        mt: 1
                    }}>
                    <Typography fontSize={12} sx={{
                        fontFamily: "'monospace', cursive",
                    }}>
                        <strong>Full Address:</strong>
                        <span style={{
                            color: colors.grey[700],
                            fontFamily: "'monospace', cursive",
                            letterSpacing: 1,
                            marginLeft: 14
                        }}>
                            {data?.order?.address?.fullAddress}
                        </span>
                    </Typography>
                </Stack>
                <Typography fontSize={12} mt={1} sx={{
                    fontFamily: "'monospace', cursive",
                }}>
                    <strong>Landmark:</strong>
                    <span style={{
                        color: colors.grey[700],
                        fontFamily: "'monospace', cursive",
                        letterSpacing: 1,
                        marginLeft: 12
                    }}>
                        {data?.order?.address?.landmark}
                    </span>
                </Typography>
                <Stack mt={2} direction={"row"} justifyContent={"space-between"} width={"100%"}>
                    <Typography variant="body1" sx={{
                        fontSize: 14,
                        fontFamily: "'monospace', cursive",
                    }}><strong>State:</strong>
                        <span style={{
                            color: colors.grey[700],
                            fontFamily: "'monospace', cursive",
                            letterSpacing: 1,
                            marginLeft: 12
                        }}>
                            {data?.order?.address?.state}
                        </span>
                    </Typography>
                    <Typography variant="body1" sx={{
                        fontSize: 14,
                        fontFamily: "'monospace', cursive",
                    }}><strong>City:</strong>
                        <span style={{
                            color: colors.grey[700],
                            fontFamily: "'monospace', cursive",
                            letterSpacing: 1,
                            marginLeft: 12
                        }}>
                            {data?.order?.address?.city}
                        </span>
                    </Typography>
                    <Typography
                        fontSize={12}
                        sx={{
                            fontFamily: "'monospace', cursive",
                        }}
                    ><strong>Pincode:</strong>
                        <span style={{
                            color: colors.grey[700],
                            fontFamily: "'monospace', cursive",
                            letterSpacing: 1,
                            marginLeft: 12
                        }}>
                            {data?.order?.address?.pincode}
                        </span>
                    </Typography>
                </Stack>
            </Box>
            <Stepper
                activeStep={getStatusIndex(data?.order?.status || "pending")}
                alternativeLabel
                sx={{
                    mt: 12,
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
        </Box >
    )
}

export default ViewMyOrderDetails
