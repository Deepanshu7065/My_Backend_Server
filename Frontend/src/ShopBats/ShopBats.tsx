import { Box, Card, CardContent, colors, TextField, Typography } from '@mui/material'
import { GetProductApi } from '../AllGetApi'
import { imageUrl } from '../ApiEndPoint'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setIncreaseQuantity, setProductDetails } from '../Store/ProductDetailsSlice'
import { ProductTypes } from '../AllTypes'
import { RootState } from '../Store'
import { useState } from 'react'

const ShopBats = () => {
    const navigate = useNavigate()
    const [search, setSearch] = useState("")
    const { data: card } = GetProductApi({
        search: search
    })
    const dispatch = useDispatch()
    const products = useSelector((state: RootState) => state.ProductId.products)

    return (
        <Box sx={{
            width: "100vw",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
        }}>
            <div style={{ width: "80%", justifyContent: "flex-start",   }}>
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
                <TextField sx={{
                    width: { xs: "95%", md: "400px" },
                    mt: 2,
                    mb: 2,
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                }}
                    size='small'
                    label="Search"
                    placeholder='Search by Product Name and Description'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <Box sx={{
                width: { xs: "95%", md: "80%" },
                maxHeight: "800px",
                overflowY: "auto",
                overflowX: "hidden",
                "&::-webkit-scrollbar": {
                   display: "none"
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
                    {card?.products?.map((items: ProductTypes, idx: number) => {
                        const productQuantity = products?.map(p => p._id === items._id ? p.quantity : 0).reduce((a, b) => a + b, 0);
                        return (
                            <Card sx={{
                                minWidth: { xs: "100%", sm: "30%", md: "30%" },
                                minHeight: { xs: "150px", sm: "300px", md: "400px" },
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                                transition: "transform 0.3s , box-shadow 0.3s ease",
                                scrollSnapAlign: "start",
                                "&:hover": {
                                    transform: "scale(1.01)",
                                    boxShadow: "0px 8px 10px rgba(0, 0, 0, 0.4)"
                                }
                            }}

                            >
                                <Box key={idx} sx={{ position: "relative", overflow: "hidden" }}>
                                    <div style={{ position: "relative" }}>
                                        <img
                                            src={`${imageUrl}${items.image}`}
                                            style={{
                                                width: "100%",
                                                minHeight: "300px",
                                                maxHeight: "300px",
                                                objectFit: "cover",
                                                filter: "blur(1px)",
                                            }}
                                        />
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                width: "100%",
                                                height: "100%",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                                                color: colors.grey[300],
                                                fontSize: "1.1rem",
                                                fontWeight: "bold",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => {
                                                navigate(`/details?id=${items._id}`);
                                                dispatch(setProductDetails(items as any));
                                            }}
                                        >
                                            See Details
                                        </div>
                                    </div>
                                    <CardContent>
                                        <Typography
                                            sx={{
                                                fontSize: { sm: "0.8rem", md: "1.2rem" },
                                                fontWeight: "bold",
                                                display: "flex",
                                                width: "100%",
                                                fontFamily: "monospace, cursive",
                                                alignItems: "flex-start",
                                                mt: 1,
                                            }}
                                        >
                                            {items.product_name}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: { sm: "0.5rem", md: "0.8rem" },
                                                fontWeight: "bold",
                                                display: "flex",
                                                width: "100%",
                                                fontFamily: "monospace, cursive",
                                                alignItems: "flex-start",
                                                mt: 1,
                                            }}
                                        >
                                            {items.description}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: { sm: "0.5rem", md: "1.4rem" },
                                                display: "flex",
                                                width: "100%",
                                                fontFamily: "monospace, cursive",
                                                alignItems: "flex-start",
                                                mt: 1,
                                                color: "green",
                                            }}
                                        >
                                            $ {items.price}
                                        </Typography>
                                        <button
                                            style={{
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
                                                gap: 10,
                                            }}
                                            onClick={() => {
                                                dispatch(setProductDetails(items as any));
                                                dispatch(setIncreaseQuantity(items._id as string));
                                            }}
                                        >
                                            Add To Cart ({productQuantity})
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