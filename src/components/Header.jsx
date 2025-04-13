import React from 'react';
import { NovelCard } from './NovelCard';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import { LatestNovel } from './LatestNovel';
import { NavLink } from 'react-router-dom';

export const Header = ({ popular_all_time, latest_novel}) => {

   return (
      <header>
         <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row gap-6">
               <section className="w-full lg:w-1/2 border border-slate-400 border-solid rounded-md shadow-xl p-4">
                  <h2 className="text-xl font-extrabold text-gray-900 mb-6 tracking-tight font-poppins">{ "အယ်ဒီတာ စိတ်ကြိုက်များ" }</h2>
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
                        {popular_all_time && popular_all_time.length > 0 ? (
                           popular_all_time.map((novel) => (
                              <SplideSlide key={novel.id}>
                                 <NavLink to={`novels/${novel?.id}`}>
                                    <div className='px-2'>
                                       <NovelCard novel={novel} />
                                    </div>
                                 </NavLink>
                              </SplideSlide>
                           ))
                        ) : (
                           <SplideSlide>
                              <div className="px-2 text-gray-500">Loading popular novels...</div>
                           </SplideSlide>
                        )}
                     </Splide>
                  </div>
               </section>

               {/* Latest Novels Section - Right Side */}
               <section className="w-full lg:w-1/2 border border-slate-400 border-solid rounded-md shadow-xl p-4">
                  <h2 className="text-xl font-extrabold text-gray-900 mb-6 tracking-tight font-poppins">{ "နောက်ဆုံး ထွက်ရှိထားသည်များ" }</h2>
                  <div className="flex flex-col gap-4">
                     <Splide
                        className="w-full h-full px-4 gap-y-3"
                        options={{
                           direction: 'ttb',
                           height: '240px',
                           perPage: 2,   
                           wheel: true,
                           autoplay: true,
                           interval: 2500,
                           type: 'loop',
                           arrows: false,
                           pagination: false,
                           breakpoints: {
                              640: {
                                 perPage: 2,
                                 height: '300px'
                              },
                           },
                        }}
                     >
                        {latest_novel && latest_novel.length > 0 ? (
                              latest_novel.map((novel) => (
                                 <SplideSlide key={novel.id}>
                                    <NavLink to={`novels/${novel?.id}`}>
                                       <LatestNovel novel={novel} />
                                    </NavLink>
                                 </SplideSlide>
                              ))
                           ) : (
                              <SplideSlide>
                                 <div className="px-2 text-gray-500">Loading popular novels...</div>
                              </SplideSlide>
                           )}
                        </Splide>
                  </div>
               </section>
            </div>
         </div>
      </header>
   );
};