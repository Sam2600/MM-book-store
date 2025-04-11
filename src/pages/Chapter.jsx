import { Button, ButtonGroup, Typography } from '@material-tailwind/react'
import React from 'react'
import { Breadcrumber } from '../components/BreadCrumber'
import { NavLink } from 'react-router-dom'
import { Bold, Book, Italic, SkipNext, Underline } from 'iconoir-react'

export const Chapter = () => {

   // https://www.phind.com/search/cm9bjvokn00002a6k9im9zjyg

   return (
      <div className="w-10/12 mx-auto flex flex-col gap-y-3">

         <div className='flex flex-row justify-between'>

            <Breadcrumber />

            <ButtonGroup variant="outline">
               <Button>
                  <Book className="mr-1.5 h-4 w-4 stroke-2" />
                  Novel
               </Button>

               <Button>
                  Next
                  <SkipNext className="ml-1.5 h-4 w-4 stroke-2" />
               </Button>
            </ButtonGroup>
         </div>
         
         <p className="p-5 border border-slate-400 rounded-md shadow-lg">
            <div className="flex flex-col mb-10 gap-y-3 items-center">
               <Typography type='h6'>အပိုင်း ၁</Typography>
               <Typography type='h5'>ပါရမီရှင်</Typography>
            </div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum itaque asperiores quibusdam! Harum esse sint enim! Similique eligendi sapiente autem tenetur dolorum. Deserunt est voluptates obcaecati ratione dolorem nobis culpa.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum itaque asperiores quibusdam! Harum esse sint enim! Similique eligendi sapiente autem tenetur dolorum. Deserunt est voluptates obcaecati ratione dolorem nobis culpa.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum itaque asperiores quibusdam! Harum esse sint enim! Similique eligendi sapiente autem tenetur dolorum. Deserunt est voluptates obcaecati ratione dolorem nobis culpa.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum itaque asperiores quibusdam! Harum esse sint enim! Similique eligendi sapiente autem tenetur dolorum. Deserunt est voluptates obcaecati ratione dolorem nobis culpa.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum itaque asperiores quibusdam! Harum esse sint enim! Similique eligendi sapiente autem tenetur dolorum. Deserunt est voluptates obcaecati ratione dolorem nobis culpa.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum itaque asperiores quibusdam! Harum esse sint enim! Similique eligendi sapiente autem tenetur dolorum. Deserunt est voluptates obcaecati ratione dolorem nobis culpa.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum itaque asperiores quibusdam! Harum esse sint enim! Similique eligendi sapiente autem tenetur dolorum. Deserunt est voluptates obcaecati ratione dolorem nobis culpa.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum itaque asperiores quibusdam! Harum esse sint enim! Similique eligendi sapiente autem tenetur dolorum. Deserunt est voluptates obcaecati ratione dolorem nobis culpa.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum itaque asperiores quibusdam! Harum esse sint enim! Similique eligendi sapiente autem tenetur dolorum. Deserunt est voluptates obcaecati ratione dolorem nobis culpa.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum itaque asperiores quibusdam! Harum esse sint enim! Similique eligendi sapiente autem tenetur dolorum. Deserunt est voluptates obcaecati ratione dolorem nobis culpa.
         </p>
      </div>
   )
}
