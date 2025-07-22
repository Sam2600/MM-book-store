import { Typography } from "@material-tailwind/react";
import { FOOTER_LINKS } from "../consts/Consts.js";
import { useTranslation } from "react-i18next";
import { LOCALIZE_CONST } from "../consts/Consts.js";

const YEAR = new Date().getFullYear();

export const Footer = () => {

   const { t } = useTranslation();

   return (
      <footer className="mx-auto w-full px-4 py-6 relative">
         <hr className="my-4 border-slate-900" />
         <div className="flex w-full flex-row flex-wrap items-center justify-center gap-x-12 gap-y-3 text-center md:justify-between">
         <Typography className="text-center text-slate-800">
            &copy; {YEAR} {t(LOCALIZE_CONST.APP_NAME)}
         </Typography>
         <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {FOOTER_LINKS.map(({ title, href }, key) => (
               <li key={key}>
               <Typography 
                  as="a" 
                  href={href} 
                  className="hover:text-primary transition-all duration-100 ease-in-out hover:underline "
                  style={{
                     textShadow: '0 0 1px rgba(0,0,0,0.1)',
                     '&:hover': {
                     textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                     }
                  }}
               >
                  {t(title)}
               </Typography>
               </li>
            ))}
         </ul>
         </div>
      </footer>
   );
};