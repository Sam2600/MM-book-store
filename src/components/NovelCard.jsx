import { Card, Typography, Button } from "@material-tailwind/react";
import zeus from "../assets/imgs/zeus.webp";

export const NovelCard = () => {
   return (
      <Card className="flex flex-col sm:flex-row w-full max-w-lg border m-5 shadow-md">
         {/* Image Section - Takes 1/3 of the card */}
         <div className="relative w-full sm:w-1/3 h-48 sm:h-auto">
            <img
               src={zeus}
               alt="card-image"
               className="absolute inset-0 w-full h-full object-cover rounded-l-lg sm:rounded-none"
            />
         </div>

         {/* Content Section - Takes 2/3 of the card */}
         <div className="flex flex-col gap-y-2 p-4 w-full sm:w-2/3">
            <Typography
               variant="small"
               className="mb-2 font-bold uppercase text-foreground"
            >
               နှောင်ဖွဲ့ခြင်းကင်း တန်ခိုးရှင်
            </Typography>
            <Typography variant="h6" className="mb-2 text-sm">
               ဇာတ်လမ်းအကျဥ်း
            </Typography>
            <Typography className="mb-4 text-foreground text-sm sm:text-base">
               ကလန်တစ်ခုလုံး လုပ်ကြံခံရပြီးနောက် သိုင်းဆရာဟာ ဆိုက်ကားနင်းစားနေပါတယ်..
            </Typography>
            <div className="flex gap-x-3 flex-wrap">
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
