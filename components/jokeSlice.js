import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

export const fetchRandomJoke = createAsyncThunk('ramdomJoke/joke', async() => {
    console.log("api called")
    try {
        const response = await axios.get(`https://api.chucknorris.io/jokes/random`);
        const value = response.data;
        console.log(value);
        return value;
    } catch(error) {
        console.log(error)
        return error
    }
})

const jokeSlice = createSlice({
    name: 'joke',
    initialState: {
        joke: null,
        loading: false,
        error: null,
        likeIds: [],
    },
    reducers:{
        addId: (state, action) => {
            const itemExists = state.likeIds.find(item => item === action.payload)
            if (!itemExists) {
                state.likeIds.push(action.payload);
            }
        }
    },
    extraReducers: (builder) => {
        console.log("started");
        builder.addCase(fetchRandomJoke.pending, (state) => {
            console.log("pending");
            state.loading = true;
        })
        .addCase(fetchRandomJoke.fulfilled, (state, action) => {
            console.log("fullfiled");
            state.loading = false;
            state.error = false;
            state.joke = action.payload
        })
        .addCase(fetchRandomJoke.rejected, (state, action) => {
            console.log("rejected");
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export const { addId } = jokeSlice.actions
export default jokeSlice.reducer;
