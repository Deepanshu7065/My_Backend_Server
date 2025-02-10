
import { Box, colors, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { getJokes, GetProductApi, getSingleUser, } from "./AllGetApi"
import { useEffect, useState } from "react"
import { AddProductItems, DeleteTodo, DeleteUser, postJokes, UpdateUser } from "./AllPostApi"


const Todo = () => {
    const [details, setDetails] = useState({
        product_name: "",
        description: "",
        createdBy: "",
        price: "",
        quantity: "",

    })
    const [open, setOpen] = useState(false)
    const [jokes, setJokes] = useState([])
    const [singleId, setSingleId] = useState("")
    const { data } = getJokes()

    const { data: singleUserData } = getSingleUser({
        id: singleId
    })
    const { data: todoData } = GetProductApi()
    const { mutateAsync } = AddProductItems()
    const { mutateAsync: deleteUser } = DeleteTodo()




    const handleChange = (e: any) => {
        setDetails({
            ...details,
            [e.target.name]: e.target.name === "price" ? Number(e.target.value) : e.target.name === "quantity" ? Number(e.target.value) : e.target.value
        })
    }

    const saveData = async () => {
        try {
            await mutateAsync({ data: details })
            setDetails({
                product_name: "",
                description: "",
                createdBy: "",
                price: "",
                quantity: "",
            })

        } catch (error) {
            console.log(error)

        }
    }

    useEffect(() => {
        if (data?.data?.length > 0) {
            setDetails((prevDetails) => ({
                ...prevDetails,
                createdBy: prevDetails.createdBy || data?.data[0]._id,
            }));
        }
    }, [data]);
    const handleSetID = (id: any) => {
        setSingleId(id)
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
                            Products Name :
                        </span>
                        <TextField
                            name="product_name"
                            label="product_name"
                            onChange={handleChange}
                            value={details.product_name}
                        />
                    </div>
                    <div style={{ alignItems: "center", display: "flex", gap: 20, justifyContent: "space-around", width: "100%" }}>
                        <span style={{ color: "red", fontWeight: "bold", fontSize: "25px" }}>
                            User =
                        </span>
                        <select
                            name="createdBy"
                            value={details.createdBy}
                            onChange={handleChange}
                        >

                            {data?.data.map((user: any) => (
                                <option key={user._id} value={user._id}>
                                    {user.username}
                                </option>
                            ))}
                        </select>

                    </div>
                    <div style={{ alignItems: "center", display: "flex", gap: 20, justifyContent: "space-around", width: "100%" }}>
                        <span style={{ color: "red", fontWeight: "bold", fontSize: "25px" }}>
                            Description =
                        </span>
                        <TextField
                            name="description"
                            label="Password"
                            value={details.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ alignItems: "center", display: "flex", gap: 20, justifyContent: "space-around", width: "100%" }}>
                        <span style={{ color: "red", fontWeight: "bold", fontSize: "25px" }}>
                            Price =
                        </span>
                        <TextField
                            name="price"
                            label="Password"
                            value={details.price}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ alignItems: "center", display: "flex", gap: 20, justifyContent: "space-around", width: "100%" }}>
                        <span style={{ color: "red", fontWeight: "bold", fontSize: "25px" }}>
                            Quantity =
                        </span>
                        <TextField
                            name="quantity"
                            label="Password"
                            value={details.quantity}
                            onChange={handleChange}
                        />
                    </div>
                    <button onClick={saveData}>Submit</button>
                </div>

                <>
                    <div style={{

                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: 4,
                        marginTop: 50

                    }}>
                        {todoData?.map((item: any) => (
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: 20,
                                backgroundColor: colors.blue[200],
                                padding: 40,
                                borderRadius: 20,
                            }}>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <p>Created By: {item.createdBy?.username} ({item.createdBy?.email})</p> {/* Show createdBy details */}
                                <button onClick={() => {
                                    handleSetID(item?._id)
                                    setOpen(true)
                                }}>Update</button>
                                <button onClick={() => handleDlete(item._id)}>Delete</button>
                            </div>
                        ))}
                    </div>

                  
                </>
            </div >


        </>
    )

}

export default Todo