import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { NavigationBar } from "../components/NavigationBar";
import { Footer } from "../components/Footer";
import { Loader } from "../components/Loader";

const DefaultLayout = () => {

   return (
      <div className="flex flex-col h-screen">
         <NavigationBar />
         <main className="flex-grow flex flex-col">
            <Suspense fallback={<Loader />}>
               <Outlet />
            </Suspense>
         </main>
         <Footer />
      </div>
   );
};

export default DefaultLayout;