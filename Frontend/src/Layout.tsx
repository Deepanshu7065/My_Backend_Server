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


const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

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
                                    {pages.map((page, index) => (
                                        <Typography
                                            key={index}
                                            onClick={() => {
                                                navigate(page.path)
                                            }}
                                            // selected button background color is deffrent
                                            sx={{
                                                ml: 2, display: 'block', cursor: 'pointer', color: page.path === window.location.pathname ? "red" : "black"
                                            }}
                                        >
                                            {page.title}
                                        </Typography>
                                    ))}
                                </Box>
                            )}
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexGrow: 1, minWidth: "150px", marginLeft: "20px" }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
                                </IconButton>
                            </Tooltip>
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
                                        onClick={() => {
                                            navigate("/login");
                                            localStorage.removeItem("token");
                                        }}
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
