import React, { useEffect } from 'react'
import { motion } from "framer-motion";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/react-splide/css";
import zeus from "../assets/imgs/zeus.webp";
import { ChapterList } from '../components/ChapterList';
import { Link, NavLink } from 'react-router-dom';

export const NovelDetail = () => {

   let movie = {
      id: 100,
      title: "ရာဇ၀င်ထဲက သူရဲကောင်း",
      vote_average: 3.5,
      release_date: "2025-05-04",
      popularity: "Good",
      original_language: "Chinese",
      overview: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum corrupti quae dolorum voluptatum accusantium molestias dignissimos explicabo quis itaque quaerat labore aperiam soluta provident, cumque, rerum facere temporibus sed incidunt?",
   }

   useEffect(() => {
      window.scrollTo({top: 0})
   }, [])
   
   return (
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
               alt={movie?.title}
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
            <h1 className="text-2xl"> Novel&apos;s overview</h1>
            <p className="text-lg mb-5">
            <span className="text-slate-800 font-bold">Novel name</span>: &nbsp;{" "}
               {movie?.title}
            </p>
         </div>

         <div>
            <p className="leading-8">{movie?.overview}</p>
         </div>
            
         <div className="flex flex-wrap gap-4 mt-3">
            <div className='border border-slate-400 shadow-xl p-2 rounde-md'>
               <p className="text-sm"> Voting: {movie?.vote_average}</p>
            </div>
            
            <div className='border border-slate-400 shadow-xl p-2 rounde-md'>
               <p className="text-sm">Release Date: {movie?.release_date}</p>
            </div>
               
            <div className='border border-slate-400 shadow-xl p-2 rounde-md'>
               <p className="text-sm">Popularity: {movie?.popularity}</p>
            </div>
               
            <div className='border border-slate-400 shadow-xl p-2 rounde-md'>
               <p className="text-sm">Original Languate: {movie?.original_language}</p>
            </div>
         </div>   
         </motion.div>

         <div className="my-10 sm:w-10/12 sm:mt-10 sm:m-auto w-11/12 md:w-10/12 md:m-auto lg:w-11/12 lg:my-5 min-w-customOne px-10">
            <ChapterList />
         </div>

         <div className="flex-col bg-red-50 mx-auto w-10/12 sm:w-10/12 md:w-11/12 lg:w-10/12 ">

               <section className="flex justify-start items-start mb-5">
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
                        <SplideSlide key={movie?.movieId}>
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
               </section>
            </div>
      </div>
   )
}
