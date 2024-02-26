import * as React from 'react';
import Button from '@mui/material/Button';
import {Container, MenuItem, Modal, Select} from '@mui/material';
import {Field, Form, Formik} from 'formik';
import {Desk, Restaurant} from "../../types/auth/types";
import styled from "@emotion/styled";
import {object, string} from 'yup';
import {useSnackbar} from "notistack";
import {useCreateDeskMutation, useUpdateDeskMutation} from '../../store/query/desk.query';
import {useGetRestaurantsByOwnerQuery} from "../../store/query/restaurant.query";
import {DateTimePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {Input, Label} from '../../customTheme';

let userSchema = object({
    restaurant: string().required(),
});

export type EditDeskProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    desk?: Desk;
    refetch: () => void;
}

export default function EditDeskComponent({open, setOpen, desk, refetch}: EditDeskProps) {
    const {enqueueSnackbar} = useSnackbar();
    const [createDesk] = useCreateDeskMutation()
    const [updateDesk] = useUpdateDeskMutation()
    const {data: restaurants} = useGetRestaurantsByOwnerQuery()

    const handleSubmit = async (prop: Desk) => {
        const isValid = await userSchema.isValid(prop);
        if (!isValid) {
            enqueueSnackbar('Error while validating ingredient form', {variant: "error"})
        } else {
            if (desk) {
                await updateDesk({
                    id: desk?.id,
                    size: prop.size,
                    restaurant: prop.restaurant
                })
                refetch()
                enqueueSnackbar('Desk successfully updated', {variant: "success"})
                setOpen(false)
            } else {
                await createDesk({
                    size: prop.size,
                    restaurant: {id: prop.restaurant} as Restaurant
                })
                refetch()
                enqueueSnackbar('Desk successfully created', {variant: "success"})
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
                        restaurant: desk?.restaurant,
                        size: desk?.size
                    } as Desk}
                    onSubmit={handleSubmit}>
                    {props => (
                        <Form>
                            <Label htmlFor="size">Size</Label>
                            <Input id="size" name="size" label='Size'
                                   isRequired={true}
                                   fontSize='sm'
                                   ms={{base: "0px", md: "0px"}}
                                   mb='24px'
                                   fontWeight='500'
                                   type="number"
                                   size='lg'/>
                            <Label id="restaurant-label">Select restaurant</Label>
                            <Select
                                labelId="restaurant-label"
                                id="restaurant"
                                name="restaurant"
                                defaultValue={props.values.restaurant?.id}
                                value={props.values.restaurant?.id || undefined}
                                onChange={props.handleChange}
                            >
                                {restaurants?.map((restaurant: Restaurant) => (
                                    <MenuItem key={restaurant.id} value={restaurant.id}>
                                        {restaurant.name}
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