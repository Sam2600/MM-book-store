import { Typography, Card, CardBody, Avatar, Chip, Button } from "@material-tailwind/react";
import { Bookmark, Coins, UserCircle } from "iconoir-react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getBookMarkedCollection, getBookMarks, getBookMarkStatus, user } from "../states/features/user/userSlice";
import { toHumanReadableDates } from "../functions/helpers";
import { DEFAULT_IMG_CHAR } from "../consts/Consts";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { cleanNovels } from "../states/features/novel/novelSlice";
import { BookmarkNovel } from "../components/BookmarkNovel";
import { Loader } from "../components/Loader";

export const NormalProfile = () => {

   const dispatch = useDispatch();
   
   const { t } = useTranslation();
   
   const currentUser = useSelector(user);

   const status = useSelector(getBookMarkStatus);

   const bookMarks = useSelector(getBookMarks);

   useEffect(() => {
   
      dispatch(getBookMarkedCollection());
   
      return () => {
         dispatch(cleanNovels());
      }
   }, []);

   let content = null;
         
   if (status == "pending") {
      content = <Loader />;
   } else {
      content = (
         bookMarks?.length > 0 ? (
            <div className="w-11/12 mx-auto my-auto flex flex-col gap-5 items-center">
               {bookMarks.map(bm => <BookmarkNovel key={bm?.id} bookmark={bm} />)}
            </div>
         ) : (
            <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-300">
               <UserCircle className="h-12 w-12 mx-auto text-slate-300 mb-2" />
               <Typography color="gray">သိမ်းဆည်းထားသော စာအုပ်မရှိသေးပါ။</Typography>
            </div>
         )
      )
   }

   return (
      <div className="w-11/12 mx-auto py-10 flex flex-col lg:flex-row gap-8">
         
         {/* LEFT SIDEBAR: User Info */}
         <div className="w-full lg:w-1/3 flex flex-col gap-6">
         <Card className="border border-slate-200 shadow-sm">
            <CardBody className="flex flex-col items-center text-center">
               {/* <Avatar
                     size="xl"
                     variant="circular"
                     src={currentUser?.avatar || "https://docs.material-tailwind.com/img/face-2.jpg"}
                     alt="user-avatar"
                     className="mb-4 border-2 border-primary p-0.5"
                  /> */}
               <img
                  src={DEFAULT_IMG_CHAR.replace(":char", currentUser?.name?.charAt(0) || 'U')}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-md"
                  alt="profile"
               />
               <Typography variant="h5" color="blue-gray">
               {currentUser?.name || "User Name"}
               </Typography>
               <Typography variant="small" className="text-slate-500 font-normal">
               {currentUser?.email}
               </Typography>

               <div className="grid grid-cols-2 gap-4 w-full mt-8 border-t pt-6">
                  {/* <div className="flex flex-col items-center border-r">
                     <Typography variant="h4" color="blue-gray">{currentUser?.coins || 0}</Typography>
                     <Typography variant="small" className="text-slate-500 uppercase flex items-center gap-1">
                        <Coins className="h-3 w-3" /> Coins
                     </Typography>
                  </div> */}
                  <div className="text-sm text-gray-500">{toHumanReadableDates(currentUser?.created_at)}</div>      
                  <div className="flex flex-col items-center">
                     <Typography variant="small" className="text-slate-500 flex items-center gap-1">
                           <Bookmark className="h-3 w-3" /> Saved : 
                           <Typography variant="h4" color="blue-gray">{bookMarks?.length} Books</Typography>
                     </Typography>
                  </div>
               </div>
            </CardBody>
         </Card>

         {/* HELP CARD (Optional) */}
            {/* <Card className="bg-slate-50 border border-slate-200">
               <CardBody>
                  <Typography variant="h6" className="mb-2">Need more coins?</Typography>
                  <Typography variant="small" className="text-slate-600 mb-4">
                     Watch ads or top up to unlock more chapters of your favorite novels.
                  </Typography>
                  <Button size="sm" color="amber" isFullWidth>Get Coins</Button>
               </CardBody>
            </Card> */}
         </div>

         {/* RIGHT CONTENT: Saved Novels */}
         <div className="w-full lg:w-2/3">
         <Typography variant="h4" color="blue-gray" className="mb-6 flex items-center gap-2">
            <Bookmark /> သိမ်းဆည်းထားသော စာအုပ်များ
         </Typography>
         {content}
         </div>
      </div>
   );
};