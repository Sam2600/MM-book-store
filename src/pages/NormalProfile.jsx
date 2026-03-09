import React from "react";
import { Typography, Card, CardBody, Avatar, Chip, Button } from "@material-tailwind/react";
import { Bookmark, Coins, UserCircle } from "iconoir-react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { user } from "../states/features/user/userSlice";

export const NormalProfile = () => {
   
   const currentUser = useSelector(user);

   return (
      <div className="w-11/12 mx-auto py-10 flex flex-col lg:flex-row gap-8">
         
         {/* LEFT SIDEBAR: User Info */}
         <div className="w-full lg:w-1/3 flex flex-col gap-6">
         <Card className="border border-slate-200 shadow-sm">
            <CardBody className="flex flex-col items-center text-center">
               <Avatar
               size="xl"
               variant="circular"
               src={currentUser?.avatar || "https://docs.material-tailwind.com/img/face-2.jpg"}
               alt="user-avatar"
               className="mb-4 border-2 border-primary p-0.5"
               />
               <Typography variant="h5" color="blue-gray">
               {currentUser?.name || "User Name"}
               </Typography>
               <Typography variant="small" className="text-slate-500 font-normal">
               {currentUser?.email}
               </Typography>

               <div className="grid grid-cols-2 gap-4 w-full mt-8 border-t pt-6">
               <div className="flex flex-col items-center border-r">
                  <Typography variant="h4" color="blue-gray">{currentUser?.coins || 0}</Typography>
                  <Typography variant="small" className="text-slate-500 uppercase flex items-center gap-1">
                     <Coins className="h-3 w-3" /> Coins
                  </Typography>
               </div>
               <div className="flex flex-col items-center">
                  <Typography variant="h4" color="blue-gray">{currentUser?.saved_novels?.length || 0}</Typography>
                  <Typography variant="small" className="text-slate-500 uppercase flex items-center gap-1">
                     <Bookmark className="h-3 w-3" /> Saved
                  </Typography>
               </div>
               </div>
            </CardBody>
         </Card>

         {/* HELP CARD (Optional) */}
         <Card className="bg-slate-50 border border-slate-200">
            <CardBody>
               <Typography variant="h6" className="mb-2">Need more coins?</Typography>
               <Typography variant="small" className="text-slate-600 mb-4">
               Watch ads or top up to unlock more chapters of your favorite novels.
               </Typography>
               <Button size="sm" color="amber" fullWidth>Get Coins</Button>
            </CardBody>
         </Card>
         </div>

         {/* RIGHT CONTENT: Saved Novels */}
         <div className="w-full lg:w-2/3">
         <Typography variant="h4" color="blue-gray" className="mb-6 flex items-center gap-2">
            <Bookmark /> သိမ်းဆည်းထားသော စာအုပ်များ
         </Typography>

         {currentUser?.saved_novels?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {currentUser.saved_novels.map((novel) => (
               <Card key={novel.id} className="flex-row border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                  <img 
                     src={novel.cover} 
                     alt={novel.title} 
                     className="w-24 object-cover"
                  />
                  <CardBody className="p-4 flex flex-col justify-between">
                     <div>
                     <Typography variant="h6" className="line-clamp-1">{novel.title}</Typography>
                     <Typography variant="small" className="text-slate-500">By {novel.author_name}</Typography>
                     </div>
                     <NavLink to={`/novels/${novel.id}`}>
                     <Button size="sm" variant="text" color="primary" className="p-0 flex items-center gap-2">
                        ဆက်လက်ဖတ်ရှုရန် &rarr;
                     </Button>
                     </NavLink>
                  </CardBody>
               </Card>
               ))}
            </div>
         ) : (
            <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-300">
               <UserCircle className="h-12 w-12 mx-auto text-slate-300 mb-2" />
               <Typography color="gray">သိမ်းဆည်းထားသော စာအုပ်မရှိသေးပါ။</Typography>
            </div>
         )}
         </div>
      </div>
   );
};