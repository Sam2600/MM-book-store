import {
   Input,
   Button,
   Typography,
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
import { Loader } from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getAllMappedCategories, getNovelsByAuthors, getNovelsByAuthorStatus, novelsByAuthor } from "../states/features/novel/novelSlice";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { scrollToTop } from "../functions/helpers";

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
      reset: reset2,
      control: control2
   } = useForm();

   const [success, setSuccess] = useState(false);
   const [serverError, setServerError] = useState("");
   const [isPopUpOpen, setIsPopUpOpen] = useState(false);
   const [isNovelRegisterSuccess, setIsNovelRegisterSuccess] = useState(false);

   const dispatch = useDispatch();

   const novelByAuthor = useSelector(novelsByAuthor);
   const categories = useSelector(getAllMappedCategories);
   const status = useSelector(getNovelsByAuthorStatus);

   const onSubmit = async (data) => {

      try {

         const novel_name = novelByAuthor?.find(nba => nba.id == data.novel_id)?.title;

         data = {
            ...data,
            novel_name,
         }

         const response = await api.post("/chapters", data);

         console.log("Upload Success:", response.data);

         setServerError("");
         setSuccess(true);

         reset();

      } catch (error) {

         console.error("Server Error:", error);
         setServerError(error?.response?.data?.message || "An error occurred while uploading the chapter.");
         setSuccess(false);
      }

      scrollToTop();
   };

   const onError = (error) => {
      console.log(error);
      scrollToTop();
   }

   const onSubmit2 = async (data) => {

      if (data.cover_image.length) {
         data.cover_image = data.cover_image[0];
      }

      data.categories = data.categories.map(cat => cat.value);
      
      try {

         const response = await api.post("/novels", data, {

            headers: {
               "Content-Type": "multipart/form-data",
            },
         });

         console.log("Upload Success:", response.data);

         setIsPopUpOpen(false);
         setIsNovelRegisterSuccess(true);
         setSuccess(true);
         reset2();

      } catch (error) {
         setSuccess(false);
         setServerError(error?.response?.data?.message || "An error occurred while registering the novel.");
         console.error("Upload Error:", error);
      }
   };

   const onError2 = (error) => {
      console.log(error);
      scrollToTop();
   }

   useEffect(() => {

      dispatch(getNovelsByAuthors());

   }, [isNovelRegisterSuccess])

   const animatedComponents = makeAnimated();

   const customSelectStyles = {
      control: (provided, state) => ({
         ...provided,
         backgroundColor: 'white',
         borderColor: state.isFocused ? '#64748b' : '#94a3b8', // slate-500 for focus, slate-400 for normal
         borderRadius: '0.375rem', // Corresponds to rounded-md
         padding: '0.1rem', // Adjust as needed, react-select has internal padding
         boxShadow: state.isFocused ? '0 0 0 1px #64748b' : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)', // shadow-md, focus ring
         '&:hover': {
            borderColor: '#64748b' // slate-500 for hover
         }
      }),
      input: (provided) => ({
         ...provided,
         // If you need to style the input text itself
      }),
      menu: (provided) => ({
         ...provided,
         borderRadius: '0.375rem',
         boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)', // Corresponds to shadow-lg for dropdown
      }),
      option: (provided, state) => ({
         ...provided,
         backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#eff6ff' : 'white', // Example: blue-500 for selected, blue-50 for focused
         color: state.isSelected ? 'white' : 'black',
         '&:hover': {
            backgroundColor: 'black', // Example: blue-100 for hover
            color: 'white',
         }
      }),
      multiValue: (provided) => ({
         ...provided,
         backgroundColor: '#e0e7ff', // indigo-100 or similar for selected items
      }),
      multiValueLabel: (provided) => ({
         ...provided,
         color: '#3730a3', // indigo-800 or similar
      }),
      multiValueRemove: (provided) => ({
         ...provided,
         color: '#4338ca', // indigo-700 or similar
         '&:hover': {
            backgroundColor: '#black', // indigo-200 or similar
            color: '#white', // indigo-900 or similar
         },
      }),
      // You can add more custom styles for other parts like placeholder, singleValue, etc.
   };

   const content = status == 'pending' ? (
      <Loader />
   ) : (
         <>
            <div className="container my-4 mx-auto px-4 md:px-4">
               <div className="flex flex-col w-11/12 lg:w-6/12 mx-auto">
                  <div className="flex flex-col items-center justify-center gap-4">
                     {/* <div className="flex flex-col sm:flex-row items-center gap-4"> */}
                        <h1 className="text-xl font-semibold border border-slate-400 shadow-lg rounded-md px-4 py-2">
                           Chapter Register
                        </h1>
                     {/* </div> */}
                     {success && <p className="bg-green-500 text-white px-3 py-1 rounded">Upload success!</p>}
                     {serverError && <p className="bg-red-500 text-white px-3 py-1 rounded">{serverError}</p>}
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
                                       novelByAuthor?.length > 0 && (
                                          novelByAuthor?.map(nba => {
                                             return <option key={nba?.id} value={nba?.id}>{nba?.title}</option>
                                          })
                                       )
                                    }
                              </select>
                              <Button onClick={() => setIsPopUpOpen(true)} type="button">
                                 +
                              </Button>
                           </div>
                        </div>

                        <div>
                           <div className="flex flex-row justify-between">
                              <label className="block font-semibold mb-1">Volume title</label>
                              {errors.volume_title && <p className="text-red-500 text-sm">{errors.volume_title.message}</p>}
                           </div>
                           <Input
                              className="w-full bg-white p-2 border border-slate-400 rounded-md shadow-md"
                              placeholder="Volume title"
                              {...register("volume_title", {
                                 //required: "Volume title is required"
                              })}
                           />
                        </div>

                        <div>
                           <div className="flex flex-row justify-between">
                              <label className="block font-semibold mb-1">Volume *</label>
                              {errors.volume_number && <p className="text-red-500 text-sm">{errors.volume_number.message}</p>}
                           </div>
                              <Input
                                 type="number"
                                 className="w-full bg-white p-2 border border-slate-400 rounded-md shadow-md"
                                 {...register("volume_number", {
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
                              <label className="block font-semibold mb-1">Chapter *</label>
                              {errors.volume_number && <p className="text-red-500 text-sm">{errors.volume_number.message}</p>}
                           </div>
                              <Input
                                 type="number"
                                 className="w-full bg-white p-2 border border-slate-400 rounded-md shadow-md"
                                 {...register("chapter_number", {
                                    required: "Chapter is required",
                                       pattern: {
                                          value: /^[0-9]+$/,
                                          message: "Only numeric characters allowed"
                                       }
                                 })}
                           />
                        </div>
                           
                        <div>
                           <div className="flex flex-row justify-between">
                              <label className="block font-semibold mb-1">Title *</label>
                              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                           </div>
                           <Input
                              className="w-full bg-white p-2 border border-slate-400 rounded-md shadow-md"
                              placeholder="Title"
                              {...register("title", {
                                 required: "Chapter title is required"
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
            {/* ✅ MODAL MOVED OUTSIDE */}
            <Dialog open={isPopUpOpen} size="xl">
               <DialogOverlay>
                  <DialogContent className="max-w-2xl">
                     <DialogDismissTrigger
                        onClick={() => {
                           setIsPopUpOpen(false);
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
                              <div className="flex flex-row justify-between">
                                 <label className="block font-semibold mb-1">Author Name *</label>
                                 {errors2.original_author_name && <p className="text-red-500 text-sm">{errors2.original_author_name.message}</p>}
                              </div>
                              <Input
                                 className="w-full bg-white p-2 border border-slate-400 rounded-md shadow-md"
                                 placeholder="Novel title"
                                 {...register2("original_author_name", {
                                    required: "Author name is required"
                                 })}
                              />
                           </div>

                           <div>
                              <div className="flex flex-row justify-between">
                                 <label className="block font-semibold mb-1">Original Name *</label>
                                 {errors2.original_book_name && <p className="text-red-500 text-sm">{errors2.original_book_name.message}</p>}
                              </div>
                              <Input
                                 className="w-full bg-white p-2 border border-slate-400 rounded-md shadow-md"
                                 placeholder="Original book name"
                                 {...register2("original_book_name", {
                                    required: "Original name is required"
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
                           <Controller
                              control={control2}
                              name="categories"
                              rules={{ required: "At least one category is required" }}
                              render={({ field }) => (
                                 <Select
                                    {...field}
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    isMulti
                                    options={categories}
                                    styles={customSelectStyles}
                                 />
                              )}
                           />
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

   return content;
};
