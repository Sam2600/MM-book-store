import { Button, ButtonGroup, Typography } from '@material-tailwind/react'
import React, { useEffect } from 'react'
import { Breadcrumber } from '../components/BreadCrumber'
import { NavLink, useParams } from 'react-router-dom'
import { Book, SkipNext } from 'iconoir-react'
import { useDispatch, useSelector } from 'react-redux'
import { getChapterByID, getChapterByIdStatus, getChapterByNovel } from '../states/features/novel/novelSlice'
import { Loader } from '../components/Loader'

export const Chapter = () => {

   const {novel, volume, chapter} = useParams();

   const dispatch = useDispatch();

   const chapterById = useSelector(getChapterByID);
   const status = useSelector(getChapterByIdStatus);

   useEffect(() => {
         window.scrollTo({ top: 0 })
         dispatch(getChapterByNovel({novel, volume, chapter}));
   }, [])

   const content = status == "pending" ? (
      <Loader />
   ) : (
      <div className="w-10/12 mx-auto flex flex-col gap-y-3">

         {/* <div className='flex flex-row justify-between'>

            <Breadcrumber />

            <ButtonGroup variant="outline">
               <Button>
                  <Book className="mr-1.5 h-4 w-4 stroke-2" />
                  Novel
               </Button>

               <Button>
                  Next
                  <SkipNext className="ml-1.5 h-4 w-4 stroke-2" />
               </Button>
            </ButtonGroup>
         </div> */}
      
      <div className="p-5 border border-slate-400 rounded-md shadow-lg">
         <div className="flex flex-col mb-10 gap-y-3 items-center">
            <Typography type="h6">အပိုင်း {chapterById?.chapter?.id}</Typography>
            <Typography type="h5">{chapterById?.chapter?.title}</Typography>
         </div>

         <div
            className="leading-8"
            dangerouslySetInnerHTML={{ __html: chapterById?.chapter?.content }}
         />
      </div>

   </div>
   );

   return content;
}
