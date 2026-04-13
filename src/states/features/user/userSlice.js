import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../axios/axios";
import { ROUTES } from "../../../consts/Consts";
import { get } from "react-hook-form";

const initialState = {
   user: JSON.parse(localStorage.getItem("user")) || {},
   authorInfoAndBooks: {},
   userInfo: [],
   bookMarks: [],
   novelInfoByChapterId: {},
   paymentMethods: [],
   status: {
      getBookMarkedStatus: "idle",
      getAuthorInfoAndBooksStatus: "idle",
      getUserInfoStatus: "idle",
      getNovelInfoByChapterIdStatus: "idle",
      updateProfileStatus: "idle",
      getPaymentMethodsStatus: "idle",
   },
}

export const getBookMarkedCollection = createAsyncThunk("bookMarkedCollections", async () => {

   const response = await api.get(ROUTES.GET_BOOKMARK_COLLECTION);
   return response.data;
});

export const getAuthorInfoAndNovels = createAsyncThunk("author/:id", async (id) => {
   
   const response = await api.get(ROUTES.GET_AUTHOR_INFO_NOVELS.replace(":id", id));
   return response.data;
});

export const getUserInfo = createAsyncThunk("me", async () => {
   
   const response = await api.get(ROUTES.GET_USER_INFO);
   return response.data;
});

export const getPaymentMethods = createAsyncThunk("payment-methods", async () => {
   const response = await api.get(ROUTES.GET_PAYMENT_METHODS);
   return response.data;
});

export const updateUserProfile = createAsyncThunk("me/profile", async (profileData, { rejectWithValue }) => {
   try {
      const response = await api.patch(ROUTES.UPDATE_USER_PROFILE, profileData);
      return response.data;
   } catch (error) {
      return rejectWithValue(error.response?.data);
   }
});

export const getEditDataByChapterId = createAsyncThunk("novels/:novel/chapters/:chapter/edit", async ({ chapterId }) => {
   
   const response = await api.get(`/chapters/${chapterId}/edit`);
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
      },

      cleanUserInfo: (state) => {
         state.userInfo = []
         state.status.getUserInfoStatus = "idle"
      },

      resetUpdateProfileStatus: (state) => {
         state.status.updateProfileStatus = "idle"
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
      
         .addCase(getUserInfo.pending, (state) => {
            state.status.getUserInfoStatus = "pending"
         })
      
         .addCase(getUserInfo.fulfilled, (state, action) => {
            const payload = action?.payload?.data;
            state.userInfo = payload;
            state.status.getUserInfoStatus = "success";
         })
      
         .addCase(getUserInfo.rejected, (state, action) => {
            console.log(action.error);
            state.userInfo = [];
            state.status.getUserInfoStatus = "failed"
         })
      
         .addCase(getPaymentMethods.fulfilled, (state, action) => {
            state.paymentMethods = action?.payload?.data || [];
            state.status.getPaymentMethodsStatus = "success";
         })

         .addCase(getPaymentMethods.rejected, (state) => {
            state.paymentMethods = [];
            state.status.getPaymentMethodsStatus = "failed";
         })

         .addCase(updateUserProfile.pending, (state) => {
            state.status.updateProfileStatus = "pending";
         })

         .addCase(updateUserProfile.fulfilled, (state, action) => {
            const updatedUser = action?.payload?.data;
            state.user = updatedUser;
            localStorage.setItem("user", JSON.stringify(updatedUser));
            state.status.updateProfileStatus = "success";
         })

         .addCase(updateUserProfile.rejected, (state, action) => {
            state.status.updateProfileStatus = "failed";
            state.updateProfileError = action.payload;
         })

         .addCase(getEditDataByChapterId.pending, (state) => {
            state.status.getNovelInfoByChapterIdStatus = "pending"
         })

         .addCase(getEditDataByChapterId.fulfilled, (state, action) => {
            const payload = action?.payload?.data;
            state.novelInfoByChapterId = payload;
            state.status.getNovelInfoByChapterIdStatus = "success";
         })
         
         .addCase(getEditDataByChapterId.rejected, (state, action) => {
            console.log(action.error);
            state.novelInfoByChapterId = {};
            state.status.getNovelInfoByChapterIdStatus = "failed"
         })
   }
});

export const getBookMarks = (state) => state.user.bookMarks;
export const getBookMarkStatus = (state) => state.user.status.getBookMarkedStatus;

export const getAuthorInfoAndBooks = (state) => state.user.authorInfoAndBooks;
export const getAuthorInfoAndBooksStatus = (state) => state.user.status.getAuthorInfoAndBooksStatus;

export const getUserInfoAndBooks = (state) => state.user.userInfo;
export const getUserInfoAndBooksStatus = (state) => state.user.status.userInfoStatus;

export const user = (state) => state.user.user;

export const getNovelInfoByChapterId = (state) => state.user.novelInfoByChapterId;

export default userSlice.reducer;

export const getUpdateProfileStatus = (state) => state.user.status.updateProfileStatus;
export const selectPaymentMethods = (state) => state.user.paymentMethods;

export const { removeBookMark, setUser, cleanUserInfo, resetUpdateProfileStatus } = userSlice.actions;