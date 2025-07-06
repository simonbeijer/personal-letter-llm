"use client"
export default function CustomButton({text, callBack, type = "button", disabled = false }) {
    return (
        <button onClick={callBack} type={type} disabled={disabled}  className="px-4 py-2 border rounded bg-foreground text-white dark:text-black border-gray-300 hover:border-grey-500">
                {text}
        </button>

    );
};

// Add size, type(rounded)
// Set default