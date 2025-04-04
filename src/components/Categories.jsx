import { Chip } from "@material-tailwind/react";

const categoryList = [
   "Technology",
   "Health",
   "Finance",
   "Travel",
   "Food",
   "Education",
   "Fashion",
   "Gaming",
   "Science",
   "Sports",
   "Art",
];

export const Categories = () => {
   return (
      <div className="container flex flex-col gap-y-3 mx-auto w-full px-4 py-6 relative">
         <h2 className="text-xl font-extrabold text-gray-900 mb-6 tracking-tight font-poppins">Categories</h2>
         <div className="flex flex-row flex-wrap justify-around gap-5">
         {categoryList.map((category, index) => (
            <Chip
               key={index}
               className="transition-all hover:cursor-pointer duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
               variant="gradient"
            >
               <Chip.Label>{category}</Chip.Label>
            </Chip>
         ))}
         </div>
      </div>
   );
};
