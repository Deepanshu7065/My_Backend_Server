import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useState } from "react";
import { loginVerify, postUser, } from "./AllPostApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCustomerUser } from "./Store/CustomerUserSaveSlice";


const AuthContainer = () => {
    const [page, setPage] = useState("login");

    return (
        <>
            {page === "login" ? <Login setPage={setPage} /> : <Register setPage={setPage} />}
        </>
    );
};

export default AuthContainer;
const Login = ({ setPage }: any) => {
    const { mutateAsync } = loginVerify();
    const [logindata, setLoginData] = useState({ email: "", password: "" });
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const subMit = async () => {
        try {
            const res = await mutateAsync({ data: logindata });
            if (res?.status === 200) {
                localStorage.setItem("token", res?.data?.accessToken);
                localStorage.setItem("user", JSON.stringify(res?.data?.user));
                dispatch(setCustomerUser(res?.data?.user))
                navigate("/")
            }

        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <Box sx={{
            display: "flex",
        }}>
            <Box sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                backgroundImage: "url(./cricket.avif)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(0px)",
                zIndex: 1,
            }}>

            </Box>
            <Box sx={{
                width: "100%", height: "90vh",
                display: "flex", justifyContent: "end", alignItems: "center",
                marginRight: "200px",
            }}>
                <Paper elevation={3} sx={{
                    width: 400, p: 4, borderRadius: 3,
                    display: "flex", flexDirection: "column", alignItems: "center",
                    position: "relative",
                    zIndex: 2,
                    bgcolor: "rgba(255, 255, 255, 0.8)"
                }}>
                    <Typography variant="h6" mb={2} fontFamily={"Pacifico"} fontWeight={"bold"}>LOGIN</Typography>
                    <TextField
                        label={
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                Email
                            </Box>
                        }
                        fullWidth
                        size="small"
                        margin="normal"
                        value={logindata.email}
                        sx={{
                            "& .MuiInputBase-root": {
                                color: "black",
                                fontFamily: "monospace",

                            },
                            fontFamily: "Pacifico"
                        }}
                        onChange={(e) => setLoginData({ ...logindata, email: e.target.value })}
                    />
                    <TextField
                        label={
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                Password
                            </Box>
                        }
                        size="small"
                        sx={{
                            "& .MuiInputBase-root": {
                                color: "black",
                                fontFamily: "monospace",

                            },
                            fontFamily: "Pacifico"
                        }}
                        type="password"
                        fullWidth
                        margin="normal"
                        value={logindata.password}
                        onChange={(e) => setLoginData({ ...logindata, password: e.target.value })}
                    />
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2, fontFamily: "monospace", fontWeight: 800 }}
                        onClick={subMit}
                    >Submit</Button>
                    <Box mt={2}>Don't have an account?
                        <span onClick={() => setPage("register")}
                            style={{
                                color: "blue",
                                cursor: "pointer"
                            }}>Register</span></Box>
                </Paper>
            </Box>

        </Box >
    );
};

const Register = ({ setPage }: any) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [registerData, setRegisterData] = useState({ username: "", email: "", password: "", phone: "" });
    const { mutateAsync } = postUser();

    const handleSubmitRegister = async () => {
        try {
            const res = await mutateAsync({
                data: {
                    userName: registerData.username,
                    email: registerData.email,
                    password: registerData.password,
                    phone: Number(registerData.phone),
                    userType: "customer"
                }
            });
            if (res?.status === 200) {
                navigate("/");
                localStorage.setItem("token", res?.data?.accessToken);
                localStorage.setItem("user", JSON.stringify(res?.data?.user));
                const user = JSON.parse(localStorage.getItem("user") as string);
                dispatch(setCustomerUser(user))
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box sx={{
            display: "flex",
        }}>
            <Box sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                backgroundImage: "url(./cricket.avif)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                zIndex: 1,
            }}>
            </Box>
            <Box sx={{
                width: "100%", height: "90vh",
                display: "flex", justifyContent: "end", alignItems: "center",
                marginRight: "200px",
            }}>
                <Paper elevation={3} sx={{
                    width: 400, p: 4, borderRadius: 3,
                    display: "flex", flexDirection: "column", alignItems: "center",
                    position: "relative",
                    zIndex: 2,
                    bgcolor: "rgba(255, 255, 255, 0.8)"
                }}>

                    <Typography variant="h5" fontFamily={"Pacifico"} mb={2} fontWeight={600}>Register</Typography>
                    <TextField
                        label={
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                Phone
                            </Box>
                        }
                        fullWidth
                        margin="normal"
                        sx={{
                            "& .MuiInputBase-root": {
                                color: "black",
                                fontFamily: "monospace",

                            },
                            fontFamily: "Pacifico"
                        }}
                        value={registerData.phone}
                        onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                    />
                    <TextField
                        label={
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                Username
                            </Box>
                        }
                        fullWidth
                        margin="normal"
                        sx={{
                            "& .MuiInputBase-root": {
                                color: "black",
                                fontFamily: "monospace",

                            },
                            fontFamily: "Pacifico"
                        }}
                        value={registerData.username}
                        onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                    />
                    <TextField
                        label={
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                Email
                            </Box>
                        }
                        fullWidth
                        margin="normal"
                        sx={{
                            "& .MuiInputBase-root": {
                                color: "black",
                                fontFamily: "monospace",

                            },
                            fontFamily: "Pacifico"
                        }}
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    />
                    <TextField
                        label={
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                Password
                            </Box>
                        }
                        type="password"
                        sx={{
                            "& .MuiInputBase-root": {
                                color: "black",
                                fontFamily: "monospace",

                            },
                            fontFamily: "Pacifico"
                        }}
                        fullWidth
                        margin="normal"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    />
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2, fontFamily: "inherit", fontWeight: 600 }}
                        onClick={handleSubmitRegister}
                    >Register</Button>
                    <Box mt={2}>
                        Already have an account? <span onClick={() => setPage("login")} style={{ color: "blue", cursor: "pointer" }}>Login
                        </span>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};


export { Login, Register };