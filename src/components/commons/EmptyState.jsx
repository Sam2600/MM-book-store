export const EmptyState = ({ icon, message, description }) => (
   <div className="py-20 flex flex-col items-center justify-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100 shadow-inner">
      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
         {icon}
      </div>
      <p className="text-slate-400 font-black uppercase tracking-widest text-xs">{message}</p>
      {description && (
         <p className="text-slate-400 mt-2 text-sm">{description}</p>
      )}
   </div>
);
