import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import {Container, MenuItem, Modal, Select} from '@mui/material';
import {Form, Formik} from 'formik';
import {Dish, Ingredient, Order} from "../../types/auth/types";
import {useSnackbar} from "notistack";
import dayjs, {Dayjs} from "dayjs";
import {DateTimePicker} from '@mui/x-date-pickers';
import {useGetDishesByOwnerQuery} from "../../store/query/dish.query";
import {useSaveOrderMutation} from "../../store/query/order.query";
import {Label} from "../../customTheme";

export type EditOrderProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    order?: Order;
    refetch: () => void;
}

const convertIdsToDishes = (dishesIds: string[]): Dish[] => {
    return dishesIds.map((id) => {
        return {id: id};
    });
};

const convertDishesToIds = (orders: Order[]): string[] => {
    return orders?.map((order) => {
        return order.id ?? "";
    });
};

export default function EditOrder({open, setOpen, order, refetch}: EditOrderProps) {
    const {enqueueSnackbar} = useSnackbar();
    const [saveOrder] = useSaveOrderMutation()
    const {data} = useGetDishesByOwnerQuery()
    const [orderTime, setOrderTime] = useState<string | undefined>(order?.orderTime)

    const handleSubmit = async (prop: Order) => {
        if (order) {
            await saveOrder({
                id: order?.id,
                dishes: convertIdsToDishes(prop?.dishes as string[]),
                orderTime: orderTime
            })
            refetch()
            enqueueSnackbar('Order successfully updated', {variant: "success"})
            setOpen(false)
        } else {
            await saveOrder({
                dishes: convertIdsToDishes(prop?.dishes as string[]),
                orderTime: orderTime
            })
            refetch()
            enqueueSnackbar('Order successfully created', {variant: "success"})
            setOpen(false)
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
                        dishes: convertDishesToIds(order?.dishes ?? []),
                        orderTime: orderTime
                    } as Order}
                    onSubmit={handleSubmit}>
                    {props => (
                        <Form>
                            <DateTimePicker
                                label="Order time"
                                value={dayjs(orderTime)}
                                disablePast
                                onChange={(value: Dayjs | null) => setOrderTime(value?.toISOString())}
                            />
                            <Label id="restaurant-label">Select dishes</Label>
                            <Select
                                labelId="ingredients-label"
                                id="dishes"
                                name="dishes"
                                multiple
                                defaultValue={props.values.dishes}
                                value={props.values.dishes ?? []}
                                onChange={props.handleChange}
                            >
                                {data?.map((dish) => (
                                    <MenuItem key={dish.id} value={dish.id}>
                                        {dish.name}
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