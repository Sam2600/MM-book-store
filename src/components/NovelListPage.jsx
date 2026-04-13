import { NavLink } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';
import { Loader } from './Loader';
import { Profile } from './Profile';
import { ROUTES } from '../consts/Consts';

/**
 * Shared page layout for any list of novels.
 *
 * Props:
 *  icon        – React element shown in the badge area
 *  badge       – small label above the title  (e.g. "Browse by Genre")
 *  badgeColor  – tailwind color name: "blue" | "emerald" | "violet" …
 *  title       – main heading
 *  description – subtitle paragraph
 *  novels      – array of novel objects
 *  status      – "idle" | "pending" | "success" | "failed"
 *  emptyText   – message when there are no results
 *  sentinelRef – (optional) ref placed at the bottom for infinite scroll
 *  hasMore     – (optional) whether more pages exist
 */
export const NovelListPage = ({
   icon,
   badge,
   badgeColor = 'blue',
   title,
   description,
   novels = [],
   status,
   emptyText = 'No novels found.',
   sentinelRef,
   hasMore,
}) => {
   const colorMap = {
      blue:    { bg: 'bg-blue-50',    text: 'text-blue-600',    badge: 'text-blue-500'    },
      emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', badge: 'text-emerald-500' },
      violet:  { bg: 'bg-violet-50',  text: 'text-violet-600',  badge: 'text-violet-500'  },
   };
   const c = colorMap[badgeColor] ?? colorMap.blue;

   return (
      <div className="min-h-screen bg-gray-50/30">

         {/* Hero Header */}
         <div className="bg-white border-b border-gray-100 mb-10">
            <div className="w-11/12 mx-auto py-12 md:py-16">
               {(icon || badge) && (
                  <div className="flex items-center gap-3 mb-4">
                     {icon && (
                        <div className={`p-2 ${c.bg} rounded-lg ${c.text}`}>
                           {icon}
                        </div>
                     )}
                     {badge && (
                        <Typography className={`text-sm font-bold uppercase tracking-widest ${c.badge}`}>
                           {badge}
                        </Typography>
                     )}
                  </div>
               )}
               <Typography variant="h1" className="text-4xl md:text-5xl font-black text-slate-900">
                  {title}
               </Typography>
               {description && (
                  <Typography className="mt-4 text-slate-500 max-w-2xl font-medium">
                     {description}
                  </Typography>
               )}
            </div>
         </div>

         {/* Grid */}
         <div className="w-11/12 mx-auto pb-20">
            {status === 'pending' && novels.length === 0 ? (
               // <div className="flex justify-center py-20">
                  <Loader />
               // </div>
            ) : novels.length > 0 ? (
               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-10">
                  {novels.map((novel, idx) => (
                     <NavLink
                        key={`${novel.id}-${idx}`}
                        to={ROUTES.NOVEL_BY_ID.replace(':id', novel.id)}
                        className="group"
                     >
                        <div className="transition-transform duration-300 group-hover:-translate-y-2">
                           <Profile novel={novel} />
                        </div>
                     </NavLink>
                  ))}
               </div>
            ) : status === 'success' || status === 'failed' ? (
               <div className="text-center py-20">
                  <Typography variant="h5" color="blue-gray" className="mb-2">{emptyText}</Typography>
               </div>
            ) : null}

            {/* Infinite scroll sentinel (CategoryPage) */}
            {sentinelRef && (
               <div ref={sentinelRef} className="h-40 flex flex-col items-center justify-center mt-12 border-t border-gray-100">
                  {hasMore ? (
                     // <div className="flex flex-col items-center gap-4">
                        <Loader />
                     //    <Typography className="text-xs font-bold text-slate-400 animate-pulse uppercase tracking-tighter">
                     //       Fetching more stories...
                     //    </Typography>
                     // </div>
                  ) : novels.length > 0 && (
                     <EndOfList />
                  )}
               </div>
            )}

            {/* Static end-of-list (EndedNovelsPage) */}
            {!sentinelRef && novels.length > 0 && status === 'success' && (
               <EndOfList className="mt-16 border-t border-gray-100 pt-8" />
            )}
         </div>
      </div>
   );
};

const EndOfList = ({ className = '' }) => (
   <div className={`text-center ${className}`}>
      <div className="h-1 w-12 bg-slate-200 mx-auto mb-4 rounded-full" />
      <Typography className="text-sm font-bold text-slate-400 uppercase tracking-widest">
         End of the list
      </Typography>
   </div>
);
