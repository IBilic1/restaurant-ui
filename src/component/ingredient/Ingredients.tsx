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
import {Ingredient} from "../../types/auth/types";
import ConfirmDialog from "../dialog/ConfirmDialog";
import FoodBankIcon from '@mui/icons-material/FoodBank';
import {useDeleteIngredientMutation, useGetAllIngredientsQuery} from "../../store/query/ingredient.query";
import EditIngredientComponent from "./EditIngredientComponent";

export default function Ingredients() {
    const isAdmin = getRoleFromToken()
    const {data, refetch} = useGetAllIngredientsQuery()
    const [deleteIngredient] = useDeleteIngredientMutation()
    const [open, setOpen] = useState<boolean>(false)
    const [openEdit, setOpenEdit] = useState<boolean>(false)
    const [ingredient, setIngredient] = useState<Ingredient | undefined>()
    const [ingredientToDelete, setIngredientToDelete] = useState<Ingredient | undefined>()
    const [openDeleteDialog, setDeleteDialog] = useState<boolean>(false)

    return (
        <Paper sx={{marginTop: '1.5rem', padding: '1rem', background: "#FBEAE7"}}>
            <Box sx={{flexGrow: 1}}>
                <Grid item xs={12} md={6}>

                    <Box sx={{display: 'flex', justifyContent: "end"}}>
                        {
                            isAdmin && <Button variant='contained' type='submit' onClick={() => setOpen(true)}>
                                Create ingredient</Button>
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
                                                    setIngredientToDelete(restaurant)
                                                    setDeleteDialog(true)
                                                }}/>
                                            </IconButton>
                                            <IconButton>
                                                <EditIcon onClick={() => {
                                                    setIngredient(restaurant)
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
                <EditIngredientComponent open={openEdit} ingredient={ingredient} setOpen={setOpenEdit}
                                         refetch={refetch}/>}
                {open &&
                <EditIngredientComponent open={open} setOpen={setOpen} refetch={refetch}/>}
                <ConfirmDialog
                    open={openDeleteDialog}
                    setOpen={setDeleteDialog}
                    title="Delete ingredient"
                    description="Are you sure you want to delete ingredient"
                    onConfirm={() => {
                        ingredientToDelete?.id && deleteIngredient(ingredientToDelete?.id).then(() => {
                            refetch()
                        })
                    }}
                />
            </Box>
        </Paper>
    );
}