import React, { useEffect, useState } from 'react';
import { EyeIcon, StarIcon, QueueListIcon, ChevronDownIcon, CurrencyDollarIcon, PencilSquareIcon, TrashIcon, ChevronUpIcon } from '@heroicons/react/24/outline'; // Heroicons outline
import { TabButton } from '../components/TabButton';
import { scrollToTop, toHumanReadableDates } from '../functions/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, getUserInfoAndBooks, getUserInfoAndBooksStatus, user } from '../states/features/user/userSlice';
import { MyPublished } from '../components/MyPublished';
import { Following } from '../components/Following';
import { DEFAULT_IMG_CHAR } from '../consts/Consts';
import { Loader } from '../components/Loader';

// Define the UserProfile component
export const MyProfile = () => {
   const dispatch = useDispatch();
   const usernfoAndBooks = useSelector(getUserInfoAndBooks) || [];
   const me = useSelector(user);
   const userInfoAndBooksStatus = useSelector(getUserInfoAndBooksStatus);
   
   const [activeTab, setActiveTab] = useState('works');
   const [expandedNovel, setExpandedNovel] = useState(null); // To toggle chapter views

   useEffect(() => {
      scrollToTop();
      dispatch(getUserInfo());
   }, []);

   // Placeholder functions for CRUD
   const handleEdit = (id, type) => console.log(`Edit ${type}: ${id}`);
   const handleDelete = (id, type) => {
      if(window.confirm(`Are you sure you want to delete this ${type}?`)) {
         console.log(`Delete ${id}`);
      }
   };

   const chapters = [{
      "id": 1,
      "number": 20,
      "title" : "gg"
   },
      {
      "id": 2,
      "number": 10,
      "title" : "ez"
      },
      {
      "id": 1,
      "number": 20,
      "title" : "gg"
   },
      {
      "id": 2,
      "number": 10,
      "title" : "ez"
      },
      {
      "id": 1,
      "number": 20,
      "title" : "gg"
   },
      {
      "id": 2,
      "number": 10,
      "title" : "ez"
      },
      {
      "id": 1,
      "number": 20,
      "title" : "gg"
   },
      {
      "id": 2,
      "number": 10,
      "title" : "ez"
   },
   {
      "id": 1,
      "number": 20,
      "title" : "gg"
   },
      {
      "id": 2,
      "number": 10,
      "title" : "ez"
   },
   {
      "id": 1,
      "number": 20,
      "title" : "gg"
   },
      {
      "id": 2,
      "number": 10,
      "title" : "ez"
   },
   {
      "id": 1,
      "number": 20,
      "title" : "gg"
   },
      {
      "id": 2,
      "number": 10,
      "title" : "ez"
      },
      {
      "id": 1,
      "number": 20,
      "title" : "gg"
   },
      {
      "id": 2,
      "number": 10,
      "title" : "ez"
      },
      {
      "id": 1,
      "number": 20,
      "title" : "gg"
   },
      {
      "id": 2,
      "number": 10,
      "title" : "ez"
      },
      {
      "id": 1,
      "number": 20,
      "title" : "gg"
   },
      {
      "id": 2,
      "number": 10,
      "title" : "ez"
      },
      {
      "id": 1,
      "number": 20,
      "title" : "gg"
   },
      {
      "id": 2,
      "number": 10,
      "title" : "ez"
   },
   {
      "id": 1,
      "number": 20,
      "title" : "gg"
   },
      {
      "id": 2,
      "number": 10,
      "title" : "ez"
   },
   {
      "id": 1,
      "number": 20,
      "title" : "gg"
   },
      {
      "id": 2,
      "number": 10,
      "title" : "ez"
   },
   {
      "id": 1,
      "number": 20,
      "title" : "gg"
   },
      {
      "id": 2,
      "number": 10,
      "title" : "ez"
   },
   {
      "id": 1,
      "number": 20,
      "title" : "gg"
   },
      {
      "id": 2,
      "number": 10,
      "title" : "ez"
      },
      {
      "id": 1,
      "number": 20,
      "title" : "gg"
   },
      {
      "id": 2,
      "number": 10,
      "title" : "ez"
      },
      {
      "id": 1,
      "number": 20,
      "title" : "gg"
   },
      {
      "id": 2,
      "number": 10,
      "title" : "ez"
      },
      {
      "id": 1,
      "number": 20,
      "title" : "gg"
   },
      {
      "id": 2,
      "number": 10,
      "title" : "ez"
   },
   {
      "id": 1,
      "number": 20,
      "title" : "gg"
   },
      {
      "id": 2,
      "number": 10,
      "title" : "ez"
   },
   {
      "id": 1,
      "number": 20,
      "title" : "gg"
   },
      {
      "id": 2,
      "number": 10,
      "title" : "ez"
   },
   {
      "id": 1,
      "number": 20,
      "title" : "gg"
   },
      {
      "id": 2,
      "number": 10,
      "title" : "ez"
   },
   {
      "id": 1,
      "number": 20,
      "title" : "gg"
   },
      {
      "id": 2,
      "number": 10,
      "title" : "ez"
      },
      {
      "id": 1,
      "number": 20,
      "title" : "gg"
   },
      {
      "id": 2,
      "number": 10,
      "title" : "ez"
      },
      {
      "id": 1,
      "number": 20,
      "title" : "gg"
   },
      {
      "id": 2,
      "number": 10,
      "title" : "ez"
      },
      {
      "id": 1,
      "number": 20,
      "title" : "gg"
   },
      {
      "id": 2,
      "number": 10,
      "title" : "ez"
   },
   {
      "id": 1,
      "number": 20,
      "title" : "gg"
   },
      {
      "id": 2,
      "number": 10,
      "title" : "ez"
   },
   {
      "id": 1,
      "number": 20,
      "title" : "gg"
   },
      {
      "id": 2,
      "number": 10,
      "title" : "ez"
   },
   {
      "id": 1,
      "number": 20,
      "title" : "gg"
   },
      {
      "id": 2,
      "number": 10,
      "title" : "ez"
   },
   {
      "id": 1,
      "number": 20,
      "title" : "gg"
   },
      {
      "id": 2,
      "number": 10,
      "title" : "ez"
      },
      {
      "id": 1,
      "number": 20,
      "title" : "gg"
   },
      {
      "id": 2,
      "number": 10,
      "title" : "ez"
      },
      {
      "id": 1,
      "number": 20,
      "title" : "gg"
   },
      {
      "id": 2,
      "number": 10,
      "title" : "ez"
      },
      {
      "id": 1,
      "number": 20,
      "title" : "gg"
   },
      {
      "id": 2,
      "number": 10,
      "title" : "ez"
   },
   {
      "id": 1,
      "number": 20,
      "title" : "gg"
   },
      {
      "id": 2,
      "number": 10,
      "title" : "ez"
   },
   {
      "id": 1,
      "number": 20,
      "title" : "gg"
   },
      {
      "id": 2,
      "number": 10,
      "title" : "ez"
   },
   {
      "id": 1,
      "number": 20,
      "title" : "gg"
   },
      {
      "id": 2,
      "number": 10,
      "title" : "ez"
   },
   ]

   const content = userInfoAndBooksStatus == 'pending' 
      ? <Loader /> 
      : (
         <div className="min-h-screen bg-gray-50">
            <main className="container mx-auto px-4 lg:px-6 py-8">
               <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  
                  {/* Left Sidebar */}
                  <aside className="md:col-span-4 lg:col-span-3 space-y-6">
                     <div className="card text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                        <img 
                           src={DEFAULT_IMG_CHAR.replace(":char", me?.name.charAt(0))} 
                           className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-md" 
                        />
                        <h1 className="text-xl font-bold text-gray-800">{me?.name}</h1>
                        <p className="text-sm text-gray-500">{me?.email}</p>
                     </div>

                     {/* Updated Stats Card with Coins */}
                     <div className="card p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="grid grid-cols-3 gap-2 text-center">
                           <div>
                              <p className="font-bold text-lg text-gray-800">{usernfoAndBooks?.length || 0}</p>
                              <p className="text-[10px] uppercase text-gray-500">Works</p>
                           </div>
                           <div>
                              <p className="font-bold text-lg text-yellow-600">
                                 {/* Assuming your data has a total_coins field */}
                                 {usernfoAndBooks?.reduce((acc, curr) => acc + (curr.total_coins || 0), 0)}
                              </p>
                              <p className="text-[10px] uppercase text-gray-500">Coins</p>
                           </div>
                           <div>
                              <p className="font-bold text-lg text-gray-800">{usernfoAndBooks?.[0]?.bookmarks_count || 0}</p>
                              <p className="text-[10px] uppercase text-gray-500">Saved</p>
                           </div>
                        </div>
                     </div>

                     <div className="card p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                        <h3 className="font-semibold text-gray-800 mb-2">About</h3>
                        <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet...</p>
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
                                 <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                                    + Create New Novel
                                 </button>
                              </div>

                              {/* Novel Management List */}
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
                                       {usernfoAndBooks?.map((novel) => (
                                          <React.Fragment key={novel.id}>
                                             <tr className="hover:bg-gray-50">
                                                <td className="px-4 py-4">
                                                   <div className="font-medium text-gray-900">{novel.title}</div>
                                                   <button 
                                                      onClick={() => setExpandedNovel(expandedNovel === novel.id ? null : novel.id)}
                                                      className="text-xs text-blue-600 flex items-center mt-1"
                                                   >
                                                      {expandedNovel === novel.id ? <ChevronUpIcon className="w-3 h-3 mr-1"/> : <ChevronDownIcon className="w-3 h-3 mr-1"/>}
                                                      {novel.chapters?.length || 0} Chapters
                                                   </button>
                                                </td>
                                                <td className="px-4 py-4">
                                                   <span className="inline-flex items-center text-yellow-700 font-bold">
                                                      <CurrencyDollarIcon className="w-4 h-4 mr-1 text-yellow-500" />
                                                      {novel.earnings || 0}
                                                   </span>
                                                </td>
                                                <td className="px-4 py-4 text-right space-x-3">
                                                   <button onClick={() => handleEdit(novel.id, 'novel')} className="text-gray-400 hover:text-blue-600"><PencilSquareIcon className="w-5 h-5"/></button>
                                                   <button onClick={() => handleDelete(novel.id, 'novel')} className="text-gray-400 hover:text-red-600"><TrashIcon className="w-5 h-5"/></button>
                                                </td>
                                             </tr>
                                             
                                             {/* Chapter Dropdown */}
                                             {expandedNovel === novel.id && (
                                                <tr className="bg-gray-50">
                                                   <td colSpan="3" className="px-8 py-4">
                                                      <ul className="space-y-2 border-l-2 border-gray-200 pl-4">
                                                         {chapters?.map(chapter => (
                                                            <li key={chapter.id} className="flex justify-between items-center bg-white p-2 rounded border border-gray-100">
                                                               <span className="text-gray-700">Ch {chapter.number}: {chapter.title}</span>
                                                               <div className="flex space-x-2">
                                                                  <button className="p-1 hover:text-blue-500"><EyeIcon className="w-4 h-4"/></button>
                                                                  <button className="p-1 hover:text-green-500"><PencilSquareIcon className="w-4 h-4"/></button>
                                                                  <button className="p-1 hover:text-red-500"><TrashIcon className="w-4 h-4"/></button>
                                                               </div>
                                                            </li>
                                                         ))}
                                                         <button className="text-xs text-blue-600 font-bold hover:underline">+ Add Chapter</button>
                                                      </ul>
                                                   </td>
                                                </tr>
                                             )}
                                          </React.Fragment>
                                       ))}
                                    </tbody>
                                 </table>
                              </div>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </main>
         </div>
      );

   return content;
};