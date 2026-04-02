import {
   Dialog,
   IconButton,
   Alert,
   DialogOverlay,
   DialogContent,
   DialogDismissTrigger,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import {
   Xmark,
   Plus,
   CheckCircle,
   WarningTriangle,
   BookSolid,
   Page,
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
import { useParams, useNavigate } from "react-router-dom";
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

// Section divider with label
const SectionDivider = ({ label }) => (
   <div className="flex items-center gap-3 my-2">
      <div className="h-px flex-1 bg-slate-100" />
      <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 px-1">
         {label}
      </span>
      <div className="h-px flex-1 bg-slate-100" />
   </div>
);

// Field label row with inline error
const FieldLabel = ({ label, error, required, htmlFor }) => (
   <div className="flex items-center justify-between mb-1.5">
      <label
         htmlFor={htmlFor}
         className="text-xs font-bold uppercase tracking-wider text-slate-700 ml-0.5"
      >
         {label}{" "}
         {required && <span className="text-red-500">*</span>}
      </label>
      {error && (
         <span className="text-[10px] font-bold text-red-500 animate-pulse">
            {error}
         </span>
      )}
   </div>
);

// Reusable styled input class
const inputCls = (hasError) =>
   `w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
      hasError
         ? "border-red-300 bg-red-50/40 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
         : "border-slate-200 bg-slate-50/60 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
   }`;

export const Upload = () => {

   const { t } = useTranslation();

   const { novelId, chapterId } = useParams(); // Get the novel ID and chapter ID from URL if it exists

   const navigate = useNavigate();

   const isEditMode = Boolean(chapterId);

   const [isPopUpOpen, setIsPopUpOpen] = useState(false);
   const [isNovelRegisterSuccess, setIsNovelRegisterSuccess] = useState(false);
   const [coverPreview, setCoverPreview] = useState(null);

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
         volume_title: isEditMode ? editData?.volume?.volume_title : "",
         volume_number: isEditMode ? editData?.volume?.volume_number : 1,
         chapter_number: isEditMode ? editData?.chapter_number : 1,
         title: isEditMode ? editData?.title || "" : "",
         content: isEditMode ? editData?.content || "" : "",
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
         scrollToTop();
      } catch (error) {
         setFeedback({ 
            type: "error", 
            message: error?.response?.data?.message || "An error occurred." 
         });
      }
   };

   const onError = (error) => {
      console.log(error);
      setTimeout(() => {
         scrollToTop();
      }, 100);   
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
         setCoverPreview(null);
         scrollToTop();
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
         backgroundColor: state.isFocused ? "white" : "#f8fafc",
         borderColor: state.isFocused ? "#3b82f6" : "#e2e8f0",
         borderRadius: "0.75rem",
         padding: "0.15rem",
         boxShadow: state.isFocused
            ? "0 0 0 4px rgba(59,130,246,0.1)"
            : "none",
         "&:hover": {
            borderColor: "#3b82f6",
         },
         transition: "all 0.2s",
      }),
      input: (provided) => ({
         ...provided,
      }),
      menu: (provided) => ({
         ...provided,
         borderRadius: "0.75rem",
         boxShadow:
            "0 10px 25px -5px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
      }),
      option: (provided, state) => ({
         ...provided,
         backgroundColor: state.isSelected
            ? "#3b82f6"
            : state.isFocused
            ? "#eff6ff"
            : "white",
         color: state.isSelected ? "white" : "#1e293b",
         borderRadius: "0.375rem",
         margin: "2px 4px",
         width: "calc(100% - 8px)",
      }),
      multiValue: (provided) => ({
         ...provided,
         backgroundColor: "#e0e7ff",
         borderRadius: "0.375rem",
      }),
      multiValueLabel: (provided) => ({
         ...provided,
         color: "#3730a3",
      }),
      multiValueRemove: (provided) => ({
         ...provided,
         color: "#4338ca",
         "&:hover": {
            backgroundColor: "#c7d2fe",
            color: "#1e1b4b",
         },
      }),
   };

   if (status === "pending") return <Loader />;

   return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50 py-12 px-4">
         <div className="max-w-4xl mx-auto">

            {/* ── Page Header ── */}
            <motion.div
               initial={{ opacity: 0, y: -16 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.4 }}
               className="mb-8 text-center"
            >
               <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-900 text-white mb-4 shadow-lg shadow-slate-900/25">
                  <BookSolid className="w-7 h-7" />
               </div>

               <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                  {isEditMode ? "Edit Chapter" : t(LOCALIZE_CONST.CHAPTER_REGISTER)}
               </h1>
               <p className="text-sm text-slate-500 font-medium mt-1">
                  {isEditMode
                     ? "Update your chapter content and details below."
                     : "Create and publish a new chapter for your readers."}
               </p>

               {isEditMode && (
                  <span className="inline-block mt-3 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
                     Edit Mode
                  </span>
               )}
            </motion.div>

            {/* ── Feedback Alerts ── */}
            <AnimatePresence>
               {feedback.message && (
                  <motion.div
                     initial={{ opacity: 0, y: -10, scale: 0.97 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.97 }}
                     className="mb-6"
                  >
                     <Alert
                        open={!!feedback.message}
                        onOpenChange={(open) => {
                           if (!open) setFeedback({ type: "", message: "" });
                        }}
                        variant="gradient"
                        color={feedback.type === "success" ? "success" : "error"}
                     >
                        <Alert.Icon>
                           {feedback.type === "success" ? (
                              <CheckCircle className="h-5 w-5" />
                           ) : (
                              <WarningTriangle className="h-5 w-5" />
                           )}
                        </Alert.Icon>
                        <Alert.Content>{feedback.message}</Alert.Content>
                        <Alert.DismissTrigger />
                     </Alert>
                  </motion.div>
               )}
            </AnimatePresence>

            {/* ── Main Form Card ── */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.4, delay: 0.08 }}
               className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-slate-100 p-8"
            >
               <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">

                  {/* ── Novel Selection ── */}
                  <SectionDivider label="Novel" />

                  <div>
                     <FieldLabel
                        label={t(LOCALIZE_CONST.NOVELS)}
                        error={errors.novel_id?.message}
                        required
                     />
                     <div className="flex gap-2">
                        <select
                           className={inputCls(errors.novel_id) + " flex-1 appearance-none cursor-pointer"}
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
                        <button
                           type="button"
                           onClick={() => setIsPopUpOpen(true)}
                           title="Register New Novel"
                           className="shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-slate-900 hover:bg-blue-600 text-white shadow-lg shadow-slate-900/20 transition-all duration-200 active:scale-95"
                        >
                           <Plus strokeWidth={2.5} className="w-5 h-5" />
                        </button>
                     </div>
                  </div>

                  {/* ── Volume & Chapter ── */}
                  <SectionDivider label="Volume & Chapter" />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div className="md:col-span-2">
                        <FieldLabel label={t(LOCALIZE_CONST.VOLUME_TITLE)} />
                        <input
                           className={inputCls(false)}
                           placeholder="e.g. The Beginning of the End"
                           {...register("volume_title")}
                        />
                     </div>
                     <div>
                        <FieldLabel label={t(LOCALIZE_CONST.VOLUME)} required />
                        <input
                           type="number"
                           className={inputCls(errors.volume_number)}
                           defaultValue={1}
                           {...register("volume_number", { required: true })}
                        />
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                     <div>
                        <FieldLabel label={t(LOCALIZE_CONST.CHAPTER)} required />
                        <input
                           type="number"
                           className={inputCls(errors.chapter_number)}
                           {...register("chapter_number", { required: true })}
                        />
                     </div>
                     <div className="md:col-span-3">
                        <FieldLabel
                           label={t(LOCALIZE_CONST.TITLE)}
                           error={errors.title?.message}
                           required
                        />
                        <input
                           className={inputCls(errors.title)}
                           placeholder="Chapter Title"
                           {...register("title", {
                              required: "Title is required",
                           })}
                        />
                     </div>
                  </div>

                  {/* ── Content Editor ── */}
                  <SectionDivider label="Content" />

                  <div>
                     <FieldLabel
                        label={t(LOCALIZE_CONST.CONTENT)}
                        error={errors.content?.message}
                        required
                     />
                     <div className={`rounded-[2rem] overflow-hidden border-2 transition-all ${
                        errors.content 
                           ? "border-red-300 bg-red-50/20 shadow-[0_0_0_4px_rgba(239,68,68,0.1)]" 
                           : "border-slate-100 bg-white shadow-sm focus-within:border-blue-500/50 focus-within:ring-4 focus-within:ring-blue-500/10"
                     }`}>
                        <Controller
                           control={control}
                           name="content"
                           rules={{ required: "Content cannot be empty" }}
                           render={({ field }) => (
                              <ReactQuill
                                 {...field}
                                 theme="snow"
                                 onChange={(content) => field.onChange(content === '<p><br></p>' ? '' : content)}
                                 placeholder="Once upon a time..."
                                 modules={modules}
                                 className="ql-custom-editor" 
                              />
                           )}
                        />
                     </div>
                  </div>

                  {/* ── Submit Button ── */}
                  <button
                     type="submit"
                     disabled={isSubmitting}
                     className="w-full py-4 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-sm uppercase tracking-widest shadow-lg shadow-blue-500/20 transition-all duration-300 active:scale-[0.98] disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                     {isSubmitting && (
                        <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                     )}
                     {t(LOCALIZE_CONST.UPLOAD)}
                  </button>

               </form>
            </motion.div>
         </div>

         {/* ── Novel Register Modal ── */}
         <Dialog
            open={isPopUpOpen}
            handler={() => setIsPopUpOpen(false)}
            size="md"
         >
            <DialogOverlay>
               <DialogContent className="max-w-2xl rounded-3xl overflow-y-auto max-h-[90vh]">
                  <DialogDismissTrigger
                     onClick={() => {
                        setIsPopUpOpen(false);
                        reset2();
                        setCoverPreview(null);
                     }}
                     as={IconButton}
                     size="sm"
                     variant="ghost"
                     className="absolute right-3 top-3 z-10"
                  >
                     <Xmark className="h-5 w-5" />
                  </DialogDismissTrigger>

                  <form onSubmit={handleSubmit2(onSubmit2, onError2)}>
                     <div className="px-8 pt-8 pb-3">

                        {/* Modal Header */}
                        <div className="text-center mb-6">
                           <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-900 text-white mb-3 shadow-lg shadow-slate-900/25">
                              <Plus strokeWidth={2.5} className="w-6 h-6" />
                           </div>
                           <h2 className="text-xl font-black text-slate-900 tracking-tight">
                              {t(LOCALIZE_CONST.NOVEL_REGISTER)}
                           </h2>
                           <p className="text-sm text-slate-500 font-medium mt-1">
                              Fill in the details to register your novel.
                           </p>
                        </div>

                        <div className="space-y-4">

                           <div>
                              <FieldLabel
                                 label={t(LOCALIZE_CONST.TITLE)}
                                 error={errors2.title?.message}
                                 required
                              />
                              <input
                                 className={inputCls(errors2.title)}
                                 placeholder="Novel title"
                                 {...register2("title", {
                                    required: "Novel title is required",
                                 })}
                              />
                           </div>

                           <div>
                              <FieldLabel
                                 label={t(LOCALIZE_CONST.ORIGINAL_AUTHOR_NAME)}
                                 error={errors2.original_author_name?.message}
                                 required
                              />
                              <input
                                 className={inputCls(errors2.original_author_name)}
                                 placeholder="Original author name"
                                 {...register2("original_author_name", {
                                    required: "Author name is required",
                                 })}
                              />
                           </div>

                           <div>
                              <FieldLabel
                                 label={t(LOCALIZE_CONST.ORIGINAL_NOVEL_NAME)}
                                 error={errors2.original_book_name?.message}
                                 required
                              />
                              <input
                                 className={inputCls(errors2.original_book_name)}
                                 placeholder="Original book name"
                                 {...register2("original_book_name", {
                                    required: "Original name is required",
                                 })}
                              />
                           </div>

                           <div>
                              <FieldLabel label={t(LOCALIZE_CONST.DESCRIPTION)} />
                              <input
                                 className={inputCls(false)}
                                 placeholder="Short description (optional)"
                                 {...register2("description")}
                              />
                           </div>

                           <div>
                              <FieldLabel
                                 label={t(LOCALIZE_CONST.CATEGORIES)}
                                 error={errors2.categories?.message}
                                 required
                              />
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
                              <FieldLabel
                                 label={t(LOCALIZE_CONST.COVER_IMAGE)}
                                 error={errors2.cover_image?.message}
                                 required
                              />
                              <label className={`relative flex items-center justify-center w-full rounded-xl cursor-pointer transition-all duration-200 group overflow-hidden border-2 border-dashed ${coverPreview ? "h-48 border-green-400 bg-green-50/30" : "h-28 border-slate-200 bg-slate-50/60 hover:bg-blue-50 hover:border-blue-400"}`}>
                                 {coverPreview ? (
                                    <div className="relative w-full h-full pointer-events-none">
                                       <img
                                          src={coverPreview}
                                          alt="Cover preview"
                                          className="w-full h-full object-contain"
                                       />
                                       <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                          <Page className="w-6 h-6 text-white mb-1" />
                                          <span className="text-white text-xs font-semibold">Click to change</span>
                                       </div>
                                    </div>
                                 ) : (
                                    <div className="flex flex-col items-center gap-1 pointer-events-none text-slate-400 group-hover:text-blue-500 transition-colors">
                                       <Page className="w-7 h-7" />
                                       <span className="text-xs font-semibold">Click to upload cover image</span>
                                       <span className="text-[10px] font-medium">PNG, JPG — max 2 MB</span>
                                    </div>
                                 )}
                                 <input
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    {...register2("cover_image", {
                                       required: "Image is required",
                                       validate: {
                                          size: (files) =>
                                             files?.[0]?.size < 2097152 || "Max 2MB",
                                          type: (files) =>
                                             files?.[0]?.type.startsWith("image/") ||
                                             "Must be an image",
                                       },
                                       onChange: (e) => {
                                          const file = e.target.files?.[0];
                                          if (file && file.type.startsWith("image/")) {
                                             const url = URL.createObjectURL(file);
                                             setCoverPreview(url);
                                          }
                                       },
                                    })}
                                 />
                              </label>
                           </div>

                           <div className="flex items-center gap-3 py-1">
                              <input
                                 type="checkbox"
                                 id="status_checkbox"
                                 className="w-4 h-4 rounded border-slate-300 text-blue-600 cursor-pointer accent-slate-900"
                                 {...register2("status")}
                              />
                              <label
                                 htmlFor="status_checkbox"
                                 className="text-sm font-semibold text-slate-700 cursor-pointer"
                              >
                                 {t(LOCALIZE_CONST.ONGOING)}?
                              </label>
                           </div>

                        </div>
                     </div>

                     <div className="px-8 pb-8 pt-3">
                        <button
                           type="submit"
                           className="w-full py-4 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-sm uppercase tracking-widest shadow-lg shadow-blue-500/20 transition-all duration-300 active:scale-[0.98]"
                        >
                           {t(LOCALIZE_CONST.REGISTER)}
                        </button>
                     </div>
                  </form>

               </DialogContent>
            </DialogOverlay>
         </Dialog>

      </div>
   );
};
