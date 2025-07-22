import {
   IconButton,
   Typography,
   Collapse,
   Navbar,
   Input,
} from "@material-tailwind/react";
import {
   Menu,
   Search,
   Xmark
} from "iconoir-react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { filterNovel, getFilteredNovels } from "../states/features/novel/novelSlice.js";
import { useDebounce } from "../hooks/useDebounce.jsx";
import { useEffect, useState } from "react";
import { getFetchNavMenuList, removeExtraMenuItems } from "../states/features/nav/navMenuListSlice.js";
import { iconMap } from "../functions/helpers.js";
import { LogOut } from "iconoir-react/regular";
import { api } from "../axios/axios.js";
import { useTranslation } from "react-i18next";
import { LOCALIZE_CODE, LOCALIZE_CONST } from "../consts/Consts.js";
import { Switch } from "@material-tailwind/react";
import i18n from "../lang/config.js";

export const NavigationBar = () => {

   const { t } = useTranslation();
   
   const dispatch = useDispatch();

   const filteredNovels = useSelector(getFilteredNovels);

   const navMenus = useSelector(getFetchNavMenuList);

   const navMenuList = navMenus.map(menu => ({
      ...menu,
      icon: iconMap[menu.icon]
   }));

   const [search, setSearch] = useState("");

   const _search = useDebounce(search);

   useEffect(() => {
      dispatch(filterNovel(_search));
   }, [_search, dispatch]);

   const [openNav, setOpenNav] = useState(false);

   const handleNavClick = (e) => {
      e.target.value = "";
      setSearch("");
   }

   useEffect(() => {
      window.addEventListener(
         "resize",
         () => window.innerWidth >= 960 && setOpenNav(false),
      );
   }, []);

   const [isEnglish, setIsEnglish] = useState(false);

   const handleLangChange = () => {
      const nextLang = !isEnglish;
      setIsEnglish(nextLang);
      i18n.changeLanguage(nextLang ? LOCALIZE_CODE.ENGLISH : LOCALIZE_CODE.MYANMAR);
   }

   const NavList = () => {
      return (
         <ul className="mt-4 flex flex-col gap-x-3 gap-y-1.5 lg:mt-0 lg:flex-row lg:items-center">
            {navMenuList.map(({ icon: Icon, title, href }) => (
               <li key={title}>
                  <Link
                     to={href}
                     className="flex items-center gap-x-2 p-1 transition-all font-poppins duration-200  ease-in-out 
                              hover:-translate-y-1 hover:text-gray-700 active:text-gray-900
                              [&>svg]:transition-transform [&>svg]:duration-200 [&>svg]:ease-in-out
                              [&>svg]:hover:scale-110 [&>svg]:active:scale-105"
                  >
                     <Icon className="h-4 w-4" />
                     {t(title)}
                  </Link>
               </li>
            ))}
         </ul>
      );
   }

   const handleLogOut = async () => {

      try {
         const response = await api.get("/logout");
         console.log("Logout successful:", response.data);
         localStorage.clear();
         dispatch(removeExtraMenuItems());
      } catch (error) {
         console.error("Logout failed:", error);
      }
   }

   return (
      <Navbar className="w-full top-0 sticky border border-b-slate-500 shadow-md rounded-none z-20 overflow-visible">
         <div className="flex items-center">
            <Link
               to="/"
               className="ml-2 mr-2 block py-1 font-semibold"
            >
               {t(LOCALIZE_CONST.APP_NAME)}
            </Link>
            <hr className="ml-1 mr-1.5 hidden h-5 w-px border-l border-t-0 border-secondary-dark lg:block" />
            <div className="hidden lg:block">
               <NavList />
            </div>
            <div className="ml-auto mr-5 w-56 rounded-md relative">
               <Input
                  onChange={(e) => setSearch(e.target.value)}
                  size="md"
                  value={search}
                  type="search"
                  placeholder={t(LOCALIZE_CONST.SEARCH_PLACEHOLDER)}
                  className="w-full border-slate-900 rounded-md"
               >
                  <Input.Icon>
                     <Search className="h-4 w-4 text-slate-500" />
                  </Input.Icon>
               </Input>

               {filteredNovels?.length > 0 && (
                  <div className="absolute top-full left-0 w-full z-[9999] rounded-md mt-1 bg-white shadow-lg border border-slate-900">
                     <ul className="max-h-60 overflow-y-auto">
                        {filteredNovels?.map((fn, index) => (
                           <div key={fn?.id}>
                              <NavLink onClick={(e) => handleNavClick(e)} to={`/novels/${fn?.id}`}>
                                 <li className="cursor-pointer py-2 px-3 hover:bg-slate-100 hover:rounded-md">
                                    {fn?.title}
                                 </li>
                              </NavLink>
                              {index != filteredNovels.length -1 &&  <hr className="border-slate-500" />}
                           </div>
                        ))}
                     </ul>
                  </div>
               )}
            </div>

            <div className="hidden lg:flex flex-row gap-3">
               <div className="flex flex-row items-center gap-2 mr-3">
                  <Switch id="switch" color="primary" onClick={handleLangChange} />
                  <Typography as="label"
                     htmlFor="switch"
                     className="cursor-pointer text-sm font-serif font-semibold"
                  >
                     {isEnglish ? LOCALIZE_CODE.ENGLISH : LOCALIZE_CODE.MYANMAR}
                  </Typography>
               </div>

               {localStorage.getItem("token") && (
                  <div className="bg-black text-white rounded-md">
                     <Typography
                        as="button"
                        type="small"
                        className="flex items-center gap-x-2 p-3 transition-all duration-200 ease-in-out 
                                 hover:-translate-y-1 hover:text-white active:text-gray-900
                                 [&>svg]:transition-transform [&>svg]:duration-200 [&>svg]:ease-in-out
                                 [&>svg]:hover:scale-110 [&>svg]:active:scale-105"
                        onClick={handleLogOut}
                     >
                        <LogOut className="h-4 w-4" />
                        {t(LOCALIZE_CONST.LOGOUT)}
                     </Typography>
                  </div>
               )}
            </div>
            <IconButton
               size="sm"
               variant="ghost"
               onClick={() => setOpenNav(!openNav)}
               className="ml-1 grid lg:hidden"
            >
               {openNav ? (
                  <Xmark className="h-4 w-4" />
               ) : (
                  <Menu className="h-4 w-4" />
               )}
            </IconButton>
         </div>
         <Collapse open={openNav}>
            <NavList />
            <div className="flex flex-row gap-x-4 my-4">
               {localStorage.getItem("token") && (
                  <div className="bg-black text-white rounded-md">
                     <Typography
                        as="button"
                        type="small"
                        className="flex items-center gap-x-2 p-3 transition-all duration-200 ease-in-out 
                              hover:-translate-y-1 hover:text-white active:text-gray-900
                              [&>svg]:transition-transform [&>svg]:duration-200 [&>svg]:ease-in-out
                              [&>svg]:hover:scale-110 [&>svg]:active:scale-105"
                        onClick={handleLogOut}
                     >
                        <LogOut className="h-4 w-4" />
                        {t(LOCALIZE_CONST.LOGOUT)}
                     </Typography>
                  </div>
               )}
               <div className="flex items-center gap-2 mr-3">
                  <Switch id="switch" color="primary" onClick={handleLangChange} />
                  <Typography as="label"
                     htmlFor="switch"
                     className="cursor-pointer text-sm font-serif font-semibold"
                  >
                     {isEnglish ? LOCALIZE_CODE.ENGLISH : LOCALIZE_CODE.MYANMAR}
                  </Typography>
               </div>
            </div>
         </Collapse>
      </Navbar>
   );
}
