import { Typography, Button, Dialog, IconButton } from '@material-tailwind/react'
import { Breadcrumber } from '../components/BreadCrumber'
import { NavLink, useParams } from 'react-router-dom'
import { SkipNext, SkipPrev } from 'iconoir-react'
import { useDispatch, useSelector } from 'react-redux'
import { cleanNovels, getChapterByID, getChapterByIdStatus, getChapterByNovel } from '../states/features/novel/novelSlice'
import { Loader } from '../components/Loader'
import { isEmpty, scrollToTop } from '../functions/helpers'
import { LOCALIZE_CONST, ROUTES } from "../consts/Consts";
import { Breadcrumb } from "@material-tailwind/react";
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useEffect } from 'react'
import { Lock, Xmark } from 'iconoir-react/regular'
import { api } from '../axios/axios'
import { user } from '../states/features/user/userSlice'

export const Chapter = () => {

   const { t } = useTranslation();
   
   const dispatch = useDispatch();
   
   const { novel, volume, chapter } = useParams();
   
   const chapterById = useSelector(getChapterByID);
   const status = useSelector(getChapterByIdStatus);

   useEffect(() => {

      scrollToTop();
      dispatch(getChapterByNovel({ novel, chapter, volume }));
      
      return () => {
         dispatch(cleanNovels());
      }
   }, [novel, volume, chapter])

   const content = status == "pending" ? (
      <Loader />
   ) : (
      <div className="w-10/12 mx-auto flex flex-col gap-y-7">

         <div className='flex flex-row justify-between items-center'>

            <Breadcrumber novel_id={novel} />

            <Breadcrumb className="gap-2">

               <Breadcrumb.Link
                  as={NavLink}
                  to={
                     ROUTES.CHAPTER_BY_ID
                        .replace(":novel", novel)
                        .replace(":volume", volume)
                     .replace(":chapter", chapterById?.prev_chapter)
                  }
                  onClick={(e) => {
                     if (!chapterById?.prev_chapter) e.preventDefault();
                  }}
                  className={
                     `flex items-center gap-1 rounded px-2 py-1 border transition-all 
                     ${chapterById?.prev_chapter 
                        ? "bg-primary text-primary-foreground border-transparent hover:bg-white hover:text-primary hover:shadow-lg hover:border hover:border-slate-400" 
                        : "bg-muted text-muted-foreground border border-muted pointer-events-none opacity-60"}`
                  }
               >
                  <SkipPrev className="h-4 w-4" />
                  {t(LOCALIZE_CONST.BACK)}
               </Breadcrumb.Link>

               <Breadcrumb.Link
                  as={NavLink}
                  to={
                     ROUTES.CHAPTER_BY_ID
                        .replace(":novel", novel)
                        .replace(":volume", volume)
                     .replace(":chapter", chapterById?.next_chapter)
                  }
                  onClick={(e) => {
                     if (!chapterById?.next_chapter) e.preventDefault();
                  }}
                  className={
                     `flex items-center gap-1 rounded px-2 py-1 border transition-all 
                     ${chapterById?.next_chapter 
                        ? "bg-primary text-primary-foreground border-transparent hover:bg-white hover:text-primary hover:shadow-lg hover:border hover:border-slate-400" 
                        : "bg-muted text-muted-foreground border border-muted pointer-events-none opacity-60"}`
                  }
               >
                  {t(LOCALIZE_CONST.NEXT)}
                  <SkipNext className="h-4 w-4" />
               </Breadcrumb.Link>

            </Breadcrumb>

         </div>
   
         <div className="p-5 border border-slate-400 rounded-md shadow-lg">
            <div className="flex flex-col mb-10 gap-y-3 items-center">
               <Typography type="h6">အပိုင်း {chapterById?.chapter_number}</Typography>
               <Typography type="h5">{chapterById?.title}</Typography>
            </div>
            <div
               className="leading-8"
               dangerouslySetInnerHTML={{ __html: chapterById?.content }}
            />
         </div>
      </div>
   );

   return content;
}
