import { useEffect, useState } from 'react';
import { EyeIcon, StarIcon, QueueListIcon } from '@heroicons/react/24/outline'; // Heroicons outline
import { TabButton } from '../components/TabButton';
import { scrollToTop, toHumanReadableDates } from '../functions/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthorInfoAndBooks, getAuthorInfoAndBooksStatus, getAuthorInfoAndNovels, user } from '../states/features/user/userSlice';
import { MyPublished } from '../components/MyPublished';
import { Following } from '../components/Following';
import { DEFAULT_IMG_CHAR } from '../consts/Consts';
import { Loader } from '../components/Loader';

// Define the UserProfile component
export const MyProfile = () => {

   const dispatch = useDispatch();

   const authorInfoAndBooks = useSelector(getAuthorInfoAndBooks);

   const me = useSelector(user);

   const authorInfoAndBooksStatus = useSelector(getAuthorInfoAndBooksStatus);

   const [activeTab, setActiveTab] = useState('works'); // 'works', 'conversations', 'about'

   useEffect(() => {
      scrollToTop();
      dispatch(getAuthorInfoAndNovels());
   }, []);

   const content = authorInfoAndBooksStatus == 'pending'
      ? <Loader />
      : (
         <div className="min-h-screen">
            <main className="container mx-auto px-4 lg:px-6 py-8">
               <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  {/* Left Sidebar */}
                  <aside className="md:col-span-4 lg:col-span-3 space-y-6">
                     {/* Profile Info Card */}
                     <div className="card text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                        <img
                           src={DEFAULT_IMG_CHAR.replace(":char", me?.name.charAt(0))}
                           alt="User Avatar"
                           className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-md"
                        />
                        <h1 className="text-xl font-bold text-gray-800">{me?.name}</h1>
                        <p className="text-sm text-gray-500 mb-4">{me?.email}</p>
                        <button className="primary-btn w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md">
                           Edit Profile
                        </button>
                     </div>

                     {/* Stats Card */}
                     <div className="card p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="flex justify-around text-center">
                           <div>
                              <p className="font-bold text-lg text-gray-800">{authorInfoAndBooks.length}</p>
                              <p className="text-xs text-gray-500">Works</p>
                           </div>
                           <div>
                              <p className="font-bold text-lg text-gray-800">{ authorInfoAndBooks?.length && authorInfoAndBooks[0]?.bookmarks_count}</p>
                              <p className="text-xs text-gray-500">Reading List</p>
                           </div>
                           {/* <div>
                              <p className="font-bold text-lg text-gray-800">0</p>
                              <p className="text-xs text-gray-500">Followers</p>
                           </div> */}
                        </div>
                     </div>

                     {/* About Card */}
                     <div className="card p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                        <h3 className="font-semibold text-gray-800 mb-2">About</h3>
                        <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                           Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure provident quis, consequatur voluptatem ut, non optio velit quia atque porro nulla eveniet quidem tempore? Molestias recusandae consequuntur nobis minus accusamus!
                        </p>
                        <div className="text-sm text-gray-500 border-t pt-3 mt-3">Joined {toHumanReadableDates(me?.created_at)}</div>
                     </div>

                     {/* <Following /> */}
                  </aside>

                  {/* Right Content */}
                  <div className="md:col-span-8 lg:col-span-9">
                     {/* Navigation Tabs */}
                     <div className="card mb-6 bg-white rounded-lg shadow-sm border border-gray-200">
                        <nav className="flex border-b border-gray-200">
                           <TabButton tab={activeTab} handler={() => setActiveTab('works')} tabType={'works'}>
                              My Works
                           </TabButton>
                           <TabButton tab={activeTab} handler={() => setActiveTab('about')} tabType={'about'}>
                              About Me
                           </TabButton>
                        </nav>
                     </div>

                     {/* Tab Content */}
                     {activeTab === 'works' && (
                        <div className="space-y-6">
                           <h2 className="text-2xl font-bold text-gray-800">Published Works</h2>

                           {authorInfoAndBooks.length > 0
                              ? authorInfoAndBooks.map(aiab => <MyPublished key={aiab?.id} myPublish={aiab} />)
                              : <></>
                           }
                        </div>
                     )}

                     {activeTab === 'conversations' && (
                        <div className="card p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                           <h2 className="text-2xl font-bold text-gray-800 mb-4">Conversations</h2>
                           <p className="text-gray-600">No conversations to display yet.</p>
                        </div>
                     )}

                     {activeTab === 'about' && (
                        <div className="card p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                           <h2 className="text-2xl font-bold text-gray-800 mb-4">About Me</h2>
                           <p className="text-gray-600 leading-relaxed">
                              This section would contain more detailed information about the user, their interests, and
                              anything else they wish to share.
                           </p>
                        </div>
                     )}
                  </div>
               </div>
            </main>
         </div>);

   return content;
};