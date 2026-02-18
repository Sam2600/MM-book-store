import React, { useEffect, useState } from 'react';
import { EyeIcon, ChevronDownIcon, CurrencyDollarIcon, PencilSquareIcon, TrashIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { TabButton } from '../components/TabButton';
import { scrollToTop, toHumanReadableDates } from '../functions/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, getUserInfoAndBooks, getUserInfoAndBooksStatus, user } from '../states/features/user/userSlice';
import { DEFAULT_IMG_CHAR, ROUTES } from '../consts/Consts';
import { Loader } from '../components/Loader';
import { NavLink } from 'react-router-dom';

/**
 * Sub-component for each Novel row to isolate search and toggle states
 */
const NovelManagementRow = ({ novel, onEdit, onDelete }) => {
   const [isExpanded, setIsExpanded] = useState(false);
   const [localSearch, setLocalSearch] = useState('');

   // Filter chapters based only on this specific novel's search input
   const filteredChapters = (novel?.chapters || []).filter(ch =>
      ch.title.toLowerCase().includes(localSearch.toLowerCase()) ||
      ch.chapter_num.toString().includes(localSearch)
   );

   return (
      <>
         <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-4 py-4">
               <div className="font-medium text-gray-900">{novel.title}</div>
               <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-xs text-blue-600 flex items-center mt-1 hover:underline"
               >
                  {isExpanded ? <ChevronUpIcon className="w-3 h-3 mr-1" /> : <ChevronDownIcon className="w-3 h-3 mr-1" />}
                  {novel.chapters?.length || 0} Chapters
               </button>
            </td>
            <td className="px-4 py-4">
               <span className="inline-flex items-center text-yellow-700 font-bold">
                  <CurrencyDollarIcon className="w-4 h-4 mr-1 text-yellow-500" />
                  {novel.total_coins_that_is_earned_from_that_novel || 0}
               </span>
            </td>
            <td className="px-4 py-4 text-right space-x-3">
               <button onClick={() => onEdit(novel.id, 'novel')} className="text-gray-400 hover:text-blue-600 transition-colors">
                  <PencilSquareIcon className="w-5 h-5" />
               </button>
               <button onClick={() => onDelete(novel.id, 'novel')} className="text-gray-400 hover:text-red-600 transition-colors">
                  <TrashIcon className="w-5 h-5" />
               </button>
            </td>
         </tr>

         {isExpanded && (
            <tr className="bg-gray-50/50">
               <td colSpan="3" className="px-6 py-4">
                  <div className="bg-white border border-gray-200 rounded-lg shadow-inner overflow-hidden">
                     {/* Isolated Search Bar */}
                     <div className="p-3 bg-gray-50 border-b flex justify-between items-center gap-4">
                        <input
                           type="text"
                           placeholder="Search chapter in this novel..."
                           className="text-xs border border-gray-300 rounded px-3 py-1.5 w-64 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                           value={localSearch}
                           onChange={(e) => setLocalSearch(e.target.value)}
                        />
                        <NavLink to={ROUTES.UPLOAD_CHAPTER}>
                           <button className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 font-medium transition-colors">
                              + New Chapter
                           </button>
                        </NavLink>
                     </div>

                     {/* Scrollable List */}
                     <div className="max-h-80 overflow-y-auto custom-scrollbar">
                        <ul className="divide-y divide-gray-100">
                           {filteredChapters.map((chapter, idx) => (
                              <li key={idx} className="flex justify-between items-center p-3 hover:bg-blue-50/30 transition-colors">
                                 <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-700">
                                       Ch {chapter.chapter_num}: {chapter.title}
                                    </span>
                                 </div>
                                 <div className="flex items-center space-x-4">
                                    <span className="text-[10px] text-gray-400">
                                       {toHumanReadableDates(chapter.updated_date)}
                                    </span>
                                    <div className="flex space-x-2 border-l pl-4 border-gray-200">
                                       <button title="View" className="p-1 text-gray-400 hover:text-blue-500"><EyeIcon className="w-4 h-4" /></button>
                                       <NavLink to={ROUTES.UPDATE_CHAPTER.replace(":novelId", novel.id).replace(":chapterId", chapter.id)}>
                                          <button title="Edit" className="p-1 text-gray-400 hover:text-green-500"><PencilSquareIcon className="w-4 h-4" /></button>
                                       </NavLink>
                                       <button title="Delete" className="p-1 text-gray-400 hover:text-red-500"><TrashIcon className="w-4 h-4" /></button>
                                    </div>
                                 </div>
                              </li>
                           ))}

                           {filteredChapters.length === 0 && (
                              <li className="p-8 text-center text-gray-400 text-sm italic">
                                 No chapters found matching your search.
                              </li>
                           )}
                        </ul>
                     </div>

                     <div className="p-2 bg-gray-50 border-t text-[10px] text-gray-500 text-center uppercase tracking-wider">
                        Total {novel?.chapters?.length || 0} Chapters
                     </div>
                  </div>
               </td>
            </tr>
         )}
      </>
   );
};

export const MyProfile = () => {
   const me = useSelector(user);
   const dispatch = useDispatch();
   const usernfoAndBooks = useSelector(getUserInfoAndBooks) || [];
   const userInfoAndBooksStatus = useSelector(getUserInfoAndBooksStatus);

   const [activeTab, setActiveTab] = useState('works');

   useEffect(() => {
      scrollToTop();
      dispatch(getUserInfo());
   }, []);

   const handleEdit = (id, type) => console.log(`Edit ${type}: ${id}`);
   const handleDelete = (id, type) => {
      if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
         console.log(`Delete ${id}`);
      }
   };

   // Calculate Total Coins across all novels
   const totalEarnings = (usernfoAndBooks?.novel_list || []).reduce(
      (acc, curr) => acc + (Number(curr.total_coins_that_is_earned_from_that_novel) || 0), 
      0
   );

   if (userInfoAndBooksStatus === 'pending') return <Loader />;

   return (
      <div className="min-h-screen bg-gray-50">
         <main className="container mx-auto px-4 lg:px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
               
               {/* Left Sidebar */}
               <aside className="md:col-span-4 lg:col-span-3 space-y-6">
                  <div className="card text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                     <img
                        src={DEFAULT_IMG_CHAR.replace(":char", me?.name?.charAt(0) || 'U')}
                        className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-md"
                        alt="profile"
                     />
                     <h1 className="text-xl font-bold text-gray-800">{me?.name}</h1>
                     <p className="text-sm text-gray-500">{me?.email}</p>
                  </div>

                  <div className="card p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                     <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                           <p className="font-bold text-lg text-gray-800">{usernfoAndBooks?.novel_list?.length || 0}</p>
                           <p className="text-[10px] uppercase text-gray-500">Works</p>
                        </div>
                        <div>
                           <p className="font-bold text-lg text-yellow-600">{totalEarnings}</p>
                           <p className="text-[10px] uppercase text-gray-500">Coins</p>
                        </div>
                        <div>
                           <p className="font-bold text-lg text-gray-800">{usernfoAndBooks?.novel_list?.[0]?.bookmarks_count || 0}</p>
                           <p className="text-[10px] uppercase text-gray-500">Saved</p>
                        </div>
                     </div>
                  </div>

                  <div className="card p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                     <h3 className="font-semibold text-gray-800 mb-2">About</h3>
                     <p className="text-sm text-gray-600">Author of multiple trending web novels.</p>
                     <div className="text-sm text-gray-500 border-t pt-3 mt-3">Joined {toHumanReadableDates(me?.created_at)}</div>
                  </div>
               </aside>

               {/* Right Content */}
               <div className="md:col-span-8 lg:col-span-9">
                  <nav className="flex bg-white rounded-t-lg border border-gray-200 border-b-0">
                     <TabButton tab={activeTab} handler={() => setActiveTab('works')} tabType={'works'}>Management</TabButton>
                     <TabButton tab={activeTab} handler={() => setActiveTab('about')} tabType={'about'}>Author Bio</TabButton>
                  </nav>

                  <div className="bg-white border border-gray-200 rounded-b-lg p-6">
                     {activeTab === 'works' && (
                        <div className="space-y-6">
                           <div className="flex justify-between items-center">
                              <h2 className="text-2xl font-bold text-gray-800">Novel Management</h2>
                              <NavLink to={ROUTES.UPLOAD_CHAPTER}>
                                 <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-all">
                                    + Create New Novel
                                 </button>
                              </NavLink>
                           </div>

                           <div className="overflow-hidden border border-gray-200 rounded-lg">
                              <table className="min-w-full divide-y divide-gray-200 text-sm">
                                 <thead className="bg-gray-50">
                                    <tr>
                                       <th className="px-4 py-3 text-left font-semibold text-gray-700">Title</th>
                                       <th className="px-4 py-3 text-left font-semibold text-gray-700">Earnings</th>
                                       <th className="px-4 py-3 text-right font-semibold text-gray-700">Actions</th>
                                    </tr>
                                 </thead>
                                 <tbody className="divide-y divide-gray-200">
                                    {usernfoAndBooks?.novel_list?.map((novel) => (
                                       <NovelManagementRow 
                                          key={novel.id} 
                                          novel={novel} 
                                          onEdit={handleEdit} 
                                          onDelete={handleDelete} 
                                       />
                                    ))}
                                 </tbody>
                              </table>
                           </div>
                        </div>
                     )}
                     
                     {activeTab === 'about' && (
                        <div className="text-gray-600 italic">Author Bio section coming soon...</div>
                     )}
                  </div>
               </div>
            </div>
         </main>
      </div>
   );
};