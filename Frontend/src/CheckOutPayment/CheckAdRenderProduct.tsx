import React from 'react'
import { Box, Stack, Typography, Button } from '@mui/material'
import { colors } from '@mui/material'
import { Home } from '@mui/icons-material'


const CheckAdRenderProduct = () => {
  return (
    <Box sx={{
        display: { xs: "none", sm: "none", md: "flex", lg: "flex" },
        width: { xs: "100%", lg: "40%" },
        flexDirection: "column",
        p: { xs: 1, md: 2 },
        minHeight: "100vh",
        bgcolor: colors.grey[200],
        justifyContent: "center",
        alignItems: "center"
    }}>
        <Stack width={"70%"} sx={{ alignItems: "flex-start" }}>
            <Typography sx={{ fontSize: "1rem", fontFamily: "monospace, cursive" }}>
                Total
            </Typography>
            <Typography sx={{ fontSize: "2rem", fontWeight: "bold" }}>
                {/* rupy sign */}
                &#x20B9;1200
            </Typography>
        </Stack>
        <Stack width={"60%"} mt={3} direction={"row"} justifyContent={"space-between"}>
            <Stack width={"100%"}>
                <Stack width={"100%"} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <div>
                        <Typography sx={{ fontSize: "1rem", fontFamily: "monospace, cursive", fontWeight: "bold" }}>
                            Quantity
                        </Typography>
                        <Typography sx={{ fontSize: 12 }}>
                            Your all Quantity
                        </Typography>
                    </div>
                    <Typography>
                        33
                    </Typography>
                </Stack>
                <Stack width={"100%"} mt={5} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <div>
                        <Typography sx={{ fontSize: "1rem", fontFamily: "monospace, cursive", fontWeight: "bold" }}>
                            Add Address
                        </Typography>
                        <Typography sx={{ fontSize: 12 }}>
                            Add Your Home address
                        </Typography>
                    </div>
                    <Typography>
                        <Home />
                    </Typography>
                </Stack>
                <Stack width={"100%"} mt={5} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <div>
                        <Typography sx={{ fontSize: "1rem", fontFamily: "monospace, cursive", fontWeight: "bold" }}>
                            Discount
                        </Typography>
                        <Typography sx={{ fontSize: 12 }}>
                            Your Discount Your Products
                        </Typography>
                    </div>
                    <Typography sx={{
                        fontSize: "1rem",
                        fontWeight: "bold"
                    }}>
                        &#x20B9;100
                    </Typography>
                </Stack>
                <Stack width={"100%"} mt={5} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <div>
                        <Typography sx={{ fontSize: "1rem", fontFamily: "monospace, cursive", fontWeight: "bold" }}>
                            Delevry Charges
                        </Typography>
                        <Typography sx={{ fontSize: 12 }}>
                            Delever to your address
                        </Typography>
                    </div>
                    <Typography sx={{
                        fontSize: "1rem",
                        fontWeight: "bold"
                    }}>
                        &#x20B9;100
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    </Box>
  )
}

export default CheckAdRenderProduct