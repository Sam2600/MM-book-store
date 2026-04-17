import { memo } from "react";
import { Card, Typography } from "@material-tailwind/react";

export const Profile = memo(({ novel }) => {
   return (
      <div className="group cursor-pointer w-full">
         {/* Book Cover Container */}
         <Card className="relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
            
            {/* Status Badge - Made smaller/slimmer */}
            <div
               className={`absolute top-0 left-0 z-10 px-3 py-1 rounded-br-xl font-poppins shadow-lg
                  ${novel?.status === 'completed'
                     ? 'bg-gradient-to-r from-green-600 to-emerald-400 text-white'
                     : 'bg-gradient-to-r from-amber-500 to-orange-300 text-white'
                  }`}
            >
               <Typography className="text-[8px] font-black uppercase tracking-widest">
                  {novel?.status}
               </Typography>
            </div>

            {/* Image Section - Using 3/4 ratio to prevent "too long" look */}
            <div className="relative aspect-[3/4] overflow-hidden">
               <img
                  src={novel?.cover_image}
                  alt={novel?.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
               />
               
               {/* Soft inner shadow for depth */}
               <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.1)]" />
            </div>
         </Card>

         {/* Content Section - Reduced margins */}
         <div className="mt-2 px-0.5">
            <Typography 
               className="text-[13px] font-bold text-gray-900 line-clamp-1 leading-tight group-hover:text-blue-700 transition-colors"
            >
               {novel?.title}
            </Typography>
            
            {/* Meta info - Premium Tag Style */}
            <div className="flex items-center mt-3 bg-slate-100 rounded-2xl p-1 border border-slate-200/50">
               {/* Views Section */}
               <div className="flex-1 flex items-center justify-center gap-1.5 py-1">
                  <div className="p-1 bg-white rounded-lg shadow-sm">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-blue-500">
                        <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                        <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clipRule="evenodd" />
                     </svg>
                  </div>
                  <span className="text-[10px] font-black text-slate-600 tracking-tighter">
                     {Number(novel?.total_view_cnt ?? 0).toLocaleString()} READS
                  </span>
               </div>

               {/* Vertical Separator */}
               <div className="w-[1px] h-4 bg-slate-200"></div>

               {/* Rating Section */}
               <div className="flex-1 flex items-center justify-center gap-1.5 py-1">
                  <div className="p-1 bg-white rounded-lg shadow-sm">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-amber-500">
                        <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
                     </svg>
                  </div>
                  <span className="text-[10px] font-black text-slate-600 tracking-tighter">
                     {novel?.average_rating ? Number.parseFloat(novel.average_rating).toFixed(1) : "0.0"}
                  </span>
               </div>
            </div>
         </div>
      </div>
   );
});