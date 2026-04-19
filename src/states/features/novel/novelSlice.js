import {api} from "../../../axios/axios";
import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { ROUTES } from "../../../consts/Consts";
import { getLoginUserId } from "../../../functions/helpers";

const initialState = {
   novels: {},
   categories: [],
   searchResults: [],
   status: {
      getNovels: "idle",
      getNovelById: "idle",
      getChapterById: "idle",
      postNovels: "idle",
      getNovelsByAuthor: "idle",
      getNovelsByCategory: "idle",
      searchNovels: "idle",
      getEndedNovels: "idle",
      browse: "idle",
      getPopularWeekNovels: "idle",
      getPopularMonthNovels: "idle",
   },
   novelByAuthor: [],
   novelById: {},
   chapterById: {},

   page: 1,
   hasMore: true,
   categoryNovels: [],

   endedNovels: [],
   endedPage: 1,
   endedHasMore: true,

   browseNovels: [],
   browsePage: 1,
   browseHasMore: true,

   popularWeekNovels: [],
   popularWeekPage: 1,
   popularWeekHasMore: true,

   popularMonthNovels: [],
   popularMonthPage: 1,
   popularMonthHasMore: true,
}

export const getNovels = createAsyncThunk("novels", async () => {

   const response = await api.get(ROUTES.NOVELS);
   return response.data;
});

export const getNovelById = createAsyncThunk("novels/:id", async (id) => {

   const user_id = getLoginUserId();
   const route = ROUTES.NOVEL_BY_ID.replace(":id", id);
   const response = await api.get(route, {
      params: {
         user_id: user_id || undefined
      }
   });
   return response.data;
});

export const getChapterByNovel = createAsyncThunk("novels/novelId/chapters/chapterId", async ({ novel, chapter, volume }) => {
   const user_id = getLoginUserId();
   const response = await api.get(ROUTES.CHAPTER_BY_ID.replace(":novel", novel).replace(":volume", volume).replace(":chapter", chapter), {
      params: {
         user_id: user_id || undefined // Using undefined usually prevents the key from being sent
      }
   });
   return response.data;
});

export const getNovelsByAuthors = createAsyncThunk("novelsByAuthors", async () => {

   const response = await api.get(ROUTES.NOVEL_BY_AUTHORS);
   return response.data;
});

export const getNovelsByCategory = createAsyncThunk("novels/getNovelsByCategory", async ({ category, page }) => {
   const response = await api.get(`/categories/${category}/novels?page=${page}`);
   return response.data; // Expecting { data: [...], current_page: 1, last_page: 10 }
});

export const searchNovels = createAsyncThunk("novels/search", async (q) => {
   const response = await api.get(`/novels/search?q=${encodeURIComponent(q)}`);
   return response.data;
});

export const fetchEndedNovels = createAsyncThunk("novels/ended", async (page) => {
   const response = await api.get(`${ROUTES.NOVELS_ENDED}?page=${page}`);
   return response.data;
});

export const fetchBrowseNovels = createAsyncThunk("novels/browse", async ({ category, status, sort, page }) => {
   const params = new URLSearchParams({ page });
   if (category) params.append('category', category);
   if (status)   params.append('status', status);
   if (sort)     params.append('sort', sort);
   const response = await api.get(`/novels/browse?${params}`);
   return response.data;
});

export const fetchPopularWeekNovels = createAsyncThunk("novels/popular/week", async (page) => {
   const response = await api.get(`/novels/popular/week?page=${page}`);
   return response.data;
});

export const fetchPopularMonthNovels = createAsyncThunk("novels/popular/month", async (page) => {
   const response = await api.get(`/novels/popular/month?page=${page}`);
   return response.data;
});

export const novelSlice = createSlice({

   name: 'novel',

   initialState,

   reducers: {

      emptyNovelByIdBookmark: (state) => {
         state.novelById.isAlreadyBooked = false;
      },

      attachNovelByIdBookmark: (state) => {
         state.novelById.isAlreadyBooked = true;
      },

      /**
       * @description clean up function to clean stored variables, when page is changed
       * @param {object} state 
       */
      cleanNovels: (state) => {
         state.novels = {}
         state.status =  {
            getNovels: "idle",
            getNovelById: "idle",
            getChapterById: "idle",
            postNovels: "idle",
            getNovelsByAuthor: "idle",
         }
         state.novelByAuthor = []
         state.novelById = {}
         state.chapterById = {}
      },
      
      cleanCategoryNovels: (state) => {
         state.categoryNovels = [];
         state.page = 1;
         state.hasMore = true;
      },

      cleanEndedNovels: (state) => {
         state.endedNovels = [];
         state.endedPage = 1;
         state.endedHasMore = true;
      },

      cleanBrowseNovels: (state) => {
         state.browseNovels = [];
         state.browsePage = 1;
         state.browseHasMore = true;
         state.status.browse = "idle";
      },

      cleanPopularWeekNovels: (state) => {
         state.popularWeekNovels = [];
         state.popularWeekPage = 1;
         state.popularWeekHasMore = true;
         state.status.getPopularWeekNovels = "idle";
      },

      cleanPopularMonthNovels: (state) => {
         state.popularMonthNovels = [];
         state.popularMonthPage = 1;
         state.popularMonthHasMore = true;
         state.status.getPopularMonthNovels = "idle";
      },

      clearSearchResults: (state) => {
         state.searchResults = [];
         state.status.searchNovels = "idle";
      },
   },
   extraReducers: (builer) => {
      builer
         .addCase(getNovels.pending, (state) => {

            state.status.getNovels = "pending";
         })
   
         .addCase(getNovels.fulfilled, (state, action) => {

            state.novels = action.payload?.data;
            state.categories = action.payload?.data?.categories;
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
            state.novelById = action.payload?.data;

            state.novelById.isAlreadyBooked = !!(action.payload?.data?.bookmarks?.length);
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
            state.chapterById = action.payload?.data;
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
            state.novelByAuthor = action.payload?.data;
            state.status.getNovelsByAuthor = "success";
         })
   
         .addCase(getNovelsByAuthors.rejected, (state, action) => {
            
            console.log(action.error);
            state.status.getNovelsByAuthor = "failed";
         })
      
         .addCase(getNovelsByCategory.pending, (state) => {
            state.status.getNovelsByCategory = "pending";
         })

         .addCase(getNovelsByCategory.fulfilled, (state, action) => {
            state.status.getNovelsByCategory = "success";
            
            // Standard Laravel success wrapper: { data: { current_page, data: [], ... } }
            const paginator = action.payload.data; 

            if (paginator && Array.isArray(paginator.data)) {
               // PREVENT DUPLICATES: Only add if the IDs aren't already there
               const newNovels = paginator.data.filter(
                     (newNovel) => !state.categoryNovels.find((old) => old.id === newNovel.id)
               );

               state.categoryNovels = [...state.categoryNovels, ...newNovels];
               
               // Update to the NEXT page
               state.page = paginator.current_page + 1;
               
               // Update hasMore
               state.hasMore = paginator.current_page < paginator.last_page;
            }
         })

         .addCase(getNovelsByCategory.rejected, (state, action) => {
            console.error("Fetch Error:", action.error);
            state.status.getNovelsByCategory = "failed";
         })

         .addCase(searchNovels.pending, (state) => {
            state.status.searchNovels = "pending";
         })

         .addCase(searchNovels.fulfilled, (state, action) => {
            state.searchResults = action.payload?.data ?? [];
            state.status.searchNovels = "success";
         })

         .addCase(searchNovels.rejected, (state) => {
            state.searchResults = [];
            state.status.searchNovels = "failed";
         })

         .addCase(fetchEndedNovels.pending, (state) => {
            state.status.getEndedNovels = "pending";
         })

         .addCase(fetchEndedNovels.fulfilled, (state, action) => {
            state.status.getEndedNovels = "success";
            const paginator = action.payload.data;
            if (paginator && Array.isArray(paginator.data)) {
               const newNovels = paginator.data.filter(
                  (n) => !state.endedNovels.find((old) => old.id === n.id)
               );
               state.endedNovels = [...state.endedNovels, ...newNovels];
               state.endedPage = paginator.current_page + 1;
               state.endedHasMore = paginator.current_page < paginator.last_page;
            }
         })

         .addCase(fetchEndedNovels.rejected, (state) => {
            state.status.getEndedNovels = "failed";
         })

         .addCase(fetchBrowseNovels.pending, (state) => {
            state.status.browse = "pending";
         })

         .addCase(fetchBrowseNovels.fulfilled, (state, action) => {
            state.status.browse = "success";
            const paginator = action.payload.data;
            if (paginator && Array.isArray(paginator.data)) {
               const newNovels = paginator.data.filter(
                  (n) => !state.browseNovels.find((old) => old.id === n.id)
               );
               state.browseNovels = [...state.browseNovels, ...newNovels];
               state.browsePage = paginator.current_page + 1;
               state.browseHasMore = paginator.current_page < paginator.last_page;
            }
         })

         .addCase(fetchBrowseNovels.rejected, (state) => {
            state.status.browse = "failed";
         })

         .addCase(fetchPopularWeekNovels.pending, (state) => {
            state.status.getPopularWeekNovels = "pending";
         })
         .addCase(fetchPopularWeekNovels.fulfilled, (state, action) => {
            state.status.getPopularWeekNovels = "success";
            const paginator = action.payload.data;
            if (paginator && Array.isArray(paginator.data)) {
               const newNovels = paginator.data.filter(
                  (n) => !state.popularWeekNovels.find((old) => old.id === n.id)
               );
               state.popularWeekNovels = [...state.popularWeekNovels, ...newNovels];
               state.popularWeekPage = paginator.current_page + 1;
               state.popularWeekHasMore = paginator.current_page < paginator.last_page;
            }
         })
         .addCase(fetchPopularWeekNovels.rejected, (state) => {
            state.status.getPopularWeekNovels = "failed";
         })

         .addCase(fetchPopularMonthNovels.pending, (state) => {
            state.status.getPopularMonthNovels = "pending";
         })
         .addCase(fetchPopularMonthNovels.fulfilled, (state, action) => {
            state.status.getPopularMonthNovels = "success";
            const paginator = action.payload.data;
            if (paginator && Array.isArray(paginator.data)) {
               const newNovels = paginator.data.filter(
                  (n) => !state.popularMonthNovels.find((old) => old.id === n.id)
               );
               state.popularMonthNovels = [...state.popularMonthNovels, ...newNovels];
               state.popularMonthPage = paginator.current_page + 1;
               state.popularMonthHasMore = paginator.current_page < paginator.last_page;
            }
         })
         .addCase(fetchPopularMonthNovels.rejected, (state) => {
            state.status.getPopularMonthNovels = "failed";
         });
      },
})

export const getFetchNovels = (state) => state.novel.novels;
export const getEndedNovels = (state) => state.novel.endedNovels;
export const getEndedPage = (state) => state.novel.endedPage;
export const getEndedHasMore = (state) => state.novel.endedHasMore;
export const getEndedNovelsStatus = (state) => state.novel.status.getEndedNovels;

export const getNovelByID = (state) => state.novel.novelById;

export const getChapterByID = (state) => state.novel.chapterById;

export const novelsByAuthor = (state) => state.novel.novelByAuthor;

export const getAllCategories = (state) => state.novel.categories;

export const getAllMappedCategories = createSelector(
   (state) => state.novel.categories,
   (categories) => categories?.map(cate => ({ value: cate.id, label: cate.name }))
);

export const page = (state) => state.novel.page;

export const hasMore = (state) => state.novel.hasMore;

export const getNovelsByChapter = (state) => state.novel.categoryNovels;

export const getAllNovelsStatus = (state) => state.novel.status.getNovels;

export const getNovelByIdStatus = (state) => state.novel.status.getNovelById;

export const getNovelsByAuthorStatus = (state) => state.novel.status.getNovelsByAuthor;

export const getChapterByIdStatus = (state) => state.novel.status.getChapterById;

export const getNovelsByChapterStatus = (state) => state.novel.status.getNovelsByCategory;

export const getSearchResults = (state) => state.novel.searchResults;

export const getSearchStatus = (state) => state.novel.status.searchNovels;

export const getBrowseNovels = (state) => state.novel.browseNovels;
export const getBrowsePage = (state) => state.novel.browsePage;
export const getBrowseHasMore = (state) => state.novel.browseHasMore;
export const getBrowseStatus = (state) => state.novel.status.browse;

export const getPopularWeekNovels = (state) => state.novel.popularWeekNovels;
export const getPopularWeekPage = (state) => state.novel.popularWeekPage;
export const getPopularWeekHasMore = (state) => state.novel.popularWeekHasMore;
export const getPopularWeekStatus = (state) => state.novel.status.getPopularWeekNovels;

export const getPopularMonthNovels = (state) => state.novel.popularMonthNovels;
export const getPopularMonthPage = (state) => state.novel.popularMonthPage;
export const getPopularMonthHasMore = (state) => state.novel.popularMonthHasMore;
export const getPopularMonthStatus = (state) => state.novel.status.getPopularMonthNovels;

export default novelSlice.reducer;

export const { emptyNovelByIdBookmark, attachNovelByIdBookmark, cleanNovels, cleanCategoryNovels, cleanEndedNovels, clearSearchResults, cleanBrowseNovels, cleanPopularWeekNovels, cleanPopularMonthNovels } = novelSlice.actions;