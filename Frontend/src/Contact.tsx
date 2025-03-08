import { AddLocationAlt, AddLocationSharp, Email, LocationCity } from '@mui/icons-material'
import { Box, Button, colors, Stack, TextField, Typography } from '@mui/material'
import React from 'react'

const Contact = () => {
    return (
        <Box sx={{
            display: "flex",
            height: "100vh",
            fontSize: "2rem",
            width: "100%",
            flexDirection: "column"
        }}>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
                width: "100%",
                backgroundColor: colors.blue[50],
            }}>
                <Stack direction={"row"} sx={{
                    width: "90%",
                    justifyContent: "space-between",
                    mt: 30,
                    alignItems: "center"
                }}>
                    <Stack sx={{ alignItems: "flex-start", width: "30%" }}>
                        <Typography sx={{
                            fontSize: "1rem",
                            fontWeight: "bold",
                            fontFamily: "monospace, cursive"
                        }}>
                            CONTACT US
                        </Typography>
                        <Typography sx={{
                            fontSize: "2rem",
                            fontWeight: "bold",
                            fontFamily: "monospace, cursive"
                        }}>
                            Let's talk about your Problem.
                        </Typography>
                    </Stack>
                    <Box sx={{
                        width: "600px",
                        height: "600px",
                        backgroundColor: "white",
                        borderRadius: "10px",
                        mt: 40,
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column"
                    }}>
                        <Stack width={"90%"} height={"auto"} >
                            <Typography sx={{
                                fontSize: "1.4rem",
                                fontWeight: "bold",
                                fontFamily: "monospace, cursive"
                            }}>
                                Send us a Message
                            </Typography>
                            <Stack mt={5} spacing={2}>
                                <Typography sx={{
                                    fontSize: "0.8rem",
                                    fontFamily: "monospace, cursive"
                                }}>
                                    Name
                                </Typography>
                                <TextField variant='standard' type="text" placeholder='Enter your name' />
                            </Stack>
                            <Stack mt={3} spacing={2}>
                                <Typography sx={{
                                    fontSize: "0.8rem",
                                    fontFamily: "monospace, cursive"
                                }}>
                                    Last Name
                                </Typography>
                                <TextField variant='standard' type="text" placeholder='Enter yourLast name' />
                            </Stack>
                            <Stack mt={3} spacing={2}>
                                <Typography sx={{
                                    fontSize: "0.8rem",
                                    fontFamily: "monospace, cursive"
                                }}>
                                    Phone
                                </Typography>
                                <TextField variant='standard' type="text" placeholder='Enter Your Phone' />
                            </Stack>
                            <Stack mt={3} spacing={2}>
                                <Typography sx={{
                                    fontSize: "0.8rem",
                                    fontFamily: "monospace, cursive"
                                }}>
                                    Message
                                </Typography>
                                <TextField variant='standard' type="text" placeholder='Enter your name' />
                            </Stack>
                        </Stack>
                        <Stack mt={5} alignItems={"flex-start"} width={"90%"} >
                            <Button variant='contained' >
                                Send Message
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
                width: "50%",
            }}>
                <Stack
                    direction={"row"} sx={{
                        width: "50%",
                        justifyContent: "space-between",
                        height: "50%",
                    }}
                >
                    <Stack width={"40%"} spacing={2} direction={"row"} alignItems={"flex-start"}>
                        <Stack>
                            <AddLocationAlt sx={{
                                cursor: "pointer",
                                fontSize: "2rem"
                            }}
                                onClick={() =>
                                    window.open("https://www.google.com/maps/dir/28.4830837,77.1040642/Housing+Board+Colony,+Sector+10A,+Gurugram,+Haryana+122001/@28.465265,77.0118823,13z/data=!3m1!4b1!4m18!1m8!3m7!1s0x390d178ea85339f7:0xb586565052132dc!2sHousing+Board+Colony,+Sector+10A,+Gurugram,+Haryana+122001!3b1!8m2!3d28.4491075!4d77.0042661!16s%2Fg%2F1td7xgfg!4m8!1m1!4e1!1m5!1m1!1s0x390d178ea85339f7:0xb586565052132dc!2m2!1d77.0042661!2d28.4491075?entry=ttu&g_ep=EgoyMDI1MDMwNC4wIKXMDSoASAFQAw%3D%3D", "_blank")}

                            />
                        </Stack>
                        <Stack>

                            <Typography sx={{
                                fontSize: "1rem",
                                fontWeight: "bold",
                                fontFamily: "monospace, cursive"
                            }}>
                                Our location
                            </Typography>
                            <Typography sx={{
                                fontSize: "0.8rem",
                                fontFamily: "monospace, cursive",
                                mt: 2
                            }}>
                                sec 10A, gurugram houseing board colony,
                                haryana , 122001
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack width={"40%"} spacing={2} direction={"row"} alignItems={"flex-start"}>
                        <Stack>
                            <Email />
                        </Stack>
                        <Stack>
                            <Typography sx={{
                                fontSize: "1rem",
                                fontWeight: "bold",
                                fontFamily: "monospace, cursive"
                            }}>
                                How Can we help?
                            </Typography>
                            <Typography sx={{
                                fontSize: "0.8rem",
                                fontFamily: "monospace, cursive",
                                mt: 2,
                                display: "flex",
                                flexDirection:"column"
                            }}>
                                <span>
                                    info @ housingboard
                                </span>
                                <a style={{ color: "black" }}
                                    href="https://mail.google.com/mail/?view=cm&fs=1&to=deepanshu.ss00ss.10@gmail.com">
                                    deepanshu.ss00ss.10@gmail.com
                                </a>
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
        </Box >
    )
}

export default Contact