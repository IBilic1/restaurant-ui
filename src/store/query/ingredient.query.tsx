import {createApi} from '@reduxjs/toolkit/query/react'
import {Ingredient} from "../../types/auth/types";
import {baseQuery} from "../baseQuery";

const BACKED_URL = process.env.REACT_APP_BACKEND

export const ingredientApi = createApi({
    reducerPath: 'ingredientApi',
    baseQuery: baseQuery(BACKED_URL || ''),
    endpoints: (builder) => ({
        getAllIngredients: builder.query<Ingredient[], void>({
            query: () => ({
                url: `ingredient`,
                method: 'GET',
            }),
        }),
        createIngredient: builder.mutation<void, Ingredient>({
            query: (body) => ({
                url: `ingredient`,
                method: 'POST',
                body,
            }),
        }),
        updateIngredient: builder.mutation<void, Ingredient>({
            query: (body) => ({
                url: `ingredient`,
                method: 'PUT',
                body,
            }),
        }),
        deleteIngredient: builder.mutation<void, string>({
            query: (id) => ({
                url: `ingredient/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useGetAllIngredientsQuery,
    useUpdateIngredientMutation,
    useCreateIngredientMutation,
    useDeleteIngredientMutation
} = ingredientApi