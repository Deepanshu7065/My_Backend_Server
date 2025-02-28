import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { AppBar, colors, useMediaQuery } from '@mui/material';
import { GridGoldenratioTwoTone, Home, Info } from '@mui/icons-material';
import { grey } from '@mui/material/colors';
import CheckAdRenderProduct from './CheckAdRenderProduct';
import PaymentCheckOut from './PaymentCheckOut';
import AddAddress from './AddAddress';
import { useSelector } from 'react-redux';
// import AddressForm from './components/AddressForm';
// import Info from './components/Info';
// import InfoMobile from './components/InfoMobile';
// import PaymentForm from './components/PaymentForm';
// import Review from './components/Review';
// import SitemarkIcon from './components/SitemarkIcon';
// import ColorModeIconDropdown from './theme/ColorModeIconDropdown';

const steps = ['Shipping address', 'Payment details', 'Review your order'];
function getStepContent(step: number) {
    switch (step) {
        case 0:
            return (<AddAddress  />)
        case 1:
            return "payment"
        case 2:
            return "review"
        default:
            throw new Error('Unknown step');
    }
}


export default function Checkout(props: { disableCustomTheme?: boolean }) {
    
    const [activeStep, setActiveStep] = React.useState(0);
    const handleNext = () => {
        setActiveStep(activeStep + 1);
    }; const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

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
                p: { xs: 1, md: 2 },
                minHeight: "100vh",
                bgcolor: colors.grey[50],
                justifyContent: "center",
            }}>
                <Stepper
                    id="desktop-stepper"
                    activeStep={activeStep}
                    sx={{ width: '70%', height: 40, mt: 15 }}
                >
                    {steps.map((label) => (
                        <Step
                            sx={{ ':first-child': { pl: 5 }, ':last-child': { pr: 0 } }}
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
                        minHeight: "80vh",
                        justifyContent: "space-between",
                    }}>
                        {getStepContent(activeStep)}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: activeStep === 0 ? 'flex-end' : 'space-between',
                                flexDirection: { xs: 'column', sm: 'row' },
                                pb: { xs: 12, sm: 0 },
                                mt: { xs: 2, sm: 0 },
                                mb: '60px',
                                alignItems: 'end',

                            }}
                        >
                            {activeStep !== 0 && (
                                <Button
                                    startIcon={<ChevronLeftRoundedIcon />}
                                    onClick={handleBack}
                                    variant="text"
                                    sx={{ display: { xs: 'none', sm: 'flex', color: "black" } }}
                                >
                                    Previous
                                </Button>
                            )}
                            {activeStep !== 0 && (
                                <Button
                                    startIcon={<ChevronLeftRoundedIcon />}
                                    onClick={handleBack}
                                    variant="outlined"
                                    fullWidth
                                    sx={{ display: { xs: 'flex', sm: 'none', color: "black" } }}
                                >
                                    Previous
                                </Button>
                            )}
                            <Button
                                variant="contained"
                                endIcon={<ChevronRightRoundedIcon />}
                                onClick={handleNext}
                                sx={{
                                    width: {
                                        xs: '100%', sm: 'fit-content',
                                        backgroundColor: colors.grey[800],
                                        color: "white", fontWeight: "bold"
                                    }
                                }}
                            >
                                {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                            </Button>
                        </Box>
                    </Box>
                </React.Fragment>

            </Box >
        </Box >

    );
}
