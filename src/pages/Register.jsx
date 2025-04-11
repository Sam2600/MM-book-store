import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";

export const Register = () => {
   // UseForm hook
   const { register, formState, handleSubmit, reset } = useForm();

   // Useful Form states
   const { errors, isSubmitting } = formState;

   const [success, setSuccess] = useState(false);
   const [loading, setLoading] = useState(false);
   const [serverError, setserverError] = useState("");

   const onSubmit = (data) => {
      //
      setLoading(true);

      console.log(data)
   };

   const onError = (errors, e) => {
      setSuccess(false);
      window.scrollTo({
         top: 0,
         left: 0,
         behavior: "smooth",
      });
   };

   const component = loading ? (
      <div className="flex justify-center items-center h-screen pb-24">
         {/* <img
         src={loadingGif}
         className="w-6/12 sm:w-4/12 md:w-3/12 lg:w-2/12 "
         alt="Loading..."
         /> */}
         loading..
      </div>
   ) : (
         <div className="container my-12 mx-auto px-4 md:px-4">

            <div className="flex flex-wrap justify-between">
               <div className="flex flex-col w-full lg:w-1/2">
                  <div className="flex flex-wrap">
                     <div className="flex flex-col sm:flex-row text-center items-baseline md:max-w-xl lg:max-w-3xl">
                        <h1 className="inline-block mr-5 md:ml-3 lg:ml-6 mb-3 text-center w-50 lg:w-50 md:w-auto border border-gray-800 shadow-lg text-lg sm:text-xl md:text-xl font-semibold text-gray-900 capitalize p-3 rounded-md">
                           Register
                        </h1>

                        {success && (
                           <p className="text-white bg-green-500 p-3 rounded-md">
                           Email has been sent successfully!
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
                           <div className="mb-3 w-full">
                           <div className="flex flex-row items-center justify-between w-full">
                              <label
                                 className="block font-semibold mb-[2px] text-gray-800"
                                 htmlFor="name_"
                              >
                                 Name <span className="text-red-600">*</span>
                              </label>{" "}
                              <p className="block font-semibold mb-[2px] text-red-500">
                                 {errors?.from_name?.message}
                              </p>
                           </div>

                           <input
                              name="from_name"
                              type="text"
                              className="p-2 border w-full outline-none rounded-md border-gray-700 focus:border-black focus:border-2"
                              id="name_"
                              placeholder="Name"
                              {...register("from_name", {
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
                                 htmlFor="message_"
                              >
                                 Message <span className="text-red-600">*</span>
                              </label>
                              <p className="block font-semibold mb-[2px] text-red-500">
                                 {errors?.message?.message}
                              </p>
                           </div>

                           <textarea
                              className="p-2 border w-full outline-none rounded-md border-gray-700 focus:border-black focus:border-2"
                              name="message"
                              id="message_"
                              {...register("message", {
                                 required: {
                                 value: true,
                                 message: "Email message is required",
                                 },

                                 // Validate for multiple conditions
                                 validate: {
                                 noScriptTags: (value) =>
                                    !/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi.test(
                                       value
                                    ) || "Please submit a valid message",
                                 },
                              })}
                           ></textarea>
                           </div>

                           <button
                           disabled={isSubmitting}
                           type="submit"
                           value="Send"
                           className="mb-6 mt-5 inline-block w-full rounded bg-gray-800 px-6 py-2.5 font-medium uppercase leading-normal text-white border border-transparent hover:shadow-md hover:bg-white hover:border-gray-800 hover:text-gray-800"
                           >
                           Send
                           </button>
                        </motion.form>
                     </AnimatePresence>
                  </div>
               </div>
               <div className="flex flex-col w-full lg:w-1/2">
                  <div className="flex flex-wrap">
                     <div className="flex flex-col sm:flex-row text-center items-baseline md:max-w-xl lg:max-w-3xl">
                        <h1 className="inline-block mr-5 md:ml-3 lg:ml-6 mb-3 text-center w-50 lg:w-50 md:w-auto border border-gray-800 shadow-lg text-lg sm:text-xl md:text-xl font-semibold text-gray-900 capitalize p-3 rounded-md">
                           Login
                        </h1>

                        {success && (
                           <p className="text-white bg-green-500 p-3 rounded-md">
                           Email has been sent successfully!
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
                           <div className="mb-3 w-full">
                           <div className="flex flex-row items-center justify-between w-full">
                              <label
                                 className="block font-semibold mb-[2px] text-gray-800"
                                 htmlFor="name_"
                              >
                                 Name <span className="text-red-600">*</span>
                              </label>{" "}
                              <p className="block font-semibold mb-[2px] text-red-500">
                                 {errors?.from_name?.message}
                              </p>
                           </div>

                           <input
                              name="from_name"
                              type="text"
                              className="p-2 border w-full outline-none rounded-md border-gray-700 focus:border-black focus:border-2"
                              id="name_"
                              placeholder="Name"
                              {...register("from_name", {
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
                                 htmlFor="message_"
                              >
                                 Message <span className="text-red-600">*</span>
                              </label>
                              <p className="block font-semibold mb-[2px] text-red-500">
                                 {errors?.message?.message}
                              </p>
                           </div>

                           <textarea
                              className="p-2 border w-full outline-none rounded-md border-gray-700 focus:border-black focus:border-2"
                              name="message"
                              id="message_"
                              {...register("message", {
                                 required: {
                                 value: true,
                                 message: "Email message is required",
                                 },

                                 // Validate for multiple conditions
                                 validate: {
                                 noScriptTags: (value) =>
                                    !/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi.test(
                                       value
                                    ) || "Please submit a valid message",
                                 },
                              })}
                           ></textarea>
                           </div>

                           <button
                           disabled={isSubmitting}
                           type="submit"
                           value="Send"
                           className="mb-6 mt-5 inline-block w-full rounded bg-gray-800 px-6 py-2.5 font-medium uppercase leading-normal text-white border border-transparent hover:shadow-md hover:bg-white hover:border-gray-800 hover:text-gray-800"
                           >
                           Send
                           </button>
                        </motion.form>
                     </AnimatePresence>
                  </div>
               </div>
            </div>
      </div>
   );

   return component;
};