import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { Folder } from 'iconoir-react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import {
   getNovelsByCategory, cleanCategoryNovels,
   getNovelsByChapter, hasMore, page, getNovelsByChapterStatus,
   fetchEndedNovels, cleanEndedNovels,
   getEndedNovels, getEndedPage, getEndedHasMore, getEndedNovelsStatus,
} from '../states/features/novel/novelSlice';
import { scrollToTop } from '../functions/helpers';
import { NovelListPage } from '../components/NovelListPage';

const CONFIG = {
   category: {
      icon:        <Folder className="h-5 w-5" />,
      badge:       'Browse by Genre',
      badgeColor:  'blue',
      emptyText:   'No novels found in this category.',
   },
   ended: {
      icon:        <CheckCircleIcon className="h-5 w-5" />,
      badge:       'Completed Stories',
      badgeColor:  'emerald',
      title:       'Ended Novels',
      description: 'These stories have reached their conclusion. Enjoy a complete reading experience from start to finish.',
      emptyText:   'No ended novels yet. Check back later.',
   },
};

export const NovelBrowsePage = ({ type }) => {
   const dispatch   = useDispatch();
   const { category } = useParams();

   // --- category selectors ---
   const categoryNovels = useSelector(getNovelsByChapter);
   const categoryPage   = useSelector(page);
   const categoryHasMore = useSelector(hasMore);
   const categoryStatus = useSelector(getNovelsByChapterStatus);

   // --- ended selectors ---
   const endedNovels  = useSelector(getEndedNovels);
   const endedPage    = useSelector(getEndedPage);
   const endedHasMore = useSelector(getEndedHasMore);
   const endedStatus  = useSelector(getEndedNovelsStatus);

   const { ref, inView } = useInView({ threshold: 0, rootMargin: '200px' });

   // Initial fetch + cleanup
   useEffect(() => {
      scrollToTop();
      if (type === 'category') {
         dispatch(cleanCategoryNovels());
         dispatch(getNovelsByCategory({ category, page: 1 }));
      } else {
         dispatch(cleanEndedNovels());
         dispatch(fetchEndedNovels(1));
      }
      return () => {
         type === 'category' ? dispatch(cleanCategoryNovels()) : dispatch(cleanEndedNovels());
      };
   }, [type, category, dispatch]);

   // Infinite scroll
   useEffect(() => {
      if (type === 'category') {
         if (categoryStatus === 'pending') return;
         if (inView && categoryHasMore && categoryNovels.length > 0) {
            const next = categoryPage > 1 ? categoryPage : 2;
            dispatch(getNovelsByCategory({ category, page: next }));
         }
      } else {
         if (endedStatus === 'pending') return;
         if (inView && endedHasMore && endedNovels.length > 0) {
            dispatch(fetchEndedNovels(endedPage));
         }
      }
   }, [inView, type, category,
      categoryStatus, categoryHasMore, categoryPage, categoryNovels.length,
      endedStatus, endedHasMore, endedPage, endedNovels.length,
      dispatch]);

   const cfg = CONFIG[type];

   const title = type === 'category'
      ? (localStorage.getItem('CATEGORY_NAME') ?? category)
      : cfg.title;

   const description = type === 'category'
      ? `Discover the best ${(localStorage.getItem('CATEGORY_NAME') ?? category)?.toLowerCase()} stories, from rising stars to completed masterpieces.`
      : cfg.description;

   const novels = type === 'category' ? categoryNovels : endedNovels;
   const status = type === 'category' ? categoryStatus : endedStatus;
   const hasMore_ = type === 'category' ? categoryHasMore : endedHasMore;

   return (
      <NovelListPage
         icon={cfg.icon}
         badge={cfg.badge}
         badgeColor={cfg.badgeColor}
         title={title}
         description={description}
         novels={novels}
         status={status}
         emptyText={cfg.emptyText}
         sentinelRef={ref}
         hasMore={hasMore_}
      />
   );
};
