import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { storage } from "../../firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import axios from "axios";

const BASE_URL = "https://capstone-project-backend-zeta.vercel.app";

export const fetchImages = createAsyncThunk(
    "bookings/fetchImages",
    async () => {
        try {
            const imagesRef = ref(storage, "pages");
            const result = await listAll(imagesRef);

            const images = await Promise.all(
                result.items.map(async (itemRef) => {
                    const url = await getDownloadURL(itemRef);
                    return {
                        imageUrl: url,
                        fileName: itemRef.name,
                    }
                })
            );
            return images;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);

export const fetchGallery = createAsyncThunk(
    "bookings/fetchGallery",
    async () => {
        try {
            const galleryRef = ref(storage, "gallery");
            const result = await listAll(galleryRef);

            const gallery = await Promise.all(
                result.items.map(async (itemRef) => {
                    const url = await getDownloadURL(itemRef);
                    return {
                        imageUrl: url,
                        fileName: itemRef.name,
                    }
                })
            );
            return gallery;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);

export const fetchBarbers = createAsyncThunk(
    "bookings/fetchBarbers",
    async () => {
        const response = await axios.get(`${BASE_URL}/barbers`);
        return response.data;
    }
);

export const fetchSchedule = createAsyncThunk(
    "bookings/fetchSchedule",
    async (id) => {
        const response = await axios.get(`${BASE_URL}/barbers/${id}/schedule`);
        return { id, schedule: response.data};
    }
);

export const fetchScheduleAvailable = createAsyncThunk(
    "bookings/fetchScheduleAvailable",
    async (id) => {
        const response = await axios.get(`${BASE_URL}/barbers/${id}/schedule/available`);
        return { id, schedule: response.data};
    }
);

export const createReservation = createAsyncThunk(
    "bookings/createReservation",
    async({
        currentUid,
        userBarber_id,
        userDate,
        userTime,
        userName,
        userPhoneNumber
    }) => {
        const data = {
            user_uid: currentUid,
            barber_id: userBarber_id,
            date: userDate,
            time: userTime,
            name: userName,
            phone_number: userPhoneNumber
        }
        const response = await axios.post(`${BASE_URL}/booking/create`, data);
        return response.data;
    }
);

export const readReservation = createAsyncThunk(
    "bookings/readReservation",
    async (currentUid) => {
        const response = await axios.get(`${BASE_URL}/booking/read`, {
            params: { user_uid: currentUid },
        });
        return response.data;
    }
);

export const updateReservation = createAsyncThunk(
    "bookings/updateReservation",
    async({
        currentUid,
        userBarber_id,
        userDate,
        userTime,
        userName,
        userPhoneNumber
    }) => {
        const data = {
            user_uid: currentUid,
            barber_id: userBarber_id,
            date: userDate,
            time: userTime,
            name: userName,
            phone_number: userPhoneNumber
        }
        const response = await axios.put(`${BASE_URL}/booking/update`, data);
        return response.data;
    }
);

export const deleteReservation = createAsyncThunk(
    "bookings/deleteReservation",
    async (currentUid) => {
        const response = await axios.delete(`${BASE_URL}/booking/delete`, {
            data: { user_uid: currentUid },
        });
        return response.data;
    }
);

export const clearReservation = createAsyncThunk(
    "bookings/clearReservation",
    async () => {
        return console.log("User Logged Out");
    }
);

const bookingsSlice = createSlice({
    name: "bookings",
    initialState: { images: [], gallery: [], barbers: [], schedules: {}, schedulesAvailable: {}, isBooked: false, reservation: [] },
    extraReducers: (builder) => {
        builder
            .addCase(fetchImages.fulfilled, (state, action) => {
                state.images = action.payload;
            })
            .addCase(fetchGallery.fulfilled, (state, action) => {
                state.gallery = action.payload;
            })
            .addCase(fetchBarbers.fulfilled, (state, action) => {
                state.barbers = action.payload;
            })
            .addCase(fetchSchedule.fulfilled, (state, action) => {
                const { id, schedule } = action.payload;
                state.schedules[id] = schedule;
            })
            .addCase(fetchScheduleAvailable.fulfilled, (state, action) => {
                const { id, schedule } = action.payload;
                state.schedulesAvailable[id] = schedule;
            })
            .addCase(createReservation.fulfilled, (state, action) => {
                state.isBooked = true;
            })
            .addCase(readReservation.fulfilled, (state, action) => {
                state.reservation = action.payload;
                state.isBooked = true;
            })
            .addCase(updateReservation.fulfilled, (state, action) => {
                state.isBooked = true;
            })
            .addCase(deleteReservation.fulfilled, (state, action) => {
                state.reservation = [];
                state.isBooked = false;
            })
            .addCase(clearReservation.fulfilled, (state, action) => {
                state.reservation = [];
                state.isBooked = false;
            })
    },
});

export default bookingsSlice.reducer;
