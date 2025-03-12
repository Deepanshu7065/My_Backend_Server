

import React, { useState } from 'react'
import { getUsers } from '../AllGetApi'
import { Box, Card, CardContent, Chip, colors, InputAdornment, Stack, Tab, Tabs, TextField, Typography } from '@mui/material'
import { Delete, Edit, Forward, Search } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { setUserId } from '../Store/EditUserSlice'
import { DeleteUser } from '../AllPostApi'
import { CustomPagination } from '../ShopBats/AddBatsForm'
import { LazyImage } from '../App'

const MobileUserView = () => {

    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("All")
    const [value, setValue] = useState(0);
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        setFilter(newValue === 0 ? "All" : newValue === 1 ? "Customer" : "Admin")
    };

    const { data: userList } = getUsers({
        search: search,
        filter: filter,
        page,
        limit
    })
    const { mutateAsync: deleteUser } = DeleteUser()
    const dispatch = useDispatch()
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
            mt: 8,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            p: 1
        }}>

            <Typography sx={{
                width: "100%",
                display: "flex",
                fontSize: "1.2rem",
                fontWeight: "bold",
                textAlign: "center",
                alignItems: "flex-start",
                fontFamily: "monospace, cursive",
                justifyContent: "space-between",
            }}>
                Users:-
                <span>
                    <Forward sx={{ fontSize: "1.2rem" }} onClick={() => window.history.back()} />
                </span>
            </Typography>
            <Tabs
                orientation="horizontal"
                value={value}
                onChange={handleTabChange}
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
            <Box sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                mt: 2,
                bgcolor: "#d9d9d9",
                borderRadius: "10px",
                p: 1,
                minHeight: "70vh",
                overflowY: "auto"
            }}>


                <TextField
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{
                        width: "100%",
                        bgcolor: "white",
                        borderRadius: "5px",
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "5px",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                        }
                    }}
                    size="small"
                    placeholder="Search User"
                    variant="outlined"
                    value={search}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search sx={{ color: "gray" }} />
                            </InputAdornment>
                        ),
                    }}
                />

                {userList?.users?.map((item, index) => {
                    return (
                        <Card key={index} sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            bgcolor: "white",
                            minHeight: "100px",
                            transition: "all 0.4s ease-in-out",
                            "&:hover": {
                                transform: "scale(1.02)",
                            },
                            mt: 1,
                            borderRadius: "10px"
                        }}>
                            <CardContent sx={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                            }}>
                                <div style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    fontWeight: "bold",
                                    fontFamily: "monospace, cursive",
                                }}>
                                    <Edit sx={{
                                        cursor: "pointer",
                                        fontSize: "1rem",
                                    }}
                                        onClick={() => dispatch(setUserId(item?._id))}
                                    />
                                    <Delete sx={{
                                        cursor: "pointer",
                                        fontSize: "1rem"
                                    }}
                                        onClick={() => handleDlete(item?._id || "")}
                                    />
                                </div>

                                <Stack sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    mt: 1
                                }}
                                    direction={"row"}
                                    alignItems={"center"}
                                >
                                    <div>
                                        <Typography sx={{
                                            width: "100%",
                                            display: "flex",
                                            fontSize: "1rem",
                                            fontWeight: "bold",
                                            textAlign: "center",
                                            alignItems: "flex-start",
                                            fontFamily: "monospace, cursive",
                                        }}>
                                            {item.userName}
                                        </Typography>
                                        <Typography sx={{
                                            width: "100%",
                                            display: "flex",
                                            fontSize: "0.8rem",
                                            textAlign: "center",
                                            alignItems: "flex-start",
                                            fontFamily: "monospace, cursive",
                                        }}>
                                            {item.email}
                                        </Typography>
                                        <Typography sx={{
                                            width: "100%",
                                            display: "flex",
                                            fontSize: "0.8rem",
                                            textAlign: "center",
                                            alignItems: "flex-start",
                                            fontFamily: "monospace, cursive",
                                        }}>
                                            {item.phone}
                                        </Typography>
                                    </div>
                                    <div>
                                        <LazyImage src='/src/assets/user_view.png' alt='user' style={{ width: "50px", height: "50px" }} />
                                    </div>
                                </Stack>
                                <Chip sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontSize: "0.8rem",
                                    fontWeight: "bold",
                                    fontFamily: "monospace, cursive",
                                    bgcolor: item.userType === "Customer" ? colors.blue[200] : colors.green[200],
                                }} label={item.userType} />
                            </CardContent>
                        </Card>
                    )
                })}

            </Box>
            <Stack sx={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center"
            }}>
                <CustomPagination
                    page={page}
                    limit={limit}
                    setPage={setPage}
                    total={Math.ceil((userList?.totalUser ?? 0) / limit)}
                    setLimit={setLimit}
                />
            </Stack>

        </Box>
    )
}

export default MobileUserView