import { useEffect } from 'react'
import { Header } from '../components/Header'
import { Categories } from '../components/Categories'
import { Loader } from '../components/Loader';
import { Populars } from '../components/Populars';
import { useDispatch, useSelector } from 'react-redux'
import { getFetchNovels, getAllNovelsStatus, getNovels } from "../states/features/novel/novelSlice.js";

export const Novels = () => {

   const novels = useSelector(getFetchNovels);

   const dispatch = useDispatch();
   
   const status = useSelector(getAllNovelsStatus);

   useEffect(() => {
      dispatch(getNovels());
   }, [])
   

   const content =  status == "pending" ?
      <Loader /> :
      <div className="flex flex-col gap-2">
         <Header popular_all_time={novels?.popular_all_time} latest_novel={novels?.latest_novel} />
         <Populars popular_week={novels?.popular_week} popular_month={novels?.popular_month} />
         <Categories categories={novels?.categories} />
      </div>;

   return content;
}
