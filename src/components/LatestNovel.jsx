import {
   Card,
   CardBody,
   Typography,
   Avatar,
} from "@material-tailwind/react";
import { toHumanReadableDates } from "../functions/helpers";

export const LatestNovel = ({novel}) => {
      return (
      <Card className="w-full border border-slate-400 shadow-lg bg-[#F7F7F7] rounded-md p-2">
         <div className="mx-0 flex gap-3">
            <Avatar
            size="xl"
            shape="rounded"
            alt="tania andrew"
            src={novel?.cover_image}
            />
            {/* <div className="flex w-full flex-col gap-0.5"> */}
               <div className="flex flex-row w-full gap-3 items-start justify-between">
                  <div className="flex flex-col justify-between gap-1 w-3/4">
                     <Typography variant="h4" className="font-medium tracking-tight font-poppins items-center flex gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                        </svg>
                        {novel?.title}
                     </Typography>
                     <Typography variant="small" className="text-gray-700">
                        {novel?.author?.name}
                     </Typography>
                     <div className="flex flex-row items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                           <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                           <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clipRule="evenodd" />
                        </svg>
                        <p className="font-serif text-slate-800 text-md"> {novel?.view_count} views</p>
                     </div>
                  </div>
                  <Typography variant="small" className="text-gray-700 w-2/4 flex gap-2">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                     </svg>
                     {novel?.created_at && toHumanReadableDates(novel?.created_at)}
                  </Typography>
               </div>
            {/* </div> */}
         </div>
      </Card>
      );
}