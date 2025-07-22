import { Card, Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { LOCALIZE_CONST, ROUTES } from "../consts/Consts";
import { useTranslation } from "react-i18next";


export const BookmarkNovel = ({ bookmark }) => {

   const { t } = useTranslation();

   return (
      <Card className="flex h-full w-full max-w-[48rem] flex-row shadow-lg">
         <Card.Header className="m-0 h-full w-2/5 shrink-0 rounded-r-none">
         <img
            src={bookmark?.cover_image}
            alt={bookmark?.title}
            className="h-full w-full object-cover"
         />
         </Card.Header>

         <Card.Body className="p-4 flex flex-col gap-4">
            <Typography
               type="small"
               className="font-bold uppercase font-poppins"
            >
               {bookmark?.title}
            </Typography>

            <Typography type="p" className="flex flex-row gap-2 items-center font-poppins">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                  <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                  <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clipRule="evenodd" />
               </svg>
               {bookmark?.view_count}
            </Typography>

            <Typography className="font-poppins text-foreground">
               {bookmark?.description}
            </Typography>

            <Link to={ ROUTES.NOVEL_BY_ID.replace(":id", bookmark?.id)}>
               <Button as="button" className="flex w-fit items-center gap-2">
                  { t(LOCALIZE_CONST.READ) }
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                     strokeWidth={2}
                     className="h-4 w-4"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                     />
                  </svg>
               </Button>
            </Link>
         </Card.Body>
      </Card>
   );
};
