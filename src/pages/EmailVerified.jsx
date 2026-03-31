import { useSearchParams, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, WarningCircle, XmarkCircle } from "iconoir-react";
import { Typography, Button } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { LOCALIZE_CONST, ROUTES } from "../consts/Consts";
import { scrollToTop } from "../functions/helpers";

const STATUS = {
   SUCCESS: "1",
   EXPIRED: "expired",
   INVALID: "invalid",
   ERROR: "error",
};

const configs = {
   [STATUS.SUCCESS]: {
      icon: <CheckCircle className="w-12 h-12 text-green-500" strokeWidth={1.5} />,
      bg: "bg-green-50",
      titleKey: LOCALIZE_CONST.EMAIL_VERIFIED_SUCCESS,
      description: "Your account is now active. You can sign in and start reading.",
   },
   [STATUS.EXPIRED]: {
      icon: <WarningCircle className="w-12 h-12 text-amber-500" strokeWidth={1.5} />,
      bg: "bg-amber-50",
      titleKey: LOCALIZE_CONST.EMAIL_VERIFIED_EXPIRED,
      description: "Your verification link has expired (24 hours). Please request a new one from the login page.",
   },
   [STATUS.INVALID]: {
      icon: <XmarkCircle className="w-12 h-12 text-red-500" strokeWidth={1.5} />,
      bg: "bg-red-50",
      titleKey: LOCALIZE_CONST.EMAIL_VERIFIED_INVALID,
      description: "This verification link is not valid. It may have already been used.",
   },
   [STATUS.ERROR]: {
      icon: <XmarkCircle className="w-12 h-12 text-red-500" strokeWidth={1.5} />,
      bg: "bg-red-50",
      titleKey: LOCALIZE_CONST.EMAIL_VERIFIED_INVALID,
      description: "Something went wrong. Please try again or contact support.",
   },
};

export const EmailVerified = () => {
   const { t } = useTranslation();
   const [searchParams] = useSearchParams();
   const verified = searchParams.get("verified");

   useEffect(() => {
      scrollToTop();
   }, []);

   const config = configs[verified] ?? configs[STATUS.INVALID];

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
                  <div className={`w-20 h-20 rounded-full ${config.bg} flex items-center justify-center`}>
                     {config.icon}
                  </div>
               </div>

               {/* Title */}
               <Typography className="text-2xl font-black text-slate-900 font-poppins uppercase tracking-tight mb-3">
                  {t(config.titleKey)}
               </Typography>

               {/* Description */}
               <Typography className="text-sm text-slate-500 font-medium leading-relaxed mb-8">
                  {config.description}
               </Typography>

               {/* CTA */}
               <NavLink to={ROUTES.SIGN_IN}>
                  <Button className="w-full py-3 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-sm uppercase tracking-widest shadow-lg shadow-blue-500/20 transition-all duration-300">
                     {t(LOCALIZE_CONST.GO_TO_LOGIN)}
                  </Button>
               </NavLink>

            </div>
         </motion.div>
      </div>
   );
};
