import { Avatar, Menu } from "@material-tailwind/react";
import { LogOut, Settings, UserCircle } from "iconoir-react";
import { DEFAULT_IMG_CHAR, LOCALIZE_CONST, ROUTES } from "../consts/Consts";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { user } from "../states/features/user/userSlice";

export const ProfileMenu = ({t, handleLogOut}) => {

   const me = useSelector(user);

   return (
      <Menu>
         <Menu.Trigger
            as={Avatar}
            src={DEFAULT_IMG_CHAR.replace(":char", me?.name?.charAt(0))}
            alt="profile-picture"
            size="md"
            className="border border-primary p-0.5 lg:ml-auto"
            />
         <Menu.Content>
            <NavLink to={ROUTES.MY_PROFILE}>
               <Menu.Item>
                  <UserCircle className="mr-2 h-[18px] w-[18px]" /> {t(LOCALIZE_CONST.MY_PROFILE)}
               </Menu.Item>
            </NavLink>
            
            {/* <Menu.Item>
               <Settings className="mr-2 h-[18px] w-[18px]" /> {t(LOCALIZE_CONST.EDIT_PROFILE)}
            </Menu.Item> */}
            {/* <Menu.Item>
               <HeadsetHelp className="mr-2 h-[18px] w-[18px]" /> Support
            </Menu.Item> */}
            <hr className="!my-1 -mx-1 border-surface" />
            <Menu.Item
               onClick={handleLogOut}
               className="text-error hover:bg-error/10 hover:text-error focus:bg-error/10 focus:text-error">
               <LogOut className="mr-2 h-[18px] w-[18px]" />
                  {t(LOCALIZE_CONST.LOGOUT)}
            </Menu.Item>
         </Menu.Content>
      </Menu>
   );
}