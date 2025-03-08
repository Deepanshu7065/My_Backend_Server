import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { colors, } from '@mui/material';
import CheckAdRenderProduct from './CheckAdRenderProduct';
import AddAddress from './AddAddress';
import PaymentDetails from './PaymentDetails';
import { useSelector } from 'react-redux';
import { RootState } from '../Store';
import axios from 'axios';
import { DeleteAllCartByUSer, OrderCreateApi } from '../AllPostApi';
import OrderReview from './OrderReview';
import OrderPlaced from './OrderPlaced';
// import AddressForm from './components/AddressForm';
// import Info from './components/Info';
// import InfoMobile from './components/InfoMobile';
// import PaymentForm from './components/PaymentForm';
// import Review from './components/Review';
// import SitemarkIcon from './components/SitemarkIcon';
// import ColorModeIconDropdown from './theme/ColorModeIconDropdown';

const steps = ['Shipping address', 'Payment details', 'Review your order'];
function getStepContent(step: number, orderPlaced: boolean) {
    switch (step) {
        case 0:
            return <AddAddress />;
        case 1:
            return <PaymentDetails />;
        case 2:
            return orderPlaced ? <OrderPlaced /> : <OrderReview />;
        default:
            return <>Placed Order</>;
    }
}


export default function Checkout(_: { disableCustomTheme?: boolean }) {

    const { address } = useSelector((state: RootState) => state?.AddAddressCustomer);
    const { deleveryCharge, discount } = useSelector((state: RootState) => state.ProductId)
    const products = useSelector((state: RootState) => state?.ProductId.products);
    const { user } = useSelector((state: RootState) => state?.CustomerUser);

    const totalPrice = products.reduce((total, product) => total + product.price * product.quantity, 0);
    const totalQuantity = products.reduce((total, product) => total + product.quantity, 0);
    const total = (totalPrice + (deleveryCharge ?? 0) - (discount ?? 0))

    const { mutateAsync: orderCreate } = OrderCreateApi()
    const { mutateAsync: deleteYourCart } = DeleteAllCartByUSer()

    const [activeStep, setActiveStep] = React.useState(0);
    const [orderPlaced, setOrderPlaced] = React.useState(false);

    const handleNext = async () => {
        if (activeStep === steps.length - 1) {
            await handleSubmitOrderCreate();
        } else {
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleDeleteAllCart = async () => {
        try {
            await deleteYourCart({
                user: user?._id
            })
        } catch (error) {
            console.log(error)
        }
    }


    const [submitOrder, setSubmitOrder] = React.useState<{
        product_id: string[];
        address: string;
        deleveryCharge: number;
        discount: number;
        total: number;
        quantity: number;
        user: string;
    }>({
        product_id: [],
        address: "",
        deleveryCharge: 0,
        discount: 0,
        total: 0,
        quantity: 0,
        user: ""
    })

    React.useEffect(() => {
        setSubmitOrder({
            product_id: products?.map((p) => p.product_id._id) || [],
            address: address?._id || "",
            deleveryCharge: deleveryCharge ?? 0,
            discount: discount ?? 0,
            total,
            quantity: totalQuantity,
            user: user?._id
        })
    }, [products, user, address])

    const handleSubmitOrderCreate = async () => {
        try {
            const res = await orderCreate({
                data: submitOrder
            })
            if (res && res.status === 201) {
                setOrderPlaced(true);
                setActiveStep(activeStep === steps.length - 1 ? 2 : activeStep + 1);
                try {
                    await handleDeleteAllCart()
                } catch (error) {
                    console.log(error)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Box sx={{
            display: 'flex',
            fontFamily: 'monospace, cursive',
            width: '100vw',
            alignItems: 'center',
        }}>
            <CheckAdRenderProduct />
            <Box sx={{
                width: { xs: "100%", md: "100%" },
                height: "100%",
                display: "flex",
                flexDirection: "column",
                p: { xs: 0, md: 2 },
                minHeight: "100vh",
                bgcolor: colors.grey[50],
                justifyContent: "center",
            }}>
                <Stepper
                    id="desktop-stepper"
                    activeStep={activeStep}
                    // alternativeLabel is mobile is true and desktop is false 
                    alternativeLabel
                    sx={{ width: { xs: '100%', md: "70%" }, height: 40, mt: 15 }}
                >
                    {steps.map((label) => (
                        <Step
                            sx={{ ':first-child': { pl: { xs: 0, md: 5 } }, ':last-child': { pr: 0 } }}
                            key={label}
                        >
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <React.Fragment>
                    <Box sx={{
                        width: { xs: "100%", md: "70%" },
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        bgcolor: colors.grey[50],
                        p: { xs: 1, md: 2 },
                        minHeight: { xs: "50vh", md: "80vh" },
                        justifyContent: "space-between",
                    }}>
                        {getStepContent(activeStep, orderPlaced)}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: activeStep === 0 ? 'flex-end' : 'space-between',
                                flexDirection: { xs: 'column', sm: 'row' },
                                pb: { xs: 12, sm: 0 },
                                mt: { xs: 2, sm: 0 },
                                alignItems: 'center',
                                position: { xs: "fixed", sm: "static" }, // Mobile pe fixed, desktop pe normal
                                bottom: { xs: 0, sm: "auto" }, // Mobile pe niche fix
                                left: 0,
                                width: { xs: "100%", sm: "auto" }, // Mobile pe full width
                                bgcolor: { xs: "white", sm: "transparent" }, // Mobile pe background color white
                                zIndex: 1000, // Ensure it's above other elements
                                p: { xs: 1, sm: 0 } // Mobile pe padding thoda diya hai
                            }}
                        >
                            {/* {activeStep !== 0 && (
                                <Button
                                    startIcon={<ChevronLeftRoundedIcon />}
                                    onClick={handleBack}
                                    variant="text"
                                    sx={{
                                        display: { xs: 'none', sm: 'flex' }, // Desktop pe dikhega, mobile pe nahi
                                        color: "black"
                                    }}
                                >
                                    Previous
                                </Button>
                            )} */}
                            {activeStep !== 0 && (
                                <Button
                                    startIcon={<ChevronLeftRoundedIcon />}
                                    onClick={handleBack}
                                    variant="text"
                                    sx={{
                                        display: { xs: 'flex', sm: 'flex' }, // Desktop pe dikhega, mobile pe nahi
                                        color: "black"
                                    }}
                                >
                                    Previous
                                </Button>
                            )}
                            {!orderPlaced || activeStep !== steps.length - 1 ? (
                                <Button
                                    variant="contained"
                                    endIcon={<ChevronRightRoundedIcon />}
                                    onClick={handleNext}
                                    sx={{
                                        width: { xs: '100%', sm: 'fit-content' },
                                        backgroundColor: colors.grey[800],
                                        color: "white",
                                        fontWeight: "bold"
                                    }}
                                >
                                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                </Button>
                            ) : null}
                        </Box>
                    </Box>
                </React.Fragment>

            </Box >
        </Box >

    );
}
