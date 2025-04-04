import { Typography } from "@material-tailwind/react";

const YEAR = new Date().getFullYear();

const LINKS = [
   {
      title: "About Us",
      href: "#",
   },
   {
      title: "License",
      href: "#",
   },
   {
      title: "Contact Us",
      href: "#",
   },
];

export const Footer = () => {
   return (
      <footer className="container mx-auto w-full px-4 py-6 relative">
         <hr className="my-4 border-surface" />
         <div className="flex w-full flex-row flex-wrap items-center justify-center gap-x-12 gap-y-3 text-center md:justify-between">
         <Typography className="text-center">
            &copy; {YEAR} MM-BOOK-STORE
         </Typography>
         <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {LINKS.map(({ title, href }, key) => (
               <li key={key}>
               <Typography as="a" href={href} className="hover:text-primary">
                  {title}
               </Typography>
               </li>
            ))}
         </ul>
         </div>
      </footer>
   );
}
