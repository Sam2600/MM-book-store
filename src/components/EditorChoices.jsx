import { Card, Chip, Typography } from "@material-tailwind/react";

export const EditorChoices = ({novel}) => {
   
   return (
      <Card className="flex flex-col sm:flex-row w-full border border-slate-400 shadow-lg rounded-md overflow-hidden h-full">
      {/* Image Section */}
      <div className="w-full sm:w-1/3 h-60 sm:h-auto sm:flex-shrink-0">
         <img
            src={novel?.cover_image}
            alt="card-image"
            className="w-full h-full object-cover"
         />
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-center gap-y-2 p-4 w-full sm:w-2/3">
         <Typography variant="small" className="font-semibold tracking-tight font-poppins">
            {novel?.title}
         </Typography>
         <Typography variant="h6" className="text-sm text-gray-600 font-semibold">
            ဇာတ်လမ်းအကျဥ်း
         </Typography>
         <Typography className="text-gray-700 text-sm sm:text-base flex-1">
            {novel?.description?.length > 100 ? novel?.description?.slice(0, 100) + " ..." : novel?.description}
            </Typography>
         <div className="flex gap-2 flex-wrap mt-auto">
            {
               novel?.categories.length > 0 && (
                  novel?.categories.map(cate => (
                     <Chip isPill={false} key={cate?.id} color="primary" className="w-auto sm:w-auto">
                        <Chip.Label>{cate?.name}</Chip.Label>
                     </Chip>
                  ))
               )
            }
         </div>
      </div>
   </Card>
   );
};