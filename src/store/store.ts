import { configureStore } from "@reduxjs/toolkit";
import { cardSlice } from "./card-slice";

export const store = configureStore({
    reducer:{
        cards:cardSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;