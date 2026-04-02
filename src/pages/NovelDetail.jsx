import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { 
   attachNovelByIdBookmark, 
   cleanNovels, 
   emptyNovelByIdBookmark, 
   getNovelById, 
   getNovelByID, 
   getNovelByIdStatus 
} from '../states/features/novel/novelSlice';
import { 
   Accordion, 
   Chip, 
   Typography, 
   Rating, 
   Button, 
   Card,
   CardBody 
} from '@material-tailwind/react';
import { 
   NavArrowDown, 
   Bookmark, 
   Eye, 
   User, 
   ThumbsUp, 
   BookStack, 
   Star,
   Trash,
   LogIn
} from 'iconoir-react';
import { Loader } from '../components/Loader';
import { scrollToTop } from '../functions/helpers';
import { api } from '../axios/axios';
import { ROUTES } from '../consts/Consts';
import { renderStars } from '../components/commons/Star';

export const NovelDetail = () => {

   const { id } = useParams();

   const dispatch = useDispatch();

   const novelById = useSelector(getNovelByID);
   const status = useSelector(getNovelByIdStatus);

   const navigate = useNavigate();

   const [isLoading, setIsLoading] = useState(false);

   const [bookMarkText, setBookMarkText] = useState("Add to library");

   // New state for rating
   const [userRating, setUserRating] = useState(0);
   const [novelRating, setNovelRating] = useState(0);
   const [novelRatingCount, setNovelRatingCount] = useState(0);
   const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

   const descriptionLimit = 300;
   const [isExpanded, setIsExpanded] = useState(false);

   useEffect(() => {

      scrollToTop();
      dispatch(getNovelById(id));

      return () => {
         dispatch(cleanNovels());
      }
   }, [id, dispatch]);

   // Sync local state when Redux novelById changes
   useEffect(() => {
      if (novelById) {
         setNovelRating(Math.floor(Number.parseFloat(novelById?.average_rating)) || 0);
         setNovelRatingCount(novelById?.user_rating_count || 0);
      }
   }, [novelById]);

   const handleBookmark = async () => {

      setIsLoading(true);

      if (localStorage.getItem("token")) {

         try {

            let response;

            if (novelById?.isAlreadyBooked) {

               response = await api.patch(`/novels/bookmarks/${id}`);

               if (response.data.status == "OK") {
                  console.log("Bookmark removed successfully");
                  dispatch(emptyNovelByIdBookmark());
                  setBookMarkText(prev => "Add to library");
               }

            } else {

               response = await api.post("/bookmarks", { novel_id: id });

               if (response.data.status == "OK") {
                  console.log("Bookmark added successfully");
                  dispatch(attachNovelByIdBookmark());
                  setBookMarkText(prev => "Remove from library");
               }
            }
         } catch (error) {
            alert("Internal Server Error. Please try again later.");
            console.error("Error bookmarking novel:", error);
         }

         setIsLoading(false);

      } else {
         navigate(ROUTES.SIGN_IN);
      }
   }

   const handleRatingSubmit = async () => {
      
      if (userRating === 0) return;

      setIsLoading(true);

      try {

         let response;
         
         response = await api.post(`/novels/${id}/rate`, { rating: userRating });

         if (response.data.status == "OK") {
            console.log("Novel is rated successfully");
         }

         // FIX: Ensure we parse the values as Numbers immediately
         const newAverage = Math.floor(Number(response.data.data.average));
         const newTotal = Number(response.data.data.total);

         // Update local states
         setNovelRating(newAverage);
         setNovelRatingCount(newTotal);

         // Reset the form and close modal
         setUserRating(0);
         setIsRatingModalOpen(false);

      } catch (error) {
         // Use a custom modal instead of alert
         console.error("Error submitting rating:", error);
      }
      setIsLoading(false);
   };

   if (status === "pending") return <Loader />;

   if (status === "failed") return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center px-4">
         <BookStack className="w-16 h-16 text-slate-200" />
         <Typography type="h3" className="text-2xl font-black text-slate-700">Novel Not Found</Typography>
         <Typography className="text-slate-400 max-w-sm">
            This novel doesn't exist or may have been removed.
         </Typography>
         <NavLink
            to={ROUTES.HOME}
            className="mt-2 px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-2xl hover:bg-blue-600 transition-colors"
         >
            Back to Home
         </NavLink>
      </div>
   );

   return (
      <div className="min-h-screen bg-gray-50/50 pb-20">
         {/* Hero Section */}
         <div className="relative w-full bg-white border-b border-gray-200 pt-10 pb-16 mb-10 shadow-sm">
            <div className="container mx-auto px-4 lg:px-8">
               <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start">
                  
                  {/* Book Cover */}
                  <motion.div 
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="w-64 h-96 flex-shrink-0 shadow-2xl rounded-xl overflow-hidden border-4 border-white"
                  >
                     <img 
                        src={novelById?.cover_image} 
                        alt={novelById?.title}
                        className="w-full h-full object-cover"
                     />
                  </motion.div>

                  {/* Content Info */}
                  <div className="flex-1 text-center lg:text-left">
                     <Typography type="h2" className="text-3xl lg:text-4xl font-black text-slate-900 mb-4 font-serif">
                        {novelById?.title}
                     </Typography>

                     {/* Stats Row */}
                     <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-6">
                        <div className="flex items-center gap-2 text-slate-600 bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
                           <Eye className="w-4 h-4 text-blue-500" />
                           <span className="text-sm font-bold">{novelById?.view_count} views</span>
                        </div>
                        <NavLink to={ROUTES.TO_AUTHOR.replace(":id", novelById?.translator?.id)}>
                           <div className="flex items-center gap-2 text-slate-600 bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-sm hover:border-blue-400 transition-colors">
                              <User className="w-4 h-4 text-purple-500" />
                              <span className="text-sm font-bold">{novelById?.translator?.name}</span>
                           </div>
                        </NavLink>
                        <div className="flex items-center gap-2">
                           {renderStars(novelRating)}
                           <span className="text-sm font-bold text-slate-500">{novelRating} / 5 ({novelRatingCount} ratings)</span>
                        </div>
                     </div>

                     {/* Description */}
                     <Card className="bg-slate-50 shadow-none border border-slate-100 mb-8">
                        <CardBody className="p-5">
                           <Typography className="text-slate-700 leading-relaxed text-md font-serif italic text-justify">
                              {novelById?.description?.length > descriptionLimit && !isExpanded
                                 ? `${novelById.description.substring(0, descriptionLimit)}...`
                                 : novelById?.description}
                              {novelById?.description?.length > descriptionLimit && (
                                 <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="ml-2 text-blue-600 font-black hover:underline underline-offset-4"
                                 >
                                    {isExpanded ? "Show Less" : "Read Full Story"}
                                 </button>
                              )}
                           </Typography>
                        </CardBody>
                     </Card>

                     {/* Actions */}
                     <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-6">
                        <Button
                           size="lg"
                           disabled={isLoading}
                           onClick={handleBookmark}
                           className={`flex items-center gap-3 rounded-2xl px-8 py-3.5 font-poppins text-[11px] font-black uppercase tracking-widest transition-all duration-300 shadow-none active:scale-95
                              ${!localStorage.getItem("token") 
                              ? "bg-amber-200 text-black hover:bg-amber-300" // Warning/Login state
                              : novelById?.isAlreadyBooked 
                                 ? "bg-red-50 text-red-500 hover:bg-red-100"   // "Remove" state
                                 : "bg-slate-900 text-white hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-500/20" // Primary "Add" state
                              }`}
                        >
                           {localStorage.getItem("token") ? (
                              novelById?.isAlreadyBooked ? (
                              <>
                                 <Trash className="w-4 h-4 stroke-[2.5]" />
                                 Remove from library
                              </>
                              ) : (
                              <>
                                 <Bookmark className="w-4 h-4 stroke-[2.5]" />
                                 {bookMarkText}
                              </>
                              )
                           ) : (
                              <>
                              <LogIn className="w-4 h-4 stroke-[2.5]" />
                              Login to bookmark
                              </>
                           )}
                        </Button>

                        {localStorage.getItem("token") && (
                           <Button
                              type="button"
                              size="lg"
                              onClick={() => setIsRatingModalOpen(true)}
                              className="flex items-center gap-3 rounded-2xl px-8 py-3.5 border border-slate-200 bg-white text-slate-700 font-poppins text-[11px] font-black uppercase tracking-widest transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-95"
                           >
                              <Star className="w-4 h-4 text-amber-500 stroke-[2.5]" />
                              Rate Novel
                           </Button>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Content Sections */}
         <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
            {/* Category Chips */}
            <div className="flex flex-wrap gap-2 mb-10 justify-center">
               {novelById?.categories?.map((cat, i) => (
                  <Chip 
                     key={i}
                     className="bg-white border border-slate-200 text-slate-700 font-bold capitalize rounded-lg px-4" 
                  >
                     <Chip.Label>{cat?.name}</Chip.Label>
                  </Chip>
               ))}
            </div>

            {/* Volume List */}
            <div className="space-y-6">
               <div className="flex items-center gap-3 mb-4">
                  <BookStack className="w-6 h-6 text-slate-900" />
                  <Typography type="h4" className="text-xl font-bold text-slate-900 uppercase tracking-widest">
                     Chapter List
                  </Typography>
               </div>

               {novelById?.volumes?.map((vol, i) => (
                  <Accordion key={i} className="mb-4 border-none rounded-2xl bg-white shadow-sm overflow-hidden">
                     <Accordion.Item value={vol?.volume_number || i} className="border-none">
                        <Accordion.Trigger className="px-6 py-5 bg-white hover:bg-slate-50 transition-colors text-slate-800 font-black text-lg">
                           {vol?.volume_title ? vol?.volume_title : `Volume ${vol?.volume_number}`}
                           <NavArrowDown className="h-5 w-5 group-data-[open=true]:rotate-180 transition-transform" />
                        </Accordion.Trigger>
                        <Accordion.Content className="px-6 pb-6 pt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                           {vol?.chapters?.map((chapt, j) => (
                              <NavLink 
                                 to={ROUTES.CHAPTER_BY_ID.replace(":novel", id).replace(":volume", vol?.volume_number).replace(":chapter", chapt?.chapter_number)} 
                                 key={j}
                                 className="flex items-center gap-3 p-4 bg-slate-50/50 border border-slate-100 rounded-xl hover:bg-blue-50 hover:border-blue-200 group transition-all"
                              >
                                 <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-bold text-slate-400 group-hover:text-blue-500 shadow-sm">
                                    {chapt?.chapter_number}
                                 </div>
                                 <Typography className="text-slate-700 font-semibold truncate group-hover:text-blue-700">
                                    {chapt?.title}
                                 </Typography>
                              </NavLink>
                           ))}
                        </Accordion.Content>
                     </Accordion.Item>
                  </Accordion>
               ))}
            </div>
         </div>

         {/* Rating Modal */}
         <AnimatePresence>
            {isRatingModalOpen && (
               <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed inset-0 flex items-center justify-center z-50 bg-slate-900/40 backdrop-blur-sm"
               >
                  <motion.div 
                     initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                     className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full mx-4 text-center"
                  >
                     <Typography type="h5" className="font-black text-slate-800 mb-2">
                        Enjoying the story?
                     </Typography>
                     <Typography className="text-slate-500 mb-8">
                        Your rating helps other readers discover this novel.
                     </Typography>
                     <div className="flex justify-center mb-8 scale-150">
                        <Rating
                           value={userRating}
                           onValueChange={(val) => setUserRating(Number(val))}
                        />
                     </div>
                     <div className="flex gap-3">
                        <Button 
                           type="button" fullWidth 
                           onClick={() => setIsRatingModalOpen(false)}
                           className="rounded-full text-slate-500"
                        >
                           Cancel
                        </Button>
                        <Button 
                           fullWidth 
                           onClick={handleRatingSubmit}
                           className="bg-blue-600 rounded-full shadow-lg shadow-blue-100"
                           disabled={userRating === 0 || isLoading}
                        >
                           Submit
                        </Button>
                     </div>
                  </motion.div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};