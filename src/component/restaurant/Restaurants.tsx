import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {Button} from "@mui/material";
import {getRoleFromToken} from "../../utils/utils";
import {Restaurant} from "../../types/auth/types";
import EditRestaurantComponent from "./EditRestaurantComponent";
import ConfirmDialog from "../dialog/ConfirmDialog";
import FoodBankIcon from '@mui/icons-material/FoodBank';
import {useDeleteRestaurantMutation, useGetRestaurantsByOwnerQuery} from "../../store/query/restaurant.query";

export default function Restaurants() {
    const isAdmin = getRoleFromToken();
    const {data, refetch} = useGetRestaurantsByOwnerQuery()
    const [deleteRestaurant] = useDeleteRestaurantMutation();
    const [open, setOpen] = useState<boolean>(false)
    const [openEdit, setOpenEdit] = useState<boolean>(false)
    const [restaurant, setManufacturer] = useState<Restaurant | undefined>()
    const [restaurantToDelete, setRestaurantToDelete] = useState<Restaurant | undefined>()
    const [openDeleteDialog, setDeleteDialog] = useState<boolean>(false)

    return (
        <Box sx={{flexGrow: 1}}>
            <Grid item xs={12} md={6}>

                <Box sx={{display: 'flex', justifyContent: "end"}}>
                    {
                        isAdmin && <Button variant='contained' type='submit' onClick={() => setOpen(true)}>
                            Create restaurant</Button>
                    }
                </Box>
                <Box>
                    <List>
                        {data?.map(restaurant => {
                            return <ListItem
                                sx={{
                                    border: '0.5px solid #cd3d6f',
                                    borderRadius: '2%',
                                    marginTop: '1rem'
                                }}
                                secondaryAction={
                                    <>
                                        <IconButton>
                                            <DeleteIcon onClick={() => {
                                                setRestaurantToDelete(restaurant)
                                                setDeleteDialog(true)
                                            }}/>
                                        </IconButton>
                                        <IconButton>
                                            <EditIcon onClick={() => {
                                                setManufacturer(restaurant)
                                                setOpenEdit(true)
                                            }}/>
                                        </IconButton>
                                    </>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <FoodBankIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={restaurant.name}
                                />
                            </ListItem>
                        })}
                    </List>
                </Box>
            </Grid>
            {openEdit &&
            <EditRestaurantComponent open={openEdit} restaurant={restaurant} setOpen={setOpenEdit}
                                     refetch={refetch}/>}
            {open &&
            <EditRestaurantComponent open={open} setOpen={setOpen} refetch={refetch}/>}
            <ConfirmDialog
                open={openDeleteDialog}
                setOpen={setDeleteDialog}
                title="Delete restaurant"
                description="Are you sure you want to delete restaurant"
                onConfirm={() => {
                    restaurantToDelete?.id && deleteRestaurant(restaurantToDelete?.id).then(() => {
                        refetch()
                    })
                }}
            />
        </Box>
    );
}