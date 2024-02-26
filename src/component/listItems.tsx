import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {useNavigate} from "react-router-dom";
import {getRoleFromToken} from "../utils/utils";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function MainListItems() {
    const navigate = useNavigate();
    const isAdmin = getRoleFromToken();

    return <React.Fragment>
        {isAdmin &&
        <ListItemButton>
            <ListItemIcon>
                <RestaurantIcon/>
            </ListItemIcon>
            <ListItemText primary="Restaurants" onClick={() => navigate("/restaurant")}/>
        </ListItemButton>
        }
        {isAdmin &&
        <ListItemButton>
            <ListItemIcon>
                <FastfoodIcon/>
            </ListItemIcon>
            <ListItemText primary="Ingredients" onClick={() => navigate("/ingredient")}/>
        </ListItemButton>
        }
        {isAdmin &&
        <ListItemButton>
            <ListItemIcon>
                <MenuBookIcon/>
            </ListItemIcon>
            <ListItemText primary="Dishes" onClick={() => navigate("/dishes")}/>
        </ListItemButton>
        }
        {isAdmin &&
        <ListItemButton>
            <ListItemIcon>
                <MenuBookIcon/>
            </ListItemIcon>
            <ListItemText primary="Desks" onClick={() => navigate("/desks")}/>
        </ListItemButton>
        }
        {
        <ListItemButton>
            <ListItemIcon>
                <MenuBookIcon/>
            </ListItemIcon>
            <ListItemText primary="Reservation" onClick={() => navigate("/reservation")}/>
        </ListItemButton>
        }
        {
        <ListItemButton>
            <ListItemIcon>
                <MenuBookIcon/>
            </ListItemIcon>
            <ListItemText primary="Orders" onClick={() => navigate("/orders")}/>
        </ListItemButton>
        }
    </React.Fragment>
};