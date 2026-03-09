import { StarIcon } from "@heroicons/react/24/solid";

export const renderStars = (rating) => {
   const fullStars = Math.floor(rating);
   const hasHalf = rating % 1 >= 0.5;

   return (
      <div className="flex items-center gap-1">
         {[new Array(5)].map((_, i) => {
            if (i < fullStars) {
               return <StarIcon key={i} className="h-5 w-5 text-amber-500" />;
            }

            if (i === fullStars && hasHalf) {
               return (
                  <div key={i} className="relative h-5 w-5">
                  <StarIcon className="absolute h-5 w-5 text-gray-300" />
                  <div className="absolute overflow-hidden w-1/2">
                     <StarIcon className="h-5 w-5 text-amber-500" />
                  </div>
                  </div>
               );
            }

            return <StarIcon key={i} className="h-5 w-5 text-gray-300" />;
         })}
      </div>
   );
};