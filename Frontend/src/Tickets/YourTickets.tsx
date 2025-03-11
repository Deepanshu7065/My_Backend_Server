import { Box, Button, Card, CardContent, colors, LinearProgress, Skeleton, Stack, TextField, Typography, useMediaQuery } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { GetContactByUser, GetSingleContactTickets } from '../AllGetApi'
import { RootState } from '../Store'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { ContactSendMessage } from '../AllPostApi'
import { useNavigate } from 'react-router-dom'
import { ThumbUp } from '@mui/icons-material'

const YourTickets = () => {
    const { user } = useSelector((state: RootState) => state.CustomerUser)
    const messagesEndRef = useRef<HTMLDivElement | null>(null)
    const { data = [], refetch, isLoading } = GetContactByUser({ user: user._id })
    const [ticketId, setTicketId] = useState("")
    const [sendMessage, setSendMessage] = useState("")
    const isMobile = useMediaQuery("(max-width: 800px)")
    const navigate = useNavigate()

    useEffect(() => {
        if (data?.length !== 0) {
            setTicketId(data[0]?.ticketId || "")
        }
    }, [data])

    const { data: singleContact, refetch: singleRefetch, isLoading: singleLoading } = GetSingleContactTickets({ ticketId })
    const { mutateAsync, isPending } = ContactSendMessage()

    const handleSendMessage = async ({ ticketId }: { ticketId: string }) => {
        try {
            await mutateAsync({ data: { send_message: sendMessage, user: user._id, ticketId } })
            refetch()
            singleRefetch()
            setSendMessage("")
            setTicketId(ticketId)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [singleContact])

    return (
        <Box sx={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: isMobile ? "" : "center",
            alignItems: "center",
            p: { xs: 1, md: 2 }
        }}>
            <Stack mt={9} width={{ xs: "100%", md: "90%" }} textAlign={isMobile ? "center" : "left"}>
                <Typography sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, fontWeight: "bold", fontFamily: "monospace" }}>
                    Your Tickets
                </Typography>
                <Typography sx={{ fontSize: { xs: "1rem", md: "1.2rem" }, color: "gray", fontFamily: "monospace" }}>
                    Your tickets will be displayed here
                </Typography>
            </Stack>

            <Box width={{ xs: "100%", md: "90%" }} sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                mt: 2,
                gap: 2
            }}>
                <Box width={isMobile ? "100%" : "25%"} sx={{ overflowY: "auto", maxHeight: "400px" }}>
                    {isLoading ? (
                        Array.from({ length: 3 }).map((_, idx) => (
                            <Skeleton key={idx} width={"100%"} height={150} sx={{ my: 1 }} />
                        ))
                    ) : data?.length === 0 ? (
                        <Typography sx={{ fontSize: "1rem", color: "gray", fontFamily: "monospace" }}>No tickets found</Typography>
                    ) : (
                        data?.map((item, idx) => (
                            <Card
                                key={idx}
                                sx={{
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
                                        navigate(`/ticket_your?ticketId=${item.ticketId}`)
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
                        ))
                    )}
                </Box>
                {!isMobile && (
                    <Box sx={{
                        width: "80%",
                        height: "80vh",
                        bgcolor: "grey.100",
                        display: "flex",
                        flexDirection: "column",
                        p: 2,
                        borderRadius: 2
                    }}>
                        <Stack alignItems={"flex-start"} width={"100%"}>
                            <Typography sx={{ fontSize: "1.5rem", color: "red", fontFamily: "monospace" }}>
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
                            overflow: "hidden",
                        }}>
                            <Box sx={{
                                flexGrow: 1,
                                overflowY: "auto",
                                paddingBottom: "10px",
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

                        {singleContact?.status === "Resolved" ? (
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
                                    variant='contained'
                                    disabled={isPending || !sendMessage.trim()}
                                    onClick={() => handleSendMessage({ ticketId })}
                                >
                                    {isPending ? "Sending..." : "Send"}
                                </Button>
                            </Stack>
                        )}

                    </Box>
                )}

            </Box>
        </Box>
    )
}

export default YourTickets
