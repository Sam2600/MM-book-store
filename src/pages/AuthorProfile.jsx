import React, { useEffect, useState } from 'react';
import {
   EyeIcon,
   ChevronDownIcon,
   CurrencyDollarIcon,
   PencilSquareIcon,
   TrashIcon,
   ChevronUpIcon,
   BookOpenIcon,
   PlusCircleIcon
} from '@heroicons/react/24/outline';
import { StatusBadge } from '../components/commons/StatusBadge';
import { scrollToTop } from '../functions/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { cleanUserInfo, getPaymentMethods, getUpdateProfileStatus, getUserInfo, getUserInfoAndBooks, getUserInfoAndBooksStatus, resetUpdateProfileStatus, selectPaymentMethods, updateUserProfile, user } from '../states/features/user/userSlice';
import { DEFAULT_IMG_CHAR, ROUTES } from '../consts/Consts';
import { Loader } from '../components/Loader';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { useForm } from 'react-hook-form';

/**
 * Isolated Volume Component to handle internal toggle/collapse
 */
const VolumeSection = ({ volume, novelId, localSearch }) => {

   const [isVolExpanded, setIsVolExpanded] = useState(true);

   const filteredChapters = (volume.chapters || []).filter(ch =>
      ch.title.toLowerCase().includes(localSearch.toLowerCase()) ||
      ch.chapter_number.toString().includes(localSearch)
   );

   if (filteredChapters.length === 0 && localSearch !== '') return null;

   return (
      <section className="space-y-3">
         {/* Volume Header Banner */}
         <div 
            onClick={() => setIsVolExpanded(!isVolExpanded)}
            className="flex items-center gap-4 cursor-pointer group"
         >
            <div className="h-[1px] flex-1 bg-slate-200"></div>
            <div className={`flex items-center gap-3 px-4 py-1.5 rounded-full shadow-sm transition-all border ${
               isVolExpanded ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-600'
            }`}>
               <span className="text-[10px] font-black uppercase tracking-[0.2em]">Vol {volume.volume_number}</span>
               <span className="text-slate-400">|</span>
               <span className="text-xs font-bold truncate max-w-[150px] md:max-w-[300px]">{volume.volume_title}</span>
               {isVolExpanded ? <ChevronUpIcon className="w-3 h-3" /> : <ChevronDownIcon className="w-3 h-3" />}
            </div>
            <div className="h-[1px] flex-1 bg-slate-200"></div>
         </div>

         {isVolExpanded && (
            <div className="grid grid-cols-1 gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
               {filteredChapters.map((chapter) => (
                  <div key={chapter.id} className="group flex items-center justify-between bg-white p-4 rounded-2xl border-2 border-slate-50 hover:border-blue-100 hover:bg-blue-50/20 transition-all">
                     <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center justify-center h-10 w-10 bg-slate-100 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                           <span className="text-[9px] font-black leading-none uppercase">Ch</span>
                           <span className="text-sm font-black leading-none mt-1">{chapter.chapter_number}</span>
                        </div>
                        <div className="flex flex-col">
                           <span className="text-sm font-bold text-slate-700 leading-snug">{chapter.title}</span>
                           <div className="flex items-center gap-2 mt-1">
                              <StatusBadge status={chapter.status} />
                              {/* <span className="text-[10px] text-slate-400 font-bold">• {chapter.coin_cost} Coins</span> */}
                           </div>
                        </div>
                     </div>
                     
                     <NavLink to={ROUTES.UPDATE_CHAPTER.replace(":novelId", novelId).replace(":chapterId", chapter.id)}>
                        <button className="p-2.5 text-slate-300 hover:text-blue-600 hover:bg-white rounded-xl shadow-sm transition-all border border-transparent hover:border-blue-100">
                           <PencilSquareIcon className="w-5 h-5" />
                        </button>
                     </NavLink>
                  </div>
               ))}
            </div>
         )}
      </section>
   );
};

/**
 * Main Novel Card
 */
const NovelManagementRow = ({ novel, onEdit, onDelete, isAdmin }) => {
   const [isExpanded, setIsExpanded] = useState(false);
   const [localSearch, setLocalSearch] = useState('');

   return (
      <div 
         className={`mb-5 overflow-hidden transition-all duration-300 rounded-[2rem] border-2 ${
            isExpanded 
            ? 'border-blue-600 bg-white shadow-2xl shadow-blue-100/50' 
            : 'border-slate-100 bg-white hover:border-slate-300'
         }`}
      >
         {/* HEADER */}
         <div className={`p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
            isExpanded ? 'bg-blue-50/40' : 'bg-transparent'
         }`}>
            <div className="flex items-center gap-4">
               {novel.cover_image && (
                  <img src={novel.cover_image} alt="" className="w-12 h-16 object-cover rounded-lg shadow-sm" />
               )}
               <div>
                  <h3 className="text-lg font-black text-slate-900 leading-tight">{novel.title}</h3>
                  <div className="flex items-center gap-3 mt-2">
                     {/* <span className="flex items-center gap-1 text-[11px] font-black text-yellow-700 bg-yellow-100/50 px-2 py-1 rounded-lg">
                        <CurrencyDollarIcon className="w-3.5 h-3.5" />
                        {novel.total_coins || 0}
                     </span> */}
                     <span className="flex items-center gap-1 text-[11px] font-black text-blue-600 bg-blue-100/50 px-2 py-1 rounded-lg uppercase">
                        <BookOpenIcon className="w-3.5 h-3.5" />
                        {novel.volumes?.length || 0} Volumes
                     </span>
                  </div>
               </div>
            </div>

            <div className="flex items-center gap-3">
               <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                     isExpanded 
                     ? 'bg-slate-900 text-white shadow-lg' 
                     : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
               >
                  {isExpanded ? 'Close' : 'Manage'}
                  {isExpanded ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />}
               </button>
               
               <Button 
                  disabled={isAdmin} 
                  onClick={() => onDelete(novel?.id, 'novel')} 
                  className="p-3 bg-white text-red-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
               >
                  <TrashIcon className="w-5 h-5" />
               </Button>
            </div>
         </div>

         {/* CONTENT (VOLUMES & CHAPTERS) */}
         {isExpanded && (
            <div className="p-6 md:p-8 bg-white border-t border-blue-50">
               <div className="flex flex-col md:flex-row gap-4 mb-8">
                  <div className="relative flex-1 group">
                     <input
                        type="text"
                        placeholder="Search with chapters number or title..."
                        className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl pl-11 pr-4 py-3 text-sm font-bold focus:bg-white focus:border-blue-500 outline-none transition-all"
                        value={localSearch}
                        onChange={(e) => setLocalSearch(e.target.value)}
                     />
                     <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <EyeIcon className="w-4 h-4" />
                     </div>
                  </div>
                  <NavLink to={ROUTES.UPLOAD_CHAPTER}>
                     <button className="w-full md:w-auto bg-blue-600 text-white px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95">
                        + New Chapter
                     </button>
                  </NavLink>
               </div>

               <div className="space-y-8 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {novel.volumes?.map((volume) => (
                     <VolumeSection 
                        key={volume.id} 
                        volume={volume} 
                        novelId={novel.id} 
                        localSearch={localSearch} 
                     />
                  ))}
               </div>
            </div>
         )}
      </div>
   );
};

export const AuthorProfile = () => {
   const me = useSelector(user);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const isAdmin = me?.role_id === 1;
   const userInfoAndBooks = useSelector(getUserInfoAndBooks);
   const status = useSelector(getUserInfoAndBooksStatus);
   const updateProfileStatus = useSelector(getUpdateProfileStatus);
   const paymentMethods = useSelector(selectPaymentMethods);
   const [activeTab, setActiveTab] = useState('works');
   const [serverError, setServerError] = useState('');
   const [serverSuccess, setServerSuccess] = useState('');

   const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm({
      defaultValues: {
         name: me?.name || '',
         email: me?.email || '',
         payment_method_id: me?.payment_method_id || '',
         payment_account: me?.payment_account || '',
      }
   });

   useEffect(() => {
      scrollToTop();
      dispatch(getUserInfo());
      dispatch(getPaymentMethods());

      return () => {
         dispatch(cleanUserInfo());
         dispatch(resetUpdateProfileStatus());
      }
   }, [dispatch]);

   useEffect(() => {
      reset({
         name: me?.name || '',
         email: me?.email || '',
         payment_method_id: me?.payment_method_id || '',
         payment_account: me?.payment_account || '',
      });
   }, [me, reset]);

   const onSubmitProfile = async (data) => {
      setServerError('');
      setServerSuccess('');
      scrollToTop();
      try {
         await dispatch(updateUserProfile(data)).unwrap();
         setServerSuccess('Profile updated successfully!');
      } catch (error) {
         const msg = error?.message;
         if (msg && typeof msg === 'object') {
            setServerError(Object.values(msg).flat().join('\n'));
         } else if (typeof msg === 'string') {
            setServerError(msg);
         } else {
            setServerError('Failed to update profile. Please try again.');
         }
      }
   };

   const handleDelete = (id, type) => {
      if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
         console.log(`Delete ${id}`);
      }
   };

   if (status === 'pending') return <Loader />;

   const novels = userInfoAndBooks?.novel_list || [];
   const totalEarnings = novels.reduce((acc, curr) => acc + (Number(curr.total_coins) || 0), 0);

   return (
      <div className="min-h-screen bg-[#EEEEEE]">
         <main className="container mx-auto px-4 lg:px-8 py-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
               
               {/* Left Sidebar */}
               <aside className="md:col-span-4 lg:col-span-3 space-y-6">
                  <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 text-center">
                     <img
                        src={DEFAULT_IMG_CHAR.replace(":char", me?.name?.charAt(0) || 'U')}
                        className="w-28 h-28 rounded-full mx-auto mb-6 border-4 border-white shadow-xl"
                        alt="profile"
                     />
                     <h1 className="text-2xl font-black text-slate-900 leading-tight">{me?.name}</h1>
                     <p className="text-sm font-bold text-slate-400 mt-1">{me?.email}</p>
                  </div>

                  <div className="bg-white p-6 rounded-[2rem] shadow-xl text-white">
                     <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                           <p className="text-black text-xl">{novels.length}</p>
                           <p className="text-[9px] font-black uppercase text-slate-400 tracking-tighter">Works</p>
                        </div>
                        <div className="border-x border-slate-800">
                           <p className="text-yellow-400 text-xl">{totalEarnings}</p>
                           <p className="text-[9px] font-black uppercase text-slate-400 tracking-tighter">Coins</p>
                        </div>
                        <div>
                           <p className="text-black text-xl">{novels[0]?.bookmarks_count || 0}</p>
                           <p className="text-[9px] font-black uppercase text-slate-400 tracking-tighter">Saved</p>
                        </div>
                     </div>
                  </div>

                  {isAdmin && (
                     <>
                        <button
                        onClick={() => navigate(ROUTES.ADMIN_PAYOUTS)}
                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-widest shadow-lg transition-all duration-200 active:scale-95"
                        >
                           <CurrencyDollarIcon className="w-4 h-4" />
                           To Payout Dashboard
                        </button>
                        <button
                           onClick={() => navigate(ROUTES.REGISTER_AUTHOR)}
                           className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-green-600 hover:bg-green-700 text-white text-xs font-black uppercase tracking-widest shadow-lg transition-all duration-200 active:scale-95"
                        >
                           <PlusCircleIcon className="w-4 h-4" />
                           Register Author
                        </button>
                     </>
                  )}
               </aside>

               {/* Right Content */}
               <div className="md:col-span-8 lg:col-span-9">
                  <nav className="flex gap-2 mb-8 bg-slate-100 p-1.5 rounded-2xl w-fit">
                     <button
                        onClick={() => setActiveTab('works')}
                        className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                           activeTab === 'works' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                        }`}
                     >
                        Management
                     </button>
                     <button
                        onClick={() => setActiveTab('about')}
                        className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                           activeTab === 'about' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                        }`}
                     >
                        Author Bio
                     </button>
                     <button
                        onClick={() => setActiveTab('edit')}
                        className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                           activeTab === 'edit' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                        }`}
                     >
                        Edit Profile
                     </button>
                  </nav>

                  {activeTab === 'edit' ? (
                     <div className="relative bg-white p-10 rounded-[2.5rem] border border-slate-100">

                        {updateProfileStatus === 'pending' && (
                           <div className="absolute inset-0 bg-white/70 backdrop-blur-sm rounded-[2.5rem] flex items-center justify-center z-10">
                              <Loader />
                           </div>
                        )}

                        <h2 className="text-2xl font-black text-slate-900 mb-8">Edit Profile</h2>

                        {serverError && (
                           <div className="mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
                              <p className="text-sm font-bold text-red-600 bg-red-50 border border-red-200 w-full p-4 rounded-xl shadow-sm whitespace-pre-line">
                                 {serverError}
                              </p>
                           </div>
                        )}
                        {serverSuccess && (
                           <div className="mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
                              <p className="text-sm font-bold text-green-700 bg-green-50 border border-green-200 w-full p-4 rounded-xl shadow-sm">
                                 {serverSuccess}
                              </p>
                           </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmitProfile)} className="space-y-6 max-w-lg">

                           {/* Name */}
                           <div>
                              <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Username <span className="text-red-500">*</span></label>
                              <input
                                 {...register('name', { required: 'Username is required' })}
                                 type="text"
                                 className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-bold focus:bg-white focus:border-blue-500 outline-none transition-all"
                                 placeholder="Your author name"
                              />
                              {errors.name && <p className="text-red-500 text-xs font-bold mt-1">{errors.name.message}</p>}
                           </div>

                           {/* Email */}
                           <div>
                              <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Email</label>
                              <input
                                 {...register('email', {
                                    required: 'Email is required',
                                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                                 })}
                                 type="email"
                                 disabled
                                 className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-bold focus:bg-white focus:border-blue-500 outline-none transition-all"
                                 placeholder="your@email.com"
                              />
                              {errors.email && <p className="text-red-500 text-xs font-bold mt-1">{errors.email.message}</p>}
                           </div>

                           {/* Payment Method */}
                           <div>
                              <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Payment Method <span className="text-red-500">*</span></label>
                              <select
                                 {...register('payment_method_id', { required: 'Payment method is required' })}
                                 className="w-full cursor-pointer bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-bold focus:bg-white focus:border-blue-500 outline-none transition-all appearance-none"
                              >
                                 <option value="">-- Select Payment Method --</option>
                                 {paymentMethods.map((pm) => (
                                    <option key={pm.id} value={pm.id}>{pm.label}</option>
                                 ))}
                              </select>
                              {errors.payment_method_id && <p className="text-red-500 text-xs font-bold mt-1">{errors.payment_method_id.message}</p>}
                           </div>

                           {/* Payment Account */}
                           <div>
                              <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Account Number <span className="text-red-500">*</span></label>
                              <input
                                 {...register('payment_account', { required: 'Account number is required' })}
                                 type="text"
                                 className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-bold focus:bg-white focus:border-blue-500 outline-none transition-all"
                                 placeholder="xxxxxxxxx"
                              />
                              {errors.payment_account && <p className="text-red-500 text-xs font-bold mt-1">{errors.payment_account.message}</p>}
                           </div>

                           <button
                              type="submit"
                              disabled={updateProfileStatus === 'pending' || !isDirty}
                              className="bg-blue-600 text-white px-10 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-60"
                           >
                              {updateProfileStatus === 'pending' ? 'Saving...' : 'Save Changes'}
                           </button>
                        </form>
                     </div>
                  ) : activeTab === 'works' ? (
                     <div className="space-y-6">
                        <div className="flex justify-between items-center mb-4">
                           <h2 className="text-3xl font-black text-slate-900 tracking-tight">Novels</h2>
                           <NavLink to={ROUTES.UPLOAD_CHAPTER}>
                              <button className="w-full md:w-auto bg-blue-600 text-white px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95">
                                 + New Novel
                              </button>
                           </NavLink>
                        </div>
                        {novels.map((novel) => (
                           <NovelManagementRow 
                              key={novel.id} 
                              novel={novel} 
                              onDelete={handleDelete}
                              isAdmin={userInfoAndBooks?.user_id !== 1}
                           />
                        ))}
                     </div>
                  ) : (
                     <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 text-slate-400 font-bold italic">
                        Bio section coming soon...
                     </div>
                  )}
               </div>
            </div>
         </main>
      </div>
   );
};