import * as React from 'react';
import { Box, Stepper, Step, StepLabel, StepContent, Button, Paper, Typography, TextField, MenuItem, colors, Stack, Card, CardContent, useMediaQuery, IconButton } from '@mui/material';
import { Footer } from '../User/AddUser';
import { AddProductItems, DeleteTodo } from '../AllPostApi';
import { GetProductApi, getUsers } from '../AllGetApi';
import { imageUrl } from '../ApiEndPoint';
import { Delete, Edit, EditNotifications } from '@mui/icons-material';
import RenderMobileEditBats from './RenderMobileEdit';
import { useNavigate } from 'react-router-dom';
import { setEditProductId } from '../Store/EditProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Store';

const steps = [
    { label: 'Product Details' },
    { label: 'Price And Qunantity' },
    { label: 'Additional Info' },
    { label: 'Add More Details' },
];

export default function AddBatsForm() {
    const [activeStep, setActiveStep] = React.useState(0);
    const { user } = useSelector((state: RootState) => state.CustomerUser)
    const { data: products, refetch } = GetProductApi({
        search: "",
    })
    const navigate = useNavigate()
    const { mutateAsync: deleteProduct } = DeleteTodo()
    const [details, setDetails] = React.useState({
        product_name: '',
        createdBy: user?._id,
        description: '',
        price: '',
        quantity: '',
        image: '',
        brand: '',
        size: '',
        more_details: "",
        weight: ''

    });
    const { mutateAsync } = AddProductItems()
    const dispatch = useDispatch()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDetails({
            ...details,
            [name]: name === "price" || name === "quantity" || name === "weight" ? Number(value) || 0 : value
        })
    };

    const handleFileChange = (e: any) => {
        setDetails({ ...details, image: e.target.files[0] });
    };

    const validateStep = () => {
        switch (activeStep) {
            case 0:
                return typeof details.product_name === "string" && details.product_name.trim() !== "" &&
                    typeof details.description === "string" && details.description.trim() !== "";
            case 1:
                return details.price !== "" && details.quantity !== "" && details.weight !== "";
            case 2:
                return details.image !== "";
            case 3:
                return typeof details.brand === "string" && details.brand.trim() !== "" &&
                    typeof details.size === "string" && details.size.trim() !== "" &&
                    typeof details.more_details === "string" && details.more_details.trim() !== "";
            default:
                return false;
        }
    };


    const handleNext = () => {
        if (validateStep()) {
            setActiveStep((prev) => prev + 1);
        }
    }

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        setDetails({
            product_name: '',
            createdBy: user?._id,
            description: '',
            price: '',
            quantity: '',
            image: '',
            brand: '',
            size: '',
            more_details: "",
            weight: ''
        });
    };


    React.useEffect(() => {
        setDetails({
            ...details,
            createdBy: user?._id
        })
    }, [user])

    const saveData = async () => {
        const formData = new FormData();
        formData.append("product_name", details.product_name);
        formData.append("description", details.description);
        formData.append("createdBy", details.createdBy);
        formData.append("price", details.price);
        formData.append("quantity", details.quantity);
        formData.append("brand", details.brand);
        formData.append("size", details.size);
        formData.append("more_details", details.more_details);
        formData.append("weight", details.weight);
        if (details.image) {
            formData.append("image", details.image);
        }
        try {
            await mutateAsync({ data: formData })
            handleReset()
            refetch()

        } catch (error) {
            console.log(error)

        }
    }
    const mobile = useMediaQuery("(max-width:600px)")


    const renderForm = () => {
        switch (activeStep) {
            case 0:
                return (
                    <>
                        <Typography variant="h6">Enter Product Details</Typography>
                        <TextField
                            fullWidth
                            name="product_name"
                            label="Product Name"
                            value={details.product_name}
                            onChange={handleChange}
                            sx={{ mt: 2 }}
                            size={"small"}
                        />
                        <TextField
                            fullWidth
                            name="description"
                            label="Description"
                            value={details.description}
                            onChange={handleChange}
                            sx={{ mt: 2 }}
                            size={"small"}
                        />
                    </>
                );
            // case 1:
            //     return (
            //         <>
            //             <Typography variant="h6">Select User</Typography>
            //             <TextField
            //                 fullWidth
            //                 select
            //                 name="createdBy"
            //                 value={details.createdBy}
            //                 onChange={handleChange}
            //                 sx={{ mt: 2 }}
            //                 size={"small"}
            //             >
            //                 {users?.users?.map((user) => (
            //                     <MenuItem key={user._id} value={user._id}>
            //                         {user.userName}
            //                     </MenuItem>
            //                 ))}
            //             </TextField>
            //         </>
            //     );
            case 1:
                return (
                    <>
                        <Typography variant="h6">Add Price And Quantity</Typography>
                        <Stack direction="row" spacing={1}>
                            <TextField
                                fullWidth
                                name="price"
                                label="Price"
                                value={details.price}
                                onChange={handleChange}
                                sx={{ mt: 2 }}
                                size={"small"}
                            />
                            <TextField
                                fullWidth
                                name="weight"
                                label="Weight"
                                value={details.weight}
                                onChange={handleChange}
                                sx={{ mt: 2 }}
                                size={"small"}
                            />
                        </Stack>
                        <TextField
                            fullWidth
                            name="quantity"
                            label="Quantity"
                            value={details.quantity}
                            onChange={handleChange}
                            sx={{ mt: 2 }}
                            size={"small"}
                        />
                    </>
                );
            case 2:
                return (
                    <>
                        <Typography variant="h6">Additional Image</Typography>
                        <Button
                            variant="contained"
                            component="label"
                            sx={{ mt: 2 }}
                        >
                            Upload Image
                            <input
                                type="file"
                                onChange={handleFileChange}
                            />
                        </Button>
                    </>
                )
            case 3:
                return (
                    <>
                        <Typography variant="h6">Add More Details</Typography>
                        <Stack direction="row" spacing={2}>
                            <TextField
                                fullWidth
                                name="brand"
                                label="Brand"
                                value={details.brand}
                                onChange={handleChange}
                                sx={{ mt: 2 }}
                                size={"small"}
                            />
                            <TextField
                                fullWidth
                                name="size"
                                label="Size"
                                value={details.size}
                                onChange={handleChange}
                                sx={{ mt: 2 }}
                                size={"small"}
                            />
                        </Stack>
                        <TextField
                            fullWidth
                            name="more_details"
                            label="More Details"
                            value={details.more_details}
                            onChange={handleChange}
                            sx={{ mt: 2 }}
                            size={"small"}
                        />

                    </>
                )
            default:
                return null;
        }
    };

    const handleDelete = async (product_id: string) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this product?");
        if (!isConfirmed) return
        try {
            await deleteProduct({ id: product_id })
            refetch()

        }
        catch (error) {
            throw error
        }
    }

    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            minHeight: "100%",
            p: { xs: 0, md: 2 },
            // backgroundImage: "url(/Cricket-Bat-Ball.jpg)",
            // backgroundSize: "cover",
            // backgroundPosition: "center",
            // backgroundRepeat: "no-repeat",
            gap: 2,
            flexDirection: { xs: "column", md: "column" },
            bgcolor: colors.grey[100],
            mt: { xs: 0, md: 4 }
        }}>
            <Box sx={{
                display: "flex",
                width: "100%",
                gap: 2,
                alignItems: "center",
            }}>
                <Paper
                    elevation={3}
                    sx={{
                        display: { xs: "none", md: "flex" },
                        width: { md: "100%" },
                        p: { xs: 1, md: 0 },
                        height: "auto",
                        maxHeight: "60vh",
                        overflowY: "auto",
                        flexDirection: "column",
                        gap: 2,
                        mt: 4,
                        borderRadius: 5,

                    }}>

                    <img src={"public/cricket.avif"}
                        alt=''
                        style={{
                            width: "100%",
                            objectFit: "cover",
                            height: "60vh"
                        }}
                    />
                </Paper>
                <Paper
                    elevation={3}
                    sx={{
                        maxWidth: 800,
                        width: { xs: "100%", md: "90%" },
                        p: { xs: 1, md: 3 },
                        height: "auto",
                        maxHeight: "80vh",
                        overflowY: "auto",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        mt: { xs: 10, md: 5 },
                    }}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((step, index) => (
                            <Step key={step.label}>
                                <StepLabel>{step.label}</StepLabel>
                                <StepContent>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: { xs: 0, md: 2 },
                                            backgroundColor: colors.grey[100],
                                            padding: { xs: 1, md: 2 },
                                            borderRadius: 2,
                                            textAlign: "center"
                                        }}
                                    >
                                        {renderForm()}
                                    </Box>
                                    <Box sx={{ mt: 2 }}>
                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                            sx={{ mt: 1, mr: 1 }}
                                            disabled={!validateStep()}
                                        >
                                            {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                        </Button>
                                        <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                                            Back
                                        </Button>
                                    </Box>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length && (
                        <Box sx={{ textAlign: "center", mt: 3 }}>
                            <Typography>All steps completed - ready to submit</Typography>
                            <Button variant="contained" color="success" onClick={saveData} sx={{ mt: 2 }}>
                                Submit
                            </Button>
                            <Button onClick={handleReset} sx={{ mt: 2 }}>
                                Reset
                            </Button>
                        </Box>
                    )}
                </Paper>
            </Box>

            {!mobile ? (
                <Paper
                    elevation={3}
                    sx={{
                        maxWidth: "100%",
                        width: "100%",
                        p: { xs: 0, md: 1 },
                        height: "25vh",
                        overflowY: "auto",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        mt: { xs: 2, md: 1 },
                        bgcolor: colors.grey[100],
                    }}
                >

                    <Box sx={{
                        overflowY: "auto",
                        maxHeight: "25vh",
                        backgroundColor: "white",
                        "&::-webkit-scrollbar": {
                            width: "4px",
                            height: "8px",
                        },
                        "&::-webkit-scrollbar-track": {
                            backgroundColor: "#f1f1f1",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "#888",
                        }
                    }}>

                        <table style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            border: "1px solid #ddd",
                            tableLayout: "fixed",
                            wordWrap: "break-word",
                            fontSize: "12px",
                            fontFamily: "monospace",
                        }}>
                            <tr style={{ backgroundColor: "#f2f2f2", }}>
                                <th align='left' style={{ width: "50px", padding: "10px", fontFamily: "monospace", }}>Image</th>
                                <th align='left' style={{ width: "200px", padding: "10px", fontFamily: "monospace", }}>Name</th>
                                <th align='left' style={{ width: "50px", padding: "10px", fontFamily: "monospace", }} > Quantity</th>
                                <th align='left' style={{ width: "50px", padding: "10px", fontFamily: "monospace", }} > Brand</th>
                                <th align='left' style={{ width: "50px", padding: "10px", fontFamily: "monospace", }}>Size</th>
                                <th align='left' style={{ width: "50px", padding: "10px", fontFamily: "monospace", }}>Price</th>
                                <th align='left' style={{ width: "100px", padding: "10px", fontFamily: "monospace", }}>Description</th>
                                <th align='center' style={{ width: "200px", padding: "10px", fontFamily: "monospace", }}>More Details</th>
                                <th align='right' style={{ width: "50px", padding: "10px", fontFamily: "monospace", }}>Weight</th>
                                <th align="right" style={{ width: "50px", padding: "10px", fontFamily: "monospace", }}>Action</th>
                            </tr>
                            {products?.products?.map((product, index) => (
                                <tr key={index} style={{
                                    borderBottom: "1px solid #ddd",
                                }}>
                                    <td align="left" style={{ padding: "1px" }}>
                                        <img src={`${imageUrl}${product.image}`} alt={product.product_name} style={{ width: "50px" }} />
                                    </td>
                                    <td style={{
                                        fontFamily: "monospace",
                                        fontWeight: "bold",
                                        width: "200px",
                                        padding: "10px"
                                    }}>{product.product_name}</td>
                                    <td style={{
                                        fontFamily: "monospace",
                                        width: "50px",
                                        padding: "10px"
                                    }}>{product.quantity}</td>
                                    <td style={{
                                        fontFamily: "monospace",
                                        width: "50px",
                                        padding: "10px"
                                    }}>{product.brand}</td>
                                    <td style={{
                                        fontFamily: "monospace",
                                    }}>{product.size}</td>
                                    <td style={{
                                        fontFamily: "monospace",
                                    }}>{product.price}</td>
                                    <td style={{
                                        fontFamily: "monospace",
                                    }}>{product.description}</td>
                                    <td style={{
                                        fontFamily: "monospace",
                                        color: "grey"
                                    }} align='center'>{product.more_details}</td>
                                    <td style={{
                                        fontFamily: "monospace",
                                    }} align='right'>{product.weight}</td>
                                    <td style={{
                                        fontFamily: "monospace",
                                    }} align="right">
                                        <IconButton onClick={() => { dispatch(setEditProductId(product?._id || '')) }}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton onClick={() => { handleDelete(product?._id || '') }}>
                                            <Delete />
                                        </IconButton>
                                    </td>
                                </tr>
                            ))}

                        </table>
                    </Box>
                </Paper >

            ) : (
                <Stack sx={{
                    position: "fixed",
                    width: "100%",
                    bottom: 3,
                }}>
                    <Button variant="contained" sx={{
                        m: 1,
                        backgroundColor: colors.grey[700],
                        color: "white",
                        fontWeight: "bold",
                        fontFamily: "monospace",
                    }}
                        onClick={() => navigate("/view_edit_bat")}
                    >
                        View And Edit Products
                    </Button>
                </Stack>
            )
            }
        </Box >
    );
}

