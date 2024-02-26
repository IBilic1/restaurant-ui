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
import {Desk, Ingredient, Reservation} from "../../types/auth/types";
import ConfirmDialog from "../dialog/ConfirmDialog";
import FoodBankIcon from '@mui/icons-material/FoodBank';
import {useDeleteReservationMutation, useGetAllReservationsQuery} from "../../store/query/reservation.query";
import Reservate from './Reservate';

export default function Reservations() {
    const isAdmin = getRoleFromToken()
    const {data, refetch} = useGetAllReservationsQuery()
    const [deleteReservation] = useDeleteReservationMutation()
    const [open, setOpen] = useState<boolean>(false)
    const [openEdit, setOpenEdit] = useState<boolean>(false)
    const [reservation, setReservation] = useState<Reservation | undefined>()
    const [reservationToDelete, setReservationToDelete] = useState<Reservation | undefined>()
    const [openDeleteDialog, setDeleteDialog] = useState<boolean>(false)

    return (
        <Paper sx={{marginTop: '1.5rem', padding: '1rem', background: "#FBEAE7"}}>
            <Box sx={{flexGrow: 1}}>
                <Grid item xs={12} md={6}>

                    <Box sx={{display: 'flex', justifyContent: "end"}}>
                        <Button variant='contained' type='submit' onClick={() => setOpen(true)}>
                                Create reservation</Button>

                    </Box>
                    <Box>
                        <List>
                            {data?.map((reservation: Reservation) => {
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
                                                    setReservationToDelete(reservation)
                                                    setDeleteDialog(true)
                                                }}/>
                                            </IconButton>
                                            <IconButton>
                                                <EditIcon onClick={() => {
                                                    setReservation(reservation)
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
                                        primary={`${reservation?.desk?.restaurant?.name} - ${reservation?.desk?.size ?? 0}`}
                                    />
                                </ListItem>
                            })}
                        </List>
                    </Box>
                </Grid>
                {openEdit &&
                <Reservate open={openEdit} reservation={reservation} setOpen={setOpenEdit}
                           refetch={refetch}/>}
                {open &&
                <Reservate open={open} setOpen={setOpen} refetch={refetch}/>}
                <ConfirmDialog
                    open={openDeleteDialog}
                    setOpen={setDeleteDialog}
                    title="Delete reservation"
                    description="Are you sure you want to delete reservation"
                    onConfirm={() => {
                        reservationToDelete?.id && deleteReservation(reservationToDelete?.id).then(() => {
                            refetch()
                        })
                    }}
                />
            </Box>
        </Paper>
    );
}