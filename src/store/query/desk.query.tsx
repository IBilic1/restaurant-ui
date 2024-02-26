import {createApi} from '@reduxjs/toolkit/query/react'
import {Desk} from "../../types/auth/types";
import {baseQuery} from "../baseQuery";

const BACKED_URL = process.env.REACT_APP_BACKEND

export const deskApi = createApi({
    reducerPath: 'deskApi',
    baseQuery: baseQuery(BACKED_URL || ''),
    endpoints: (builder) => ({
        getAllDesks: builder.query<Desk[], void>({
            query: () => ({
                url: `/desk`,
                method: 'GET',
            }),
        }),
        createDesk: builder.mutation<void, Desk>({
            query: (body) => ({
                url: `/desk`,
                method: 'POST',
                body,
            }),
        }),
        updateDesk: builder.mutation<void, Desk>({
            query: (body) => ({
                url: `/desk`,
                method: 'PUT',
                body,
            }),
        }),
        deleteDesk: builder.mutation<void, string>({
            query: (id) => ({
                url: `desk/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useCreateDeskMutation,
    useDeleteDeskMutation,
    useUpdateDeskMutation,
    useGetAllDesksQuery,
} = deskApi