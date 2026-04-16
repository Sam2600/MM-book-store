import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@material-tailwind/react';
import { Trophy } from 'iconoir-react';
import {
   getNovels,
   getAllNovelsStatus,
} from '../states/features/novel/novelSlice';
import { Loader } from '../components/Loader';
import { Profile } from '../components/Profile';
import { ROUTES } from '../consts/Consts';
import { scrollToTop } from '../functions/helpers';

const TABS = [
   { key: 'popular_all_time', label: 'All Time' },
   { key: 'popular_week',     label: 'This Week' },
   { key: 'popular_month',    label: 'This Month' },
];

const rankColor = (rank) => {
   if (rank === 1) return 'bg-amber-400 text-white';
   if (rank === 2) return 'bg-slate-400 text-white';
   if (rank === 3) return 'bg-amber-700 text-white';
   return 'bg-slate-100 text-slate-500';
};

export const RankingsPage = () => {
   const dispatch = useDispatch();
   const [activeTab, setActiveTab] = useState('popular_all_time');

   const novelsData = useSelector((state) => state.novel.novels);
   const status     = useSelector(getAllNovelsStatus);

   useEffect(() => {
      scrollToTop();
      if (!novelsData || Object.keys(novelsData).length === 0) {
         dispatch(getNovels());
      }
   }, [dispatch, novelsData]);

   const novels = novelsData?.[activeTab] ?? [];

   return (
      <div className="min-h-screen bg-gray-50/30">
         {/* Hero Header */}
         <div className="bg-white border-b border-gray-100 mb-10">
            <div className="w-11/12 mx-auto py-12 md:py-16">
               <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-amber-50 rounded-lg text-amber-500">
                     <Trophy className="h-5 w-5" />
                  </div>
                  <Typography className="text-sm font-bold uppercase tracking-widest text-amber-500">
                     Top Novels
                  </Typography>
               </div>
               <Typography variant="h1" className="text-4xl md:text-5xl font-black text-slate-900">
                  Rankings
               </Typography>
               <Typography className="mt-4 text-slate-500 max-w-2xl font-medium">
                  The most-read novels on the platform, ranked by total views.
               </Typography>
            </div>
         </div>

         {/* Tab Bar */}
         <div className="w-11/12 mx-auto mb-8">
            <div className="flex gap-1 bg-white border border-gray-100 rounded-xl p-1 w-fit shadow-sm">
               {TABS.map((tab) => (
                  <button
                     key={tab.key}
                     onClick={() => setActiveTab(tab.key)}
                     className={`px-5 py-2 rounded-lg text-sm font-bold transition-all duration-200
                        ${activeTab === tab.key
                           ? 'bg-blue-600 text-white shadow-sm'
                           : 'text-slate-500 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                  >
                     {tab.label}
                  </button>
               ))}
            </div>
         </div>

         {/* Content */}
         <div className="w-11/12 mx-auto pb-20">
            {status === 'pending' ? (
               <Loader />
            ) : novels.length > 0 ? (
               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-10">
                  {novels.map((novel, idx) => (
                     <NavLink
                        key={novel.id}
                        to={ROUTES.NOVEL_BY_ID.replace(':id', novel.id)}
                        className="group relative"
                     >
                        {/* Rank badge */}
                        <div className={`absolute top-2 right-2 z-30 h-7 w-7 rounded-full flex items-center justify-center text-xs font-black shadow-md ${rankColor(idx + 1)}`}>
                           {idx + 1}
                        </div>
                        <div className="transition-transform duration-300 group-hover:-translate-y-2">
                           <Profile novel={novel} />
                        </div>
                     </NavLink>
                  ))}
               </div>
            ) : status === 'success' || status === 'failed' ? (
               <div className="text-center py-20">
                  <Typography variant="h5" color="blue-gray">No rankings available yet.</Typography>
               </div>
            ) : null}
         </div>
      </div>
   );
};
