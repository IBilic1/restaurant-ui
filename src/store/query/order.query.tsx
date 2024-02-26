import {createApi} from '@reduxjs/toolkit/query/react'
import {Order} from "../../types/auth/types";
import {baseQuery} from "../baseQuery";

const BACKED_URL = process.env.REACT_APP_BACKEND

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: baseQuery(BACKED_URL || ''),
    endpoints: (builder) => ({
        getAllOrders: builder.query<Order[], void>({
            query: () => ({
                url: `/order`,
                method: 'GET',
            }),
        }),
        saveOrder: builder.mutation<void, Order>({
            query: (body) => ({
                url: `/order`,
                method: 'PUT',
                body,
            }),
        }),
        deleteOrder: builder.mutation<void, string>({
            query: (id) => ({
                url: `order/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useDeleteOrderMutation,
    useGetAllOrdersQuery,
    useSaveOrderMutation
} = orderApi