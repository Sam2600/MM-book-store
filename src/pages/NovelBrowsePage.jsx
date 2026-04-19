import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { Folder, FireFlame, Calendar } from 'iconoir-react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import {
   getNovelsByCategory, cleanCategoryNovels,
   getNovelsByChapter, hasMore, page, getNovelsByChapterStatus,
   fetchEndedNovels, cleanEndedNovels,
   getEndedNovels, getEndedPage, getEndedHasMore, getEndedNovelsStatus,
   fetchPopularWeekNovels, cleanPopularWeekNovels,
   getPopularWeekNovels, getPopularWeekPage, getPopularWeekHasMore, getPopularWeekStatus,
   fetchPopularMonthNovels, cleanPopularMonthNovels,
   getPopularMonthNovels, getPopularMonthPage, getPopularMonthHasMore, getPopularMonthStatus,
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
   popular_week: {
      icon:        <FireFlame className="h-5 w-5" />,
      badge:       'This Week\'s Hits',
      badgeColor:  'orange',
      title:       'Popular This Week',
      description: 'The most-read novels over the past 7 days.',
      emptyText:   'No trending novels this week yet.',
   },
   popular_month: {
      icon:        <Calendar className="h-5 w-5" />,
      badge:       'This Month\'s Hits',
      badgeColor:  'purple',
      title:       'Popular This Month',
      description: 'The most-read novels this month.',
      emptyText:   'No trending novels this month yet.',
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

   // --- popular week selectors ---
   const popularWeekNovels_  = useSelector(getPopularWeekNovels);
   const popularWeekPage_    = useSelector(getPopularWeekPage);
   const popularWeekHasMore_ = useSelector(getPopularWeekHasMore);
   const popularWeekStatus_  = useSelector(getPopularWeekStatus);

   // --- popular month selectors ---
   const popularMonthNovels_  = useSelector(getPopularMonthNovels);
   const popularMonthPage_    = useSelector(getPopularMonthPage);
   const popularMonthHasMore_ = useSelector(getPopularMonthHasMore);
   const popularMonthStatus_  = useSelector(getPopularMonthStatus);

   const { ref, inView } = useInView({ threshold: 0, rootMargin: '200px' });

   // Initial fetch + cleanup
   useEffect(() => {
      scrollToTop();
      if (type === 'category') {
         dispatch(cleanCategoryNovels());
         dispatch(getNovelsByCategory({ category, page: 1 }));
      } else if (type === 'ended') {
         dispatch(cleanEndedNovels());
         dispatch(fetchEndedNovels(1));
      } else if (type === 'popular_week') {
         dispatch(cleanPopularWeekNovels());
         dispatch(fetchPopularWeekNovels(1));
      } else if (type === 'popular_month') {
         dispatch(cleanPopularMonthNovels());
         dispatch(fetchPopularMonthNovels(1));
      }
      return () => {
         if (type === 'category') dispatch(cleanCategoryNovels());
         else if (type === 'ended') dispatch(cleanEndedNovels());
         else if (type === 'popular_week') dispatch(cleanPopularWeekNovels());
         else if (type === 'popular_month') dispatch(cleanPopularMonthNovels());
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
      } else if (type === 'ended') {
         if (endedStatus === 'pending') return;
         if (inView && endedHasMore && endedNovels.length > 0) {
            dispatch(fetchEndedNovels(endedPage));
         }
      } else if (type === 'popular_week') {
         if (popularWeekStatus_ === 'pending') return;
         if (inView && popularWeekHasMore_ && popularWeekNovels_.length > 0) {
            dispatch(fetchPopularWeekNovels(popularWeekPage_));
         }
      } else if (type === 'popular_month') {
         if (popularMonthStatus_ === 'pending') return;
         if (inView && popularMonthHasMore_ && popularMonthNovels_.length > 0) {
            dispatch(fetchPopularMonthNovels(popularMonthPage_));
         }
      }
   }, [inView, type, category,
      categoryStatus, categoryHasMore, categoryPage, categoryNovels.length,
      endedStatus, endedHasMore, endedPage, endedNovels.length,
      popularWeekStatus_, popularWeekHasMore_, popularWeekPage_, popularWeekNovels_.length,
      popularMonthStatus_, popularMonthHasMore_, popularMonthPage_, popularMonthNovels_.length,
      dispatch]);

   const cfg = CONFIG[type];

   const title = type === 'category'
      ? (localStorage.getItem('CATEGORY_NAME') ?? category)
      : cfg.title;

   const description = type === 'category'
      ? `Discover the best ${(localStorage.getItem('CATEGORY_NAME') ?? category)?.toLowerCase()} stories, from rising stars to completed masterpieces.`
      : cfg.description;

   const novels = type === 'category' ? categoryNovels
      : type === 'ended' ? endedNovels
      : type === 'popular_week' ? popularWeekNovels_
      : popularMonthNovels_;

   const status = type === 'category' ? categoryStatus
      : type === 'ended' ? endedStatus
      : type === 'popular_week' ? popularWeekStatus_
      : popularMonthStatus_;

   const hasMore_ = type === 'category' ? categoryHasMore
      : type === 'ended' ? endedHasMore
      : type === 'popular_week' ? popularWeekHasMore_
      : popularMonthHasMore_;

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
