import { Button, Typography } from "@material-tailwind/react";
import { AdWatcher } from "../components/AdWatcher";
import { useState } from "react";

export const AdTestPage = () => {
   const [isAdOpen, setIsAdOpen] = useState(false);

   const handleClaim = async () => {
      try {
         const response = await axios.post('/api/ads/claim-reward');
         alert(`Success! New Balance: ${response.data.new_balance}`);
      } catch (error) {
         alert("Reward claim failed.");
      }
   };

   return (
      <div className="p-10">
         <Button color="amber" onClick={() => setIsAdOpen(true)}>
         Free Coins (+5) ရယူရန် Ads ကြည့်ပါ
         </Button>

         <AdWatcher 
         isOpen={isAdOpen} 
         onClose={() => setIsAdOpen(false)} 
         onRewardClaimed={handleClaim} 
         />
      </div>
   );
};