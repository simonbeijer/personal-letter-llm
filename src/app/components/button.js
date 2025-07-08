"use client"
export default function CustomButton({text, callBack, type = "button", disabled = false, variant = "primary", size = "md" }) {
    const baseClasses = "font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 hover:scale-[1.01] active:scale-[0.99]";
    
    const variants = {
        primary: "bg-gradient-primary text-foreground dark:text-white border border-primary/20 hover:shadow-sm hover:border-primary/30 focus:ring-primary/30 disabled:bg-grey/30 disabled:text-grey/60 disabled:hover:scale-100",
        secondary: "bg-surface text-foreground border border-border hover:bg-muted hover:border-border/80 focus:ring-grey/20 disabled:bg-grey/10 disabled:text-grey/40 disabled:hover:scale-100",
        outline: "border border-primary text-primary hover:bg-primary hover:text-white hover:border-primary focus:ring-primary/30 disabled:border-grey/30 disabled:text-grey/30 disabled:hover:scale-100"
    };
    
    const sizes = {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-2.5 text-base",
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