import { memo } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { toHumanReadableDates } from "../functions/helpers";
import { Calendar, User, Eye } from "iconoir-react"; // Matching your previous icon set

export const LatestNovel = memo(({ novel }) => {
   return (
      <Card className="w-full flex flex-row items-center gap-4 p-2.5 border border-slate-100 bg-white backdrop-blur-sm shadow-none hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-100 transition-all duration-300 group overflow-hidden rounded-2xl">
         
         {/* Small Book Cover with Glow Effect */}
         <div className="relative flex-shrink-0 w-16 h-20 overflow-hidden rounded-xl shadow-sm border border-slate-100">
            <img
               src={novel?.cover_image}
               alt={novel?.title}
               loading="lazy"
               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            {/* Soft Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
         </div>

         {/* Content Area */}
         <div className="flex flex-col flex-1 min-w-0 pr-2">
            {/* Title - Increased weight and better spacing */}
            <Typography className="font-black text-slate-900 text-[13px] font-poppins line-clamp-1 leading-tight group-hover:text-blue-600 transition-colors tracking-tight">
               {novel?.title}
            </Typography>

            {/* Translator Name with Icon */}
            <div className="flex items-center gap-1 mt-0.5 mb-1.5 text-slate-400">
               <User className="w-2.5 h-2.5" />
               <Typography className="text-[10px] font-bold uppercase tracking-wider truncate">
                  {novel?.translator?.name || "Anonymous"}
               </Typography>
            </div>

            {/* Bottom Meta Bar */}
            <div className="flex items-center justify-between mt-auto pt-1 border-t border-slate-50">
               <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-1 text-blue-500">
                     <Eye className="w-3 h-3 stroke-[2.5]" />
                     <span className="text-[10px] font-black">{novel?.view_count}</span>
                  </div>
                  <span className="h-1 w-1 rounded-full bg-slate-200" />
                  <div className="flex items-center gap-1 text-slate-400">
                     <Calendar className="w-3 h-3" />
                     <span className="text-[9px] font-bold uppercase tracking-tight">
                        {novel?.created_at && toHumanReadableDates(novel?.created_at)}
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </Card>
   );
});