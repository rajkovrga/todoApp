import { configureStore } from "@reduxjs/toolkit";
import { tokenSlice } from "../features/slices/tokenSlice";

export const store = configureStore({
    reducer: {
        token: tokenSlice.reducer
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;