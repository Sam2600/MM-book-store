import { Profile } from './Profile';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LOCALIZE_CONST, ROUTES } from '../consts/Consts';

const itemsPerPage = 5;

export const Popular = ({ isWeek, popular }) => {
   
   const { t } = useTranslation();

   return (
      <div className="flex flex-col gap-5 mx-auto w-full px-4 py-6 relative"> {/* Added relative here */}
         <h2 className="text-xl font-bold font-poppins">{ t( isWeek ? LOCALIZE_CONST.POPULAR_IN_THIS_WEEK: LOCALIZE_CONST.POPULAR_IN_THIS_MONTH) }</h2>
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
               className="splide-container bg-[#F7F7F7] items-center justify-center justify-items-center"
            >
               {popular?.length > 0 && popular?.map((novel) => (
                  <SplideSlide key={novel?.id} className="px-1">
                     <div className="transform scale-75"> {/* Shrinking the cards */}
                        <NavLink to={ROUTES.NOVEL_BY_ID.replace(":id", novel?.id)}>
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
