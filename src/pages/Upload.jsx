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
   IconButton
} from "@material-tailwind/react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { Xmark } from "iconoir-react";

export const Upload = () => {
   const {
      register,
      formState: { errors, isSubmitting },
      handleSubmit,
      reset,
      setValue,
   } = useForm({ defaultValues: { file: null } });

   const {
      register: register2,
      handleSubmit: handleSubmit2,
      formState: { errors: errors2 },
      reset: reset2
   } = useForm();

   const [loading, setLoading] = useState(false);
   const [success, setSuccess] = useState(false);
   const [serverError, setServerError] = useState("");
   const [preview, setPreview] = useState(null);
   const [open, setOpen] = useState(false);

   const onSubmit = async (data) => {
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

   const onSubmit2 = async (data) => {
      // Handle modal form submission
      console.log("Modal submitted:", data);
      setOpen(false);
      reset2();
   };

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
                        <h1 className="text-xl font-semibold border px-4 py-2 rounded-md">
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
                        onSubmit={handleSubmit(onSubmit)}
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
                                 className="w-full border p-2 rounded-md"
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
                           <label className="block font-semibold mb-1">Name *</label>
                           <Input
                              placeholder="Name"
                              {...register("from_name", {
                                 required: "Name is required",
                                 pattern: {
                                    value: /^[A-Za-z\s]+$/,
                                    message: "Only alphabet characters allowed"
                                 }
                              })}
                           />
                           {errors.from_name && <p className="text-red-500 text-sm">{errors.from_name.message}</p>}
                        </div>

                        <div>
                           <label className="block font-semibold mb-1">Email *</label>
                           <Input
                              placeholder="Email"
                              {...register("email", {
                                 required: "Email is required",
                                 pattern: {
                                    value:
                                       /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalid email format"
                                 }
                              })}
                           />
                           {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>

                        <div>
                           <label className="block font-semibold mb-1">File *</label>
                           <input
                              type="file"
                              accept="image/*"
                              className="w-full border p-2 rounded-md"
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
                           {errors.file && <p className="text-red-500 text-sm">{errors.file.message}</p>}
                        </div>

                        <Button type="submit" fullWidth disabled={isSubmitting}>
                           Upload
                        </Button>
                     </motion.form>
                  </AnimatePresence>
               </div>
            </div>
         )}

         {/* ✅ MODAL MOVED OUTSIDE */}
         <Dialog open={open} handler={() => setOpen(false)} size="xl">
            <DialogOverlay>
               <DialogContent className="max-w-2xl">
                  <DialogDismissTrigger
                     as={IconButton}
                     size="sm"
                     variant="ghost"
                     className="absolute right-2 top-2"
                  >
                     <Xmark className="h-5 w-5" />
                  </DialogDismissTrigger>

                  <form onSubmit={handleSubmit2(onSubmit2)} className="w-full mx-auto">
                     <CardBody className="flex flex-col gap-6">
                        <Typography variant="h5" className="text-center">
                           Novel Register
                        </Typography>

                        <div>
                           <Typography variant="h6" className="mb-1">Name *</Typography>
                           <Input
                              placeholder="Item Name"
                              {...register2("novel_name", {
                                 required: "Novel name is required"
                              })}
                           />
                           {errors2.novel_name && (
                              <p className="text-red-500 text-sm">{errors2.novel_name.message}</p>
                           )}
                        </div>

                        <div>
                           <Typography variant="h6" className="mb-1">Description</Typography>
                           <Input placeholder="Description" {...register2("description")} />
                        </div>
                     </CardBody>

                     <CardFooter className="pt-0">
                        <Button type="submit" fullWidth>
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
