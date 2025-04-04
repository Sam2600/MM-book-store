import React from "react";
import "@splidejs/react-splide/css"; // Import Splide CSS
import { Header } from "./components/Header";
import { Body } from "./components/Body";
import { NavigationBar } from "./components/NavigationBar";
import { Footer } from "./components/Footer";
import { Categories } from "./components/Categories";

export const App = () => {
   return (
      <div className="flex flex-col gap-y-4 ">
         <NavigationBar />
         <Header />
         <Body />
         <Body />
         <Categories />
         <Footer />
      </div>
   )
};