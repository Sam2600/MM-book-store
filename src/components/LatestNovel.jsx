import {
   Card,
   CardBody,
   Typography,
   Avatar,
} from "@material-tailwind/react";
import { toHumanReadableDates } from "../functions/helpers";

export const LatestNovel = ({novel}) => {
      return (
      <Card className="w-full border border-slate-400 shadow-lg rounded-md p-2">
         <div className="mx-0 flex gap-3">
            <Avatar
            size="xl"
            shape="rounded"
            alt="tania andrew"
            src={novel?.cover_image}
            />
            {/* <div className="flex w-full flex-col gap-0.5"> */}
               <div className="flex flex-row w-full gap-3 items-center justify-between">
                  <div className="flex flex-col gap-1 w-3/4">
                     <Typography variant="h4" className="font-semibold tracking-tight font-poppins">
                        {novel?.title}
                     </Typography>
                     <Typography variant="small" className="text-gray-700">
                        {novel?.author?.name}
                     </Typography>
                     <Typography variant="small" className="text-gray-600">
                        {novel?.description && novel?.description.length > 50 ?
                           novel?.description?.slice(0, 50) + " ..." :
                           novel?.description}
                     </Typography>
                  </div>
                  <Typography variant="small" className="text-gray-700 w-1/4">
                     {novel?.created_at && toHumanReadableDates(novel?.created_at)}
                  </Typography>
               </div>
            {/* </div> */}
         </div>
      </Card>
      );
}