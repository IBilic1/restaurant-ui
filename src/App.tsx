import React from 'react';
import './App.css';
import {CssBaseline, ThemeProvider} from "@mui/material";
import ResponsiveAppBar from "./component/ResponsiveAppBar";
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import SignInSide from "./component/SignInSide";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import Dashboard from "./component/Dashboard";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import Protected from "./component/route/Protected";
import Medicine from "./component/restaurant/RestaurantsDesks";
import {theme} from "./customTheme";
import {SnackbarProvider} from 'notistack';
import "dayjs/locale/en";
import "dayjs/locale/hr";
import {getRoleFromToken} from "./utils/utils";
import Ingredients from "./component/ingredient/Ingredients";
import Dishes from "./component/dishes/Dishes";
import Desks from "./component/desk/Desks";
import Reservations from "./component/reservation/Reservations";
import Orders from "./component/order/Orders";

function App() {
    const access_token = localStorage.getItem('access_token');
    const isAdmin = getRoleFromToken();


    return (

        <SnackbarProvider>
            <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <BrowserRouter>
                        <ResponsiveAppBar/>
                        <Routes>
                            <Route path="/" element={<Navigate to="home"/>}/>
                            <Route path="home" element={<SignInSide/>}/>
                            <Route path="sign-in" element={<SignIn/>}/>
                            <Route path="sign-up" element={<SignUp/>}/>
                            <Route path="restaurant"
                                   element={<Protected isAdminProtected={false} isAdminLogged={isAdmin}
                                                       children={<Dashboard><Medicine/></Dashboard>}
                                                       isLoggedIn={access_token !== null}/>}/>
                            <Route path="ingredient"
                                   element={<Protected isAdminProtected={true} isAdminLogged={isAdmin}
                                                       children={<Dashboard><Ingredients/></Dashboard>}
                                                       isLoggedIn={access_token !== null}/>}/>
                            <Route path="dishes"
                                   element={<Protected isAdminProtected={true} isAdminLogged={isAdmin}
                                                       children={<Dashboard><Dishes/></Dashboard>}
                                                       isLoggedIn={access_token !== null}/>}/>
                            <Route path="desks"
                                   element={<Protected isAdminProtected={true} isAdminLogged={isAdmin}
                                                       children={<Dashboard><Desks/></Dashboard>}
                                                       isLoggedIn={access_token !== null}/>}/>
                            <Route path="reservation"
                                   element={<Protected isAdminProtected={false} isAdminLogged={isAdmin}
                                                       children={<Dashboard><Reservations/></Dashboard>}
                                                       isLoggedIn={access_token !== null}/>}/>
                            <Route path="orders"
                                   element={<Protected isAdminProtected={false} isAdminLogged={isAdmin}
                                                       children={<Dashboard><Orders /></Dashboard>}
                                                       isLoggedIn={access_token !== null}/>}/>
                        </Routes>
                    </BrowserRouter>

                    <CssBaseline/>

                </LocalizationProvider>
            </ThemeProvider>
        </SnackbarProvider>
    );
}

export default App;
