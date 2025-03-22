import { Container, Box, Typography, Stack, } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import WebIcon from "@mui/icons-material/Web";
const CricketBatRepair = () => {

    const afe = [{
        name: "hello",
        age: 2
    }, {
        name: "gugu",
        age: 7
    },
    {
        name: "piku",
        age: 6
    }]
    console.log(afe)

    const newArray = afe.some((item) => {
        return item.name === "hello"
    })

    if (newArray) {
        afe.splice(1, 1, { name: "opnki", age: 6 }) 
    }
    console.log(newArray)

    console.log(afe)
    return (
        <Box sx={{
            width: "100%",
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
            mt: 10
        }}>

            <Box sx={{
                width: "40%",
                height: "100%",
                position: "relative",
                display: "flex",
                justifyContent: "center",
            }}>

                <Box sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundImage: "url('/src/assets/tempbg.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "blur(4px)",
                    zIndex: 1
                }} />
                <Container maxWidth="md" sx={{ py: 4, justifyContent: "center", zIndex: 2 }}>
                    <Box sx={{ p: 6, borderRadius: "10px", zIndex: 2 }}>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderBottom: "2px solid #002147",
                            marginBottom: "20px",
                            marginTop: "-40px"
                        }}>
                            <img src="/src/assets/header.png" alt="Cricket Bat Repair" style={{
                                width: "50%",
                                marginBottom: "20px",
                                height: "150px"
                            }} />
                        </Box>
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            color="#002147"
                            gutterBottom
                            display="flex"
                            flexDirection="column"
                            sx={{ fontFamily: "monospace" }}
                        >
                            <span style={{
                                backgroundColor: "yellow",
                                width: "fit-content", fontFamily: "monospace"
                            }}>CRICKET</span>
                            <span style={{
                                backgroundColor: "#002147",
                                width: "fit-content", color: "white", fontFamily: "monospace"
                            }}>BAT REPAIR</span>
                            <span style={{
                                backgroundColor: "yellow",
                                width: "fit-content", fontFamily: "monospace"
                            }}>SERVICE</span>
                        </Typography>
                        <Typography variant="body1"
                            // color="white"
                            gutterBottom width="300px" sx={{
                                fontFamily: "monospace",
                                color: "white",
                                bgcolor: "#002147",
                                p: 1,
                                borderRadius: "10px",
                            }}>
                            We do custom-made cricket bats & all kinds of cricket repairs. Call us now…
                        </Typography>

                        <Box my={3}>
                            <Typography variant="h6" fontWeight="bold" color="#002147" sx={{
                                fontFamily: "monospace",
                                marginBottom: "10px",
                                backgroundColor: "yellow",
                                width: "fit-content",
                                p: 0.8
                            }}>
                                OUR SERVICES
                            </Typography>

                            <Box sx={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "space-between"
                            }}>
                                <Box style={{
                                    fontFamily: "monospace",
                                    marginLeft: "20px",
                                    gap: 2,
                                    display: "flex",
                                    flexDirection: "column",
                                    color: "white",
                                    width: "fit-content",
                                    padding: 1,
                                    // backgroundColor: colors.grey[500]
                                }}>
                                    <span>
                                        <li
                                            style={{
                                                fontFamily: "monospace",
                                                color: "white"
                                            }}>Full Refurbishment</li>
                                    </span>
                                    <span>
                                        <li style={{
                                            fontFamily: "monospace",
                                            color: "white"
                                        }}>Handle Replacement</li>
                                    </span>
                                    <span>
                                        <li style={{
                                            fontFamily: "monospace",
                                            color: "white"
                                        }}>Weight Reduction</li>
                                    </span>
                                    <span>
                                        <li style={{
                                            fontFamily: "monospace",
                                            color: "white"
                                        }}>Crack Repair</li>
                                    </span>
                                    <span>
                                        <li style={{
                                            fontFamily: "monospace",
                                            color: "white"
                                        }}>Oil & Knocking</li>
                                    </span>
                                </Box>
                            </Box>
                        </Box>


                        <Stack direction={"column"} spacing={"10px"} my={3}>
                            <span style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                fontFamily: "monospace",
                                color: "#002147",
                                backgroundColor: "yellow",
                                width: "fit-content",
                                padding: 0.8,
                                fontWeight: "bold"
                            }}>
                                <PhoneIcon /> 9625955502 / 8744955950
                            </span>
                            <span style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                fontFamily: "monospace",
                                color: "#002147",
                                backgroundColor: "yellow",
                                width: "fit-content",
                                padding: 0.8,
                                fontWeight: "bold"
                            }}>
                                <WebIcon /> www.cricketbatrepair.com
                            </span>
                        </Stack>
                    </Box>
                </Container>
            </Box>

        </Box>
    );
};

export default CricketBatRepair;
