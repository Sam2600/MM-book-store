import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { Loader } from "../components/Loader";
import { api } from "../axios/axios";
import { scrollToTop } from "../functions/helpers";
import { useDispatch } from "react-redux";
import { addExtraMenuItems } from "../states/features/nav/navMenuListSlice";
import { useTranslation } from "react-i18next";
import { LOCALIZE_CONST, ROUTES } from "../consts/Consts";
import { setUser } from "../states/features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { Typography } from "@material-tailwind/react";

export const Register = () => {
   const { t } = useTranslation();

   const dispatch = useDispatch();

   const navigate = useNavigate();

   // UseForm hook
   const { register, formState, handleSubmit, reset, getValues } = useForm();

   // Useful Form states
   const { errors, isSubmitting } = formState;

   const [success, setSuccess] = useState(false);
   const [loading, setLoading] = useState(false);
   const [isForRegister, setIsForRegister] = useState(true);
   const [serverError, setserverError] = useState("");

   const onSubmit = async (data) => {
      //
      setLoading(true);

      const { confirm_password, ...form_data } = data;

      const url = isForRegister ? "/register" : "/login";

      try {
         const response = await api.post(url, form_data);

         if (!isForRegister) {
         localStorage.setItem("token", response?.data?.data?.token);
         dispatch(setUser(response?.data?.data?.user));
         }
         setSuccess(true);
         setserverError("");
         setLoading(false);
         reset();
         navigate(ROUTES.HOME);
      } catch (error) {
         console.error("Error:", error);
         setserverError(error.response?.data?.message || "An error occurred");
         setSuccess(false);
         setLoading(false);
      }

      scrollToTop();

      dispatch(addExtraMenuItems());
   };

   const onError = (errors, e) => {
      setSuccess(false);
      scrollToTop();
   };

   const component = loading ? (
      <div className="flex justify-center items-center h-screen pb-24">
         <Loader />
      </div>
   ) : (
      <div className="container my-10 mx-auto px-4">
         <div className="flex flex-wrap justify-center items-center">
         <div className="flex flex-col w-full lg:w-1/2 max-w-lg">
            {/* Status Messages */}
            <div className="mb-6">
               {success && (
               <div className="flex items-center justify-center animate-in fade-in slide-in-from-top-2 duration-300">
                  <p className="text-sm font-bold text-green-600 bg-green-50 border border-green-200 w-full p-4 rounded-xl text-center shadow-sm">
                     {isForRegister ? "Registration" : "Login"} successful!
                  </p>
               </div>
               )}

               {serverError && (
               <div className="flex items-center justify-center animate-in fade-in slide-in-from-top-2 duration-300">
                  <p className="text-sm font-bold text-red-600 bg-red-50 border border-red-200 w-full p-4 rounded-xl text-center shadow-sm">
                     {serverError}
                  </p>
               </div>
               )}
            </div>

            <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-slate-100">
               <AnimatePresence mode="wait">
               <motion.form
                  key={isForRegister ? "register" : "login"}
                  method="post"
                  onSubmit={handleSubmit(onSubmit, onError)}
                  className="w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
                  exit={{ opacity: 0, y: -20 }}
               >
                  {/* Heading */}
                  <div className="mb-8 text-center">
                     <Typography className="text-2xl font-black text-slate-900 font-poppins uppercase tracking-tight">
                     {isForRegister
                        ? t(LOCALIZE_CONST.REGISTER)
                        : t(LOCALIZE_CONST.LOGIN)}
                     </Typography>
                     <Typography className="text-sm text-slate-500 font-medium mt-1">
                     Please enter your details below
                     </Typography>
                  </div>

                  {isForRegister && (
                     <div className="mb-5 w-full">
                     <div className="flex flex-row items-center justify-between mb-1.5">
                        <label
                           className="text-xs font-bold uppercase tracking-wider text-slate-700 ml-1"
                           htmlFor="name_"
                        >
                           {t(LOCALIZE_CONST.NAME)}{" "}
                           <span className="text-red-500">*</span>
                        </label>
                        <p className="text-[10px] font-bold text-red-500 animate-pulse">
                           {errors?.name?.message}
                        </p>
                     </div>
                     <input
                        name="name"
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none"
                        id="name_"
                        placeholder="John Doe"
                        {...register("name", {
                           required: { value: true, message: "Name is required" },
                           pattern: {
                           value: /^[A-Za-z\s]+$/,
                           message: "Only alphabetic characters allowed",
                           },
                        })}
                     />
                     </div>
                  )}

                  <div className="mb-5 w-full">
                     <div className="flex flex-row items-center justify-between mb-1.5">
                     <label
                        className="text-xs font-bold uppercase tracking-wider text-slate-700 ml-1"
                        htmlFor="email_"
                     >
                        {t(LOCALIZE_CONST.EMAIL)}{" "}
                        <span className="text-red-500">*</span>
                     </label>
                     <p className="text-[10px] font-bold text-red-500 animate-pulse">
                        {errors?.email?.message}
                     </p>
                     </div>
                     <input
                     type="text"
                     name="from_email"
                     className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none"
                     id="email_"
                     placeholder="example@mail.com"
                     {...register("email", {
                        required: { value: true, message: "Email is required" },
                        pattern: {
                           value:
                           /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                           message: "Invalid email format",
                        },
                        validate: {
                           notAdmin: (value) =>
                           value !== "admin@gmail.com" ||
                           "Try a different email",
                           badDomain: (value) =>
                           !value.endsWith("customMail.com") ||
                           "Bad domain for email",
                           noScriptTags: (value) =>
                           !/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi.test(
                              value,
                           ) || "Scripts not allowed",
                        },
                     })}
                     />
                  </div>

                  <div className="mb-5 w-full">
                     <div className="flex flex-row items-center justify-between mb-1.5">
                     <label
                        className="text-xs font-bold uppercase tracking-wider text-slate-700 ml-1"
                        htmlFor="password_"
                     >
                        {t(LOCALIZE_CONST.PASSWORD)}{" "}
                        <span className="text-red-600">*</span>
                     </label>
                     <p className="text-[10px] font-bold text-red-500 animate-pulse">
                        {errors?.password?.message}
                     </p>
                     </div>
                     <input
                     className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none"
                     type="password"
                     name="password"
                     id="password_"
                     placeholder="••••••••"
                     {...register("password", {
                        required: {
                           value: true,
                           message: "Password is required",
                        },
                        validate: {
                           minLengthAndNumber: (value) => {
                           if (value.length < 5)
                              return "Must be at least 5 characters";
                           if (!/\d/.test(value)) return "Must include a number";
                           return true;
                           },
                        },
                     })}
                     />
                  </div>

                  {isForRegister && (
                     <div className="mb-8 w-full">
                     <div className="flex flex-row items-center justify-between mb-1.5">
                        <label
                           className="text-xs font-bold uppercase tracking-wider text-slate-700 ml-1"
                           htmlFor="confirm_password_"
                        >
                           {t(LOCALIZE_CONST.CONFIRM_PASSWORD)}{" "}
                           <span className="text-red-600">*</span>
                        </label>
                        <p className="text-[10px] font-bold text-red-500 animate-pulse">
                           {errors?.confirm_password?.message}
                        </p>
                     </div>
                     <input
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none"
                        type="password"
                        name="confirm_password"
                        id="confirm_password_"
                        placeholder="••••••••"
                        {...register("confirm_password", {
                           required: {
                           value: true,
                           message: "Confirm password required",
                           },
                           validate: {
                           mustBeSameWithPassword: (value) =>
                              value === getValues("password") ||
                              "Passwords must match",
                           },
                        })}
                     />
                     </div>
                  )}

                  <button
                     disabled={isSubmitting}
                     type="submit"
                     className="w-full py-4 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-sm uppercase tracking-widest shadow-lg shadow-blue-500/20 transition-all duration-300 active:scale-[0.98] disabled:bg-slate-300 disabled:cursor-not-allowed"
                  >
                     {isForRegister
                     ? t(LOCALIZE_CONST.REGISTER)
                     : t(LOCALIZE_CONST.LOGIN)}
                  </button>

                  <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                     <p className="text-sm text-slate-500 font-medium">
                     {isForRegister
                        ? t(LOCALIZE_CONST.IS_HAVE_ACC)
                        : t(LOCALIZE_CONST.IS_DONT_HAVE_ACC)}
                     <span
                        className="ml-2 cursor-pointer text-blue-600 font-bold hover:text-blue-700 transition-colors"
                        onClick={() => {
                           setIsForRegister(!isForRegister);
                           setSuccess(false);
                           setserverError("");
                           scrollToTop();
                           setLoading(false);
                           reset();
                        }}
                     >
                        {isForRegister
                           ? t(LOCALIZE_CONST.LOGIN_HERE)
                           : t(LOCALIZE_CONST.REGISTER_HERE)}
                     </span>
                     </p>
                  </div>
               </motion.form>
               </AnimatePresence>
            </div>
         </div>
         </div>
      </div>
   );

   return component;
};
