import {createApi} from '@reduxjs/toolkit/query/react'
import {Reservation} from "../../types/auth/types";
import {baseQuery} from "../baseQuery";

const BACKED_URL = process.env.REACT_APP_BACKEND

export const reservationApi = createApi({
    reducerPath: 'reservationApi',
    baseQuery: baseQuery(BACKED_URL || ''),
    endpoints: (builder) => ({
        getAllReservations: builder.query<Reservation[], void>({
            query: () => ({
                url: `/reservation`,
                method: 'GET',
            }),
        }),
        reservateReservation: builder.mutation<void, Reservation>({
            query: (body) => ({
                url: `/reservation`,
                method: 'PUT',
                body,
            }),
        }),
        deleteReservation: builder.mutation<void, string>({
            query: (id) => ({
                url: `reservation/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useDeleteReservationMutation,
    useGetAllReservationsQuery,
    useReservateReservationMutation
} = reservationApi