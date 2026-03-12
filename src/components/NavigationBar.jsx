import {
   IconButton,
   Typography,
   Collapse,
   Navbar,
   Input,
} from "@material-tailwind/react";
import {
   Menu,
   NavArrowRight,
   Search,
   Xmark
} from "iconoir-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { filterNovel, getFilteredNovels } from "../states/features/novel/novelSlice.js";
import { useDebounce } from "../hooks/useDebounce.jsx";
import { useEffect, useState } from "react";
import { getFetchNavMenuList, removeExtraMenuItems } from "../states/features/nav/navMenuListSlice.js";
import { iconMap } from "../functions/helpers.js";
import { api } from "../axios/axios.js";
import { useTranslation } from "react-i18next";
import { LOCALIZE_CODE, LOCALIZE_CONST, ROUTES } from "../consts/Consts.js";
import { Switch } from "@material-tailwind/react";
import i18n from "../lang/config.js";
import { ProfileMenu } from "./ProfileMenu.jsx";
import { SignInButton } from "./SignInButton.jsx";

export const NavigationBar = () => {

   const { t } = useTranslation();
   
   const dispatch = useDispatch();

   const navigate = useNavigate();

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

   const [isEnglish, setIsEnglish] = useState(() => {
      return localStorage.getItem("isEn") === "true";
   });
   const handleLangChange = () => {
      const nextLang = !isEnglish;
      setIsEnglish(nextLang);
      localStorage.setItem("isEn", nextLang);
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

      navigate(ROUTES.HOME);
   }

   return (
      <Navbar className="w-full top-0 sticky border bg-white border-b-slate-500 shadow-md rounded-none z-20 overflow-visible">
         <div className="container mx-auto flex items-center justify-between">
            {/* Left: Brand and Links */}
            <div className="flex items-center gap-12">
               <Link to="/" className="text-xl font-bold tracking-tight text-slate-900 font-poppins whitespace-nowrap">
                  {t(LOCALIZE_CONST.APP_NAME)}
               </Link>
               <div className="hidden lg:block">
                  <NavList />
               </div>
            </div>

            {/* Right: Search and Controls */}
            <div className="flex items-center gap-6">
               {/* Search Bar */}
               <div className="relative hidden md:block w-80 group">
                  <div className="relative">
                     <Input
                        type="text"
                        placeholder={t(LOCALIZE_CONST.SEARCH_PLACEHOLDER)}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="!border-slate-200 focus:!border-blue-500 rounded-lg pl-10 bg-slate-50 transition-all placeholder:text-slate-400"
                        labelprops={{ className: "hidden" }}
                     />
                     <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search className="h-4 w-4 text-slate-400" />
                     </div>
                  </div>

                  {/* Dropdown Results - Fixed messy UI */}
                  {filteredNovels?.length > 0 && search && (
                     <div className="absolute top-[110%] left-0 w-full bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-[100] animate-in fade-in slide-in-from-top-1 duration-200">
                        <div className="p-3 bg-slate-50/50 border-b border-slate-100">
                           <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Suggested Novels</span>
                        </div>
                        <ul className="max-h-64 overflow-y-auto">
                           {filteredNovels.map((fn) => (
                              <NavLink 
                                 key={fn?.id} 
                                 onClick={handleNavClick} 
                                 to={ROUTES.NOVEL_BY_ID.replace(":id", fn?.id)}
                                 className="block px-4 py-3 hover:bg-blue-50 transition-colors"
                              >
                                 <li className="flex items-center justify-between group">
                                    <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors">
                                       {fn?.title}
                                    </span>
                                    <NavArrowRight className="h-4 w-4 text-slate-300 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                                 </li>
                              </NavLink>
                           ))}
                        </ul>
                     </div>
                  )}
               </div>

               {/* Controls */}
               <div className="hidden lg:flex items-center gap-6 border-l border-slate-200 pl-6">
                  <div className="flex items-center gap-3">
                     <span className={`text-[11px] font-bold ${!isEnglish ? 'text-blue-600' : 'text-slate-400'}`}>MM</span>
                     <Switch 
                        checked={isEnglish}
                        onChange={handleLangChange}
                        className="checked:bg-blue-500"
                        containerprops={{ className: "w-10 h-5" }}
                        circleprops={{ className: "before:hidden left-0.5 border-none" }}
                     />
                     <span className={`text-[11px] font-bold ${isEnglish ? 'text-blue-600' : 'text-slate-400'}`}>EN</span>
                  </div>
                  
                  {localStorage.getItem("token") 
                     ? <ProfileMenu t={t} handleLogOut={handleLogOut} /> 
                     : <SignInButton t={t} />
                  }
               </div>

               {/* Mobile Toggle */}
               <IconButton
                  type="button"
                  className="lg:hidden text-slate-700 hover:bg-slate-100"
                  onClick={() => setOpenNav(!openNav)}
               >
                  {openNav ? <Xmark className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
               </IconButton>
            </div>
         </div>

         {/* Mobile Menu */}
         <Collapse open={openNav}>
            <div className="container mx-auto py-6 space-y-6 border-t border-slate-100 mt-4">
               <div className="md:hidden">
                  <Input
                     icon={<Search className="h-4 w-4" />}
                     placeholder={t(LOCALIZE_CONST.SEARCH_PLACEHOLDER)}
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                     className="rounded-lg bg-slate-50"
                  />
               </div>
               <NavList />
               <div className="flex flex-col gap-5 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                     <Typography className="text-sm font-semibold text-slate-600">Language</Typography>
                     <Switch checked={isEnglish} onChange={handleLangChange} />
                  </div>
                  <div className="w-full">
                     {localStorage.getItem("token") 
                        ? <ProfileMenu t={t} handleLogOut={handleLogOut} /> 
                        : <SignInButton t={t} />
                     }
                  </div>
               </div>
            </div>
         </Collapse>
      </Navbar>
   );
}
