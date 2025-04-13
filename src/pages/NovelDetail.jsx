import React, { useEffect } from 'react'
import { motion } from "framer-motion";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/react-splide/css";
import zeus from "../assets/imgs/zeus.webp";
import { ChapterList } from '../components/ChapterList';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getNovelById, getNovelByID, getNovelByIdStatus } from '../states/features/novel/novelSlice';
import { Accordion } from '@material-tailwind/react';
import { NavArrowDown } from 'iconoir-react';
import { Loader } from '../components/Loader';
import { toHumanReadableDates } from '../functions/helpers';

export const NovelDetail = () => {

   const { id } = useParams();

   const dispatch = useDispatch();

   const novelById = useSelector(getNovelByID);
   const status = useSelector(getNovelByIdStatus);

   useEffect(() => {
      window.scrollTo({ top: 0 })
      dispatch(getNovelById(id));
   }, [])

   const content = status == "pending" ? (
         <Loader/>
   ): (
      <div className="flex flex-wrap w-11/12 mx-auto h-fit">
         <motion.div
            className="min-w-custom flex flex-col w-8/2 sm:flex-col sm:w-8/12 sm:ms-12 md:flex-row md:gap-3 md:w-11/12 lg:flex-col lg:my-5 lg:w-4/12 px-10 m-auto"
            initial={{ opacity: 0, x: "-100vw" }}
            animate={{ opacity: 1, x: 0, transition: { duration: 1.2 } }}
            exit={{ opacity: 0 }}
         >
         <div className="my-5 w-full sm:w-full md:w-5/12 md:me-10 lg:w-10/12 m-auto">
            <img
               className="rounded-md h-auto w-full"
               src={zeus}
               alt={novelById?.title}
            />
         </div>
         </motion.div>

         <motion.div
            className=" flex flex-col justify-start w-10/2 sm:w-10/12 sm:mt-10 sm:m-auto md:w-10/12 md:m-auto lg:w-7/12 lg:my-5 min-w-customOne px-10"
            initial={{ opacity: 0, x: "100vw" }}
            animate={{ opacity: 1, x: 0, transition: { duration: 1.2 } }}
            exit={{ opacity: 0 }}
         >
         <div className='flex flex-col gap-y-4'>
            <p className="text-lg font-bold mb-5">
               {novelById?.title}
            </p>
         </div>

         <div>
            <p className="leading-8">{novelById?.description}</p>
         </div>
            
         <div className="flex flex-wrap gap-4 mt-3">
            <div className='border border-slate-400 shadow-xl p-2 rounde-md'>
               <p className="text-sm"> Views: {novelById?.view_count}</p>
            </div>
            
            <div className='border border-slate-400 shadow-xl p-2 rounde-md'>
               <p className="text-sm">Release Date: {toHumanReadableDates(novelById?.created_at)}</p>
            </div>
               
            <div className='border border-slate-400 shadow-xl p-2 rounde-md'>
               <p className="text-sm">Translator: {novelById?.translator?.name}</p>
            </div>
               
            <div className='border border-slate-400 shadow-xl p-2 rounde-md'>
               <p className="text-sm">Original Book Name: {novelById?.original_book_name}</p>
                  </div>
                  
            <div className='border border-slate-400 shadow-xl p-2 rounde-md'>
               <p className="text-sm">Original Author Name: {novelById?.original_author_name	}</p>
            </div>
         </div>   
         </motion.div>

         <div className="my-10 sm:w-10/12 sm:mt-10 sm:m-auto w-11/12 md:w-10/12 md:m-auto lg:w-11/12 lg:my-5 min-w-customOne px-10">
            
            {novelById?.volumes?.length > 0 && (
               novelById?.volumes?.map((vol, i) => {
                  return (
                     <Accordion key={i} className="w-full">
                        <Accordion.Item
                           value="react"
                           className="mb-2 rounded-lg border border-slate-400 shadow-lg p-3"
                        >
                           <Accordion.Trigger className="p-0">
                              {vol?.volume_title}
                              <NavArrowDown className="h-4 w-4 group-data-[open=true]:rotate-180" />
                           </Accordion.Trigger>
                           <Accordion.Content className="p-4 flex flex-wrap">
                              {
                                 vol?.chapters?.length > 0 && (
                                    vol?.chapters?.map((chapt, j) => {
                                       return (
                                          <NavLink to={`volumes/${vol?.id}/chapters/${chapt?.id}`} className="w-auto border mx-2 my-2 border-slate-400 shadow-lg rounded-md p-4" key={j}>{chapt?.title}</NavLink>
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

               {/* <section className="flex justify-start items-start mb-5">
                  <Splide
                     options={{
                        perPage: 5,
                        drag: "free",
                        type: "slide",
                        rewind: true,
                        arrows: false,
                        pagination: false,
                        autoScroll: {
                           pauseOnHover: false,
                           pauseOnFocus: false,
                           rewind: false,
                           speed: 0.5
                        }
                     }}
                  extensions={{ AutoScroll }}
               >
                  {Array.from({ length: 8 }).map((movie) => {
                     return (
                        <SplideSlide key={movie?.id}>
                           <div className="group relative me-2">
                              <img
                                 className="w-full rounded-md transition-all duration-500 hover:opacity-80"
                                 src={zeus}
                                 alt={movie?.title}
                              />
                              <NavLink to={"/novels/101"}>
                                 <p className="hidden opacity-70 group-hover:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-50 text-black py-2 px-4 rounded-lg">
                                    View
                                 </p>
                              </NavLink>
                           </div>
                        </SplideSlide>
                     );
                  })}
                  </Splide>
               </section> */}
            </div>
      </div>
   )
   
   return content;
}
