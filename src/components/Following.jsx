export const Following = () => {
   return (
      <div className="card p-4 bg-white rounded-lg shadow-sm border border-gray-200">
         <h3 className="font-semibold text-gray-800 mb-3">Following (2)</h3>
         <div className="flex space-x-2">
            <img
               src="https://placehold.co/40x40/FFC0CB/333333?text=A"
               alt="following user 1"
               className="w-10 h-10 rounded-full"
               title="User A"
            />
            <img
               src="https://placehold.co/40x40/ADD8E6/333333?text=B"
               alt="following user 2"
               className="w-10 h-10 rounded-full"
               title="User B"
            />
         </div>
      </div>
   )
}
