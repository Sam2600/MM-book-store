export const Button = ({ children, color, text, disabled = false, onClick = () => { } }) => {
   return (
      <button onClick={onClick} disabled={disabled} className={`flex items-center space-x-2 bg-${color}-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-${color}-700 transition-colors duration-200`}>
         {children}
         <span className="hidden sm:inline">{text}</span>
      </button>
   )
}
