import { useEffect } from 'react';
import { EditorChoices } from './EditorChoices';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import { LatestNovel } from './LatestNovel';
import { NavLink } from 'react-router-dom';
import { scrollToTop } from '../functions/helpers';
import { useTranslation } from 'react-i18next';
import { LOCALIZE_CONST, ROUTES } from '../consts/Consts';

export const Header = ({ popular_all_time, latest_novel}) => {

   const { t } = useTranslation();

   useEffect(() => {
      scrollToTop();
   }, []);

   return (
      <header className="w-full h-auto lg:-mb-7">
         {/* <div className="mx-auto px-4 py-6"> */}
            <div className="flex flex-col lg:flex-row gap-6 p-5">
               <section className="flex flex-col gap-5 w-full lg:w-7/12 rounded-md ">
                  <h2 className="text-xl font-bold tracking-tight font-poppins">{ t(LOCALIZE_CONST.EDITOR_CHOICES) }</h2>
                     <Splide
                        className="h-full w-full"
                        options={{
                           perPage: 1,
                           type: "loop",
                           arrows: false,
                           pagination: false,
                           wheel: true,
                           autoplay: true,
                           interval: 4000,
                           breakpoints: {
                              640: {
                                 perPage: 1,
                              },
                              1024: {
                                 perPage: 1,
                              },
                           },
                        }}
                        
                        //extensions={{ AutoScroll }}
                     >
                        {popular_all_time && popular_all_time.length > 0 ? (
                           popular_all_time.map((novel) => (
                              <SplideSlide key={novel.id}>
                                 <NavLink to={ROUTES.NOVEL_BY_ID.replace(":id", novel?.id)}>
                                    <EditorChoices novel={novel} />
                                 </NavLink>
                              </SplideSlide>
                           ))
                        ) : (
                           <div className="px-2 text-gray-500">{ t(LOCALIZE_CONST.NO_BOOKS_FOUND)}</div>
                        )}
                     </Splide>
               </section>

               {/* Latest Novels Section - Right Side */}
               <section className="flex flex-col gap-5 w-full lg:w-5/12 rounded-md ">
                  <h2 className="text-xl font-bold tracking-tight font-poppins">{ t(LOCALIZE_CONST.LATEST_NOVELS) }</h2>
                  {/* <div className="flex flex-col gap-4"> */}
                     <Splide
                        className=""
                        options={{
                           direction: 'ttb',
                           height: '255px',
                           perPage: latest_novel && latest_novel.length > 1 ? 2 : 1,   
                           wheel: true,
                           autoplay: true,
                           interval: 2500,
                           type: 'loop',
                           arrows: false,
                           pagination: false,
                           breakpoints: {
                              640: {
                                 perPage: latest_novel && latest_novel.length > 1 ? 2 : 1,
                                 height: '255px'
                              },
                           },
                        }}
                     >
                        {latest_novel && latest_novel.length > 0 ? (
                              latest_novel.map((novel) => (
                                 <SplideSlide key={novel.id}>
                                    <NavLink to={ROUTES.NOVEL_BY_ID.replace(":id", novel?.id)}>
                                       <LatestNovel novel={novel} />
                                    </NavLink>
                                 </SplideSlide>
                              ))
                           ) : (
                              <div className="px-2 text-gray-500">{ t(LOCALIZE_CONST.NO_BOOKS_FOUND)}</div>
                           )
                        }
                     </Splide>
                  {/* </div> */}
               </section>
            </div>
         {/* </div> */}
      </header>
   );
};