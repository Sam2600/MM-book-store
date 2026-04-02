import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "../consts/Consts";
import DefaultLayout from "../layouts/DefaultLayout";
import { Loader } from "../components/Loader";

const Novels = lazy(() => import("../pages/Novels").then(m => ({ default: m.Novels })));
const NovelDetail = lazy(() => import("../pages/NovelDetail").then(m => ({ default: m.NovelDetail })));
const Chapter = lazy(() => import("../pages/Chapter").then(m => ({ default: m.Chapter })));
const Register = lazy(() => import("../pages/Register").then(m => ({ default: m.Register })));
const Upload = lazy(() => import("../pages/Upload").then(m => ({ default: m.Upload })));
const MyBooks = lazy(() => import("../pages/MyBooks").then(m => ({ default: m.MyBooks })));
const AuthorProfile = lazy(() => import("../pages/AuthorProfile").then(m => ({ default: m.AuthorProfile })));
const AdTestPage = lazy(() => import("../pages/AdTestPage").then(m => ({ default: m.AdTestPage })));
const Profile = lazy(() => import("../pages/Profile").then(m => ({ default: m.Profile })));
const NormalProfile = lazy(() => import("../pages/NormalProfile").then(m => ({ default: m.NormalProfile })));
const ProfileDetail = lazy(() => import("../pages/ProfileDetail").then(m => ({ default: m.ProfileDetail })));
const CategoryPage = lazy(() => import("../pages/CategoryPage").then(m => ({ default: m.CategoryPage })));
const AboutUs = lazy(() => import("../pages/AboutUs").then(m => ({ default: m.AboutUs })));
const UserManual = lazy(() => import("../pages/UserManual").then(m => ({ default: m.UserManual })));
const CheckEmail = lazy(() => import("../pages/CheckEmail").then(m => ({ default: m.CheckEmail })));
const EmailVerified = lazy(() => import("../pages/EmailVerified").then(m => ({ default: m.EmailVerified })));
const RegisterAuthor = lazy(() => import("../pages/RegisterAuthor").then(m => ({ default: m.RegisterAuthor })));
const NotFound = lazy(() => import("../pages/NotFound").then(m => ({ default: m.NotFound })));

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
            path: ROUTES.REGISTER_AUTHOR,
            element: <RegisterAuthor />,
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
            path: ROUTES.USER_PROFILE,
            element: <NormalProfile />
         },
         {
            path: ROUTES.AUTHOR_PROFILE,
            element: <AuthorProfile />
         },
         {
            path: ROUTES.NOVELS_BY_CATEGORY,
            element: <CategoryPage />
         },
         {
            path: ROUTES.ABOUT_US,
            element: <AboutUs />
         },
         {
            path: ROUTES.READER_GUIDE,
            element: <UserManual />
         },
         {
            path: ROUTES.CHECK_EMAIL,
            element: <CheckEmail />
         },
         {
            path: ROUTES.EMAIL_VERIFIED,
            element: <EmailVerified />
         },
      ],
   },
   {
      path: "/*",
      element: (
         <Suspense fallback={<Loader />}>
            <NotFound />
         </Suspense>
      ),
   },
]);
