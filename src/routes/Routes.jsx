import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "../pages/NotFound";
import { Novels } from "../pages/Novels";
import { NovelDetail } from "../pages/NovelDetail";
import DefaultLayout from "../layouts/DefaultLayout";
import { Chapter } from "../pages/Chapter";
import { Register } from "../pages/Register";
import { Upload } from "../pages/Upload";

export const Routes = createBrowserRouter([
   {
      path: "/",
      element: <DefaultLayout />,
      children: [
         {
            path: "/",
            element: <Novels />,
         },
         {
            path: "/novels/:id",
            element: <NovelDetail />,
         },
         {
            path: "/novels/:id/:chapter",
            element: <Chapter />,
         },
         {
            path: "/account",
            element: <Register />,
         },
         {
            path: "/upload-chapters",
            element: <Upload />,
         }
      ],
   },
   {
      path: "/*",
      element: <NotFound />,
   },
]);