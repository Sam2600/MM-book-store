import { Novels } from "../pages/Novels";

export const checkStatus = (status) => {
   switch (status) {
      case "pending":
         return <div>Loading...</div>;

      case "failed":
         return <div>Failed...</div>;

      default:
         return <Novels />;
   }
};