import { Chip } from "@material-tailwind/react";
import { useTranslation } from 'react-i18next';
import { LOCALIZE_CONST, ROUTES } from "../consts/Consts";
import { NavLink } from "react-router-dom";

export const Categories = ({ categories }) => {
   
   const { t } = useTranslation();

   return (
      <div className="flex flex-col gap-5 bg-white rounded-lg shadow-sm border border-gray-200 w-[98%] gap-y-3 mx-auto px-5 py-6 relative">
         <h2 className="text-xl font-bold tracking-tight font-poppins">{ t(LOCALIZE_CONST.CATEGORIES) }</h2>
         <div className="flex flex-row flex-wrap gap-5">
            {categories?.length > 0 && categories?.map((category) => (
               <NavLink onClick={() => localStorage.setItem("CATEGORY_NAME", category?.name)} key={category?.id} to={ROUTES.NOVELS_BY_CATEGORY.replace(":category", category?.id)}>
                  <Chip
                     isPill={false}
                     key={category?.id}
                     className="transition-all hover:cursor-pointer duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
                     variant="gradient"
                  >
                     <Chip.Label>{category?.name}</Chip.Label>
                  </Chip>
               </NavLink>
            ))}
         </div>
      </div>
   );
};
