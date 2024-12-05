import { configureStore } from "@reduxjs/toolkit";
import jokeSlice from "./jokeSlice";

export const store = configureStore({
    reducer: {
        joke: jokeSlice,
    },
});


