import React from 'react'
import { Header } from '../components/Header'
import { Categories } from '../components/Categories'
import { Loader } from '../components/Loader';
import { Populars } from '../components/Populars';
import { useSelector } from 'react-redux'
import { getFetchNovels, getAllNovelsStatus } from "../states/features/novel/novelSlice.js";

export const Novels = () => {

   const novels = useSelector(getFetchNovels);
   
   const status = useSelector(getAllNovelsStatus);

   const content =  status == "pending" ?
      <Loader /> :
      <>
         <Header popular_all_time={novels?.popular_all_time} latest_novel={novels?.latest_novel} />
         <Populars popular_week={novels?.popular_week} popular_month={novels?.popular_month} />
         <Categories categories={novels?.categories} />
      </>;

   return content;
}
