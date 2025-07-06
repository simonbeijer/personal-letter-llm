"use client"
export default function CustomButton({text, callBack, type = "button", disabled = false, variant = "primary", size = "md" }) {
    const baseClasses = "font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    const variants = {
        primary: "bg-primary text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-gray-300",
        secondary: "bg-surface text-foreground border border-border hover:bg-gray-50 focus:ring-gray-500 disabled:bg-gray-100",
        outline: "border border-primary text-primary hover:bg-primary hover:text-white focus:ring-blue-500 disabled:border-gray-300 disabled:text-gray-300"
    };
    
    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg"
    };
    
    return (
        <button 
            onClick={callBack} 
            type={type} 
            disabled={disabled}  
            className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        >
            {text}
        </button>
    );
};