import {
   Card,
   Typography,
   Rating,
} from "@material-tailwind/react";
import zeus from "../assets/imgs/zeus.webp";

export const Profile = ({ novel }) => {

   return (
      <Card className="group relative w-[250px] h-[350px] overflow-hidden cursor-pointer">
         <div className="absolute inset-0">
            <img
            src={zeus}
            alt="profile-picture"
            className="w-full h-full object-cover transition-transform group-hover:scale-110"
            />
            
            {/* Gradient overlay for better text visibility */}
            <div className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url(${zeus})] bg-cover bg-center">
            <div className="absolute inset-0 h-full w-full bg-gradient-to-t 
                           from-black/80 via-black/50 to-black/10 dark:from-black/90 dark:via-black/60 dark:to-black/20" />
            </div>
         </div>
   
         <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center">
            {/* Status badge with original styling */}
            <div className={`absolute top-4 left-4 z-10 px-2 py-0.5 text-xs font-bold rounded-md
                        ${novel?.status === "completed" ? "bg-green-600 text-white shadow-sm" : "bg-yellow-400 text-black shadow-sm"}
                        border border-gray-900/30`}>
               {novel?.status}
            </div>
   
            {/* Typography with enhanced styling */}
            <Typography
               variant="h6"
               className="mb-2 text-white font-bold drop-shadow-lg"
               style={{ 
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.7)',
                  textStroke: '2px white'
               }}
            >
               {novel?.title}
            </Typography>
            
            <div className="flex gap-x-2">
               {novel?.categories?.length > 0 && novel?.categories?.map((category) => (
                  <Typography
                     key={category?.id}
                     variant="h6"
                     className="mb-2 text-white font-bold drop-shadow-lg"
                     style={{ 
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.7)',
                        textStroke: '2px white'
                     }}
                  >
                     {category?.name}
                  </Typography>
               ))}
            </div>   
   
            {/* Rating with enhanced styling */}
            <Rating
               color="warning"
               value={Math.floor(Math.random() * 5) + 1}
               readonly
               className="font-bold text-xl"
            />
         </div>
      </Card>
   );
};