import { Box, Paper, Typography, Button, colors, Card } from "@mui/material";
import RenderServiceAvailable from "./RenderServiceAvailable";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate()

    const CardData = [
        {
            image: "./kiko.webp",
            title: "Quality Guarantee",
            label: "Premium materials and expert craftsmanship in every bat",
        },
        {
            image: "./grade.webp",
            title: "Professional Grade",
            label: "Trusted ametaure and professional players",
        },
        {
            title: "Bat Repair",
            image: "./repair.webp",
            label: "Quick and efficient repair services",
        },
        {
            title: "Fast Services",
            image: "./serviceFast.jpg",
            label: "Quick turnaround on all repairs service",
        }
    ]

    return (
        <Box sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            px: 2,
            flexDirection: "column"
        }}>
            <Paper sx={{
                width: { xs: "100%", sm: "85%", md: "85%" },
                height: { xs: "auto", md: 450 },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#050825",
                p: { xs: 3, md: 5 },
                borderRadius: 3,
                textAlign: "center",
                mt: { xs: 5, md: 0 },
                mb: { xs: 1, md: 0 }
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2
                }}>
                    <Typography sx={{
                        color: "white",
                        fontSize: { xs: "2rem", sm: "2.5rem", md: "4.5rem" },
                        fontWeight: "bold",
                        fontFamily: "'Dancing Script', cursive"
                    }}>
                        Your Trusted Bat Specialist
                    </Typography>
                    <Typography sx={{
                        color: "white",
                        fontSize: { xs: "0.8rem", sm: "1 rem" },
                        fontFamily: "Poppins, sans-serif",
                        flexWrap: "nowrap"
                    }}>
                        Premium Baseball and Cricket Bats, Expert Repair Services
                        Trusted Professionals
                    </Typography>
                    <Typography sx={{
                        color: "white",
                        fontSize: { xs: "1rem", sm: "1.2rem" },
                        fontFamily: "Poppins, sans-serif"
                    }}>
                    </Typography>
                    <Box sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 2,
                        mt: 3
                    }}>
                        <Button sx={{
                            bgcolor: "white",
                            color: "#0c134b",
                            px: 3,
                            py: 1.2,
                            borderRadius: "10px",
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "1rem",
                            '&:hover': { bgcolor: "#ddd" }
                        }}
                            onClick={() => navigate("/repair")}
                        >
                            Bat Repair
                        </Button>
                        <Button sx={{
                            bgcolor: "white",
                            color: "#0c134b",
                            px: 3,
                            py: 1.2,
                            borderRadius: "10px",
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "1rem",
                            '&:hover': { bgcolor: "#ddd" }
                        }} onClick={() => navigate("/shop_bats")}
                        >
                            Shop Bats
                        </Button>
                    </Box>
                </Box>
            </Paper>
            <Typography mt={5} sx={{
                color: colors.grey[800],
                fontSize: { xs: "1.5rem", sm: "2rem" },
                fontWeight: "bold",
                fontFamily: "'Poppins', cursive"
            }}>
                Why Choose BatMaster
            </Typography>
            <Box sx={{
                display: "flex",
                flexWrap: "nowrap",
                justifyContent: "flex-start",
                alignItems: "stretch",
                gap: 5,
                mt: 3,
                overflowX: { xs: "auto", md: "unset" },
                width: "100%",
                paddingLeft: "5%",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
                scrollSnapType: "x mandatory",
                pb: 2,
            }}>
                {CardData.map((card, index) => (
                    <Card key={index} sx={{
                        minWidth: { xs: "80%", sm: "45%", md: "23%" },
                        minHeight: "250px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                        bgcolor: "white",
                        p: 3,
                        borderRadius: 3,
                        textAlign: "center",
                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
                        cursor: "pointer",
                        transition: "transform 0.3s , box-shadow 0.3s ease",
                        scrollSnapAlign: "start",
                        "&:hover": {
                            transform: "scale(1.05)",
                            boxShadow: "0px 8px 40px rgba(0, 0, 0, 0.4)"
                        }
                    }}>
                        <img src={card.image} alt={card.title} style={{ width: "100px", height: "100px" }} />
                        <Typography sx={{
                            color: colors.grey[800],
                            fontSize: { xs: "1.2rem", sm: "1.5rem" },
                            fontWeight: "bold",
                            fontFamily: "'Poppins', cursive",
                            mt: 2
                        }}>
                            {card.title}
                        </Typography>
                        <Typography sx={{

                        }}
                        >
                            {card.label}
                        </Typography>
                    </Card>

                ))}
            </Box>
            <RenderServiceAvailable />
            <Box sx={{
                width: { xs: "90%", sm: "85%", md: "80%" },
                height: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#050825",
                mt: 10,
                borderRadius: "10px",
                flexDirection: "column",
                gap: { xs: 2, sm: 3, md: 4 },
                px: { xs: 3, sm: 5, md: 7 },
                py: { xs: 3, sm: 5, md: 7 },
                textAlign: "center"
            }}>
                <Typography sx={{
                    color: "white",
                    fontSize: { xs: "1.2rem", sm: "1.8rem", md: "2.5rem" },
                    fontWeight: "bold",
                    fontFamily: "'Poppins', cursive"
                }}>
                    Ready to Enhance Your Batting Game?
                </Typography>

                <Typography sx={{
                    color: "white",
                    fontSize: { xs: "0.9rem", sm: "1.1rem", md: "1.3rem" },
                    fontFamily: "Poppins, sans-serif",
                    maxWidth: "80%"
                }}>
                    Have a question? We're here to help.
                </Typography>

                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: { xs: 1, sm: 2, md: 3 },
                    mt: { xs: 2, sm: 3, md: 4 }
                }}>
                    <Button sx={{
                        bgcolor: "white",
                        color: "#0c134b",
                        px: { xs: 2, sm: 3, md: 5 },
                        py: { xs: 0.5, sm: 1, md: 1.2 },
                        borderRadius: "10px",
                        fontFamily: "Poppins, sans-serif",
                        fontSize: { xs: "0.9rem", sm: "1rem", md: "1.2rem" },
                        '&:hover': { bgcolor: "#ddd" }
                    }}>
                        Help
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
