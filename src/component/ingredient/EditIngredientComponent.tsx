import * as React from 'react';
import Button from '@mui/material/Button';
import {Container, Modal} from '@mui/material';
import {Form, Formik} from 'formik';
import {Ingredient} from "../../types/auth/types";
import {object, string} from 'yup';
import {useSnackbar} from "notistack";
import {useCreateIngredientMutation, useUpdateIngredientMutation} from "../../store/query/ingredient.query";
import {Input, Label} from "../../customTheme";

let userSchema = object({
    name: string().required(),
});

export type EditIngredientProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    ingredient?: Ingredient;
    refetch: () => void;
}

export default function EditIngredientComponent({open, setOpen, ingredient, refetch}: EditIngredientProps) {
    const [createIngredient] = useCreateIngredientMutation()
    const [updateIngredient] = useUpdateIngredientMutation()
    const {enqueueSnackbar} = useSnackbar();

    const handleSubmit = async (prop: Ingredient) => {
        const isValid = await userSchema.isValid(prop);
        if (!isValid) {
            enqueueSnackbar('Error while validating ingredient form', {variant: "error"})
        } else {
            if (ingredient) {
                await updateIngredient({
                    id: ingredient?.id,
                    name: prop.name,
                })
                refetch()
                enqueueSnackbar('Ingredient successfully updated', {variant: "success"})
                setOpen(false)
            } else {
                await createIngredient({
                    name: prop.name,
                })
                refetch()
                enqueueSnackbar('Ingredient successfully updated', {variant: "success"})
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
                    initialValues={{name: ingredient?.name} as Ingredient}
                    onSubmit={handleSubmit}>
                    <Form>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" label='Ingredient name'
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
                </Formik>
            </Container>
        </Modal>
    );
}