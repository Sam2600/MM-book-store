import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';
import { api } from '../axios/axios';
import { ROUTES } from '../consts/Consts';

export const ResetPassword = () => {
   const [searchParams] = useSearchParams();
   const navigate = useNavigate();

   const token = searchParams.get('token') ?? '';
   const email = searchParams.get('email') ?? '';

   const { register, handleSubmit, getValues, formState: { errors, isSubmitting } } = useForm();
   const [serverError, setServerError] = useState('');

   // Invalid link — token or email missing from URL
   if (!token || !email) {
      return (
         <div className="container my-10 mx-auto px-4 flex justify-center">
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-slate-100 text-center max-w-md w-full">
               <Typography className="text-xl font-black text-slate-900 mb-2">Invalid Link</Typography>
               <Typography className="text-sm text-slate-500 font-medium mb-6">
                  This password reset link is invalid or incomplete.
               </Typography>
               <NavLink to={ROUTES.FORGOT_PASSWORD} className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
                  Request a new link
               </NavLink>
            </div>
         </div>
      );
   }

   const onSubmit = async (data) => {
      setServerError('');
      try {
         await api.post('/reset-password', {
            token,
            email,
            password: data.password,
            password_confirmation: data.password_confirmation,
         });
         navigate(ROUTES.SIGN_IN, { state: { resetSuccess: true } });
      } catch (err) {
         const msg = err.response?.data?.message;
         setServerError(typeof msg === 'string' ? msg : 'Something went wrong. Please try again.');
      }
   };

   return (
      <div className="container my-10 mx-auto px-4">
         <div className="flex justify-center">
            <div className="w-full max-w-md">
               <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-slate-100">

                  <div className="mb-8 text-center">
                     <Typography className="text-2xl font-black text-slate-900 font-poppins uppercase tracking-tight">
                        Reset Password
                     </Typography>
                     <Typography className="text-sm text-slate-500 font-medium mt-1">
                        Choose a new password for <span className="font-bold text-slate-700">{email}</span>
                     </Typography>
                  </div>

                  {serverError && (
                     <p className="text-sm font-bold text-red-600 bg-red-50 border border-red-200 p-4 rounded-xl text-center mb-5">
                        {serverError}{' '}
                        {serverError.toLowerCase().includes('expired') && (
                           <NavLink to={ROUTES.FORGOT_PASSWORD} className="underline text-red-700">
                              Request a new link
                           </NavLink>
                        )}
                     </p>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="w-full">

                     <div className="mb-5">
                        <div className="flex items-center justify-between mb-1.5">
                           <label className="text-xs font-bold uppercase tracking-wider text-slate-700 ml-1" htmlFor="rp_password">
                              New Password <span className="text-red-500">*</span>
                           </label>
                           <p className="text-[10px] font-bold text-red-500 animate-pulse">{errors?.password?.message}</p>
                        </div>
                        <input
                           id="rp_password"
                           type="password"
                           placeholder="••••••••"
                           className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none"
                           {...register('password', {
                              required: 'Password is required',
                              validate: {
                                 minLengthAndNumber: (v) => {
                                    if (v.length < 5) return 'Must be at least 5 characters';
                                    if (!/\d/.test(v)) return 'Must include a number';
                                    return true;
                                 },
                              },
                           })}
                        />
                     </div>

                     <div className="mb-8">
                        <div className="flex items-center justify-between mb-1.5">
                           <label className="text-xs font-bold uppercase tracking-wider text-slate-700 ml-1" htmlFor="rp_confirm">
                              Confirm Password <span className="text-red-500">*</span>
                           </label>
                           <p className="text-[10px] font-bold text-red-500 animate-pulse">{errors?.password_confirmation?.message}</p>
                        </div>
                        <input
                           id="rp_confirm"
                           type="password"
                           placeholder="••••••••"
                           className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none"
                           {...register('password_confirmation', {
                              required: 'Please confirm your password',
                              validate: (v) => v === getValues('password') || 'Passwords must match',
                           })}
                        />
                     </div>

                     <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-sm uppercase tracking-widest shadow-lg shadow-blue-500/20 transition-all duration-300 active:scale-[0.98] disabled:bg-slate-300 disabled:cursor-not-allowed"
                     >
                        {isSubmitting ? 'Resetting...' : 'Reset Password'}
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
};
