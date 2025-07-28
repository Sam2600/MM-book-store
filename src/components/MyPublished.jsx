import { EyeIcon, StarIcon, QueueListIcon } from '@heroicons/react/24/outline'; // Heroicons outline

export const MyPublished = ({ myPublish }) => {
   return (
      <div className="card flex flex-col sm:flex-row items-start gap-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
         <img
            src={myPublish?.cover_image}
            alt={myPublish?.title}
            className="w-full sm:w-32 h-auto object-cover rounded-md flex-shrink-0"
         />
         <div className="w-full">
            <h3 className="text-lg font-bold text-gray-900">{myPublish?.title}</h3>
            <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mt-1">
               <span className="flex items-center">
                  <EyeIcon className="w-4 h-4 mr-1.5" /> {/* Heroicon */}
                  {myPublish?.view_count}
               </span>
               {/* <span className="flex items-center">
                  <StarIcon className="w-4 h-4 mr-1.5" /> 4.5 (120)
               </span> */}
               <span className="flex items-center">
                  <QueueListIcon className="w-4 h-4 mr-1.5" /> {myPublish?.chapters_count} Chapters
               </span>
            </div>
            <p className="text-gray-600 mt-3 text-sm leading-relaxed">
               {myPublish?.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
               {myPublish?.categories.length > 0
                  ? myPublish?.categories.map(cat => {
                     return (
                        <span key={cat?.id} className="text-xs font-medium text-gray-600 bg-gray-200 px-2.5 py-1 rounded-full">
                           {cat?.name}
                        </span>
                     )
                  })
                  :  <></>
               }
            </div>
         </div>
      </div>
   )
}
