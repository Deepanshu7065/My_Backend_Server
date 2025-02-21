import { Box, Paper, Typography, TextField, Button, Grid, IconButton, Dialog, DialogContent, useMediaQuery, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Footer } from '../User/AddUser';
import { UploadRepairDetails } from '../AllPostApi';
import { useSelector } from 'react-redux';
import { RootState } from '../Store';


const imagesData = [
    { src: '/public/BatRepairHd.webp', text: 'Secure & Easy Bat Repair' },
    { src: '/public/HomeDel.webp', text: 'Pick up & Delivery Service' },
    { src: '/public/CustomerHome.webp', text: 'Delvery to Your Home ' },
    { src: '/public/Quality.webp', text: '100% Quality Bat Repair' },
    { src: '/public/VanDel.webp', text: 'Services and repair at your doorstep' }
];

const RepairUploadBat = () => {
    const mobile = useMediaQuery("(max-width:600px)")
    const { user } = useSelector((state: RootState) => state.CustomerUser)
    const [images, setImages] = useState([]);
    const [formData, setFormData] = useState({
        product_name: '',
        createdBy: user?._id,
        phone: '',
        details: '',
        address: '',
        fullAddress: '',
        landmark: '',
        state: '',
        city: '',
        pincode: ''
    });
    useEffect(() => {
        setFormData({ ...formData, createdBy: user?._id })
    }, [user])
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % imagesData.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleImageUpload = (event: any) => {
        const files = Array.from(event.target.files);
        setImages([...images, ...files] as any);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };


    const handleImageClick = (image: React.SetStateAction<null>) => {
        setSelectedImage(image);
    };

    const handleImageDelete = (index: React.SetStateAction<number>) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const { mutateAsync } = UploadRepairDetails()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        const savedData = new FormData();
        try {
            for (let i = 0; i < images.length; i++) {
                savedData.append('images', images[i]);
            }
            savedData.append('product_name', formData.details);
            savedData.append('created_by', formData.createdBy);
            savedData.append('phone', formData.phone);
            savedData.append('details', formData.details);
            savedData.append('address', formData.address);
            savedData.append('fullAddress', formData.fullAddress);
            savedData.append('landmark', formData.landmark);
            savedData.append('state', formData.state);
            savedData.append('city', formData.city);
            savedData.append('pincode', formData.pincode);


            await mutateAsync({
                data: savedData
            })
            console.log("Form Data:", formData)

        } catch (error) {
            console.log(error)

        }
    }

    return (
        <Box sx={{
            width: "100%",
            height: { xs: "auto", sm: "98vh" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundImage: "url(public/pngtree-icc-cricket-world-match-background-image_13943187.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(8px)',
                zIndex: 0,
            },
            mt: { xs: 8, sm: 0 }
        }}>
            <Paper
                elevation={3} sx={{
                    width: { xs: "100%", sm: "80%" },
                    p: { xs: 2, sm: 4 },
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    position: "relative",
                    zIndex: 1,

                }}>
                <Box sx={{ display: { xs: "column", sm: "flex" }, gap: 4 }}>
                    {mobile && (
                        <Box sx={{
                            flex: 1,
                            bgcolor: '#f2f2f2',
                            borderRadius: 2,
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            position: 'relative',
                            height: '200px',
                        }}>
                            <Box sx={{ position: 'sticky', width: '100%', height: '100%', overflow: 'hidden' }}>
                                {imagesData.map((img, index) => (
                                    <Box key={index} sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: `${(index - currentSlide) * 100}%`,
                                        transition: 'left 0.5s ease-in-out',
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',

                                    }}>
                                        <img
                                            src={img.src}
                                            alt={`Slide ${index}`}
                                            style={{
                                                width: '90%',
                                                height: '100%',
                                                borderRadius: '10px',
                                                objectFit: 'cover'
                                            }} />
                                    </Box>
                                ))}
                            </Box>
                            <Typography
                                color="primary"
                                fontFamily={"Pacifico, cursive"}
                                gutterBottom sx={{ mt: 2 }}>
                                {imagesData[currentSlide].text}
                            </Typography>
                        </Box>
                    )}
                    {/* Form Section */}
                    <Box sx={{ flex: 1 }}>
                        <Typography
                            variant="h5"
                            mb={2}
                            sx={{
                                fontWeight: "bold",
                                fontFamily: "monospace, cursive",
                                fontSize: { xs: "1rem", sm: "1.5rem" },
                                mt: { xs: 2, sm: 0 }
                            }}
                        >Upload Your Bat for Repair</Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid
                                    item xs={12}
                                >
                                    <TextField
                                        fullWidth
                                        label="Bat Name"
                                        name="batName"
                                        onChange={handleChange}
                                        size="small"
                                        required
                                    /></Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Phone Number"
                                        name="phone"
                                        size="small"
                                        required
                                        onChange={handleChange}
                                    /></Grid>
                                <Grid
                                    item xs={12}>
                                    <TextField fullWidth
                                        multiline rows={3}
                                        label="Details in your Problem"
                                        name="details"
                                        size="small"
                                        required
                                        onChange={handleChange}
                                    /></Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Address"
                                        size="small"
                                        required
                                        name="address"
                                        onChange={handleChange}
                                    /></Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Full Address"
                                        name="fullAddress"
                                        size="small"
                                        required
                                        onChange={handleChange} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Landmark"
                                        name="landmark"
                                        size="small"
                                        required
                                        onChange={handleChange} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="State"
                                        name="state"
                                        size="small"
                                        required
                                        onChange={handleChange}
                                    /></Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        required
                                        label="City"
                                        name="city"
                                        onChange={handleChange} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Pincode"
                                        name="pincode"
                                        size="small"
                                        required
                                        onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12}>
                                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
                                </Grid>

                                <Grid item xs={12}>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            size="small"
                                            sx={{
                                                height: "30px",
                                            }}
                                            color="primary">Submit</Button>
                                        {mobile && <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center" }}>
                                            {images.map((image, index) => (
                                                <Box key={index} sx={{ position: "relative" }}>
                                                    <img
                                                        src={URL.createObjectURL(image)}
                                                        alt={`Upload Preview ${index}`}
                                                        style={{ width: "50px", height: "50px", borderRadius: "8px", objectFit: "cover", cursor: "pointer" }}
                                                        onClick={() => handleImageClick(image)}
                                                    />
                                                    <IconButton
                                                        onClick={() => handleImageDelete(index)}
                                                        sx={{ position: "absolute", top: 0, right: 0, bgcolor: "rgba(255,255,255,0.7)" }}>
                                                        <DeleteIcon fontSize="small" sx={{
                                                            fontSize: "0.8rem"
                                                        }} color="error" />
                                                    </IconButton>
                                                </Box>
                                            ))}
                                        </Box>}
                                    </Stack>
                                </Grid>
                            </Grid>
                            {!mobile && <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center" }}>
                                {images.map((image, index) => (
                                    <Box key={index} sx={{ position: "relative" }}>
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt={`Upload Preview ${index}`}
                                            style={{ width: "90px", height: "90px", borderRadius: "8px", objectFit: "cover", cursor: "pointer" }}
                                            onClick={() => handleImageClick(image)}
                                        />
                                        <IconButton
                                            onClick={() => handleImageDelete(index)}
                                            sx={{ position: "absolute", top: 0, right: 0, bgcolor: "rgba(255,255,255,0.7)" }}>
                                            <DeleteIcon color="error" />
                                        </IconButton>
                                    </Box>
                                ))}
                            </Box>}
                        </form>
                    </Box>
                    {!mobile && (
                        <Box sx={{
                            flex: 1,
                            p: 1,
                            bgcolor: '#f2f2f2',
                            borderRadius: 2,
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            position: 'relative',
                            // overflow: 'hidden'
                        }}>
                            <Box sx={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                                {imagesData.map((img, index) => (
                                    <Box key={index} sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: `${(index - currentSlide) * 100}%`,
                                        transition: 'left 0.5s ease-in-out',
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',

                                    }}>
                                        <img
                                            src={img.src}
                                            alt={`Slide ${index}`}
                                            style={{
                                                width: '90%',
                                                height: '100%',
                                                borderRadius: '10px',
                                                objectFit: 'cover'
                                            }} />
                                    </Box>
                                ))}
                            </Box>
                            <Typography variant="h5"
                                fontFamily={"Pacifico, cursive"}
                                color="primary" gutterBottom sx={{ mt: 2 }}>
                                {imagesData[currentSlide].text}
                            </Typography>
                        </Box>
                    )}

                </Box>

                <Dialog open={Boolean(selectedImage)} onClose={() => setSelectedImage(null)}>
                    <DialogContent>
                        {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt="Selected" style={{ width: "100%" }} />}
                    </DialogContent>
                </Dialog>
            </Paper >
            {!mobile && <Box sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                zIndex: 1
            }}>
                <Footer />
            </Box>}
        </Box >
    );
};

export default RepairUploadBat;
