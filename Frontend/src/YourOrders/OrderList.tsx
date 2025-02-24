import React from 'react';
import { Box, Typography } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const OrderList = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Current URL path ko fetch karne ke liye

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100vw",
            height: "100%",
            p: { xs: 0, md: 4 },
            mt: 8
        }}>
            <Box sx={{
                width: { xs: "100%", md: "80%" },
                height: "100%",
                display: "flex",
                flexDirection: "column",
                bgcolor: "grey.100",
                p: { xs: 1, md: 2 },
                minHeight: "85vh"
            }}>
                <div style={{
                    display: "flex",
                    gap: 20,
                    alignItems: "center",
                }}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        fontFamily="monospace"
                        fontWeight={800}
                        sx={{
                            cursor: "pointer",
                            color: location.pathname === "/orders" ? "darkblue" : "black"
                        }}
                        onClick={() => navigate("/orders")}
                    >
                        RepairOrders
                    </Typography>

                    <Typography
                        variant="h6"
                        gutterBottom
                        fontFamily="monospace"
                        fontWeight={800}
                        sx={{
                            cursor: "pointer",
                            color: location.pathname === "/orders/your_orders" ? "darkblue" : "black"
                        }}
                        onClick={() => navigate("/orders/your_orders")}
                    >
                        MyOrders
                    </Typography>
                </div>
                <Outlet />
            </Box>
        </Box>
    );
};

export default OrderList;
