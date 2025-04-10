import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "../pages/NotFound";
import { Novels } from "../pages/Novels";
import { NovelDetail } from "../pages/NovelDetail";
import DefaultLayout from "../layouts/DefaultLayout";

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
      ],
   },
   {
      path: "/*",
      element: <NotFound />,
   },
]);