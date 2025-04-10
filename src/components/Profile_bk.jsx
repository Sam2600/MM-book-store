import {
   Card,
   Typography,
   Rating,
} from "@material-tailwind/react";
import zeus from "../assets/imgs/zeus.webp";

export const Profile = ({status}) => {
   return (
      <Card className="group relative w-[250px] h-[350px] overflow-hidden cursor-pointer">
           {/* Top-left Tag */}
           <div className={`absolute top-2 left-2 z-10 px-2 py-0.5 text-xs font-bold rounded-md 
             ${status == "Complete" ? "bg-green-600 text-white" : "bg-yellow-400 text-black"}`}
           >
             {status ? "Complete" : "Ongoing"}
           </div>
           <Card className="max-w-xs border border-slate-300 shadow-lg">
             <Card.Header
                 as="img"
                 src={zeus}
                 alt="profile-picture"   
             />
             <Card.Body className="text-center flex flex-col items-center gap-y-2">
                 <Typography variant="h6" className="text-sm text-gray-600">
                   တန်ခိုးရှင်
                 </Typography>
                 <Rating color="warning" value={5} readonly />
             </Card.Body>
             <Card.Footer className="flex items-center justify-center gap-1">
                 
             </Card.Footer>
         </Card>
      </Card>
   );
 }