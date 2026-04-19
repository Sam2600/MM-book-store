export const MetaChip = ({ icon, label, className = '' }) => (
   <div className={`flex items-center gap-2 text-slate-600 bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-sm ${className}`}>
      {icon}
      <span className="text-sm font-bold">{label}</span>
   </div>
);
