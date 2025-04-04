import {
   Card,
   Typography,
   IconButton,
   Tooltip,
   Rating,
} from "@material-tailwind/react";
import zeus from "../assets/imgs/zeus.webp";

export const Profile = () => {
   return (
      <Card className="max-w-xs">
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
   );
}