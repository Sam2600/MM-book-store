import { NavLink } from 'react-router-dom';

const VARIANT_STYLES = {
   blue: {
      border:      'hover:border-blue-200',
      bg:          'hover:bg-blue-50/40',
      iconBg:      'bg-blue-50',
      iconHoverBg: 'group-hover:bg-blue-600',
      labelHover:  'group-hover:text-blue-400',
      valueHover:  'group-hover:text-blue-700',
   },
   slate: {
      border:      'hover:border-slate-300',
      bg:          'hover:bg-slate-50/60',
      iconBg:      'bg-slate-50',
      iconHoverBg: 'group-hover:bg-slate-800',
      labelHover:  'group-hover:text-slate-500',
      valueHover:  'group-hover:text-slate-900',
   },
};

export const QuickAccessLink = ({ to, icon, label, value, subValue, variant = 'blue' }) => {
   const s = VARIANT_STYLES[variant] ?? VARIANT_STYLES.blue;
   return (
      <NavLink
         to={to}
         className={`group flex items-center gap-4 p-4 rounded-xl border border-slate-100 ${s.border} ${s.bg} transition-all`}
      >
         <div className={`w-10 h-10 rounded-xl ${s.iconBg} flex items-center justify-center shrink-0 ${s.iconHoverBg} transition-colors`}>
            {icon}
         </div>
         <div className="min-w-0">
            <p className={`text-[10px] font-black uppercase tracking-widest text-slate-400 ${s.labelHover} transition-colors`}>
               {label}
            </p>
            <p className={`text-sm font-bold text-slate-800 ${s.valueHover} transition-colors truncate`}>
               {value}
               {subValue && (
                  <span className="font-medium text-slate-500"> · {subValue}</span>
               )}
            </p>
         </div>
      </NavLink>
   );
};
