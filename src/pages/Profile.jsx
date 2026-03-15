import { useEffect } from "react"
import { useSelector } from "react-redux";
import { user } from "../states/features/user/userSlice";
import { isEmpty } from "../functions/helpers";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../consts/Consts";

export const Profile = () => { 

   const me = useSelector(user);

   const navigate = useNavigate();

   useEffect(() => { 
      if(!isEmpty(me) && me?.role_id == 4) {
         navigate(ROUTES.USER_PROFILE);
      } else if (!isEmpty(me) && me?.role_id != 4) {
         navigate(ROUTES.AUTHOR_PROFILE);
      }
   }, [])
}