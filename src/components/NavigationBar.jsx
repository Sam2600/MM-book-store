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
} from "iconoir-react";

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

export const NavigationBar = () => {
   
   const [openNav, setOpenNav] = React.useState(false);

   React.useEffect(() => {
      window.addEventListener(
         "resize",
         () => window.innerWidth >= 960 && setOpenNav(false),
      );
   }, []);

   return (
      <Navbar className="w-full max-w-screen-xl top-0 sticky border border-b-slate-300 shwdow-none rounded-none z-20">
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
         <div className="ml-auto w-56 border border-slate-900 rounded-md">
            <Input size="md" type="search"placeholder="ရှာဖွေရန်...">
               <Input.Icon>
               <Search className="h-full w-full" />
               </Input.Icon>
            </Input>
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
