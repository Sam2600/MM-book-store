import React, { useState, useEffect } from "react";
import { Typography, Button, Spinner, IconButton } from "@material-tailwind/react";
import { CheckCircle, SkipNext, Xmark } from "iconoir-react";
import { useRef } from "react";

export const AdWatcher = ({ isOpen, onClose, onRewardClaimed }) => {
   const [timer, setTimer] = useState(15);
   const [isFinished, setIsFinished] = useState(false);

   useEffect(() => {
      if (isOpen) {
         setTimer(15);
         setIsFinished(false);
         const interval = setInterval(() => {
            setTimer((prev) => {
               if (prev <= 1) {
                  clearInterval(interval);
                  setIsFinished(true);
                  return 0;
               }
               return prev - 1;
            });
         }, 1000);
         return () => clearInterval(interval);
      }
   }, [isOpen]);

   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
         <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col items-center relative">
            
            <div className="w-full p-4 border-b flex justify-between items-center bg-slate-50">
               <Typography type="h6">အထူးကမ်းလှမ်းချက်</Typography>
               {isFinished && (
                  <IconButton onClick={onClose}><Xmark className="h-5 w-5" /></IconButton>
               )}
            </div>

            {/* THE IFRAME: This FORCES the ad to show inside the white area */}
            <div className="w-full h-[300px] bg-slate-100 relative">
               {!isFinished && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/10 pointer-events-none">
                      {/* This layer prevents clicking the ad until the timer is done if you want */}
                  </div>
               )}
               <iframe 
                  src="https://www.effectivegatecpm.com/hb42xrq5kn?key=8029737b7519f689aed8e31395eaeb2e"
                  className="w-full h-full border-none"
                  title="Ad Content"
               />
            </div>

            <div className="p-6 w-full flex flex-col items-center">
               {!isFinished ? (
                  <div className="flex flex-col items-center gap-3">
                     <Spinner color="amber" />
                     <Typography className="font-bold text-amber-900 text-sm">
                        Reward ရယူရန် {timer} စက္ကန့် စောင့်ပေးပါ
                     </Typography>
                  </div>
               ) : (
                  <Button
                     color="green" 
                     size="lg"
                     onClick={() => {
                        onRewardClaimed();
                        onClose();
                     }}
                  >
                     Reward ရယူမည်
                  </Button>
               )}
            </div>
         </div>
      </div>
   );
};