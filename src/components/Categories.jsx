import { Chip } from "@material-tailwind/react";

export const Categories = () => {
   return (

      <div className="container flex flex-col gap-y-3 mx-auto w-full px-4 py-6 relative">
         <h2 className="text-xl font-extrabold text-gray-900 mb-6 tracking-tight font-poppins">Categories</h2>
         <div className="flex flex-row flex-wrap justify-around gap-5">
            <Chip className="transition-all hover:cursor-pointer duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg" variant="gradient">
               <Chip.Label>Gradient</Chip.Label>
            </Chip>
            <Chip className="transition-all hover:cursor-pointer duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg" variant="gradient">
               <Chip.Label>Gradient</Chip.Label>
            </Chip>
            <Chip className="transition-all hover:cursor-pointer duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg" variant="gradient">
               <Chip.Label>Gradient</Chip.Label>
            </Chip>
            <Chip className="transition-all hover:cursor-pointer duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg" variant="gradient">
               <Chip.Label>Gradient</Chip.Label>
            </Chip>
            <Chip className="transition-all hover:cursor-pointer duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg" variant="gradient">
               <Chip.Label>Gradient</Chip.Label>
            </Chip>
            <Chip className="transition-all hover:cursor-pointer duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg" variant="gradient">
               <Chip.Label>Gradient</Chip.Label>
            </Chip>
            <Chip className="transition-all hover:cursor-pointer duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg" variant="gradient">
               <Chip.Label>Gradient</Chip.Label>
            </Chip>
            <Chip className="transition-all hover:cursor-pointer duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg" variant="gradient">
               <Chip.Label>Gradient</Chip.Label>
            </Chip>
            <Chip className="transition-all hover:cursor-pointer duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg" variant="gradient">
               <Chip.Label>Gradient</Chip.Label>
            </Chip>
            <Chip className="transition-all hover:cursor-pointer duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg" variant="gradient">
               <Chip.Label>Gradient</Chip.Label>
            </Chip>
            <Chip className="transition-all hover:cursor-pointer duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg" variant="gradient">
               <Chip.Label>Gradient</Chip.Label>
            </Chip>
         </div>
      </div>
   );
}