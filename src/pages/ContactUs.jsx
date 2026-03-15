import React, { useEffect } from "react";
import { Typography, Card, Button, Input, Textarea } from "@material-tailwind/react";
import { Mail, Send, ChatBubble, SendMail, MapsArrow, Discord } from "iconoir-react";
import { scrollToTop } from "../functions/helpers";

export const ContactUs = () => {

   useEffect(() => scrollToTop())

   return (
      <div className="min-h-screen bg-slate-50/50 pb-20 pt-10 font-poppins">
         <div className="container mx-auto px-4 max-w-6xl">
            
            {/* --- Header Section --- */}
            <div className="text-center mb-16">
               <Typography className="text-blue-600 font-black uppercase tracking-[0.3em] text-[11px] mb-3">
                  Get In Touch
               </Typography>
               <Typography className="text-4xl lg:text-5xl font-black text-slate-900 mb-4">
                  Let’s Connect.
               </Typography>
               <Typography className="text-slate-500 max-w-xl mx-auto font-medium">
                  Have a novel suggestion or found a translation typo? Our team is always ready to listen to our readers.
               </Typography>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-start">
               
               {/* --- Left Side: Contact Info --- */}
               <div className="lg:col-span-1 space-y-6">
                  <ContactMethod 
                     icon={<Mail className="text-blue-600" />}
                     title="Email Us"
                     value="support@mmbookstore.com"
                     desc="For official inquiries and support."
                  />
                  <ContactMethod 
                     icon={<Discord className="text-indigo-500" />}
                     title="Discord Community"
                     value="Join our Server"
                     desc="Chat directly with the translators."
                     isLink
                  />
                  <Card className="p-8 rounded-[2rem] bg-slate-900 text-white shadow-2xl shadow-slate-900/20 overflow-hidden relative">
                     <ChatBubble className="absolute -bottom-4 -right-4 w-32 h-32 text-white/5 rotate-12" />
                     <Typography className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-2">
                        Fast Response
                     </Typography>
                     <Typography variant="h5" className="font-black mb-4">
                        Novel Requests?
                     </Typography>
                     <Typography className="text-slate-400 text-sm leading-relaxed mb-6">
                        Looking for a specific Chinese novel to be translated? Send us the title and the English source!
                     </Typography>
                     <Button size="sm" className="bg-white text-slate-900 rounded-xl font-black tracking-widest uppercase py-3">
                        Request Now
                     </Button>
                  </Card>
               </div>

               {/* --- Right Side: Contact Form --- */}
               <Card className="lg:col-span-2 p-8 lg:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm bg-white">
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2 col-span-1">
                        <Typography className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">
                           Your Name
                        </Typography>
                        <Input 
                           size="lg"
                           placeholder="John Doe"
                           className="!border-t-blue-gray-200 focus:!border-blue-500 rounded-2xl bg-slate-50/50"
                           labelprops={{ className: "before:content-none after:content-none" }}
                        />
                     </div>
                     <div className="space-y-2 col-span-1">
                        <Typography className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">
                           Email Address
                        </Typography>
                        <Input 
                           size="lg"
                           placeholder="name@email.com"
                           className="!border-t-blue-gray-200 focus:!border-blue-500 rounded-2xl bg-slate-50/50"
                           labelprops={{ className: "before:content-none after:content-none" }}
                        />
                     </div>
                     <div className="space-y-2 col-span-full">
                        <Typography className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">
                           Subject
                        </Typography>
                        <Input 
                           size="lg"
                           placeholder="Translation Error / Novel Request / Feedback"
                           className="!border-t-blue-gray-200 focus:!border-blue-500 rounded-2xl bg-slate-50/50"
                           labelprops={{ className: "before:content-none after:content-none" }}
                        />
                     </div>
                     <div className="space-y-2 col-span-full">
                        <Typography className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">
                           Your Message
                        </Typography>
                        <Textarea 
                           rows={6}
                           placeholder="Tell us what's on your mind..."
                           className="!border-t-blue-gray-200 focus:!border-blue-500 rounded-2xl bg-slate-50/50"
                           labelprops={{ className: "before:content-none after:content-none" }}
                        />
                     </div>
                     <div className="col-span-full pt-4">
                        <Button 
                           fullWidth 
                           size="lg"
                           className="flex items-center justify-center gap-3 rounded-2xl bg-slate-900 py-4 font-black uppercase tracking-[0.2em] shadow-none hover:bg-blue-600 transition-all hover:shadow-xl hover:shadow-blue-500/20 active:scale-[0.98]"
                        >
                           <Send className="w-5 h-5" />
                           Send Message
                        </Button>
                     </div>
                  </form>
               </Card>
            </div>
         </div>
      </div>
   );
};

/* --- Sub-Component --- */
const ContactMethod = ({ icon, title, value, desc, isLink }) => (
   <Card className="p-6 rounded-[2rem] border border-slate-100 shadow-none hover:shadow-md transition-all duration-300">
      <div className="flex items-start gap-4">
         <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0">
            {React.cloneElement(icon, { className: "w-6 h-6 " + icon.props.className })}
         </div>
         <div className="min-w-0">
            <Typography className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
               {title}
            </Typography>
            <Typography className={`text-[14px] font-black leading-tight mb-1 truncate ${isLink ? 'text-blue-600' : 'text-slate-900'}`}>
               {value}
            </Typography>
            <Typography className="text-[12px] text-slate-500 font-medium">
               {desc}
            </Typography>
         </div>
      </div>
   </Card>
);