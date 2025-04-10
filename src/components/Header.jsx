import React from 'react';
import { NovelCard } from './NovelCard';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import { LatestNovel } from './LatestNovel';

export const Header = () => {
   return (
      <header>
         <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row gap-6">
               <section className="w-full lg:w-1/2 border border-slate-400 border-solid rounded-md shadow-xl p-4">
                  <h2 className="text-xl font-extrabold text-gray-900 mb-6 tracking-tight font-poppins">Popular Novels</h2>
                  <div className="h-full">
                  <Splide
                     className="w-full h-full"
                     options={{
                        perPage: 1,
                        drag: "free",
                        type: "loop",
                        arrows: false,
                        pagination: false,
                        autoScroll: {
                           speed: 0.75,
                           pauseOnHover: false,
                           pauseOnFocus: false,
                        },
                        breakpoints: {
                           640: {
                              perPage: 1,
                           },
                           1024: {
                              perPage: 1,
                           },
                        },
                     }}
                     
                     extensions={{ AutoScroll }}
                  >
                     <SplideSlide>
                        <div className="px-2">
                        <NovelCard />
                        </div>
                     </SplideSlide>
                     <SplideSlide>
                        <div className="px-2">
                        <NovelCard />
                        </div>
                     </SplideSlide>
                     <SplideSlide>
                        <div className="px-2">
                        <NovelCard />
                        </div>
                     </SplideSlide>
                  </Splide>
                  </div>
               </section>

               {/* Latest Novels Section - Right Side */}
               <section className="w-full lg:w-1/2 border border-slate-400 border-solid rounded-md shadow-xl p-4">
                  <h2 className="text-xl font-extrabold text-gray-900 mb-6 tracking-tight font-poppins">Latest Choices</h2>
                  <div className="flex flex-col gap-4">
                     <LatestNovel />
                     <LatestNovel />
                  </div>
               </section>
            </div>
         </div>
      </header>
   );
};