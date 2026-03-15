import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@material-tailwind/react";
import { BookStack, HomeSimple, WarningTriangle } from "iconoir-react";
import { ROUTES } from "../consts/Consts";
import { scrollToTop } from "../functions/helpers";

export const NotFound = () => {

   useEffect(() => scrollToTop())

   return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 overflow-hidden relative">
         {/* Decorative Background Elements */}
         <div className="absolute top-[-10%] left-[-10%] w-[40%] aspect-square bg-blue-50 rounded-full blur-3xl opacity-50" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] aspect-square bg-indigo-50 rounded-full blur-3xl opacity-50" />

         <div className="relative z-10 text-center max-w-lg">
            {/* The "404" Visual */}
            <div className="flex justify-center mb-8 relative">
               <Typography className="text-[12rem] font-black leading-none text-slate-100 select-none">
                  404
               </Typography>
               <div className="absolute inset-0 flex items-center justify-center translate-y-4">
                  <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl shadow-blue-900/10 border border-slate-100 rotate-3 transition-transform hover:rotate-0 duration-500">
                     <BookStack className="w-20 h-20 text-blue-600 stroke-[1.5]" />
                  </div>
               </div>
            </div>

            {/* Content */}
            <div className="space-y-4 mb-10">
               <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="h-px w-8 bg-slate-200" />
                  <Typography className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px]">
                     Page Not Found
                  </Typography>
                  <span className="h-px w-8 bg-slate-200" />
               </div>

               <Typography className="text-4xl font-black text-slate-900 font-poppins leading-tight">
                  Lost in the <br /> 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-400">
                     Secret Library?
                  </span>
               </Typography>

               <Typography className="text-slate-500 font-medium px-4">
                  The page you are looking for has been moved or doesn't exist. 
                  Don't worry, even the greatest cultivators lose their way sometimes.
               </Typography>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <Link to={ROUTES.HOME} className="w-full sm:w-auto">
                  <Button 
                     size="lg" 
                     className="flex items-center justify-center gap-3 w-full sm:w-auto rounded-2xl bg-slate-900 px-10 py-4 font-black uppercase tracking-widest transition-all hover:bg-blue-600 active:scale-95 shadow-xl shadow-blue-500/10"
                  >
                     <HomeSimple className="w-5 h-5" />
                     Return Home
                  </Button>
               </Link>

               {/* <Link to={ROUTES.CONTACT_US} className="w-full sm:w-auto">
                  <Button 
                     type="button" 
                     size="lg" 
                     className="flex items-center justify-center gap-3 w-full sm:w-auto rounded-2xl text-slate-600 px-10 py-4 font-black uppercase tracking-widest hover:bg-slate-100"
                  >
                     Report Issue
                  </Button>
               </Link> */}
            </div>
         </div>
      </div>
   );
};