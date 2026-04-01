import {
   Typography,
   Card,
   IconButton,
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@material-tailwind/react';
import { Breadcrumber } from '../components/BreadCrumber'
import { useNavigate, useParams } from 'react-router-dom'
import { SkipNext, SkipPrev, Settings } from 'iconoir-react'
import { useDispatch, useSelector } from 'react-redux'
import { cleanNovels, getChapterByID, getChapterByIdStatus, getChapterByNovel } from '../states/features/novel/novelSlice'
import { Loader } from '../components/Loader'
import { scrollToTop } from '../functions/helpers'
import { LOCALIZE_CONST, ROUTES } from "../consts/Consts";
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'

const AD_SKIP_DELAY    = 5;
const AD_SCRIPT_SRC = () => import.meta.env.VITE_AD_SCRIPT_SRC;
const AD_CONTAINER_ID = () => import.meta.env.VITE_AD_CONTAINER_ID;
const SOCIAL_BAR_SRC = () => import.meta.env.VITE_SOCIAL_BAR_SRC;

// Shared srcDoc template for both popup and inline iframes
const adSrcDoc = `<!DOCTYPE html><html><head><style>*{margin:0;padding:0;box-sizing:border-box;}body{background:transparent;display:flex;align-items:center;justify-content:center;min-height:100%;}</style></head><body><div id="${AD_CONTAINER_ID()}"></div><script async data-cfasync="false" src="${AD_SCRIPT_SRC()}"><\/script></body></html>`;

export const Chapter = () => {
   const { t } = useTranslation();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { novel, volume, chapter } = useParams();

   const chapterById = useSelector(getChapterByID);
   const status      = useSelector(getChapterByIdStatus);

   const [fontSize,   setFontSize]   = useState(() => Number(localStorage.getItem('reader-fs'))  || 18);
   const [lineHeight, setLineHeight] = useState(() => Number(localStorage.getItem('reader-lh'))  || 1.8);
   const [theme,      setTheme]      = useState(() => localStorage.getItem('reader-theme')        || 'light');

   // ── Ad interstitial ──────────────────────────────────────────
   const [showAd,      setShowAd]      = useState(false);
   const [pendingUrl,  setPendingUrl]  = useState(null);
   const [navDir,      setNavDir]      = useState('next');   // 'next' | 'prev'
   const [countdown,   setCountdown]   = useState(AD_SKIP_DELAY);
   const [popupKey,    setPopupKey]    = useState(0);        // forces iframe remount on each open

   // Countdown tick
   useEffect(() => {
      if (!showAd || countdown <= 0) return;
      const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(t);
   }, [showAd, countdown]);

   // Inject social bar once per session (floating widget, no cleanup)
   useEffect(() => {
      if (document.querySelector(`script[src="${SOCIAL_BAR_SRC()}"]`)) return;
      const s = document.createElement('script');
      s.src = SOCIAL_BAR_SRC();
      document.body.appendChild(s);
   }, []);

   const handleChapterNav = (url, direction) => {
      if (!url) return;
      setPendingUrl(url);
      setNavDir(direction);
      setCountdown(AD_SKIP_DELAY);
      setPopupKey((k) => k + 1);
      setShowAd(true);
   };

   const handleCloseAd = () => {
      const url = pendingUrl;
      setShowAd(false);
      setPendingUrl(null);
      if (url) navigate(url);
   };

   // ── Reader prefs / data fetch ────────────────────────────────
   useEffect(() => {
      scrollToTop();
      dispatch(getChapterByNovel({ novel, chapter, volume }));
      return () => { dispatch(cleanNovels()); };
   }, [novel, volume, chapter, dispatch]);

   useEffect(() => {
      localStorage.setItem('reader-fs',    fontSize);
      localStorage.setItem('reader-lh',    lineHeight);
      localStorage.setItem('reader-theme', theme);
   }, [fontSize, lineHeight, theme]);

   const themeStyles = {
      light: 'bg-white text-slate-900',
      sepia: 'bg-[#f4ecd8] text-[#5b4636]',
      dark:  'bg-[#121212] text-gray-400 border-none',
   };

   if (status === 'pending') return <Loader />;

   const prevUrl = chapterById?.prev_chapter
      ? ROUTES.CHAPTER_BY_ID.replace(':novel', novel).replace(':volume', volume).replace(':chapter', chapterById.prev_chapter)
      : null;
   const nextUrl = chapterById?.next_chapter
      ? ROUTES.CHAPTER_BY_ID.replace(':novel', novel).replace(':volume', volume).replace(':chapter', chapterById.next_chapter)
      : null;

   const progressPct = (countdown / AD_SKIP_DELAY) * 100;

   return (
      <div className={`min-h-screen transition-colors duration-500 ${themeStyles[theme]}`}>

         {/* ── Ad Interstitial Popup ───────────────────────────── */}
         {showAd && (
            <div
               className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-4 gap-5"
               style={{ background: 'rgba(5,5,15,0.93)', backdropFilter: 'blur(10px)' }}
            >
               {/* Header labels */}
               <div className="w-full max-w-xl flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/25">
                     Advertisement
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-[0.15em] text-white/35">
                     {navDir === 'next' ? 'Next Chapter →' : '← Previous Chapter'}
                  </span>
               </div>

               {/* Ad iframe — isolated window per open so script always re-runs */}
               <div className="w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl shadow-black/60 bg-[#111827]">
                  <iframe
                     key={popupKey}
                     title="Advertisement"
                     srcDoc={adSrcDoc}
                     style={{ width: '100%', height: '280px', border: 'none', display: 'block' }}
                  />
               </div>

               {/* Support message */}
               <p className="text-white/30 text-xs text-center">
                  Ads keep this story free to read — thank you for your support ♥
               </p>

               {/* Progress bar */}
               <div className="w-full max-w-xl">
                  <div className="h-[3px] bg-white/10 rounded-full overflow-hidden">
                     <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-linear"
                        style={{ width: `${progressPct}%` }}
                     />
                  </div>

                  {/* Countdown / close button */}
                  <div className="mt-4 min-h-[44px] flex items-center justify-center">
                     {countdown > 0 ? (
                        <span className="text-white/40 text-sm font-mono tracking-widest">
                           Continue in&nbsp;
                           <span className="text-white font-black text-base tabular-nums">{countdown}</span>
                           &nbsp;s
                        </span>
                     ) : (
                        <button
                           onClick={handleCloseAd}
                           className="px-8 py-3 bg-white text-black font-black text-sm rounded-xl
                                      hover:bg-blue-500 hover:text-white transition-all duration-200
                                      shadow-lg shadow-white/10"
                        >
                           Continue Reading →
                        </button>
                     )}
                  </div>
               </div>
            </div>
         )}

         {/* ── Floating Reader Settings ────────────────────────── */}
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
                     {/* Theme */}
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
                                       ? 'border-blue-500 bg-blue-50 text-blue-600'
                                       : 'border-slate-50 bg-slate-50 text-slate-500'}`}
                              >
                                 {mode}
                              </button>
                           ))}
                        </div>
                     </div>

                     {/* Font Size */}
                     <div>
                        <div className="flex justify-between mb-2">
                           <Typography className="text-[10px] font-black uppercase tracking-widest text-slate-400">Font Size</Typography>
                           <Typography className="text-xs font-bold text-blue-600">{fontSize}px</Typography>
                        </div>
                        <input
                           type="range" min="14" max="30" value={fontSize}
                           onChange={(e) => setFontSize(Number(e.target.value))}
                           className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                     </div>

                     {/* Line Height */}
                     <div>
                        <div className="flex justify-between mb-2">
                           <Typography className="text-[10px] font-black uppercase tracking-widest text-slate-400">Spacing</Typography>
                           <Typography className="text-xs font-bold text-blue-600">{lineHeight}</Typography>
                        </div>
                        <input
                           type="range" min="12" max="25" value={lineHeight * 10}
                           onChange={(e) => setLineHeight(Number(e.target.value) / 10)}
                           className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                     </div>

                     {/* Reset */}
                     <button
                        onClick={() => { setFontSize(18); setLineHeight(1.8); setTheme('light'); }}
                        className="w-full py-2 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors"
                     >
                        Reset to Default
                     </button>
                  </div>
               </PopoverContent>
            </Popover>
         </div>

         {/* ── Page Content ────────────────────────────────────── */}
         <div className="max-w-3xl mx-auto px-5 pt-10">

            {/* Header nav */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-16">
               <Breadcrumber novel_id={novel} />

               <div className="flex gap-3">
                  <button
                     onClick={() => handleChapterNav(prevUrl, 'prev')}
                     disabled={!prevUrl}
                     className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all
                        ${prevUrl
                           ? 'bg-slate-900 text-white hover:bg-blue-600'
                           : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}
                  >
                     <SkipPrev className="h-4 w-4" /> {t(LOCALIZE_CONST.BACK)}
                  </button>

                  <button
                     onClick={() => handleChapterNav(nextUrl, 'next')}
                     disabled={!nextUrl}
                     className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all
                        ${nextUrl
                           ? 'bg-slate-900 text-white hover:bg-blue-600'
                           : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}
                  >
                     {t(LOCALIZE_CONST.NEXT)} <SkipNext className="h-4 w-4" />
                  </button>
               </div>
            </div>

            {/* Reading content */}
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
                  style={{ fontSize: `${fontSize}px`, lineHeight, fontWeight: 450 }}
                  dangerouslySetInnerHTML={{ __html: chapterById?.content }}
               />
            </Card>

            {/* ── Inline passive banner ──────────────────────────── */}
            <div className="mb-16">
               <p className="text-[9px] text-center text-slate-300 mb-2 uppercase tracking-[0.2em] font-bold select-none">
                  Advertisement
               </p>
               <div className="rounded-xl overflow-hidden bg-slate-50">
                  <iframe
                     title="Inline Ad"
                     srcDoc={adSrcDoc}
                     style={{ width: '100%', height: '250px', border: 'none', display: 'block' }}
                  />
               </div>
            </div>

            {/* Next chapter CTA — drives another ad impression */}
            {nextUrl && (
               <div className="mb-16 text-center">
                  <p className="text-xs text-slate-400 mb-3">Finished this chapter?</p>
                  <button
                     onClick={() => handleChapterNav(nextUrl, 'next')}
                     className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-black text-sm rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30"
                  >
                     Read Next Chapter <SkipNext className="h-4 w-4" />
                  </button>
               </div>
            )}

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
