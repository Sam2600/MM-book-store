import {
   Card,
   Input,
   Button,
   Typography,
   Spinner,
   Dialog,
   CardBody,
   CardFooter,
   DialogOverlay,
   DialogContent,
   DialogDismissTrigger,
   IconButton,
   Select
} from "@material-tailwind/react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { Xmark } from "iconoir-react";

export const Upload = () => {

   // Main Form
   const {
      register,
      formState: { errors, isSubmitting },
      handleSubmit,
      reset,
      setValue,
   } = useForm({ defaultValues: { file: null } });

   // Modal box form
   const {
      register: register2,
      handleSubmit: handleSubmit2,
      formState: { errors: errors2 },
      reset: reset2
   } = useForm({ defaultValues: { img: null } });

   const [isMultiple, setIsMultiple] = useState(false);
   const [loading, setLoading] = useState(false);
   const [success, setSuccess] = useState(false);
   const [serverError, setServerError] = useState("");
   const [preview, setPreview] = useState(null);
   const [open, setOpen] = useState(false);

   const onSubmit = async (data) => {

      console.log("on submit 1");

      setLoading(true);
      try {
         const formData = new FormData();
         formData.append("file", data.file[0]);
         // TODO: your upload logic here
         setSuccess(true);
         reset();
      } catch (error) {
         setServerError("Upload failed");
      } finally {
         setLoading(false);
      }
   };

   const onError = (error) => {
      console.log("error 1");
      window.scrollTo({ top: 0 });
   }

   const onSubmit2 = async (data) => {

      // Handle modal form submission
      console.log(data);
      setOpen(false);
      reset2();
   };

   const onError2 = (error) => {
      console.log("error 2");
      
      window.scrollTo({ top: 0 });
   }

   return (
      <>
         {loading ? (
            <div className="flex justify-center items-center h-screen pb-24">
               <Spinner className="h-12 w-12" />
            </div>
         ) : (
            <div className="container my-12 mx-auto px-4 md:px-4">
               <div className="flex flex-col w-11/12 lg:w-6/12 mx-auto">
                  <div className="flex items-center justify-center mb-6">
                     <div className="flex flex-col sm:flex-row items-center gap-4">
                        <h1 className="text-xl font-semibold border border-slate-400 shadow-lg rounded-md px-4 py-2">
                           Chapter Register
                        </h1>
                        {success && <p className="bg-green-500 text-white px-3 py-1 rounded">Upload success!</p>}
                        {serverError && <p className="bg-red-500 text-white px-3 py-1 rounded">{serverError}</p>}
                     </div>
                  </div>

                  <AnimatePresence>
                     <motion.form
                        key="main-form"
                        method="post"
                        onSubmit={handleSubmit(onSubmit, onError)}
                        className="space-y-6"
                        initial={{ opacity: 0, x: "-10vw" }}
                        animate={{ opacity: 1, x: 0, transition: { duration: 1 } }}
                        exit={{ opacity: 0 }}
                     >
                        <div>
                           <div className="flex justify-between items-center mb-1">
                              <label className="font-semibold">Novels *</label>
                              <p className="text-red-500 text-sm">{errors.novel?.message}</p>
                           </div>
                           <div className="flex gap-4">
                              <select
                                 className="w-full bg-white p-2 border border-slate-400 rounded-md shadow-md"
                                 {...register("novel", {
                                    required: "Novel is required",
                                 })}
                              >
                                 <option value="">Pick</option>
                              </select>
                              <Button onClick={() => setOpen(true)} type="button">
                                 +
                              </Button>
                           </div>
                        </div>

                        <div>
                           <div className="flex flex-row justify-between">
                              <label className="block font-semibold mb-1">Volume *</label>
                              {errors.from_name && <p className="text-red-500 text-sm">{errors.from_name.message}</p>}
                           </div>
                              <Input
                                 type="number"
                                 className="w-full bg-white p-2 border border-slate-400 rounded-md shadow-md"
                                 placeholder="Name"
                                 {...register("from_name", {
                                    required: "Name is required",
                                    pattern: {
                                       value: /^[A-Za-z\s]+$/,
                                       message: "Only alphabet characters allowed"
                                    }
                                 })}
                           />
                        </div>

                        <div>
                           <div className="flex flex-row justify-between">
                              <label className="block font-semibold mb-1">File *</label>
                              {errors.file && <p className="text-red-500 text-sm">{errors.file.message}</p>}
                           </div>
                              <input
                              type="file"
                              accept="image/*"
                              className="w-full bg-white p-2 border border-slate-400 rounded-md shadow-md"
                              {...register("file", {
                                 required: "File is required",
                                 validate: {
                                    size: (files) => files?.[0]?.size < 2097152 || "Max 2MB",
                                    type: (files) => files?.[0]?.type.startsWith("image/") || "Must be an image"
                                 }
                              })}
                              onChange={(e) => {
                                 const file = e.target.files[0];
                                 if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => setPreview(reader.result);
                                    reader.readAsDataURL(file);
                                 } else {
                                    setPreview(null);
                                 }
                              }}
                           />
                        </div>

                        <Button type="submit" isFullWidth={true} disabled={isSubmitting}>
                           Upload
                        </Button>
                     </motion.form>
                  </AnimatePresence>
               </div>
            </div>
         )}

         {/* ✅ MODAL MOVED OUTSIDE */}
         <Dialog open={open} size="xl">
            <DialogOverlay>
               <DialogContent className="max-w-2xl">
                  <DialogDismissTrigger
                     onClick={() => {
                        setOpen(false);
                        reset2();
                     }}
                     as={IconButton}
                     size="sm"
                     variant="ghost"
                     className="absolute right-2 top-2"
                  >
                     <Xmark className="h-5 w-5" />
                  </DialogDismissTrigger>

                  <form onSubmit={handleSubmit2(onSubmit2, onError2)} className="w-full mx-auto">
                     <CardBody className="flex flex-col gap-6">
                        <h1 className="text-xl font-semibold text-center">
                           Novel Register
                        </h1>

                        <div>
                           <div className="flex flex-row justify-between">
                              <label className="block font-semibold mb-1">Name *</label>
                              {errors2.novel_name && <p className="text-red-500 text-sm">{errors2.novel_name.message}</p>}
                           </div>
                           <Input
                              className="w-full bg-white p-2 border border-slate-400 rounded-md shadow-md"
                              placeholder="Item Name"
                              {...register2("novel_name", {
                                 required: "Novel name is required"
                              })}
                           />
                        </div>

                        <div>
                           <div> 
                              <label className="block font-semibold mb-1">Description</label>
                           </div>   
                           <Input
                              className="w-full bg-white p-2 border border-slate-400 rounded-md shadow-md"
                              placeholder="Description"
                              {...register2("description")}
                           />
                        </div>

                        <div>
                           <div className="flex flex-row justify-between">
                              <label className="block font-semibold mb-1">Categories *</label>
                              {errors2.categories && <p className="text-red-500 text-sm">{errors2.categories.message}</p>}
                           </div>   
                           <select
                              multiple={isMultiple}
                              onClick={() => setIsMultiple(true)}
                              className="w-full bg-white p-2 border border-slate-400 rounded-md shadow-md focus:border-slate-700"
                              {...register2("categories", {
                                 required: "At least one category is required",
                              })}
                           >
                              <option value="" disabled className="text-slate-900">
                                 Choose categories
                              </option>
                              <option value="1" className="hover:bg-slate-400 hover:text-white my-1">
                                 Action
                              </option>
                              <option value="2" className="hover:bg-slate-400 hover:text-white">
                                 Adventure
                              </option>
                              <option value="3" className="hover:bg-slate-400 hover:text-white">
                                 BL
                              </option>
                              <option value="4" className="hover:bg-slate-400 hover:text-white">
                                 Cringe
                              </option>
                              <option value="5" className="hover:bg-slate-400 hover:text-white">
                                 Delusional
                              </option>
                              <option value="6" className="hover:bg-slate-400 hover:text-white">
                                 Emotional
                              </option>
                              <option value="7" className="hover:bg-slate-400 hover:text-white">
                                 Fighting
                              </option>
                              <option value="8" className="hover:bg-slate-400 hover:text-white">
                                 Horror
                              </option>
                              <option value="9" className="hover:bg-slate-400 hover:text-white">
                                 Sci-fi
                              </option>
                              <option value="10" className="hover:bg-slate-400 hover:text-white">
                                 Mystery
                              </option>
                           </select>
                        </div>

                        <div>
                           <div className="flex flex-row justify-between">
                              <label className="block font-semibold mb-1">Image *</label>
                              {errors2.novel_image && <p className="text-red-500 text-sm">{errors2.novel_image.message}</p>}
                           </div>
                           <input
                              type="file"
                              accept="image/*"
                              className="w-full bg-white p-2 border border-slate-400 rounded-md shadow-md"
                              {...register2("novel_image", {
                                 required: "Image is required",
                                 validate: {
                                    size: (files) => files?.[0]?.size < 2097152 || "Max 2MB",
                                    type: (files) => files?.[0]?.type.startsWith("image/") || "Must be an image"
                                 }
                              })}
                              // onChange={(e) => {
                              //    const file = e.target.files[0];
                              //    if (file) {
                              //       const reader = new FileReader();
                              //       reader.onloadend = () => setPreview(reader.result);
                              //       reader.readAsDataURL(file);
                              //    } else {
                              //       setPreview(null);
                              //    }
                              // }}
                           />
                        </div>
                     </CardBody>

                     <CardFooter className="pt-0 mt-5">
                        <Button type="submit" isFullWidth={true}>
                           Add Item
                        </Button>
                     </CardFooter>
                  </form>
               </DialogContent>
            </DialogOverlay>
         </Dialog>
      </>
   );
};
