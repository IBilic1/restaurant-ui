import * as React from 'react';
import Button from '@mui/material/Button';
import {Container, Modal} from '@mui/material';
import {Field, Form, Formik} from 'formik';
import {Restaurant} from "../../types/auth/types";
import styled from "@emotion/styled";
import {object, string} from 'yup';
import {useSnackbar} from "notistack";
import {} from "react-intl";
import {useCreateRestaurantMutation, useUpdateRestaurantMutation} from "../../store/query/restaurant.query";

let userSchema = object({
    name: string().required(),
});

export type EditRestaurantProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    restaurant?: Restaurant;
    refetch: () => void;
}

export default function EditRestaurantComponent({open, setOpen, restaurant, refetch}: EditRestaurantProps) {
    const [createRestaurant] = useCreateRestaurantMutation()
    const [updateRestaurant] = useUpdateRestaurantMutation()
    const {enqueueSnackbar} = useSnackbar();

    const handleSubmit = async (prop: Restaurant) => {
        const isValid = await userSchema.isValid(prop);
        if (!isValid) {
            enqueueSnackbar('Error while validating restaurant form', {variant: "error"})
        } else {
            if (restaurant) {
                await updateRestaurant({
                    id: restaurant?.id,
                    name: prop.name,
                })
                refetch()
                enqueueSnackbar('Restaurant successfully updated', {variant: "success"})
                setOpen(false)
            } else {
                await createRestaurant({
                    name: prop.name,
                })
                refetch()
                enqueueSnackbar('Restaurant successfully updated', {variant: "success"})
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
                    initialValues={{name: restaurant?.name} as Restaurant}
                    onSubmit={handleSubmit}>
                    {props => (
                        <Form>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" label='Restaurant name'
                                   isRequired={true}
                                   fontSize='sm'
                                   ms={{base: "0px", md: "0px"}}
                                   mb='24px'
                                   fontWeight='500'
                                   size='lg'/>
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