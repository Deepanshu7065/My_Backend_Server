import { Box, Card, CardContent, Typography } from '@mui/material'
import { GetProductApi } from '../AllGetApi'
import { baseUrl } from '../ApiEndPoint'

const ShopBats = () => {
    const { data: card } = GetProductApi()


    // const card = [
    //     {
    //         id: "1",
    //         image: "./images (7).jpeg",
    //         title: "bat",
    //         description: "hhh",
    //         price: "120"
    //     },
    //     {
    //         id: "2",
    //         image: "./images (7).jpeg",
    //         title: "dddd",
    //         description: "e",
    //         price: "12"
    //     },
    //     {
    //         id: "3",
    //         image: "./images (7).jpeg",
    //         title: "ddd",
    //         description: "e",
    //         price: "12"
    //     },
    //     {
    //         id: "4",
    //         image: "./images (7).jpeg",
    //         title: "d",
    //         description: "e",
    //         price: "12"
    //     },
    //     {
    //         id: "5",
    //         image: "./images (7).jpeg",
    //         title: "d",
    //         description: "e",
    //         price: "12"
    //     },
    //     {
    //         id: "6",
    //         image: "./images (7).jpeg",
    //         title: "d",
    //         description: "e",
    //         price: "12"
    //     }
    // ]
    return (
        <Box sx={{
            width: "100vw",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
        }}>
            <Typography sx={{
                fontSize: { sm: "1rem", md: "2rem" },
                fontWeight: "bold",
                display: "flex",
                width: "80%",
                fontFamily: "monospace, cursive",
                alignItems: "flex-start",
                mt: 8
            }}>
                Our bats
            </Typography>
            <Box sx={{
                width: { xs: "95%", md: "80%" },
                maxHeight: "800px",
                overflowY: "auto",
                overflowX: "hidden",
                "&::-webkit-scrollbar": {
                    width: "4px",
                    backgroundColor: "grey",
                    height: "4px"
                }
            }}>

                <Box sx={{
                    width: "100%",
                    minHeight: "150px",
                    display: "grid",
                    gridTemplateColumns: { xs: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
                    gap: 2,
                    mt: 2,
                    justifyContent: "flex-start",
                    alignItems: "stretch",
                    pb: 2,
                }}>
                    {card?.map((items: any) => {
                        return (

                            <Card sx={{
                                minWidth: { xs: "100%", sm: "30%", md: "30%" },
                                minHeight: { xs: "200px", sm: "300px", md: "400px" },
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                                cursor: "pointer",
                                transition: "transform 0.3s , box-shadow 0.3s ease",
                                scrollSnapAlign: "start",
                                "&:hover": {
                                    transform: "scale(1.01)",
                                    boxShadow: "0px 8px 10px rgba(0, 0, 0, 0.4)"
                                }
                            }}>
                                <Box key={items.id}>
                                    <img
                                        src={`http://172.30.2.67:8000${items.image}`}
                                        style={{ width: "100%", minHeight: "350px", maxHeight: "350px", objectFit: "cover" }}
                                    />

                                    <CardContent>
                                        <Typography sx={{
                                            fontSize: { sm: "0.8rem", md: "1.2rem" },
                                            fontWeight: "bold",
                                            display: "flex",
                                            width: "100%",
                                            fontFamily: "monospace, cursive",
                                            alignItems: "flex-start",
                                            mt: 1
                                        }}>
                                            {items.product_name}
                                        </Typography>
                                        <Typography sx={{
                                            fontSize: { sm: "0.5rem", md: "0.8rem" },
                                            fontWeight: "bold",
                                            display: "flex",
                                            width: "100%",
                                            fontFamily: "monospace, cursive",
                                            alignItems: "flex-start",
                                            mt: 1,
                                        }}>
                                            {items.description}
                                        </Typography>
                                        <Typography sx={{
                                            fontSize: { sm: "0.5rem", md: "1.4rem" },
                                            display: "flex",
                                            width: "100%",
                                            fontFamily: "monospace, cursive",
                                            alignItems: "flex-start",
                                            mt: 1,
                                            color: "green"
                                        }}>
                                            $ {items.price}
                                        </Typography>
                                        <button style={{
                                            width: "100%",
                                            height: "30px",
                                            borderRadius: "10px",
                                            backgroundColor: "#050825",
                                            color: "white",
                                            border: "none",
                                            fontSize: "1rem",
                                            cursor: "pointer",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            gap: 10
                                        }}>
                                            Add To Cart
                                        </button>

                                    </CardContent>
                                </Box>
                            </Card>
                        )
                    }
                    )}

                </Box>
            </Box>
        </Box >
    )
}

export default ShopBats