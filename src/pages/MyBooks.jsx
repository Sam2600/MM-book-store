import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBookMarkedCollection, getBookMarks, getBookMarkStatus } from "../states/features/user/userSlice";
import { Loader } from "../components/Loader";
import { BookmarkNovel } from "../components/BookmarkNovel";
import { useTranslation } from "react-i18next";
import { LOCALIZE_CONST } from "../consts/Consts";

export const MyBooks = () => {

   const dispatch = useDispatch();

   const { t } = useTranslation();

   const status = useSelector(getBookMarkStatus);

   const bookMarks = useSelector(getBookMarks);

   let content = null;
      
   if (status == "pending") {
      content = <Loader />;
   } else {
      content = (
         <div className="w-11/12 mx-auto my-auto flex flex-col gap-5 items-center">
            {bookMarks?.length ? bookMarks.map(bm => {
               return (
                  <BookmarkNovel key={bm?.id} bookmark={bm} />
               )
            }) : <div className="mx-auto my-auto text-center font-monip text-pretty font-medium text-lg shadow-lg border p-5 w-8/12">{ t(LOCALIZE_CONST.NO_BOOKMARK) }</div>
            }
         </div>
      )
   }

   useEffect(() => {

      dispatch(getBookMarkedCollection());

   }, []);


   
   return content;
}