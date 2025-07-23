import { Chip } from "@material-tailwind/react";
import { useTranslation } from 'react-i18next';
import { LOCALIZE_CONST } from "../consts/Consts";

export const Categories = ({ categories }) => {
   
   const { t } = useTranslation();

   return (
      <div className="flex bg-[#F7F7F7] flex-col gap-5 border border-slate-400 border-solid rounded-md shadow-xl w-[98%] gap-y-3 mx-auto px-5 py-6 relative">
         <h2 className="text-xl font-bold tracking-tight font-poppins">{ t(LOCALIZE_CONST.CATEGORIES) }</h2>
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
