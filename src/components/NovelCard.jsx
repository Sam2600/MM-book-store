import { Button, Card, Typography } from "@material-tailwind/react";
import zeus from "../assets/imgs/zeus.webp";

export const NovelCard = () => {
   return (
      <Card className={`flex flex-col sm:flex-row w-full h-full max-w-lg border shadow-md rounded-lg overflow-hidden`}>
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
               className="font-bold uppercase text-gray-700"
            >
               နှောင်ဖွဲ့ခြင်းကင်း တန်ခိုးရှင်
            </Typography>
            <Typography variant="h6" className="text-sm text-gray-600">
               ဇာတ်လမ်းအကျဥ်း
            </Typography>
            <Typography className="text-gray-700 text-sm sm:text-base flex-1">
               ကလန်တစ်ခုလုံး လုပ်ကြံခံရပြီးနောက် သိုင်းဆရာဟာ ဆိုက်ကားနင်းစားနေပါတယ်..
            </Typography>
            <div className="flex gap-x-3 flex-wrap mt-auto">
               <Button color="secondary" className="w-full sm:w-auto">
                  Action
               </Button>
               <Button color="secondary" className="w-full sm:w-auto">
                  Chill
               </Button>
            </div>
         </div>
      </Card>
   );
};