import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchReleases = createAsyncThunk('release/fetchReleases', async()=>{
    return fetch('https://api.stage.crawless.com/store/workflow/statista/releases').then((res)=> res.json())
})

export const releaseSlice = createSlice({
    name: 'release',
    initialState:{
        releases: [],
        loading: false,
        error: false
    },
    extraReducers:{
        [fetchReleases.pending]:(state)=>{
            state.loading = true
        },
        [fetchReleases.fulfilled]:(state, action)=>{
            state.loading = false
            state.releases = action.payload
        },
        [fetchReleases.rejected]:(state)=>{
            state.loading = false
            state.error = true
        }
    }
})

export default releaseSlice.reducer
