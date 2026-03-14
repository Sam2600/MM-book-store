import { Typography } from "@material-tailwind/react";
import { useTranslation } from 'react-i18next';
import { LOCALIZE_CONST, ROUTES } from "../consts/Consts";
import { NavLink } from "react-router-dom";
import { DoubleCheck, FastArrowRight } from "iconoir-react";

export const Categories = ({ categories }) => {
   
   const { t } = useTranslation();

   return (
      <div className="w-[98%] mx-auto mt-12 mb-20">
         {/* Section Header */}
         <div className="flex items-center justify-between px-2">
            <div className="flex items-center justify-between mb-8 px-2 border-l-4 border-blue-600">
               <h2 className="text-2xl font-black text-slate-800 tracking-tight pl-3">
                  {t(LOCALIZE_CONST.CATEGORIES)}
               </h2>
               {/* <NavLink 
                  to={ROUTES.BROWSE} // Replace with your actual browse route
                  className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-widest"
               >
                  View All
               </NavLink> */}
            </div>
            <Typography className="text-xs font-bold text-slate-400 uppercase tracking-widest hidden md:block">
               Explore by Genre
            </Typography>
         </div>

         {/* Categories Grid */}
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories?.length > 0 && categories?.map((category) => (
               <NavLink 
                  onClick={() => localStorage.setItem("CATEGORY_NAME", category?.name)} 
                  key={category?.id} 
                  to={ROUTES.NOVELS_BY_CATEGORY.replace(":category", category?.id)}
                  className="group"
               >
                  <div className="relative overflow-hidden flex items-center justify-between px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:border-blue-500/50 group-hover:bg-blue-50/30 dark:group-hover:bg-blue-900/10">
                     
                     {/* Background Decoration */}
                     <div className="absolute -right-2 -bottom-2 opacity-5 transition-transform duration-500 group-hover:scale-150 group-hover:rotate-12 text-slate-900 dark:text-white">
                        <DoubleCheck className="h-16 w-16" />
                     </div>

                     <Typography className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors z-10">
                        {category?.name}
                     </Typography>

                     <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all z-10">
                        <FastArrowRight className="h-3.5 w-3.5" />
                     </div>
                  </div>
               </NavLink>
            ))}
         </div>
      </div>
   );
};
