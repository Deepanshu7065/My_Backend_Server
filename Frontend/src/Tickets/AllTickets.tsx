import { useEffect, useRef, useState } from 'react'
import { GetAllTicketsApi, GetSingleContactTickets } from '../AllGetApi'
import { Box, Button, Card, CardContent, colors, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, Skeleton, Stack, TextField, Typography, useMediaQuery } from '@mui/material'
// import { useSelector } from 'react-redux'
// import { RootState } from '../Store'
import moment from 'moment'
import io from "socket.io-client"
import { ContactReplMessage, TicketStatusChange } from '../AllPostApi'
import { useNavigate } from 'react-router-dom'
import { ThumbUp } from '@mui/icons-material'
import { socketUrl } from '../ApiEndPoint'


export const socket = io(socketUrl, {
    transports: ["websocket"],
    reconnectionAttempts: 5,
    timeout: 5000,
});



const AllTickets = () => {
    // const { user } = useSelector((state: RootState) => state.CustomerUser)
    const navigate = useNavigate()
    const { data = [], refetch, isLoading } = GetAllTicketsApi()
    const [ticketId, setTicketId] = useState("")
    const [replyMessage, setReplyMessage] = useState("")
    const messagesEndRef = useRef<HTMLDivElement | null>(null)
    const [status, setStatus] = useState("Pending")
    const [open, setOpen] = useState(false)
    const [messages, setMessages] = useState<any[]>([]);

    const { mutateAsync: updateStatus } = TicketStatusChange()
    const { mutateAsync, isPending } = ContactReplMessage()

    const isMobile = useMediaQuery("(max-width: 800px)")

    const { data: singleTickets, refetch: singleRefetch, isLoading: singleLoading } = GetSingleContactTickets({ ticketId })
    useEffect(() => {
        if (data?.length > 0) {
            setTicketId(data[0]?.ticketId)
        }
    }, [data])

    useEffect(() => {
        const handleNewMessage = async () => {
            await singleRefetch()
        };

        socket.on("get-message", handleNewMessage);

        return () => {
            socket.off("get-message", handleNewMessage);
        };
    }, []);






    const handleSendMessage = async () => {
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
            setMessages((prev) => [...prev, messageData]);
            setReplyMessage("");
            singleRefetch()
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateStatus = async ({ ticketId, status }: { ticketId: string, status: string }) => {
        try {
            await updateStatus({ id: ticketId, status: status })
            refetch()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [singleTickets]);;

    return (
        <Box sx={{
            width: "100%",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: isMobile ? "" : "center",
            alignItems: "center",
            p: { xs: 1, md: 2 }
        }}>
            <Stack mt={10} width={{ xs: "95%", md: "80%" }} textAlign={isMobile ? "center" : "left"}>
                <Typography sx={{ fontSize: { xs: "1.4rem", md: "2rem" }, fontWeight: "bold", fontFamily: "monospace" }}>
                    Your Tickets
                </Typography>
                <Typography sx={{ fontSize: { xs: "1rem", md: "1.2rem" }, color: "gray", fontFamily: "monospace" }}>
                    Your tickets will be displayed here
                </Typography>
            </Stack>

            <Box width={{ xs: "95%", md: "80%" }} sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                mt: 2,
                gap: 2
            }}>
                <Box width={isMobile ? "100%" : "25%"} sx={{ overflowY: "auto", maxHeight: "400px" }}>
                    {isLoading ? (
                        Array.from({ length: 3 }).map((_, idx) => (
                            <Skeleton key={idx} width={"100%"} height={80} sx={{ my: 1 }} />
                        ))
                    ) : data?.length === 0 ? (
                        <Typography sx={{ fontSize: "1rem", color: "gray", textAlign: "center" }}>No tickets found</Typography>
                    ) : (
                        data?.map((item, idx) => (
                            <>
                                <Card key={idx} sx={{
                                    width: "100%",
                                    borderRadius: "10px",
                                    my: 1,
                                    cursor: "pointer",
                                    transition: "0.3s",
                                    "&:hover": { bgcolor: "grey.200" },
                                    bgcolor: "grey.100"
                                }}
                                    onClick={() => {
                                        setTicketId(item.ticketId)
                                        if (isMobile) {
                                            navigate(`/ticket_all?ticketId=${item.ticketId}`)
                                        }
                                    }}
                                >
                                    <CardContent>
                                        <Stack direction="row" sx={{
                                            width: "100%",
                                            justifyContent: "space-between",
                                            alignItems: "center"
                                        }}>
                                            <Typography
                                                variant='h6'
                                                sx={{
                                                    fontFamily: "monospace",
                                                    color: "red"
                                                }}
                                            >
                                                {item.ticketId}
                                            </Typography>
                                            <Typography
                                                variant='body2'
                                                sx={{
                                                    color: "gray",
                                                    fontFamily: "monospace",
                                                    fontSize: "0.8rem",
                                                    p: 1,
                                                    bgcolor: colors.green[100],
                                                    borderRadius: "10px"
                                                }}>
                                                {item?.status}
                                            </Typography>
                                        </Stack>
                                        <Typography variant='body2' sx={{ color: "gray" }}>{item.title}</Typography>
                                    </CardContent>
                                </Card>
                                <div>
                                    <Button variant="contained" onClick={() => setOpen(true)}>
                                        Change Status
                                    </Button>
                                </div>
                                <Dialog open={open} onClose={() => setOpen(false)}>
                                    <DialogTitle>Change Status</DialogTitle>
                                    <DialogContent>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="name"
                                            label="Status"
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                                        <Button onClick={() => handleUpdateStatus({ ticketId: item._id, status: status })}>Update</Button>
                                    </DialogActions>

                                </Dialog>
                            </>

                        ))
                    )}
                </Box>
                {!isMobile && (
                    <Box sx={{
                        flex: 1,
                        height: "75vh",
                        bgcolor: "grey.100",
                        display: "flex",
                        flexDirection: "column",
                        p: 2,
                        borderRadius: 2
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
                            p: 2,
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
                            <Stack sx={{ width: "100%", justifyContent: "center", }} >
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
                                    onClick={handleSendMessage}
                                >
                                    Reply
                                </Button>
                            </Stack>
                        )}



                    </Box>
                )}


            </Box>
        </Box>
    )
}

export default AllTickets
