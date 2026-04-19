export const SectionHeader = ({ title, showBorder = true, className = '' }) => (
   <div className={`flex items-center justify-between mb-3 px-2 ${showBorder ? 'border-l-4 border-blue-600' : ''} ${className}`}>
      <h2 className={`text-2xl font-black text-slate-800 tracking-tight ${showBorder ? 'pl-3' : 'pl-1'}`}>
         {title}
      </h2>
   </div>
);
