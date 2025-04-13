import {api} from "../../../axios/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
   novels: {},
   categories: [],
   all_novel: [],
   filtered_novels: [],
   status: {
      getNovels: "idle",
      getNovelById: "idle",
      getChapterById: "idle",
      postNovels: "idle",
      getNovelsByAuthor: "idle",
   },
   novelByAuthor: [],
   novelById: {},
   chapterById: {}
}

export const getNovels = createAsyncThunk("novels", async () => {

   const response = await api.get("/novels");
   return response.data;
});

export const getNovelById = createAsyncThunk("novels/:id", async (id) => {

   const response = await api.get(`/novels/${id}`);
   return response.data;
});

export const getChapterByNovel = createAsyncThunk("novels/novelId/volumes/volumeId/chapters/chapterId", async ({ novel, volume, chapter }) => {
   
   const response = await api.get(`/novels/${novel}/volumes/${volume}/chapters/${chapter}`);
   return response.data;
});

export const getNovelsByAuthors = createAsyncThunk("novelsByAuthors", async () => {

   const response = await api.get(`/novelsByAuthors`);
   return response.data;
});

export const novelSlice = createSlice({

   name: 'novel',

   initialState,

   reducers: {

      filterNovel: (state, action) => {

         if (!action.payload) {
            state.filtered_novels = [];
            return;
         }
   
         const filter = state.all_novel.filter((novel) =>
            novel.title.toLowerCase().includes(action.payload.toLowerCase())
         );
   
         state.filtered_novels = filter;
      },
   },
   extraReducers: (builer) => {
      builer
         .addCase(getNovels.pending, (state) => {

            state.status.getNovels = "pending";
         })
   
         .addCase(getNovels.fulfilled, (state, action) => {

            state.novels = action.payload;
            state.categories = action.payload.categories;
            state.all_novel = action.payload.all_novel;
            state.status.getNovels = "success";
         })
   
         .addCase(getNovels.rejected, (state, action) => {
            
            console.log(action.error);
            state.status.getNovels = "failed";
         })
      
         .addCase(getNovelById.pending, (state) => {

            state.status.getNovelById = "pending";
         })
   
         .addCase(getNovelById.fulfilled, (state, action) => {
            state.novelById = action.payload;
            state.status.getNovelById = "success";
         })
   
         .addCase(getNovelById.rejected, (state, action) => {
            
            console.log(action.error);
            state.status.getNovelById = "failed";
         })
      
         .addCase(getChapterByNovel.pending, (state) => {

            state.status.getChapterById = "pending";
         })
   
         .addCase(getChapterByNovel.fulfilled, (state, action) => {
            state.chapterById = action.payload;
            state.status.getChapterById = "success";
         })
   
         .addCase(getChapterByNovel.rejected, (state, action) => {
            
            console.log(action.error);
            state.status.getChapterById = "failed";
         })

         .addCase(getNovelsByAuthors.pending, (state) => {

            state.status.getNovelsByAuthor = "pending";
         })
   
         .addCase(getNovelsByAuthors.fulfilled, (state, action) => {
            state.novelByAuthor = action.payload;
            state.status.getNovelsByAuthor = "success";
         })
   
         .addCase(getNovelsByAuthors.rejected, (state, action) => {
            
            console.log(action.error);
            state.status.getNovelsByAuthor = "failed";
         })
   },
})

export const getFetchNovels = (state) => state.novel.novels;

export const getNovelByID = (state) => state.novel.novelById;

export const getChapterByID = (state) => state.novel.chapterById;

export const novelsByAuthor = (state) => state.novel.novelByAuthor;

export const getFilteredNovels = (state) => state.novel.filtered_novels;

export const getAllNovels = (state) => state.novel.all_novel;

export const getAllCategories = (state) => state.novel.categories;

export const getAllNovelsStatus = (state) => state.novel.status.getNovels;

export const getNovelByIdStatus = (state) => state.novel.status.getNovelById;

export const getNovelsByAuthorStatus = (state) => state.novel.status.getNovelsByAuthor;

export const getChapterByIdStatus = (state) => state.novel.status.getChapterById;

export default novelSlice.reducer;

export const { filterNovel } = novelSlice.actions;