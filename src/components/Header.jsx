import { useEffect } from 'react';
import { EditorChoices } from './EditorChoices';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { LatestNovel } from './LatestNovel';
import { NavLink } from 'react-router-dom';
import { scrollToTop } from '../functions/helpers';
import { useTranslation } from 'react-i18next';
import { LOCALIZE_CONST, ROUTES } from '../consts/Consts';

export const Header = ({ popular_all_time, latest_novel }) => {
   const { t } = useTranslation();

   useEffect(() => {
      scrollToTop();
   }, []);

   return (
      <header className="w-full h-auto pt-8 pb-3">
         <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
               
               {/* Left Section: Editor's Choices */}
               <section className="flex flex-col gap-5 w-full lg:w-7/12">
                  <div className="flex items-center justify-between mb-3 px-2 border-l-4 border-blue-600">
                     <h2 className="text-2xl font-black text-slate-800 tracking-tight pl-3">
                        {t(LOCALIZE_CONST.EDITOR_CHOICES)}
                     </h2>
                     {/* <NavLink 
                        to={ROUTES.BROWSE} // Replace with your actual browse route
                        className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-widest"
                     >
                        View All
                     </NavLink> */}
                  </div>
                  <Splide
                     options={{
                        perPage: 1,
                        height: '335px',
                        type: "loop",
                        arrows: false,
                        pagination: false,
                        autoplay: true,
                        interval: 4000,
                     }}
                  >
                     {popular_all_time?.map((novel) => (
                        <SplideSlide key={novel.id}>
                           <NavLink to={ROUTES.NOVEL_BY_ID.replace(":id", novel?.id)}>
                              <EditorChoices novel={novel} />
                           </NavLink>
                        </SplideSlide>
                     ))}
                  </Splide>
               </section>

               {/* Right Section: Latest Novels (Vertical Splide) */}
               <section className="flex flex-col gap-5 w-full lg:w-5/12 ">
                  <div className="flex items-center justify-between mb-3">
                     <h2 className="text-2xl font-black text-slate-800 tracking-tight pl-1">
                        {t(LOCALIZE_CONST.LATEST_NOVELS)}
                     </h2>
                     {/* <NavLink 
                        to={ROUTES.BROWSE} // Replace with your actual browse route
                        className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-widest"
                     >
                        View All
                     </NavLink> */}
                  </div>
                  <Splide
                     options={{
                        direction: 'ttb',
                        height: '335px', // Exactly matches the EditorChoices height
                        perPage: 3,      // Shows 3 items to fill the height perfectly
                        gap: '1rem',
                        type: 'loop',
                        arrows: false,
                        pagination: false,
                        autoplay: true,
                        interval: 3000,
                        wheel: true,
                        breakpoints: {
                           1024: { height: '350px', perPage: 3 },
                        }
                     }}
                  >
                     {latest_novel?.map((novel) => (
                        <SplideSlide key={novel.id}>
                           <NavLink to={ROUTES.NOVEL_BY_ID.replace(":id", novel?.id)}>
                              <LatestNovel novel={novel} />
                           </NavLink>
                        </SplideSlide>
                     ))}
                  </Splide>
               </section>
            </div>
         </div>
      </header>
   );
};