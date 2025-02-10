
import { Box, colors, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { getJokes, getSingleUser, } from "./AllGetApi"
import { useEffect, useState } from "react"
import { DeleteUser, postJokes, UpdateUser } from "./AllPostApi"
import { useNavigate } from "react-router-dom"


const User = () => {
    const navigate = useNavigate()
    const [details, setDetails] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [open, setOpen] = useState(false)
    const [jokes, setJokes] = useState([])
    const [singleId, setSingleId] = useState("")
    const { data } = getJokes()
    const { data: singleUserData } = getSingleUser({
        id: singleId
    })

    const { mutateAsync } = postJokes()
    const { mutateAsync: deleteUser } = DeleteUser()
    const { mutateAsync: updateUser } = UpdateUser()

    const [updatedata, setUpdateData] = useState({
        username: singleUserData?.username,
        email: singleUserData?.email,
        password: singleUserData?.password
    })


    useEffect(() => {
        if (singleUserData) {
            setUpdateData({
                username: singleUserData?.username,
                email: singleUserData?.email,
                password: singleUserData?.password
            })
        }
    }, [singleId, singleUserData])


    const handleUpdateChange = (e: any) => {
        setUpdateData({ ...updatedata, [e.target.name]: e.target.value })
    }


    const handleChange = (e: any) => {
        setDetails({ ...details, [e.target.name]: e.target.value })
    }

    const saveData = async () => {
        try {
            await mutateAsync({ data: details })
            setDetails({
                username: "",
                email: "",
                password: ""
            })

        } catch (error) {
            console.log(error)

        }
    }

    useEffect(() => {
        setJokes(data?.data)
    }, [data])

    const handleSetID = (id: any) => {
        setSingleId(id)
    }

    const handleUpadte = async () => {
        try {
            await updateUser({ id: singleId, data: updatedata })
            setOpen(false)
        } catch (error) {
            console.log(error)

        }
    }

    const handleDlete = async (id: any) => {
        await deleteUser({ id })
    }

    return (
        <>

           
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: -210,
                width: "100vw",
                height: "100vh"
            }}>
                <h1 style={{ color: "green" }}>Hello Connect my server</h1>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 20,
                    width: 1400,
                    backgroundColor: colors.amber[200],
                    padding: 40,
                    borderRadius: 20,
                    textAlign: "center"
                }}>
                    <div style={{ color: "red", alignItems: "center", display: "flex", gap: 20, justifyContent: "space-around", width: "100%" }}>
                        <span style={{ color: "red", fontWeight: "bold", fontSize: "25px" }}>
                            Name :
                        </span>
                        <TextField
                            name="username"
                            label="Username"
                            onChange={handleChange}
                            value={details.username}
                        />
                    </div>
                    <div style={{ alignItems: "center", display: "flex", gap: 20, justifyContent: "space-around", width: "100%" }}>
                        <span style={{ color: "red", fontWeight: "bold", fontSize: "25px" }}>
                            email =
                        </span>
                        <TextField
                            name="email"
                            label="Email"
                            value={details.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ alignItems: "center", display: "flex", gap: 20, justifyContent: "space-around", width: "100%" }}>
                        <span style={{ color: "red", fontWeight: "bold", fontSize: "25px" }}>
                            password =
                        </span>
                        <TextField
                            name="password"
                            label="Password"
                            value={details.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button onClick={saveData}>Submit</button>
                </div>
                <div>
                    <button onClick={() => navigate("/items")}>
                        Go to Items
                    </button>
                </div>

                <>
                    <div style={{

                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: 4,
                        marginTop: 50

                    }}>
                        {jokes?.map((item: any) => {
                            return (
                                <div style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: 20,
                                    backgroundColor: colors.blue[200],
                                    padding: 40,
                                    borderRadius: 20,

                                }}>
                                    <h3>{item.username}</h3>
                                    <p>{item.email}</p>
                                    <button onClick={() => {
                                        handleSetID(item?._id)
                                        setOpen(true)
                                    }}>Update</button>
                                    <button onClick={() => handleDlete(item._id)}>Delete</button>
                                </div>
                            )
                        })}
                    </div>

                    <div>
                        <Dialog open={open} onClose={() => setOpen(false)}
                            sx={{
                                "& .MuiDialog-paper": {
                                    width: 500,
                                    height: 400
                                }
                            }}
                        >
                            <DialogTitle>Update User</DialogTitle>
                            <DialogContent>
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: 4
                                }}>
                                    <div>
                                        <TextField
                                            name="username"
                                            label="Username"
                                            onChange={handleUpdateChange}
                                            value={updatedata.username}
                                            variant="outlined"
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            variant="outlined"
                                            name="email"
                                            label="Email"
                                            value={updatedata.email}
                                            onChange={handleUpdateChange}
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            variant="outlined"
                                            name="password"
                                            label="Password"
                                            value={updatedata?.password}
                                            onChange={handleUpdateChange}
                                        />
                                    </div>
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <button onClick={() => setOpen(false)}>Cancel</button>
                                <button onClick={handleUpadte}>Update</button>
                            </DialogActions>

                        </Dialog>

                    </div>

                </>
            </div >
        </>
    )

}

export default User