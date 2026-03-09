import { Card, Typography, Avatar } from "@material-tailwind/react";

export const Profile = ({ novel }) => {

   return (
      <div>
         <Card className="w-full lg:w-[180px] shadow-lg">
            <Card.Header className="m-0 w-full relative">
               <div>
                  <Avatar
                     size="xl"
                     className="w-full h-72 lg:w-60 lg:h-56 lg:object-fill"
                     shape="square"
                     alt={novel?.title}
                     src={novel?.cover_image}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none rounded-md" />
               </div>

               <div
                  className={`absolute top-2 left-2 z-10 px-2 py-0.5 text-xs font-bold rounded-md
                     ${novel?.status === 'completed'
                        ? 'bg-green-600 text-white shadow-sm'
                        : 'bg-yellow-400 text-black shadow-sm'
                     }
                     border border-gray-900/30`}
               >
                  {novel?.status}
               </div>
            </Card.Header>
         </Card>
         <div className="my-3 flex flex-col gap-y-2">
            <Typography variant="h4" className="font-medium tracking-tight font-poppins items-center flex gap-2">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
               </svg>
               {novel?.title.slice(0, 25)}
            </Typography>
         </div>
      </div>
   );
};