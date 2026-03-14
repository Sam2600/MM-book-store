import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-tailwind/react";
import { useInView } from "react-intersection-observer";
import { getNovelsByCategory, cleanCategoryNovels, getNovelsByChapter, hasMore, page, getNovelsByChapterStatus } from "../states/features/novel/novelSlice";
import { Loader } from "../components/Loader";
import { Profile } from "../components/Profile";
import { ROUTES } from "../consts/Consts";
import { scrollToTop } from "../functions/helpers"; 
import { Folder } from "iconoir-react";

export const CategoryPage = () => {

   const dispatch = useDispatch();

   const { category } = useParams();
   
   const page_ = useSelector(page);

   const hasMore_ = useSelector(hasMore);
   const status = useSelector(getNovelsByChapterStatus);
   const categoryNovels = useSelector(getNovelsByChapter);
   
   const { ref, inView } = useInView({
      threshold: 0,
      rootMargin: '200px', 
   });

   // Only reset and scroll to top when the category ID changes
   useEffect(() => {
      dispatch(cleanCategoryNovels());
      dispatch(getNovelsByCategory({ category, page: 1 }));
      scrollToTop();
   }, [category, dispatch]);

   // Fetch more logic
   useEffect(() => {
      // GATE 1: Don't do anything if we are currently fetching
      if (status === "pending") return;

      // GATE 2: Only fetch page 2+ if we actually have page 1 data already
      // This prevents the "empty list" from triggering the sentinel on load
      const hasData = categoryNovels.length > 0;

      if (inView && hasMore_ && hasData) {
         // Only increment if we have a valid page number
         const nextPage = page_ > 1 ? page_ : 2; 
         dispatch(getNovelsByCategory({ category, page: nextPage }));
      }
   }, [inView, hasMore_, status, page_, category, categoryNovels.length]);

   return (
      <div className="min-h-screen bg-gray-50/30">
         {/* Hero Header Section */}
         <div className="bg-white border-b border-gray-100 mb-10">
            <div className="w-11/12 mx-auto py-12 md:py-16">
               <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                     <Folder className="h-5 w-5" />
                  </div>
                  <Typography className="text-sm font-bold uppercase tracking-widest text-blue-500">
                     Browse by Genre
                  </Typography>
               </div>
               <Typography variant="h1" className="text-4xl md:text-5xl font-black text-slate-900 capitalize">
                  {localStorage.getItem("CATEGORY_NAME")}
               </Typography>
               <Typography className="mt-4 text-slate-500 max-w-2xl font-medium">
                  Discover the best {localStorage.getItem("CATEGORY_NAME")?.toLowerCase()} stories, from rising stars to completed masterpieces.
               </Typography>
            </div>
         </div>

         {/* Main Grid Section */}
         <div className="w-11/12 mx-auto pb-20">
            {categoryNovels.length > 0 ? (
               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-10">
                  {categoryNovels.map((novel, idx) => (
                     <NavLink 
                        key={`${novel.id}-${idx}`} 
                        to={ROUTES.NOVEL_BY_ID.replace(":id", novel?.id)}
                        className="group"
                     >
                        <div className="transition-transform duration-300 group-hover:-translate-y-2">
                           <Profile novel={novel} />
                        </div>
                     </NavLink>
                  ))}
               </div>
            ) : !hasMore_ && (
               <div className="text-center py-20">
                  <Typography variant="h5" color="blue-gray" className="mb-2">No novels found</Typography>
                  <Typography color="gray">Try checking another category or come back later.</Typography>
               </div>
            )}

            {/* Infinite Scroll Loader */}
            <div ref={ref} className="h-40 flex flex-col items-center justify-center mt-12 border-t border-gray-100">
               {hasMore_ ? (
                  <div className="flex flex-col items-center gap-4">
                     <Loader />
                     <Typography className="text-xs font-bold text-slate-400 animate-pulse uppercase tracking-tighter">
                        Fetching more stories...
                     </Typography>
                  </div>
               ) : categoryNovels.length > 0 && (
                  <div className="text-center">
                     <div className="h-1 w-12 bg-slate-200 mx-auto mb-4 rounded-full" />
                     <Typography className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                        End of the list
                     </Typography>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};