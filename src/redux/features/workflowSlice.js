import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchWorkflow = createAsyncThunk('workflow/fetchWorkflow', async ()=>{
    return fetch("https://api.stage.crawless.com/store/workflow/statista").then((res)=> res.json())
})

export const workflowSlice = createSlice({
    name: 'workflow',
    initialState:{
        workflows: [],
        loading: false,
        error: false
    },
    extraReducers: {
        [fetchWorkflow.pending]:(state, action)=>{
            state.loading = true
        },
        [fetchWorkflow.fulfilled]:(state, action)=>{
            state.loading = false
            state.workflows = action.payload
        },
        [fetchWorkflow.rejected]:(state, action)=>{
            state.loading = false
        }
    }
})

export default workflowSlice.reducer