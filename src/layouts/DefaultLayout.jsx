import { Outlet } from "react-router-dom";
import { NavigationBar } from "../components/NavigationBar";
import { Footer } from "../components/Footer";

const DefaultLayout = () => {

   return (
      <div className="flex flex-col gap-7 h-screen">
         <NavigationBar />
         <main className="flex-grow flex flex-col">
            <Outlet />
         </main>
         <Footer />
      </div>
   );
};

export default DefaultLayout;