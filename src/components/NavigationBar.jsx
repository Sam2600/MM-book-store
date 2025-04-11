import * as React from "react";
import {
   IconButton,
   Typography,
   Collapse,
   Navbar,
   Input,
} from "@material-tailwind/react";
import {
   Menu,
   MultiplePages,
   ProfileCircle,
   Search,
   SelectFace3d,
   Xmark,
   CloudUpload
} from "iconoir-react";
import { NavLink } from "react-router-dom";

const LINKS = [
   {
      icon: MultiplePages,
      title: "သိမ်းထားသည့် စာအုပ်များ",
      href: "/my-books",
   },
   {
      icon: ProfileCircle,
      title: "အကောင့်",
      href: "/account",
   },
   {
      icon: SelectFace3d,
      title: "စာဖတ်သူ လမ်းညွှန်",
      href: "/guides",
   },
   {
      icon: CloudUpload,
      title: "စာတင်မယ်",
      href: "/upload-chapters",
   }
];

function NavList() {
   return (
      <ul className="mt-4 flex flex-col gap-x-3 gap-y-1.5 lg:mt-0 lg:flex-row lg:items-center">
         {LINKS.map(({ icon: Icon, title, href }) => (
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

const DEFAULT_SUGGESTIONS = [
   { name: "Dark Master" },
   { name: "Shadow Monarch" },
   { name: "Vessel of darkness" },
   { name: "Beru" },
];

export const NavigationBar = () => {
   
   const [search, setSerch] = React.useState("");
   const [openNav, setOpenNav] = React.useState(false);

   const [filteredNovels, setFilteredNovels] = React.useState([]);

   const handleClick = (e) => {

      const searchKey = e?.target?.value;

      setFilteredNovels(
         searchKey
            ? DEFAULT_SUGGESTIONS.filter(val => 
               val.name.toLowerCase().includes(searchKey.toLowerCase())
               )
            : []
      );

      setSerch(searchKey);
   };

   const handleNavClick = (e) => {
      e.target.value = "";
      setSerch("");
      setFilteredNovels([]);
   }

   React.useEffect(() => {
      window.addEventListener(
         "resize",
         () => window.innerWidth >= 960 && setOpenNav(false),
      );
   }, []);

   return (
      <Navbar className="w-full max-w-screen-xl top-0 sticky border border-b-slate-300 shadow-none rounded-none z-20 overflow-visible">
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
            <div className="ml-auto w-56 rounded-md relative">
               <Input
                  onChange={(e) => handleClick(e)}
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

               {filteredNovels.length > 0 && (
                  <div className="absolute top-full left-0 w-full z-[9999] rounded-md mt-1 bg-white shadow-lg border border-slate-900">
                     <ul className="max-h-60 overflow-y-auto">
                        {filteredNovels.map((fn, index) => (
                           <>
                              <NavLink onClick={(e) => handleNavClick(e)} to={"/novels/1001"}>
                                 <li
                                    key={fn?.name}
                                    className="cursor-pointer py-2 px-3 hover:bg-slate-100 hover:rounded-md"
                                 >
                                    {fn?.name}
                                 </li>
                              </NavLink>
                              {index != filteredNovels.length -1 &&  <hr className="border-slate-500" />}
                           </>
                        ))}
                     </ul>
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
         </Collapse>
      </Navbar>
   );
}
