export const PillButton = ({ active, onClick, children }) => (
   <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 whitespace-nowrap
         ${active
            ? 'bg-blue-600 text-white shadow-sm'
            : 'bg-slate-100 text-slate-500 hover:bg-blue-50 hover:text-blue-600'
         }`}
   >
      {children}
   </button>
);
