import { Typography } from "@material-tailwind/react";

const YEAR = new Date().getFullYear();

const LINKS = [
   {
      title: "ကျုပ်တို့အကြောင်း",
      href: "/about-us",
   },
   {
      title: "စာရေးဆရာအဖြစ် စာရင်းသွင်းရန်",
      href: "/register-as-author",
   },
   {
      title: "ဆက်သွယ်ရန်",
      href: "/contact-us",
   },
];

export const Footer = () => {
   return (
      <footer className="container mx-auto w-full px-4 py-6 relative bg-slate-50">
         <hr className="my-4 border-slate-900" />
         <div className="flex w-full flex-row flex-wrap items-center justify-center gap-x-12 gap-y-3 text-center md:justify-between">
         <Typography className="text-center text-slate-800">
            &copy; {YEAR} MM-BOOK-STORE
         </Typography>
         <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {LINKS.map(({ title, href }, key) => (
               <li key={key}>
               <Typography 
                  as="a" 
                  href={href} 
                  className="hover:text-primary transition-all duration-100 ease-in-out hover:underline "
                  style={{
                     textShadow: '0 0 1px rgba(0,0,0,0.1)',
                     '&:hover': {
                     textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                     }
                  }}
               >
                  {title}
               </Typography>
               </li>
            ))}
         </ul>
         </div>
      </footer>
   );
};