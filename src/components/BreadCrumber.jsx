import { Breadcrumb } from "@material-tailwind/react";
import {
   Book,
   Home,
   Page,
} from "iconoir-react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../consts/Consts";

export const Breadcrumber = ({novel_id}) => {
   return (
      <Breadcrumb className="gap-2">

         <Breadcrumb.Link
            as={NavLink}
            to={ROUTES.HOME}
            className="rounded bg-primary px-2 py-1 text-primary-foreground border border-transparent hover:bg-white hover:text-primary hover:shadow-lg hover:border hover:border-slate-400"
         >
            <Home className="h-4 w-4" />
            Home
         </Breadcrumb.Link>

         <Breadcrumb.Separator />

         <Breadcrumb.Link
            as={NavLink}
            to={ROUTES.NOVEL_BY_ID.replace(":id", novel_id)}
            className="rounded px-2 py-1 bg-primary text-primary-foreground border border-transparent hover:bg-white hover:text-primary hover:shadow-lg hover:border hover:border-slate-400"
         >
            <Book className="h-4 w-4" />
            Novel
         </Breadcrumb.Link>

         <Breadcrumb.Separator />

         <Breadcrumb.Link
            className="rounded bg-white px-2 py-1 text-primary border border-slate-400 shadow-lg"
         >
            <Page className="h-4 w-4 stroke-2"/>
            Chapter
         </Breadcrumb.Link>

      </Breadcrumb>
   );
}
