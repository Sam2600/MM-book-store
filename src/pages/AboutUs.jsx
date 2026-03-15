import { Typography, Card, Button } from "@material-tailwind/react";
import { Language, Community, Group, Star } from "iconoir-react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../consts/Consts";
import { scrollToTop } from "../functions/helpers";
import { useEffect } from "react";

export const AboutUs = () => {

   useEffect(() => scrollToTop());
   
   return (
      <div className="min-h-screen bg-slate-50/50 pb-20 pt-10">
         <div className="container mx-auto px-4 max-w-5xl">
            
            {/* --- Hero Section --- */}
            <div className="text-center mb-16">
               <Typography className="text-blue-600 font-black uppercase tracking-[0.2em] text-[12px] mb-4">
                  Our Mission
               </Typography>
               <Typography className="text-4xl lg:text-5xl font-black text-slate-900 font-poppins mb-6 leading-tight">
                  Bringing the World’s Best <br /> 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-400">
                     Stories to Myanmar.
                  </span>
               </Typography>
               <Typography className="text-slate-500 max-w-2xl mx-auto text-md font-medium leading-relaxed">
                  We are a dedicated team of translators passionate about Chinese web novels. 
                  By bridging the gap between English-translated masterpieces and the Burmese language, 
                  we provide our readers with an immersive and authentic reading experience.
               </Typography>
            </div>

            {/* --- Core Values Grid --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
               <ValueCard 
                  icon={<Language className="w-8 h-8 text-blue-500" />}
                  title="Finest Translation"
                  description="We don't just swap words; we translate emotions. Our team ensures every idiom and nuance is perfectly adapted for Burmese readers."
               />
               <ValueCard 
                  icon={<Star className="w-8 h-8 text-amber-500" />}
                  title="Quality First"
                  description="Every chapter undergoes a rigorous proofreading process to maintain high readability and grammatical accuracy."
               />
               <ValueCard 
                  icon={<Community className="w-8 h-8 text-indigo-500" />}
                  title="Community Driven"
                  description="Built by fans, for fans. We listen to our readers' feedback to constantly improve our library and platform."
               />
            </div>

            {/* --- The Process Section --- */}
            <Card className="relative overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-8 lg:p-12 shadow-sm mb-20">
               <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                     <Typography type="h3" className="font-black text-slate-900 mb-6 font-poppins">
                        Our Translation Journey
                     </Typography>
                     <div className="space-y-6">
                        <Step number="01" title="Selection" description="We hand-pick the most popular and compelling Chinese web novels that have already gained international acclaim." />
                        <Step number="02" title="Linguistic Adaptation" description="Our experts translate from English to Burmese, focusing on keeping the original author's voice alive." />
                        <Step number="03" title="Digital Polishing" description="Formatted for the best mobile and desktop reading experience on MM-BOOK-STORE." />
                     </div>
                  </div>
                  <div className="relative flex justify-center">
                     <div className="w-full aspect-square rounded-3xl bg-slate-50 flex items-center justify-center overflow-hidden border border-slate-100 shadow-inner">
                        {/* Replace with a team photo or an abstract illustration */}
                        <Group className="w-32 h-32 text-slate-200" />
                     </div>
                  </div>
               </div>
            </Card>

            {/* --- Call to Action --- */}
            <div className="text-center bg-slate-900 rounded-[2.5rem] p-10 lg:p-16 shadow-2xl shadow-blue-900/20">
               <Typography type="h2" className="text-white font-black mb-4">
                  Ready to Dive In?
               </Typography>
               <Typography className="text-slate-400 mb-8 max-w-lg mx-auto">
                  Join thousands of readers and explore our growing collection of Burmese-translated novels today.
               </Typography>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <NavLink to={ROUTES.HOME}>
                     <Button size="lg" className="rounded-xl bg-blue-600 px-10 font-black tracking-widest uppercase">
                        Browse Library
                     </Button>
                  </NavLink>
                  <Button onClick={() => window.scrollTo(0, document.body.scrollHeight)} type="button" size="lg" className="rounded-xl text-white font-black tracking-widest uppercase hover:bg-white/10">
                     Contact Us
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
};

/* --- Helper Components --- */

const ValueCard = ({ icon, title, description }) => (
   <Card className="p-8 rounded-[2rem] border border-slate-100 shadow-none hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500">
      <div className="mb-4">{icon}</div>
      <Typography type="h5" className="text-slate-900 font-black mb-2 font-poppins">{title}</Typography>
      <Typography className="text-slate-500 text-sm leading-relaxed">{description}</Typography>
   </Card>
);

const Step = ({ number, title, description }) => (
   <div className="flex gap-4">
      <Typography className="text-2xl font-black text-blue-100 font-poppins leading-none">{number}</Typography>
      <div>
         <Typography className="font-bold text-slate-900 mb-1">{title}</Typography>
         <Typography className="text-sm text-slate-500">{description}</Typography>
      </div>
   </div>
);