import { Box, Card, CardActions, CardContent, Stack, useMediaQuery } from '@mui/material'
import React from 'react'
import { LazyImage } from '../App'

const RenderServiceAvailable = () => {
    const mobile = useMediaQuery("(max-width:600px)")
    return (
        <Box sx={{
            width: mobile ? "100%" : "80%",
            display: "flex",
            justifyContent: "center",
            gap: 5,
            mt: 5,
            flexDirection: mobile ? "column" : "row"
        }}>
            <Card sx={{
                width: mobile ? "100%" : "50%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "column",
                bgcolor: "white",
                height: { xs: "200px", md: "600px" },
                transition: "all 0.4s ease-in-out",
                "&:hover": {
                    transform: "scale(1.02)",
                }
            }}>
                <Stack width="100%" height={"90%"}>
                    <LazyImage src='/src/assets/Cricket-Bat-Ball.jpg' alt='repair' style={{ width: "100%", height: "100%" }} />
                </Stack>

                <Stack width="100%" height="10%" bgcolor={"white"} direction="row" spacing={2}>
                    <button style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "white",
                        color: "black",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "1.2rem",
                        fontWeight: "bold"
                    }}>Read More</button>
                </Stack>
            </Card>
            <Card sx={{
                width: mobile ? "100%" : "50%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "column",
                bgcolor: "white",
                height: { xs: "200px", md: "600px" },
                transition: "all 0.4s ease-in-out",
                "&:hover": {
                    transform: "scale(1.02)",
                }
            }}>
                <Stack width="100%" height="90%" sx={{
                    display: "flex",
                    backgroundImage: "url(./reapirweb.webp)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}>
                    <LazyImage src='/src/assets/reapirweb.webp' alt='repair' style={{ width: "100%", height: "100%" }} />
                </Stack>

                <Stack width="100%" height="10%" bgcolor={"white"} direction="row" spacing={2}>
                    <button style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "white",
                        color: "black",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "1.2rem",
                        fontWeight: "bold"
                    }}>Read More</button>
                </Stack>


            </Card>

        </Box >
    )
}

export default RenderServiceAvailable