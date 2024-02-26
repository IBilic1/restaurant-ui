import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import {Container, MenuItem, Modal, Select} from '@mui/material';
import {Form, Formik} from 'formik';
import {Desk, Reservation} from "../../types/auth/types";
import {object} from 'yup';
import {useSnackbar} from "notistack";
import {useGetAllDesksQuery} from "../../store/query/desk.query";
import dayjs, {Dayjs} from "dayjs";
import {DateTimePicker} from '@mui/x-date-pickers';
import {useReservateReservationMutation} from "../../store/query/reservation.query";
import {Label} from "../../customTheme";

let userSchema = object({});

export type EditReservationProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    reservation?: Reservation;
    refetch: () => void;
}

export default function Reservate({open, setOpen, reservation, refetch}: EditReservationProps) {
    const {enqueueSnackbar} = useSnackbar();
    const [reservateDesk] = useReservateReservationMutation()
    const {data} = useGetAllDesksQuery()
    const [reservationTime, setReservationTime] = useState<string | undefined>(reservation?.reservationTime)

    const handleSubmit = async (prop: Reservation) => {
        const isValid = await userSchema.isValid(prop);
        if (!isValid) {
            enqueueSnackbar('Error while validating ingredient form', {variant: "error"})
        } else {
            if (reservation) {
                await reservateDesk({
                    id: reservation?.id,
                    reservationTime: reservationTime,
                    desk: {id: prop?.desk} as Desk,
                })
                refetch()
                enqueueSnackbar('Reservation successfully updated', {variant: "success"})
                setOpen(false)
            } else {
                await reservateDesk({
                    reservationTime: reservationTime,
                    desk: {id: prop?.desk} as Desk,
                })
                refetch()
                enqueueSnackbar('Reservation successfully created', {variant: "success"})
                setOpen(false)
            }
        }
    };

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Container component="main" maxWidth="xs" style={{
                background: '#f2f6fc', borderRadius: '2px'
            }}>
                <Formik
                    initialValues={{
                        reservationTime: reservation?.reservationTime,
                        desk: reservation?.desk,
                    } as Reservation}
                    onSubmit={handleSubmit}>
                    {props => (
                        <Form>
                            <Label htmlFor="reservation">Reservation</Label>
                            <DateTimePicker
                                label="Reservation"
                                value={dayjs(reservationTime)}
                                disablePast
                                onChange={(value: Dayjs | null) => setReservationTime(value?.toISOString())}
                            />
                            <Label id="restaurant-label">Select desk</Label>
                            <Select
                                labelId="restaurant-label"
                                id="desk"
                                name="desk"
                                defaultValue={props.values.desk?.id}
                                value={props.values.desk?.id || undefined}
                                onChange={props.handleChange}
                            >
                                {data?.map((desk: Desk) => (
                                    <MenuItem key={desk.id} value={desk.id}>
                                        {desk?.restaurant?.name} - {desk?.size ?? 0}
                                    </MenuItem>
                                ))}
                            </Select>
                            < br/>
                            <Button type="submit" color="primary" variant="contained"
                                    sx={{marginTop: '1rem', marginBottom: '1rem'}}> Submit
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Container>
        </Modal>
    );
}