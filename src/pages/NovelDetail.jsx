import { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import "@splidejs/react-splide/css";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { attachNovelByIdBookmark, emptyNovelByIdBookmark, getNovelById, getNovelByID, getNovelByIdStatus } from '../states/features/novel/novelSlice';
import { Accordion, Chip, Typography, Rating, Avatar } from '@material-tailwind/react';
import { NavArrowDown } from 'iconoir-react';
import { Loader } from '../components/Loader';
import { scrollToTop } from '../functions/helpers';
import { api } from '../axios/axios';
import { ROUTES } from '../consts/Consts';

export const NovelDetail = () => {

   const { id } = useParams();

   const dispatch = useDispatch();

   const novelById = useSelector(getNovelByID);
   const status = useSelector(getNovelByIdStatus);

   const navigate = useNavigate();

   const [isLoading, setIsLoading] = useState(false);

   const [bookMarkText, setBookMarkText] = useState("Add to library");

   useEffect(() => {

      scrollToTop();
      dispatch(getNovelById(id));
   }, [])

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
                  setBookMarkText(prev  => "Add to library");
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
         navigate("/account");
      }
   }

   const content = status == "pending" ? (
      <Loader/>
   ) : (
      <div className="flex flex-col w-11/12 mx-auto h-fit gap-7 my-5">
         <div className="w-full flex flex-row items-start">
            <motion.div
               className="w-full sm:w-8/12 md:w-6/12 lg:w-4/12"
               initial={{ opacity: 0, x: "-100vw" }}
               animate={{ opacity: 1, x: 0, transition: { duration: 1.2 } }}
               exit={{ opacity: 0 }}
            >
               <Avatar
                  className="w-80 h-72 object-contain"
                  shape="square"
                  src={novelById?.cover_image}
                  alt={novelById?.title}
               />
            </motion.div>

            <motion.div
               className="flex flex-col justify-start sm:w-10/12 md:w-6/12 lg:w-8/12 gap-7"
               initial={{ opacity: 0, x: "100vw" }}
               animate={{ opacity: 1, x: 0, transition: { duration: 1.2 } }}
               exit={{ opacity: 0 }}
            >
               <Typography variant="h1" className="font-semibold text-xl font-serif">
                  {novelById?.title}
               </Typography>
               <div>
                  <p className="font-serif text-md leading-6 text-justify">{novelById?.description}</p>
               </div>
               {novelById?.categories?.length > 0 && 
                  <div className="flex flex-row items-center gap-2">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                        <path fillRule="evenodd" d="M4.5 2A2.5 2.5 0 0 0 2 4.5v3.879a2.5 2.5 0 0 0 .732 1.767l7.5 7.5a2.5 2.5 0 0 0 3.536 0l3.878-3.878a2.5 2.5 0 0 0 0-3.536l-7.5-7.5A2.5 2.5 0 0 0 8.38 2H4.5ZM5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
                     </svg>
                     {
                        novelById?.categories?.map((cat, i) => (
                           <Chip isPill={false} key={i} color="primary" className="w-auto text-sm sm:w-auto">
                              <Chip.Label>{cat?.name}</Chip.Label>
                           </Chip>
                        ))
                     }
                  </div>
               }
               <div className="flex flex-col gap-5">
                  <div className="flex flex-row items-center gap-2">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                        <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                        <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clipRule="evenodd" />
                     </svg>
                     <p className="font-serif text-slate-800 text-md"> {novelById?.view_count} views</p>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                        <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z" clipRule="evenodd" />
                     </svg>
                     <p className="font-serif text-slate-800 text-md">{novelById?.translator?.name}</p>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                        <path fillRule="evenodd" d="M4.25 2A2.25 2.25 0 0 0 2 4.25v11.5A2.25 2.25 0 0 0 4.25 18h11.5A2.25 2.25 0 0 0 18 15.75V4.25A2.25 2.25 0 0 0 15.75 2H4.25ZM6 13.25V3.5h8v9.75a.75.75 0 0 1-1.064.681L10 12.576l-2.936 1.355A.75.75 0 0 1 6 13.25Z" clipRule="evenodd" />
                     </svg>
                     <button className="font-serif text-slate-800 text-md hover:underline cursor-pointer"
                        disabled={isLoading} onClick={handleBookmark}
                     >
                        { localStorage.getItem("token") ? novelById?.isAlreadyBooked ? "Remove from library" : bookMarkText : "Login to bookmark ✔" }
                     </button>
                  </div>
               </div>
            </motion.div>
         </div>

         {/* <div className="sm:w-10/12 bg-blue-300 sm:m-auto w-11/12 md:w-10/12 md:m-auto m-auto lg:w-11/12"> */}
         <div className="flex flex-col gap-5 mx-auto w-full">
            {novelById?.volumes?.length > 0 && (
               novelById?.volumes?.map((vol, i) => {
                  return (
                     <Accordion key={i} className="w-full">
                        <Accordion.Item
                           value="react"
                           className="p-3 bg-[#F7F7F7] shadow-md"
                        >
                           <Accordion.Trigger className="text-black font-semibold p-0 font-serif">
                              {vol?.volume_title ? vol?.volume_title : `Volume ${vol?.volume_number}`}
                              <NavArrowDown className="h-4 w-4 group-data-[open=true]:rotate-180" />
                           </Accordion.Trigger>
                           <Accordion.Content className="p-4 flex flex-col gap-2">
                              {
                                 vol?.chapters?.length > 0 && (
                                    vol?.chapters?.map((chapt, j) => {
                                       return (
                                          <NavLink to={ROUTES.CHAPTER_BY_ID.replace(":novel", id).replace(":chapter", chapt?.chapter_number)} className="w-auto mx-2 shadow-lg rounded-md p-4 bg-[#FFFFFF]" key={j}>Chapter({chapt?.chapter_number}) {chapt?.title}</NavLink>
                                       )
                                    })
                                 )
                              }
                           </Accordion.Content>
                        </Accordion.Item>
                     </Accordion>
                  )
               })
            )}
         </div>

         <div className="flex-col bg-red-50 mx-auto w-10/12 sm:w-10/12 md:w-11/12 lg:w-10/12 ">
            {/* ...other code... */}
         </div>
      </div>
   )
   
   return content;
}
