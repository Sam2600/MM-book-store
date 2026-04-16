import { useEffect, useState, useMemo } from 'react';
import { useSearchParams, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { Typography, Input } from '@material-tailwind/react';
import { Search, GridPlus, Xmark, NavArrowLeft, NavArrowDown } from 'iconoir-react';
import {
   getNovels,
   fetchBrowseNovels,
   cleanBrowseNovels,
   getAllCategories,
   getBrowseNovels,
   getBrowsePage,
   getBrowseHasMore,
   getBrowseStatus,
} from '../states/features/novel/novelSlice';
import { scrollToTop } from '../functions/helpers';
import { Loader } from '../components/Loader';
import { Profile } from '../components/Profile';
import { ROUTES } from '../consts/Consts';

const STATUS_OPTIONS = [
   { value: '',          label: 'All'       },
   { value: 'ongoing',   label: 'Ongoing'   },
   { value: 'completed', label: 'Completed' },
];

const SORT_OPTIONS = [
   { value: 'newest', label: 'Newest'    },
   { value: 'oldest', label: 'Oldest'    },
   { value: 'rating', label: 'Top Rated' },
];

const PillButton = ({ active, onClick, children }) => (
   <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 whitespace-nowrap
         ${active
            ? 'bg-blue-600 text-white shadow-sm'
            : 'bg-slate-100 text-slate-500 hover:bg-blue-50 hover:text-blue-600'
         }`}
   >
      {children}
   </button>
);

/** Accordion section used inside the filter sidebar */
const FilterSection = ({ title, badge, isOpen, onToggle, children }) => (
   <div className="border-b border-slate-100 last:border-0">
      <button
         onClick={onToggle}
         className="flex items-center justify-between w-full py-3 text-left group"
      >
         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-slate-600 transition-colors">
            {title}
         </span>
         <div className="flex items-center gap-2">
            {/* Badge shows the active value when section is collapsed */}
            {!isOpen && badge && (
               <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 max-w-[90px] truncate">
                  {badge}
               </span>
            )}
            <NavArrowDown
               className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
         </div>
      </button>
      {isOpen && (
         <div className="pb-4">
            {children}
         </div>
      )}
   </div>
);

export const BrowsePage = () => {
   const dispatch = useDispatch();
   const [searchParams, setSearchParams] = useSearchParams();

   const categories = useSelector(getAllCategories);
   const novels     = useSelector(getBrowseNovels);
   const novelPage  = useSelector(getBrowsePage);
   const hasMore    = useSelector(getBrowseHasMore);
   const status     = useSelector(getBrowseStatus);

   const activeCatId  = searchParams.get('cat')    ?? '';
   const activeStatus = searchParams.get('status') ?? '';
   const activeSort   = searchParams.get('sort')   ?? 'newest';

   const [catSearch,    setCatSearch]    = useState('');
   const [sidebarOpen,  setSidebarOpen]  = useState(true);
   const [openSections, setOpenSections] = useState({ genre: false, status: false, sort: false });

   const toggleSection = (key) =>
      setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

   const { ref, inView } = useInView({ threshold: 0, rootMargin: '200px' });

   useEffect(() => {
      if (!categories || categories.length === 0) dispatch(getNovels());
   }, [dispatch, categories]);

   useEffect(() => {
      scrollToTop();
      dispatch(cleanBrowseNovels());
      dispatch(fetchBrowseNovels({
         category: activeCatId  || undefined,
         status:   activeStatus || undefined,
         sort:     activeSort,
         page:     1,
      }));
      return () => { dispatch(cleanBrowseNovels()); };
   }, [activeCatId, activeStatus, activeSort, dispatch]);

   useEffect(() => {
      if (status === 'pending') return;
      if (inView && hasMore && novels.length > 0) {
         dispatch(fetchBrowseNovels({
            category: activeCatId  || undefined,
            status:   activeStatus || undefined,
            sort:     activeSort,
            page:     novelPage,
         }));
      }
   }, [inView, status, hasMore, novelPage, novels.length, activeCatId, activeStatus, activeSort, dispatch]);

   const setFilter = (key, value) => {
      setSearchParams((prev) => {
         const next = new URLSearchParams(prev);
         value ? next.set(key, value) : next.delete(key);
         return next;
      });
   };

   const clearFilters = () => { setSearchParams({}); setCatSearch(''); };

   const filteredCategories = useMemo(() => {
      if (!categories) return [];
      const q = catSearch.trim().toLowerCase();
      return q ? categories.filter(c => c.name.toLowerCase().includes(q)) : categories;
   }, [categories, catSearch]);

   const activeCatName     = categories?.find(c => String(c.id) === activeCatId)?.name ?? '';
   const activeStatusLabel = STATUS_OPTIONS.find(o => o.value === activeStatus)?.label ?? 'All';
   const activeSortLabel   = SORT_OPTIONS.find(o => o.value === activeSort)?.label    ?? 'Newest';
   const hasActiveFilters  = activeCatId || activeStatus || activeSort !== 'newest';

   if (status === 'pending' && novels.length === 0) return <Loader />;

   return (
      <div className="min-h-screen bg-gray-50/30 flex">

         {/* ── Sidebar (desktop) ── */}
         <div className="hidden md:flex relative shrink-0">
            {/* The collapsible panel */}
            <aside
               className={`bg-white border-r border-gray-100 sticky top-[64px] h-[calc(100vh-64px)] overflow-y-auto overflow-x-hidden
                  transition-all duration-300 ease-in-out
                  ${sidebarOpen ? 'w-60 opacity-100' : 'w-0 opacity-0 overflow-hidden'}`}
            >
               <div className="p-5 w-full space-y-1">
                  {/* Sidebar heading + clear */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                     <Typography className="text-xs font-black text-slate-400 uppercase tracking-widest">
                        Filters
                     </Typography>
                     {hasActiveFilters && (
                        <button
                           onClick={clearFilters}
                           className="flex items-center gap-1 text-[10px] font-bold text-blue-500 hover:text-blue-700 transition-colors"
                        >
                           <Xmark className="h-3 w-3" /> Clear all
                        </button>
                     )}
                  </div>

                  {/* Genre accordion */}
                  <FilterSection
                     title="Genre"
                     badge={activeCatName || 'All Genres'}
                     isOpen={openSections.genre}
                     onToggle={() => toggleSection('genre')}
                  >
                     <div className="relative mb-2">
                        <Input
                           type="text"
                           placeholder="Search genres..."
                           value={catSearch}
                           onChange={(e) => setCatSearch(e.target.value)}
                           className="!border-slate-200 focus:!border-blue-400 text-xs bg-slate-50 rounded-lg pl-8"
                           labelprops={{ className: "hidden" }}
                        />
                        <Search className="h-3.5 w-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                     </div>
                     <ul className="flex flex-col gap-0.5 max-h-52 overflow-y-auto pr-1">
                        <li>
                           <button
                              onClick={() => setFilter('cat', '')}
                              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-150
                                 ${!activeCatId ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50 hover:text-blue-600'}`}
                           >
                              All Genres
                           </button>
                        </li>
                        {filteredCategories.map((cat) => (
                           <li key={cat.id}>
                              <button
                                 onClick={() => setFilter('cat', cat.id)}
                                 className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-150
                                    ${String(cat.id) === activeCatId
                                       ? 'bg-blue-50 text-blue-600'
                                       : 'text-slate-500 hover:bg-slate-50 hover:text-blue-600'
                                    }`}
                              >
                                 {cat.name}
                              </button>
                           </li>
                        ))}
                        {filteredCategories.length === 0 && (
                           <li className="px-2.5 py-2 text-xs text-slate-400">No genres found</li>
                        )}
                     </ul>
                  </FilterSection>

                  {/* Status accordion */}
                  <FilterSection
                     title="Status"
                     badge={activeStatusLabel}
                     isOpen={openSections.status}
                     onToggle={() => toggleSection('status')}
                  >
                     <div className="flex flex-wrap gap-1.5">
                        {STATUS_OPTIONS.map((opt) => (
                           <PillButton
                              key={opt.value}
                              active={activeStatus === opt.value}
                              onClick={() => setFilter('status', opt.value)}
                           >
                              {opt.label}
                           </PillButton>
                        ))}
                     </div>
                  </FilterSection>

                  {/* Sort accordion */}
                  <FilterSection
                     title="Sort By"
                     badge={activeSortLabel}
                     isOpen={openSections.sort}
                     onToggle={() => toggleSection('sort')}
                  >
                     <div className="flex flex-wrap gap-1.5">
                        {SORT_OPTIONS.map((opt) => (
                           <PillButton
                              key={opt.value}
                              active={activeSort === opt.value}
                              onClick={() => setFilter('sort', opt.value)}
                           >
                              {opt.label}
                           </PillButton>
                        ))}
                     </div>
                  </FilterSection>

               </div>
            </aside>

            {/* Fold / unfold tab — always visible on the edge */}
            <button
               onClick={() => setSidebarOpen(!sidebarOpen)}
               className="absolute -right-3 top-5 z-10 bg-blue-600 rounded-full h-6 w-6 flex items-center justify-center shadow-md hover:bg-blue-700 transition-all duration-200"
               title={sidebarOpen ? 'Collapse filters' : 'Expand filters'}
            >
               <NavArrowLeft
                  className={`h-4 w-4 text-white transition-transform duration-300 ${sidebarOpen ? '' : 'rotate-180'}`}
               />
            </button>
         </div>

         {/* ── Main Content ── */}
         <div className="flex-1 min-w-0">

            {/* Mobile filter bar */}
            <div className="md:hidden bg-white border-b border-gray-100 px-4 py-3 space-y-3">
               <div className="overflow-x-auto">
                  <div className="flex gap-2 w-max">
                     <button
                        onClick={() => setFilter('cat', '')}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all
                           ${!activeCatId ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600'}`}
                     >
                        All
                     </button>
                     {(categories ?? []).map((cat) => (
                        <button
                           key={cat.id}
                           onClick={() => setFilter('cat', cat.id)}
                           className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all
                              ${String(cat.id) === activeCatId
                                 ? 'bg-blue-600 text-white'
                                 : 'bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600'
                              }`}
                        >
                           {cat.name}
                        </button>
                     ))}
                  </div>
               </div>
               <div className="flex gap-2 flex-wrap">
                  {STATUS_OPTIONS.filter(o => o.value).map((opt) => (
                     <PillButton
                        key={opt.value}
                        active={activeStatus === opt.value}
                        onClick={() => setFilter('status', opt.value)}
                     >
                        {opt.label}
                     </PillButton>
                  ))}
                  <div className="w-px bg-slate-200 self-stretch mx-1" />
                  {SORT_OPTIONS.map((opt) => (
                     <PillButton
                        key={opt.value}
                        active={activeSort === opt.value}
                        onClick={() => setFilter('sort', opt.value)}
                     >
                        {opt.label}
                     </PillButton>
                  ))}
               </div>
            </div>

            {/* Page header */}
            <div className="bg-white border-b border-gray-100">
               <div className="w-11/12 mx-auto py-8 md:py-10">
                  <div className="flex items-center gap-3 mb-3">
                     <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                        <GridPlus className="h-5 w-5" />
                     </div>
                     <Typography className="text-sm font-bold uppercase tracking-widest text-blue-500">
                        Browse
                     </Typography>
                  </div>
                  <Typography variant="h1" className="text-3xl md:text-4xl font-black text-slate-900">
                     {activeCatName || 'All Novels'}
                  </Typography>
                  {(activeStatus || activeSort !== 'newest') && (
                     <div className="flex gap-2 mt-3 flex-wrap">
                        {activeStatus && (
                           <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-600">
                              {activeStatusLabel}
                           </span>
                        )}
                        {activeSort !== 'newest' && (
                           <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-500">
                              {activeSortLabel}
                           </span>
                        )}
                     </div>
                  )}
               </div>
            </div>

            {/* Novel grid */}
            <div className="w-11/12 mx-auto py-10 pb-20">
               {novels.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
                     {novels.map((novel, idx) => (
                        <NavLink
                           key={`${novel.id}-${idx}`}
                           to={ROUTES.NOVEL_BY_ID.replace(':id', novel.id)}
                           className="group"
                        >
                           <div className="transition-transform duration-300 group-hover:-translate-y-2">
                              <Profile novel={novel} />
                           </div>
                        </NavLink>
                     ))}
                  </div>
               ) : (
                  <div className="text-center py-20">
                     <Typography variant="h5" color="blue-gray">No novels found.</Typography>
                     <Typography className="text-slate-400 mt-2 text-sm">Try adjusting your filters.</Typography>
                  </div>
               )}
               {status === 'pending' && novels.length > 0 ? <Loader /> : (
                  <div ref={ref} className="h-20 flex items-center justify-center mt-8">
                  {!hasMore && novels.length > 0 && (
                     <div className="text-center border-t border-gray-100 pt-6 w-full">
                        <div className="h-1 w-12 bg-slate-200 mx-auto mb-3 rounded-full" />
                        <Typography className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                           End of the list
                        </Typography>
                     </div>
                  )}
               </div>
               )}
               
            </div>
         </div>
      </div>
   );
};
