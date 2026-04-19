import { useEffect } from 'react'
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';
import { Header } from '../components/Header'
import { Categories } from '../components/Categories'
import { Loader } from '../components/Loader';
import { LatestUpdates } from '../components/LatestUpdates'
import { NovelCarousel } from '../components/NovelCarousel';
import { getFetchNovels, getAllNovelsStatus, getNovels, cleanNovels } from "../states/features/novel/novelSlice.js";
import { LOCALIZE_CONST, ROUTES } from '../consts/Consts';

export const Novels = () => {
   const { t } = useTranslation();
   const dispatch = useDispatch();
   const novels = useSelector(getFetchNovels);
   const status = useSelector(getAllNovelsStatus);

   useEffect(() => {
      dispatch(getNovels());
      return () => dispatch(cleanNovels());
   }, []);

   if (status === 'pending') return <Loader />;

   return (
      <motion.div
         className="flex flex-col gap-2"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1, transition: { duration: 0.25 } }}
         exit={{ opacity: 0 }}
      >
         <Header popular_all_time={novels?.popular_all_time} latest_novel={novels?.latest_novel} />
         <NovelCarousel title={t(LOCALIZE_CONST.POPULAR_IN_THIS_WEEK)}  novels={novels?.popular_week}  viewAllTo={ROUTES.POPULAR_WEEK} />
         <NovelCarousel title={t(LOCALIZE_CONST.POPULAR_IN_THIS_MONTH)} novels={novels?.popular_month} viewAllTo={ROUTES.POPULAR_MONTH} />
         <LatestUpdates latest_updates={novels?.latest_updates} />
         <NovelCarousel title={t(LOCALIZE_CONST.ENDED_NOVELS)} novels={novels?.ended_novels} viewAllTo={ROUTES.ENDED_NOVELS} />
         <Categories categories={novels?.categories} />
      </motion.div>
   );
}
