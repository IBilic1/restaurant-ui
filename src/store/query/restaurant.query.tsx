import {createApi} from '@reduxjs/toolkit/query/react'
import {Restaurant, User} from "../../types/auth/types";
import {baseQuery} from "../baseQuery";

const BACKED_URL = process.env.REACT_APP_BACKEND

export const restaurantApi = createApi({
    reducerPath: 'restaurantApi',
    baseQuery: baseQuery(BACKED_URL || ''),
    endpoints: (builder) => ({
        getRestaurantsByOwner: builder.query<Restaurant[], void>({
            query: () => ({
                url: `/api/v1/restaurant`,
                method: 'GET',
            }),
        }),
        createRestaurant: builder.mutation<void, Restaurant>({
            query: (body) => ({
                url: `/api/v1/restaurant`,
                method: 'POST',
                body,
            }),
        }),
        updateRestaurant: builder.mutation<void, Restaurant>({
            query: (body) => ({
                url: `/api/v1/restaurant`,
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
        deleteRestaurant: builder.mutation<void, string>({
            query: (id) => ({
                url: `/api/v1/restaurant/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useGetAllUsersQuery,
    useGetRestaurantsByOwnerQuery,
    useCreateRestaurantMutation,
    useDeleteRestaurantMutation,
    useUpdateRestaurantMutation
} = restaurantApi