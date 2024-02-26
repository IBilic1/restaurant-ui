import {createApi} from '@reduxjs/toolkit/query/react'
import {Dish, User} from "../../types/auth/types";
import {baseQuery} from "../baseQuery";

const BACKED_URL = process.env.REACT_APP_BACKEND

export const dishApi = createApi({
    reducerPath: 'dishApi',
    baseQuery: baseQuery(BACKED_URL || ''),
    endpoints: (builder) => ({
        getDishesByOwner: builder.query<Dish[], void>({
            query: () => ({
                url: `/dish`,
                method: 'GET',
            }),
        }),
        createDish: builder.mutation<void, Dish>({
            query: (body) => ({
                url: `/dish`,
                method: 'POST',
                body,
            }),
        }),
        updateDish: builder.mutation<void, Dish>({
            query: (body) => ({
                url: `/dish`,
                method: 'PUT',
                body,
            }),
        }),
        getAllUsers: builder.query<User[], void>({
            query: () => ({
                url: `/api/v1/user/all`,
                method: 'GET',
            }),
        }),
        deleteDish: builder.mutation<void, string>({
            query: (id) => ({
                url: `/dish/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useGetDishesByOwnerQuery,
    useCreateDishMutation,
    useDeleteDishMutation,
    useUpdateDishMutation
} = dishApi