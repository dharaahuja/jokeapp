import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const featchRandomJoke = createAsyncThunk('ramdomJoke/joke', async () => {
    const response = await fetch(' https://api.chucknorris.io/jokes/random');
    return response.json();
})

const jokeSlice = createSlice({
    name: 'randomJoke',
    initialState: {
        joke: null,
        loading: false,
        error: null
    },
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(featchRandomJoke.pending, (state) => {
            state.loading = true;
        })
        .addCase(featchRandomJoke.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.joke = action.payload
        })
        .addCase(featchRandomJoke.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default jokeSlice;
