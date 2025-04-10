import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {
   return (
      <div className="bg-gray-100 h-screen flex items-center justify-center">
         <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
         <h1 className="text-4xl font-bold text-gray-800 mb-8">
            404 - Page Not Found
         </h1>
         <p className="text-gray-600 mb-6">
            The page you are looking for might have been removed, had its name
            changed or is temporarily unavailable.
         </p>
         <Link
            className="flex justify-center border rounded-lg py-2 border-black hover:bg-black hover:text-white items-center transition-all duration-150"
            to="/"
         >
            To Home Page
         </Link>
         </div>
      </div>
   );
};