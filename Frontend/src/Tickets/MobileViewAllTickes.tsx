

import { Box, LinearProgress, Stack, Typography, TextField, Button, colors, } from '@mui/material'
import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import { GetSingleContactTickets } from '../AllGetApi'
import { ContactReplMessage } from '../AllPostApi'
import { useLocation } from 'react-router-dom'
import { ThumbUp } from '@mui/icons-material'
import { socket } from './AllTickets'

const MobileViewAllTickes = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const ticketId = searchParams.get('ticketId')

    const [replyMessage, setReplyMessage] = useState("")
    const { mutateAsync, isPending } = ContactReplMessage()
    const messagesEndRef = useRef<HTMLDivElement | null>(null)


    const { data: singleTickets, refetch: singleRefetch, isLoading: singleLoading } = GetSingleContactTickets({ ticketId: ticketId || "" })


    useEffect(() => {
        const handleNewMessage = async () => {
            await singleRefetch()
        };

        socket.on("get-message", handleNewMessage);

        return () => {
            socket.off("get-message", handleNewMessage);
        };
    }, []);

    const handleSendMessage = async ({ ticketId }: { ticketId: string }) => {
        if (!replyMessage.trim()) return;

        try {
            const messageData = {
                ticketId,
                message: replyMessage,
                timestamp: new Date().toISOString(),
                type: "recieve"
            };

            await mutateAsync({
                data: {
                    recieve_message: replyMessage,
                    ticketId
                }
            });

            socket.emit("sendMessage", messageData);
            setReplyMessage("");
            singleRefetch()
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [singleTickets])

    return (
        <Box sx={{
            flex: 1,
            height: "100vh",
            bgcolor: "grey.100",
            display: "flex",
            flexDirection: "column",
            p: 0,
            borderRadius: 2,
            mt: 9
        }}>
            <Stack alignItems={"flex-start"} width={"100%"}>
                <Typography sx={{ fontSize: "1.2rem", color: "red", fontFamily: "monospace" }}>
                    Your Ticket Id: {singleTickets?.ticketId}
                </Typography>
            </Stack>

            {singleLoading && <LinearProgress sx={{ my: 2 }} />}

            <Box sx={{
                flexGrow: 1,
                overflowY: "auto",
                p: 0,
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
                            {singleTickets?.message}
                        </Typography>
                    </Box>
                </Box>
                {[...(singleTickets?.send_message?.map(msg => ({ ...msg, type: "receive" })) || []),
                ...(singleTickets?.recieve_message?.map(msg => ({ ...msg, type: "send" })) || [])]
                    .sort((a, b) => new Date(a?.timestamp).getTime() - new Date(b.timestamp).getTime())
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
                                color: item.type === "send" ? "white" : "black",
                                minWidth: "auto"
                            }}
                        >
                            <Typography>{item?.message}</Typography>
                            <Typography sx={{ fontSize: 10, textAlign: "right", color: item.type === "send" ? "white" : "black", mt: 1 }}>
                                {moment(item?.timestamp).format("DD-MM-YYYY HH:mm")}
                            </Typography>
                        </Box>
                    ))}
                <div ref={messagesEndRef} />
            </Box>

            {singleTickets?.status === "Resolved" ? (
                <Stack position={"sticky"} bottom={0} sx={{ width: "100%", justifyContent: "center", }} >
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
                <Stack mt={2} direction={"row"} spacing={1}>
                    <TextField
                        fullWidth
                        multiline
                        placeholder="Type your message..."
                        sx={{
                            bgcolor: "white",
                            borderRadius: "10px",
                            border: "none",
                            minHeight: "40px",
                            fontSize: { xs: "14px", md: "16px" }
                        }}
                        variant="outlined"
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                    />
                    <Button
                        disabled={isPending}
                        variant='contained'
                        sx={{ fontSize: { xs: "12px", md: "14px" } }}
                        onClick={() => handleSendMessage({ ticketId: ticketId || "" })}
                    >
                        Reply
                    </Button>
                </Stack>
            )
            }

        </Box >
    )
}

export default MobileViewAllTickes