import {
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
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { Xmark } from "iconoir-react";
import { api } from "../axios/axios";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { Controller } from "react-hook-form";


const modules = {
   toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
   ],
};

export const Upload = () => {

   // Main Form
   const {
      register,
      formState: { errors, isSubmitting },
      handleSubmit,
      reset,
      control,
   } = useForm();

   // Modal box form
   const {
      register: register2,
      handleSubmit: handleSubmit2,
      formState: { errors: errors2 },
      reset: reset2
   } = useForm();

   const [isMultiple, setIsMultiple] = useState(false);
   const [loading, setLoading] = useState(false);
   const [success, setSuccess] = useState(false);
   const [serverError, setServerError] = useState("");
   const [preview, setPreview] = useState(null);
   const [open, setOpen] = useState(false);

   const [isNovelSuccess, setIsNovelSuccess] = useState(false);
   const [categories, setCategories] = useState([]);
   const [novelsByAuthor, setNovelsByAuthor] = useState([]);

   const onSubmit = async (data) => {

      setLoading(true);

      try {

         const response = await api.post("/chapters", data);

         console.log("Upload Success:", response.data);

         reset();

         setLoading(false);

      } catch (error) {
         setLoading(false);
         console.error("Upload Error:", error);
      }
   };

   const onError = (error) => {
      console.log("error 1");
      window.scrollTo({ top: 0 });
   }

   const onSubmit2 = async (data) => {

      if (data.cover_image.length) {
         data.cover_image = data.cover_image[0];
      }
      
      try {

         const response = await api.post("/novels", data, {

            headers: {
               "Content-Type": "multipart/form-data",
            },
         });

         console.log("Upload Success:", response.data);

         setOpen(false);
         setIsNovelSuccess(true);
         reset2();

      } catch (error) {
         console.error("Upload Error:", error);
      }
   };

   const onError2 = (error) => {
      console.log("error 2");
      
      window.scrollTo({ top: 0 });
   }

   useEffect(() => {

      api.get("/novelsByAuthors").then((res) => {
         setNovelsByAuthor(res.data);
      })
      .catch((err) => {
         console.error(err);
      });

      api.get("/categories").then((res) => {
         setCategories(res.data);
      })
      .catch((err) => {
         console.error(err);
      });

   }, [isNovelSuccess])

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
                                 {errors.novel_id && <p className="text-red-500 text-sm">{errors.novel_id?.message}</p>}
                           </div>
                           <div className="flex gap-4">
                              <select
                                 className="w-full bg-white p-2 border border-slate-400 rounded-md shadow-md"
                                 {...register("novel_id", {
                                    required: "Novel is required",
                                 })}
                              >
                                    <option value="">Pick</option>
                                    {
                                       novelsByAuthor?.length > 0 && (
                                          novelsByAuthor.map(nba => {
                                             return <option key={nba?.id} value={nba?.id}>{nba?.title}</option>
                                          })
                                       )
                                    }
                              </select>
                              <Button onClick={() => setOpen(true)} type="button">
                                 +
                              </Button>
                           </div>
                        </div>

                        <div>
                           <div className="flex flex-row justify-between">
                              <label className="block font-semibold mb-1">Volume *</label>
                              {errors.volume_id && <p className="text-red-500 text-sm">{errors.volume_id.message}</p>}
                           </div>
                              <Input
                                 type="number"
                                 className="w-full bg-white p-2 border border-slate-400 rounded-md shadow-md"
                                 {...register("volume_id", {
                                    required: "Volume is required",
                                       pattern: {
                                          value: /^[0-9]+$/,
                                          message: "Only numeric characters allowed"
                                       }
                                 })}
                           />
                        </div>

                        <div>
                           <div className="flex flex-row justify-between">
                              <label className="block font-semibold mb-1">Content *</label>
                              {errors.content && (
                                 <p className="text-red-500 text-sm">{errors.content.message}</p>
                              )}
                           </div>

                           <Controller
                              control={control}
                              name="content"
                              rules={{ required: "Content is required" }}
                              render={({ field }) => (
                                 <ReactQuill
                                    {...field}
                                    theme="snow"
                                    placeholder="Paste here or start writing..."
                                    modules={modules}
                                 />
                              )}
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
                              <label className="block font-semibold mb-1">Title *</label>
                              {errors2.title && <p className="text-red-500 text-sm">{errors2.title.message}</p>}
                           </div>
                           <Input
                              className="w-full bg-white p-2 border border-slate-400 rounded-md shadow-md"
                              placeholder="Novel title"
                              {...register2("title", {
                                 required: "Novel title is required"
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
                              {
                                 categories.length > 0 && (
                                    categories.map(cate => {
                                       return (<option value={cate?.id} className="hover:bg-slate-400 hover:text-white my-1">
                                          {cate?.name}
                                       </option>);
                                    })
                                 )
                              }
                              {/* <option value="1" className="hover:bg-slate-400 hover:text-white my-1">
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
                              </option> */}
                           </select>
                        </div>

                        <div>
                           <div className="flex flex-row justify-between">
                              <label className="block font-semibold mb-1">Image *</label>
                              {errors2.cover_image && <p className="text-red-500 text-sm">{errors2.cover_image.message}</p>}
                           </div>
                           <input
                              type="file"
                              accept="image/*"
                              className="w-full bg-white p-2 border border-slate-400 rounded-md shadow-md"
                              {...register2("cover_image", {
                                 required: "Image is required",
                                 validate: {
                                    size: (files) => files?.[0]?.size < 2097152 || "Max 2MB",
                                    type: (files) => files?.[0]?.type.startsWith("image/") || "Must be an image"
                                 }
                              })}
                              onChange={(e) => {
                                 const file = e.target.files[0];
                                 setFile2(file);
                              }}
                           />
                        </div>
                        <div className="flex flex-row gap-x-3 items-center">
                           <input type="checkbox" className="border border-slate-400" {...register2("status")} />
                              <Typography
                                 as="label"
                                 htmlFor="checkbox"
                                 className="cursor-pointer font-semibold"
                              >
                                 Ongoing?
                              </Typography>
                           </div>
                     </CardBody>

                     <CardFooter className="pt-0 mt-5">
                        <Button type="submit" isFullWidth={true}>
                           Register
                        </Button>
                     </CardFooter>
                  </form>
               </DialogContent>
            </DialogOverlay>
         </Dialog>
      </>
   );
};
