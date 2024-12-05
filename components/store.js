import { configureStore } from "@reduxjs/toolkit";
import jokeSlice from "./jokeSlice";

export const store = configureStore({
    reducer: {
        randomJoke: jokeSlice.reducer,
    },
});


