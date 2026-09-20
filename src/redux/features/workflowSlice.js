import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// This is the Store's remote catalog entry (api.stage.crawless.com), not the
// user's own local workflows — those are persisted locally, see Projects.jsx.
export const fetchWorkflow = createAsyncThunk('workflow/fetchWorkflow', async (version = '0.0.2')=>{
    return fetch(`https://api.stage.crawless.com/store/workflow/statista?version=${version}`).then((res)=> res.json())
})

export const workflowSlice = createSlice({
    name: 'workflow',
    initialState:{
        workflows: [],
        loading: false,
        error: false
    },
    extraReducers: {
        [fetchWorkflow.pending]:(state)=>{
            state.loading = true
        },
        [fetchWorkflow.fulfilled]:(state, action)=>{
            state.loading = false
            state.workflows = action.payload
        },
        [fetchWorkflow.rejected]:(state)=>{
            state.loading = false
            state.error = true
        }
    }
})

export default workflowSlice.reducer
