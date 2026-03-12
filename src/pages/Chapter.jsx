import { 
   Typography, 
   Card, 
   Breadcrumb
} from '@material-tailwind/react';
import { Breadcrumber } from '../components/BreadCrumber'
import { NavLink, useParams } from 'react-router-dom'
import { SkipNext, SkipPrev, Settings, TextSize, LineSpace } from 'iconoir-react'
import { useDispatch, useSelector } from 'react-redux'
import { cleanNovels, getChapterByID, getChapterByIdStatus, getChapterByNovel } from '../states/features/novel/novelSlice'
import { Loader } from '../components/Loader'
import { scrollToTop } from '../functions/helpers'
import { LOCALIZE_CONST, ROUTES } from "../consts/Consts";
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'

export const Chapter = () => {

   const { t } = useTranslation();

   const dispatch = useDispatch();
   
   const { novel, volume, chapter } = useParams();
   
   const chapterById = useSelector(getChapterByID);
   const status = useSelector(getChapterByIdStatus);

   // --- Reader Settings Logic ---
   const [fontSize, setFontSize] = useState(() => Number(localStorage.getItem('reader-fs')) || 18);
   const [lineHeight, setLineHeight] = useState(() => Number(localStorage.getItem('reader-lh')) || 1.8);
   const [theme, setTheme] = useState(() => localStorage.getItem('reader-theme') || 'light');

   useEffect(() => {
      scrollToTop();
      dispatch(getChapterByNovel({ novel, chapter, volume }));
      return () => { dispatch(cleanNovels()); }
   }, [novel, volume, chapter, dispatch]);

   useEffect(() => {
      localStorage.setItem('reader-fs', fontSize);
      localStorage.setItem('reader-lh', lineHeight);
      localStorage.setItem('reader-theme', theme);
   }, [fontSize, lineHeight, theme]);

   const themeStyles = {
      light: "bg-white text-slate-900",
      sepia: "bg-[#f4ecd8] text-[#5b4636]",
      dark: "bg-[#121212] text-gray-400"
   };

   if (status === "pending") return <Loader />;

   return (
      <div className={`min-h-screen transition-colors duration-500 ${themeStyles[theme]}`}>
         <div className="max-w-3xl mx-auto px-5 pt-10">
            {/* Navigation Header */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-12">
               <Breadcrumber novel_id={novel} />

            <Breadcrumb className="gap-2">

               <Breadcrumb.Link
                  as={NavLink}
                  to={
                     ROUTES.CHAPTER_BY_ID
                        .replace(":novel", novel)
                        .replace(":volume", volume)
                     .replace(":chapter", chapterById?.prev_chapter)
                  }
                  onClick={(e) => {
                     if (!chapterById?.prev_chapter) e.preventDefault();
                  }}
                  className={
                     `flex items-center gap-1 rounded px-2 py-1 border transition-all 
                     ${chapterById?.prev_chapter 
                        ? "bg-primary text-primary-foreground border-transparent hover:bg-white hover:text-primary hover:shadow-lg hover:border hover:border-slate-400" 
                        : "bg-muted text-muted-foreground border border-muted pointer-events-none opacity-60"}`
                  }
               >
                  <SkipPrev className="h-4 w-4" />
                  {t(LOCALIZE_CONST.BACK)}
               </Breadcrumb.Link>

               <Breadcrumb.Link
                  as={NavLink}
                  to={
                     ROUTES.CHAPTER_BY_ID
                        .replace(":novel", novel)
                        .replace(":volume", volume)
                     .replace(":chapter", chapterById?.next_chapter)
                  }
                  onClick={(e) => {
                     if (!chapterById?.next_chapter) e.preventDefault();
                  }}
                  className={
                     `flex items-center gap-1 rounded px-2 py-1 border transition-all 
                     ${chapterById?.next_chapter 
                        ? "bg-primary text-primary-foreground border-transparent hover:bg-white hover:text-primary hover:shadow-lg hover:border hover:border-slate-400" 
                        : "bg-muted text-muted-foreground border border-muted pointer-events-none opacity-60"}`
                  }
               >
                  {t(LOCALIZE_CONST.NEXT)}
                  <SkipNext className="h-4 w-4" />
               </Breadcrumb.Link>

               </Breadcrumb>
            </div>

            {/* Reading Content */}
            <Card className="mb-20 bg-transparent shadow-none border-none">
               <header className="text-center mb-16">
                  <Typography className="text-blue-500 font-black text-[10px] tracking-[0.3em] uppercase mb-4">
                     {t(LOCALIZE_CONST.CHAPTER)} {chapterById?.chapter_number}
                  </Typography>
                  <Typography className="text-3xl md:text-5xl font-black leading-tight text-inherit font-poppins px-4">
                     {chapterById?.title}
                  </Typography>
                  <div className="h-1.5 w-16 bg-blue-500/20 mx-auto mt-8 rounded-full" />
               </header>

               <article
                  className="font-poppins antialiased selection:bg-blue-100 selection:text-blue-900"
                  style={{ 
                     fontSize: `${fontSize}px`, 
                     lineHeight: lineHeight,
                     fontWeight: 450
                  }}
                  dangerouslySetInnerHTML={{ __html: chapterById?.content }}
               />
            </Card>

            <footer className="flex justify-center py-20 border-t border-black/5">
               <button 
                  onClick={scrollToTop} 
                  className="text-[10px] font-black tracking-[0.2em] text-slate-400 hover:text-blue-500 transition-colors uppercase"
               >
                  ↑ Scroll to Top
               </button>
            </footer>
         </div>
      </div>
   );
}