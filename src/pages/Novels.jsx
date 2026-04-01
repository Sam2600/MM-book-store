import { useEffect } from 'react'
import { motion } from "framer-motion";
import { Header } from '../components/Header'
import { Categories } from '../components/Categories'
import { Loader } from '../components/Loader';
import { Populars } from '../components/Populars';
import { LatestUpdates } from '../components/LatestUpdates';
import { useDispatch, useSelector } from 'react-redux'
import { getFetchNovels, getAllNovelsStatus, getNovels, cleanNovels } from "../states/features/novel/novelSlice.js";

export const Novels = () => {

   const novels = useSelector(getFetchNovels);

   const dispatch = useDispatch();
   
   const status = useSelector(getAllNovelsStatus);

   useEffect(() => {
      dispatch(getNovels());

      return () => {
         dispatch(cleanNovels());
      }
   }, [])
   

   const content =  status == "pending" ?
      <Loader /> :
      <motion.div
         layout
         className="flex flex-col gap-2"
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1, transition: { duration: 0.25 } }}
         exit={{ opacity: 0 }}
         viewport={{ once: true }}
      >
         <Header popular_all_time={novels?.popular_all_time} latest_novel={novels?.latest_novel} />
         <Populars popular_week={novels?.popular_week} popular_month={novels?.popular_month} />
         <LatestUpdates latest_updates={novels?.latest_updates} />
         <Categories categories={novels?.categories} />
      </motion.div>;

   return content;
}
