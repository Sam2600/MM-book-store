import { Dialog, Typography, Button, Card, Avatar, IconButton } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { LOCALIZE_CONST, ROUTES } from "../consts/Consts";
import { useTranslation } from "react-i18next";
import { api } from "../axios/axios";
import { useDispatch } from "react-redux";
import { removeBookMark } from "../states/features/user/userSlice";
import { useState } from "react";
import { Xmark } from "iconoir-react";


export const BookmarkNovel = ({ bookmark }) => {

   const { t } = useTranslation();

   const dispatch = useDispatch();

   // 2. State to handle Modal visibility
   const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(!open)

   const handleRemove = async (id) => {
      
      try {

         const response = await api.patch(`/novels/bookmarks/${id}`);

         if (response.data.status == "OK") {
            console.log("Bookmark removed successfully");
            dispatch(removeBookMark(id));
            setOpen(false); // Close modal on success
         }

      } catch (error) {
         alert("Internal Server Error. Please try again later.");
         console.error("Error bookmarking novel:", error);
      }
   }

   return (
      <Card className="flex h-full w-full max-w-[48rem] flex-row shadow-lg">
         <Card.Header className="m-0 h-auto w-auto shrink-0 rounded-r-none">
            <Avatar
               className="w-32 h-36 object-fill"
               shape="rounded"
               src={bookmark?.cover_image}
               alt={bookmark?.title}
            />
         </Card.Header>

         <Card.Body className="flex flex-col h-auto justify-between">
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

            {/* <Typography className="font-poppins text-foreground">
               {bookmark?.description}
            </Typography> */}

            <div className="flex gap-3">
               <Link to={ ROUTES.NOVEL_BY_ID.replace(":id", bookmark?.id)}>
                  <Button as="button" className="flex w-fit items-center gap-2">
                     { t(LOCALIZE_CONST.READ) }
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                     </svg>
                  </Button>
               </Link>

               <Button as="button" onClick={handleOpen} className="flex bg-inherit text-gray-900 w-fit items-center gap-2 hover:bg-[#EEEEEE]">
                  { t(LOCALIZE_CONST.REMOVE) }
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="red" className="size-5">
                     <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
               </Button>
            </div>
         </Card.Body>

         <Dialog open={open} onOpenChange={setOpen}>
            <Dialog.Overlay>
               <Dialog.Content className="p-6">
                  <div className="flex items-center justify-between mb-4">
                     <Typography type="h6">
                        Are you sure you want to delete?
                     </Typography>
                     <Dialog.DismissTrigger as={IconButton} size="sm" variant="ghost" isCircular onClick={handleOpen}>
                        <Xmark className="h-5 w-5" />
                     </Dialog.DismissTrigger>
                  </div>
                  <div className="flex justify-end gap-3">
                     <Dialog.DismissTrigger as={Button} variant="ghost" color="secondary">
                        No
                     </Dialog.DismissTrigger>
                     <Button 
                        color="amber" 
                        onClick={() => {
                           handleRemove(bookmark?.id);
                           setOpen(false); // Close after action
                        }}
                     >
                        Yes
                     </Button>
                  </div>
               </Dialog.Content>
            </Dialog.Overlay>
         </Dialog>
      </Card>
   );
};
