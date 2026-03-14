import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { LOCALIZE_CONST, ROUTES } from "../consts/Consts";
import { LogIn } from "iconoir-react";

export const SignInButton = ({ t }) => {

   const navigate = useNavigate();

   const handleOnClick = () => {
      navigate(ROUTES.SIGN_IN);
   }

   return (
      <button
         onClick={handleOnClick}
         className="group relative flex items-center gap-x-2 px-5 py-2.5 
                  bg-slate-900 hover:bg-blue-600 
                  text-white rounded-xl shadow-md shadow-slate-200 
                  transition-all duration-300 ease-out
                  active:scale-95 active:bg-blue-700"
      >
         <LogIn className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
         
         <Typography
            className="font-poppins text-xs font-bold uppercase tracking-wide transition-colors"
         >
            {t(LOCALIZE_CONST.SIGN_IN)}
         </Typography>

         {/* Subtle glow effect on hover */}
         <div className="absolute inset-0 rounded-xl bg-blue-400 opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300 -z-10" />
      </button>
   );
};
