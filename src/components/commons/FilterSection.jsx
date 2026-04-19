import { NavArrowDown } from 'iconoir-react';

export const FilterSection = ({ title, badge, isOpen, onToggle, children }) => (
   <div className="border-b border-slate-100 last:border-0">
      <button
         onClick={onToggle}
         className="flex items-center justify-between w-full py-3 text-left group"
      >
         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-slate-600 transition-colors">
            {title}
         </span>
         <div className="flex items-center gap-2">
            {!isOpen && badge && (
               <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 max-w-[90px] truncate">
                  {badge}
               </span>
            )}
            <NavArrowDown
               className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
         </div>
      </button>
      {isOpen && (
         <div className="pb-4">
            {children}
         </div>
      )}
   </div>
);
