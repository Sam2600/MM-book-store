import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-tailwind/react";
import { useInView } from "react-intersection-observer";
import { getNovelsByCategory, cleanCategoryNovels, getNovelsByChapter, hasMore, page } from "../states/features/novel/novelSlice";
import { Loader } from "../components/Loader";
import { Profile } from "../components/Profile";
import { ROUTES } from "../consts/Consts";

export const CategoryPage = () => {
   
   const dispatch = useDispatch();

   const { category } = useParams();
   
   const page_ = useSelector(page);
   
   const hasMore_ = useSelector(hasMore);

   const categoryNovels = useSelector(getNovelsByChapter);
   
   // hook to detect bottom of page
   const { ref, inView } = useInView();

   useEffect(() => {
      // Reset novels when category changes
      dispatch(cleanCategoryNovels());
      dispatch(getNovelsByCategory({ category, page: 1 }));
   }, [category]);

   useEffect(() => {
      // Fetch more when bottom is in view and not currently loading
      if (inView && hasMore_ && status !== "pending") {
         dispatch(getNovelsByCategory({ category, page_ }));
      }
   }, [inView]);

   return (
      <div className="w-11/12 mx-auto py-10">
         {categoryNovels.length &&
            <Typography variant="h3" className="mb-8 capitalize">
               Category: {categoryNovels.length && categoryNovels[0].categories[0].name}
            </Typography>
            
         }

         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {categoryNovels.map((novel) => (
               <NavLink key={novel} to={ROUTES.NOVEL_BY_ID.replace(":id", novel?.id)}>
                  <Profile key={novel} novel={novel} />
               </NavLink>
            ))}
         </div>

         {/* Trigger element for infinite scroll */}
         <div ref={ref} className="h-20 flex items-center justify-center mt-10">
         {hasMore_ && <Loader />}
         {!hasMore_ && (
            <Typography color="gray">No more novels to show.</Typography>
         )}
         </div>
      </div>
   );
};
