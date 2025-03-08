import { Box, Button, Card, CardContent, CircularProgress, colors, Skeleton, Stack, TextField, Typography } from '@mui/material'
import { GetCartApi, GetProductApi } from '../AllGetApi'
import { imageUrl } from '../ApiEndPoint'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setIncreaseQuantity, setProductDetails } from '../Store/ProductDetailsSlice'
import { ProductTypes } from '../AllTypes'
import { RootState } from '../Store'
import { useEffect, useState } from 'react'
import { CustomPagination } from './AddBatsForm'
import { AddToCart } from '../AllPostApi'

const ShopBats = () => {
    const navigate = useNavigate()
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const { user } = useSelector((state: RootState) => state.CustomerUser)
    const { data, refetch, } = GetCartApi({ id: user?._id })


    const { data: card, isLoading, } = GetProductApi({
        search: search,
        page: page,
        limit: limit
    })
    const dispatch = useDispatch()
    const products = useSelector((state: RootState) => state?.ProductId?.products)

    const [selectedProducts, setSelectedProduct] = useState<{ product_id: string; quantity: number; price: number }[]>([]);

    const { mutateAsync, isPending: isLoadingAdd } = AddToCart()
    const handleSubmit = async (selectedProducts: { product_id: string; quantity: number; price: number, user: string }) => {
        try {
            await mutateAsync({
                data: selectedProducts
            })
            refetch()
        }
        catch (error) {
            console.log(error)
        }
    };

    const handleAddToCart = (product: ProductTypes) => {
        let temp = selectedProducts
        const existingProduct = temp.find(p => p.product_id === product._id);
        if (existingProduct) {
            existingProduct.quantity += 1;

        } else {
            let newProduct = { product_id: product._id, quantity: 1, price: product.price }
            temp.push(newProduct as any)
        }
        setSelectedProduct(temp)
        dispatch(setProductDetails(data as any));
        dispatch(setIncreaseQuantity(product._id as string));
        refetch()
        handleSubmit({
            product_id: product?._id || "",
            quantity: 1,
            price: product?.price || 0,
            user: user?._id
        })
    };

    useEffect(() => {
        if (data) {
            dispatch(setProductDetails(data as any));
        }
    }, [data]);




    return (
        <Box sx={{
            width: "100vw",
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",

        }}>
            <Stack justifyContent="space-between" alignItems="center">
                <div style={{ width: "80%", justifyContent: "flex-start", }}>
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
                    maxHeight: "700px",
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
                            const productQuantity = Array.isArray(products)
                                ? products.find((product) => product?.product_id?._id === items?._id)?.quantity
                                : 0;

                            return (
                                <>
                                    {isLoading ? (
                                        <>
                                            <Box sx={{
                                                minWidth: { xs: "100%", sm: "30%", md: "30%" },
                                                minHeight: { xs: "150px", sm: "300px", md: "400px" },
                                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                                                transition: "transform 0.3s , box-shadow 0.3s ease",
                                            }}>
                                                <Skeleton variant="rectangular" width="100%" height="100%" />

                                            </Box>
                                        </>
                                    ) : (
                                        <>
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
                                                        <Button
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
                                                            disabled={isLoadingAdd}
                                                            loading={isLoadingAdd}
                                                            onClick={() => {
                                                                handleAddToCart(items)
                                                                // handleSubmit()
                                                            }}
                                                        >
                                                            {isLoadingAdd ? (
                                                                <CircularProgress size={20} color="inherit" />
                                                            ) : (
                                                                <>
                                                                    Add to Cart {productQuantity ? `(${productQuantity})` : ""}
                                                                </>
                                                            )}
                                                        </Button>
                                                    </CardContent>
                                                </Box>

                                            </Card>
                                        </>
                                    )}
                                </>
                            )
                        }
                        )}
                    </Box>
                </Box>
            </Stack>

            <Stack textAlign={"center"} justifyContent={"center"} alignItems={"center"} width={"100%"}>
                <CustomPagination
                    page={page}
                    limit={limit}
                    setPage={setPage}
                    setLimit={setLimit}
                    total={Math.ceil((card?.totalProduct ?? 0) / limit)}
                />
            </Stack>
        </Box >
    )
}

export default ShopBats