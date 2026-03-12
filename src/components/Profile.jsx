import { Card, Typography } from "@material-tailwind/react";
import { NavLink } from "react-router-dom"; // Assuming you use this for navigation

export const Profile = ({ novel }) => {
   return (
      <div className="group cursor-pointer w-full">
         {/* Book Cover Container */}
         <Card className="relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
            
            {/* Status Badge - Made smaller/slimmer */}
            <div
               className={`absolute top-2 left-2 z-20 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-tighter rounded-md shadow-sm
                  ${novel?.status === 'completed'
                     ? 'bg-green-500 text-white'
                     : 'bg-amber-400 text-black'
                  }`}
            >
               {novel?.status}
            </div>

            {/* Image Section - Using 3/4 ratio to prevent "too long" look */}
            <div className="relative aspect-[3/4] overflow-hidden">
               <img
                  src={novel?.cover_image}
                  alt={novel?.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
               />
               
               {/* Soft inner shadow for depth */}
               <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.1)]" />
            </div>
         </Card>

         {/* Content Section - Reduced margins */}
         <div className="mt-2 px-0.5">
            <Typography 
               className="text-[13px] font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-700 transition-colors"
            >
               {novel?.title}
            </Typography>
            
            {/* Meta info - smaller and cleaner */}
            <div className="flex items-center gap-1.5 mt-1 opacity-60">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-3">
                  <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                  <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
               </svg>
               <span className="text-[10px] font-bold uppercase tracking-tight">{novel?.total_view_cnt} Reads</span>
            </div>
         </div>
      </div>
   );
};