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
                url: `/api/v1/desk`,
                method: 'GET',
            }),
        }),
        getDesk: builder.query<Desk[], string>({
            query: (id: string) => ({
                url: `/api/v1/desk/${id}`,
                method: 'GET',
            }),
        }),
        createDesk: builder.mutation<void, Desk>({
            query: (body) => ({
                url: `/api/v1/desk`,
                method: 'POST',
                body,
            }),
        }),
        updateDesk: builder.mutation<void, Desk>({
            query: (body) => ({
                url: `/api/v1/desk`,
                method: 'PUT',
                body,
            }),
        }),
        deleteDesk: builder.mutation<void, string>({
            query: (id) => ({
                url: `/api/v1/desk/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useGetAllDesksQuery,
    useCreateDeskMutation,
    useGetDeskQuery,
    useDeleteDeskMutation,
    useUpdateDeskMutation,
} = deskApi