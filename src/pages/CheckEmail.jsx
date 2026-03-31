import { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Check } from "iconoir-react";
import { Typography, Button } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { LOCALIZE_CONST, ROUTES } from "../consts/Consts";
import { api } from "../axios/axios";
import { scrollToTop } from "../functions/helpers";

const RESEND_COOLDOWN = 60;

export const CheckEmail = () => {
   const { t } = useTranslation();
   const { state } = useLocation();
   const email = state?.email ?? "";

   const [cooldown, setCooldown] = useState(0);
   const [resendSuccess, setResendSuccess] = useState(false);
   const [resendError, setResendError] = useState("");
   const [isSending, setIsSending] = useState(false);

   useEffect(() => {
      scrollToTop();
   }, []);

   useEffect(() => {
      if (cooldown <= 0) return;
      const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
   }, [cooldown]);

   const handleResend = async () => {
      if (cooldown > 0 || isSending) return;

      setIsSending(true);
      setResendError("");
      setResendSuccess(false);

      try {
         await api.post("/resend-verification", { email });
         setResendSuccess(true);
         setCooldown(RESEND_COOLDOWN);
      } catch {
         setResendError("Failed to resend. Please try again.");
      } finally {
         setIsSending(false);
      }
   };

   return (
      <div className="min-h-screen bg-slate-50/50 flex items-center justify-center py-20 px-4">
         <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
         >
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-slate-100 p-10 text-center">

               {/* Icon */}
               <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
                     <Mail className="w-10 h-10 text-blue-500" strokeWidth={1.5} />
                  </div>
               </div>

               {/* Heading */}
               <Typography className="text-2xl font-black text-slate-900 font-poppins uppercase tracking-tight mb-3">
                  {t(LOCALIZE_CONST.CHECK_YOUR_EMAIL)}
               </Typography>

               {/* Description */}
               <Typography className="text-sm text-slate-500 font-medium leading-relaxed mb-2">
                  {t(LOCALIZE_CONST.VERIFICATION_EMAIL_SENT)}
               </Typography>

               {email && (
                  <Typography className="text-sm font-bold text-slate-700 mb-6 break-all">
                     {email}
                  </Typography>
               )}

               <Typography className="text-xs text-slate-400 mb-8">
                  {t(LOCALIZE_CONST.CHECK_SPAM_FOLDER)}
               </Typography>

               {/* Feedback messages */}
               {resendSuccess && (
                  <div className="flex items-center gap-2 justify-center bg-green-50 border border-green-200 rounded-xl p-3 mb-4 animate-in fade-in duration-300">
                     <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                     <p className="text-xs font-bold text-green-600">
                        {t(LOCALIZE_CONST.RESEND_EMAIL_SUCCESS)}
                     </p>
                  </div>
               )}

               {resendError && (
                  <p className="text-xs font-bold text-red-500 bg-red-50 border border-red-200 rounded-xl p-3 mb-4 animate-in fade-in duration-300">
                     {resendError}
                  </p>
               )}

               {/* Resend button */}
               <Button
                  onClick={handleResend}
                  disabled={cooldown > 0 || isSending}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-sm uppercase tracking-widest shadow-lg shadow-blue-500/20 transition-all duration-300 disabled:bg-slate-300 disabled:cursor-not-allowed mb-4"
               >
                  {cooldown > 0
                     ? `${t(LOCALIZE_CONST.RESEND_IN)} ${cooldown}s`
                     : t(LOCALIZE_CONST.RESEND_EMAIL)}
               </Button>

               {/* Back to login */}
               <NavLink to={ROUTES.SIGN_IN}>
                  <Typography className="text-sm text-blue-600 font-bold hover:text-blue-700 transition-colors cursor-pointer">
                     ← {t(LOCALIZE_CONST.GO_TO_LOGIN)}
                  </Typography>
               </NavLink>

            </div>
         </motion.div>
      </div>
   );
};
