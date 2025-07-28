
export const TabButton = ({tab, handler, tabType, children}) => {
   return (
      <button
         onClick={handler}
         className={`nav-link ${tab === tabType ? 'active text-gray-900 border-b-2 border-gray-900' : 'text-gray-600 hover:text-gray-900'
            } px-5 py-3 font-medium transition-all duration-200`}
      >
         {children}
      </button>
   )
}
