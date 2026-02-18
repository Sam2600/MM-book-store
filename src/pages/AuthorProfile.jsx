import { Twitter, Facebook, Instagram, Globe, Telegram } from 'iconoir-react';
import { DEFAULT_IMG_CHAR, ROUTES } from '../consts/Consts';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthorInfoAndBooks, getAuthorInfoAndBooksStatus, getAuthorInfoAndNovels } from '../states/features/user/userSlice';
import { scrollToTop } from '../functions/helpers';
import { NavLink, useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { Avatar } from '@material-tailwind/react';

// This is the main App component that will be rendered.
export const AuthorProfile = () => {
   // Hardcoded placeholder data for the author and their novels.
   const author_ = {
      name: 'Prof. Rhett Katherin V',
      photo: 'https://placehold.co/256x256/1f2937/d1d5db?text=Author+Photo',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      social: {
         twitter: 'https://twitter.com/',
         facebook: 'https://facebook.com/',
         instagram: 'https://instagram.com/',
         website: 'https://example.com/',
         telegram: 'https://telegram.com'
      },
   };

   const novels = [
      {
         id: 1,
         title: 'The Great Journey',
         cover: 'https://placehold.co/150x200/1f2937/d1d5db?text=Novel+Cover',
         genres: ['Fantasy', 'Adventure'],
         link: '#',
      },
      {
         id: 2,
         title: 'Whispers of the Stars',
         cover: 'https://placehold.co/150x200/1f2937/d1d5db?text=Novel+Cover',
         genres: ['Sci-Fi', 'Mystery'],
         link: '#',
      },
      {
         id: 3,
         title: 'The Clockwork City',
         cover: 'https://placehold.co/150x200/1f2937/d1d5db?text=Novel+Cover',
         genres: ['Steampunk'],
         link: '#',
      },
      {
         id: 4,
         title: 'Echoes of the Past',
         cover: 'https://placehold.co/150x200/1f2937/d1d5db?text=Novel+Cover',
         genres: ['Historical Fiction'],
         link: '#',
      },
      {
         id: 5,
         title: 'The Serpent\'s Eye',
         cover: 'https://placehold.co/150x200/1f2937/d1d5db?text=Novel+Cover',
         genres: ['Thriller', 'Horror'],
         link: '#',
      },
      {
         id: 6,
         title: 'A Song for Tomorrow',
         cover: 'https://placehold.co/150x200/1f2937/d1d5db?text=Novel+Cover',
         genres: ['Drama', 'Romance'],
         link: '#',
      },
   ];

   const { id } = useParams();

   const dispatch = useDispatch();

   const author = useSelector(getAuthorInfoAndBooks);

   //const me = useSelector(user);

   const authorInfoAndBooksStatus = useSelector(getAuthorInfoAndBooksStatus);

   useEffect(() => {
      scrollToTop();
      dispatch(getAuthorInfoAndNovels(id));
      
      return () => {
         
      }
   }, [])
   

   const content = authorInfoAndBooksStatus == 'pending'
      ? <Loader />
      : (
         <div className="min-h-screen text-gray-200 font-sans">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
               {/* Author Details Section */}
               <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                  {/* Author Photo */}
                  <div className="w-48 h-48 flex-shrink-0">
                     <img
                        src={DEFAULT_IMG_CHAR.replace(":char", author?.name?.charAt(0))}
                        alt={author?.name}
                        className="w-full h-full rounded-full object-cover border-4 border-gray-700"
                     />
                  </div>

                  {/* Author Info */}
                  <div className="text-center md:text-left">
                     <h1 className="text-4xl font-bold text-gray-600 mb-2">{author?.name}</h1>
                     <p className="text-gray-500 mb-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis voluptatum dolorum, deserunt doloribus ratione facere? Ea, est, eaque iste minus suscipit fugiat eius exercitationem repellendus, quos unde assumenda perspiciatis! Cum!</p>

                     {/* Social Media Links */}
                     <div className="flex justify-center md:justify-start space-x-4">
                        {author_.social.twitter && (
                           <a href={author_.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-white transition-colors duration-200">
                              <Twitter size={24} />
                           </a>
                        )}
                        {author_.social.facebook && (
                           <a href={author_.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-white transition-colors duration-200">
                              <Facebook size={24} />
                           </a>
                        )}
                        {author_.social.instagram && (
                           <a href={author_.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-white transition-colors duration-200">
                              <Instagram size={24} />
                           </a>
                        )}
                        {author_.social.website && (
                           <a href={author_.social.website} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-white transition-colors duration-200">
                              <Globe size={24} />
                           </a>
                        )}
                        {author_.social.website && (
                           <a href={author_.social.website} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-white transition-colors duration-200">
                              <Telegram size={24} />
                           </a>
                        )}
                     </div>
                  </div>
               </div>

               {/* List of Novels Section */}
               <div className="mt-12">
                  <h2 className="text-3xl font-bold text-black mb-6 border-b-2 border-gray-700 pb-2">
                     Published Novels
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                     {author?.novels?.length > 0 && author?.novels?.map((novel) => (
                        <NavLink
                           to={ROUTES.NOVEL_BY_ID.replace(":id", novel?.id)}
                           key={novel?.id}
                           href={novel?.link}
                           className="block bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden"
                        >

                           <Avatar
                              className="w-80 h-72"
                              shape="square"
                              src={novel?.cover_image}
                              alt={novel?.title}
                           />
                           <div className="p-4">
                              <h3 className="text-lg font-semibold text-white mb-1">{novel?.title}</h3>
                              <div className="flex flex-wrap gap-1">
                                 {novel?.categories?.map((cate) => (
                                    <span
                                       key={cate?.id}
                                       className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full"
                                    >
                                       {cate?.name}
                                    </span>
                                 ))}
                              </div>
                           </div>
                        </NavLink>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      )
   
   return content;
};
