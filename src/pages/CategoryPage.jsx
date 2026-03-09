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
      <div className="w-11/12 mx-auto py-10">
         {categoryNovels.length > 0 && (
            <Typography variant="h3" className="mb-8 capitalize">
               Category: {categoryNovels[0].categories?.[0]?.name || category}
            </Typography>
         )}

         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {categoryNovels.map((novel, idx) => (
               <NavLink key={`${novel.id}-${idx}`} to={ROUTES.NOVEL_BY_ID.replace(":id", novel?.id)}>
                  <Profile novel={novel} />
               </NavLink>
            ))}
         </div>

         <div ref={ref} className="h-20 flex items-center justify-center mt-10">
            {hasMore_ && <Loader />}
            {!hasMore_ && categoryNovels.length > 0 && (
               <Typography color="gray">No more novels to show.</Typography>
            )}
         </div>
      </div>
   );
};