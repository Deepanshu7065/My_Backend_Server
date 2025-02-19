import * as React from 'react';
import { Box, Stepper, Step, StepLabel, StepContent, Button, Paper, Typography, TextField, MenuItem, colors, Stack } from '@mui/material';
import { Footer } from '../User/AddUser';
import { AddProductItems } from '../AllPostApi';
import { getUsers } from '../AllGetApi';

const steps = [
    { label: 'Product Details' },
    { label: 'User Selection' },
    { label: 'Price And Qunantity' },
    { label: 'Additional Info' },
    { label: 'Add More Details' },
];

export default function AddBatsForm() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [details, setDetails] = React.useState({
        product_name: '',
        createdBy: '',
        description: '',
        price: '',
        quantity: '',
        image: '',
        brand: '',
        size: '',
        more_details: "",

    });
    const { mutateAsync } = AddProductItems()
    const { data: users } = getUsers({
        search: "",
        filter: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDetails({
            ...details,
            [e.target.name]: e.target.name === "price" ?
                Number(e.target.value) : e.target.name === "quantity" ?
                    Number(e.target.value) : e.target.value

        })
    };

    const handleFileChange = (e: any) => {
        setDetails({ ...details, image: e.target.files[0] });
    };

    const validateStep = () => {
        switch (activeStep) {
            case 0:
                return details.product_name.trim() !== "" && details.description.trim() !== "";
            case 1:
                return details.createdBy.trim() !== "";
            case 2:
                return details.price !== "" && details.quantity !== "";
            case 3:
                return details.image !== "";
            case 4:
                return details.brand.trim() !== "" && details.size.trim() !== "" && details.more_details.trim() !== "";
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
            createdBy: '',
            description: '',
            price: '',
            quantity: '',
            image: '',
            brand: '',
            size: '',
            more_details: ""
        });
    };



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
        if (details.image) {
            formData.append("image", details.image);
        }
        try {
            await mutateAsync({ data: formData })
            handleReset()

        } catch (error) {
            console.log(error)

        }
    }


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
                        />
                        <TextField
                            fullWidth
                            name="description"
                            label="Description"
                            value={details.description}
                            onChange={handleChange}
                            sx={{ mt: 2 }}
                        />
                    </>
                );
            case 1:
                return (
                    <>
                        <Typography variant="h6">Select User</Typography>
                        <TextField
                            fullWidth
                            select
                            name="createdBy"
                            value={details.createdBy}
                            onChange={handleChange}
                            sx={{ mt: 2 }}
                        >
                            {users?.users?.map((user) => (
                                <MenuItem key={user._id} value={user._id}>
                                    {user.userName}
                                </MenuItem>
                            ))}
                        </TextField>
                    </>
                );
            case 2:
                return (
                    <>
                        <Typography variant="h6">Add Price And Quantity</Typography>
                        <TextField
                            fullWidth
                            name="price"
                            label="Price"
                            value={details.price}
                            onChange={handleChange}
                            sx={{ mt: 2 }}
                        />
                        <TextField
                            fullWidth
                            name="quantity"
                            label="Quantity"
                            value={details.quantity}
                            onChange={handleChange}
                            sx={{ mt: 2 }}
                        />
                    </>
                );
            case 3:
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
            case 4:
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
                            />
                            <TextField
                                fullWidth
                                name="size"
                                label="Size"
                                value={details.size}
                                onChange={handleChange}
                                sx={{ mt: 2 }}
                            />
                        </Stack>
                        <TextField
                            fullWidth
                            name="more_details"
                            label="More Details"
                            value={details.more_details}
                            onChange={handleChange}
                            sx={{ mt: 2 }}
                        />

                    </>
                )
            default:
                return null;
        }
    };

    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            minHeight: "98vh",
            p: 2,
            backgroundImage: "url(/Cricket-Bat-Ball.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",

        }}>
            <Paper
                elevation={3}
                sx={{
                    maxWidth: 800,
                    width: "90%",
                    p: 3,
                    height: "auto",
                    maxHeight: "80vh",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    mt: { xs: 8, md: 0 }
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
                                        gap: 2,
                                        backgroundColor: colors.grey[100],
                                        padding: 3,
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
    );
}
