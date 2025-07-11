import { createSlice } from "@reduxjs/toolkit";
import { createCompanyThunk, fetchAllCompaniesThunk } from "../thunks/businessEntitiesThunk";

interface BusinessEntitiesState {
  loading: boolean;
  data: unknown[];
  error: string | null;
}

const initialState: BusinessEntitiesState = {
  loading: false,
  data: [],
  error: null,
};

export const businessEntitiesSlice = createSlice({
    name: "businessEntity",
    initialState,
    reducers: {},
    extraReducers : (builder) => {
        builder.addCase(fetchAllCompaniesThunk.pending, (state)=> {
            state.loading = true
        })
        .addCase(fetchAllCompaniesThunk.fulfilled, (state, { payload })=> {
            state.loading = false
            state.data = payload
        })
        .addCase(fetchAllCompaniesThunk.rejected, (state, { payload })=> {
            state.loading = true
            state.error = payload as any
        })
        .addCase(createCompanyThunk.pending, (state)=> {
            state.loading = true
        })
        .addCase(createCompanyThunk.fulfilled, (state, { payload })=> {
            state.loading = false
            state.data = payload
        })
        .addCase(createCompanyThunk.rejected, (state, { payload })=> {
            state.loading = true
            state.error = payload as any
        })
    }
})

export default businessEntitiesSlice.reducer;