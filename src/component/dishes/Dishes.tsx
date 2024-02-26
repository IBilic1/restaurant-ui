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
import {Button, Paper} from "@mui/material";
import {getRoleFromToken} from "../../utils/utils";
import {Dish} from "../../types/auth/types";
import ConfirmDialog from "../dialog/ConfirmDialog";
import FoodBankIcon from '@mui/icons-material/FoodBank';
import {useDeleteDishMutation, useGetDishesByOwnerQuery} from "../../store/query/dish.query";
import EditDishComponent from "./EditDishComponent";

export default function Dishes() {
    const isAdmin = getRoleFromToken()
    const {data, refetch} = useGetDishesByOwnerQuery()
    const [deleteDish] = useDeleteDishMutation()
    const [open, setOpen] = useState<boolean>(false)
    const [openEdit, setOpenEdit] = useState<boolean>(false)
    const [dish, setDish] = useState<Dish | undefined>()
    const [dishToDelete, setDishToDelete] = useState<Dish | undefined>()
    const [openDeleteDialog, setDeleteDialog] = useState<boolean>(false)

    return (
        <Paper sx={{marginTop: '1.5rem', padding: '1rem', background: "#FBEAE7"}}>
            <Box sx={{flexGrow: 1}}>
                <Grid item xs={12} md={6}>

                    <Box sx={{display: 'flex', justifyContent: "end"}}>
                        {
                            isAdmin && <Button variant='contained' type='submit' onClick={() => setOpen(true)}>
                                Create dish</Button>
                        }
                    </Box>
                    <Box>
                        <List>
                            {data?.map(dish => {
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
                                                    setDishToDelete(dish)
                                                    setDeleteDialog(true)
                                                }}/>
                                            </IconButton>
                                            <IconButton>
                                                <EditIcon onClick={() => {
                                                    setDish(dish)
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
                                        primary={dish.name}
                                    />
                                </ListItem>
                            })}
                        </List>
                    </Box>
                </Grid>
                {openEdit &&
                <EditDishComponent open={openEdit} dish={dish} setOpen={setOpenEdit}
                                   refetch={refetch}/>}
                {open &&
                <EditDishComponent open={open} setOpen={setOpen} refetch={refetch}/>}
                <ConfirmDialog
                    open={openDeleteDialog}
                    setOpen={setDeleteDialog}
                    title="Delete dish"
                    description="Are you sure you want to delete dish"
                    onConfirm={() => {
                        dishToDelete?.id && deleteDish(dishToDelete?.id).then(() => {
                            refetch()
                        })
                    }}
                />
            </Box>
        </Paper>
    );
}