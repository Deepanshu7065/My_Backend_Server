// src/Navbar.js
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Outlet, useNavigate } from 'react-router-dom';
import { pages } from './Pages/page';
import { ShoppingCart } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './Store';
import { Button } from '@mui/material';
import { setCustomerUser } from './Store/CustomerUserSaveSlice';


const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const dispatch = useDispatch()
    const product = useSelector((state: RootState) => state.ProductId.products)

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleOpenNavMenu = (event: any) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event: any) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);

    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const navigate = useNavigate()

    const { user } = useSelector((state: RootState) => state?.CustomerUser)
    const filteredPages = pages.filter(page =>
        !(page.title === "Users" && (!user?.userName || user?.userType === "Customer"))
    );

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        dispatch(setCustomerUser({
            userName: "",
            email: "",
            phone: 0,
            userType: ""
        }))
        setAnchorElUser(null)
    }

    return (
        <>
            <AppBar position="fixed"
                sx={{
                    color: "black",
                    width: '100%',
                    height: '60px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: 'white',
                }}>
                <Container style={{
                    display: 'flex',
                    maxWidth: "100%",
                    alignItems: 'center',
                }}>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            mr: 2, display: { xs: 'none', md: 'flex', },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Bat Repair
                    </Typography>

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: "80%"
                    }}>
                        <Box>
                            {isMobile ? (
                                <>
                                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
                                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', }, }}>
                                            <IconButton
                                                size="large"
                                                aria-label="open navigation menu"
                                                aria-controls="menu-appbar"
                                                aria-haspopup="true"
                                                onClick={handleOpenNavMenu}
                                                color="inherit"
                                            >
                                                <MenuIcon />
                                            </IconButton>
                                            <Menu
                                                id="menu-appbar"
                                                anchorEl={anchorElNav}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'left',
                                                }}
                                                keepMounted
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                                open={Boolean(anchorElNav)}
                                                onClose={handleCloseNavMenu}
                                                sx={{
                                                    display: { xs: 'block', md: 'none' },
                                                }}
                                            >
                                                {pages.map((page: any, index) => (
                                                    <MenuItem key={index} onClick={() => navigate(page.path)}>
                                                        <Typography textAlign="center">{page.title}</Typography>
                                                    </MenuItem>
                                                ))}
                                            </Menu>
                                        </Box>
                                        <Typography
                                            variant="h6"
                                            noWrap
                                            component="div"
                                            sx={{
                                                flexGrow: 1, display: { xs: 'flex', md: 'none' },
                                                fontFamily: 'monospace',
                                                fontWeight: 700,
                                                color: 'inherit',
                                                textDecoration: 'none',
                                            }}
                                        >
                                            Bat Repair
                                        </Typography>
                                    </Box>

                                </>
                            ) : (
                                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', color: "black" } }}>
                                    {filteredPages.map((page, index) => (
                                        <Typography
                                            key={index}
                                            onClick={() => {
                                                if (page.title !== "Users" || user?.userType !== "Customer") {
                                                    navigate(page.path);
                                                }
                                            }}
                                            sx={{
                                                ml: 2,
                                                display: 'block',
                                                cursor: page.title === "Users" && user?.userType === "Customer" ? 'not-allowed' : 'pointer',
                                                color: page.path === window.location.pathname ? "red" : "black",
                                                opacity: page.title === "Users" && user?.userType === "Customer" ? 0.5 : 1,
                                            }}
                                        >
                                            {page.title}
                                        </Typography>
                                    ))}
                                </Box>
                            )}
                        </Box>

                        <Box sx={{
                            gap: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            minWidth: "150px",
                            marginLeft: "20px",
                            textAlign: "center",
                            alignContent: "center"
                        }}>
                            <Tooltip title="View Cart">
                                <div style={{
                                    position: "relative",
                                    cursor: "pointer",
                                    marginTop: "10px"
                                }} onClick={() => navigate("/cart")}>
                                    <span
                                        style={{
                                            position: "absolute",
                                            top: "-15px",
                                            right: "-10px",
                                            background: "grey",
                                            color: "white",
                                            borderRadius: "50%",
                                            width: "20px",
                                            height: "20px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "12px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {product?.length}
                                    </span>
                                    <ShoppingCart />
                                </div>
                            </Tooltip>
                            {user?.userName ?
                                (
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" sx={{
                                                width: 25,
                                                height: 25,
                                                padding: 2
                                            }} />
                                        </IconButton>
                                    </Tooltip>
                                ) : (
                                    <Button variant="outlined" onClick={() => navigate("/login")}>
                                        Login
                                    </Button>
                                )}


                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem>
                                    <Typography
                                        textAlign="center"
                                        onClick={handleLogout}
                                        sx={{ paddingRight: '20px' }}
                                    >
                                        LogOut
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Box>
                </Container>
            </AppBar >
            <Box sx={{ display: 'flex', }}>
                <Outlet />
            </Box>
        </>
    );
};

export default Navbar;
