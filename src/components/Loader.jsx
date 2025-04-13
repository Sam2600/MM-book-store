import { Spinner } from '@material-tailwind/react';
import React from 'react'

export const Loader = () => {

   return (
      <div className="flex justify-center items-center h-screen pb-24">
         <Spinner className="h-12 w-12" />
      </div>
   );
}
