import {
   IconButton,
   Typography,
   Collapse,
   Navbar,
   Input,
   Switch
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
      setSearch("");
   };

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

   const NavList = () => (
      <ul className="mt-4 flex flex-col gap-x-1 gap-y-1 lg:mt-0 lg:flex-row lg:items-center">
         {navMenuList.map(({ icon: Icon, title, href }) => (
            <li key={title}>
               <NavLink
                  to={href}
                  className={({ isActive }) => `
                     flex items-center gap-x-2 px-3 py-2 rounded-lg font-poppins text-sm font-bold transition-all duration-300
                     ${isActive 
                        ? "text-blue-600 bg-blue-50/50" 
                        : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"}
                  `}
               >
                  <Icon className="h-4 w-4" />
                  {t(title)}
               </NavLink>
            </li>
         ))}
      </ul>
   );

   const handleLogOut = async () => {
      try {
         await api.get("/logout");
         localStorage.clear();
         dispatch(removeExtraMenuItems());
      } catch (error) {
         console.error("Logout failed:", error);
      }
      navigate(ROUTES.HOME);
   }

   return (
      <Navbar className="w-full p-3 top-0 sticky border bg-white border-b-slate-500 shadow-md rounded-none z-20 overflow-visible"> 
         <div className="container mx-auto flex items-center justify-between">
            {/* Left: Brand and Links */}
            <div className="flex items-center gap-10">
               <Link to="/" className="flex items-center gap-2 group transition-all duration-300">
                  <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:rotate-6 transition-transform">
                     <span className="text-white font-black text-xs">MM</span>
                  </div>
                  <Typography className="text-xl font-black tracking-tighter text-slate-900 font-poppins uppercase">
                     {t(LOCALIZE_CONST.APP_NAME)}
                  </Typography>
               </Link>
               <div className="hidden lg:block">
                  <NavList />
               </div>
            </div>

            {/* Right: Search and Controls */}
            <div className="flex items-center gap-4">
               {/* Search Bar Refined */}
               <div className="relative hidden md:block w-72 group">
                  <div className="relative">
                     <Input
                        type="text"
                        placeholder={t(LOCALIZE_CONST.SEARCH_PLACEHOLDER)}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="!border-slate-200 focus:!border-blue-500 rounded-xl pl-10 bg-slate-50 transition-all placeholder:text-slate-400 !text-sm"
                        labelprops={{ className: "hidden" }}
                     />
                     <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search className="h-4 w-4 text-slate-400" />
                     </div>
                  </div>

                  {/* Dropdown Results - Beautified with Glass Effect */}
                  {filteredNovels?.length > 0 && search && (
                     <div className="absolute top-[120%] left-0 w-full bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-[100] animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-4 py-3 bg-slate-50/50 border-b border-slate-100">
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Suggested Results</span>
                        </div>
                        <ul className="max-h-64 overflow-y-auto p-1.5">
                           {filteredNovels.map((fn) => (
                              <NavLink 
                                 key={fn?.id} 
                                 onClick={handleNavClick} 
                                 to={ROUTES.NOVEL_BY_ID.replace(":id", fn?.id)}
                                 className="block rounded-xl px-3 py-2.5 hover:bg-blue-50 transition-colors group"
                              >
                                 <li className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">
                                       {fn?.title}
                                    </span>
                                    <NavArrowRight className="h-4 w-4 text-slate-300 group-hover:translate-x-1 transition-all" />
                                 </li>
                              </NavLink>
                           ))}
                        </ul>
                     </div>
                  )}
               </div>

               {/* Controls Section */}
               <div className="hidden lg:flex items-center gap-4 border-l border-slate-200 pl-4">
                  {/* Lang Switch Refined */}
                  <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-full border border-slate-200">
                     <span className={`text-[10px] font-black px-1 ${!isEnglish ? 'text-blue-600' : 'text-slate-400'}`}>MM</span>
                     <Switch 
                        checked={isEnglish}
                        onChange={handleLangChange}
                        className="checked:bg-blue-500"
                        containerprops={{ className: "w-8 h-4" }}
                        circleprops={{ className: "w-3 h-3 before:hidden left-0.5 border-none" }}
                     />
                     <span className={`text-[10px] font-black px-1 ${isEnglish ? 'text-blue-600' : 'text-slate-400'}`}>EN</span>
                  </div>
                  
                  {localStorage.getItem("token") 
                     ? <ProfileMenu t={t} handleLogOut={handleLogOut} /> 
                     : <SignInButton t={t} />
                  }
               </div>

               {/* Mobile Toggle */}
               <IconButton
                  type="button"
                  className="lg:hidden text-slate-700 rounded-full hover:bg-slate-100"
                  onClick={() => setOpenNav(!openNav)}
               >
                  {openNav ? <Xmark className="h-6 w-6 stroke-2" /> : <Menu className="h-6 w-6 stroke-2" />}
               </IconButton>
            </div>
         </div>

         {/* Mobile Menu Beautified */}
         <Collapse open={openNav}>
            <div className="py-4 space-y-4 border-t border-slate-100 mt-2">
               <div className="md:hidden px-2">
                  <Input
                     icon={<Search className="h-4 w-4" />}
                     placeholder={t(LOCALIZE_CONST.SEARCH_PLACEHOLDER)}
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                     className="rounded-xl bg-slate-50 !border-none"
                     labelprops={{ className: "hidden" }}
                  />
               </div>
               {filteredNovels?.length > 0 && search && (
                  <div className="absolute left-0 w-full bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-[100] animate-in fade-in zoom-in-95 duration-200">
                     <div className="px-4 py-3 bg-slate-50/50 border-b border-slate-100">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Suggested Results</span>
                     </div>
                     <ul className="max-h-64 overflow-y-auto p-1.5">
                        {filteredNovels.map((fn) => (
                           <NavLink 
                              key={fn?.id} 
                              onClick={handleNavClick} 
                              to={ROUTES.NOVEL_BY_ID.replace(":id", fn?.id)}
                              className="block rounded-xl px-3 py-2.5 hover:bg-blue-50 transition-colors group"
                           >
                              <li className="flex items-center justify-between">
                                 <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">
                                    {fn?.title}
                                 </span>
                                 <NavArrowRight className="h-4 w-4 text-slate-300 group-hover:translate-x-1 transition-all" />
                              </li>
                           </NavLink>
                        ))}
                     </ul>
                  </div>
               )}
               <div className="px-2">
                  <NavList />
               </div>
               <div className="flex flex-col gap-3 px-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                     <Typography className="text-xs font-bold text-slate-400 uppercase tracking-wider">Language</Typography>
                     <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold">MM</span>
                        <Switch checked={isEnglish} onChange={handleLangChange} size="sm" />
                        <span className="text-[10px] font-bold">EN</span>
                     </div>
                  </div>
                  <div className="w-full pt-2">
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