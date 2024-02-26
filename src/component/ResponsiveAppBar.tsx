import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import {Link} from "@mui/material";
import {useNavigate} from "react-router-dom";


function ResponsiveAppBar() {
    const access_token = localStorage.getItem('access_token');
    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Container maxWidth={false}>

                <Toolbar disableGutters>
                    <Link href="/home" sx={{color: 'white', display: 'flex'}}>
                        <Typography
                            variant="h6"
                            align="justify"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 500,
                                color: 'white',
                                textDecoration: 'none',
                            }}
                        >
                            RESTIC
                        </Typography>
                    </Link>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {access_token && <Link href="/restaurant" sx={{color: 'white', display: 'flex'}}>
                            <Typography
                                align="justify"
                                noWrap
                                component="a"
                                sx={{
                                    mr: 2,
                                    display: {xs: 'none', md: 'flex'},
                                    fontFamily: 'monospace',
                                    color: 'white',
                                    textDecoration: 'none',
                                }}
                            >
                                Manage restaurant
                            </Typography>
                        </Link>}
                    </Box>
                    <Box sx={{flexGrow: 0}}>
                        <MenuItem>
                            {
                                !access_token && <Link href="/sign-in" sx={{
                                    color: 'white',
                                    display: 'block',
                                    textTransform: "uppercase"
                                }}>
                                    <Typography textAlign="center">Log in</Typography>
                                </Link>
                            }
                            {
                                access_token && <Link onClick={() => {
                                    localStorage.removeItem('access_token')
                                    localStorage.removeItem('refresh_token')
                                    navigate("/sign-in")
                                }}
                                                      sx={{color: 'white', display: 'block'}}>
                                    <Typography textAlign="center">Log out</Typography>
                                </Link>
                            }
                        </MenuItem>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;