import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../axios/axios";
import { ROUTES } from "../../../consts/Consts";

const initialState = {
   user: JSON.parse(localStorage.getItem("user")) || {},
   authorInfoAndBooks: {},
   bookMarks: [],
   status: {
      getBookMarkedStatus: "idle",
      getAuthorInfoAndBooksStatus: "idle",
   },
}

export const getBookMarkedCollection = createAsyncThunk("getBookMarkedCollection", async () => {

   const response = await api.get(ROUTES.GET_BOOKMARK_COLLECTION);
   return response.data;
});

export const getAuthorInfoAndNovels = createAsyncThunk("getAuthorInfoAndNovels", async () => {
   
   const response = await api.get(ROUTES.GET_AUTHOR_INFO_NOVELS);
   return response.data;
});

export const userSlice = createSlice({

   name: 'user',

   initialState,

   reducers: {
      removeBookMark: (state, action) => {
         console.log(action.payload)
         console.log(state.bookMarks)
         state.bookMarks = state.bookMarks.filter(bm => bm?.id != action.payload)
         console.log(state.bookMarks.length)
      },

      setUser: (state, action) => {
         localStorage.setItem("user", JSON.stringify(action.payload));
         state.user = JSON.parse(localStorage.getItem("user"));
      }
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

         .addCase(getAuthorInfoAndNovels.pending, (state) => {
            state.status.getAuthorInfoAndBooksStatus = "pending";
         })

         .addCase(getAuthorInfoAndNovels.fulfilled, (state, action) => {
            const payload = action?.payload?.data;
            state.authorInfoAndBooks = payload;
            state.status.getAuthorInfoAndBooksStatus = "success";
         })

         .addCase(getAuthorInfoAndNovels.rejected, (state, action) => {   
            console.log(action.error);
            state.authorInfoAndBooks = [];
            state.status.getAuthorInfoAndBooksStatus = "failed";
         })
   }
});

export const getBookMarks = (state) => state.user.bookMarks;
export const getBookMarkStatus = (state) => state.user.status.getBookMarkedStatus;

export const getAuthorInfoAndBooks = (state) => state.user.authorInfoAndBooks;
export const getAuthorInfoAndBooksStatus = (state) => state.user.status.getAuthorInfoAndBooksStatus;

export const user = (state) => state.user.user;

export default userSlice.reducer;

export const { removeBookMark, setUser } = userSlice.actions;