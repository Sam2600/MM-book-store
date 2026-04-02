import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LOCALIZE_CONST, ROUTES } from '../consts/Consts';
import { EyeIcon } from '@heroicons/react/16/solid';

const timeAgo = (dateStr) => {
   const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
   if (diff < 60) return `${diff}s ago`;
   if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
   if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
   return `${Math.floor(diff / 86400)} days ago`;
};

export const LatestUpdates = ({ latest_updates }) => {

   const { t } = useTranslation();

   return (
      <div className="mx-auto container w-full lg:p-1 bg-transparent">
         {/* SECTION HEADER */}
         <div className="flex items-center justify-between px-4">
            {/* <div className="flex flex-col gap-1"> */}
               <div className="flex items-center justify-between mb-8 px-2 border-l-4 border-blue-600">
                  <h2 className="text-2xl font-black text-slate-800 tracking-tight pl-3">
                     {t(LOCALIZE_CONST.LATEST_UPDATES)}
                  </h2>
               </div>
            {/* </div> */}
            <p className="text-sm font-bold text-slate-400 ml-5 uppercase tracking-widest">Fresh from our authors</p>
            {/* <button className="hidden md:block text-xs font-black text-blue-600 uppercase tracking-widest hover:bg-blue-50 px-4 py-2 rounded-xl transition-all">
               View All Updates
            </button> */}
         </div>

         {latest_updates?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
               {latest_updates.map((novel) => (
                  <div
                     key={novel.id}
                     className="group relative flex gap-4 p-4 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300"
                  >
                     {/* NOVEL COVER */}
                     <NavLink
                        to={ROUTES.NOVEL_BY_ID.replace(':id', novel.id)}
                        className="relative flex-shrink-0"
                     >
                        <img
                           src={novel.cover_image}
                           alt={novel.title}
                           loading="lazy"
                           className="w-20 h-28 object-cover rounded-2xl shadow-md group-hover:rotate-2 transition-transform duration-300"
                        />
                     </NavLink>

                     {/* NOVEL INFO */}
                     <div className="flex flex-col flex-1 min-w-0 py-1">
                        <NavLink to={ROUTES.NOVEL_BY_ID.replace(':id', novel.id)}>
                           <h3 className="text-[15px] font-black text-slate-900 line-clamp-1 leading-tight group-hover:text-blue-600 transition-colors">
                              {novel.title}
                           </h3>
                        </NavLink>

                        {/* CHAPTER FEED */}
                        <div className="flex flex-col gap-2 mt-4">
                           {novel.latest_chapters?.slice(0, 2).map((chapter) => (
                              <NavLink
                                 key={chapter.id}
                                 to={ROUTES.CHAPTER_BY_ID
                                    .replace(':novel', novel.id)
                                    .replace(':volume', chapter.volume_number)
                                    .replace(':chapter', chapter.chapter_number)
                                 }
                                 className="flex flex-col gap-1.5 p-2 rounded-xl border border-transparent hover:border-blue-100 hover:bg-blue-50 transition-all"
                              >
                                 <div className="flex items-center justify-between gap-3 w-full">
                                    {/* Left Side: Badge + Title */}
                                    <div className="flex items-center gap-2 min-w-0">
                                       <span className="text-[9px] md:text-[10px] font-black text-blue-600 bg-blue-100/60 px-2 py-0.5 rounded-md shrink-0 border border-blue-200/50">
                                          V{chapter.volume_number} C{chapter.chapter_number}
                                       </span>
                                       
                                       <span className="text-xs font-bold text-slate-700 truncate group-hover:text-blue-700 transition-colors">
                                          {chapter.title || 'Untitled Chapter'}
                                       </span>
                                    </div>

                                    {/* Right Side: Timestamp */}
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter shrink-0 whitespace-nowrap bg-slate-50 px-1.5 py-0.5 rounded-md">
                                       {timeAgo(chapter.created_at)}
                                    </span>
                                 </div>
                              </NavLink>
                           ))}
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         ) : (
            /* ENHANCED EMPTY STATE */
            <div className="py-20 flex flex-col items-center justify-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100 shadow-inner">
               <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <EyeIcon className="w-8 h-8 text-slate-200" />
               </div>
               <p className="text-slate-400 font-black uppercase tracking-widest text-xs">
                  {t(LOCALIZE_CONST.NO_BOOKS_FOUND)}
               </p>
            </div>
         )}
      </div>
   );
};
