import { Breadcrumb } from "@material-tailwind/react";
import {
   Book,
   Home,
   Page,
} from "iconoir-react";
import { NavLink } from "react-router-dom";
import { LOCALIZE_CONST, ROUTES } from "../consts/Consts";
import { useTranslation } from "react-i18next";

export const Breadcrumber = ({ novel_id }) => {
   
   const { t } = useTranslation();

   return (
      <Breadcrumb className="gap-2">

         <Breadcrumb.Link
            as={NavLink}
            to={ROUTES.HOME}
            className="rounded bg-primary px-2 py-1 text-primary-foreground border border-transparent hover:bg-white hover:text-primary hover:shadow-lg hover:border hover:border-slate-400"
         >
            <Home className="h-4 w-4" />
            {t(LOCALIZE_CONST.HOME)}
         </Breadcrumb.Link>

         <Breadcrumb.Separator />

         <Breadcrumb.Link
            as={NavLink}
            to={ROUTES.NOVEL_BY_ID.replace(":id", novel_id)}
            className="rounded px-2 py-1 bg-primary text-primary-foreground border border-transparent hover:bg-white hover:text-primary hover:shadow-lg hover:border hover:border-slate-400"
         >
            <Book className="h-4 w-4" />
            {t(LOCALIZE_CONST.NOVEL)}
         </Breadcrumb.Link>

         <Breadcrumb.Separator />

         <Breadcrumb.Link
            className="rounded bg-white px-2 py-1 text-primary border border-slate-400 shadow-lg"
         >
            <Page className="h-4 w-4 stroke-2"/>
            {t(LOCALIZE_CONST.CHAPTER)}
         </Breadcrumb.Link>

      </Breadcrumb>
   );
}
