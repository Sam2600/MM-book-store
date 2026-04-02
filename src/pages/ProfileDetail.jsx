import { Twitter, Telegram } from 'iconoir-react';
import { DEFAULT_IMG_CHAR, ROUTES } from '../consts/Consts';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthorInfoAndBooks, getAuthorInfoAndBooksStatus, getAuthorInfoAndNovels } from '../states/features/user/userSlice';
import { capitalizeFirstLetter, scrollToTop } from '../functions/helpers';
import { NavLink, useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { BookOpenIcon, UserIcon } from '@heroicons/react/24/outline';

export const ProfileDetail = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const author = useSelector(getAuthorInfoAndBooks);
   const status = useSelector(getAuthorInfoAndBooksStatus);

   useEffect(() => {
      scrollToTop();
      dispatch(getAuthorInfoAndNovels(id));
   }, [id, dispatch]);

   if (status === 'pending') return <Loader />;

   return (
      <div className="min-h-screen bg-[#F8FAFC] pb-20">
         {/* COMPACT HEADER SECTION */}
         <div className="bg-white border-b border-slate-100 py-8 shadow-sm">
            <div className="container mx-auto px-4 lg:px-8">
               <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  
                  {/* Left Side: Avatar + Identity */}
                  <div className="flex flex-col md:flex-row items-center gap-6">
                     <div className="relative shrink-0">
                        <div className="w-24 h-24 md:w-28 md:h-28 rounded-[2rem] bg-slate-900 p-1 shadow-xl shadow-slate-200">
                           <img 
                              src={DEFAULT_IMG_CHAR.replace(":char", author?.name?.charAt(0) || 'A')} 
                              alt=""
                              className="w-full h-full object-cover rounded-[1.8rem]"
                           />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1.5 rounded-xl border-4 border-white">
                           <UserIcon className="w-4 h-4" />
                        </div>
                     </div>

                     <div className="text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                           <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                              {capitalizeFirstLetter(author?.name || "Author")}
                           </h1>
                           <span className="w-fit mx-auto md:mx-0 bg-blue-50 text-blue-600 text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-lg border border-blue-100">
                              Verified
                           </span>
                        </div>
                        <p className="text-slate-400 text-xs font-bold max-w-md leading-relaxed italic line-clamp-2">
                           "Crafting worlds and translating high-quality light novels for the community."
                        </p>
                     </div>
                  </div>

                  {/* Right Side: Stats & Socials in one row */}
                  {/* <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 p-2 rounded-[1.5rem] border border-slate-100">
                     <div className="flex items-center gap-6 px-4">
                        <div className="text-center">
                           <p className="text-base font-black text-slate-900">{author?.novels?.length || 0}</p>
                           <p className="text-[8px] font-black uppercase text-slate-400 tracking-tighter">Works</p>
                        </div>
                        <div className="w-[1px] h-6 bg-slate-200"></div>
                        <div className="text-center">
                           <p className="text-base font-black text-slate-900">1.2k</p>
                           <p className="text-[8px] font-black uppercase text-slate-400 tracking-tighter">Fans</p>
                        </div>
                     </div>
                     
                     <div className="flex gap-1.5 bg-white p-1.5 rounded-xl shadow-sm">
                        <button className="p-2 text-slate-400 hover:text-blue-500 transition-colors">
                           <Twitter size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-sky-500 transition-colors">
                           <Telegram size={16} />
                        </button>
                     </div>
                  </div> */}

               </div>
            </div>
         </div>

         {/* NOVELS GRID */}
         <div className="container mx-auto px-4 lg:px-8 mt-10">
            <div className="flex items-center gap-3 mb-8">
               <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
               <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">Library</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-5 gap-y-8">
               {author?.novels?.map((novel) => (
                  <NavLink
                     to={ROUTES.NOVEL_BY_ID.replace(":id", novel?.id)}
                     key={novel?.id}
                     className="group flex flex-col transition-all duration-300"
                  >
                     <div className="relative aspect-[2/3] rounded-[1.5rem] overflow-hidden shadow-sm group-hover:shadow-xl group-hover:shadow-blue-500/10 group-hover:-translate-y-1 transition-all duration-300 border border-slate-100 bg-white">
                        <img
                           src={novel?.cover_image}
                           alt={novel?.title}
                           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                     </div>

                     <div className="mt-3">
                        <h3 className="text-[13px] font-black text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors leading-tight uppercase">
                           {novel?.title}
                        </h3>
                        <div className="flex items-center justify-between mt-2">
                           <span className="text-[9px] font-black text-slate-400 uppercase">
                              {novel?.view_count || 0} Views
                           </span>
                           <span className="bg-slate-100 text-slate-500 text-[8px] font-black px-1.5 py-0.5 rounded uppercase">
                              {novel?.categories?.slice(0, 3)?.map((cat) => cat?.name)?.join(", ") || "Uncategorized"}
                           </span>
                        </div>
                     </div>
                  </NavLink>
               ))}
            </div>
         </div>
      </div>
   );
};