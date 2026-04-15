import { useState, useRef, useEffect } from "react";

const MONTHS = [
   "Jan", "Feb", "Mar", "Apr",
   "May", "Jun", "Jul", "Aug",
   "Sep", "Oct", "Nov", "Dec",
];

/**
 * MonthYearPicker
 *
 * Props:
 *   value    — string "YYYY-MM" (controlled)
 *   onChange — (value: string) => void
 */
export const MonthYearPicker = ({ value, onChange }) => {
   const parsed   = value ? value.split("-").map(Number) : null;
   const selYear  = parsed?.[0] ?? new Date().getFullYear();
   const selMonth = parsed?.[1] ?? new Date().getMonth() + 1;

   const [open, setOpen]         = useState(false);
   const [viewYear, setViewYear] = useState(selYear);
   const containerRef            = useRef(null);

   // Sync viewYear if the value changes externally
   useEffect(() => {
      setViewYear(selYear);
   }, [selYear]);

   // Close on outside click
   useEffect(() => {
      if (!open) return;
      const handler = (e) => {
         if (containerRef.current && !containerRef.current.contains(e.target)) {
            setOpen(false);
         }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
   }, [open]);

   const handleSelect = (monthIndex) => {
      const month = monthIndex + 1;
      onChange(`${viewYear}-${String(month).padStart(2, "0")}`);
      setOpen(false);
   };

   const displayLabel = () => {
      const date = new Date(selYear, selMonth - 1, 1);
      return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
   };

   return (
      <div className="relative" ref={containerRef}>

         {/* Trigger button */}
         <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`flex items-center gap-2 bg-white border-2 rounded-2xl px-4 py-2.5 text-sm font-bold text-slate-800 transition-all ${
               open ? "border-blue-500 shadow-sm" : "border-slate-100 hover:border-blue-300"
            }`}
         >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{displayLabel()}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-150 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
         </button>

         {/* Dropdown */}
         {open && (
            <div className="absolute top-full mt-2 right-0 z-50 w-64 bg-white border-2 border-slate-100 rounded-[1.5rem] shadow-xl shadow-slate-200/70 p-4 animate-in fade-in slide-in-from-top-1 duration-150">

               {/* Year navigation */}
               <div className="flex items-center justify-between mb-4 px-1">
                  <button
                     type="button"
                     onClick={() => setViewYear((y) => y - 1)}
                     className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors font-black text-lg leading-none"
                  >
                     ‹
                  </button>

                  <span className="text-sm font-black text-slate-900 tracking-tight">{viewYear}</span>

                  <button
                     type="button"
                     onClick={() => setViewYear((y) => y + 1)}
                     className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors font-black text-lg leading-none"
                  >
                     ›
                  </button>
               </div>

               {/* Month grid */}
               <div className="grid grid-cols-3 gap-1.5">
                  {MONTHS.map((name, i) => {
                     const isSelected = viewYear === selYear && i + 1 === selMonth;
                     const isToday    = viewYear === new Date().getFullYear() && i === new Date().getMonth();

                     return (
                        <button
                           key={name}
                           type="button"
                           onClick={() => handleSelect(i)}
                           className={`relative py-2.5 rounded-xl text-xs font-black transition-all ${
                              isSelected
                                 ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                                 : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                           }`}
                        >
                           {name}
                           {isToday && !isSelected && (
                              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400" />
                           )}
                        </button>
                     );
                  })}
               </div>
            </div>
         )}
      </div>
   );
};
