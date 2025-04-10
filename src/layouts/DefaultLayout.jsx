import { Outlet } from "react-router-dom";
import { NavigationBar } from "../components/NavigationBar";
import { Footer } from "../components/Footer";

const DefaultLayout = () => {

   return (
      <div className="flex flex-col gap-y-4 ">
         <NavigationBar />
         <Outlet />
         <Footer />
      </div>
   );
};

export default DefaultLayout;