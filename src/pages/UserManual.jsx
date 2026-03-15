import React, { useEffect } from "react";
import {
   Typography,
   Card,
   Accordion
} from "@material-tailwind/react";
import {
   Search,
   BookSolid,
   Bookmark,
   ChatBubble,
   NavArrowDown,
   ArrowRight,
} from "iconoir-react";
import { scrollToTop } from "../functions/helpers";

/* --- Helper Component --- */
const ManualStep = ({ icon, title, desc }) => (
   <Card className="p-5 rounded-[1.5rem] border border-slate-100 shadow-none bg-white/50">
      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4 border border-slate-50">
         {React.cloneElement(icon, {
            className: `w-5 h-5 ${icon.props.className}`,
         })}
      </div>
      <Typography className="text-slate-900 font-black text-[13px] uppercase tracking-wide mb-1">
         {title}
      </Typography>
      <Typography className="text-slate-500 text-[12px] font-medium leading-relaxed">
         {desc}
      </Typography>
   </Card>
);

export const UserManual = () => {

   useEffect(() => scrollToTop())

   return (
      <div className="min-h-screen bg-slate-50/30 pb-20 pt-10 font-poppins">
         <div className="container mx-auto px-4 max-w-4xl">
            {/* --- Header --- */}
            <div className="mb-12 text-center lg:text-left">
               <Typography className="text-blue-600 font-black uppercase tracking-widest text-[11px] mb-2">
                  Help Center
               </Typography>
               <Typography className="text-4xl font-black text-slate-900 leading-tight">
                  How to use <span className="text-blue-600">MM-Book-Store</span>
               </Typography>
               <Typography className="text-slate-500 mt-3 font-medium">
                  Everything you need to know about browsing, reading, and managing
                  your library.
               </Typography>
            </div>

            {/* --- Quick Start Grid --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
               <ManualStep
                  icon={<Search className="text-blue-500" />}
                  title="Browse & Discover"
                  desc="Use our search bar or filter by genre to find your next favorite Chinese web novel."
               />
               <ManualStep
                  icon={<BookSolid className="text-emerald-500" />}
                  title="Reading Experience"
                  desc="Customize your font size, themes, and spacing for a comfortable reading session."
               />
               <ManualStep
                  icon={<Bookmark className="text-amber-500" />}
                  title="Save Bookmarks"
                  desc="Keep track of your progress by adding novels to your personal library."
               />
               <ManualStep
                  icon={<ChatBubble className="text-indigo-500" />}
                  title="Get in Touch"
                  desc="Found a bug or have a suggestion? Our translation team is just a message away."
               />
            </div>

            {/* --- Detailed FAQ / Steps --- */}
            <Card className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm shadow-slate-200/50">
               <Accordion>
                  <Accordion.Item>
                     <Accordion.Trigger
                        className="border-b-slate-50 py-4 text-slate-900 font-black text-sm uppercase tracking-wide"
                     >
                        1. How do I browse for novels?
                        <NavArrowDown className="h-4 w-4 group-data-[open=true]:rotate-180" />
                     </Accordion.Trigger>
                     <Accordion.Content className="text-slate-500 font-medium">
                        You can explore our library in three ways:
                        <ul className="list-disc ml-5 mt-3 space-y-2">
                           <li>
                              <span className="text-slate-900 font-bold">Search Bar:</span>{" "}
                              Type the title or author name in the header search input.
                           </li>
                           <li>
                              <span className="text-slate-900 font-bold">
                              Genre Filter:
                              </span>{" "}
                              Use the genre tags on the homepage to find specific themes
                              like "Xianxia" or "Romance".
                           </li>
                           <li>
                              <span className="text-slate-900 font-bold">
                              Latest Updates:
                              </span>{" "}
                              Check the "Recently Added" section for the newest translated
                              chapters.
                           </li>
                        </ul>
                     </Accordion.Content>
                  </Accordion.Item>
               </Accordion>

               <Accordion>
                  <Accordion.Item>
                     <Accordion.Trigger
                        className="border-b-slate-50 py-4 text-slate-900 font-black text-sm uppercase tracking-wide"
                     >
                        2. How to customize the Reader?
                        <NavArrowDown className="h-4 w-4 group-data-[open=true]:rotate-180" />
                     </Accordion.Trigger>
                     <Accordion.Content className="text-slate-500 font-medium">
                        While reading a chapter, click the{" "}
                        <span className="text-blue-600 font-bold">Settings (Gear)</span>{" "}
                        icon at the bottom right. You can adjust:
                        <div className="grid grid-cols-2 gap-2 mt-4">
                           <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[12px]">
                              <b>Themes:</b> Light, Sepia, or Dark mode.
                           </div>
                           <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[12px]">
                              <b>Typography:</b> Font size and line spacing.
                           </div>
                        </div>
                     </Accordion.Content>
                  </Accordion.Item>
               </Accordion>

               <Accordion>
                  <Accordion.Item>
                     <Accordion.Trigger
                        className="border-b-slate-50 py-4 text-slate-900 font-black text-sm uppercase tracking-wide"
                     >
                        3. Managing your Bookmarks
                        <NavArrowDown className="h-4 w-4 group-data-[open=true]:rotate-180" />
                     </Accordion.Trigger>
                     <Accordion.Content className="text-slate-500 font-medium">
                        To save a novel, ensure you are logged in. Click the{" "}
                        <span className="text-slate-900 font-bold">"Add to Library"</span>{" "}
                        button on the novel detail page. You can view all saved items by
                        clicking your profile icon and selecting{" "}
                        <span className="text-blue-600 font-bold">"Reading List"</span>.
                     </Accordion.Content>
                  </Accordion.Item>
               </Accordion>

               <Accordion>
                  <Accordion.Item>
                     <Accordion.Trigger
                           className="border-b-slate-50 py-4 text-slate-900 font-black text-sm uppercase tracking-wide"
                     >
                        4. Contacting the Support Team
                        <NavArrowDown className="h-4 w-4 group-data-[open=true]:rotate-180" />
                     </Accordion.Trigger>
                     <Accordion.Content className="text-slate-500 font-medium">
                        Need help? You can reach us via the <b>Contact Us</b> page. We
                        typically respond within 24 hours regarding:
                        <ul className="list-none mt-3 space-y-2">
                           <li className="flex items-center gap-2">
                              <ArrowRight className="w-3 h-3 text-blue-500" /> Translation
                              error reports
                           </li>
                           <li className="flex items-center gap-2">
                              <ArrowRight className="w-3 h-3 text-blue-500" /> Account
                              recovery issues
                           </li>
                           <li className="flex items-center gap-2">
                              <ArrowRight className="w-3 h-3 text-blue-500" /> Novel
                              requests
                           </li>
                        </ul>
                     </Accordion.Content>
                  </Accordion.Item>
               </Accordion>
            </Card>
         </div>
      </div>
   );
};
