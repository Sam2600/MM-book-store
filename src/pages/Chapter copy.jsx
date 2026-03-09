import { Typography, Button, Dialog, IconButton } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { Breadcrumber } from '../components/BreadCrumber'
import { NavLink, useParams, useLocation } from 'react-router-dom'
import { SkipNext, SkipPrev, Lock, Xmark } from 'iconoir-react' 
import { useDispatch, useSelector } from 'react-redux'
import { 
   cleanNovels, 
   getChapterByNovel, 
   getChapterByID, 
   getChapterByIdStatus 
} from '../states/features/novel/novelSlice'
import { Loader } from '../components/Loader'
import { scrollToTop } from '../functions/helpers'
import { LOCALIZE_CONST, ROUTES } from "../consts/Consts";
import { Breadcrumb } from "@material-tailwind/react";
import { useTranslation } from 'react-i18next'
import { api } from '../axios/axios'

export const Chapter = () => {
   const { t } = useTranslation();
   const { novel, chapter } = useParams();
   const dispatch = useDispatch();
   const location = useLocation();

   const chapterById = useSelector(getChapterByID);
   const status = useSelector(getChapterByIdStatus);
   const user = {
      coins: 100 // Placeholder for user coins, replace with actual user data from state
   }
      //useSelector((state) => state.auth.user); 

   const [isPurchasing, setIsPurchasing] = useState(false);
   const volumeNumber = location.state?.volume_number;

   useEffect(() => {
      scrollToTop();
      dispatch(getChapterByNovel({ novel, chapter, volumeNumber }));
      return () => { dispatch(cleanNovels()); }
   }, [novel, chapter, dispatch]);

   const handlePurchase = async () => {
      setIsPurchasing(true);
      try {
         await api.post(`/chapters/${chapterById.id}/purchase`);
         // Re-fetch to get 'content' once unlocked
         dispatch(getChapterByNovel({ novel, chapter, volumeNumber }));
      } catch (error) {
         alert(error.response?.data?.message || "Purchase failed");
      } finally {
         setIsPurchasing(false);
      }
   };

   if (status === "pending") return <Loader />;

   return (
      <div className="w-10/12 mx-auto flex flex-col gap-y-7 mb-20">
         {/* Navigation Header */}
         <div className='flex flex-row justify-between items-center'>
            <Breadcrumber novel_id={novel} />
            <div className="flex gap-2">
                {/* Back Button */}
                <NavLink
                    to={ROUTES.CHAPTER_BY_ID.replace(":novel", novel).replace(":chapter", chapterById?.prev_chapter)}
                    className={`flex items-center gap-1 rounded px-3 py-1.5 border transition-all text-sm font-medium
                        ${chapterById?.prev_chapter ? "bg-white text-slate-900 border-slate-300 hover:bg-slate-50" : "bg-slate-100 text-slate-400 pointer-events-none"}`}
                    onClick={(e) => !chapterById?.prev_chapter && e.preventDefault()}
                >
                    <SkipPrev className="h-4 w-4" /> {t(LOCALIZE_CONST.BACK)}
                </NavLink>

                {/* Next Button */}
                <NavLink
                    to={ROUTES.CHAPTER_BY_ID.replace(":novel", novel).replace(":chapter", chapterById?.next_chapter)}
                    className={`flex items-center gap-1 rounded px-3 py-1.5 border transition-all text-sm font-medium
                        ${chapterById?.next_chapter ? "bg-white text-slate-900 border-slate-300 hover:bg-slate-50" : "bg-slate-100 text-slate-400 pointer-events-none"}`}
                    onClick={(e) => !chapterById?.next_chapter && e.preventDefault()}
                >
                    {t(LOCALIZE_CONST.NEXT)} <SkipNext className="h-4 w-4" />
                </NavLink>
            </div>
         </div>

         {/* Content Area */}
         <div className="p-6 border border-slate-300 rounded-lg shadow-sm bg-white">
            <div className="flex flex-col mb-10 gap-y-2 items-center">
               <Typography type="h6" className="text-slate-500">အပိုင်း {chapterById?.chapter_number}</Typography>
               <Typography type="h4" className="text-slate-900 text-center">{chapterById?.title}</Typography>
            </div>

            {chapterById?.is_unlocked ? (
               <div
                  className="leading-loose text-lg text-slate-800"
                  dangerouslySetInnerHTML={{ __html: chapterById?.content }}
               />
            ) : (
               /* THE LOCK SCREEN + DIALOG */
               <div className="flex flex-col items-center py-20 bg-slate-50 rounded-lg border border-slate-200">
                  <Lock className="h-10 w-10 text-amber-600 mb-4" />
                  <Typography type="h5" className="mb-2">ဤအပိုင်းကို ဖတ်ရှုရန် ဝယ်ယူပါ</Typography>
                  <Typography className="text-slate-500 mb-6">
                     ကုန်ကျစရိတ် - {chapterById?.price} Coins
                  </Typography>

                  <Dialog>
                     {/* The Trigger button opens the modal */}
                     <Dialog.Trigger as={Button} color="amber" size="lg">
                        Unlock Now
                     </Dialog.Trigger>
                     
                     <Dialog.Overlay>
                        <Dialog.Content className="p-6">
                           <div className="flex items-center justify-between mb-4">
                              <Typography type="h5">ဝယ်ယူမှုကို အတည်ပြုပါ</Typography>
                              <Dialog.DismissTrigger as={IconButton} size="sm" variant="ghost" isCircular>
                                 <Xmark className="h-5 w-5" />
                              </Dialog.DismissTrigger>
                           </div>

                           <Typography className="mb-8 text-slate-600">
                              "<b>{chapterById?.title}</b>" ကို {chapterById?.price} coins ဖြင့် ဝယ်ယူရန် သေချာပါသလား?
                              <br />
                              <span className="text-sm mt-2 block italic text-slate-400">
                                 Your balance: {user?.coins || 0} Coins
                              </span>
                           </Typography>

                           <div className="flex justify-end gap-3">
                              <Dialog.DismissTrigger as={Button} variant="ghost" color="secondary">
                                 မလုပ်တော့ပါ
                              </Dialog.DismissTrigger>
                              
                              {/* Confirming also dismisses the dialog on success */}
                              <Button 
                                 color="amber" 
                                 loading={isPurchasing}
                                 disabled={user?.coins < chapterById?.price}
                                 onClick={handlePurchase}
                              >
                                 ဝယ်ယူမည်
                              </Button>
                           </div>
                        </Dialog.Content>
                     </Dialog.Overlay>
                  </Dialog>
               </div>
            )}
         </div>
      </div>
   );
}