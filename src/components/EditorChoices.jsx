import { Card, Typography } from "@material-tailwind/react";
import { LOCALIZE_CONST } from "../consts/Consts";
import { useTranslation } from "react-i18next";

export const EditorChoices = ({ novel }) => {
   const { t } = useTranslation();

   return (
      /* h-[400px] locks the overall height of the card */
      <Card className="flex flex-col md:flex-row w-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-full group transition-all duration-300">
         
         {/* Image Section - Locked Width and Height */}
         <div className="relative w-full md:w-64 flex-shrink-0 h-full overflow-hidden">
            <img
               src={novel?.cover_image}
               alt={novel?.title}
               /* object-cover ensures image fills the box without stretching */
               className="w-full h-full object-fill transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest">
               Editor's Pick
            </div>
         </div>

         {/* Content Section */}
         <div className="flex flex-col p-6 w-full justify-between bg-white overflow-hidden">
            <div>
               <Typography className="text-xl font-black text-slate-800 mb-1 leading-tight line-clamp-2">
                  {novel?.title}
               </Typography>
               <Typography className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                  {t(LOCALIZE_CONST.DESCRIPTION)}
               </Typography>
               
               {/* line-clamp-6 prevents long text from making the card grow taller */}
               <Typography className="text-slate-600 text-sm leading-relaxed italic line-clamp-6">
                  "{novel?.description}"
               </Typography>
            </div>

            <div className="flex gap-2 flex-wrap mt-4">
               {novel?.categories?.slice(0, 3).map((cate) => (
                  <span key={cate?.id} className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-full uppercase border border-slate-200">
                     {cate?.name}
                  </span>
               ))}
            </div>
         </div>
      </Card>
   );
};