import { Box, colors, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { loginVerify } from "./AllPostApi"

import { useNavigate } from "react-router-dom"

const Login = () => {

    const { mutateAsync } = loginVerify()

    const [logindata, setLoginData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const subMit = async () => {
        try {
            const res = await mutateAsync({ data: logindata });
            localStorage.setItem("token", res?.data?.accessToken);
            navigate("/");
        } catch (error) {
            console.error("Login failed:", error);
        }
    };


    return (
        <Box sx={{
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
        }}>
            <Box sx={{
                width: "900px",
                height: "600px",
                backgroundColor: colors.indigo[100],
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50px"
            }}>
                <Stack gap={2} >
                    <Typography variant="h6" align="center" color="white">Login</Typography>
                    <div>
                        <Stack
                            mt={2}
                            gap={2}
                            direction="row"
                            alignItems={"center"}
                            justifyContent={"space-between"}
                        >
                            <Typography color="white">User NAme</Typography>
                            <TextField>

                            </TextField>
                        </Stack>
                        <Stack justifyContent={"space-between"} mt={2} gap={2} direction="row" alignItems={"center"}>
                            <Typography color="white">Email</Typography>
                            <TextField value={logindata.email} onChange={(e) => setLoginData({ ...logindata, email: e.target.value })}>

                            </TextField>
                        </Stack>
                        <Stack justifyContent={"space-between"} mt={2} gap={2} direction="row" alignItems={"center"}>
                            <Typography color="white">Password</Typography>
                            <TextField value={logindata.password} onChange={(e) => setLoginData({ ...logindata, password: e.target.value })}>

                            </TextField>
                        </Stack>
                    </div>
                    <button style={{
                        marginTop: "20px"
                    }} onClick={subMit}>Submit</button>
                </Stack>

            </Box>

        </Box>
    )
}

export default Login