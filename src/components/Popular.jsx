import React from 'react';
import { Profile } from './Profile';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { NavLink } from 'react-router-dom';

const itemsPerPage = 5;

export const Popular = ({time, popular}) => {
   return (
      <div className="mx-auto w-full px-4 py-6 relative"> {/* Added relative here */}
         <h2 className="text-xl font-extrabold text-gray-900 mb-6 tracking-tight font-poppins">{ `${time}အတွင်း လူကြိုက်အများဆုံး` }</h2>
         <div className="relative border border-slate-400 border-solid rounded-md shadow-xl overflow-hidden"> {/* Prevents horizontal scrolling */}
            <Splide
               options={{
                  type: 'loop',
                  perPage: itemsPerPage,
                  perMove: 1,
                  gap: '1rem',
                  arrows: false,
                  pagination: false,
                  drag: true,
                  keyboard: true,
                  breakpoints: {
                  640: { perPage: 1 },
                  768: { perPage: 2 },
                  1024: { perPage: 3 },
                  1280: { perPage: itemsPerPage },
                  },
               }}
               className="splide-container items-center justify-center justify-items-center"
            >
               {popular?.length > 0 && popular?.map((novel) => (
                  <SplideSlide key={novel?.id} className="px-1">
                     <div className="transform scale-75"> {/* Shrinking the cards */}
                        <NavLink to={`novels/${novel?.id}`}>
                           <Profile novel={novel} />
                        </NavLink>
                     </div>
                  </SplideSlide>
               ))}
            </Splide>
         </div>
      </div>
   )
}
