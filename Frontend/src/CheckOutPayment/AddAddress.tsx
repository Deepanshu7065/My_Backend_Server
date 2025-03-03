import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import { RootState } from '../Store';
import { useDispatch, useSelector } from 'react-redux';
import { GetCartApi, GetSaveAddressApi, GetSingleAddressByUser } from '../AllGetApi';
import { setProductDetails } from '../Store/ProductDetailsSlice';
import { SetAddAddress } from '../Store/AddCustomerSaveAddressSlice';
import { Box, Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import { AddAddressApi, UpdateAddressApi } from '../AllPostApi';
import { all } from 'axios';

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

const AddAddress = () => {
    const { user } = useSelector((state: RootState) => state?.CustomerUser);
    const [id, setId] = React.useState<string>('');
    const { data: allAddressData } = GetSaveAddressApi({ user_id: user?._id });
    const { data: saveAdress } = GetSingleAddressByUser({ id: id });
    const { data } = GetCartApi();
    const dispatch = useDispatch();
    const { mutateAsync } = AddAddressApi();
    const { mutateAsync: updateAddressByUser } = UpdateAddressApi()
    const [isIconVisible, setIsIconVisible] = React.useState(false);
    const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
    const [isChecked, setIsChecked] = React.useState(false);
    const [updateChecked, setUpdateChecked] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState<string | null>(null);
    const [updateOrders, setUpdateOrders] = React.useState<{
        customer_name: string;
        last_name: string;
        user?: string;
        address: string;
        fullAddress: string;
        city: string;
        state: string;
        pincode: string;
        phone: Number;
        landmark: string;
        country: string
    }>({
        customer_name: '',
        last_name: '',
        user: user?._id,
        address: '',
        fullAddress: '',
        city: '',
        state: '',
        pincode: '',
        phone: 0,
        landmark: '',
        country: ''
    });


    React.useEffect(() => {
        if (saveAdress) {
            setUpdateOrders({
                ...updateOrders,
                customer_name: saveAdress?.address?.customer_name,
                last_name: saveAdress?.address?.last_name,
                address: saveAdress?.address?.address,
                fullAddress: saveAdress?.address?.fullAddress,
                city: saveAdress?.address?.city,
                state: saveAdress?.address?.state,
                pincode: saveAdress?.address?.pincode,
                phone: saveAdress?.address?.phone,
                landmark: saveAdress?.address?.landmark,
                country: saveAdress?.address?.country,
                user: user?._id
            });
        }
    }, [saveAdress]);

    React.useEffect(() => {
        dispatch(setProductDetails(data as any));
    }, [data, saveAdress]);

    const handleSelectCard = (itemId: string) => {
        setId(itemId); // API call me delay ho sakta hai, lekin selectedCard ko pehle update karte hain
        setSelectedCard(itemId);
    };

    // Ensure data is retained
    // React.useEffect(() => {
    //     if (allAddressData && allAddressData.allAddress?.length > 0 && !selectedCard) {
    //         setId(allAddressData?.allAddress[0]?._id || "");
    //     }
    // }, [allAddressData]);


    const validateForm = () => {
        let newErrors: { [key: string]: string } = {};
        Object.keys(updateOrders).forEach((key) => {
            if (!updateOrders[key as keyof typeof updateOrders]) {
                newErrors[key] = 'This field is required';
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setIsIconVisible(true);
        setUpdateOrders({ ...updateOrders, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.target.checked);
        dispatch(SetAddAddress(saveAdress?.address));
        try {
            if (e.target.checked) {
                if (validateForm()) {
                    dispatch(SetAddAddress(updateOrders));
                    await mutateAsync({ data: updateOrders });
                }
                else {
                    dispatch(SetAddAddress(null));
                }
            }
        } catch (error) {
            console.log(error)
        }
    };

    const handleUpdateAddress = async () => {
        setUpdateChecked(true);
        try {
            if (validateForm()) {
                dispatch(SetAddAddress(updateOrders));
                await updateAddressByUser({ id: saveAdress?.address?._id, data: updateOrders });
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Box sx={{
            display: "flex",
            gap: 2,
            width: "70vw",
            justifyContent: "space-between",

        }}>
            <Grid container spacing={2} component="form" mt={7} width={"70%"}>
                <FormGrid size={{ xs: 12, md: 6 }}>
                    <FormLabel htmlFor="first-name" required>
                        First name
                    </FormLabel>
                    <TextField
                        id="first-name"
                        name="customer_name"
                        type="name"
                        placeholder="name"
                        autoComplete="given name"
                        required
                        size="small"
                        value={updateOrders.customer_name}
                        onChange={handleChangeValue}
                        error={!!errors.customer_name}


                    />
                </FormGrid>
                <FormGrid size={{ xs: 12, md: 6 }}>
                    <FormLabel htmlFor="last-name" required>
                        Last name
                    </FormLabel>
                    <TextField
                        id="last-name"
                        name="last_name"
                        type="last-name"
                        placeholder="last-name"
                        autoComplete="last name"
                        required
                        size="small"
                        value={updateOrders.last_name}
                        onChange={handleChangeValue}
                        error={!!errors.last_name}
                    />
                </FormGrid>
                <FormGrid size={{ xs: 12, md: 12 }}>
                    <FormLabel htmlFor="Phone" required>
                        Phone
                    </FormLabel>
                    <TextField
                        id="last-name"
                        name="phone"
                        type="number"
                        placeholder="phone"
                        autoComplete="phone number"
                        required
                        size="small"
                        value={updateOrders.phone}
                        onChange={handleChangeValue}
                        error={!!errors.phone}

                    />
                </FormGrid>
                <FormGrid size={{ xs: 12 }}>
                    <FormLabel htmlFor="address1" required>
                        Address line 1
                    </FormLabel>
                    <TextField
                        id="address1"
                        name="address"
                        type="address1"
                        placeholder="Street name and number"
                        autoComplete="shipping address-line1"
                        required
                        size="small"
                        value={updateOrders.address}
                        onChange={handleChangeValue}
                        error={!!errors.address}

                    />
                </FormGrid>
                <FormGrid size={{ xs: 12 }}>
                    <FormLabel htmlFor="address2">Address line 2</FormLabel>
                    <TextField
                        id="address2"
                        name="fullAddress"
                        type="address2"
                        placeholder="Apartment, suite, unit, etc. (optional)"
                        autoComplete="shipping address-line2"
                        required
                        size="small"
                        value={updateOrders.fullAddress}
                        onChange={handleChangeValue}
                        error={!!errors.fullAddress}

                    />
                </FormGrid>
                <FormGrid size={{ xs: 12 }}>
                    <FormLabel htmlFor="landmark">Landmark</FormLabel>
                    <TextField
                        id="landmark"
                        name="landmark"
                        type="landmark"
                        placeholder="Landmark"
                        autoComplete="shipping landmark"
                        required
                        size="small"
                        value={updateOrders.landmark}
                        onChange={handleChangeValue}
                        error={!!errors.landmark}

                    />
                </FormGrid>
                <FormGrid size={{ xs: 6 }}>
                    <FormLabel htmlFor="city" required>
                        City
                    </FormLabel>
                    <TextField
                        id="city"
                        name="city"
                        type="city"
                        placeholder="GURUGRAM"
                        autoComplete="City"
                        required
                        size="small"
                        value={updateOrders.city}
                        onChange={handleChangeValue}
                        error={!!errors.city}

                    />
                </FormGrid>
                <FormGrid size={{ xs: 6 }}>
                    <FormLabel htmlFor="state" required>
                        State
                    </FormLabel>
                    <TextField
                        id="state"
                        name="state"
                        type="state"
                        placeholder="HARYANA"
                        autoComplete="State"
                        required
                        size="small"
                        value={updateOrders.state}
                        onChange={handleChangeValue}
                        error={!!errors.state}

                    />
                </FormGrid>
                <FormGrid size={{ xs: 6 }}>
                    <FormLabel htmlFor="zip" required>
                        Zip / Postal code
                    </FormLabel>
                    <TextField
                        id="zip"
                        name="pincode"
                        type="zip"
                        placeholder="12345"
                        autoComplete="shipping postal-code"
                        required
                        size="small"
                        value={updateOrders.pincode}
                        onChange={handleChangeValue}
                        error={!!errors.pincode}

                    />
                </FormGrid>
                <FormGrid size={{ xs: 6 }}>
                    <FormLabel htmlFor="country" required>
                        Country
                    </FormLabel>
                    <TextField
                        id="country"
                        name="country"
                        type="country"
                        placeholder="INDIA"
                        autoComplete="shipping country"
                        required
                        size="small"
                        value={updateOrders.country}
                        onChange={handleChangeValue}
                        error={!!errors.country}

                    />
                </FormGrid>
                <Stack direction={"row"} width={"50%"} sx={{ display: "flex", justifyContent: "space-between" }}>
                    <FormControlLabel
                        control={<Checkbox
                            name="saveAddress"
                            checked={isChecked}
                            onChange={(e) => {
                                handleCheckboxChange(e);

                            }}
                        />}
                        label="Save Address for future use this location"
                    />
                    {isIconVisible && <FormControlLabel
                        control={<Checkbox
                            name="saveAddress"
                            checked={updateChecked}
                            onChange={handleUpdateAddress}
                        />}
                        label="Update Addresss"
                    />}
                </Stack>
            </Grid>
            <Box sx={{ display: "flex", mt: 10, flexDirection: "column", gap: 2 }}>
                {allAddressData?.allAddress?.map((item: any, index: number) => (
                    <Card
                        sx={{
                            bgcolor: selectedCard === item?._id ? "lightblue" : "white",
                            boxShadow: 3,
                            width: "400px",
                            height: 150,
                            cursor: "pointer",
                            transition: "0.3s",
                            "&:hover": { boxShadow: 6 },
                            border: selectedCard === item?._id ? "2px solid blue" : "1px solid gray"
                        }}
                        onClick={() => handleSelectCard(item?._id)}
                        key={index}
                    >
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {item?.address}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {item?.fullAddress}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {item?.city}, {item?.state}, {item?.pincode}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>

        </Box>

    )
}

export default AddAddress