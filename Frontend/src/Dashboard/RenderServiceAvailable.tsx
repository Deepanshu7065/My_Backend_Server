import { Box, Card, CardActions, CardContent, Stack } from '@mui/material'
import React from 'react'

const RenderServiceAvailable = () => {
    return (
        <Box sx={{
            width: "80%",
            display: "flex",
            justifyContent: "center",
            gap: 5,
            mt: 5
        }}>
            <Card sx={{
                width: "50%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "column",
                bgcolor: "white",
                height: "600px",
                transition: "all 0.4s ease-in-out",
                "&:hover": {
                    transform: "scale(1.02)",
                }
            }}>
                <Stack width="auto" height="90%">
                    <img src='./Cricket-Bat-Ball.jpg' alt='repair' style={{ width: "100%", height: "100%" }} />
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
                width: "50%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "column",
                bgcolor: "white",
                height: "600px",
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
                    <img src='./reapirweb.webp' alt='repair' style={{ width: "100%", height: "100%" }} />
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

        </Box>
    )
}

export default RenderServiceAvailable