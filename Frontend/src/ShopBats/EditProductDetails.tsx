import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../Store'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from '@mui/material'
import { setEditProductId } from '../Store/EditProductSlice'
import { GetProductById } from '../AllGetApi'
import { updateProductPostApi } from '../AllPostApi'

const EditProductDetails = () => {
    const { product_id } = useSelector((state: RootState) => state.EditProduct)
    const { data: product, isLoading, refetch } = GetProductById({ id: product_id })
    const { mutateAsync } = updateProductPostApi()

    const [updateProduct, setUpdateProduct] = useState({
        product_name: "",
        createdBy: "",
        description: "",
        price: 0,
        quantity: 0,
        brand: "",
        size: "",
        image: "",
        more_details: "",
        weight: 0
    })

    useEffect(() => {
        if (product) {
            setUpdateProduct({
                product_name: product.product_name || "",
                createdBy: product?.createdBy?._id || "",
                description: product.description || "",
                price: product.price || 0,
                quantity: product.quantity || 0,
                brand: product.brand || "",
                size: product.size || "",
                more_details: product.more_details || "",
                weight: product.weight || 0,
                image: product.image || ""
            })
        }
    }, [product])

    const dispatch = useDispatch()
    const handleCloseForm = () => {
        dispatch(setEditProductId(""))
    }

    const handleUpdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdateProduct((prevProduct) => ({
            ...prevProduct,
            [name]: name === "price" || name === "quantity" || name === "weight" ? parseFloat(value) : value,
        }));
    };
    const handleSaveImage = (e: any) => {
        const file = e.target.files?.[0];
        if (file) {
            setUpdateProduct((prevProduct) => ({
                ...prevProduct,
                image: file,
            }))
        }
    }

    const handleUpdateValue = async () => {
        const formData = new FormData();
        try {
            formData.append("product_name", updateProduct.product_name);
            formData.append("createdBy", updateProduct.createdBy);
            formData.append("description", updateProduct.description);
            formData.append("price", updateProduct.price.toString());
            formData.append("quantity", updateProduct.quantity.toString());
            formData.append("brand", updateProduct.brand);
            formData.append("size", updateProduct.size);
            formData.append("more_details", updateProduct.more_details);
            formData.append("weight", updateProduct.weight.toString());
            if (updateProduct.image) {
                formData.append("image", updateProduct.image);
            }
            await mutateAsync({ id: product_id, data: formData })

            await refetch();
            handleCloseForm()
            dispatch(setEditProductId(""))
        } catch (error) {
            console.log("Error creating form data:", error);
        }

    }

    return (
        <Dialog
            open={!!product_id}
            fullScreen
            onClose={handleCloseForm}
            sx={{
                "& .MuiDialog-paper": {
                    width: { xs: "100%", md: "50%" },
                    maxWidth: "100%",
                    maxHeight: { xs: "100%", md: "fit-content" },
                    overflowY: "auto",
                    borderRadius: { xs: 2, md: 4 },
                    p: { xs: 2, md: 3 },
                    boxShadow: 4,
                }
            }}
        >
            <DialogTitle>
                <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: "center" }}>
                    Edit Product
                </Typography>
            </DialogTitle>

            {isLoading ? (
                <Typography textAlign="center" sx={{ my: 2 }}>Loading...</Typography>
            ) : (
                <DialogContent>
                    <Stack spacing={2} mt={1}>
                        <TextField
                            label="Product Name"
                            value={updateProduct.product_name}
                            onChange={handleUpdateChange}
                            name="product_name"
                            size="small"
                            fullWidth
                        />
                        <TextField
                            label="Description"
                            value={updateProduct.description}
                            onChange={handleUpdateChange}
                            name="description"
                            size="small"
                            fullWidth
                            multiline
                            rows={2}
                        />
                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                            <TextField
                                label="Price"
                                value={updateProduct.price}
                                onChange={handleUpdateChange}
                                name="price"
                                size="small"
                                fullWidth
                            />
                            <TextField
                                label="Quantity"
                                value={updateProduct.quantity}
                                onChange={handleUpdateChange}
                                name="quantity"
                                size="small"
                                fullWidth
                            />
                        </Stack>
                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                            <TextField
                                label="Brand"
                                value={updateProduct.brand}
                                onChange={handleUpdateChange}
                                name="brand"
                                size="small"
                                fullWidth
                            />
                            <TextField
                                label="Size"
                                value={updateProduct.size}
                                onChange={handleUpdateChange}
                                name="size"
                                size="small"
                                fullWidth
                            />
                        </Stack>
                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                            <TextField
                                label="Weight"
                                value={updateProduct.weight}
                                onChange={handleUpdateChange}
                                name="weight"
                                size="small"
                                fullWidth
                            />
                            <TextField
                                label="More Details"
                                value={updateProduct.more_details}
                                onChange={handleUpdateChange}
                                name="more_details"
                                size="small"
                                fullWidth
                                multiline
                                rows={2}
                            />
                        </Stack>
                        <Button variant="contained" component="label">
                            <input
                                type="file"
                                accept="image/*"
                                // style={{ display: "none" }}
                                id="fileInput"
                                onChange={(e) => handleSaveImage(e)}


                            />
                        </Button>
                    </Stack>

                </DialogContent>
            )}

            <DialogActions>
                <Stack direction="row" justifyContent="space-between" width={"100%"} px={2}>
                    <Button onClick={handleCloseForm} variant="outlined" sx={{ borderRadius: 2 }}>
                        Cancel
                    </Button>
                    <Button onClick={handleUpdateValue} variant="contained" color="primary" sx={{ borderRadius: 2 }}>
                        Save
                    </Button>
                </Stack>
            </DialogActions>
        </Dialog>
    )
}

export default EditProductDetails
