import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

// export const fetchRandomJoke = async () => {
//     try {
//         const response = await axios.get(`https://api.chucknorris.io/jokes/random`);
//         console.log(JSON.stringify(response.data));
//         return response.data;
//     } catch(error) {
//         console.log(error)
//         return error
//     }
// }

export const fetchRandomJoke = createAsyncThunk('ramdomJoke/joke', async() => {
    console.log("api called")
    try {
        const response = await axios.get(`https://api.chucknorris.io/jokes/random`);
        console.log(JSON.stringify(response));
        return response.json();
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
        error: null
    },
    reducers:{},
    extraReducers: (builder) => {
        console.log("started");
        builder.addCase(fetchRandomJoke.pending, (state) => {
            console.log("pending");
            state.loading = true;
        })
        .addCase(fetchRandomJoke.fulfilled, (state, action) => {
            console.log("fullfiled");
            console.log(action.payload)
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

export default jokeSlice.reducer;
