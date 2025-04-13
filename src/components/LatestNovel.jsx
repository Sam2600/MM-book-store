import {
   Card,
   CardBody,
   Typography,
   Avatar,
   Rating,
} from "@material-tailwind/react";
import zeus from "../assets/imgs/zeus.webp";
import { toHumanReadableDates } from "../functions/helpers";

export const LatestNovel = ({novel}) => {
      return (
      <Card className="w-full border border-slate-400 shadow-lg rounded-md p-2">
         <Card.Header className="mx-0 flex items-center gap-2">
            <Avatar
            size="lg"
            shape="rounded"
            alt="tania andrew"
            src={zeus}
            />
            <div className="flex w-full flex-col gap-0.5">
            <div className="flex items-center justify-between">
            <Typography variant="h6" className="text-sm text-gray-600">
               {novel?.title}
            </Typography>
               {novel?.created_at && toHumanReadableDates(novel?.created_at)}
            </div>
            </div>
         </Card.Header>
         <CardBody className="p-0">
            <Typography className="text-gray-700 text-sm sm:text-base flex-1">
                  {novel?.description?.length > 50 ? novel?.description?.slice(0, 59) + " ..." : novel?.description}
            </Typography>
         </CardBody>
      </Card>
      );
}