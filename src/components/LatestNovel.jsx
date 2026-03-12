import { Card, Typography } from "@material-tailwind/react";
import { toHumanReadableDates } from "../functions/helpers";

export const LatestNovel = ({ novel }) => {
   return (
      <Card className="w-full h-full flex flex-row items-center gap-4 p-3 border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all group overflow-hidden">
         {/* Small Book Cover */}
         <div className="relative flex-shrink-0 w-16 h-20 overflow-hidden rounded-lg shadow-sm">
            <img
               src={novel?.cover_image}
               alt={novel?.title}
               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
         </div>

         {/* Content */}
         <div className="flex flex-col flex-1 min-w-0">
            <Typography className="font-bold text-slate-800 text-sm line-clamp-1 group-hover:text-blue-600 transition-colors">
               {novel?.title}
            </Typography>
            <Typography className="text-[11px] text-slate-500 mb-1">
               by {novel?.translator?.name || "Unknown Author"}
            </Typography>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
               <div className="flex items-center gap-1 text-slate-600">
                  <span className="text-[10px] font-bold">{novel?.view_count} views</span>
               </div>
               <div className="flex items-center gap-1 text-slate-400">
                  <span className="text-[10px]">{novel?.created_at && toHumanReadableDates(novel?.created_at)}</span>
               </div>
            </div>
         </div>
      </Card>
   );
};