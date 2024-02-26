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
import {Desk} from "../../types/auth/types";
import ConfirmDialog from "../dialog/ConfirmDialog";
import FoodBankIcon from '@mui/icons-material/FoodBank';
import {useDeleteDeskMutation, useGetAllDesksQuery} from "../../store/query/desk.query";
import EditDeskComponent from "./EditDeskComponent";

export default function Desks() {
    const isAdmin = getRoleFromToken()
    const {data, refetch} = useGetAllDesksQuery()
    const [deleteDesk] = useDeleteDeskMutation()
    const [open, setOpen] = useState<boolean>(false)
    const [openEdit, setOpenEdit] = useState<boolean>(false)
    const [desk, setDesk] = useState<Desk | undefined>()
    const [deskToDelete, setDeskToDelete] = useState<Desk | undefined>()
    const [openDeleteDialog, setDeleteDialog] = useState<boolean>(false)

    return (
        <Paper sx={{marginTop: '1.5rem', padding: '1rem', background: "#FBEAE7"}}>
            <Box sx={{flexGrow: 1}}>
                <Grid item xs={12} md={6}>

                    <Box sx={{display: 'flex', justifyContent: "end"}}>
                        {
                            isAdmin && <Button variant='contained' type='submit' onClick={() => setOpen(true)}>
                                Create desk</Button>
                        }
                    </Box>
                    <Box>
                        <List>
                            {data?.map(desk => {
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
                                                    setDeskToDelete(desk)
                                                    setDeleteDialog(true)
                                                }}/>
                                            </IconButton>
                                            <IconButton>
                                                <EditIcon onClick={() => {
                                                    setDesk(desk)
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
                                        primary={`${desk?.restaurant?.name} - ${desk?.size ?? 0}`}
                                    />
                                </ListItem>
                            })}
                        </List>
                    </Box>
                </Grid>
                {openEdit &&
                <EditDeskComponent open={openEdit} desk={desk} setOpen={setOpenEdit}
                                   refetch={refetch}/>}
                {open &&
                <EditDeskComponent open={open} setOpen={setOpen} refetch={refetch}/>}
                <ConfirmDialog
                    open={openDeleteDialog}
                    setOpen={setDeleteDialog}
                    title="Delete desk"
                    description="Are you sure you want to delete desk"
                    onConfirm={() => {
                        deskToDelete?.id && deleteDesk(deskToDelete?.id).then(() => {
                            refetch()
                        })
                    }}
                />
            </Box>
        </Paper>
    );
}