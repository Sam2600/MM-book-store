import { Breadcrumb, Typography } from "@material-tailwind/react";
import { Book, Home, Page, NavArrowRight } from "iconoir-react";
import { NavLink } from "react-router-dom";
import { LOCALIZE_CONST, ROUTES } from "../consts/Consts";
import { useTranslation } from "react-i18next";

export const Breadcrumber = ({ novel_id }) => {
   const { t } = useTranslation();

   // Standard style for the links
   const linkStyle = "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-300 font-medium text-xs border border-transparent hover:border-blue-100";
   
   // Style for the active/current item
   const activeStyle = "flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-sm text-slate-900 font-bold text-xs";

   return (
      <Breadcrumb 
         className="bg-transparent p-0"
         separator={<NavArrowRight className="h-4 w-4 text-slate-300" />}
      >
         {/* Home Link */}
         <Breadcrumb.Link
            as={NavLink}
            to={ROUTES.HOME}
            className={linkStyle}
         >
            <Home className="h-3.5 w-3.5" />
            <Typography className="text-inherit font-bold uppercase tracking-wider text-[10px]">
               {t(LOCALIZE_CONST.HOME)}
            </Typography>
         </Breadcrumb.Link>

         {/* Novel Link */}
         <Breadcrumb.Link
            as={NavLink}
            to={ROUTES.NOVEL_BY_ID.replace(":id", novel_id)}
            className={linkStyle}
         >
            <Book className="h-3.5 w-3.5" />
            <Typography className="text-inherit font-bold uppercase tracking-wider text-[10px]">
               {t(LOCALIZE_CONST.NOVEL)}
            </Typography>
         </Breadcrumb.Link>

         {/* Current Chapter (Non-clickable) */}
         <Breadcrumb.Link className={activeStyle}>
            <Page className="h-3.5 w-3.5 text-blue-600 stroke-[2.5]" />
            <Typography className="text-inherit font-bold uppercase tracking-wider text-[10px]">
               {t(LOCALIZE_CONST.CHAPTER)}
            </Typography>
         </Breadcrumb.Link>
      </Breadcrumb>
   );
}