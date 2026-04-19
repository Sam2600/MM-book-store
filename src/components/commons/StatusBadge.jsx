const STATUS_COLOR_MAP = {
   approved:  'bg-green-100 text-green-700',
   pending:   'bg-yellow-100 text-yellow-700',
   completed: 'bg-green-100 text-green-700',
   ongoing:   'bg-amber-100 text-amber-700',
   draft:     'bg-slate-100 text-slate-500',
};

export const StatusBadge = ({ status }) => (
   <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${STATUS_COLOR_MAP[status] ?? 'bg-slate-100 text-slate-500'}`}>
      {status}
   </span>
);
