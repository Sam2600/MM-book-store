import { Typography, Button, Dialog, IconButton } from '@material-tailwind/react'
import { Breadcrumber } from '../components/BreadCrumber'
import { NavLink, useParams } from 'react-router-dom'
import { SkipNext, SkipPrev } from 'iconoir-react'
import { useDispatch, useSelector } from 'react-redux'
import { cleanNovels, getChapterByID, getChapterByIdStatus, getChapterByNovel } from '../states/features/novel/novelSlice'
import { Loader } from '../components/Loader'
import { getLoginUserId, isEmpty, scrollToTop } from '../functions/helpers'
import { LOCALIZE_CONST, ROUTES } from "../consts/Consts";
import { Breadcrumb } from "@material-tailwind/react";
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useEffect } from 'react'
import { Lock, Xmark } from 'iconoir-react/regular'
import { api } from '../axios/axios'
import { user } from '../states/features/user/userSlice'

export const ChapterDetailPageWithPurchaseFeature = () => {

   const { t } = useTranslation();
   
   const dispatch = useDispatch();

   const userState = useSelector(user);
   
   const { novel, volume, chapter } = useParams();
   
   const chapterById = useSelector(getChapterByID);
   const status = useSelector(getChapterByIdStatus);

   const [isPurchasing, setIsPurchasing] = useState(false);
   const [showLoginPrompt, setShowLoginPrompt] = useState(false);

   useEffect(() => {

      scrollToTop();
      dispatch(getChapterByNovel({ novel, chapter, volume }));
      
      return () => {
         dispatch(cleanNovels());
      }
   }, [novel, volume, chapter])

   const handlePurchase = async () => {

      // If user is not logged in
      if (isEmpty(userState)) {
         setShowLoginPrompt(true);
         return;
      }

      setIsPurchasing(true);

      try {

         await api.post(`novels/${novel}/volumes/${volume}/chapters/${chapter}/purchase`);

         dispatch(getChapterByNovel({ novel, chapter, volume }));

      } catch (error) {

         // If API returns 401 Unauthorized
         if (error.response?.status === 401) {
               setShowLoginPrompt(true);
         } else {
               alert(error.response?.data?.message || "Purchase failed");
         }
      } finally {
         setIsPurchasing(false);
      }
   };

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
   
            
            {status === "success" ? (
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
                              <Typography type="h5">
                                 {showLoginPrompt ? "အကောင့်ဝင်ရန် လိုအပ်သည်" : "ဝယ်ယူမှုကို အတည်ပြုပါ"}
                              </Typography>
                              <Dialog.DismissTrigger as={IconButton} size="sm" variant="ghost" isCircular onClick={() => setShowLoginPrompt(false)}>
                                 <Xmark className="h-5 w-5" />
                              </Dialog.DismissTrigger>
                           </div>

                           {showLoginPrompt ? (
                              // LOGIN REDIRECT VIEW
                              <div className="flex flex-col items-center py-4">
                                 <Typography className="mb-6 text-center text-slate-600">
                                 ဤအပိုင်းကို ဝယ်ယူရန်အတွက် ဦးစွာ အကောင့်ဝင်ပေးရန် လိုအပ်ပါသည်။
                                 </Typography>
                                 <div className="flex gap-3 w-full">
                                 <Dialog.DismissTrigger as={Button} variant="ghost" className="flex-1" onClick={() => setShowLoginPrompt(false)}>
                                    နောက်မှ
                                 </Dialog.DismissTrigger>
                                 <Button 
                                    as={NavLink} 
                                    to={ROUTES.SIGN_IN} // Ensure this route is defined in your Consts
                                    color="amber" 
                                    className="flex-1 text-center flex items-center justify-center"
                                 >
                                    Login ဝင်မည်
                                 </Button>
                                 </div>
                              </div>
                           ) : (
                           // STANDARD PURCHASE VIEW
                           <>
                              <Typography className="mb-8 text-slate-600">
                                 လက်ရှိ အပိုင်းဆက်အား 10 coins ဖြင့် ဝယ်ယူရန် သေချာပါသလား?
                              <br />
                              <span className="text-sm mt-2 block italic text-slate-400">
                                 Your balance: {userState?.coins || 0} Coins
                              </span>
                              </Typography>

                              <div className="flex justify-end gap-3">
                              <Dialog.DismissTrigger as={Button} variant="ghost" color="secondary">
                                 မလုပ်တော့ပါ
                              </Dialog.DismissTrigger>
                              
                              <Button 
                                 color="amber" 
                                 loading={isPurchasing}
                                 disabled={userState && userState?.coins < chapterById?.price}
                                 onClick={handlePurchase}
                              >
                                 ဝယ်ယူမည်
                              </Button>
                              </div>
                           </>
                        )}
                        </Dialog.Content>
                     </Dialog.Overlay>
                  </Dialog>
               </div>
            )}
      </div>
   );

   return content;
}
