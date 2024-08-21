import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name:'movies',
    initialState:{
        nowPlayingMovies:{},
        trailerMovie:null
    },
    reducers:{
        addMovies: (state,action) =>{
            state.nowPlayingMovies = action.payload;
        },
        trailerMovie: (state,action) =>{
            state.trailerMovie = action.payload;
        }
    }
});
export const { addMovies, trailerMovie } = moviesSlice.actions;
export default moviesSlice.reducer;