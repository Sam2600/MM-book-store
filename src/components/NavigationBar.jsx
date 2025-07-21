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
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { filterNovel, getFilteredNovels } from "../states/features/novel/novelSlice.js";
import { useDebounce } from "../hooks/useDebounce.jsx";
import { useEffect, useState } from "react";
import { getFetchNavMenuList, removeUploadNavMenuList } from "../states/features/nav/navMenuListSlice.js";
import { iconMap } from "../functions/helpers.js";
import { LogOut } from "iconoir-react/regular";
import { api } from "../axios/axios.js";

export const NavigationBar = () => {

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

   const NavList = () => {
      return (
         <ul className="mt-4 flex flex-col gap-x-3 gap-y-1.5 lg:mt-0 lg:flex-row lg:items-center">
            {navMenuList.map(({ icon: Icon, title, href }) => (
               <li key={title}>
                  <Typography
                     as="a"
                     href={href}
                     type="small"
                     className="flex items-center gap-x-2 p-1 transition-all duration-200 ease-in-out 
                              hover:-translate-y-1 hover:text-gray-800 active:text-gray-900
                              [&>svg]:transition-transform [&>svg]:duration-200 [&>svg]:ease-in-out
                              [&>svg]:hover:scale-110 [&>svg]:active:scale-105"
                  >
                     <Icon className="h-4 w-4" />
                     {title}
                  </Typography>
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
         dispatch(removeUploadNavMenuList());
      } catch (error) {
         console.error("Logout failed:", error);
      }
   }

   return (
      <Navbar className="w-full top-0 sticky border border-b-slate-300 shadow-none rounded-none z-20 overflow-visible">
         <div className="flex items-center">
            <Typography
               as="a"
               href="/"
               type="small"
               className="ml-2 mr-2 block py-1 font-semibold"
            >
               MM-book-store
            </Typography>
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
                  placeholder="ရှာဖွေရန်..."
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
            <div>
               <Typography
                  as="button"
                  type="small"
                  className="flex items-center gap-x-2 p-1 transition-all duration-200 ease-in-out 
                           hover:-translate-y-1 hover:text-gray-800 active:text-gray-900
                           [&>svg]:transition-transform [&>svg]:duration-200 [&>svg]:ease-in-out
                           [&>svg]:hover:scale-110 [&>svg]:active:scale-105"
                  onClick={handleLogOut}
               >
                  <LogOut className="h-4 w-4" />
                  ထွက်မယ်
               </Typography>
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
         </Collapse>
      </Navbar>
   );
}
