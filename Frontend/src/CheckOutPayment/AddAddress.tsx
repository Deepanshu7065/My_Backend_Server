import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import { RootState } from '../Store';
import { useDispatch, useSelector } from 'react-redux';
import { GetCartApi, GetSaveAddressApi } from '../AllGetApi';
import { setProductDetails } from '../Store/ProductDetailsSlice';
import { SetAddAddress } from '../Store/AddCustomerSaveAddressSlice';
import { Button } from '@mui/material';
import { AddAddressApi, OrderCreateApi } from '../AllPostApi';
import { SaveAsRounded } from '@mui/icons-material';

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

const AddAddress = () => {
    const { user } = useSelector((state: RootState) => state?.CustomerUser);
    const products = useSelector((state: RootState) => state?.ProductId.products);
    const totalQuantity = products?.reduce((acc, p) => acc + p.quantity, 0) || 0
    const { data: saveAdress } = GetSaveAddressApi({ user_id: user?._id });
    const totalPrice = products?.reduce((acc, item) => acc + Number(item.price ?? 0) * Number(item.quantity), 0) || 0
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
        customer_name: user?.userName || '',
        last_name: '',


        user: user?._id,
        address: '',
        fullAddress: '',
        city: '',
        state: '',
        pincode: '',
        phone: user?.phone || 0,
        landmark: '',
        country: ''
    });
    const { data } = GetCartApi();
    const dispatch = useDispatch();
    const { mutateAsync } = AddAddressApi();

    React.useEffect(() => {
        dispatch(setProductDetails(data as any));
        dispatch(SetAddAddress(updateOrders as any));
    }, [data, saveAdress]);


    const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
    const [isChecked, setIsChecked] = React.useState(false);

    React.useEffect(() => {
        setUpdateOrders({
            customer_name: saveAdress?.customer_name || '',
            last_name: '',
            // quantity: totalQuantity,
            // total: totalPrice,
            user: user?._id,
            address: '',
            fullAddress: '',
            city: '',
            state: '',
            pincode: '',
            phone: saveAdress?.phone || 0,
            landmark: '',
            country: ''
        });
    }, [products, saveAdress]);


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
        setUpdateOrders({ ...updateOrders, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.target.checked);
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



    return (
        <Grid container spacing={2} component="form" mt={7}>
            <FormGrid size={{ xs: 12, md: 6 }}>
                <FormLabel htmlFor="first-name" required>
                    First name
                </FormLabel>
                <OutlinedInput
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
                <OutlinedInput
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
                <OutlinedInput
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
                <OutlinedInput
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
                <OutlinedInput
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
                <OutlinedInput
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
                <OutlinedInput
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
                <OutlinedInput
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
                <OutlinedInput
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
                <OutlinedInput
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
            <FormGrid size={{ xs: 12 }}>
                <FormControlLabel
                    control={<Checkbox
                        name="saveAddress"
                        checked={isChecked}
                        onChange={(e) => {
                            handleCheckboxChange(e);

                        }}
                    />}
                    label="Use this address for payment details"
                />
            </FormGrid>
        </Grid>
    )
}

export default AddAddress