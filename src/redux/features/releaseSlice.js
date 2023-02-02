import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchReleases = createAsyncThunk('releases,fetchRelease', async()=>{
    return fetch('https://api.stage.crawless.com/store/workflow').then((res)=> res.json)
}) 

export const releaseSlice = createSlice({
    name: 'release',
    initialState:{
        releases: '',
        loading: false,
        error: false
    },
    extraReducers:{
        [fetchReleases.pending]:(state, action)=>{
            state.loading = true
        },
        [fetchReleases.fulfilled]:(state, action)=>{
            state.loading = false
            state.releases = action.payload
        },
        [fetchReleases.rejected]:(state, action)=>{
            state.loading = false
        }
    }
})

export default releaseSlice.reducer