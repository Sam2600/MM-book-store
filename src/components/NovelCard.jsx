import zeus from "../assets/imgs/zeus.webp";
import { Card, Chip, Typography } from "@material-tailwind/react";

export const NovelCard = ({novel}) => {
   
   return (
      <Card className={`flex flex-col sm:flex-row w-full h-full max-w-lg border border-slate-400 shadow-lg rounded-md overflow-hidden`}>
         {/* Image Section - Added h-full and fixed height behavior */}
         <div className="w-full sm:w-1/3 h-48 sm:h-full">
            <img
               src={zeus}
               alt="card-image"
               className="w-full h-full object-cover"
            />
         </div>

         {/* Content Section - Added flex-1 for proper expansion */}
         <div className="flex flex-col gap-y-2 p-4 w-full sm:w-2/3 flex-1">
            <Typography
               variant="small"
               className="font-bold uppercase text-black"
            >
               {novel?.title}
            </Typography>
            <Typography variant="h6" className="text-sm text-gray-600 font-semibold">
               ဇာတ်လမ်းအကျဥ်း
            </Typography>
            <Typography className="text-gray-700 text-sm sm:text-base flex-1">
               {novel?.description?.length > 100 ? novel?.description?.slice(0, 100) + " ..." : novel?.description}
            </Typography>
            <div className="flex gap-2 flex-wrap mt-auto">
               {
                  novel?.categories.length > 0 && (
                     novel?.categories.map(cate => {
                        return (
                           <Chip isPill={false} key={cate?.id} color="primary" className="w-auto sm:w-auto">
                              <Chip.Label>{cate?.name}</Chip.Label>
                           </Chip>
                        );
                     })
                  )
               }
            </div>
         </div>
      </Card>
   );
};