import { useState, useEffect, useMemo } from "react";
import {
   Trash,
   EditPencil,
   Eye,
   Plus,
   Search,
   PageLeft,
   PageRight
} from "iconoir-react";

// Sample data for the chapters
const chaptersData = [
   { id: 1, title: "The Beginning", wordCount: 4500, lastUpdated: "2024-07-15" },
   { id: 2, title: "A New Journey", wordCount: 6120, lastUpdated: "2024-07-12" },
   { id: 3, title: "The Dragon's Lair", wordCount: 8900, lastUpdated: "2024-07-10" },
   { id: 4, title: "Whispers in the Dark", wordCount: 3200, lastUpdated: "2024-07-08" },
   { id: 5, title: "Betrayal and Redemption", wordCount: 5670, lastUpdated: "2024-07-05" },
   { id: 6, title: "The Grand Tournament", wordCount: 7890, lastUpdated: "2024-07-02" },
   { id: 7, title: "Echoes of the Past", wordCount: 4100, lastUpdated: "2024-06-30" },
   { id: 8, title: "The Fallen King", wordCount: 6500, lastUpdated: "2024-06-28" },
   { id: 9, title: "Forging the Alliance", wordCount: 7250, lastUpdated: "2024-06-25" },
   { id: 10, title: "The Final Stand", wordCount: 9500, lastUpdated: "2024-06-22" },
   { id: 11, title: "Reunion", wordCount: 5120, lastUpdated: "2024-06-20" },
   { id: 12, title: "Epilogue", wordCount: 2800, lastUpdated: "2024-06-18" },
   { id: 13, title: "Shadows Rising", wordCount: 5300, lastUpdated: "2024-06-15" },
   { id: 14, title: "The Lost City", wordCount: 7200, lastUpdated: "2024-06-12" },
   { id: 15, title: "Winds of Change", wordCount: 4800, lastUpdated: "2024-06-10" },
   { id: 16, title: "The Secret Council", wordCount: 6100, lastUpdated: "2024-06-08" },
   { id: 17, title: "Veil of Deception", wordCount: 3900, lastUpdated: "2024-06-05" },
   { id: 18, title: "The Siege", wordCount: 8500, lastUpdated: "2024-06-02" },
   { id: 19, title: "Fires of War", wordCount: 7700, lastUpdated: "2024-05-30" },
   { id: 20, title: "The Broken Crown", wordCount: 6800, lastUpdated: "2024-05-28" },
   { id: 21, title: "Alliance Fractured", wordCount: 5400, lastUpdated: "2024-05-25" },
   { id: 22, title: "The Hidden Truth", wordCount: 4900, lastUpdated: "2024-05-22" },
   { id: 23, title: "Storm's Edge", wordCount: 7100, lastUpdated: "2024-05-20" },
   { id: 24, title: "The Last Hope", wordCount: 9200, lastUpdated: "2024-05-18" },
   { id: 25, title: "Dawn of Destiny", wordCount: 5800, lastUpdated: "2024-05-15" },
   { id: 26, title: "The Forgotten Tomb", wordCount: 6300, lastUpdated: "2024-05-12" },
   { id: 27, title: "Sands of Time", wordCount: 4700, lastUpdated: "2024-05-10" },
   { id: 28, title: "The Crimson Tide", wordCount: 8200, lastUpdated: "2024-05-08" },
   { id: 29, title: "Whispers of Fate", wordCount: 3600, lastUpdated: "2024-05-05" },
   { id: 30, title: "The Frozen Heart", wordCount: 5900, lastUpdated: "2024-05-02" },
   { id: 31, title: "Embers of Rebellion", wordCount: 7400, lastUpdated: "2024-04-30" },
   { id: 32, title: "The Silent Forest", wordCount: 5100, lastUpdated: "2024-04-28" },
   { id: 33, title: "The Oracle's Vision", wordCount: 4300, lastUpdated: "2024-04-25" },
   { id: 34, title: "The Iron Fortress", wordCount: 8800, lastUpdated: "2024-04-22" },
   { id: 35, title: "The Price of Power", wordCount: 6700, lastUpdated: "2024-04-20" },
   { id: 36, title: "The Hollow Throne", wordCount: 5500, lastUpdated: "2024-04-18" },
   { id: 37, title: "The Sundered Realm", wordCount: 7900, lastUpdated: "2024-04-15" },
   { id: 38, title: "The Blood Oath", wordCount: 6200, lastUpdated: "2024-04-12" },
   { id: 39, title: "The Cursed Blade", wordCount: 4800, lastUpdated: "2024-04-10" },
   { id: 40, title: "The Shadow's Grasp", wordCount: 7100, lastUpdated: "2024-04-08" },
   { id: 41, title: "The Fallen Star", wordCount: 9300, lastUpdated: "2024-04-05" },
   { id: 42, title: "The Wandering Bard", wordCount: 3700, lastUpdated: "2024-04-02" },
   { id: 43, title: "The Burning Sands", wordCount: 6500, lastUpdated: "2024-03-30" },
   { id: 44, title: "The Silver Key", wordCount: 5200, lastUpdated: "2024-03-28" },
   { id: 45, title: "The Dark Prophecy", wordCount: 8400, lastUpdated: "2024-03-25" },
   { id: 46, title: "The Last Spell", wordCount: 5900, lastUpdated: "2024-03-22" },
   { id: 47, title: "The Hollow Men", wordCount: 4600, lastUpdated: "2024-03-20" },
   { id: 48, title: "The Witching Hour", wordCount: 7800, lastUpdated: "2024-03-18" },
   { id: 49, title: "The Lost Heir", wordCount: 9100, lastUpdated: "2024-03-15" },
   { id: 50, title: "The Shattered Mirror", wordCount: 5700, lastUpdated: "2024-03-12" },
   { id: 51, title: "The Forsaken City", wordCount: 7200, lastUpdated: "2024-03-10" },
   { id: 52, title: "The Dying Light", wordCount: 4900, lastUpdated: "2024-03-08" },
   { id: 53, title: "The Black Rose", wordCount: 6600, lastUpdated: "2024-03-05" },
   { id: 54, title: "The Phantom's Kiss", wordCount: 5400, lastUpdated: "2024-03-02" },
   { id: 55, title: "The Eternal Flame", wordCount: 8100, lastUpdated: "2024-02-28" },
   { id: 56, title: "The Broken Chain", wordCount: 5900, lastUpdated: "2024-02-25" },
   { id: 57, title: "The Silent Watcher", wordCount: 4700, lastUpdated: "2024-02-22" },
   { id: 58, title: "The Weeping Willow", wordCount: 6300, lastUpdated: "2024-02-20" },
   { id: 59, title: "The Hollow Crown", wordCount: 8800, lastUpdated: "2024-02-18" },
   { id: 60, title: "The Last Breath", wordCount: 5200, lastUpdated: "2024-02-15" },
   { id: 61, title: "The Forgotten Gods", wordCount: 7500, lastUpdated: "2024-02-12" },
   { id: 62, title: "The Shattered Sky", wordCount: 9200, lastUpdated: "2024-02-10" },
   { id: 63, title: "The Crimson Dawn", wordCount: 6800, lastUpdated: "2024-02-08" },
   { id: 64, title: "The Lonely Road", wordCount: 4300, lastUpdated: "2024-02-05" },
   { id: 65, title: "The Wandering Soul", wordCount: 5700, lastUpdated: "2024-02-02" },
   { id: 66, title: "The Final Gambit", wordCount: 7900, lastUpdated: "2024-01-30" },
   { id: 67, title: "The Empty Throne", wordCount: 6100, lastUpdated: "2024-01-28" },
   { id: 68, title: "The Last Whisper", wordCount: 4800, lastUpdated: "2024-01-25" },
   { id: 69, title: "The Burning Bridge", wordCount: 7200, lastUpdated: "2024-01-22" },
   { id: 70, title: "The Frozen Tears", wordCount: 5500, lastUpdated: "2024-01-20" },
   { id: 71, title: "The Shattered Soul", wordCount: 8900, lastUpdated: "2024-01-18" },
   { id: 72, title: "The Lost Memory", wordCount: 5100, lastUpdated: "2024-01-15" },
   { id: 73, title: "The Final Curtain", wordCount: 6400, lastUpdated: "2024-01-12" },
   { id: 74, title: "The Waning Moon", wordCount: 4700, lastUpdated: "2024-01-10" },
   { id: 75, title: "The Broken Vow", wordCount: 8300, lastUpdated: "2024-01-08" },
   { id: 76, title: "The Hollow Echo", wordCount: 5900, lastUpdated: "2024-01-05" },
   { id: 77, title: "The Last Guardian", wordCount: 7100, lastUpdated: "2024-01-02" },
   { id: 78, title: "The Fading Light", wordCount: 5200, lastUpdated: "2023-12-30" },
   { id: 79, title: "The Silent Storm", wordCount: 7600, lastUpdated: "2023-12-28" },
   { id: 80, title: "The Forgotten Promise", wordCount: 6300, lastUpdated: "2023-12-25" },
   { id: 81, title: "The Wandering King", wordCount: 9400, lastUpdated: "2023-12-22" },
   { id: 82, title: "The Broken Seal", wordCount: 5800, lastUpdated: "2023-12-20" },
   { id: 83, title: "The Last Sacrifice", wordCount: 8200, lastUpdated: "2023-12-18" },
   { id: 84, title: "The Hollow Victory", wordCount: 6700, lastUpdated: "2023-12-15" },
   { id: 85, title: "The Final Dawn", wordCount: 4900, lastUpdated: "2023-12-12" },
   { id: 86, title: "The Lost Legend", wordCount: 7500, lastUpdated: "2023-12-10" },
   { id: 87, title: "The Shattered Dream", wordCount: 6100, lastUpdated: "2023-12-08" },
   { id: 88, title: "The Waning Star", wordCount: 5300, lastUpdated: "2023-12-05" },
   { id: 89, title: "The Broken Wings", wordCount: 7800, lastUpdated: "2023-12-02" },
   { id: 90, title: "The Last Prayer", wordCount: 9200, lastUpdated: "2023-11-30" },
   { id: 91, title: "The Silent Cry", wordCount: 5700, lastUpdated: "2023-11-28" },
   { id: 92, title: "The Forgotten Son", wordCount: 6400, lastUpdated: "2023-11-25" },
   { id: 93, title: "The Wandering Ghost", wordCount: 4900, lastUpdated: "2023-11-22" },
   { id: 94, title: "The Hollow Promise", wordCount: 7100, lastUpdated: "2023-11-20" },
   { id: 95, title: "The Last Chapter", wordCount: 8500, lastUpdated: "2023-11-18" },
   { id: 96, title: "The Broken Circle", wordCount: 6200, lastUpdated: "2023-11-15" },
   { id: 97, title: "The Fading Echo", wordCount: 5400, lastUpdated: "2023-11-12" },
   { id: 98, title: "The Silent End", wordCount: 7900, lastUpdated: "2023-11-10" },
   { id: 99, title: "The Forgotten Dawn", wordCount: 6800, lastUpdated: "2023-11-08" },
   { id: 100, title: "The Last Page", wordCount: 4300, lastUpdated: "2023-11-05" }
];

export const DataTableDemo = () => {

   const [chapters, setChapters] = useState(chaptersData);
   const [searchTerm, setSearchTerm] = useState("");
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 10; // Number of items to display per page

   // Filter chapters based on search term
   const filteredChapters = useMemo(() => {
      if (!searchTerm) {
         return chapters;
      }
      return chapters.filter((chapter) =>
         chapter.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
   }, [chapters, searchTerm]);

   // Pagination calculations
   const totalPages = Math.ceil(filteredChapters.length / itemsPerPage);
   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentItems = filteredChapters.slice(
      indexOfFirstItem,
      indexOfLastItem
   );

   // Handle page change
   const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
   };

   // Handle chapter actions (placeholder functions)
   const handleView = (id) => {
      console.log(`Viewing chapter with ID: ${id}`);
   };

   const handleEdit = (id) => {
      console.log(`Editing chapter with ID: ${id}`);
   };

   const handleDelete = (id) => {
      // A custom modal or dialog should be used instead of window.confirm
      if (
         window.confirm(`Are you sure you want to delete chapter with ID: ${id}?`)
      ) {
         setChapters(chapters.filter((chapter) => chapter.id !== id));
         console.log(`Deleted chapter with ID: ${id}`);

         // Adjust page if the last item on a page is deleted
         if (currentItems.length === 1 && currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
         }
      }
   };

   // Logic to determine which page numbers to show in the pagination controls
   const pageNumbersToShow = useMemo(() => {
      const pages = [];
      // Show a limited number of page buttons for a better user experience with many pages
      const maxPagesToShow = 5;
      const halfPages = Math.floor(maxPagesToShow / 2);
      let startPage = Math.max(1, currentPage - halfPages);
      let endPage = Math.min(totalPages, currentPage + halfPages);

      if (endPage - startPage + 1 < maxPagesToShow) {
         if (startPage === 1) {
            endPage = Math.min(totalPages, maxPagesToShow);
         } else if (endPage === totalPages) {
            startPage = Math.max(1, totalPages - maxPagesToShow + 1);
         }
      }

      if (startPage > 1) {
         pages.push(1);
         if (startPage > 2) {
            pages.push('...');
         }
      }
      for (let i = startPage; i <= endPage; i++) {
         pages.push(i);
      }
      if (endPage < totalPages) {
         if (endPage < totalPages - 1) {
            pages.push('...');
         }
         pages.push(totalPages);
      }
      return pages;
   }, [currentPage, totalPages]);

   return (
      <div className="min-h-screen -mt-6 text-gray-800 transition-colors duration-300 dark:bg-slate-900 dark:text-gray-200 font-inter p-4 sm:p-8">
         <div className="max-w-7xl mx-auto">
            {/* Header and Theme Switcher */}
            <header className="flex justify-between items-center py-4 mb-8 dark:border-slate-800">
               <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Novel Title
               </h1>
               <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200">
                     <Plus size={18} />
                     <span className="hidden sm:inline">Add New Chapter</span>
                  </button>
               </div>
            </header>

            {/* Main Content Area */}
            <main className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
               <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                     Chapter List
                  </h2>
                  <div className="relative w-full sm:w-64">
                     <input
                        type="text"
                        placeholder="Search chapters..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border-2 border-gray-300 dark:border-slate-600 bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-blue-500"
                     />
                     <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                     />
                  </div>
               </div>

               {/* Chapters Table */}
               <div className="overflow-x-auto rounded-lg border-2 border-gray-200 dark:border-slate-700">
                  <table className="min-w-full text-left">
                     <thead>
                        <tr className="bg-gray-100 dark:bg-slate-700 text-sm font-medium uppercase text-gray-600 dark:text-gray-300">
                           <th scope="col" className="px-6 py-3">
                              Title
                           </th>
                           <th scope="col" className="px-6 py-3">
                              Word Count
                           </th>
                           <th scope="col" className="px-6 py-3">
                              Last Updated
                           </th>
                           <th scope="col" className="px-6 py-3 text-right">
                              Actions
                           </th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                        {currentItems.length > 0 ? (
                           currentItems.map((chapter) => (
                              <tr
                                 key={chapter.id}
                                 className="hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-200"
                              >
                                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                    {chapter.title}
                                 </td>
                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                                    {chapter.wordCount.toLocaleString()}
                                 </td>
                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                                    {chapter.lastUpdated}
                                 </td>
                                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex items-center justify-end space-x-2">
                                       <button
                                          onClick={() => handleView(chapter.id)}
                                          title="View"
                                          className="p-2 rounded-full text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-200"
                                       >
                                          <Eye size={18} />
                                       </button>
                                       <button
                                          onClick={() => handleEdit(chapter.id)}
                                          title="Edit"
                                          className="p-2 rounded-full text-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-900 transition-colors duration-200"
                                       >
                                          <EditPencil size={18} />
                                       </button>
                                       <button
                                          onClick={() => handleDelete(chapter.id)}
                                          title="Delete"
                                          className="p-2 rounded-full text-red-600 hover:bg-red-100 dark:hover:bg-red-900 transition-colors duration-200"
                                       >
                                          <Trash size={18} />
                                       </button>
                                    </div>
                                 </td>
                              </tr>
                           ))
                        ) : (
                           <tr>
                              <td
                                 colSpan="4"
                                 className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                              >
                                 No chapters found.
                              </td>
                           </tr>
                        )}
                     </tbody>
                  </table>
               </div>

               {/* Pagination Controls */}
               {totalPages > 1 && (
                  <div className="flex flex-wrap justify-end items-center mt-6 gap-2">
                     <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                     >
                        <PageLeft size={20} />
                     </button>
                     {pageNumbersToShow.map((page, index) => (
                        <button
                           key={index}
                           onClick={() => page !== '...' && handlePageChange(page)}
                           disabled={page === '...'}
                           className={`px-4 py-2 rounded-lg text-sm font-medium ${page === currentPage
                              ? 'bg-blue-600 text-white'
                              : page === '...'
                                 ? 'text-gray-500 dark:text-gray-400 cursor-default'
                                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600'
                              } transition-colors duration-200`}
                        >
                           {page}
                        </button>
                     ))}
                     <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                     >
                        <PageRight size={20} />
                     </button>
                  </div>
               )
               }
            </main>
         </div>
      </div>
   );
};