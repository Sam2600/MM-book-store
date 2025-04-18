import { Breadcrumb } from "@material-tailwind/react";
import {
   Cube,
   CursorPointer,
   MultiplePages,
   NavArrowRight,
} from "iconoir-react";

export const Breadcrumber = () => {
   return (
      <Breadcrumb className="gap-0.5">

         <Breadcrumb.Link
            href="#"
            className="rounded bg-secondary px-2 py-1 text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
            >
            <MultiplePages className="h-4 w-4" />
            Home
         </Breadcrumb.Link>

         <Breadcrumb.Separator>
            <NavArrowRight className="h-4 w-4 stroke-2" />
         </Breadcrumb.Separator>

         <Breadcrumb.Link
            href="#"
            className="rounded bg-secondary px-2 py-1 text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
         >
            <Cube className="h-4 w-4" />
            Novel
         </Breadcrumb.Link>

         <Breadcrumb.Separator>
            <NavArrowRight className="h-4 w-4 stroke-2" />
         </Breadcrumb.Separator>

         <Breadcrumb.Link
            href="#"
            className="rounded bg-primary px-2 py-1 text-primary-foreground hover:bg-primary hover:text-primary-foreground"
         >
            <CursorPointer className="h-4 w-4 rotate-90" />
            Chapter
         </Breadcrumb.Link>

      </Breadcrumb>
   );
}
