import { Box, Button, Card, CardContent, colors, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { GetContactByUser, GetSingleContactTickets } from '../AllGetApi'
import { RootState } from '../Store'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { ContactSendMessage } from '../AllPostApi'

const YourTickets = () => {
    const { user } = useSelector((state: RootState) => state.CustomerUser)
    const { data = [] } = GetContactByUser({ user: user._id })
    const [id, setId] = useState("")
    const [ticketId, setTicketId] = useState("")
    const { data: singleContact } = GetSingleContactTickets({ id: id, ticketId: ticketId })
    useEffect(() => {
        if (data?.length !== 0) {
            setId(data?.length === 0 ? "" : data[0]?._id)
            setTicketId(data?.length === 0 ? "" : data[0]?.ticketId)
        }
    }, [data])
    const { mutateAsync } = ContactSendMessage()
    const [sendMessage, setSendMessage] = useState("")

    const handleSendMessage = async ({ id }: { id: string }) => {
        try {
            const response = await mutateAsync({
                data: { send_message: sendMessage, user: user._id, },
                id: id
            })
            setId("")
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Box sx={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Stack mt={9} width={{ xs: "100%", md: "90%" }}>
                <Typography sx={{
                    fontSize: { xs: "1.5rem", md: "2rem" },
                    fontWeight: "bold"
                }}>Your Tickets</Typography>

                <Typography sx={{
                    fontSize: { xs: "1rem", md: "1.2rem" },
                    color: "gray"
                }}>Your tickets will be displayed here</Typography>
            </Stack>
            <Box width={{ xs: "100%", md: "90%" }} sx={{
                display: "flex",
                justifyContent: "center",
                mt: 2,
                jusifyItems: "center",
                gap: 2
            }}>

                <Box width={"20%"}>
                    {data?.length === 0 ? <Typography sx={{
                        fontSize: { xs: "1rem", md: "1.2rem" },
                        color: "gray"
                    }}>
                        No tickets found
                    </Typography> : (
                        data?.map((item, idx) => (
                            <Card sx={{
                                width: { xs: "100%", md: "100%" },
                                height: "150px",
                                bgcolor: colors.grey[50],
                                boxShadow: "0px 4px 0px rgba(0, 0, 0, 0.1)",
                                mt: 1
                            }}
                                onClick={() => {
                                    setId(item._id)
                                    setTicketId(item.ticketId)
                                }}
                                key={idx}
                            >
                                <CardContent>
                                    <Typography>
                                        {item?.message}
                                    </Typography>
                                    <Typography>
                                        {item?.status}
                                    </Typography>
                                    <Typography>
                                        {item?.ticketId}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </Box>
                {/* {id && ( */}
                <Box sx={{
                    width: "80%",
                    height: "80vh",
                    bgcolor: "grey.100",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Box sx={{
                        width: "90%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        mt: 4
                    }}>
                        <Stack alignItems={"flex-start"} width={"100%"}>
                            <Typography sx={{
                                fontSize: "1.5rem",
                                color: "red",
                                fontFamily: "monospace"
                            }}>
                                Your Ticket Id  : {singleContact?.ticketId}
                            </Typography>
                        </Stack>

                        <Box
                            sx={{
                                width: "100%",
                                height: "65vh",
                                bgcolor: "white",
                                mt: 2,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-end",
                                p: 2,
                                overflowY: "auto",
                            }}
                        >
                            {/* Received Message */}
                            <Box
                                sx={{
                                    maxWidth: "60%",
                                    bgcolor: "grey.300",
                                    p: 1.5,
                                    m: 1,
                                    borderRadius: "10px",
                                    alignSelf: "flex-start",
                                }}
                            >
                                <Typography>{singleContact?.message}</Typography>
                                <span
                                    style={{
                                        fontSize: 10,
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        color: "grey",
                                        marginTop: 4,
                                    }}
                                >
                                    {moment(singleContact?.createdAt).format("DD-MM-YYYY HH:mm")}
                                </span>
                            </Box>


                            <Box
                                sx={{
                                    maxWidth: "60%",
                                    bgcolor: colors.blue[500],
                                    p: 1.5,
                                    color: "white",
                                    m: 1,
                                    borderRadius: "10px",
                                    alignSelf: "flex-end",
                                }}
                            >

                                <Typography>{singleContact?.message}</Typography>
                                <span
                                    style={{
                                        fontSize: 10,
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        marginTop: 4,
                                    }}
                                >
                                    {moment(singleContact?.createdAt).format("DD-MM-YYYY HH:mm")}
                                </span>
                            </Box>
                        </Box>

                        <Stack mt={2} direction={"row"} spacing={1}>
                            <TextField
                                fullWidth
                                multiline
                                sx={{
                                    bgcolor: "white",
                                    borderRadius: "10px",
                                    border: "none",
                                    height: "40px"
                                }}
                                variant="standard"
                                value={sendMessage}
                                onChange={(e) => setSendMessage(e.target.value)}
                            />
                            <Button variant='contained' onClick={() => handleSendMessage({ id: id })}>send</Button>
                        </Stack>
                    </Box>

                </Box>

                {/* )} */}
            </Box>

        </Box >
    )
}

export default YourTickets