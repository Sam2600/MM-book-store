import React, { useState, useEffect, useRef } from "react";
import { Typography, Button, Spinner, IconButton } from "@material-tailwind/react";
import { Xmark, coin } from "iconoir-react";

export const AdRewardModal = ({ isOpen, onClose, onRewardEarned }) => {
   const [timer, setTimer] = useState(15); // 15 seconds is standard for ads
   const [canClose, setCanClose] = useState(false);
   const adContainerRef = useRef(null);

   useEffect(() => {
      if (isOpen) {
         // 1. Reset states
         setTimer(15);
         setCanClose(false);

         // 2. Inject Adsterra Script
         const script = document.createElement("script");
         // REPLACE THIS URL with your Adsterra "Social Bar" or "Banner" script URL
         script.src = "//pl28625666.effectivegatecpm.com/d0/f4/6f/d0f46f0ae98c7dcb8b4838f95991e82d.js";
         script.async = true;
         
         if (adContainerRef.current) {
         adContainerRef.current.appendChild(script);
         }

         // 3. Start Countdown
         const interval = setInterval(() => {
         setTimer((prev) => {
            if (prev <= 1) {
               clearInterval(interval);
               setCanClose(true);
               return 0;
            }
            return prev - 1;
         });
         }, 1000);

         return () => {
         clearInterval(interval);
         if (adContainerRef.current) adContainerRef.current.innerHTML = "";
         };
      }
   }, [isOpen]);

   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
         <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl flex flex-col items-center">
         
         {/* Header */}
         <div className="w-full p-4 border-b flex justify-between items-center bg-slate-50">
            <Typography className="font-bold color-blue-gray">Watch to Earn Coins</Typography>
            {canClose && (
               <IconButton variant="text" color="blue-gray" onClick={onClose}>
               <Xmark />
               </IconButton>
            )}
         </div>

         {/* Ad Area */}
         <div className="p-6 flex flex-col items-center w-full">
            <div 
               ref={adContainerRef} 
               className="w-full min-h-[250px] bg-slate-100 rounded-lg flex items-center justify-center mb-4 border-2 border-dashed border-slate-300"
            >
               <Typography className="text-slate-400 text-sm">Advertisement Loading...</Typography>
            </div>

            {/* Timer Logic */}
            {!canClose ? (
               <div className="flex flex-col items-center gap-2">
               <Spinner color="amber" />
               <Typography className="text-sm font-medium">
                  Please wait <span className="text-amber-700 font-bold">{timer}s</span> to claim reward
               </Typography>
               </div>
            ) : (
               <Button 
               color="green" 
               fullWidth 
               className="flex items-center justify-center gap-2"
               onClick={() => {
                  onRewardEarned();
                  onClose();
               }}
               >
               Claim 5 Coins Now!
               </Button>
            )}
         </div>

         <Typography className="text-[10px] text-slate-400 pb-4 px-6 text-center">
            By watching this ad, you support our platform and help us keep content free.
         </Typography>
         </div>
      </div>
   );
};