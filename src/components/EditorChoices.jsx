import { Avatar, Card, Chip, Typography } from "@material-tailwind/react";
import { LOCALIZE_CONST } from "../consts/Consts";
import { useTranslation } from "react-i18next";

export const EditorChoices = ({novel}) => {
   
   const { t } = useTranslation();
   
   return (
      <Card className="flex flex-col sm:flex-row w-full border border-slate-400 shadow-lg rounded-md overflow-hidden h-full bg-[#F7F7F7]">
      {/* Image Section */}
      {/* <div className="w-full sm:w-1/3 h-60 sm:h-auto sm:flex-shrink-0"> */}
            <Avatar
            className="w-auto h-56"
            shape="square"
            alt={novel?.title}
            src={novel?.cover_image}
            />
      {/* </div> */}

      {/* Content Section */}
      <div className="flex flex-col justify-center gap-y-2 p-4 w-full sm:w-2/3">
         <Typography variant="small" className="font-semibold tracking-tight font-poppins">
            {novel?.title}
         </Typography>
         <Typography variant="h6" className="text-sm text-gray-600 font-semibold">
            {t(LOCALIZE_CONST.DESCRIPTION)}
         </Typography>
         <Typography className="text-gray-700 text-sm sm:text-base flex-1">
            {novel?.description?.length > 100 ? novel?.description?.slice(0, 100) + " ..." : novel?.description}
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