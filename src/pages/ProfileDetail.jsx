import { Twitter, Facebook, Instagram, Globe, Telegram } from 'iconoir-react';
import { DEFAULT_IMG_CHAR, ROUTES } from '../consts/Consts';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthorInfoAndBooks, getAuthorInfoAndBooksStatus, getAuthorInfoAndNovels } from '../states/features/user/userSlice';
import { capitalizeFirstLetter, scrollToTop } from '../functions/helpers';
import { NavLink, useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';

export const ProfileDetail = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const author = useSelector(getAuthorInfoAndBooks);
   const authorInfoAndBooksStatus = useSelector(getAuthorInfoAndBooksStatus);

   useEffect(() => {
      scrollToTop();
      dispatch(getAuthorInfoAndNovels(id));
   }, [id, dispatch]);

   if (authorInfoAndBooksStatus === 'pending') return <Loader />;

   return (
      <div className="min-h-screen pb-20">
         {/* Top Hero Section / Profile Header */}
         <div className="relative h-48 bg-gradient-to-r from-slate-800 to-slate-900 w-full mb-20">
            <div className="container mx-auto px-4 relative top-24">
               <div className="bg-white/80 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-center md:items-end gap-6">
                  {/* Author Avatar with Ring */}
                  <div className="relative -mt-16 md:mt-0">
                     <div className="w-32 h-32 rounded-2xl bg-slate-700 flex items-center justify-center text-5xl font-bold text-white shadow-2xl border-4 border-white overflow-hidden">
                        {author?.name ? (
                           <img 
                              src={DEFAULT_IMG_CHAR.replace(":char", author.name.charAt(0))} 
                              alt={author.name}
                              className="w-full h-full object-cover"
                           />
                        ) : "K"}
                     </div>
                  </div>

                  {/* Author Info */}
                  <div className="flex-1 text-center md:text-left pb-2">
                     <h1 className="text-3xl font-black text-slate-800 tracking-tight">
                        {capitalizeFirstLetter(author?.name || "Author Name")}
                     </h1>
                     <p className="text-slate-500 font-medium italic mt-1">
                        "An author who translates high-quality light novels"
                     </p>
                  </div>

                  {/* Optional: Social Badges */}
                  <div className="flex gap-3 pb-2">
                     <button className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all">
                        <Twitter size={20} />
                     </button>
                     <button className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-all">
                        <Telegram size={20} />
                     </button>
                  </div>
               </div>
            </div>
         </div>

         {/* Grid Section */}
         <div className="container mx-auto px-4 mt-32 max-w-6xl">
            <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
               <h2 className="text-2xl font-bold text-slate-800">
                  Published Novels
                  <span className="ml-3 text-sm font-normal text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                     {author?.novels?.length || 0} Books
                  </span>
               </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
               {author?.novels?.map((novel) => (
                  <NavLink
                     to={ROUTES.NOVEL_BY_ID.replace(":id", novel?.id)}
                     key={novel?.id}
                     className="group flex flex-col transition-all duration-300 transform hover:-translate-y-2"
                  >
                     {/* Book Cover Container */}
                     <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-md group-hover:shadow-2xl transition-all duration-300">
                        <img
                           src={novel?.cover_image}
                           alt={novel?.title}
                           className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                           <span className="text-white text-xs font-medium uppercase tracking-wider">Read Now →</span>
                        </div>
                     </div>

                     {/* Book Details */}
                     <div className="mt-4">
                        <h3 className="text-md font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                           {novel?.title}
                        </h3>
                        <div className="flex flex-wrap gap-1 mt-2">
                           {novel?.categories?.slice(0, 2).map((cate) => (
                              <span
                                 key={cate?.id}
                                 className="bg-slate-200 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter"
                              >
                                 {cate?.name}
                              </span>
                           ))}
                        </div>
                     </div>
                  </NavLink>
               ))}
            </div>
         </div>
      </div>
   );
};