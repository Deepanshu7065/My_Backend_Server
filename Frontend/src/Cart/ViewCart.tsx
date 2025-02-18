import { Box, Button, Card, CardContent, colors, Stack, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../Store'
import { imageUrl } from '../ApiEndPoint'
import { setDecreaseQuantity, setIncreaseQuantity, setRemoveProduct } from '../Store/ProductDetailsSlice'
import { Delete } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'

const ViewCart = () => {
    const products = useSelector((state: RootState) => state.ProductId.products)
    const dispatch = useDispatch()
    const { user } = useSelector((state: RootState) => state.CustomerUser)
    const navigate = useNavigate()

    const handleProceed = () => {
        if (user?.userName === "") {
            alert("Please login first")
            navigate("/login")

        } else {
            navigate("/checkout")
        }
    }

    // const products = [
    //     {
    //         product_name: "Bat",
    //         quantity: "2",
    //         price: 100,
    //         total: 200,
    //         image: "",
    //         description: "jkasjj",
    //         _id: "lkashdfh"
    //     },
    //     {
    //         product_name: "Bat",
    //         quantity: "2",
    //         price: 100,
    //         total: 200,
    //         image: "",
    //         description: "jkasjj",
    //         _id: "asdkjgfajksg"
    //     }
    // ]
    return (
        <Box sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
        }}>
            <Box sx={{
                width: { md: "80%", xs: "100%" },
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column"
            }}>
                {
                    products?.length > 0 ? (
                        <Stack direction="column" width="100%" height="100%">
                            <Typography sx={{
                                fontSize: { sm: "1rem", md: "1.2rem" },
                                fontWeight: "bold",
                                display: "flex",
                                width: "80%",
                                fontFamily: "monospace, cursive",
                                alignItems: "flex-start",
                                mt: 12
                            }}>
                                Your cart
                            </Typography>
                            <div className='table_cart'>
                                <table >
                                    <tr>
                                        <th style={{ width: "50%" }}>Product</th>
                                        <th style={{ width: "20%" }}>Quantity</th>
                                        <th style={{ width: "20%" }}>Price</th>
                                        <th style={{ width: "20%" }}>Total</th>
                                        <th style={{ width: "20%" }}>Remove</th>
                                    </tr>
                                    <tbody>
                                        {products.map((item) => {
                                            const totalPrice = Number(item.quantity) * Number(item.price ?? 0)
                                            return (
                                                <tr key={item._id}>
                                                    <td style={{
                                                        fontFamily: "monospace, cursive"
                                                    }}>
                                                        <Stack direction="row" alignContent={"center"} alignItems={"center"} spacing={1}>
                                                            <img src={`${imageUrl}${item.image}`} alt={item.product_name} style={{ width: "50px", height: "50px" }} />
                                                            <div style={{
                                                                display: "flex",
                                                                flexDirection: "column"
                                                            }}>
                                                                <span style={{ fontWeight: "bold" }}>
                                                                    {item.product_name}
                                                                </span>
                                                                <span style={{ color: "grey", fontWeight: 200 }}>
                                                                    {item.description}
                                                                </span>
                                                            </div>
                                                        </Stack>
                                                    </td>
                                                    <td>
                                                        <Stack direction="row" spacing={2} alignItems={"center"}>
                                                            <button style={{
                                                                display: "flex",
                                                                width: "30px",
                                                                height: "30px",
                                                                padding: 5,
                                                                backgroundColor: "white",
                                                                border: "1px solid rgba(0,0,0,0.1)",
                                                                color: "rgba(0,0,0,0.5)",
                                                                fontSize: "1.5rem",
                                                                borderRadius: "5px",
                                                                cursor: "pointer",
                                                                alignItems: "center",
                                                                textAlign: "center",
                                                                justifyContent: "center"
                                                            }}
                                                                onClick={() => dispatch(setIncreaseQuantity(item._id))}
                                                            >
                                                                +
                                                            </button>
                                                            <span style={{ fontWeight: "bold", fontFamily: "Dancing Script" }}>
                                                                {item.quantity}
                                                            </span>
                                                            <button style={{
                                                                display: "flex",
                                                                width: "30px",
                                                                height: "30px",
                                                                padding: 5,
                                                                backgroundColor: "white",
                                                                border: "1px solid rgba(0,0,0,0.1)",
                                                                color: "rgba(0,0,0,0.5)",
                                                                fontSize: "1.5rem",
                                                                borderRadius: "5px",
                                                                cursor: "pointer",
                                                                alignItems: "center",
                                                                textAlign: "center",
                                                                justifyContent: "center"
                                                            }}
                                                                onClick={() => dispatch(setDecreaseQuantity(item._id))}
                                                            >
                                                                -
                                                            </button>
                                                        </Stack>
                                                    </td>
                                                    <td>{item.price}</td>
                                                    <td>{totalPrice}</td>
                                                    <td><Delete sx={{
                                                        cursor: "pointer",
                                                        color: "rgb(0,0,0,0.8)"
                                                    }}
                                                        onClick={() => dispatch(setRemoveProduct(item._id))}
                                                    /></td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>

                            </div>
                            <Stack width="100%"
                                height="10%" bgcolor={"white"}
                                direction="row"
                                justifyContent={"flex-end"} mt={5}>
                                <Stack spacing={1} direction="column" alignItems={"flex-end"}>
                                    <Typography sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        fontWeight: "bold",
                                        gap: 2,
                                        fontSize: "1.2rem"
                                    }}>
                                        <span style={{ fontWeight: "bold", fontFamily: "monospace" }}>
                                            Total:
                                        </span>
                                        <span style={{ fontWeight: "bold", fontFamily: "monospace" }}>
                                            ${products.reduce((acc, item) => acc + Number(item.price ?? 0) * Number(item.quantity), 0)}
                                        </span>
                                    </Typography>
                                    <Button sx={{
                                        backgroundColor: colors.grey[900],
                                        color: "white",
                                        borderRadius: "10px",
                                        padding: 1,
                                        fontSize: "0.8rem",
                                        width: "200px",
                                        fontFamily: "monospace, cursive",
                                        fontWeight: "bold",
                                    }}
                                        onClick={handleProceed}
                                    >
                                        Proceed To CheckOut
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack>
                    ) : (
                        <Box sx={{
                            width: { md: "80%", xs: "100%" },
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            mt: 10,
                            textAlign: "center",
                            p: 10
                        }}>
                            <Typography sx={{
                                fontSize: { sm: "0.8rem", md: "2.2rem" },
                                fontWeight: "bold",
                                display: "flex",
                                fontFamily: "monospace, cursive",
                                alignItems: "flex-start",
                                color: "black",
                            }}>
                                Your cart is empty
                            </Typography>
                            <Typography sx={{
                                fontSize: { sm: "0.7rem", md: "1.1rem" },
                                display: "flex",
                                fontFamily: "monospace, cursive",
                                alignItems: "flex-start",
                                color: "grey.500",
                                mt: 2
                            }}>
                                Add some items to your cart to get started
                            </Typography>
                            <Button variant="contained" sx={{
                                mt: 5,
                                backgroundColor: colors.grey[800],
                                borderRadius: "15px",
                            }}>
                                <Link to="/shop_bats" style={{
                                    color: "white",
                                    textDecoration: "none",
                                    fontWeight: "bold",
                                    fontFamily: "monospace, cursive",
                                    letterSpacing: "1.4px",
                                }}>
                                    Shop Now
                                </Link>
                            </Button>
                        </Box>
                    )
                }


            </Box>
        </Box >
    )
}

export default ViewCart