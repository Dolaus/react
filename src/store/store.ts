import {configureStore} from "@reduxjs/toolkit";
import userReducer from './slices/userSlice'
import exhibitReducer from "./slices/exhibitSlice";


export const store = configureStore({
    reducer: {
        user: userReducer,
        exhibit: exhibitReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
