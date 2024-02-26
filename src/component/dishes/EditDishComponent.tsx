import * as React from 'react';
import Button from '@mui/material/Button';
import {Container, MenuItem, Modal, Select} from '@mui/material';
import {Form, Formik} from 'formik';
import {Dish, Ingredient, Restaurant} from "../../types/auth/types";
import {object, string} from 'yup';
import {useSnackbar} from "notistack";
import {useCreateDishMutation, useUpdateDishMutation} from '../../store/query/dish.query';
import {useGetRestaurantsByOwnerQuery} from "../../store/query/restaurant.query";
import {useGetAllIngredientsQuery} from "../../store/query/ingredient.query";
import {Input, Label} from "../../customTheme";

let userSchema = object({
    name: string().required(),
});

export type EditDishProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    dish?: Dish;
    refetch: () => void;
}

const convertIdsToIngredients = (ingredientIds: string[]): Ingredient[] => {
    return ingredientIds.map((id) => {
        return {id: id};
    });
};

const convertIngredientsToIds = (ingredients: Ingredient[]): string[] => {
    return ingredients?.map((ingredient) => {
        return ingredient.id ?? "";
    });
};

export default function EditDishComponent({open, setOpen, dish, refetch}: EditDishProps) {
    const {enqueueSnackbar} = useSnackbar();
    const [createDish] = useCreateDishMutation()
    const [updateDish] = useUpdateDishMutation()
    const {data: restaurants} = useGetRestaurantsByOwnerQuery()
    const {data: ingredients} = useGetAllIngredientsQuery()


    const handleSubmit = async (prop: Dish) => {
        const isValid = await userSchema.isValid(prop);
        if (!isValid) {
            enqueueSnackbar('Error while validating ingredient form', {variant: "error"})
        } else {
            if (dish) {
                await updateDish({
                    id: dish?.id,
                    name: prop.name,
                    ingredients: prop.ingredients,
                    restaurant: prop.restaurant
                })
                refetch()
                enqueueSnackbar('Dish successfully updated', {variant: "success"})
                setOpen(false)
            } else {

                await createDish({
                    name: prop.name,
                    ingredients: convertIdsToIngredients(prop.ingredientsHelper as string[]),
                    restaurant: {id: prop.restaurant} as Restaurant
                })
                refetch()
                enqueueSnackbar('Dish successfully created', {variant: "success"})
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
                        name: dish?.name,
                        ingredients: dish?.ingredients,
                        restaurant: dish?.restaurant,
                        ingredientsHelper: convertIngredientsToIds(dish?.ingredients ?? [])
                    } as Dish}
                    onSubmit={handleSubmit}>
                    {props => (
                        <Form>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" label='Dish name'
                                   isRequired={true}
                                   fontSize='sm'
                                   ms={{base: "0px", md: "0px"}}
                                   mb='24px'
                                   fontWeight='500'
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
                            <Label id="ingredients-label">Select ingredients</Label>
                            <Select
                                labelId="ingredients-label"
                                id="ingredients"
                                name="ingredientsHelper"
                                multiple
                                defaultValue={props.values.ingredientsHelper}
                                value={props.values.ingredientsHelper ?? []}
                                onChange={props.handleChange}
                            >
                                {ingredients?.map((ingredient) => (
                                    <MenuItem key={ingredient.id} value={ingredient.id}>
                                        {ingredient.name}
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