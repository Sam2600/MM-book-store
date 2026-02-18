import { Profile } from './Profile';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LOCALIZE_CONST, ROUTES } from '../consts/Consts';

const itemsPerPage = 6;

export const Popular = ({ isWeek, popular }) => {
   
   const { t } = useTranslation();

   return (
      <div className="flex flex-col gap-5 mx-auto w-full px-4 py-6 relative"> {/* Added relative here */}
         <h2 className="text-xl font-bold font-poppins">{ t( isWeek ? LOCALIZE_CONST.POPULAR_IN_THIS_WEEK: LOCALIZE_CONST.POPULAR_IN_THIS_MONTH) }</h2>
            <Splide
               options={{
                  type: 'loop',
                  perPage: popular?.length >= itemsPerPage ? itemsPerPage : popular?.length,
                  perMove: 1,
                  gap: '10px',
                  arrows: false,
                  pagination: false,
                  drag: true,
                  keyboard: true,
                  breakpoints: {
                     640: { perPage: 1 },
                     768: { perPage: popular?.length >= 2 ? 2 : popular?.length },
                     1024: { perPage: popular?.length >= 3 ? 3 : popular?.length },
                     1280: { perPage: popular?.length >= itemsPerPage ? itemsPerPage : popular?.length },
                  },
               }}
            >
               {popular?.length > 0 ? popular?.map((novel) => (
                  <SplideSlide key={novel?.id} className="px-1">
                     <NavLink to={ROUTES.NOVEL_BY_ID.replace(":id", novel?.id)}>
                        <Profile novel={novel} />
                     </NavLink>
                  </SplideSlide>
               )): (
                  <div className="px-2 text-gray-500">{ t(LOCALIZE_CONST.NO_BOOKS_FOUND)}</div>
               )}
            </Splide>
      </div>
   )
}
