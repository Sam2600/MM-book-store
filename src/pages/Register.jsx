import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { Loader } from '../components/Loader';
import { api } from "../axios/axios";
import { scrollToTop } from "../functions/helpers";
import { useDispatch } from "react-redux";
import { addUploadNavMenuList } from "../states/features/nav/navMenuListSlice";

export const Register = () => {

   const dispatch = useDispatch();

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

         if(!isForRegister) {
            localStorage.setItem("token", response?.data?.data?.token);
            localStorage.setItem("user", JSON.stringify(response?.data?.data?.user));
         }
         setSuccess(true);
         setserverError("");
         setLoading(false);
         reset();

      } catch (error) {

         console.error("Error:", error);
         setserverError(error.response?.data?.message || "An error occurred");
         setSuccess(false);
         setLoading(false);
      }

      scrollToTop();

      dispatch(addUploadNavMenuList());
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
      <div className="container my-5 mx-auto px-4 md:px-4">
         <div className="flex flex-wrap justify-center items-center">
         <div className="flex flex-col w-full lg:w-1/2">
            <div className="flex flex-wrap justify-center">
               <div className="flex flex-col sm:flex-row text-center items-baseline md:max-w-xl lg:max-w-3xl">
               <h1 className="inline-block mr-5 md:ml-3 lg:ml-6 mb-3 text-center w-50 lg:w-50 md:w-auto border border-gray-800 shadow-lg text-lg sm:text-xl md:text-xl font-semibold text-gray-900 capitalize p-3 rounded-md">
                  {isForRegister ? "Register" : "Login"}
               </h1>

               {success && (
                  <p className="text-white bg-green-500 p-3 rounded-md">
                     {isForRegister ? "Registration" : "Login"} successful!
                  </p>
               )}

               {serverError && (
                  <p className="text-white bg-red-500 p-3 rounded-md">
                     {serverError}
                  </p>
               )}
               </div>
            </div>
            <div>
               <AnimatePresence>
               <motion.form
                  method="post"
                  onSubmit={handleSubmit(onSubmit, onError)}
                  className="w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-full lg:px-6"
                  initial={{ opacity: 0, x: "-10vw" }}
                  animate={{ opacity: 1, x: 0, transition: { duration: 1 } }}
                  exit={{ opacity: 0 }}
               >
                  {isForRegister && (
                     <div className="mb-3 w-full">
                        <div className="flex flex-row items-center justify-between w-full">
                        <label
                           className="block font-semibold mb-[2px] text-gray-800"
                           htmlFor="name_"
                        >
                           Name <span className="text-red-600">*</span>
                        </label>{" "}
                        <p className="block font-semibold mb-[2px] text-red-500">
                           {errors?.name?.message}
                        </p>
                        </div>

                        <input
                        name="name"
                        type="text"
                        className="p-2 border w-full outline-none rounded-md border-gray-700 focus:border-black focus:border-2"
                        id="name_"
                        placeholder="Name"
                        {...register("name", {
                           required: {
                              value: true,
                              message: "Name is required",
                           },

                           pattern: {
                              value: /^[A-Za-z\s]+$/,
                              message: "Only alphabetic characters are allowed",
                           },
                        })}
                        />
                     </div>
                  )}

                  <div className="mb-3 w-full">
                     <div className="flex flex-row items-center justify-between w-full">
                     <label
                        className="block font-semibold mb-[2px] text-gray-800"
                        htmlFor="email_"
                     >
                        Email <span className="text-red-600">*</span>
                     </label>
                     <p className="block font-semibold mb-[2px] text-red-500">
                        {errors?.email?.message}
                     </p>
                     </div>

                     <input
                     type="text"
                     name="from_email"
                     className="p-2 border w-full outline-none rounded-md border-gray-700 focus:border-black focus:border-2"
                     id="email_"
                     placeholder="Enter your email address"
                     {...register("email", {
                        required: {
                           value: true,
                           message: "Email is required",
                        },

                        pattern: {
                           value:
                           /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                           message: "Please enter a valid email format",
                        },

                        // Validate for multiple conditions
                        validate: {
                           notAdmin: (value) =>
                           value !== "admin@gmail.com" ||
                           "Please try with different email",
                           badDomain: (value) =>
                           !value.endsWith("customMail.com") ||
                           "Bad domain for email",
                           noScriptTags: (value) =>
                           !/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi.test(
                              value
                           ) || "Script tags are not allowed",
                        },
                     })}
                     />
                  </div>

                  <div className="mb-3 w-full">
                     <div className="flex flex-row items-center justify-between w-full">
                     <label
                        className="block font-semibold mb-[2px] text-gray-800"
                        htmlFor="password_"
                     >
                        Password <span className="text-red-600">*</span>
                     </label>
                     <p className="block font-semibold mb-[2px] text-red-500">
                        {errors?.password?.message}
                     </p>
                     </div>

                     <input
                     className="p-2 border w-full outline-none rounded-md border-gray-700 focus:border-black focus:border-2"
                     type="password"
                     name="password"
                     id="password_"
                     placeholder="Enter your password"
                     {...register("password", {
                        required: {
                           value: true,
                           message: "Password is required",
                        },
                        // Validate for multiple conditions
                        validate: {
                           minLengthAndNumber: (value) => {
                           if (value.length < 5) {
                              return "Must be at least 5 characters";
                           }
                           if (!/\d/.test(value)) {
                              return "Must include at least one number";
                           }
                           return true;
                           },
                        },
                     })}
                     />
                  </div>

                  {isForRegister && (
                     <div className="mb-3 w-full">
                        <div className="flex flex-row items-center justify-between w-full">
                        <label
                           className="block font-semibold mb-[2px] text-gray-800"
                           htmlFor="confirm_password_"
                        >
                           Confirm Password <span className="text-red-600">*</span>
                        </label>
                        <p className="block font-semibold mb-[2px] text-red-500">
                           {errors?.confirm_password?.message}
                        </p>
                        </div>

                        <input
                        className="p-2 border w-full outline-none rounded-md border-gray-700 focus:border-black focus:border-2"
                        type="password"
                        name="confirm_password"
                        id="confirm_password_"
                        placeholder="Confirm your password"
                        {...register("confirm_password", {
                           required: {
                              value: true,
                              message: "Confirm password is required",
                           },
                           // Validate for multiple conditions
                           validate: {
                              mustBeSameWithPassword: (value) => {
                              if (value !== getValues("password")) {
                                 return "Passwords must match";
                              }
                              return true;
                              },
                           },
                        })}
                        />
                     </div>
                  )}

                  <button
                     disabled={isSubmitting}
                     type="submit"
                     value="Send"
                     className="mb-6 mt-5 inline-block w-full rounded bg-gray-800 px-6 py-2.5 font-medium uppercase leading-normal text-white border border-transparent hover:shadow-md hover:bg-white hover:border-gray-800 hover:text-gray-800"
                  >
                     {isForRegister ? "Register" : "Login"}
                  </button>
                  {isForRegister ? (
                     <p className="text-center text-gray-600">
                        Already have an account?{" "}
                        <span
                           className="cursor-pointer text-blue-500 hover:underline"
                           onClick={() => {
                              setIsForRegister(false);
                              setSuccess(false);
                              setserverError("");
                              scrollToTop();
                              setLoading(false);
                              reset();
                           }}
                        >
                           Login Here!
                        </span>
                     </p>)
                     : (
                     <p className="text-center text-gray-600">
                        Don't have an account?{" "}
                        <span
                           className="cursor-pointer text-blue-500 hover:underline"
                           onClick={() => {
                              setIsForRegister(true);
                              setSuccess(false);
                              setserverError("");
                              scrollToTop();
                              setLoading(false);
                              reset();
                           }}
                        >
                           Register Here!
                        </span>
                     </p>
                     )
                  }
               </motion.form>
               </AnimatePresence>
            </div>
         </div>
         
         </div>
      </div>
   );

   return component;
};
