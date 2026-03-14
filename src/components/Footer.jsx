import { Typography } from "@material-tailwind/react";
import { FOOTER_LINKS, LOCALIZE_CONST } from "../consts/Consts.js";
import { useTranslation } from "react-i18next";
import { Facebook, Instagram, Twitter, Bbq } from "iconoir-react"; // Or your preferred icon library

const YEAR = new Date().getFullYear();

export const Footer = () => {
   const { t } = useTranslation();

   return (
      <footer className="w-full bg-slate-50/50 dark:bg-[#0f172a] border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
         <div className="mx-auto max-w-7xl px-8 py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
               
               {/* Brand Section */}
               <div className="flex flex-col items-center md:items-start gap-4">
                  <div className="flex items-center gap-2">
                     <div className="h-6 w-6 bg-blue-600 rounded-lg shadow-blue-500/20 shadow-lg" />
                     <Typography className="text-xl font-black tracking-tighter text-slate-900 dark:text-white uppercase font-poppins">
                        {t(LOCALIZE_CONST.APP_NAME)}
                     </Typography>
                  </div>
                  <Typography className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-[250px] text-center md:text-left leading-relaxed">
                     Your premium gateway to the finest digital literature and immersive storytelling.
                  </Typography>
               </div>

               {/* Navigation Links */}
               <div className="flex flex-col items-center md:items-end gap-6">
                  <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
                     {FOOTER_LINKS.map(({ title, href }, key) => (
                        <li key={key}>
                           <Typography 
                              as="a" 
                              href={href} 
                              className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 relative group"
                           >
                              {t(title)}
                              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                           </Typography>
                        </li>
                     ))}
                  </ul>

                  {/* Social Icons - Adds a premium touch */}
                  <div className="flex items-center gap-4 text-slate-400">
                     <Facebook className="h-5 w-5 hover:text-blue-600 cursor-pointer transition-colors" />
                     <Twitter className="h-5 w-5 hover:text-blue-400 cursor-pointer transition-colors" />
                     <Instagram className="h-5 w-5 hover:text-pink-500 cursor-pointer transition-colors" />
                  </div>
               </div>
            </div>

            {/* Bottom Copyright Section */}
            <div className="mt-12 pt-8 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col md:flex-row justify-between items-center gap-4">
               <Typography className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                  &copy; {YEAR} {t(LOCALIZE_CONST.APP_NAME)} &bull; All Rights Reserved
               </Typography>
               <div className="flex gap-4">
                  <Typography className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase">Privacy</Typography>
                  <Typography className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase">Terms</Typography>
               </div>
            </div>
         </div>
      </footer>
   );
};