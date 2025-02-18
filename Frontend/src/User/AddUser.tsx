import { ForwardSharp } from "@mui/icons-material";
import { Box, Paper, Stack, TextField, Button, Typography, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { postUser } from "../AllPostApi";

// const image = [
//     "public/cricket.avif",
// ]
const Footer = () => {
    return (
        <Box sx={{
            mt: 4,
            width: "100%",
            py: 2,
            textAlign: "center",
            backgroundColor: "#cfcfcf",
            color: "#333",
            fontSize: "14px",
        }}>
            <Typography variant="body2">© 2025 YourCompany. All Rights Reserved.</Typography>
            <Typography variant="body2">
                <a href="/privacy" style={{ textDecoration: "none", color: "#333" }}>Privacy Policy</a> |
                <a href="/contact" style={{ textDecoration: "none", color: "#333", marginLeft: "10px" }}>Contact</a>
            </Typography>
        </Box>
    );
};


const AddUser = () => {
    const [user, setUser] = useState({
        userName: "",
        email: "",
        userType: "",
        password: "",
        phone: "",
    });
    const { mutateAsync } = postUser()
    // const [currentImage, setCurrentImage] = useState(0);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await mutateAsync({ data: user })
            setUser({
                userName: "",
                email: "",
                userType: "",
                password: "",
                phone: "",
            })
        } catch (error) {
            console.log(error)

        }

    };

    const handleBack = () => {
        window.history.back()
    }

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            width: "100vw",
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: 0, md: 2 },
            px: 2,
        }}>
            <Box sx={{
                width: { xs: "100%", md: "80%" },
                display: "flex",
                mt: 10,
                justifyContent: "space-between",
            }}>
                <Typography
                    sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        fontWeight: "bold",
                        fontSize: { xs: "1.5rem", md: "2rem" },
                        alignSelf: "flex-start",
                        fontFamily: "monospace, cursive",
                    }}
                >
                    Add User
                </Typography>
                <ForwardSharp onClick={handleBack} sx={{ cursor: "pointer" }} />
            </Box>
            <Box sx={{
                width: { xs: "100%", sm: "90%", md: "80%" },
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: { xs: 0, md: 2 },
                mt: { xs: 0, md: 4 }
            }}>
                <Box sx={{
                    width: { xs: 0, md: "70%" },
                    height: "500px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "20px",
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                    overflow: "hidden",
                    position: "relative",
                }}>
                    <img
                        src={"public/cricket.avif"}
                        alt="Slider"
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "20px",
                            objectFit: "cover",
                            // transition: "opacity 0.1s ease-in-out, transform 0.1s ease-in-out",
                            // opacity: isTransitioning ? 0.8 : 1,
                            // transform: isTransitioning ? "scale(1.05)" : "scale(1)",
                        }}
                    />
                </Box>
                <Box component={Paper} sx={{
                    p: 4,
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRadius: "10px",
                    width: { xs: "100%", md: "50%" },
                    minHeight: "400px",
                    justifyContent: "center",

                }}>
                    <Typography variant="h5" fontWeight="bold" mb={2}>
                        Add User
                    </Typography>

                    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                        <Stack spacing={2}>
                            <TextField
                                label="User Name"
                                variant="outlined"
                                size="small"
                                fullWidth
                                name="userName"
                                value={user.userName}
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                size="small"
                                name="email"
                                type="email"
                                value={user.email}
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                select
                                label="User Type"
                                variant="outlined"
                                fullWidth
                                size="small"
                                name="userType"
                                value={user.userType}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="Admin">Admin</MenuItem>
                                <MenuItem value="Customer">Customer</MenuItem>
                            </TextField>
                            <TextField
                                label="Password"
                                variant="outlined"
                                fullWidth
                                size="small"
                                name="password"
                                type="password"
                                value={user.password}
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                label="Phone Number"
                                variant="outlined"
                                fullWidth
                                name="phone"
                                size="small"
                                type="tel"
                                value={user.phone}
                                onChange={handleChange}
                                required
                            />
                            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                                Add User
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Box>
            <Box sx={{
                position: "fixed",
                width: "100%",
                flex: 1,
                bottom: 1
            }}>
                <Footer />
            </Box>
        </Box>
    );
};

export default AddUser;
