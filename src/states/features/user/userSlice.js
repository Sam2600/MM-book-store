import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../axios/axios";

const initialState = {
   bookMarks: [],
   status: {
      getBookMarkedStatus: "idle",
   },
}

export const getBookMarkedCollection = createAsyncThunk("getBookMarkedCollection", async () => {

   const response = await api.get("/getBookMarkedCollection");
   return response.data;
});

export const userSlice = createSlice({

   name: 'user',

   initialState,

   reducers: {
   },

   extraReducers: (builer) => {
      builer
         .addCase(getBookMarkedCollection.pending, (state) => {
            state.status.getBookMarkedStatus = "pending";
         })

         .addCase(getBookMarkedCollection.fulfilled, (state, action) => {
            const payload = action?.payload?.data;
            state.bookMarks = payload;
            state.status.getBookMarkedStatus = "success";
         })

         .addCase(getBookMarkedCollection.rejected, (state, action) => {   
            console.log(action.error);
            state.bookMarks = [];
            state.status.getBookMarkedStatus = "failed";
         })
   }
});

export const getBookMarks = (state) => state.user.bookMarks;
export const getBookMarkStatus = (state) => state.user.status.getBookMarkedStatus;

export default userSlice.reducer;

export const { } = userSlice.actions;