import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';
import { api } from '../axios/axios';
import { ROUTES } from '../consts/Consts';

export const ForgotPassword = () => {
   const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
   const [submitted, setSubmitted] = useState(false);
   const [serverError, setServerError] = useState('');

   const onSubmit = async (data) => {
      setServerError('');
      try {
         await api.post('/forgot-password', data);
         setSubmitted(true);
      } catch (err) {
         const msg = err.response?.data?.message;
         setServerError(typeof msg === 'string' ? msg : 'Something went wrong. Please try again.');
      }
   };

   return (
      <div className="container my-10 mx-auto px-4">
         <div className="flex justify-center">
            <div className="w-full max-w-md">

               {submitted ? (
                  <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-slate-100 text-center">
                     <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-blue-600">
                           <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                           <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                        </svg>
                     </div>
                     <Typography className="text-xl font-black text-slate-900 mb-2">Check your email</Typography>
                     <Typography className="text-sm text-slate-500 font-medium leading-relaxed">
                        If that email is registered, we've sent a password reset link. Check your inbox and spam folder.
                     </Typography>
                     <NavLink
                        to={ROUTES.SIGN_IN}
                        className="mt-6 inline-block text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
                     >
                        ← Back to login
                     </NavLink>
                  </div>
               ) : (
                  <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-slate-100">
                     <div className="mb-8 text-center">
                        <Typography className="text-2xl font-black text-slate-900 font-poppins uppercase tracking-tight">
                           Forgot Password
                        </Typography>
                        <Typography className="text-sm text-slate-500 font-medium mt-1">
                           Enter your email and we'll send you a reset link.
                        </Typography>
                     </div>

                     {serverError && (
                        <p className="text-sm font-bold text-red-600 bg-red-50 border border-red-200 p-4 rounded-xl text-center mb-5">
                           {serverError}
                        </p>
                     )}

                     <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                        <div className="mb-6">
                           <div className="flex items-center justify-between mb-1.5">
                              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 ml-1" htmlFor="fp_email">
                                 Email <span className="text-red-500">*</span>
                              </label>
                              <p className="text-[10px] font-bold text-red-500 animate-pulse">{errors?.email?.message}</p>
                           </div>
                           <input
                              id="fp_email"
                              type="text"
                              placeholder="example@mail.com"
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none"
                              {...register('email', {
                                 required: 'Email is required',
                                 pattern: {
                                    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                    message: 'Invalid email format',
                                 },
                              })}
                           />
                        </div>

                        <button
                           type="submit"
                           disabled={isSubmitting}
                           className="w-full py-4 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-sm uppercase tracking-widest shadow-lg shadow-blue-500/20 transition-all duration-300 active:scale-[0.98] disabled:bg-slate-300 disabled:cursor-not-allowed"
                        >
                           {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                        </button>

                        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                           <p className="text-sm text-slate-500 font-medium">
                              Remember your password?{' '}
                              <NavLink
                                 to={ROUTES.SIGN_IN}
                                 className="text-blue-600 font-bold hover:text-blue-700 transition-colors"
                              >
                                 Login here
                              </NavLink>
                           </p>
                        </div>
                     </form>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};
