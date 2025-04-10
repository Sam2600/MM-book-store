import {
   Card,
   Typography,
   Rating,
   Chip,
} from "@material-tailwind/react";
import zeus from "../assets/imgs/zeus.webp";

export const Profile = ({ status }) => {

   const categoryList = [
      "Sports",
      "Art",
   ];

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
                        ${status === "Complete" ? "bg-green-600 text-white shadow-sm" : "bg-yellow-400 text-black shadow-sm"}
                        border border-gray-900/30`}>
            {status || "Ongoing"}
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
               တန်ခိုးရှင်
            </Typography>
            
            <div className="flex gap-x-2">
               {categoryList.map((category, index) => (
                  <Typography
                     variant="h6"
                     className="mb-2 text-white font-bold drop-shadow-lg"
                     style={{ 
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.7)',
                        textStroke: '2px white'
                     }}
                  >
                     {category}
                  </Typography>
               ))}
            </div>   
   
            {/* Rating with enhanced styling */}
            <Rating
               color="warning"
               value={5}
               readonly
               className="font-bold text-xl"
            />
         </div>
      </Card>
   );
};