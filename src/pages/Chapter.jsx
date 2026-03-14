import { 
   Typography, 
   Card, 
   IconButton,
   Popover,
   PopoverContent,
   Slider,
   PopoverTrigger,
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
      dark: "bg-[#121212] text-gray-400 border-none"
   };

   if (status === "pending") return <Loader />;

   return (
      <div className={`min-h-screen transition-colors duration-500 ${themeStyles[theme]}`}>
         
         {/* Floating Reader Settings */}
         <div className="fixed bottom-10 right-10 z-50">
            <Popover placement="top-end">
               <PopoverTrigger>
                  <IconButton 
                     variant="gradient" 
                     color="blue" 
                     size="lg" 
                     className="rounded-full shadow-xl shadow-blue-500/40"
                  >
                     <Settings className="h-6 w-6" />
                  </IconButton>
               </PopoverTrigger>
               <PopoverContent className="z-[999] w-72 p-6 rounded-2xl shadow-2xl border-slate-100 bg-white">
                  <div className="space-y-6">
                     {/* Theme Section */}
                     <div>
                        <Typography className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                           Theme
                        </Typography>
                        <div className="flex gap-2">
                           {['light', 'sepia', 'dark'].map((mode) => (
                              <button
                                 key={mode}
                                 type="button"
                                 onClick={() => setTheme(mode)}
                                 className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase transition-all border-2
                                    ${theme === mode 
                                       ? "border-blue-500 bg-blue-50 text-blue-600" 
                                       : "border-slate-50 bg-slate-50 text-slate-500"}`}
                              >
                                 {mode}
                              </button>
                           ))}
                        </div>
                     </div>

                     {/* Font Size Section */}
                     <div>
                        <div className="flex justify-between mb-2">
                           <Typography className="text-[10px] font-black uppercase tracking-widest text-slate-400">Font Size</Typography>
                           <Typography className="text-xs font-bold text-blue-600">{fontSize}px</Typography>
                        </div>
                        <input 
                           type="range"
                           min="14" 
                           max="30" 
                           value={fontSize}
                           onChange={(e) => setFontSize(Number(e.target.value))}
                           className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                     </div>

                     {/* Line Height Section */}
                     <div>
                        <div className="flex justify-between mb-2">
                           <Typography className="text-[10px] font-black uppercase tracking-widest text-slate-400">Spacing</Typography>
                           <Typography className="text-xs font-bold text-blue-600">{lineHeight}</Typography>
                        </div>
                        <input 
                           type="range"
                           min="12" 
                           max="25" 
                           value={lineHeight * 10}
                           onChange={(e) => setLineHeight(Number(e.target.value) / 10)}
                           className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                     </div>

                     {/* Reset Button */}
                     <button 
                        onClick={() => {
                           setFontSize(18);
                           setLineHeight(1.8);
                           setTheme('light');
                        }}
                        className="w-full py-2 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors"
                     >
                        Reset to Default
                     </button>
                  </div>
               </PopoverContent>
            </Popover>
         </div>

         <div className="max-w-3xl mx-auto px-5 pt-10">
            {/* Header Navigation */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-16">
               <Breadcrumber novel_id={novel} />
               
               <div className="flex gap-3">
                  <NavLink
                     to={ROUTES.CHAPTER_BY_ID.replace(":novel", novel).replace(":volume", volume).replace(":chapter", chapterById?.prev_chapter)}
                     className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all
                        ${chapterById?.prev_chapter 
                           ? "bg-slate-900 text-white hover:bg-blue-600" 
                           : "bg-slate-100 text-slate-300 pointer-events-none"}`}
                     onClick={(e) => !chapterById?.prev_chapter && e.preventDefault()}
                  >
                     <SkipPrev className="h-4 w-4" /> {t(LOCALIZE_CONST.BACK)}
                  </NavLink>

                  <NavLink
                     to={ROUTES.CHAPTER_BY_ID.replace(":novel", novel).replace(":volume", volume).replace(":chapter", chapterById?.next_chapter)}
                     className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all
                        ${chapterById?.next_chapter 
                           ? "bg-slate-900 text-white hover:bg-blue-600" 
                           : "bg-slate-100 text-slate-300 pointer-events-none"}`}
                     onClick={(e) => !chapterById?.next_chapter && e.preventDefault()}
                  >
                     {t(LOCALIZE_CONST.NEXT)} <SkipNext className="h-4 w-4" />
                  </NavLink>
               </div>
            </div>

            {/* Reading Content */}
            <Card className="mb-20 bg-transparent shadow-none border-none">
               <header className="text-center mb-16">
                  <Typography className="text-blue-500 font-black text-[10px] tracking-[0.3em] uppercase mb-4">
                     {t(LOCALIZE_CONST.CHAPTER)} {chapterById?.chapter_number}
                  </Typography>
                  <Typography className="text-3xl md:text-5xl font-black leading-tight font-poppins px-4">
                     {chapterById?.title}
                  </Typography>
                  <div className="h-1.5 w-16 bg-blue-500/20 mx-auto mt-8 rounded-full" />
               </header>

               <article
                  className={`font-poppins antialiased transition-all duration-300 selection:bg-blue-100 selection:text-blue-900 
                     ${theme === 'dark' ? 'text-gray-400' : 'text-inherit'}`}
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