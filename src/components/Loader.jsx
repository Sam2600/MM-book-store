import { Spinner, Typography } from '@material-tailwind/react';

export const Loader = () => {
   return (
      <div className="flex flex-col justify-center items-center h-screen pb-24 bg-slate-50/30 backdrop-blur-sm">
         <div className="relative flex items-center justify-center">
            {/* Outer glow effect */}
            <div className="absolute h-16 w-16 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
            
            {/* The Spinner */}
            <Spinner 
               className="h-12 w-12 text-blue-600/80" 
               color="blue"
            />
         </div>
         
         {/* Optional subtle text to match your branding */}
         <Typography 
            className="mt-6 font-poppins text-xs font-bold uppercase tracking-[0.3em] text-slate-400 animate-pulse"
         >
            Loading
         </Typography>
      </div>
   );
}