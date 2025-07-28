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
      <div className="bg-black text-white rounded-md">
         <Typography
            as="button"
            type="small"
            className="flex items-center gap-x-2 p-2 transition-all duration-200 ease-in-out 
               hover:-translate-y-1 hover:text-white active:text-gray-900
               [&>svg]:transition-transform [&>svg]:duration-200 [&>svg]:ease-in-out
               [&>svg]:hover:scale-110 [&>svg]:active:scale-105"
            onClick={handleOnClick}
         >
            <LogIn className="h-4 w-4" />
            {t(LOCALIZE_CONST.SIGN_IN)}
            </Typography>
      </div>
   );
};
