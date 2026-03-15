import { Profile } from './Profile';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LOCALIZE_CONST, ROUTES } from '../consts/Consts';

export const Popular = ({ isWeek, popular }) => {
   const { t } = useTranslation();

   return (
      <div className="mx-auto container w-full p-5">
         {/* Header Section */}
         <div className="flex items-center justify-between mb-8 px-2 border-l-4 border-blue-600">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight pl-3">
               {t(isWeek ? LOCALIZE_CONST.POPULAR_IN_THIS_WEEK : LOCALIZE_CONST.POPULAR_IN_THIS_MONTH)}
            </h2>
            {/* <NavLink 
               to={ROUTES.BROWSE} // Replace with your actual browse route
               className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-widest"
            >
               View All
            </NavLink> */}
         </div>

         {popular?.length > 0 ? (
            <Splide
               options={{
                  type: 'loop',
                  // Increased gap to 32px to stop them being "too close"
                  gap: '2rem', 
                  arrows: false,
                  pagination: false,
                  drag: 'free',
                  snap: true,
                  perMove: 1,
                  // Reduced perPage values slightly so each card is wider/shorter
                  perPage: 6,
                  breakpoints: {
                     1536: { perPage: 7 },
                     1280: { perPage: 6, gap: '1.5rem' },
                     1024: { perPage: 3, gap: '1rem' },
                     768: { perPage: 2, gap: '1rem' },
                     640: { perPage: 2, gap: '0.75rem' },
                     480: { perPage: 1, gap: '0.5rem' },
                  },
               }}
               className="popular-carousel"
            >
               {popular.map((novel) => (
                  <SplideSlide key={novel?.id} className="pb-4">
                     <NavLink to={ROUTES.NOVEL_BY_ID.replace(":id", novel?.id)}>
                        <Profile novel={novel} />
                     </NavLink>
                  </SplideSlide>
               ))}
            </Splide>
         ) : (
            <div className="py-10 text-center bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
               <p className="text-slate-400 font-medium">{t(LOCALIZE_CONST.NO_BOOKS_FOUND)}</p>
            </div>
         )}
      </div>
   );
};