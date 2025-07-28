import { Avatar, Card, Chip, Typography } from "@material-tailwind/react";
import { LOCALIZE_CONST } from "../consts/Consts";
import { useTranslation } from "react-i18next";

export const EditorChoices = ({novel}) => {
   
   const { t } = useTranslation();
   
   return (
      <Card className="flex flex-col sm:flex-row w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-full">
      {/* Image Section */}
         {/* <div className="w-full sm:w-1/3 h-60 sm:h-auto sm:flex-shrink-0"> */}
         <div>
            <Avatar
            className="w-full h-72 lg:w-60 lg:h-56 lg:object-fill"
            shape="square"
            alt={novel?.title}
            src={novel?.cover_image}
            />
         </div>
      {/* </div> */}

      {/* Content Section */}
      <div className="flex flex-col justify-center gap-y-2 p-4 w-full">
         <Typography variant="small" className="font-semibold tracking-tight font-poppins">
            {novel?.title}
         </Typography>
         <Typography variant="h6" className="text-sm text-gray-600 font-semibold">
            {t(LOCALIZE_CONST.DESCRIPTION)}
         </Typography>
         <Typography className="text-gray-700 text-sm sm:text-base flex-1">
               {/* {novel?.description?.length > 200 ? novel?.description?.slice(0, 200) + " ..." : novel?.description} */}
               {novel?.description}
            </Typography>
         <div className="flex gap-2 flex-wrap mt-auto">
            {
               novel?.categories.length > 0 && (
                  novel?.categories.map(cate => (
                     <Chip isPill={false} key={cate?.id} color="primary" className="w-auto sm:w-auto">
                        <Chip.Label>{cate?.name}</Chip.Label>
                     </Chip>
                  ))
               )
            }
         </div>
      </div>
   </Card>
   );
};