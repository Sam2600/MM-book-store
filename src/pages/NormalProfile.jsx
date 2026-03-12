import { Typography, Card, CardBody, Avatar, Button } from "@material-tailwind/react";
import { Bookmark, UserCircle, Calendar, BookStack } from "iconoir-react";
import { useDispatch, useSelector } from "react-redux";
import { getBookMarkedCollection, getBookMarks, getBookMarkStatus, user } from "../states/features/user/userSlice";
import { toHumanReadableDates } from "../functions/helpers";
import { DEFAULT_IMG_CHAR } from "../consts/Consts";
import { useEffect } from "react";
import { cleanNovels } from "../states/features/novel/novelSlice";
import { BookmarkNovel } from "../components/BookmarkNovel";
import { Loader } from "../components/Loader";

export const NormalProfile = () => {
   const dispatch = useDispatch();
   const currentUser = useSelector(user);
   const status = useSelector(getBookMarkStatus);
   const bookMarks = useSelector(getBookMarks);

   useEffect(() => {
      dispatch(getBookMarkedCollection());
      return () => dispatch(cleanNovels());
   }, [dispatch]);

   let content = status === "pending" ? (
      <div className="flex justify-center py-20"><Loader /></div>
   ) : bookMarks?.length > 0 ? (
      <div className="grid grid-cols-1 gap-6">
         {bookMarks.map(bm => <BookmarkNovel key={bm?.id} bookmark={bm} />)}
      </div>
   ) : (
      <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300 shadow-sm">
         <UserCircle className="h-16 w-16 mx-auto text-slate-200 mb-4" />
         <Typography className="text-slate-500 font-medium font-poppins">သိမ်းဆည်းထားသော စာအုပ်မရှိသေးပါ။</Typography>
      </div>
   );

   return (
      <div className="min-h-screen bg-gray-50/50 pb-20">
         <div className="container mx-auto px-4 py-10 flex flex-col lg:flex-row gap-10">
            
            {/* LEFT SIDEBAR: User Info */}
            <div className="w-full lg:w-96 flex-shrink-0">
               <Card className="border border-slate-200 shadow-sm sticky top-10">
                  <CardBody className="flex flex-col items-center p-8">
                     <div className="relative mb-6">
                        <img
                           src={DEFAULT_IMG_CHAR.replace(":char", currentUser?.name?.charAt(0) || 'U')}
                           className="w-28 h-28 rounded-full border-4 border-white shadow-xl ring-1 ring-slate-100"
                           alt="profile"
                        />
                        <div className="absolute bottom-1 right-1 h-5 w-5 bg-green-500 border-2 border-white rounded-full"></div>
                     </div>
                     
                     <Typography type="h5" className="text-slate-800 font-black font-poppins mb-1 text-xl">
                        {currentUser?.name || "User Name"}
                     </Typography>
                     <Typography className="text-slate-400 font-medium text-sm mb-8">
                        {currentUser?.email}
                     </Typography>

                     <div className="w-full space-y-4 border-t pt-8">
                        <div className="flex items-center justify-between text-slate-600 bg-slate-50 p-3 rounded-xl">
                           <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-blue-500" />
                              <span className="text-xs font-bold uppercase tracking-wider">Joined</span>
                           </div>
                           <span className="text-sm font-black">{toHumanReadableDates(currentUser?.created_at).split(', ').slice(1).join(', ')}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-slate-600 bg-slate-50 p-3 rounded-xl">
                           <div className="flex items-center gap-2">
                              <BookStack className="h-4 w-4 text-purple-500" />
                              <span className="text-xs font-bold uppercase tracking-wider">Library</span>
                           </div>
                           <span className="text-sm font-black">{bookMarks?.length} Books</span>
                        </div>
                     </div>
                  </CardBody>
               </Card>
            </div>

            {/* RIGHT CONTENT: Saved Novels */}
            <div className="flex-1">
               <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-100">
                     <Bookmark className="h-6 w-6 text-white" />
                  </div>
                  <Typography type="h3" className="text-2xl font-black text-slate-800 font-poppins">
                     Reading List
                  </Typography>
               </div>
               {content}
            </div>
         </div>
      </div>
   );
};