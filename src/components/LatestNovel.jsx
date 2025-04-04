import {
   Card,
   CardBody,
   Typography,
   Avatar,
   Rating,
} from "@material-tailwind/react";
import zeus from "../assets/imgs/zeus.webp";

export const LatestNovel = () => {
      return (
      <Card className="w-full border border-slate-300 shadow-none p-2">
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
               တန်ခိုးရှင်
            </Typography>
               <Rating color="warning" value={5} readonly />
            </div>
            </div>
         </Card.Header>
         <CardBody className="p-0">
            <Typography className="text-gray-700 text-sm sm:text-base flex-1">
               ကလန်တစ်ခုလုံး လုပ်ကြံခံရပြီးနောက် သိုင်းဆရာဟာ ဆိုက်ကားနင်းစားနေပါတယ်..
            </Typography>
         </CardBody>
      </Card>
      );
}