import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
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
import { LOCALIZE_CONST } from "../consts/Consts";

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
   const { t } = useTranslation();

   useEffect(() => scrollToTop())

   return (
      <div className="min-h-screen bg-slate-50/30 pb-20 pt-10 font-poppins">
         <div className="container mx-auto px-4 max-w-4xl">
            {/* --- Header --- */}
            <div className="mb-12 text-center lg:text-left">
               <Typography className="text-blue-600 font-black uppercase tracking-widest text-[11px] mb-2">
                  {t(LOCALIZE_CONST.HELP_CENTER)}
               </Typography>
               <Typography className="text-4xl font-black text-slate-900 leading-tight">
                  {t(LOCALIZE_CONST.READER_GUIDE_TITLE)} <span className="text-blue-600">MM-Book-Store</span>
               </Typography>
               <Typography className="text-slate-500 mt-3 font-medium">
                  {t(LOCALIZE_CONST.READER_GUIDE_SUBTITLE)}
               </Typography>
            </div>

            {/* --- Quick Start Grid --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
               <ManualStep
                  icon={<Search className="text-blue-500" />}
                  title={t(LOCALIZE_CONST.RG_BROWSE_TITLE)}
                  desc={t(LOCALIZE_CONST.RG_BROWSE_DESC)}
               />
               <ManualStep
                  icon={<BookSolid className="text-emerald-500" />}
                  title={t(LOCALIZE_CONST.RG_READING_TITLE)}
                  desc={t(LOCALIZE_CONST.RG_READING_DESC)}
               />
               <ManualStep
                  icon={<Bookmark className="text-amber-500" />}
                  title={t(LOCALIZE_CONST.RG_BOOKMARK_TITLE)}
                  desc={t(LOCALIZE_CONST.RG_BOOKMARK_DESC)}
               />
               <ManualStep
                  icon={<ChatBubble className="text-indigo-500" />}
                  title={t(LOCALIZE_CONST.RG_CONTACT_TITLE)}
                  desc={t(LOCALIZE_CONST.RG_CONTACT_DESC)}
               />
            </div>

            {/* --- Detailed FAQ / Steps --- */}
            <Card className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm shadow-slate-200/50">
               <Accordion>
                  <Accordion.Item>
                     <Accordion.Trigger
                        className="border-b-slate-50 py-4 text-slate-900 font-black text-sm uppercase tracking-wide"
                     >
                        {t(LOCALIZE_CONST.RG_FAQ_1_Q)}
                        <NavArrowDown className="h-4 w-4 group-data-[open=true]:rotate-180" />
                     </Accordion.Trigger>
                     <Accordion.Content className="text-slate-500 font-medium">
                        {t(LOCALIZE_CONST.RG_FAQ_1_INTRO)}
                        <ul className="list-disc ml-5 mt-3 space-y-2">
                           <li>
                              <span className="text-slate-900 font-bold">{t(LOCALIZE_CONST.RG_FAQ_1_SEARCH_LABEL)}</span>{" "}
                              {t(LOCALIZE_CONST.RG_FAQ_1_SEARCH_DESC)}
                           </li>
                           <li>
                              <span className="text-slate-900 font-bold">{t(LOCALIZE_CONST.RG_FAQ_1_GENRE_LABEL)}</span>{" "}
                              {t(LOCALIZE_CONST.RG_FAQ_1_GENRE_DESC)}
                           </li>
                           <li>
                              <span className="text-slate-900 font-bold">{t(LOCALIZE_CONST.RG_FAQ_1_LATEST_LABEL)}</span>{" "}
                              {t(LOCALIZE_CONST.RG_FAQ_1_LATEST_DESC)}
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
                        {t(LOCALIZE_CONST.RG_FAQ_2_Q)}
                        <NavArrowDown className="h-4 w-4 group-data-[open=true]:rotate-180" />
                     </Accordion.Trigger>
                     <Accordion.Content className="text-slate-500 font-medium">
                        {t(LOCALIZE_CONST.RG_FAQ_2_INTRO_1)}{" "}
                        <span className="text-blue-600 font-bold">{t(LOCALIZE_CONST.RG_FAQ_2_SETTINGS)}</span>{" "}
                        {t(LOCALIZE_CONST.RG_FAQ_2_INTRO_2)}
                        <div className="grid grid-cols-2 gap-2 mt-4">
                           <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[12px]">
                              <b>{t(LOCALIZE_CONST.RG_FAQ_2_THEMES_LABEL)}</b> {t(LOCALIZE_CONST.RG_FAQ_2_THEMES_DESC)}
                           </div>
                           <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[12px]">
                              <b>{t(LOCALIZE_CONST.RG_FAQ_2_TYPOGRAPHY_LABEL)}</b> {t(LOCALIZE_CONST.RG_FAQ_2_TYPOGRAPHY_DESC)}
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
                        {t(LOCALIZE_CONST.RG_FAQ_3_Q)}
                        <NavArrowDown className="h-4 w-4 group-data-[open=true]:rotate-180" />
                     </Accordion.Trigger>
                     <Accordion.Content className="text-slate-500 font-medium">
                        {t(LOCALIZE_CONST.RG_FAQ_3_INTRO_1)}{" "}
                        <span className="text-slate-900 font-bold">{t(LOCALIZE_CONST.RG_FAQ_3_ADD_BTN)}</span>{" "}
                        {t(LOCALIZE_CONST.RG_FAQ_3_INTRO_2)}{" "}
                        <span className="text-blue-600 font-bold">{t(LOCALIZE_CONST.RG_FAQ_3_LIST_BTN)}</span>.
                     </Accordion.Content>
                  </Accordion.Item>
               </Accordion>

               <Accordion>
                  <Accordion.Item>
                     <Accordion.Trigger
                           className="border-b-slate-50 py-4 text-slate-900 font-black text-sm uppercase tracking-wide"
                     >
                        {t(LOCALIZE_CONST.RG_FAQ_4_Q)}
                        <NavArrowDown className="h-4 w-4 group-data-[open=true]:rotate-180" />
                     </Accordion.Trigger>
                     <Accordion.Content className="text-slate-500 font-medium">
                        {t(LOCALIZE_CONST.RG_FAQ_4_INTRO_1)}{" "}
                        <b>{t(LOCALIZE_CONST.CONTACT_US)}</b>{" "}
                        {t(LOCALIZE_CONST.RG_FAQ_4_INTRO_2)}
                        <ul className="list-none mt-3 space-y-2">
                           <li className="flex items-center gap-2">
                              <ArrowRight className="w-3 h-3 text-blue-500" /> {t(LOCALIZE_CONST.RG_FAQ_4_ITEM_1)}
                           </li>
                           <li className="flex items-center gap-2">
                              <ArrowRight className="w-3 h-3 text-blue-500" /> {t(LOCALIZE_CONST.RG_FAQ_4_ITEM_2)}
                           </li>
                           <li className="flex items-center gap-2">
                              <ArrowRight className="w-3 h-3 text-blue-500" /> {t(LOCALIZE_CONST.RG_FAQ_4_ITEM_3)}
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
