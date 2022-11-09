import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import tokenReducer from "../features/slices/tokenSlice";

export const store = configureStore({
    reducer: tokenReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat()
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);