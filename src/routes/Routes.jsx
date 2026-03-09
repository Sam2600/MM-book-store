import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "../pages/NotFound";
import { Novels } from "../pages/Novels";
import { NovelDetail } from "../pages/NovelDetail";
import DefaultLayout from "../layouts/DefaultLayout";
import { Chapter } from "../pages/Chapter";
import { Register } from "../pages/Register";
import { Upload } from "../pages/Upload";
import { ROUTES } from "../consts/Consts";
import { MyBooks } from "../pages/MyBooks";
import { AuthorProfile } from "../pages/AuthorProfile";
import { AdTestPage } from "../pages/AdTestPage";
import { Profile } from "../pages/Profile";
import { NormalProfile } from "../pages/NormalProfile";
import { ProfileDetail } from "../pages/ProfileDetail";
import { CategoryPage } from "../pages/CategoryPage";

export const Routes = createBrowserRouter([
   {
      path: ROUTES.HOME,
      element: <DefaultLayout />,
      children: [
         {
            path: ROUTES.HOME,
            element: <Novels />,
         },
         {
            path: ROUTES.NOVEL_BY_ID,
            element: <NovelDetail />,
         },
         {
            path: ROUTES.CHAPTER_BY_ID,
            element: <Chapter />,
         },
         {
            path: ROUTES.SIGN_IN,
            element: <Register />,
         },
         {
            path: ROUTES.UPLOAD_CHAPTER,
            element: <Upload />,
         },
         {
            path: ROUTES.MY_BOOKS,
            element: <MyBooks />,
         },
         {
            path: ROUTES.MY_PROFILE,
            element: <Profile />
         },
         {
            path: "/demo",
            element: <AdTestPage />
         },
         {
            path: ROUTES.TO_AUTHOR,
            element: <ProfileDetail />
         },
         {
            path: ROUTES.UPDATE_CHAPTER,
            element: <Upload />
         },
         {
            path: "/a",
            element: <NormalProfile />
         },
         {
            path: "/b",
            element: <AuthorProfile />
         },
         {
            path: ROUTES.NOVELS_BY_CATEGORY,
            element: <CategoryPage />
         }
      ],
   },
   {
      path: "/*",
      element: <NotFound />,
   },
]);