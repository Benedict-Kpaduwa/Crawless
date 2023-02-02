import { configureStore } from "@reduxjs/toolkit";
import releaseSliceReducer from "./features/releaseSlice";
import workflowSliceReducer from "./features/workflowSlice";

export const store = configureStore({
    reducer: {
        release: releaseSliceReducer,
        workflow: workflowSliceReducer
    }
})