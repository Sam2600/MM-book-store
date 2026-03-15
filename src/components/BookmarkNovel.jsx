import { 
   Dialog, 
   Typography, 
   Button, 
   Card, 
   CardHeader, 
   CardBody, 
   IconButton, 
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { LOCALIZE_CONST, ROUTES } from "../consts/Consts";
import { useTranslation } from "react-i18next";
import { api } from "../axios/axios";
import { useDispatch } from "react-redux";
import { removeBookMark } from "../states/features/user/userSlice";
import { useState } from "react";
import { Eye, BookStack, Trash } from "iconoir-react";

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
      <>
         <Card className="flex h-44 w-full flex-row overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl group">
            <CardHeader className="m-0 w-32 shrink-0 rounded-none overflow-hidden">
               <img alt={bookmark?.title} src={bookmark?.cover_image} className="h-full w-full object-cover transition-transform group-hover:scale-110" />
            </CardHeader>

            <CardBody className="flex flex-col flex-1 p-5 gap-5 justify-between">
               <div className="flex flex-col gap-5">
                  <Typography type="h6" color="blue-gray" className="font-black uppercase font-poppins">
                     {bookmark?.title}
                  </Typography>

                  <div className="flex items-center gap-3">
                     <div className="flex items-center gap-1.5 text-slate-400">
                        <Eye className="h-4 w-4" />
                        <Typography className="text-xs font-bold">{bookmark?.view_count}</Typography>
                     </div>
                     <div className="h-1 w-1 rounded-full bg-slate-200" />
                     <Typography className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">
                        ID: #{bookmark?.id}
                     </Typography>
                  </div>
               </div>

               <div className="flex gap-3">
                  <Link to={ROUTES.NOVEL_BY_ID.replace(":id", bookmark?.id)} className="">
                     <Button 
                        size="sm"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-2.5 font-bold text-[10px] uppercase tracking-widest shadow-none hover:bg-blue-600 active:scale-95"
                     >
                        <BookStack className="h-3.5 w-3.5" />
                        {t(LOCALIZE_CONST.READ)}
                     </Button>
                  </Link>

                  <IconButton
                     type="button" 
                     color="red" 
                     onClick={handleOpen}
                     className="rounded-xl bg-red-50 text-red-500 hover:bg-red-100"
                  >
                     <Trash className="h-4 w-4" />
                  </IconButton>
               </div>
            </CardBody>
         </Card>

         <Dialog open={open} onOpenChange={setOpen}>
            <Dialog.Overlay className="fixed inset-0 z-[9999] grid place-items-center bg-black/40 backdrop-blur-sm">
               <Dialog.Content className="w-full max-w-xs rounded-3xl bg-white p-8 shadow-2xl">
                  <div className="flex flex-col items-center text-center">
                     <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                        <Trash className="h-8 w-8 text-red-500" />
                     </div>
                        
                     <Typography className="mb-1 text-xl font-black text-slate-900 font-poppins">
                        Remove?
                     </Typography>
                     <Typography className="mb-8 text-sm font-medium text-slate-500">
                        Delete <span className="font-bold text-slate-800">"{bookmark?.title}"</span>?
                     </Typography>

                     <div className="flex w-full gap-3">
                        <Dialog.DismissTrigger as={Button} className="flex-1 rounded-xl bg-slate-100 py-3 font-bold text-slate-500 shadow-none hover:bg-slate-200">
                           Cancel
                        </Dialog.DismissTrigger>
                        <Button
                           className="flex-1 rounded-xl bg-red-500 py-3 font-bold text-white shadow-lg shadow-red-500/20 hover:bg-red-600"
                           onClick={() => handleRemove(bookmark?.id)}
                        >
                           Remove
                        </Button>
                     </div>
                  </div>
               </Dialog.Content>
            </Dialog.Overlay>
         </Dialog>
      </>
   );
};