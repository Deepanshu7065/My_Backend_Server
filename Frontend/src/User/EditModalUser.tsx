import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Store';
import { 
    Dialog, DialogTitle, DialogContent, DialogActions, 
    TextField, Button, Stack, Typography, LinearProgress 
} from '@mui/material';
import { setUserId } from '../Store/EditUserSlice';
import { getSingleUser } from '../AllGetApi';
import { UpdateUserApi } from '../AllPostApi';

const EditModalUser = () => {
    const { user_id } = useSelector((state: RootState) => state.EditUser);
    const dispatch = useDispatch();
    
    const [updateUser, setUpdateUser] = React.useState({
        userName: "",
        email: "",
        userType: "",
        phone: "",
    });

    const { data, isLoading } = getSingleUser({ id: user_id });
    const { mutateAsync } = UpdateUserApi();

    useEffect(() => {
        if (data) {
            setUpdateUser({
                userName: data.userName || "",
                email: data.email || "",
                userType: data.userType || "",
                phone: data.phone || "",
            });
        }
    }, [data]);

    const handleClose = () => {
        dispatch(setUserId(""));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            await mutateAsync({ id: user_id, data: updateUser });
            handleClose();
        } catch (error) {
            console.error("Update failed:", error);
        }
    };

    return (
        <Dialog 
            open={Boolean(user_id)} 
            onClose={handleClose} 
            sx={{
                "& .MuiDialog-paper": {
                    width: { xs: "90%", sm: "50%" },
                    borderRadius: "15px",
                    padding: "20px",
                },
            }}
        >
            <DialogTitle>
                <Typography fontSize="1.5rem" fontWeight="bold">
                    Edit User
                </Typography>
            </DialogTitle>

            <DialogContent dividers>
                {isLoading ? (
                    <LinearProgress />
                ) : (
                    <Stack spacing={2}>
                        <TextField
                            label="User Name"
                            name="userName"
                            value={updateUser.userName}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={updateUser.email}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            label="User Type"
                            name="userType"
                            value={updateUser.userType}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            label="Phone Number"
                            name="phone"
                            type="tel"
                            value={updateUser.phone}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                        />
                    </Stack>
                )}
            </DialogContent>

            <DialogActions sx={{ justifyContent: "space-between", padding: "20px" }}>
                <Button variant="outlined" color="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleUpdate} 
                    disabled={isLoading}
                >
                    Update User
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditModalUser;
