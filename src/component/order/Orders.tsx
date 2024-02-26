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
import {Order} from "../../types/auth/types";
import ConfirmDialog from "../dialog/ConfirmDialog";
import FoodBankIcon from '@mui/icons-material/FoodBank';
import {useDeleteOrderMutation, useGetAllOrdersQuery} from "../../store/query/order.query";
import EditOrder from "./EditOrder";

export default function Orders() {
    const {data, refetch} = useGetAllOrdersQuery()
    const [deleteOrder] = useDeleteOrderMutation()
    const [open, setOpen] = useState<boolean>(false)
    const [openEdit, setOpenEdit] = useState<boolean>(false)
    const [order, setOrder] = useState<Order | undefined>()
    const [orderToDelete, setOrderToDelete] = useState<Order | undefined>()
    const [openDeleteDialog, setDeleteDialog] = useState<boolean>(false)

    return (
        <Paper sx={{marginTop: '1.5rem', padding: '1rem', background: "#FBEAE7"}}>
            <Box sx={{flexGrow: 1}}>
                <Grid item xs={12} md={6}>
                    <Box sx={{display: 'flex', justifyContent: "end"}}>
                        {
                            <Button variant='contained' type='submit' onClick={() => setOpen(true)}>
                                Create order</Button>
                        }
                    </Box>
                    <Box>
                        <List>
                            {data?.map(order => {
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
                                                    setOrderToDelete(order)
                                                    setDeleteDialog(true)
                                                }}/>
                                            </IconButton>
                                            <IconButton>
                                                <EditIcon onClick={() => {
                                                    setOrder(order)
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
                                        primary={"Order dishes: " + order?.dishes?.map(dish => dish?.name + " ")}
                                    />
                                </ListItem>
                            })}
                        </List>
                    </Box>
                </Grid>
                {openEdit &&
                <EditOrder open={openEdit} order={order} setOpen={setOpenEdit}
                           refetch={refetch}/>}
                {open &&
                <EditOrder open={open} setOpen={setOpen} refetch={refetch}/>}
                <ConfirmDialog
                    open={openDeleteDialog}
                    setOpen={setDeleteDialog}
                    title="Delete order"
                    description="Are you sure you want to delete order"
                    onConfirm={() => {
                        orderToDelete?.id && deleteOrder(orderToDelete?.id).then(() => {
                            refetch()
                        })
                    }}
                />
            </Box>
        </Paper>
    );
}