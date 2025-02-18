
import { Avatar, Box, Card, CardContent, colors, Grid, IconButton, Stack, Tab, Tabs, Typography } from "@mui/material"
import { getJokes, } from "../AllGetApi"
import { useEffect, useState } from "react"
import { DeleteUser, } from "../AllPostApi"
import { useNavigate } from "react-router-dom"
import { Delete, Edit, } from "@mui/icons-material"
import { useDispatch } from "react-redux"
import { setUserId } from "../Store/EditUserSlice"


const User = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [value, setValue] = useState(0);
    const handleChangeTabs = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const [jokes, setJokes] = useState([])
    const { data } = getJokes()

    const { mutateAsync: deleteUser } = DeleteUser()
    useEffect(() => {
        setJokes(data?.data)
    }, [data])

    const handleDlete = async (id: string) => {
        const isConfirm = window.confirm("Are you sure you want to delete this user?")
        if (!isConfirm) return
        try {
            await deleteUser({ id })
        } catch (error) {
            const err = error as any
            console.log(err)

        }
    }

    return (
        <Box sx={{
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 3
        }}>
            <Box sx={{
                width: "80%",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                gap: "1rem"
            }}>
                <Stack mt={7} direction={"row"} alignItems={"center"} width="100%" justifyContent={"space-between"}>
                    <Stack justifyContent={"flex-start"}>
                        <Typography variant="h4" fontWeight="bold" fontFamily={"Dancing Script, cursive"}>
                            All Users
                        </Typography>
                        <Typography variant="subtitle1" color="gray" fontFamily={"'monospace', sans-serif"}>
                            All Users Show in here Admin And Customers
                        </Typography>
                    </Stack>
                    <button style={{
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "10px",
                        color: "white",
                        backgroundColor: colors.grey[700],
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}
                        onClick={() => navigate("/add-user")}
                    >
                        Add New Admin +
                    </button>
                </Stack>

                <Box sx={{
                    width: "100%",
                    p: 2,
                    bgcolor: "#d9d8d8",
                    borderRadius: "15px"
                }}>
                    <Grid container spacing={2}>
                        {[1, 2, 3].map((item) => (
                            <Grid item xs={12} sm={6} md={4} key={item}>
                                <Card sx={{
                                    width: "100%",
                                    height: "150px",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1rem",
                                    boxShadow: 3,
                                    borderRadius: "10px",
                                    p: 2,
                                    margin: "auto",
                                }}>
                                    <CardContent sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        textAlign: "center",
                                        width: "100%",
                                        height: "100%"
                                    }}>
                                        <Typography sx={{
                                            fontSize: "1.2rem",
                                            fontWeight: "bold",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            width: "100%",
                                            alignItems: "center"
                                        }} variant="h5" >
                                            <Stack alignItems={"start"}>
                                                <Typography sx={{ fontSize: "1rem" }}>
                                                    All User
                                                </Typography>
                                                <span style={{
                                                    fontSize: "2.2rem",
                                                }}>1000</span>
                                            </Stack>
                                            <Avatar sx={{ width: 56, height: 56, }} />
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Box sx={{
                    display: "flex",
                    width: "100%",
                    mt: 2,
                    flexDirection: "column",

                }}>
                    <Typography sx={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        mb: 2,
                        fontFamily: "'monospace', sans-serif",
                    }}>
                        Users
                    </Typography>
                    <Box sx={{
                        display: "flex",
                        width: "100%",
                        alignItems: "flex-start",
                        textAlign: "start"
                    }}
                    >
                        <Tabs
                            orientation="horizontal"
                            value={value}
                            onChange={handleChangeTabs}
                            sx={{
                                "& .MuiTabs-flexContainer": {
                                    flexDirection: "row"
                                },
                                bgcolor: "grey.50",
                                borderRadius: "5px",
                                boxShadow: "rgba(0, 0, 0, 0.24) 0px 1px 1px",
                                width: "fit-content",
                                p: 1,
                                "& .MuiTabs-indicator": {
                                    bgcolor: "white",
                                    height: "0px",
                                },
                                "& .MuiTab-root": {
                                    textTransform: "none",
                                    fontSize: "0.8rem",
                                    fontWeight: "bold",
                                    borderRadius: "5px",
                                    transition: "all 0.3s",
                                    fontFamily: "'monospace', sans-serif",
                                },
                                "& .Mui-selected": {
                                    bgcolor: "white !important",
                                    color: "black !important",
                                    boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 6px",
                                }
                            }}
                        >
                            <Tab label="All Users" />
                            <Tab label="Customers" />
                            <Tab label="Admin" />
                        </Tabs>
                    </Box>
                    <Box sx={{
                        width: "100%",
                        flexDirection: "column",
                    }}>
                        <div className="table_user_all">

                            <table style={{

                            }}>
                                <thead>
                                    <tr>
                                        <th style={{ width: "5%", textAlign: "left", padding: 2 }}>Id</th>
                                        <th style={{
                                            width: "30%",
                                        }}>Name</th>
                                        <th style={{ width: "30%" }}>Email</th>
                                        <th>Phone</th>
                                        <th>User Type</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jokes?.map((item: any, index: number) => (
                                        <tr key={item?._id}>
                                            <td>{index + 1}</td>
                                            <td>{item?.userName}</td>
                                            <td style={{
                                                fontFamily: "monospace"
                                            }}>{item?.email}</td>
                                            <td>{item?.phone}</td>
                                            <td>{item?.userType}</td>
                                            <td>
                                                <IconButton>
                                                    <Edit onClick={() => dispatch(setUserId(item?._id))} />
                                                </IconButton>
                                                <IconButton >
                                                    <Delete onClick={() => handleDlete(item?._id)} />
                                                </IconButton>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </Box>
                </Box>
            </Box>
        </Box >
    )

}

export default User