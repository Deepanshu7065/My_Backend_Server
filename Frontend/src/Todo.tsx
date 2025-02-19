
import { Box, colors, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { GetProductApi, getSingleUser, getUsers, } from "./AllGetApi"
import { useEffect, useState } from "react"
import { AddProductItems, DeleteTodo, DeleteUser, } from "./AllPostApi"
import { UserType } from "./AllTypes"


const Todo = () => {
    const [details, setDetails] = useState({
        product_name: "",
        description: "",
        createdBy: "",
        price: "",
        quantity: "",
        image: "",

    })
    const [open, setOpen] = useState(false)
    const [jokes, setJokes] = useState([])
    const [singleId, setSingleId] = useState("")
    const { data } = getUsers({
        search: "",
        filter: ""
    })

    const { data: singleUserData } = getSingleUser({
        id: singleId
    })
    const { data: todoData } = GetProductApi({
        search: ""
    })
    const { mutateAsync } = AddProductItems()
    const { mutateAsync: deleteUser } = DeleteTodo()




    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDetails({
            ...details,
            [e.target.name]: e.target.name === "price" ? Number(e.target.value) : e.target.name === "quantity" ? Number(e.target.value) : e.target.value
        })
    }

    const saveData = async () => {
        const formData = new FormData();
        formData.append("product_name", details.product_name);
        formData.append("description", details.description);
        formData.append("createdBy", details.createdBy);
        formData.append("price", details.price);
        formData.append("quantity", details.quantity);
        if (details.image) {
            formData.append("image", details.image);
        }
        try {
            await mutateAsync({ data: formData })
            // setDetails({
            //     product_name: "",
            //     description: "",
            //     createdBy: "",
            //     price: "",
            //     quantity: "",
            //     image: "",
            // })

        } catch (error) {
            console.log(error)

        }
    }

    useEffect(() => {
        if ((data?.users?.length ?? 0) > 0) {
            setDetails((prevDetails: any) => ({
                ...prevDetails,
                createdBy: prevDetails?.createdBy || data?.users[0]._id,
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
                width: "100%",
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
                            onChange={(e) => setDetails({ ...details, createdBy: e.target.value })}
                        >

                            {data?.users?.map((user) => (
                                <option key={user._id} value={user._id}>
                                    {user.userName}
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
                    <div>
                        <span style={{ color: "red", fontWeight: "bold", fontSize: "25px" }}>
                            Image =
                        </span>
                        <TextField
                            name="image"
                            type="file"
                            onChange={(e: any) => {
                                setDetails({ ...details, image: e.target.files[0] })
                            }}
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
                        {todoData?.products?.map((item: any) => (
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
                                <p>Created By: {item.createdBy?.userName} ({item.createdBy?.email})</p>
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