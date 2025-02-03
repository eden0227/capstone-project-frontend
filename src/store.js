import { configureStore } from "@reduxjs/toolkit";
import bookingsSlice from "./features/bookings/bookingsSlice";

export default configureStore({
    reducer: {
        bookings: bookingsSlice,
    },
});
