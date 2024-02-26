import {configureStore} from '@reduxjs/toolkit'
import {authApi} from "./query/auth.query";
import {restaurantApi} from "./query/restaurant.query";
import {deskApi} from "./query/medicine.query";
import {ingredientApi} from "./query/ingredient.query";
import {dishApi} from "./query/dish.query";
import {reservationApi} from "./query/reservation.query";
import {orderApi} from "./query/order.query";


export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [authApi.reducerPath]: authApi.reducer,
        [restaurantApi.reducerPath]: restaurantApi.reducer,
        [ingredientApi.reducerPath]: ingredientApi.reducer,
        [dishApi.reducerPath]: dishApi.reducer,
        [deskApi.reducerPath]: deskApi.reducer,
        [reservationApi.reducerPath]: reservationApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(restaurantApi.middleware)
            .concat(ingredientApi.middleware)
            .concat(dishApi.middleware)
            .concat(reservationApi.middleware)
            .concat(orderApi.middleware)
            .concat(deskApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;