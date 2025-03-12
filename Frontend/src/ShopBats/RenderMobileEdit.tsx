import { useState } from "react"
import { GetProductApi } from "../AllGetApi"
import { Box, Card, CardActions, CardContent, colors, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material"
import { Delete, Edit, Forward, Search } from "@mui/icons-material"
import { imageUrl } from "../ApiEndPoint"
import { DeleteTodo } from "../AllPostApi"
import { useDispatch } from "react-redux"
import { setEditProductId } from "../Store/EditProductSlice"
import { CustomPagination } from "./AddBatsForm"
import { LazyImage } from "../App"


const RenderMobileEditBats = () => {
    const [search, setSearch] = useState("")
    const { data: products, refetch } = GetProductApi({
        search: search,
        page: 1,
        limit: 10
    })
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const dispatch = useDispatch()
    const { mutateAsync: deleteProduct } = DeleteTodo()
    const handleDelete = async (id: string) => {
        const isConfirm = window.confirm("Are you sure you want to delete this product?")
        if (!isConfirm) return
        try {
            await deleteProduct({ id })
            refetch()
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
            flexDirection: "column"
        }}>
            <Box sx={{
                p: 1,
                width: "100%",
                position: "sticky",
                top: 0,
                zIndex: 10,
                backgroundColor: "white"
            }}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h5" sx={{ mb: 2 }}>Edit Bats</Typography>
                    <Forward onClick={() => window.history.back()} />
                </Stack>
                <TextField
                    label="Search"
                    variant="outlined"
                    placeholder="Search"
                    sx={{ width: "100%", mb: 2 }}
                    size="small"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    InputProps={{
                        startAdornment: (
                            < InputAdornment position="start" >
                                <Search sx={{ color: "grey" }} />
                            </InputAdornment>
                        )

                    }}
                />
            </Box>
            <Box sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                bgcolor: "grey.300",
                p: 1,
                height: "70vh",
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                    display: "none",

                },
            }}>

                {
                    products?.products?.map((product, index) => (
                        <Card key={index} sx={{ width: "100%", borderRadius: "10px", boxShadow: 3, mt: 1, overflow: "visible" }}>
                            <CardActions>
                                <Stack direction="row" justifyContent="space-between" width="100%">
                                    <Edit color="primary" onClick={() => dispatch(setEditProductId(product?._id))} />
                                    <Delete onClick={() => handleDelete(product?._id || "")} sx={{ color: colors.red[200] }} />
                                </Stack>
                            </CardActions>
                            <CardContent>

                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}>
                                    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                        <Typography component="div" sx={{
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            fontSize: "1.2rem",
                                            fontWeight: "bold"
                                        }}>
                                            {product.product_name}
                                        </Typography>
                                        <Typography component="div" sx={{
                                            alignItems: "center",
                                            fontSize: "0.8rem",
                                        }}>
                                            {product.description}
                                        </Typography>

                                        <div>
                                            <div style={{ display: "flex", justifyContent: "space-between", width: "50%" }}>
                                                <span style={{ color: "black", fontSize: "0.8rem", }}>
                                                    size
                                                </span>
                                                <span style={{ color: "grey", fontSize: "0.8rem" }}>
                                                    Qty
                                                </span>
                                            </div>
                                            <div style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                width: "50%"
                                            }}>
                                                <span style={{ color: "black", fontSize: "0.8rem", fontWeight: "bold" }}>
                                                    {product.size}
                                                </span>
                                                <span style={{ color: "grey", fontSize: "0.8rem" }}>
                                                    {product.quantity}
                                                </span>
                                            </div>

                                            <span style={{
                                                fontSize: "1rem",
                                                fontWeight: "bold",
                                                color: "green"
                                            }}>
                                                &#8377;{product.price}
                                            </span>
                                        </div>
                                    </Box>
                                    <Box>
                                        <LazyImage src={`${imageUrl}${product.image}`}
                                            alt={product.product_name || "Image"}
                                            style={{ width: "100px", height: "100px" }}
                                        />

                                    </Box>
                                </Box>

                            </CardContent>

                        </Card>

                    ))
                }
            </Box>
            <CustomPagination
                page={page}
                setPage={setPage}
                limit={limit}
                setLimit={setLimit}
                total={Math.ceil((products?.totalProduct ?? 0) / limit)}
            />
        </Box >
    )

}

export default RenderMobileEditBats