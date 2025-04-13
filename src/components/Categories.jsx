import { Chip } from "@material-tailwind/react";

export const Categories = ({categories}) => {
   return (
      <div className="container border border-slate-400 border-solid rounded-md shadow-xl w-[97.5%] flex flex-col gap-y-3 mx-auto px-5 py-6 relative">
         <h2 className="text-xl font-extrabold text-gray-900 mb-6 tracking-tight font-poppins">{ "စာပေ အမျိုးအစား" }</h2>
         <div className="flex flex-row flex-wrap gap-5">
            {categories?.length > 0 && categories.map((category) => (
               <Chip
                  isPill={false}
                  key={category?.id}
                  className="transition-all hover:cursor-pointer duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
                  variant="gradient"
               >
                  <Chip.Label>{category?.name}</Chip.Label>
               </Chip>
            ))}
         </div>
      </div>
   );
};
