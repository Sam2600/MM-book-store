import {
   Input,
   Button,
   Typography,
   Dialog,
   Card,
   CardBody,
   IconButton,
   Alert,
   DialogOverlay,
   DialogContent,
   DialogDismissTrigger,
   CardFooter,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import {
   Xmark,
   Plus,
   CheckCircle,
   WarningTriangle,
   NavArrowLeft,
} from "iconoir-react";
import { api } from "../axios/axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Loader } from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
   getNovelsByAuthors,
   getNovelsByAuthorStatus,
   novelsByAuthor,
   getAllMappedCategories,
} from "../states/features/novel/novelSlice";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { scrollToTop } from "../functions/helpers";
import { useTranslation } from "react-i18next";
import { LOCALIZE_CONST } from "../consts/Consts";
import { useParams, useNavigate } from "react-router-dom"; // Add this
import { getEditDataByChapterId, getNovelInfoByChapterId } from "../states/features/user/userSlice";

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

   const { t } = useTranslation();

   const { novelId, chapterId } = useParams(); // Get the novel ID and chapter ID from URL if it exists

   const navigate = useNavigate();

   const isEditMode = Boolean(chapterId);

   const [isPopUpOpen, setIsPopUpOpen] = useState(false);
   const [isNovelRegisterSuccess, setIsNovelRegisterSuccess] = useState(false);

   const [feedback, setFeedback] = useState({ type: "", message: "" });

   const dispatch = useDispatch();

   const novelByAuthor = useSelector(novelsByAuthor);
   const categories = useSelector(getAllMappedCategories);
   const status = useSelector(getNovelsByAuthorStatus);
   const editData = useSelector(getNovelInfoByChapterId);

   // Main Form
   const {
      register,
      formState: { errors, isSubmitting },
      handleSubmit,
      reset,
      control,
   } = useForm({
      values: {
         novel_id: novelId,
         volume_title: editData?.volume?.volume_title,
         volume_number: editData?.volume?.volume_number,
         chapter_number: editData?.chapter_number,
         title: editData?.title || "",
         content: editData?.content || "",
      }
   });

   // Modal box form
   const {
      register: register2,
      handleSubmit: handleSubmit2,
      formState: { errors: errors2 },
      reset: reset2,
      control: control2
   } = useForm();

   // const onSubmit = async (data) => {
   //    try {

   //       const novel_name = novelByAuthor?.find(nba => nba.id == data.novel_id)?.title;

   //       await api.post("/chapters", { ...data, novel_name });

   //       setFeedback({ type: "success", message: "Chapter uploaded successfully!" });

   //       reset();
   //    } catch (error) {
   //       setFeedback({
   //          type: "error",
   //          message: error?.response?.data?.message || "An error occurred during upload."
   //       });
   //    }
   //    scrollToTop();
   // };
   
   // 1. Fetch data if in Edit Mode
   useEffect(() => {
      if (isEditMode) {
         const fetchChapter = async () => {
            try {
               dispatch(getEditDataByChapterId({ chapterId: chapterId }));
               // Use reset() from react-hook-form to populate the fields
            } catch (error) {
               setFeedback({ type: "error", message: "Failed to load chapter data." });
            }
         };
         fetchChapter();
      }
   }, [chapterId, isEditMode, reset]);

   // 2. Modified onSubmit to handle both POST and PUT
   const onSubmit = async (data) => {
      try {
         const novel_name = novelByAuthor?.find(nba => nba.id == data.novel_id)?.title;
         
         if (isEditMode) {
            // UPDATE PROCESS
            await api.put(`/chapters/${chapterId}`, { ...data, novel_name });
            setFeedback({ type: "success", message: "Chapter updated successfully!" });
         } else {
            // CREATE PROCESS
            await api.post("/chapters", { ...data, novel_name });
            setFeedback({ type: "success", message: "Chapter uploaded successfully!" });
            reset();
         }
      } catch (error) {
         setFeedback({ 
            type: "error", 
            message: error?.response?.data?.message || "An error occurred." 
         });
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

      data.categories = data.categories.map((cat) => cat.value);

      try {
         await api.post("/novels", data, {
            headers: {
               "Content-Type": "multipart/form-data",
            },
         });
         setIsPopUpOpen(false);
         setIsNovelRegisterSuccess(true);
         // Trigger success feedback for the user
         setFeedback({ type: "success", message: "New novel registered successfully!" });
         reset2();
      } catch (error) {
         setFeedback({ 
            type: "error",
            message: error?.response?.data?.message || "Failed to register novel."
         });
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
         backgroundColor: "white",
         borderColor: state.isFocused ? "#64748b" : "#94a3b8", // slate-500 for focus, slate-400 for normal
         borderRadius: "0.375rem", // Corresponds to rounded-md
         padding: "0.1rem", // Adjust as needed, react-select has internal padding
         boxShadow: state.isFocused
         ? "0 0 0 1px #64748b"
         : "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)", // shadow-md, focus ring
         "&:hover": {
         borderColor: "#64748b", // slate-500 for hover
         },
      }),
      input: (provided) => ({
         ...provided,
         // If you need to style the input text itself
      }),
      menu: (provided) => ({
         ...provided,
         borderRadius: "0.375rem",
         boxShadow:
         "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)", // Corresponds to shadow-lg for dropdown
      }),
      option: (provided, state) => ({
         ...provided,
         backgroundColor: state.isSelected
         ? "#3b82f6"
         : state.isFocused
            ? "#eff6ff"
            : "white", // Example: blue-500 for selected, blue-50 for focused
         color: state.isSelected ? "white" : "black",
         "&:hover": {
         backgroundColor: "black", // Example: blue-100 for hover
         color: "white",
         },
      }),
      multiValue: (provided) => ({
         ...provided,
         backgroundColor: "#e0e7ff", // indigo-100 or similar for selected items
      }),
      multiValueLabel: (provided) => ({
         ...provided,
         color: "#3730a3", // indigo-800 or similar
      }),
      multiValueRemove: (provided) => ({
         ...provided,
         color: "#4338ca", // indigo-700 or similar
         "&:hover": {
         backgroundColor: "#black", // indigo-200 or similar
         color: "#white", // indigo-900 or similar
         },
      }),
      // You can add more custom styles for other parts like placeholder, singleValue, etc.
   };

   const content = status == "pending"
      ? (
         <Loader />
      ) : (
         <div className="min-h-screen bg-gray-50/50 py-10 px-4">
            <div className="max-w-4xl mx-auto">
               {/* Header Section */}
               <div className="mb-8 flex flex-col gap-2">
                  <Typography variant="h3" color="blue-gray" className="font-bold">
                  {t(LOCALIZE_CONST.CHAPTER_REGISTER)}
                  </Typography>
                  <Typography color="gray" className="font-normal">
                  Create and publish a new chapter for your readers.
                  </Typography>
               </div>

               {/* Feedback Alerts */}
               <AnimatePresence>
                  {feedback.message && (
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        exit={{ opacity: 0, scale: 0.95 }} 
                        className="mb-6"
                     >
                        <Alert
                        variant="gradient"
                        color={feedback.type === "success" ? "success" : "red"}
                        icon={feedback.type === "success" ? <CheckCircle className="h-5 w-5" /> : <WarningTriangle className="h-5 w-5" />}
                        onClose={() => setFeedback({ type: "", message: "" })}
                        >
                        {feedback.message}
                        </Alert>
                     </motion.div>
                  )}
               </AnimatePresence>

               <Card className="shadow-sm border border-slate-200">
                  <CardBody>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                     {/* Novel Selection Group */}
                     <div className="grid grid-cols-1 gap-4">
                        <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                           {t(LOCALIZE_CONST.NOVELS)}{" "}
                           <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-2">
                           <select
                              className={`w-full bg-white p-2.5 border rounded-lg transition-all focus:ring-2 focus:ring-blue-500/20 ${errors.novel_id ? "border-red-500" : "border-slate-300"}`}
                              {...register("novel_id", {
                                 required: "Please select a novel",
                              })}
                           >
                              <option value="">{t(LOCALIZE_CONST.PICK)}</option>
                              {novelByAuthor?.map((nba) => (
                              <option key={nba.id} value={nba.id}>
                                 {nba.title}
                              </option>
                              ))}
                           </select>
                           {/* <IconButton
                              variant="gradient"
                              color="blue-gray"
                              onClick={() => setIsPopUpOpen(true)}
                              className="shrink-0"
                              title="Add New Novel"
                           >
                              <Plus strokeWidth={2.5} className="h-5 w-5" />
                           </IconButton> */}
                           <Button onClick={() => setIsPopUpOpen(true)} type="button">
                              +
                           </Button>
                        </div>
                        {errors.novel_id && (
                           <p className="text-red-500 text-xs mt-1">
                              {errors.novel_id.message}
                           </p>
                        )}
                        </div>
                     </div>

                     {/* Volume & Chapter Side-by-Side */}
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                           {t(LOCALIZE_CONST.VOLUME_TITLE)}
                        </label>
                        <Input
                           size="lg"
                           placeholder="e.g. The Beginning of the End"
                           className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                           labelProps={{
                              className: "before:content-none after:content-none",
                           }}
                           {...register("volume_title")}
                        />
                        </div>
                        <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                           {t(LOCALIZE_CONST.VOLUME)} *
                        </label>
                        <Input
                           type="number"
                           size="lg"
                           defaultValue={1}
                           className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                           labelProps={{
                              className: "before:content-none after:content-none",
                           }}
                           {...register("volume_number", { required: true })}
                        />
                        </div>
                     </div>

                     {/* Chapter Number & Title */}
                     <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                           {t(LOCALIZE_CONST.CHAPTER)} *
                        </label>
                        <Input
                           type="number"
                           size="lg"
                           className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                           labelProps={{
                              className: "before:content-none after:content-none",
                           }}
                           {...register("chapter_number", { required: true })}
                        />
                        </div>
                        <div className="md:col-span-3">
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                           {t(LOCALIZE_CONST.TITLE)} *
                        </label>
                        <Input
                           size="lg"
                           placeholder="Chapter Title"
                           className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                           labelProps={{
                              className: "before:content-none after:content-none",
                           }}
                           {...register("title", {
                              required: "Title is required",
                           })}
                        />
                        </div>
                     </div>

                     {/* Content Editor */}
                     <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                        {t(LOCALIZE_CONST.CONTENT)} *
                        </label>
                        <div className="rounded-lg overflow-hidden border border-slate-300">
                        <Controller
                           control={control}
                           name="content"
                           rules={{ required: "Content cannot be empty" }}
                           render={({ field }) => (
                              <ReactQuill
                              {...field}
                              theme="snow"
                              placeholder="Once upon a time..."
                              modules={modules}
                              className="bg-white"
                              />
                           )}
                        />
                        </div>
                        {errors.content && (
                        <p className="text-red-500 text-xs mt-1">
                           {errors.content.message}
                        </p>
                        )}
                     </div>

                     <Button
                        type="submit"
                        size="lg"
                        fullWidth
                        disabled={isSubmitting}
                        className="flex items-center justify-center gap-2"
                     >
                        {isSubmitting && (
                        <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        )}
                        {t(LOCALIZE_CONST.UPLOAD)}
                     </Button>
                  </form>
                  </CardBody>
               </Card>
            </div>
            {/* ✅ MODAL MOVED OUTSIDE */}
            <Dialog
               open={isPopUpOpen}
               handler={() => setIsPopUpOpen(false)}
               size="md"
               className="p-4 overflow-y-auto max-h-[90vh]"
            >
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

                  <form
                     onSubmit={handleSubmit2(onSubmit2, onError2)}
                     className="w-full mx-auto"
                  >
                     <CardBody className="flex flex-col gap-6">
                        <h1 className="text-xl font-semibold text-center">
                        {t(LOCALIZE_CONST.NOVEL_REGISTER)}
                        </h1>

                        <div>
                        <div className="flex flex-row justify-between">
                           <label className="block font-semibold mb-1">
                              {t(LOCALIZE_CONST.TITLE)} *
                           </label>
                           {errors2.title && (
                              <p className="text-red-500 text-sm">
                              {errors2.title.message}
                              </p>
                           )}
                        </div>
                        <Input
                           className="w-full bg-white p-2 border border-slate-400 rounded-md shadow-md"
                           placeholder="Novel title"
                           {...register2("title", {
                              required: "Novel title is required",
                           })}
                        />
                        </div>

                        <div>
                        <div className="flex flex-row justify-between">
                           <label className="block font-semibold mb-1">
                              {t(LOCALIZE_CONST.ORIGINAL_AUTHOR_NAME)} *
                           </label>
                           {errors2.original_author_name && (
                              <p className="text-red-500 text-sm">
                              {errors2.original_author_name.message}
                              </p>
                           )}
                        </div>
                        <Input
                           className="w-full bg-white p-2 border border-slate-400 rounded-md shadow-md"
                           placeholder="Novel title"
                           {...register2("original_author_name", {
                              required: "Author name is required",
                           })}
                        />
                        </div>

                        <div>
                        <div className="flex flex-row justify-between">
                           <label className="block font-semibold mb-1">
                              {t(LOCALIZE_CONST.ORIGINAL_NOVEL_NAME)} *
                           </label>
                           {errors2.original_book_name && (
                              <p className="text-red-500 text-sm">
                              {errors2.original_book_name.message}
                              </p>
                           )}
                        </div>
                        <Input
                           className="w-full bg-white p-2 border border-slate-400 rounded-md shadow-md"
                           placeholder="Original book name"
                           {...register2("original_book_name", {
                              required: "Original name is required",
                           })}
                        />
                        </div>

                        <div>
                        <div>
                           <label className="block font-semibold mb-1">
                              {t(LOCALIZE_CONST.DESCRIPTION)}
                           </label>
                        </div>
                        <Input
                           className="w-full bg-white p-2 border border-slate-400 rounded-md shadow-md"
                           placeholder="Description"
                           {...register2("description")}
                        />
                        </div>

                        <div>
                        <div className="flex flex-row justify-between">
                           <label className="block font-semibold mb-1">
                              {t(LOCALIZE_CONST.CATEGORIES)} *
                           </label>
                           {errors2.categories && (
                              <p className="text-red-500 text-sm">
                              {errors2.categories.message}
                              </p>
                           )}
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
                           <label className="block font-semibold mb-1">
                              {t(LOCALIZE_CONST.COVER_IMAGE)} *
                           </label>
                           {errors2.cover_image && (
                              <p className="text-red-500 text-sm">
                              {errors2.cover_image.message}
                              </p>
                           )}
                        </div>
                        <input
                           type="file"
                           accept="image/*"
                           className="w-full bg-white p-2 border border-slate-400 rounded-md shadow-md"
                           {...register2("cover_image", {
                              required: "Image is required",
                              validate: {
                              size: (files) =>
                                 files?.[0]?.size < 2097152 || "Max 2MB",
                              type: (files) =>
                                 files?.[0]?.type.startsWith("image/") ||
                                 "Must be an image",
                              },
                           })}
                        />
                        </div>
                        <div className="flex flex-row gap-x-3 items-center">
                        <input
                           type="checkbox"
                           className="border border-slate-400"
                           {...register2("status")}
                        />
                        <Typography
                           as="label"
                           htmlFor="checkbox"
                           className="cursor-pointer font-semibold"
                        >
                           {t(LOCALIZE_CONST.ONGOING)}?
                        </Typography>
                        </div>
                     </CardBody>

                     <CardFooter className="pt-0 mt-5">
                        <Button type="submit" isFullWidth={true}>
                        {t(LOCALIZE_CONST.REGISTER)}
                        </Button>
                     </CardFooter>
                  </form>
                  </DialogContent>
               </DialogOverlay>
            </Dialog>
         </div>
   );

   return content;
};
