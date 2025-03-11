
import { Box, LinearProgress, Stack, Typography, TextField, Button, colors, } from '@mui/material'
import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import { GetSingleContactTickets } from '../AllGetApi'
import { ContactSendMessage } from '../AllPostApi'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../Store'
import { ThumbUp } from '@mui/icons-material'

const MobileViewYourTickets = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const ticketId = searchParams.get('ticketId')

    const { user } = useSelector((state: RootState) => state.CustomerUser)
    const messagesEndRef = useRef<HTMLDivElement | null>(null)
    const [sendMessage, setSendMessage] = useState("")

    const { data: singleContact, refetch: singleRefetch, isLoading: singleLoading } = GetSingleContactTickets({ ticketId: ticketId || "" })
    const { mutateAsync, isPending } = ContactSendMessage()

    const handleSendMessage = async ({ ticketId }: { ticketId: string }) => {
        try {
            await mutateAsync({ data: { send_message: sendMessage, user: user._id, ticketId } })
            singleRefetch()
            setSendMessage("")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [singleContact])
    return (
        <Box sx={{
            flex: 1,
            width: "100%",
            height: "100vh",
            bgcolor: "grey.100",
            display: "flex",
            flexDirection: "column",
            p: 0,
            borderRadius: 2,
            mt: 8
        }}>
            <Stack alignItems={"flex-start"}
                width={"100%"}
                bgcolor={"grey.100"}
                p={2}
            >
                <Typography sx={{ fontSize: "1rem", color: "red", fontFamily: "monospace" }}>
                    Your Ticket Id: {singleContact?.ticketId}
                </Typography>
            </Stack>

            {singleLoading && <LinearProgress sx={{ my: 2 }} />}

            <Box sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
            }}>
                <Box sx={{
                    flexGrow: 1,
                    overflowY: "auto",
                    paddingBottom: "10px",
                    p: 1,
                    display: "flex",
                    flexDirection: "column",
                    "&::-webkit-scrollbar": {
                        width: "5px",
                        height: "25px",
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: "transparent",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "grey",
                        borderRadius: "10px",
                    },
                }}>
                    <Box sx={{
                        width: "100%",
                        justifyContent: "center",
                        display: "flex",
                        fontSize: "0.8rem",
                    }}>
                        <Box sx={{
                            width: "fit-content",
                            p: 2,
                            bgcolor: "white",
                            borderRadius: "10px"

                        }}>
                            <Typography sx={{ fontFamily: "monospace", }}>
                                {singleContact?.message}
                            </Typography>
                        </Box>
                    </Box>
                    {[...(singleContact?.send_message?.map(msg => ({ ...msg, type: "send" })) || []),
                    ...(singleContact?.recieve_message?.map(msg => ({ ...msg, type: "receive" })) || [])]
                        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
                        .map((item, idx) => (
                            <Box
                                key={idx}
                                sx={{
                                    maxWidth: "40%",
                                    bgcolor: item.type === "send" ? colors.blue[500] : "grey.300",
                                    p: 1.5,
                                    m: 1,
                                    borderRadius: "10px",
                                    alignSelf: item.type === "send" ? "flex-end" : "flex-start",
                                    color: item.type === "send" ? "white" : "black"
                                }}
                            >
                                <Typography>{item?.message}</Typography>
                                <span
                                    style={{
                                        fontSize: 10,
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        color: item.type === "send" ? "white" : "grey",
                                        marginTop: 4,
                                    }}
                                >
                                    {moment(item?.timestamp).format("DD-MM-YYYY HH:mm")}
                                </span>
                            </Box>
                        ))}
                    <div ref={messagesEndRef} />
                </Box>
            </Box>

            {/* Message Input */}
            {singleContact?.status === "Resolved" ? (
                <Stack sx={{ width: "100%", justifyContent: "center", position: "sticky", bottom: 0,  bgcolor: "white" }} >
                    <Stack direction={"row"} style={{
                        fontSize: "0.8rem",
                        color: "green",
                        textAlign: "center",
                        alignItems: "center",
                        gap: 2,
                        justifyContent: "center"
                    }}>
                        <>
                            <ThumbUp />
                        </>
                        <>
                            YOUR TICKET IS RESOLVED
                        </>
                    </Stack>
                </Stack>
            ) : (
                <Stack mt={2} direction={"row"} spacing={1} position={"sticky"} bottom={0} m={1}>
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
                        disabled={isPending}
                    />
                    <Button
                        disabled={isPending}
                        variant='contained'
                        sx={{ fontSize: { xs: "12px", md: "14px" } }}
                        onClick={() => handleSendMessage({ ticketId: ticketId || "" })}
                    >
                        {isPending ? "Sending..." : "Send"}
                    </Button>
                </Stack>
            )}


        </Box >
    )
}

export default MobileViewYourTickets